package com.besto.epgms.manage;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.besto.epgms.vo.GuardAllInfoVO;
import com.besto.epgms.vo.GuardVO;
import com.besto.epgms.vo.HeartBeatVO;
import com.besto.epgms.vo.TempletVO;

public interface ShowMontService {
/**
 * 预警数量查询
 * @return
 */
	public Map<String,Integer> searchMonitorCount();

	/**
	 * 条形图-查询15天内模板异常信息总和
	 * @return
	 */
	public List<HashMap<Date, Long>> searchTemplateCountByBar();
	/**
	 * 条形图-查询15天内服务器异常信息总和
	 * @return
	 */
	public List<HashMap<Date, Long>> searchServerCountByBar();
	
	/**
	 * 灯光-服务器监控
	 */
	public List<HeartBeatVO> searchLightForServer();
	/**
	 * 灯光-模板文件监控
	 */
	public List<GuardVO> searchLightForTemplate();
	//查询30内插入模板异常信息表的数据
	public List<GuardVO> searchLightForTemplate30Second();
	
	//查询模版文件异常信息表所有信息	
	public List<GuardAllInfoVO> searchAllForTemplate();
	
	
}
