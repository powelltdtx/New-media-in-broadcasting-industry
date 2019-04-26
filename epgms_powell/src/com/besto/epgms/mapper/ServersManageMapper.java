package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.ServerVO;
import com.besto.epgms.vo.TempletVO;

@Repository("serversManageMapper")
@Lazy
public interface ServersManageMapper {
	/**
	 * 分页查询
	 * @param log
	 * @return
	 * @throws Exception
	 * @ella
	 * 2015-05-19
	 */
	public List<ServerVO> searchPage(ServerVO serverVO)throws Exception;
	
	/**
	 * 查询有的服务器信息,不分页
	 * @return
	 */
	List<ServerVO> searchAll();
	
	public int save(ServerVO serverVO)throws Exception;
	public int update(ServerVO serverVO)throws Exception;
	public List<ServerVO> searchById(ServerVO serverVO)throws Exception;
	public int deleteById(ServerVO serverVO)throws Exception;

	/**
	 * 根据id查询服务器信息
	 * @param ids
	 * @return
	 */
	public List<ServerVO> searchServerByIds(ServerVO vo);
	/**
	 * 查询服务器信息
	 * @return
	 * @throws Exception
	 */
	List<ServerVO> searchServerByTemplateId(TempletVO templetVO) throws Exception;
	
}
