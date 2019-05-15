package com.besto.epgms.vo;

public class PoolPicVO extends CommunVO {
	private static final long serialVersionUID = 1L;
	
	private int id;  //主键
	private String picId;  //图片id
	private String poolId;  //模板库中的模板id
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPicId() {
		return picId;
	}
	public void setPicId(String picId) {
		this.picId = picId;
	}
	public String getPoolId() {
		return poolId;
	}
	public void setPoolId(String poolId) {
		this.poolId = poolId;
	}
}
