package com.besto.epgms.vo;

import java.util.ResourceBundle;

import com.besto.util.StringUitl;

public class TempletHistoryVO extends CommunVO{
	
	private String 	id;					//主键
	private String 	name;				//模板名称
	private	String	templet_id;			//模板id
	private String	onlinetime;			//上线时间
	private String	onlineperson;		//上线人
	private int		level;				//审核级别
	private String	examinetime;		//审核时间
	private String	examineperson;		//审核人
	private String	upstreamgroup_id;	//upstreamgroup_id
	private String	epgfileid;			//epgfileid
	private String	action;				//action
	private String	sourceurl;			//sourceurl
	private String	destpath;			//destpath
	private String	md5;				//md5
	private String	fileid;				//文件id
	private String	filename;			//文件名
	private String	ftpurl;				//本地ftpurl
	private int		type;				//模板类型	(1 普通模板 2 应急模板)
	private String	upstream_id;		//上游平台id
	private String	issuedstrategy;		//下发策略
	private int		didonline;			//是否已经发布	(0 未发布  1已发布)
	private	String 	source;				//来源
	
	private String	onlinestart;		//开始发布时间
	private String	onlineend;			//结束发布时间
	
	
	public String getTypeName(){
		String value =this.type+"";
		String[] values = ResourceBundle.getBundle("common").getString("templet_type").split(",");
		for(int i = 0; i < values.length; i++){
			String[] val = values[i].split(":");
			if(val[0].equals(value)){
				value=val[1];
				break;
			}
		}
		return value;
	}
	public String getSourceName(){
		String value =this.source+"";
		String[] values = ResourceBundle.getBundle("common").getString("templet_source").split(",");
		for(int i = 0; i < values.length; i++){
			String[] val = values[i].split(":");
			if(val[0].equals(value)){
				value=val[1];
				break;
			}
		}
		return value;
	}
	public String getFtpurlToShow(){
		return StringUitl.getFtpurlShow(this.ftpurl);
	}
	public String getIssuedstrategyTitle(){
		String value = this.issuedstrategy;
		value=value.replaceAll("<br/>", " ");
		return value;
	}
	
	public String getIssuedstrategyTitleOmit(){
		String value = this.issuedstrategy;
		value=value.replaceAll("<br/>", " ");
		return value;
	}
	public String getIssuedstrategyOmit(){
		return StringUitl.omitWithLineNumber(getIssuedstrategy(), 3);
	}
	
	
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getOnlinestart() {
		return onlinestart;
	}
	public void setOnlinestart(String onlinestart) {
		this.onlinestart = onlinestart;
	}
	public String getOnlineend() {
		return onlineend;
	}
	public void setOnlineend(String onlineend) {
		this.onlineend = onlineend;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getDidonline() {
		return didonline;
	}
	public void setDidonline(int didonline) {
		this.didonline = didonline;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTemplet_id() {
		return templet_id;
	}
	public void setTemplet_id(String templet_id) {
		this.templet_id = templet_id;
	}
	public String getOnlinetime() {
		return onlinetime;
	}
	public void setOnlinetime(String onlinetime) {
		this.onlinetime = onlinetime;
	}
	public String getOnlineperson() {
		return onlineperson;
	}
	public void setOnlineperson(String onlineperson) {
		this.onlineperson = onlineperson;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public String getExaminetime() {
		return examinetime;
	}
	public void setExaminetime(String examinetime) {
		this.examinetime = examinetime;
	}
	public String getExamineperson() {
		return examineperson;
	}
	public void setExamineperson(String examineperson) {
		this.examineperson = examineperson;
	}
	public String getUpstreamgroup_id() {
		return upstreamgroup_id;
	}
	public void setUpstreamgroup_id(String upstreamgroup_id) {
		this.upstreamgroup_id = upstreamgroup_id;
	}
	public String getEpgfileid() {
		return epgfileid;
	}
	public void setEpgfileid(String epgfileid) {
		this.epgfileid = epgfileid;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getSourceurl() {
		return sourceurl;
	}
	public void setSourceurl(String sourceurl) {
		this.sourceurl = sourceurl;
	}
	public String getDestpath() {
		return destpath;
	}
	public void setDestpath(String destpath) {
		this.destpath = destpath;
	}
	public String getMd5() {
		return md5;
	}
	public void setMd5(String md5) {
		this.md5 = md5;
	}
	public String getFileid() {
		return fileid;
	}
	public void setFileid(String fileid) {
		this.fileid = fileid;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getFtpurl() {
		return ftpurl;
	}
	public void setFtpurl(String ftpurl) {
		this.ftpurl = ftpurl;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getUpstream_id() {
		return upstream_id;
	}
	public void setUpstream_id(String upstream_id) {
		this.upstream_id = upstream_id;
	}
	public String getIssuedstrategy() {
		return issuedstrategy;
	}
	public void setIssuedstrategy(String issuedstrategy) {
		this.issuedstrategy = issuedstrategy;
	}
	
	
	
}
