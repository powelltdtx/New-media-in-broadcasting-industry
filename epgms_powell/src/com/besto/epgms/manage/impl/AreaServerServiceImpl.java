package com.besto.epgms.manage.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.AreaServerService;
import com.besto.epgms.mapper.AreaServerMapper;
import com.besto.epgms.vo.AreaServerVO;

@Service("areaServerService")
@Lazy
public class AreaServerServiceImpl implements AreaServerService {

	@Autowired
	AreaServerMapper areaServerMapper;
	
	@Override
	public void save(AreaServerVO areaServerVO) {
		areaServerMapper.save(areaServerVO);
	}

}
