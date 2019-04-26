package com.besto.epgms.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.FileGuardVO;
import com.besto.epgms.vo.HashVO;
import com.besto.epgms.vo.GuardVO;

@Repository("guardMapper")
public interface GuardMapper {

	public int add(HashVO vo) throws Exception ;
	
	public void add_GuardFile(Map map) throws Exception ;
	
	public void del_GuardFile(Map map) throws Exception ;
	
	public String getFileMd5(Map map)  ;
	
	public void tamperNotice(Map map);
	
	public void tamperNoticeForList(Map map);
	
	public void del_tamperNotice(Map map);
	
	public List<GuardVO> searchPage(GuardVO vo) throws Exception;
	
	public int getFilePathCount(Map map);
	
	public void add_GuardForList(List<FileGuardVO> list);
	
	
}
