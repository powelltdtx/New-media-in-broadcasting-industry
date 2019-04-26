package com.besto.epgms.manage;

import javax.jws.WebMethod;
import javax.jws.WebService;

import com.besto.epgms.vo.InterfacelogVO;
import com.besto.epgms.vo.TempletVO;


/**
 * 
*Project:  < epgms>      
* Comments:  <描述>         
* JDK version used:<JDK1.6>
* Namespace:  TemplateSyncCmdRequestService
* Author:   <auther/powell>
* Create Date: <2015-12-24>  
* Version:  <1.0>
 */
//@WebService
public interface InterfacelogService {
	
	
	/**
	 * 
	* FunName:        add
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/powell>  
	* @Create Date:<2015-12-24>
	 */
//	@WebMethod
	public String add(InterfacelogVO vo) throws Exception;
	
	
	
	/**
	 * 
	* FunName:        updateFromDown
	* Description :   根据下游反馈修改接口信息表
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/powell>  
	* @Create Date:<2015-12-28>
	 */
	public String updateFromDown(InterfacelogVO vo)throws Exception;
}
