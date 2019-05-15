package com.besto.epgms.vo;

import com.ctc.wstx.util.StringUtil;
import com.ibm.wsdl.util.StringUtils;

public class HeartBeatVO extends CommunVO {
	
	private int id;
	private String ip;
	private String serverName;
	private String serverGroup;
	private String status;
	private String type;
	private String checkTime;
	private String handleResult; //处理结果
	private String checkCode; //异常的hashCode
	private String  begintime;      //查询开始时间
	private String  endtime;      //查询开始时间
	
	private String  lightType = "3";      //灯光类型
	

	
	
	
	public HeartBeatVO(int id, String ip, String serverName,
			String serverGroup, String status, String type, String checkTime,
			String handleResult, String checkCode, String begintime,
			String endtime, String lightType) {
		super();
		this.id = id;
		this.ip = ip;
		this.serverName = serverName;
		this.serverGroup = serverGroup;
		this.status = status;
		this.type = type;
		this.checkTime = checkTime;
		this.handleResult = handleResult;
		this.checkCode = checkCode;
		this.begintime = begintime;
		this.endtime = endtime;
		this.lightType = lightType;
	}
	public HeartBeatVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getServerName() {
		return serverName;
	}
	public void setServerName(String serverName) {
		this.serverName = serverName;
	}
	public String getServerGroup() {
		return serverGroup;
	}
	public void setServerGroup(String serverGroup) {
		this.serverGroup = serverGroup;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}
	public String getHandleResult() {
		if(handleResult!="" && handleResult!=null){
			if("0".equals(handleResult)){
				return "未处理";
			}
			if("1".equals(handleResult)){
				return "已处理";
			}
		}
		return handleResult;
	}
	public void setHandleResult(String handleResult) {
		this.handleResult = handleResult;
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
	public String getCheckCode() {
		return checkCode;
	}
	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}
	public String getLightType() {
		return lightType;
	}
	public void setLightType(String lightType) {
		this.lightType = lightType;
	}
	
	
}
