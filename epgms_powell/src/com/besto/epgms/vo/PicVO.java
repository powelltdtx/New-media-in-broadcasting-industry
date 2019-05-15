package com.besto.epgms.vo;

public class PicVO extends CommunVO {
	private static final long serialVersionUID = 1L;
	
	private int id;  //主键
	private String picName;  //图片名称
	private String path;  //图片路径
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPicName() {
		return picName;
	}
	public void setPicName(String picName) {
		this.picName = picName;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
}
