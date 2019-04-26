package com.besto.epgms.po;

import java.util.Date;

public class Adstrategy {
	private int id;				//表主键
	private String name;		//策略名称
	private Date ctime;			//策略创建时间
	private String type;		//策略类型
	private int priority;		//优先级
	private String aimid;		//投放ID
	private String aimname;		//投放名称
	private String aimtype;
	private Date btime;			//开始时间
	private Date etime;			//结束时间
	private Date rtime;
	private String description;	//描述
	private String rstatus;		//发布状态
	private String tstatus;		//时间状态
	private String isdefault;	//是否默认
	private String plateid;  // 所属板块id
	private String platename;  // 所属板块名称
	private String advertisingid;   //所属页面id
	private String advertisingname;  // 所属页面名称
	private String groupid;
	private String orderby;
	private String isQuery;
	private String listtype;
	private String keyword;
	private String xhaid;
	private String xhacode;
	private String puttingarea;
	private String puttingposition;
	private String costways;
	private String tagfilter;
	private String order;
	private String playrestrictions;
	private String noncompetition;
	private String usertags;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCtime() {
		return ctime;
	}
	public void setCtime(Date ctime) {
		this.ctime = ctime;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public String getAimid() {
		return aimid;
	}
	public void setAimid(String aimid) {
		this.aimid = aimid;
	}
	public String getAimname() {
		return aimname;
	}
	public void setAimname(String aimname) {
		this.aimname = aimname;
	}
	public Date getBtime() {
		return btime;
	}
	public void setBtime(Date btime) {
		this.btime = btime;
	}
	public Date getEtime() {
		return etime;
	}
	public void setEtime(Date etime) {
		this.etime = etime;
	}
	public String getRstatus() {
		return rstatus;
	}
	public void setRstatus(String rstatus) {
		this.rstatus = rstatus;
	}
	public String getTstatus() {
		return tstatus;
	}
	public void setTstatus(String tstatus) {
		this.tstatus = tstatus;
	}
	public String getIsdefault() {
		return isdefault;
	}
	public void setIsdefault(String isdefault) {
		this.isdefault = isdefault;
	}
	public String getPlateid() {
		return plateid;
	}
	public void setPlateid(String plateid) {
		this.plateid = plateid;
	}
	public String getPlatename() {
		return platename;
	}
	public void setPlatename(String platename) {
		this.platename = platename;
	}
	public String getAdvertisingid() {
		return advertisingid;
	}
	public void setAdvertisingid(String advertisingid) {
		this.advertisingid = advertisingid;
	}
	public String getAdvertisingname() {
		return advertisingname;
	}
	public void setAdvertisingname(String advertisingname) {
		this.advertisingname = advertisingname;
	}
	public String getGroupid() {
		return groupid;
	}
	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}
	@Override
	public String toString(){
		return "Adstrategy{"+
				"id=" + id +
				",name='" + name + '\'' +
				",ctime='" + ctime + '\'' +
				",type='" + type + '\'' +
				",priority='" + priority + '\'' +
				",aimid='" + aimid + '\'' +
				",aimname='" + aimname + '\'' +
				",btime='" + btime + '\'' +
				",etime='" + etime + '\'' +
				",description='" + description + '\'' +
				",pstatus='" + rstatus + '\'' +
				",sstatus='" + tstatus + '\'' +
				",isdefault='" + isdefault + '\'' +
				",plateid='" + plateid + '\'' +
				",platename='" + platename + '\'' +
				",advertisingid='" + advertisingid + '\'' +
				",advertisingname='" + advertisingname + '\'' +
				'}';
	}
	public String getOrderby() {
		return orderby;
	}
	public void setOrderby(String orderby) {
		this.orderby = orderby;
	}
	public String getAimtype() {
		return aimtype;
	}
	public void setAimtype(String aimtype) {
		this.aimtype = aimtype;
	}
	public Date getRtime() {
		return rtime;
	}
	public void setRtime(Date rtime) {
		this.rtime = rtime;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getIsQuery() {
		return isQuery;
	}
	public void setIsQuery(String isQuery) {
		this.isQuery = isQuery;
	}
	public String getListtype() {
		return listtype;
	}
	public void setListtype(String listtype) {
		this.listtype = listtype;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getXhaid() {
		return xhaid;
	}
	public void setXhaid(String xhaid) {
		this.xhaid = xhaid;
	}
	public String getXhacode() {
		return xhacode;
	}
	public void setXhacode(String xhacode) {
		this.xhacode = xhacode;
	}
	public String getPuttingarea() {
		return puttingarea;
	}
	public void setPuttingarea(String puttingarea) {
		this.puttingarea = puttingarea;
	}
	public String getPuttingposition() {
		return puttingposition;
	}
	public void setPuttingposition(String puttingposition) {
		this.puttingposition = puttingposition;
	}
	public String getCostways() {
		return costways;
	}
	public void setCostways(String costways) {
		this.costways = costways;
	}
	public String getTagfilter() {
		return tagfilter;
	}
	public void setTagfilter(String tagfilter) {
		this.tagfilter = tagfilter;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getPlayrestrictions() {
		return playrestrictions;
	}
	public void setPlayrestrictions(String playrestrictions) {
		this.playrestrictions = playrestrictions;
	}
	public String getNoncompetition() {
		return noncompetition;
	}
	public void setNoncompetition(String noncompetition) {
		this.noncompetition = noncompetition;
	}
	public String getUsertags() {
		return usertags;
	}
	public void setUsertags(String usertags) {
		this.usertags = usertags;
	}
}
