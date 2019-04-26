package com.besto.epgms.po;
//角色权限关系表
public class Permission {
	private String id; //主键
	private String roleid; //角色id主键
	private String btncode; //按钮编码
	private String menucode; //菜单编码
    //set and get
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getBtncode() {
		return btncode;
	}
	public void setBtncode(String btncode) {
		this.btncode = btncode;
	}
	public String getMenucode() {
		return menucode;
	}
	public void setMenucode(String menucode) {
		this.menucode = menucode;
	}
}
