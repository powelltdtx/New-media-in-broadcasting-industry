/**
 * 操作日志服务接口
 * @author jackicyang
 */
package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.ServerVO;
import com.besto.epgms.vo.ServersGroupVO;


public interface ServersManageService {

	/**
	 * 查询服务器信息
	 * @return
	 * @throws Exception
	 */
	List<ServerVO> search(ServerVO serverVO) throws Exception;
	

	
	/**
	 * 查询有的服务器信息,不分页
	 * @return
	 */
	List<ServerVO> searchAll();
	
	int save(ServerVO serverVO) throws Exception;
	int update(ServerVO serverVO) throws Exception;
	ServerVO searchById(ServerVO serverVO) throws Exception;
	int deleteById(ServerVO serverVO) throws Exception;


	/**
	 * 根据id查询服务器列表
	 * @param ids
	 * @return
	 */
	List<ServerVO> searchServerByIds(ServerVO vo);

}
