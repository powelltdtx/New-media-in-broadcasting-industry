package com.besto.epgms.vo;

public class AreaServerVO {

	private int id;//主键
	private int areaId;//分域id
	private int serverId;//分组id
	public AreaServerVO(int id, int areaId, int serverId) {
		super();
		this.id = id;
		this.areaId = areaId;
		this.serverId = serverId;
	}
	public AreaServerVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAreaId() {
		return areaId;
	}
	public void setAreaId(int areaId) {
		this.areaId = areaId;
	}
	public int getServerId() {
		return serverId;
	}
	public void setServerId(int serverId) {
		this.serverId = serverId;
	}
	
	
}
