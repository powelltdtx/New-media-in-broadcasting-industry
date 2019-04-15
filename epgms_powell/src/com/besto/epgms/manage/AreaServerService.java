package com.besto.epgms.manage;

import com.besto.epgms.vo.AreaServerVO;

public interface AreaServerService {

	/**
	 * 保存分域服务器关联关系
	 * @param areaServerVO
	 */
	public void save(AreaServerVO areaServerVO);

}
