package com.besto.epgms.vo;

import java.util.Arrays;
import java.util.ResourceBundle;

public class PoolVO extends CommunVO {
	private static final long serialVersionUID = 1L;
	
	private int id;  //主键
	private String  templateId;  //模板id
	private	String	upstreamgroup_id;	
	private String	epgfileid;
	private String	action;
	private String 	sourceurl;
	private String	destpath;
	private	String	md5;
	private String  ftpurl;
	private String  type;
	private String  upstream_id;
	private String  createdate;
	private String  createperson;
	private String  filename;       //文件名
	private String  fileid;         //文件id
	private String  name;           //模板名称
	private String  source;         //厂商来源
	private String 	api;		    //api环境,0:百途环境 1:华为环境 2:中兴环境 
	private String  topicUrl;		//专题路径
	private String  isTopic;		//0,普通模板 1,专题模板
	private String  topicStatus;	//专题审核状态,0:初始值 1:未审核,2已审核	
	private String  begintime;      //查询开始时间
	private String  endtime;        //查询结束时间
	
	//epgms_pic表字段
	private String  picName;	 	//图片名称
	private String  picPath;		//图片路径
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTemplateId() {
		return templateId;
	}
	public void setTemplateId(String templateId) {
		this.templateId = templateId;
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
	public String getFtpurl() {
		return ftpurl;
	}
	public void setFtpurl(String ftpurl) {
		this.ftpurl = ftpurl;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getUpstream_id() {
		return upstream_id;
	}
	public void setUpstream_id(String upstream_id) {
		this.upstream_id = upstream_id;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getCreateperson() {
		return createperson;
	}
	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getFileid() {
		return fileid;
	}
	public void setFileid(String fileid) {
		this.fileid = fileid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getApi() {
		return api;
	}
	public void setApi(String api) {
		this.api = api;
	}
	public String getTopicUrl() {
		return topicUrl;
	}
	public void setTopicUrl(String topicUrl) {
		this.topicUrl = topicUrl;
	}
	public String getIsTopic() {
		return isTopic;
	}
	public void setIsTopic(String isTopic) {
		this.isTopic = isTopic;
	}
	public String getTopicStatus() {
		return topicStatus;
	}
	public void setTopicStatus(String topicStatus) {
		this.topicStatus = topicStatus;
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
	public String getPicName() {
		return picName;
	}
	public void setPicName(String picName) {
		this.picName = picName;
	}
	public String getPicPath() {
		return picPath;
	}
	public void setPicPath(String picPath) {
		this.picPath = picPath;
	}
}
