package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.HeartBeatVO;

public interface HeartBeatService {

	public List<HeartBeatVO> search(HeartBeatVO heartBeatVO);
	
	public String add(HeartBeatVO heartBeatVO);
	
	public HeartBeatVO selectByCheckCode(HeartBeatVO heartBeatVO);
	
	public void changeHandleResult();

	public void updateServerStatus(HeartBeatVO heartBeatVO);
}
