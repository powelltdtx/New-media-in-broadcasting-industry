package com.besto.epgms.po;
/**
 * 分组实体
 * @author <powell/滕翔>
 */
public class Group {
	
	private int id;  //主键
	private String name;  //分组名称
	private String status;  //状态
	private String description;  //描述
	private String url;  //平台地址
	private String code;  //分组编码
	private String type;  //分组类型
	private String downstream_id;  //分组平台
	private String createdate;  //创建时间
	private String createperson;  //创建人
	
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDownstream_id() {
		return downstream_id;
	}
	public void setDownstream_id(String downstreamId) {
		downstream_id = downstreamId;
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
	
} 
