package com.besto.epgms.bean;


/**
 * 
*Project:  < ms>      
* Comments:  接收下游反馈的result  bean   
* JDK version used:<JDK1.6>
* Namespace:  ExecCmdRequestBean
* Author:   <auther/滕翔>
* Create Date: <2015-12-30>  
* Version:  <1.0>
 */
public class ExecCmdRequestBean implements java.io.Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int Result;
	private String ErrorDescription;
	/**
	 * @return the result
	 */
	public int getResult() {
		return Result;
	}
	/**
	 * @param result the result to set
	 */
	public void setResult(int result) {
		Result = result;
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
