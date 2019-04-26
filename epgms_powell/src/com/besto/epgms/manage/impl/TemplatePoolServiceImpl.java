package com.besto.epgms.manage.impl;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.TemplatePoolService;
import com.besto.epgms.mapper.TemplatePoolMapper;
import com.besto.epgms.mapper.TempletMapper;
import com.besto.epgms.vo.PicVO;
import com.besto.epgms.vo.PoolPicVO;
import com.besto.epgms.vo.PoolVO;
import com.besto.epgms.vo.TempletVO;


@Service("templatePoolService")
@Lazy
public class TemplatePoolServiceImpl implements TemplatePoolService {

	@Autowired
	TemplatePoolMapper templatePoolMapper;
	@Autowired
	TempletMapper templetMapper;
	@Override
	public String savePool(PoolVO poolVO) throws Exception {
		templatePoolMapper.savePool(poolVO);
		int poolId = poolVO.getId();
		return poolId+"";
	}
	@Override
	public String savePic(PicVO vo) {
		templatePoolMapper.savePic(vo);
		int picId = vo.getId();
		return picId+"";
	}
	@Override
	public String saveEpgms_Pool_Pic(PoolPicVO vo) {
		Long result = templatePoolMapper.saveEpgms_Pool_Pic(vo);
		return result + "";
		
	}
	@Override
	public List<PoolVO> search(PoolVO vo) {
		List<PoolVO> list = templatePoolMapper.searchPage(vo);
		return list;
	}
	@Override
	public TempletVO searchTemplate(TempletVO vo) throws Exception {
		TempletVO templetVO = templetMapper.getTempletById(vo);
		return templetVO;
	}
	@Override
	public PoolVO searchPoolById(PoolVO vo) throws Exception {
		PoolVO poolVO = templatePoolMapper.searchPoolById(vo);
		return poolVO;
	}
	@Override
	public PicVO searchPicByPoolId(PoolVO poolVO) {
		PicVO picVO = templatePoolMapper.searchPicByPoolId(poolVO);
		return picVO;
	}
	@Override
	public int updatePoolById(PoolVO poolVO) {
		int updatePoolById = templatePoolMapper.updatePoolById(poolVO);
		return updatePoolById;
	}

}
