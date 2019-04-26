package com.besto.epgms.po;
/**
 * 用户信息类
 * @author <powell/滕翔>
 *
 */
public class UserPermissionInfo {
	private String userid;
	private String roleid;

	public UserPermissionInfo() {
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
	 * @return the roleid
	 */
	public String getRoleid() {
		return roleid;
	}

	/**
	 * @param roleid the roleid to set
	 */
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}


}
