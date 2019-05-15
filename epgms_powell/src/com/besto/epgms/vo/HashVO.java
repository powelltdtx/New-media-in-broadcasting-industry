package com.besto.epgms.vo;

import java.util.List;
import java.util.ResourceBundle;

import com.besto.util.StringUitl;

public class HashVO extends CommunVO{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private	int		id;					//主键
	private	String	epggroup;	
	private String	filename;
	private String	hashvalue;
	private String 	createtime;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEpggroup() {
		return epggroup;
	}
	public void setEpggroup(String epggroup) {
		this.epggroup = epggroup;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getHashvalue() {
		return hashvalue;
	}
	public void setHashvalue(String hashvalue) {
		this.hashvalue = hashvalue;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

}
