package com.besto.epgms.vo;

/**
 * 用户信息类
 * @author <powell/滕翔>
 *
 */
public class UserInfoVO extends CommunVO{
	private String userid;
	private String username;//用户名称
	private String password;//密码
	private String userrole;//用户角色（简单角色标识 初期用）  弃用
	private String phone;//手机号
	private String email;//邮箱
	private String status;//状态  0生效 1失效
	private String createperson;//创建人
	private String createtime;//注册时间
	private String remark;//备注
	private String remark1;//
	private String remark2;//
	private String remark3;//
	private String exceptuserid;//剔除的userid
	private String[] authoritys;
	private String olduserid;
	private String userrolename;//用户角色名
	/**
	 * @return the olduserid
	 */
	public String getOlduserid() {
		return olduserid;
	}
	/**
	 * @param olduserid the olduserid to set
	 */
	public void setOlduserid(String olduserid) {
		this.olduserid = olduserid;
	}
	/**
	 * @return the authoritys
	 */
	public String[] getAuthoritys() {
		return authoritys;
	}
	/**
	 * @param authoritys the authoritys to set
	 */
	public void setAuthoritys(String[] authoritys) {
		this.authoritys = authoritys;
	}
	/**
	 * @return the exceptuserid
	 */
	public String getExceptuserid() {
		return exceptuserid;
	}
	/**
	 * @param exceptuserid the exceptuserid to set
	 */
	public void setExceptuserid(String exceptuserid) {
		this.exceptuserid = exceptuserid;
	}
	/**
	 * @return the userid
	 */
	public String getUserid() {
		return userid;
	}
	/**
	 * @param userid the userid to set
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}
	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the userrole
	 */
	public String getUserrole() {
		return userrole;
	}
	/**
	 * @param userrole the userrole to set
	 */
	public void setUserrole(String userrole) {
		this.userrole = userrole;
	}
	/**
	 * @return the remark1
	 */
	public String getRemark1() {
		return remark1;
	}
	/**
	 * @param remark1 the remark1 to set
	 */
	public void setRemark1(String remark1) {
		this.remark1 = remark1;
	}
	/**
	 * @return the remark2
	 */
	public String getRemark2() {
		return remark2;
	}
	/**
	 * @param remark2 the remark2 to set
	 */
	public void setRemark2(String remark2) {
		this.remark2 = remark2;
	}
	/**
	 * @return the remark3
	 */
	public String getRemark3() {
		return remark3;
	}
	/**
	 * @param remark3 the remark3 to set
	 */
	public void setRemark3(String remark3) {
		this.remark3 = remark3;
	}
	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}
	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	/**
	 * @return the createperson
	 */
	public String getCreateperson() {
		return createperson;
	}
	/**
	 * @param createperson the createperson to set
	 */
	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}
	/**
	 * @return the createtime
	 */
	public String getCreatetime() {
		return createtime;
	}
	/**
	 * @param createtime the createtime to set
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	/**
	 * @return the remark
	 */
	public String getRemark() {
		return remark;
	}
	/**
	 * @param remark the remark to set
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getStatusName(){
		String value = "";
		if("0".equals(this.status)){
			value = "生效";
		}else if("1".equals(this.status)){
			value = "失效";
		}
		return value;
	}
	
	public String getUserrolename() {
		return userrolename;
	}
	
	public void setUserrolename(String userrolename) {
		this.userrolename = userrolename;
	}
	
}
