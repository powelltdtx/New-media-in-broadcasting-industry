package com.besto.epgms.po;


/**
 * 下游平台实体
 * @author <powell/滕翔>
 */
public class Downstream {
	private int id;  //主键
	private String name;  //名称
	private String code;  //平台编码
	private String status;  //状态
	private String description;  //描述
	private String createdate;  //创建时间
	private String createperson;  //创建人
	private String url;//平台地址
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getCreateperson() {
		return createperson;
	}
	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	
}
