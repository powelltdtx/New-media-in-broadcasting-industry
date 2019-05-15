package com.besto.epgms.vo;

public class TemplateAreaVO {
	
	private int id ;//主键
	private int templateId ;//模板id
	private int areaId ;//分域id
	public TemplateAreaVO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public TemplateAreaVO(int id, int templateId, int areaId) {
		super();
		this.id = id;
		this.templateId = templateId;
		this.areaId = areaId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTemplateId() {
		return templateId;
	}
	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}
	public int getAreaId() {
		return areaId;
	}
	public void setAreaId(int areaId) {
		this.areaId = areaId;
	}

}
