package com.besto.epgms.mapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import com.besto.epgms.vo.InterfacelogVO;
import com.besto.epgms.vo.XmlinfoVO;
@Repository("interfacelogMapper")
@Lazy
public interface InterfacelogMapper {

	/**
	 * 
	* FunName:        save
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	Integer  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-24>
	 */
	public int add(InterfacelogVO vo)throws Exception;
	
	
	/**
	 * 
	* FunName:        updateReqError
	* Description :   设置接受失败
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	int  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-25>
	 */
	public int updateReqError(InterfacelogVO vo)throws Exception;
	
	
	/**
	 * 
	* FunName:        updateSendError
	* Description :   设置向下游发送失败
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	int  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-25>
	 */
	public int updateSendError(InterfacelogVO vo)throws Exception;
	
	
	
}
