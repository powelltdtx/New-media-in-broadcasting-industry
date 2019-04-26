package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.GroupVO;
import com.besto.epgms.vo.AreaVO;

public interface TemplateAreaService {

	/**
	 * 获取分域信息
	 * 
	 * @param groupVO
	 * @param groupIds
	 * @return
	 */
	public List<AreaVO> searchAreaPage(AreaVO templateAreaVO);

	
	/**
	 * 获取所以的分域信息
	 * @return
	 */
	public List<AreaVO> searchAllArea();


	/**
	 * 保存分域
	 * @param templateAreaVO
	 */
	public int save(AreaVO templateAreaVO);




}
