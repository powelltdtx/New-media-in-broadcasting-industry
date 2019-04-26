/**
 * 操作日志服务接口
 * @author jackicyang
 */
package com.besto.epgms.manage;

import java.util.List;
import com.besto.epgms.vo.ServersGroupVO;


public interface ServersGroupService {

	/**
	 * 查询服务器信息
	 * @return
	 * @throws Exception
	 */
	List<ServersGroupVO> search() throws Exception;
}
