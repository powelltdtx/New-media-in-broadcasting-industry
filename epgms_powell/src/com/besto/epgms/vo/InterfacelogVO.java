package com.besto.epgms.vo;

public class InterfacelogVO extends CommunVO{
	
	/**
	 * <powell/滕翔>
	 */
	private static final long serialVersionUID = 1L;
	private int  	id;					//
	private String  sendperson;			//发送方
	private String  reqperson;			//接收方
	private String  type;				//类型 1 上游->百途 2百途->上游  3下游->百途 4百途->下游
	private String  datadate;			//发送接收日期
	private String  name;				//接口名称
	private String  decription;			//接口详情
	private String  copid;				//播控平台标识
	private String  sopid;				//省级业务运营平台标识
	private String  correlateid;		//关联性标识
	private String  cmdresult;			//处理结果(接收)
	private String  resultcode;			//处理结果(反馈)
	private String  errordescription;	//对错误异常的描述信息
	private String  cspid;				//上层标识
	private String  lspid;				//下层标识
	private String  cmdfileurl;			//xml指令的url
	private String  result;				//接收结果
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
	 * @return the sendperson
	 */
	public String getSendperson() {
		return sendperson;
	}
	/**
	 * @param sendperson the sendperson to set
	 */
	public void setSendperson(String sendperson) {
		this.sendperson = sendperson;
	}
	/**
	 * @return the reqperson
	 */
	public String getReqperson() {
		return reqperson;
	}
	/**
	 * @param reqperson the reqperson to set
	 */
	public void setReqperson(String reqperson) {
		this.reqperson = reqperson;
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
	 * @return the datadate
	 */
	public String getDatadate() {
		return datadate;
	}
	/**
	 * @param datadate the datadate to set
	 */
	public void setDatadate(String datadate) {
		this.datadate = datadate;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the decription
	 */
	public String getDecription() {
		return decription;
	}
	/**
	 * @param decription the decription to set
	 */
	public void setDecription(String decription) {
		this.decription = decription;
	}
	/**
	 * @return the copid
	 */
	public String getCopid() {
		return copid;
	}
	/**
	 * @param copid the copid to set
	 */
	public void setCopid(String copid) {
		this.copid = copid;
	}
	/**
	 * @return the sopid
	 */
	public String getSopid() {
		return sopid;
	}
	/**
	 * @param sopid the sopid to set
	 */
	public void setSopid(String sopid) {
		this.sopid = sopid;
	}
	/**
	 * @return the correlateid
	 */
	public String getCorrelateid() {
		return correlateid;
	}
	/**
	 * @param correlateid the correlateid to set
	 */
	public void setCorrelateid(String correlateid) {
		this.correlateid = correlateid;
	}
	/**
	 * @return the cmdresult
	 */
	public String getCmdresult() {
		return cmdresult;
	}
	/**
	 * @param cmdresult the cmdresult to set
	 */
	public void setCmdresult(String cmdresult) {
		this.cmdresult = cmdresult;
	}
	/**
	 * @return the resultcode
	 */
	public String getResultcode() {
		return resultcode;
	}
	/**
	 * @param resultcode the resultcode to set
	 */
	public void setResultcode(String resultcode) {
		this.resultcode = resultcode;
	}
	/**
	 * @return the errordescription
	 */
	public String getErrordescription() {
		return errordescription;
	}
	/**
	 * @param errordescription the errordescription to set
	 */
	public void setErrordescription(String errordescription) {
		this.errordescription = errordescription;
	}
	/**
	 * @return the cspid
	 */
	public String getCspid() {
		return cspid;
	}
	/**
	 * @param cspid the cspid to set
	 */
	public void setCspid(String cspid) {
		this.cspid = cspid;
	}


	/**
	 * @return the lspid
	 */
	public String getLspid() {
		return lspid;
	}
	/**
	 * @param lspid the lspid to set
	 */
	public void setLspid(String lspid) {
		this.lspid = lspid;
	}
	/**
	 * @return the cmdfileurl
	 */
	public String getCmdfileurl() {
		return cmdfileurl;
	}
	/**
	 * @param cmdfileurl the cmdfileurl to set
	 */
	public void setCmdfileurl(String cmdfileurl) {
		this.cmdfileurl = cmdfileurl;
	}
	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	/**
	 * @return the result
	 */
	public String getResult() {
		return result;
	}
	/**
	 * @param result the result to set
	 */
	public void setResult(String result) {
		this.result = result;
	}
	
	
	
	
}
