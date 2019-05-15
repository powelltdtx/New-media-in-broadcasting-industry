package com.besto.epgms.vo;


public class TempletGroupStreamVO extends CommunVO{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int templet_id; //模板ID
	private String templet_name; //模板名称
	private String createdate; //创建日期
	private String type;//模板类型
	private String source;//厂商来源
	private String filename; //文件名
	private String ftpurl;// 文件URL
	private int group_id; //分组ID
	private String group_name; //分组名称
	private int downStream_id; //下游平台ID
	private String downStream_name; //下游平台名称
	
	private String topicUrl;
	private String isTopic; 
	
	public int getTemplet_id() {
		return templet_id;
	}
	public void setTemplet_id(int templetId) {
		templet_id = templetId;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
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
	public int getGroup_id() {
		return group_id;
	}
	public void setGroup_id(int groupId) {
		group_id = groupId;
	}
	public String getGroup_name() {
		return group_name;
	}
	public void setGroup_name(String groupName) {
		group_name = groupName;
	}
	public int getDownStream_id() {
		return downStream_id;
	}
	public void setDownStream_id(int downStreamId) {
		downStream_id = downStreamId;
	}
	public String getDownStream_name() {
		return downStream_name;
	}
	public void setDownStream_name(String downStreamName) {
		downStream_name = downStreamName;
	}
	public String getTemplet_name() {
		return templet_name;
	}
	public void setTemplet_name(String templetName) {
		templet_name = templetName;
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
	
	
	
	
	
}
