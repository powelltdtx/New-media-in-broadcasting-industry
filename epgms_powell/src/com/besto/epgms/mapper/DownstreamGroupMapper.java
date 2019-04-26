package com.besto.epgms.mapper;

import java.util.List;

import com.besto.epgms.vo.DownstreamGroupVO;

public interface DownstreamGroupMapper {

	/**
	 * 
	* FunName:        getDownPreviewGroups
	* Description :   平台指定预览分组查询 
	*                     
	* @param: 
	* @param:
	* @param:
	* @return:	List<DownstreamGroupVO>  
	* @throws    Exception
	* @Author:   <powell/滕翔> 
	* @Create Date:<2016-01-28>
	 */
	public List<DownstreamGroupVO> getDownPreviewGroups(String[] groupIds) throws Exception;

	
}
