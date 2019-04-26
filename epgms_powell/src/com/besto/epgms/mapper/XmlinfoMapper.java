package com.besto.epgms.mapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import com.besto.epgms.vo.XmlinfoVO;
@Repository("xmlinfoMapper")
@Lazy
public interface XmlinfoMapper {

	/**
	 * 
	* FunName:        add
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	int  
	* @throws                  
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-12-24>
	 */
	public int add(XmlinfoVO vo)throws Exception;
	
	
	
	
}
