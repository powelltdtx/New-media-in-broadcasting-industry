/**
 * 操作日志实体
 * @author Johan.H
 */
package com.besto.epgms.po;

import com.besto.epgms.vo.CommunVO;


public class OperationLog extends CommunVO{

	private String id; //主键
	private String username;//操作用户名
	private String userid;//用户ID
	private String moduleid; 
	
	
	private String moduleName;//模块名称
	private String moduleDesc;//模块描述
	private String optid; //操作id
	private String optidName; //操作名称
	private String optdesc; //操作描述
	private String params; //参数
	private String ip; //操作ip
	private String date; //操作日期
	private String time; //操作时间
	private String level; //级别
	
	
	
	private String startDate;//开始时间 
	private String toDate;//结束时间
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getModuleid() {
		return moduleid;
	}
	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getOptid() {
		return optid;
	}
	public void setOptid(String optid) {
		this.optid = optid;
	}
	public String getOptidName() {
		return optidName;
	}
	public void setOptidName(String optidName) {
		this.optidName = optidName;
	}
	public String getParams() {
		return params;
	}
	public void setParams(String params) {
		this.params = params;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getLevel() {
		String l = "";
		switch(Integer.parseInt(level)){
		case 1: l = "重要";break;
		case 2: l = "一般";break;
		case 3: l = "普通";break;
		}
		return l;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getModuleDesc() {
		return moduleDesc;
	}
	public void setModuleDesc(String moduleDesc) {
		this.moduleDesc = moduleDesc;
	}
	public String getOptdesc() {
		return optdesc;
	}
	public void setOptdesc(String optdesc) {
		this.optdesc = optdesc;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
}
