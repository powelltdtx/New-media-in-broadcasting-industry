package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.StrategyDownstreamGroupVO;
import com.besto.epgms.vo.StrategyVO;
@Repository("strategyDownstreamGroupMapper")
@Lazy
public interface StrategyDownstreamGroupMapper {

	
	
	/**
	 * 
	* FunName:        searchDownstreamGroup
	* Description :   平台分组查询（只是有效且平台的有效下发分组）id不存在的情况下全部策略查询
	*                     
	* @param StrategyVO
	* @return List<StrategyDownstreamGroupVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public List<StrategyDownstreamGroupVO> searchStrategyDownstreamGroupByStrategyId(StrategyVO vo) throws Exception;

	/**
	 * 
	* FunName:        searchDownstreamGroupByStrategyIds
	* Description :   通过策略ID查询平台分组（只是有效且平台的有效下发分组）id不存在的情况下全部策略查询
	*                     
	* @param StrategyVO
	* @return List<StrategyDownstreamGroupVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2015-1-22>
	 */
	public List<StrategyDownstreamGroupVO> searchDownstreamGroupByStrategyIds(StrategyDownstreamGroupVO vo) throws Exception;
	
}
