package com.besto.epgms.vo;

import java.io.Serializable;

public class GuardVO extends CommunVO implements Serializable {

	private static final long serialVersionUID = 1L;
	private int id;
	private String filePath;
	private String platForm;
	private String ip;
	private String tamperMode;
	private String tamperTime;
	private String handleMode;
	private String handleResult;
	private String handleTime;
	private String serverName;
	private String begintime; // 查询开始时间
	private String endtime; // 查询开始时间

	private String lightType = "2"; // 灯光颜色类型

	public GuardVO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public GuardVO(int id, String filePath, String platForm, String ip,
			String tamperMode, String tamperTime, String handleMode,
			String handleResult, String handleTime, String serverName,
			String begintime, String endtime, String lightType) {
		super();
		this.id = id;
		this.filePath = filePath;
		this.platForm = platForm;
		this.ip = ip;
		this.tamperMode = tamperMode;
		this.tamperTime = tamperTime;
		this.handleMode = handleMode;
		this.handleResult = handleResult;
		this.handleTime = handleTime;
		this.serverName = serverName;
		this.begintime = begintime;
		this.endtime = endtime;
		this.lightType = lightType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public String getBegintime() {
		return begintime;
	}

	public void setBegintime(String begintime) {
		this.begintime = begintime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getLightType() {
		return lightType;
	}

	public void setLightType(String lightType) {
		this.lightType = lightType;
	}

}
