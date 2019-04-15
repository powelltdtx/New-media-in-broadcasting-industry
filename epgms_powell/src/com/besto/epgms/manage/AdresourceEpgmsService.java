package com.besto.epgms.manage;

import java.util.List;
import java.util.Map;

import com.besto.epgms.vo.AdresourceVO;


/** 
 * @作者 powell 
 * @创建日期 2014-12-17 
 * @版本 V 1.0 
 * @说明 广告资源服务接口类
 */
public interface AdresourceEpgmsService {
	
	
	/**
	 * 添加页面的弹出层查询cms的节目单分类
	 * @author william
	 * @version 1.8.6  2016.06.20
	 * @param vo
	 * @param groupid
	 * @return Map
	 */
	public Map<String, String> searchScheduleClassify(AdresourceVO vo) throws Exception;
	
	/**
	 * 根据节目单名称查询cms的直播列表
	 * @param 
	 * @return list
	 */
	public Map searchCmsLive(AdresourceVO adresource, String groupId);
	
	/**
	 * 根据节目单名称查询cms节目单
	 * @param 
	 * @return list
	 */
	public List searchCmsSchedule(AdresourceVO adresource, String groupId);

	/**
	 * 根据内容名称查询cms内容
	 * @param 
	 * @return list
	 */
	public List searchCmsProgram(AdresourceVO adresource,String groupId);


	/**
	 * 根据分类名称查询cms分类
	 * @param vo,groupId
	 * @return list
	 * @throws Exception 
	 */
	public List searchCmsCategory(AdresourceVO adresource,String groupId) throws Exception;


}
