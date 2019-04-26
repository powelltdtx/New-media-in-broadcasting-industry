package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.HeartBeatService;
import com.besto.epgms.mapper.HeartBeatMapper;
import com.besto.epgms.vo.HeartBeatVO;

@Service("heartBeatService")
@Lazy
public class HeartBeatServiceImpl implements HeartBeatService {

	@Autowired
	HeartBeatMapper heartBeatMapper;
	
	@Override
	public List<HeartBeatVO> search(HeartBeatVO vo){
		List<HeartBeatVO> list=new ArrayList<HeartBeatVO>();
		try {
			list = heartBeatMapper.searchPage(vo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public String add(HeartBeatVO heartBeatVO) {
		
		heartBeatMapper.add(heartBeatVO);
		return null;
	}

	@Override
	public HeartBeatVO selectByCheckCode(HeartBeatVO heartBeatVO) {
		HeartBeatVO vo = heartBeatMapper.selectByCheckCode(heartBeatVO);
		return vo;
	}

	@Override
	public void changeHandleResult() {
		heartBeatMapper.changeHandleResult();
	}

	@Override
	public void updateServerStatus(HeartBeatVO heartBeatVO) {
		heartBeatMapper.updateServerStatus(heartBeatVO);
	}

}
