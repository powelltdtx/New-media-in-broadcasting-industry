package com.besto.epgms.vo;

public class XmlinfoVO extends CommunVO{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int  id;
	private String  type;		//1从上游接受  2 向下游发送
	private String  url;		//xml保存路径
	private String  xmldate;	//接受或发送时间
	private String resulttype;	//返回类型
	private int interfacelog_id;//接口日志id
	
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}
	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	/**
	 * @return the xmldate
	 */
	public String getXmldate() {
		return xmldate;
	}
	/**
	 * @param xmldate the xmldate to set
	 */
	public void setXmldate(String xmldate) {
		this.xmldate = xmldate;
	}
	/**
	 * @return the interfacelog_id
	 */
	public int getInterfacelog_id() {
		return interfacelog_id;
	}
	/**
	 * @param interfacelog_id the interfacelog_id to set
	 */
	public void setInterfacelog_id(int interfacelog_id) {
		this.interfacelog_id = interfacelog_id;
	}
	/**
	 * @return the resulttype
	 */
	public String getResulttype() {
		return resulttype;
	}
	/**
	 * @param resulttype the resulttype to set
	 */
	public void setResulttype(String resulttype) {
		this.resulttype = resulttype;
	}
	
	
	
}
