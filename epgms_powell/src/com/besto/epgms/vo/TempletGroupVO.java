package com.besto.epgms.vo;


public class TempletGroupVO extends CommunVO{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id;				//主键
	private int templet_id;	
	private String group_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTemplet_id() {
		return templet_id;
	}
	public void setTemplet_id(int templetId) {
		templet_id = templetId;
	}
	public String getGroup_id() {
		return group_id;
	}
	public void setGroup_id(String groupId) {
		group_id = groupId;
	}
	
	
	
}
