package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.StrategyDownstreamGroupVO;
import com.besto.epgms.vo.StrategyVO;


/**
 * 
*Project:  < epgms>      
* Comments:  <描述>         
* JDK version used:<JDK1.6>
* Namespace:  StrategyDownstreamGroupService
* Author:   <powell/滕翔>
* Create Date: <2016-01-22>  
* Version:  <1.0>
 */
public interface StrategyDownstreamGroupService {
	

	
	/**
	 * 
	* FunName:        searchStrategyDownstreamGroupByStrategyId
	* Description :   策略平台分组查询（只是有效策略的有效且平台的有效下发分组）
	*                     
	* @param  vo
	* @return List<StrategyVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>
	* @Create Date:<2016-1-22>
	 */
	public List<StrategyVO> searchStrategyDownstreamGroupByStrategyId (StrategyVO vo) throws Exception;
	
	/**
	 * 
	* FunName:        getDownstreamGroups
	* Description :   通过策略检索下发分组和平台
	*                     
	* @param: vo
	* @param: 
	* @param:
	* @return:	StrategyDownstreamGroupVO
	* @throws    Exception
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-01-28>
	 */
	public StrategyDownstreamGroupVO getDownstreamGroups(StrategyDownstreamGroupVO vo) throws Exception;

	
}
