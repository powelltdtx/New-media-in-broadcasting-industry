package com.besto.epgms.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.GuardService;
import com.besto.epgms.vo.GuardVO;
import com.opensymphony.xwork2.ActionContext;

@Scope("prototype")
@Controller("fileGuardAction")
public class FileGuardAction extends BaseAction {
	private static Logger logger = Logger.getLogger(FileGuardAction.class);
	@Autowired
	GuardService guardService;
	private String fileName;
	private String filePath;
	private String platForm;
	private String ip;
	private String tamperMode;
	private String tamperTime;
	private String handleMode;
	private String handleResult;
	private String handleTime;
	private GuardVO guardVO;

	public void outPrint(String info) {
		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext()
				.get(org.apache.struts2.StrutsStatics.HTTP_RESPONSE);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		response.setHeader("Access-Control-Allow-Origin", "*");
		try {
			response.getWriter().write(info);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public void getFileMd5() {
		try {
			Map map = new HashMap();
			map.put("filename", fileName);
			map.put("filepath", filePath);
			String md5 = guardService.getFileMd5(map);
			System.out.println("=============" + filePath + "===================" + fileName + "=============" + md5);
			outPrint(md5);
		} catch (Exception e) {
			e.getStackTrace();
			logger.error(e.getMessage());
		}
	}
	public void getFilePathCount() {
		try {
			Map map = new HashMap();
			map.put("filename", fileName);
			map.put("filepath", filePath);
			int cnt = guardService.getFilePathCount(map);
			outPrint(String.valueOf(cnt));
		} catch (Exception e) {
			e.getStackTrace();
			logger.error(e.getMessage());
		}
	}
	public void tamperNotice() throws Exception {
		filePath = new String(filePath.getBytes("ISO-8859-1"), "GBK");
		tamperMode = new String(tamperMode.getBytes("ISO-8859-1"), "GBK");
		handleMode = new String(handleMode.getBytes("ISO-8859-1"), "GBK");
		handleResult = new String(handleResult.getBytes("ISO-8859-1"), "GBK");
		Map<String, String> map = new HashMap<String, String>();
		map.put("filePath", filePath);
		map.put("platForm", platForm);
		map.put("ip", ip);
		map.put("tamperMode", tamperMode);
		map.put("tamperTime", tamperTime);
		map.put("handleMode", handleMode);
		map.put("handleResult", handleResult);
		map.put("handleTime", handleTime);
		System.out.println(tamperMode);
		guardService.tamperNotice(map);
	}
	public GuardVO getGuardVO() {
		return guardVO;
	}
	public void setGuardVO(GuardVO guardVO) {
		this.guardVO = guardVO;
	}
	public String search() throws Exception {
		// 初始化分页值(保值)
		guardVO = (GuardVO) this.initPageValueAndKeepValue(guardVO, GuardVO.class);
		// 查询分页
		List<GuardVO> list = guardService.search(guardVO);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(guardVO, "list", list);
		return "success";
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getPlatForm() {
		return platForm;
	}
	public void setPlatForm(String platForm) {
		this.platForm = platForm;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getTamperMode() {
		return tamperMode;
	}
	public void setTamperMode(String tamperMode) {
		this.tamperMode = tamperMode;
	}
	public String getTamperTime() {
		return tamperTime;
	}
	public void setTamperTime(String tamperTime) {
		this.tamperTime = tamperTime;
	}
	public String getHandleMode() {
		return handleMode;
	}
	public void setHandleMode(String handleMode) {
		this.handleMode = handleMode;
	}
	public String getHandleResult() {
		return handleResult;
	}
	public void setHandleResult(String handleResult) {
		this.handleResult = handleResult;
	}
	public String getHandleTime() {
		return handleTime;
	}
	public void setHandleTime(String handleTime) {
		this.handleTime = handleTime;
	}
}
