package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.TempletHistoryVO;

/**
 * 
*Project:  < epgms>      
* Comments:  上线历史         
* JDK version used:<JDK1.6>
* Namespace:  TempletHistoryService
* Author:   <powell/滕翔>
* Create Date: <2016-01-22>  
* Version:  <1.0>
 */
public interface TempletHistoryService {
	
	/**
	 * 
	* FunName:        search
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return   
	* @return:	List<TempletHistoryVO>  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public List<TempletHistoryVO> search(TempletHistoryVO vo);
	/**
	 * 
	* FunName:        searchById
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	TempletHistoryVO  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public TempletHistoryVO searchById(TempletHistoryVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        save
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	void  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	public void save(TempletHistoryVO vo) throws Exception;
	
	
}
