package com.besto.epgms.manage;

import java.util.List;
import java.util.Map;

import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import com.besto.epgms.vo.GuardVO;
import com.besto.epgms.vo.HashVO;


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


public interface GuardService {
	
	
	/**
	 * 
	* FunName:        add
	* Description :   更新hash值
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/powell>  
	* @Create Date:<2017-03-08>
	 */
	public String add(HashVO vo);
	
	/**
	 * 
	* FunName:        add
	* Description :   查询hash值
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/powell>  
	* @Create Date:<2017-03-08>
	 */
	public String search(HashVO vo);
	
	/**
	 * 
	* FunName:        add
	* Description :   删除hash值
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	String  
	* @throws                  
	* @Author:   <auther/powell>  
	* @Create Date:<2017-03-08>
	 */
	public String delete(HashVO vo);

	
	public String getFileMd5(Map map);
	
	public void tamperNotice(Map map);
	
	public List<GuardVO> search(GuardVO vo);
	
	public int getFilePathCount(Map map);
}
