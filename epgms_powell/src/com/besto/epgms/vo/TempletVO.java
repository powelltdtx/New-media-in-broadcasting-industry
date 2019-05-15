package com.besto.epgms.vo;

import java.util.Arrays;
import java.util.List;
import java.util.ResourceBundle;

import com.besto.util.StringUitl;

public class TempletVO extends CommunVO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id; // 主键
	private String upstreamgroup_id;
	private String epgfileid;
	private String action;
	private String sourceurl;
	private String destpath;
	private String md5;
	private String ftpurl;
	private String type;
	private String upstream_id;
	private String createdate;
	private String createperson;
	private String filename; // 文件名
	private String fileid; // 文件id
	private String name; // 模板名称
	private String source; // 厂商来源
	private String api; // api环境,0:百途环境 1:华为环境 2:中兴环境
	private String topicUrl; // 专题路径
	private String isTopic; // 0,普通模板 1,专题模板
	private String topicStatus; // 专题审核状态,0:初始值 1:未审核,2已审核
	private String status; // 审核状态
	private String level; // 审核级别
	private String examinetime; // 审核时间
	private String examineperson; // 审核人
	private String dstatus; // 删除状态
	private String deletetime; // 删除时间
	private String deleteperson; // 删除人
	private String rejectreason; // 驳回理由
	private String begintime; // 查询开始时间
	private String endtime; // 查询开始时间
	private List<DownstreamVO> downstreamList;// 下游平台列表
	private String groupIds; // 分组ID列表
	private String downstreamGroupName; // 平台分组显示用
	private String[] groupIdsUp;
	private String totalCount; // 文件监控异常信息数
	private String groupName; // 分组名称
	private String serverName; // 服务器名
	private String serverIp; // 服务器IP

	public String getTypeName() {
		String value = this.type + "";
		String[] values = ResourceBundle.getBundle("common").getString("templet_type").split(",");
		for (int i = 0; i < values.length; i++) {
			String[] val = values[i].split(":");
			if (val[0].equals(value)) {
				value = val[1];
				break;
			}
		}
		return value;
	}

	public String getSourceName() {
		String value = this.source + "";
		String[] values = ResourceBundle.getBundle("common").getString("templet_source").split(",");
		for (int i = 0; i < values.length; i++) {
			String[] val = values[i].split(":");
			if (val[0].equals(value)) {
				value = val[1];
				break;
			}
		}
		return value;
	}

	public String getLevelName() {
		String value = this.level + "";
		String[] values = ResourceBundle.getBundle("common").getString("templet_level").split(",");
		for (int i = 0; i < values.length; i++) {
			String[] val = values[i].split(":");
			if (val[0].equals(value)) {
				value = val[1];
				break;
			}
		}
		return value;
	}

	public String getStatusName() {
		String value = this.status + "";
		String[] values = ResourceBundle.getBundle("common").getString("templet_status").split(",");
		for (int i = 0; i < values.length; i++) {
			String[] val = values[i].split(":");
			if (val[0].equals(value)) {
				value = val[1];
				break;
			}
		}
		return value;
	}

	public String getFtpurlToShow() {

		return StringUitl.getFtpurlShow(this.ftpurl);
	}

	public String[] getGroupIdsUp() {
		return groupIdsUp;
	}

	public void setGroupIdsUp(String[] groupIdsUp) {
		this.groupIdsUp = groupIdsUp;
	}

	public String getDownstreamGroupName() {
		return downstreamGroupName;
	}

	public void setDownstreamGroupName(String downstreamGroupName) {
		this.downstreamGroupName = downstreamGroupName;
	}

	public String getGroupIds() {
		return groupIds;
	}

	public void setGroupIds(String groupIds) {
		this.groupIds = groupIds;
	}

	public List<DownstreamVO> getDownstreamList() {
		return downstreamList;
	}

	public void setDownstreamList(List<DownstreamVO> downstreamList) {
		this.downstreamList = downstreamList;
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the upstreamgroup_id
	 */
	public String getUpstreamgroup_id() {
		return upstreamgroup_id;
	}

	/**
	 * @param upstreamgroup_id
	 *            the upstreamgroup_id to set
	 */
	public void setUpstreamgroup_id(String upstreamgroup_id) {
		this.upstreamgroup_id = upstreamgroup_id;
	}

	/**
	 * @return the epgfileid
	 */
	public String getEpgfileid() {
		return epgfileid;
	}

	/**
	 * @param epgfileid
	 *            the epgfileid to set
	 */
	public void setEpgfileid(String epgfileid) {
		this.epgfileid = epgfileid;
	}

	/**
	 * @return the action
	 */
	public String getAction() {
		return action;
	}

	/**
	 * @param action
	 *            the action to set
	 */
	public void setAction(String action) {
		this.action = action;
	}

	/**
	 * @return the sourceurl
	 */
	public String getSourceurl() {
		return sourceurl;
	}

	/**
	 * @param sourceurl
	 *            the sourceurl to set
	 */
	public void setSourceurl(String sourceurl) {
		this.sourceurl = sourceurl;
	}

	/**
	 * @return the destpath
	 */
	public String getDestpath() {
		return destpath;
	}

	/**
	 * @param destpath
	 *            the destpath to set
	 */
	public void setDestpath(String destpath) {
		this.destpath = destpath;
	}

	/**
	 * @return the md5
	 */
	public String getMd5() {
		return md5;
	}

	/**
	 * @param md5
	 *            the md5 to set
	 */
	public void setMd5(String md5) {
		this.md5 = md5;
	}

	/**
	 * @return the ftpurl
	 */
	public String getFtpurl() {
		return ftpurl;
	}

	/**
	 * @param ftpurl
	 *            the ftpurl to set
	 */
	public void setFtpurl(String ftpurl) {
		this.ftpurl = ftpurl;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the upstream_id
	 */
	public String getUpstream_id() {
		return upstream_id;
	}

	/**
	 * @param upstream_id
	 *            the upstream_id to set
	 */
	public void setUpstream_id(String upstream_id) {
		this.upstream_id = upstream_id;
	}

	/**
	 * @return the createdate
	 */
	public String getCreatedate() {
		return createdate;
	}

	/**
	 * @param createdate
	 *            the createdate to set
	 */
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}

	/**
	 * @return the createperson
	 */
	public String getCreateperson() {
		return createperson;
	}

	/**
	 * @param createperson
	 *            the createperson to set
	 */
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
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

	public String getDstatus() {
		return dstatus;
	}

	public void setDstatus(String dstatus) {
		this.dstatus = dstatus;
	}

	public String getDeletetime() {
		return deletetime;
	}

	public void setDeletetime(String deletetime) {
		this.deletetime = deletetime;
	}

	public String getDeleteperson() {
		return deleteperson;
	}

	public void setDeleteperson(String deleteperson) {
		this.deleteperson = deleteperson;
	}

	public String getRejectreason() {
		return rejectreason;
	}

	public void setRejectreason(String rejectreason) {
		this.rejectreason = rejectreason;
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

	public String getApi() {
		return api;
	}

	public void setApi(String api) {
		this.api = api;
	}

	public String getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getIsTopic() {
		return isTopic;
	}

	public void setIsTopic(String isTopic) {
		this.isTopic = isTopic;
	}

	public String getTopicUrl() {
		return topicUrl;
	}

	public void setTopicUrl(String topicUrl) {
		this.topicUrl = topicUrl;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public String getIsTopicName() {
		if (!"".equals(isTopic) && isTopic != null) {
			if ("1".equals(isTopic)) {
				return "专题模板";
			} else {
				return "普通模板";
			}
		}
		return isTopic;
	}

	public String getServerIp() {
		return serverIp;
	}

	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}

	public String getTopicStatus() {
		return topicStatus;
	}

	public void setTopicStatus(String topicStatus) {
		this.topicStatus = topicStatus;
	}

	public String getTopicStatusName() {
		if ("1".equals(topicStatus)) {
			return "未审核";
		}
		if ("2".equals(topicStatus)) {
			return "已审核";
		}
		if (null == topicStatus) {
			return "未编辑";
		}
		return topicStatus;
	}

	@Override
	public String toString() {
		return "TempletVO [id=" + id + ", upstreamgroup_id=" + upstreamgroup_id + ", epgfileid=" + epgfileid
				+ ", action=" + action + ", sourceurl=" + sourceurl + ", destpath=" + destpath + ", md5=" + md5
				+ ", ftpurl=" + ftpurl + ", type=" + type + ", upstream_id=" + upstream_id + ", createdate="
				+ createdate + ", createperson=" + createperson + ", filename=" + filename + ", fileid=" + fileid
				+ ", name=" + name + ", source=" + source + ", api=" + api + ", topicUrl=" + topicUrl + ", isTopic="
				+ isTopic + ", topicStatus=" + topicStatus + ", status=" + status + ", level=" + level
				+ ", examinetime=" + examinetime + ", examineperson=" + examineperson + ", dstatus=" + dstatus
				+ ", deletetime=" + deletetime + ", deleteperson=" + deleteperson + ", rejectreason=" + rejectreason
				+ ", begintime=" + begintime + ", endtime=" + endtime + ", downstreamList=" + downstreamList
				+ ", groupIds=" + groupIds + ", downstreamGroupName=" + downstreamGroupName + ", groupIdsUp="
				+ Arrays.toString(groupIdsUp) + ", totalCount=" + totalCount + ", groupName=" + groupName
				+ ", serverName=" + serverName + ", serverIp=" + serverIp + ", getTypeName()=" + getTypeName()
				+ ", getSourceName()=" + getSourceName() + ", getLevelName()=" + getLevelName() + ", getStatusName()="
				+ getStatusName() + ", getFtpurlToShow()=" + getFtpurlToShow() + ", getGroupIdsUp()="
				+ Arrays.toString(getGroupIdsUp()) + ", getDownstreamGroupName()=" + getDownstreamGroupName()
				+ ", getGroupIds()=" + getGroupIds() + ", getDownstreamList()=" + getDownstreamList() + ", getId()="
				+ getId() + ", getUpstreamgroup_id()=" + getUpstreamgroup_id() + ", getEpgfileid()=" + getEpgfileid()
				+ ", getAction()=" + getAction() + ", getSourceurl()=" + getSourceurl() + ", getDestpath()="
				+ getDestpath() + ", getMd5()=" + getMd5() + ", getFtpurl()=" + getFtpurl() + ", getType()=" + getType()
				+ ", getUpstream_id()=" + getUpstream_id() + ", getCreatedate()=" + getCreatedate()
				+ ", getCreateperson()=" + getCreateperson() + ", getFilename()=" + getFilename() + ", getFileid()="
				+ getFileid() + ", getName()=" + getName() + ", getSource()=" + getSource() + ", getStatus()="
				+ getStatus() + ", getLevel()=" + getLevel() + ", getExaminetime()=" + getExaminetime()
				+ ", getExamineperson()=" + getExamineperson() + ", getDstatus()=" + getDstatus() + ", getDeletetime()="
				+ getDeletetime() + ", getDeleteperson()=" + getDeleteperson() + ", getRejectreason()="
				+ getRejectreason() + ", getBegintime()=" + getBegintime() + ", getEndtime()=" + getEndtime()
				+ ", getApi()=" + getApi() + ", getTotalCount()=" + getTotalCount() + ", getGroupName()="
				+ getGroupName() + ", getIsTopic()=" + getIsTopic() + ", getTopicUrl()=" + getTopicUrl()
				+ ", getServerName()=" + getServerName() + ", getIsTopicName()=" + getIsTopicName() + ", getServerIp()="
				+ getServerIp() + ", getTopicStatus()=" + getTopicStatus() + ", getTopicStatusName()="
				+ getTopicStatusName() + ", getTemp_field8()=" + getTemp_field8() + ", getTemp_field9()="
				+ getTemp_field9() + ", getTemp_field10()=" + getTemp_field10() + ", getTemp_field7()="
				+ getTemp_field7() + ", getIds()=" + Arrays.toString(getIds()) + ", getPageid()=" + getPageid()
				+ ", getPagecount()=" + getPagecount() + ", getPages()=" + getPages() + ", getOrderColumn()="
				+ getOrderColumn() + ", getOrderType()=" + getOrderType() + ", getOrderBy()=" + getOrderBy()
				+ ", getTemp_field1()=" + getTemp_field1() + ", getTemp_field2()=" + getTemp_field2()
				+ ", getTemp_field3()=" + getTemp_field3() + ", getTemp_field4()=" + getTemp_field4()
				+ ", getTemp_field5()=" + getTemp_field5() + ", getTemp_field6()=" + getTemp_field6() + ", getCount()="
				+ getCount() + ", getTemp_field11()=" + getTemp_field11() + ", getTemp_field12()=" + getTemp_field12()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}

}
