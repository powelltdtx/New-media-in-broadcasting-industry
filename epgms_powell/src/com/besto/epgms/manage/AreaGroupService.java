package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.AreaGroupVO;
import com.besto.epgms.vo.AreaVO;
import com.besto.epgms.vo.GroupVO;


public interface AreaGroupService {

	/**
	 * 保存分域关联分组
	 * @param areaGroupVO
	 */
	public void save(AreaGroupVO areaGroupVO);

	/**
	 * 根据分域id查询所对应的所有分组
	 * @param areaIdArr
	 * @return
	 */
	public List<GroupVO> searchGroupByAreaIds(AreaVO areaVO);

}
