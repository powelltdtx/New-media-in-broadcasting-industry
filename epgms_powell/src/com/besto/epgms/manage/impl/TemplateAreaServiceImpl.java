package com.besto.epgms.manage.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.TemplateAreaService;
import com.besto.epgms.mapper.TemplateAreaMapper;
import com.besto.epgms.vo.AreaVO;


@Service("templateAreaService")
@Lazy
public class TemplateAreaServiceImpl implements TemplateAreaService {

	
	@Autowired
	TemplateAreaMapper templateAreaMapper;
	
	
	public List<AreaVO> searchAreaPage(AreaVO templateAreaVO) {
		
		List<AreaVO> list = templateAreaMapper.searchPage(templateAreaVO);
		return list;
	}


	@Override
	public List<AreaVO> searchAllArea() {
		List<AreaVO> list = templateAreaMapper.searchAllArea();
		return list;
		
	}


	@Override
	public int save(AreaVO templateAreaVO) {
		templateAreaMapper.add(templateAreaVO);
		return templateAreaVO.getId();
	}


}
