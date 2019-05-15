package com.besto.epgms.vo;

/**
 * 用户信息类
 * @author <powell/滕翔>
 *
 */
public class ServerVO extends CommunVO{
	private String id;
	private String name;//服务器名称
	private String ip;//ip地址
	private String port;//端口
	private String ftpname;//ftp用户名
	private String ftppassword;//ftp密码
	private String createtime;//创建时间
	private String updatetime;//更新时间
	private String groupid;//分组id
	private String groupname;//分组名称
	private String path;//路径
	private String status;//状态
	private String description;//描述
	private String [] ids;
	private String downUrl;//下游平台接口地址
	private String heartbeaturl;//服务器心跳检测接口地址
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getGroupname() {
		return groupname;
	}
	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}	
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
	public String getFtpname() {
		return ftpname;
	}
	public void setFtpname(String ftpname) {
		this.ftpname = ftpname;
	}
	public String getFtppassword() {
		return ftppassword;
	}
	public void setFtppassword(String ftppassword) {
		this.ftppassword = ftppassword;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	public String getGroupid() {
		return groupid;
	}
	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}
	public String[] getIds() {
		return ids;
	}
	public void setIds(String[] ids) {
		this.ids = ids;
	}
	public String getDownUrl() {
		return downUrl;
	}
	public void setDownUrl(String downUrl) {
		this.downUrl = downUrl;
	}
	public String getHeartbeaturl() {
		return heartbeaturl;
	}
	public void setHeartbeaturl(String heartbeaturl) {
		this.heartbeaturl = heartbeaturl;
	}
	
	
	
}
