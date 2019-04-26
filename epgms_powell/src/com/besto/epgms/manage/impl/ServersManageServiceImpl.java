package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.ServersManageService;
import com.besto.epgms.mapper.ServersManageMapper;
import com.besto.epgms.vo.ServerVO;

@Service("serversManageService")
@Lazy
public class ServersManageServiceImpl implements ServersManageService {
	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired
	private ServersManageMapper serversManageMapper;

	// 分页查询
	public List<ServerVO> search(ServerVO serverVO) {

		List<ServerVO> list = new ArrayList<ServerVO>();
		try {
			list = serversManageMapper.searchPage(serverVO);
		} catch (Exception e) {
			logger.error("searchPage 出错:" + e.getMessage());
		}
		return list;
	}

	// 全量查询
	@Override
	public List<ServerVO> searchAll() {

		List<ServerVO> list = serversManageMapper.searchAll();
		return list;
	}

	@Override
	public int save(ServerVO serverVO) throws Exception {
		// TODO Auto-generated method stub
		int rows = serversManageMapper.save(serverVO);
		return rows;
	}

	@Override
	public int update(ServerVO serverVO) throws Exception {
		// TODO Auto-generated method stub
		int rows = serversManageMapper.update(serverVO);
		return rows;
	}

	@Override
	public ServerVO searchById(ServerVO serverVO) throws Exception {
		// TODO Auto-generated method stub
		List<ServerVO> list = serversManageMapper.searchById(serverVO);
		ServerVO vo = list.get(0);
		return vo;
	}

	@Override
	public int deleteById(ServerVO serverVO) throws Exception {
		int rows = serversManageMapper.deleteById(serverVO);
		return rows;
	}

	@Override
	public List<ServerVO> searchServerByIds(ServerVO vo) {
		List<ServerVO> list = serversManageMapper.searchServerByIds(vo);
		return list;
	}

}
