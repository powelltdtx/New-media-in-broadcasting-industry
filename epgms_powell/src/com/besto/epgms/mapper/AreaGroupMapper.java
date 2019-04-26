package com.besto.epgms.mapper;

import java.util.List;
import com.besto.epgms.vo.AreaGroupVO;
import com.besto.epgms.vo.AreaVO;
import com.besto.epgms.vo.GroupVO;

public interface AreaGroupMapper {
	/**
	 * 保存分域关联分组
	 * 
	 * @param areaGroupVO
	 */
	public void save(AreaGroupVO areaGroupVO);
	/**
	 * 根据分域id查询所对应的的分组id
	 * 
	 * @param areaIdArr
	 * @return
	 */
	public List<GroupVO> searchGroupByAreaIds(AreaVO areaVO);
}
