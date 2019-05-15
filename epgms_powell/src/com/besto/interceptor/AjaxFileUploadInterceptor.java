package com.besto.interceptor;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.multipart.MultiPartRequestWrapper;
import org.apache.struts2.interceptor.FileUploadInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.PrintWriter;
import java.util.*;

/**
 * 使用ajax上传文件拦截器，主要解决文件超出struts.multipart.maxSize配置前台无法捕获异常问题<br/>
 * 支持验证文件类型和文件大小<br/>
 * <p/>
 * 1.验证文件是否超出struts.multipart.maxSize配置，超出则返回json文本<br/>
 * 2.当fileType不等于""时，验证文件类型<br/>
 * 3.当maxSize不等于0时，再次验证文件大小<br/>
 *
 * @author <powell/滕翔>
 */
public class AjaxFileUploadInterceptor extends FileUploadInterceptor {

    /* 该配置必须小于struts.multipart.maxSize配置的值，二次限制文件大小，为0时不会验证 */
    private long maxSize = 0;

    /* 未配置时不会验证格式 */
    private String fileType = "";

    /* 可自定义错误code */
    private String errorCode = "12345";

    public String intercept(ActionInvocation invocation) throws Exception {
        Boolean successFlag = true;
        String errorMsg = "上传文件失败！";
        try {
            ActionContext ac = invocation.getInvocationContext();
            HttpServletRequest request = (HttpServletRequest) ac.get("com.opensymphony.xwork2.dispatcher.HttpServletRequest");
            MultiPartRequestWrapper multiWrapper = (MultiPartRequestWrapper) request;
            String inputName;
            if (multiWrapper.hasErrors()) {
                Iterator fileParameterNames = multiWrapper.getErrors().iterator();
                while (fileParameterNames.hasNext()) {
                    inputName = (String) fileParameterNames.next();
                    if (inputName.indexOf("Request exceeded allowed size limit!") > -1) {
                        successFlag = false;
                        errorMsg = "文件超出大小！";
                        break;
                    }
                }
            }
            if (successFlag) {
                Enumeration var19 = multiWrapper.getFileParameterNames();
                while (var19 != null && var19.hasMoreElements()) {
                    inputName = (String) var19.nextElement();
                    String[] contentType = multiWrapper.getContentTypes(inputName);
                    if (this.isNonEmpty(contentType)) {
                        /* 文件类型验证 */
                        if (!"".equals(fileType)) {
                            if (!isAvailableImageType(contentType[0])) {
                                successFlag = false;
                                errorMsg = "不支持的文件类型！";
                                break;
                            }
                        }
                        /* 文件大小验证 */
                        if (maxSize != 0) {
                            String[] fileName = multiWrapper.getFileNames(inputName);
                            if (this.isNonEmpty(fileName)) {
                                File[] files = multiWrapper.getFiles(inputName);
                                for (File file : files) {
                                    if (file.length() > maxSize) {
                                        successFlag = false;
                                        errorMsg = "文件超出大小！";
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            successFlag = false;
            e.printStackTrace();
        } finally {
            if (!successFlag) {
                HttpServletResponse response = ServletActionContext.getResponse();
                response.setContentType("text/html;charset=utf-8");
                response.setStatus(500);
                PrintWriter out = response.getWriter();
                String jsonString = "{\"errorMsg\":\"" + errorMsg + "\",\"errorCode\":\"" + errorCode + "\",\"success\":false}";
                out.println(jsonString);
                out.flush();
                out.close();
            } else {
                return invocation.invoke();
            }
        }
        return null;
    }

    private Boolean isAvailableImageType(String imageType) {
        Boolean flag = false;
        try {
            if (fileType != null && !"".equals(fileType)) {
                String[] imageTypes = fileType.split(",");
                for (String s : imageTypes) {
                    if (s != null && !"".equals(s) && s.equals(imageType)) {
                        flag = true;
                        break;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    private boolean isNonEmpty(Object[] objArray) {
        boolean result = false;
        for (int index = 0; index < objArray.length && !result; ++index) {
            if (objArray[index] != null) {
                result = true;
            }
        }
        return result;
    }

    public long getMaxSize() {
        return maxSize;
    }

    public void setMaxSize(long maxSize) {
        this.maxSize = maxSize;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
