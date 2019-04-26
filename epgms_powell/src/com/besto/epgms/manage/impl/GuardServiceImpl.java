package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.GuardService;
import com.besto.epgms.mapper.GuardMapper;
import com.besto.epgms.vo.GuardVO;
import com.besto.epgms.vo.HashVO;

@Service("guardService")
@Lazy
public class GuardServiceImpl implements GuardService{
	
	private static Logger log = Logger.getLogger(GuardServiceImpl.class);
	@Autowired
	GuardMapper guardMapper;
	
	
	@Override
	public String add(HashVO vo){
		try {
			guardMapper.add(vo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public String search(HashVO vo) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public String delete(HashVO vo) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public String getFileMd5(Map map) {
		
		return guardMapper.getFileMd5(map);
	}


	@Override
	public void tamperNotice(Map map) {
		
		guardMapper.del_tamperNotice(map);
		
		guardMapper.tamperNotice(map);
	}


	@Override
	public List<GuardVO> search(GuardVO vo) {
		
		List<GuardVO> list=new ArrayList<GuardVO>();
		
		try {
			list=guardMapper.searchPage(vo);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return list;
	}


	@Override
	public int getFilePathCount(Map map) {
		
		return guardMapper.getFilePathCount(map);
	}


}
