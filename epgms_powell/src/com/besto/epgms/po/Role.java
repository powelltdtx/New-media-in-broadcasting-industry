package com.besto.epgms.po;

import java.util.List;

import com.besto.epgms.vo.MenuVO;


/**角色po*/
public class Role {
	private String id; //主键
	private String name; //角色名称
    private String remark; //描述
    private String createperson; //创建人
    private String createtime; //创建时间
    
    private String[] btnCodes;//按钮code数组
	private List<MenuVO> menuList;//角色权限menu集合
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
	public String[] getBtnCodes() {
		return btnCodes;
	}
	public void setBtnCodes(String[] btnCodes) {
		this.btnCodes = btnCodes;
	}
	public List<MenuVO> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<MenuVO> menuList) {
		this.menuList = menuList;
	}
}
