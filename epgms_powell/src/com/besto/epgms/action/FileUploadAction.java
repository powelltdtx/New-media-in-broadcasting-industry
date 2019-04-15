package com.besto.epgms.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

/**
 * 
*Project:  < terbms>      
* Comments:  <上传>         
* JDK version used:<JDK1.6>
* Namespace:  FileUploadAction
* Author:   <auther/滕翔>
* Create Date: <2015-11-2>  
* Version:  <1.0>
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("fileUploadAction")
@Lazy
public class FileUploadAction extends ActionSupport{
	private static Logger logger = Logger.getLogger(FileUploadAction.class);
	
	private String  rePath;//返回新图片名
	// 封装上传文件域的属性
    private File file;
    // 封装上传文件名的属性
    private String fileFileName;
    // 接受依赖注入的属性（保存路径）
    
    private String savePath="";//文件跟路径  
    /**
     * 上传入口
     * @author auther
     * 2015-11-3
     */
    public  void  fileUpload() {
    	logger.info("----------[FileUploadAction]---fileUpload()---------");
    	
        FileOutputStream fos = null;
        FileInputStream fis = null;
        String errorMsg = "上传文件失败！";
        String pathResult="";
        String result = "";
        String success = "true";
        if (null== file || file.length() == 0) {
        	errorMsg = "上传文件不存在！";
        	success = "false";
        }else{
	        try {
	            /** 获取文件后缀 */
				String ext =  fileFileName.substring(fileFileName.lastIndexOf(".")).toLowerCase();
				ResourceBundle rb = ResourceBundle.getBundle("common");
				// upstreamgroup_id
				String fileType = rb.getString("fileType");
				
				// 类型判断
				if (fileType == null || !"".equals(fileType)) {
					boolean flag = false;
					try {
		                String[] types = fileType.split(",");
		                for (String s : types) {
		                    if (s != null && !"".equals(s) && s.equals(ext)) {
		                        flag = true;
		                        break;
		                    }
		                }
			        } catch (Exception e) {
			            e.printStackTrace();
			        }
					if (!flag) {
						errorMsg = "不支持的文件类型！";
			        	success = "false";
					}
				}
	            /**判断视频包是否存在，不存在就创建一个新的文件夹*/
				//String filePath = getSavePath() + File.separator + getProid() +File.separator+getDs();
				if ("true".equals(success)) {
					String filePath = getSavePath();
		            File dir = new File(filePath);
		            if (!dir.exists()) {
		            	dir.mkdirs();
		        	}
		            /**新的文件名*/
		            String path =fileFileName;
		            rePath=path;
		            // 建立文件上传流
		            fis = new FileInputStream(getFile());
		            // 建立文件输出流
		            fos = new FileOutputStream(filePath+ File.separator +path);
		            byte[] buffer = new byte[20*1024*1024];
		            int len = 0;
		            while ((len = fis.read(buffer)) > 0) {
		                fos.write(buffer, 0, len);
		            }
				}
	        	
	        } catch (Exception e) {
	            logger.info("上传失败"+e);
	            success = "false";
	        } finally { 	
	        	//关闭流
	            close(fos, fis);
	        }
	        
	        pathResult=savePath+"/"+rePath;
        }
        result = "{\"errorMsg\":\"" + errorMsg + "\",\"success\":"+success+",\"path\":\""+ pathResult +"\"}";
		HttpServletResponse response = ServletActionContext.getResponse(); 
		response.setCharacterEncoding("UTF-8");
		try {
			response.getWriter().write(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }

    /**
     * 返回上传文件的保存位置
     * @return
     */
    public String getSavePath() throws Exception{
//      return ServletActionContext.getServletContext().getRealPath(savePath); 
    	//tar包上传本地位置
    	String tarBasePath = ResourceBundle.getBundle("epg").getString("local.tarBasePath");
        return tarBasePath; 
    }
    /**
     * 关闭文件流 
     * @param fos
     * @param fis
     */
    private void close(FileOutputStream fos, FileInputStream fis) {
        if (fis != null) {
            try {
                fis.close();
            } catch (IOException e) {
                System.out.println("FileInputStream关闭失败");
                e.printStackTrace();
            }
        }
        if (fos != null) {
            try {
                fos.close();
            } catch (IOException e) {
                System.out.println("FileOutputStream关闭失败");
                e.printStackTrace();
            }
        }
    }
 
    /**get和set方法*/
    public void setSavePath(String savePath) {
        this.savePath = savePath;
    }
	public String getRePath() {
		return rePath;
	}
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public void setRePath(String rePath) {
		this.rePath = rePath;
	}



}
