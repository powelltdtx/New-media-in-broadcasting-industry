package com.besto.epgms.vo;

import java.util.List;

/**角色vo*/
public class RoleVO extends CommunVO{
    private String id; //主键
	private String name; //角色名称
    private String remark; //描述
    private String createperson; //创建人
    private String createtime; //创建时间
    private String menus; //角色权限menu
    
	private String[] btnCodes;//按钮code数组
	private List<MenuVO> menuList;//角色权限menu集合
	private List<ButtonVO> btnList;//角色权限btn集合
	// set and get
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
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCreateperson() {
		return createperson;
	}
	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getMenus() {
		return menus;
	}
	public void setMenus(String menus) {
		this.menus = menus;
	}
	 public List<MenuVO> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<MenuVO> menuList) {
		this.menuList = menuList;
	}
	public String[] getBtnCodes() {
		return btnCodes;
	}
	public void setBtnCodes(String[] btnCodes) {
		this.btnCodes = btnCodes;
	}
	 public List<ButtonVO> getBtnList() {
			return btnList;
		}
		public void setBtnList(List<ButtonVO> btnList) {
			this.btnList = btnList;
		}
}
