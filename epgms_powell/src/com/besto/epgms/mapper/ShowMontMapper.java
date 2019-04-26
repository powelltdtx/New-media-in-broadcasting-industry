package com.besto.epgms.mapper;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.GuardAllInfoVO;
import com.besto.epgms.vo.GuardVO;
import com.besto.epgms.vo.HeartBeatVO;
import com.besto.epgms.vo.TempletVO;

@Repository("showMontMapper")
public interface ShowMontMapper {
	//根据日期查询服务器监控信息总数
	public Integer searchMonitorCountByServer(TempletVO templetVO);
	//根据日期查询模板文件监控异常信息总数
	public Integer searchMonitorCountByTemplate(HeartBeatVO heartBeatVO);
	
	//查询服务器监控信息总数
	public Integer searchTotalCountByServer();
	//查询模板文件监控异常信息总数
	public Integer searchTotalCountByTemplate();
	
	//条形图--查询15天内模板异常信息总和
	public List<HashMap<Date, Long>> searchTemplateCountByBar();
	//条形图--查询15天内服务器异常信息总和
	public List<HashMap<Date, Long>> searchServerCountByBar();
	
	//灯光:1.模板文件监控(GuardVO)
	public List<GuardVO> searchLightForTemplate();
	//查询30内插入模板异常信息表的数据
	public List<GuardVO> searchLightForTemplate30Second();
	
	//灯光:2.服务器监控(HeartBeatVO)
	public List<HeartBeatVO> searchLightForServer();
	
	//查询模版文件异常信息表所有结果	
	public List<GuardAllInfoVO> searchAllForTemplate();
	
}
