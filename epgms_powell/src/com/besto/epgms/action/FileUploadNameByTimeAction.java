package com.besto.epgms.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
/**
 * 上传图片
 * @author auther
 * 2015-11-27
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("fileUploadNameByTimeAction")
@Lazy
public class FileUploadNameByTimeAction extends ActionSupport{
	
	private static Logger logger = Logger.getLogger(FileUploadNameByTimeAction.class);
	
	private String  rePath;//返回新图片名
	// 封装上传文件域的属性
    private File file;
    // 封装上传文件名的属性
    private String fileFileName;
    // 接受依赖注入的属性（保存路径）
    private String savePath;//
    
    
    /**
     * 上传入口
     * @author auther
     * 2015-11-27
     */
    public  void  fileUploadNameByTime() {
    	logger.info("----------[FileUploadNameByTimeAction]---fileUploadNameByTime()---------");
        FileOutputStream fos = null;
        FileInputStream fis = null;
        String result="fail";
        if (null== file || file.length() == 0 || file.length() >= 2000000) {
        	result = "fail";
        }else{
	        try {
	            /** 获取文件后缀 */
				String ext =  fileFileName.substring(fileFileName.lastIndexOf(".")).toLowerCase();
	            /**判断视频包是否存在，不存在就创建一个新的文件夹*/
	            //String filePath = getSavePath() + File.separator + code ;
	            //File dir = new File(filePath);
				File dir = new File(getSavePath());
	            if (!dir.exists()) {
	            	dir.mkdirs();
	        	}
	            /**新的文件名*/
	            //String path = new Date().getTime()+"type"+imageContentType+ext;
	            //rePath=path;
	            rePath=new Date().getTime()+ext;
	            // 建立文件上传流
	            fis = new FileInputStream(getFile());
	            // 建立文件输出流
	            //fos = new FileOutputStream(filePath+ File.separator +path);
	            fos = new FileOutputStream(getSavePath()+ File.separator +rePath);
	            byte[] buffer = new byte[1024];
	            int len = 0;
	            while ((len = fis.read(buffer)) > 0) {
	                fos.write(buffer, 0, len);
	            }
	        } catch (Exception e) {
	            System.out.println("文件上传失败");
	            e.printStackTrace();
	        } finally { 	
	        	//关闭流
	            close(fos, fis);
	        }
	        result=savePath+"/"+rePath;
        }
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
    	//缩略图上传位置 
    	String uploadPicPath = ResourceBundle.getBundle("epg").getString("local.uploadPicPath");
    	return uploadPicPath;
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
