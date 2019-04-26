package com.besto.epgms.mapper;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.TemplateAreaVO;
import com.besto.epgms.vo.TempletGroupVO;
@Repository("templetGroupMapper")
@Lazy
public interface TempletGroupMapper {


	
	/**
	 * 
	* FunName:        deleteByTempletId
	* Description :   模板分组根据模板ID删除
	*                     
	* @param  vo
	* @return int
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public int deleteByTempletId(TempletGroupVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        deleteByTempletId
	* Description :   模板分组新增
	*                     
	* @param  vo
	* @return int
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public int save(TempletGroupVO vo) throws Exception;

	
}
