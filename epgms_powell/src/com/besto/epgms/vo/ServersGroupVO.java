package com.besto.epgms.vo;

/**
 * 用户信息类
 * @author <powell/滕翔>
 *
 */
public class ServersGroupVO extends CommunVO{
	private String id;
	private String name;//服务器名称
	private String status;//状态
	private String createtime;//创建时间
	private String updatetime;//更新时间
	private String description;//描述
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
	public String getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	
}
