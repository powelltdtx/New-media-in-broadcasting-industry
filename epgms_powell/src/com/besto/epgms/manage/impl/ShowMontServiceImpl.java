package com.besto.epgms.manage.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.ShowMontService;
import com.besto.epgms.mapper.ShowMontMapper;
import com.besto.epgms.vo.GuardAllInfoVO;
import com.besto.epgms.vo.GuardVO;
import com.besto.epgms.vo.HeartBeatVO;
import com.besto.epgms.vo.TempletVO;

@Service("showMontService")
@Lazy
public class ShowMontServiceImpl<E> implements ShowMontService {

	@Autowired
	ShowMontMapper showMontMapper;

	/**
	 * 预警数量查询
	 */
	@Override
	public Map<String, Integer> searchMonitorCount() {
		// 查询本日预警数
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String today = format.format(date);

		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(calendar.DATE, 1);// 把日期往后增加一天.整数往后推,负数往前移动
		Date date2 = calendar.getTime(); // 这个时间就是日期往后推一天的结果
		String tomorrow = format.format(date2);

		TempletVO templetVO = new TempletVO();
		templetVO.setBegintime(today);
		templetVO.setEndtime(tomorrow);

		// 服务器监控本日异常信息
		Integer dayCountByServer = showMontMapper
				.searchMonitorCountByServer(templetVO);

		HeartBeatVO heartBeatVO = new HeartBeatVO();
		heartBeatVO.setBegintime(today);
		heartBeatVO.setEndtime(tomorrow);
		// 模板文件监控本日异常信息
		Integer dayCountByTemplate = showMontMapper
				.searchMonitorCountByTemplate(heartBeatVO);

		// 本日总异常信息
		Integer dayTotalCount = dayCountByServer + dayCountByTemplate;

		Calendar cale = new GregorianCalendar();
		String firstday, lastday;
		// 获取前月的第一天
		cale = Calendar.getInstance();
		cale.add(Calendar.MONTH, 0);
		cale.set(Calendar.DAY_OF_MONTH, 1);
		firstday = format.format(cale.getTime());
		// 获取前月的最后一天
		cale = Calendar.getInstance();
		cale.add(Calendar.MONTH, 1);
		cale.set(Calendar.DAY_OF_MONTH, 0);
		lastday = format.format(cale.getTime());

		templetVO.setBegintime(firstday);
		templetVO.setEndtime(lastday);
		// 服务器监控本月异常信息
		Integer monthCountByServer = showMontMapper
				.searchMonitorCountByServer(templetVO);

		heartBeatVO.setBegintime(firstday);
		heartBeatVO.setEndtime(lastday);
		// 文件监控本月异常信息
		Integer monthCountByTemplate = showMontMapper
				.searchMonitorCountByTemplate(heartBeatVO);

		// 本月总异常信息
		Integer monthTotalCount = monthCountByServer + monthCountByTemplate;

		// 服务器异常信息总数
		Integer totalCountByServer = showMontMapper.searchTotalCountByServer();
		// 模板文件异常信息总数
		Integer totalCountByTemplate = showMontMapper
				.searchTotalCountByTemplate();

		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("dayTotalCount", dayTotalCount);
		map.put("monthTotalCount", monthTotalCount);
		map.put("totalCountByServer", totalCountByServer);
		map.put("totalCountByTemplate", totalCountByTemplate);

		return map;
	}

	/**
	 * 条形图---模板异常信息数量总和
	 * @return
	 */
	public List<HashMap<Date, Long>> searchTemplateCountByBar() {
		List<HashMap<Date, Long>> list = showMontMapper.searchTemplateCountByBar();
		return list;
	}
	/**
	 * 条形图---服务器异常信息数量总和
	 * @return
	 */
	public List<HashMap<Date, Long>> searchServerCountByBar() {
		List<HashMap<Date, Long>> list = showMontMapper.searchServerCountByBar();
		return list;
	}

	@Override
	public List<GuardVO> searchLightForTemplate() {
		List<GuardVO> list = showMontMapper.searchLightForTemplate();
		
		return list;
	}

	@Override
	public List<HeartBeatVO> searchLightForServer() {
		List<HeartBeatVO> list = showMontMapper.searchLightForServer();
		return list;
	}

	//查询30内插入模板异常信息表的数据
	@Override
	public List<GuardVO> searchLightForTemplate30Second() {
		List<GuardVO> list = showMontMapper.searchLightForTemplate30Second();
		return list;
	}
	
	public List<GuardAllInfoVO> searchAllForTemplate() {
		List<GuardAllInfoVO> searchAllForTemplate = showMontMapper.searchAllForTemplate();
		return searchAllForTemplate;
	}

}
