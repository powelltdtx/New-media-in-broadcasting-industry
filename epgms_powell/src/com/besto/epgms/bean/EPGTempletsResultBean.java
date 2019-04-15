package com.besto.epgms.bean;


/**
 * 
*Project:  < ms>      
* Comments:  反馈上游的result bean         
* JDK version used:<JDK1.6>
* Namespace:  ExecCmdRequestBean
* Author:   <auther/滕翔>
* Create Date: <2015-12-30>  
* Version:  <1.0>
 */
public class EPGTempletsResultBean implements java.io.Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private int ResultCode;
	private String ErrorDescription;
	/**
	 * @return the resultCode
	 */
	public int getResultCode() {
		return ResultCode;
	}
	/**
	 * @param resultCode the resultCode to set
	 */
	public void setResultCode(int resultCode) {
		ResultCode = resultCode;
	}
	/**
	 * @return the errorDescription
	 */
	public String getErrorDescription() {
		return ErrorDescription;
	}
	/**
	 * @param errorDescription the errorDescription to set
	 */
	public void setErrorDescription(String errorDescription) {
		ErrorDescription = errorDescription;
	}
	
	
	
	
}
