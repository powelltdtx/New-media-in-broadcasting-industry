package com.besto.epgms.manage.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.AreaGroupService;
import com.besto.epgms.mapper.AreaGroupMapper;
import com.besto.epgms.vo.AreaGroupVO;
import com.besto.epgms.vo.AreaVO;
import com.besto.epgms.vo.GroupVO;

@Service("areaGroupService")
@Lazy
public class AreaGroupServiceImpl implements AreaGroupService {

	@Autowired
	AreaGroupMapper areaGroupMapper;

	@Override
	public void save(AreaGroupVO areaGroupVO) {
		areaGroupMapper.save(areaGroupVO);
	}

	@Override
	public List<GroupVO> searchGroupByAreaIds(AreaVO areaVO) {
		List<GroupVO> list = areaGroupMapper.searchGroupByAreaIds(areaVO);
		return list;
	}

}
