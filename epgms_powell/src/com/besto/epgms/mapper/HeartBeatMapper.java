package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.HeartBeatVO;

@Repository("heartBeatMapper")
public interface HeartBeatMapper {

	public List<HeartBeatVO> searchPage(HeartBeatVO vo) throws Exception;

	public int add(HeartBeatVO heartBeatVO);
	
	public HeartBeatVO selectByCheckCode(HeartBeatVO heartBeatVO);
	
	public void changeHandleResult();

	public void updateServerStatus(HeartBeatVO heartBeatVO);
}
