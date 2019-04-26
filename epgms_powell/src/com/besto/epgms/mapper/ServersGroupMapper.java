package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.ServerVO;
import com.besto.epgms.vo.ServersGroupVO;

@Repository("serversGroupMapper")
@Lazy
public interface ServersGroupMapper {
	/**
	 * 查询
	 * @param List<ServersGroupVO>
	 * @return
	 * @throws Exception
	 * @author spark
	 * 2018-01-09
	 */
	public List<ServersGroupVO> search()throws Exception;
}
