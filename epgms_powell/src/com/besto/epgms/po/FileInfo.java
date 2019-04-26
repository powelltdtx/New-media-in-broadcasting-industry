package com.besto.epgms.po;
/**
 * 用户信息类
 * @author <powell/滕翔>
 *
 */
public class FileInfo {
	private String id;
	private String code;
	private String name;//文件名称
	private String path;//文件路径
	private String status;//文件状态-1下发失败 -2删除失败 0 等待中 1下发中 2下发完成 3等待删除 4删除中 5删除成功
	private String createtime;//创建时间
	private String issuetime;//更新时间
	private String server_id;//服务器id
	private String ftpdatacheckpath;//附属文件ftp路径
	private String ftpdatapath;//数据文件ftp路径
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
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
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
	public String getIssuetime() {
		return issuetime;
	}
	public void setIssuetime(String issuetime) {
		this.issuetime = issuetime;
	}
	public String getServer_id() {
		return server_id;
	}
	public void setServer_id(String server_id) {
		this.server_id = server_id;
	}
	public String getFtpdatacheckpath() {
		return ftpdatacheckpath;
	}
	public void setFtpdatacheckpath(String ftpdatacheckpath) {
		this.ftpdatacheckpath = ftpdatacheckpath;
	}
	public String getFtpdatapath() {
		return ftpdatapath;
	}
	public void setFtpdatapath(String ftpdatapath) {
		this.ftpdatapath = ftpdatapath;
	}
	

}
