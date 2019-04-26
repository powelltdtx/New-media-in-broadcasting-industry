package com.besto.epgms.mapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import com.besto.epgms.vo.UpstreamgroupVO;
@Repository("upstreamgroupMapper")
@Lazy
public interface UpstreamgroupMapper {

	/**
	 * 
	* FunName:        add
	* Description :   TODO
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	Integer  
	* @throws                  
	* @Author:   <powell/滕翔> 
	* @Create Date:<2015-12-25>
	 */
	public int add(UpstreamgroupVO vo)throws Exception;
	
}
