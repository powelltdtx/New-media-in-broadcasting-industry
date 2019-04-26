package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.TempletHistoryService;
import com.besto.epgms.mapper.TempletHistoryMapper;
import com.besto.epgms.vo.TempletHistoryVO;

/**
 * 
*Project:  < epgms>      
* Comments:  <上线历史>         
* JDK version used:<JDK1.6>
* Namespace:  TempletHistoryServiceImpl
* Author:   <powell/滕翔>
* Create Date: <2016-1-22>  
* Version:  <1.0>
 */
@Service("spInfoService")
@Lazy
public class TempletHistoryServiceImpl implements TempletHistoryService {
	private static Logger log = Logger.getLogger(TempletHistoryServiceImpl.class);
	/**初始化DAO类*/
	@Autowired
	private TempletHistoryMapper templetHistoryMapper;
	
	
	public List<TempletHistoryVO> search(TempletHistoryVO vo) {
		List<TempletHistoryVO> list = new ArrayList<TempletHistoryVO>();
		try{
			list=templetHistoryMapper.searchPage(vo);
		}catch(Exception e){
			log.error("searchPage 出错:" + e.getMessage());
		}
		
		return list;
	}
	
	public TempletHistoryVO searchById(TempletHistoryVO vo)  throws Exception{
			vo=templetHistoryMapper.searchById(vo);
		return vo;
	}

	@Override
	public void save(TempletHistoryVO vo) throws Exception {
		templetHistoryMapper.save(vo);
	}
	
	
	
}
