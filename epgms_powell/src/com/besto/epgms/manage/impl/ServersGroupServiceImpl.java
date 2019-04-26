
package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.ServersGroupService;
import com.besto.epgms.mapper.ServersGroupMapper;
import com.besto.epgms.vo.ServersGroupVO;

@Service("serversGroupService")
@Lazy
public class ServersGroupServiceImpl implements ServersGroupService {
	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired
	private ServersGroupMapper serversGroupMapper;

	//查询
	public List<ServersGroupVO> search() {

		List<ServersGroupVO> list = new ArrayList<ServersGroupVO>();
		try{
			list=serversGroupMapper.search();
		}catch(Exception e){
			logger.error("search 出错:" + e.getMessage());
		}
		return list;
	}
	
}
