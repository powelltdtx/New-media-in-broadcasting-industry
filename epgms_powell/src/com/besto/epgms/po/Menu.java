package com.besto.epgms.po;

import java.util.List;

import com.besto.epgms.vo.ButtonVO;


public class Menu {
	  private String id; //主键
    private String code; //菜单编码
    private String name; //菜单名称
    private String action; //菜单动作
    private String level; //菜单级别
    private String parentcode; //父级菜单
    private String sequence; //菜单排序
    private List<ButtonVO> buttonList; //按钮信息集合
    
    //set and get
    public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getParentcode() {
		return parentcode;
	}
	public void setParentcode(String parentcode) {
		this.parentcode = parentcode;
	}
	public String getSequence() {
		return sequence;
	}
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
	public List<ButtonVO> getButtonList() {
			return buttonList;
    }
	public void setButtonList(List<ButtonVO> buttonList) {
		this.buttonList = buttonList;
	}
}
