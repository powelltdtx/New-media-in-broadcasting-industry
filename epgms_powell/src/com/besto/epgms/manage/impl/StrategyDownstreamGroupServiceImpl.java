package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.StrategyDownstreamGroupService;
import com.besto.epgms.mapper.StrategyDownstreamGroupMapper;
import com.besto.epgms.vo.DownstreamVO;
import com.besto.epgms.vo.GroupVO;
import com.besto.epgms.vo.StrategyDownstreamGroupVO;
import com.besto.epgms.vo.StrategyVO;


@Service("strategyDownstreamGroupService")
@Lazy
public class StrategyDownstreamGroupServiceImpl implements StrategyDownstreamGroupService{

	

	private static Logger log = Logger.getLogger(StrategyDownstreamGroupServiceImpl.class);

	@Autowired
	StrategyDownstreamGroupMapper strategyDownstreamGroupMapper;

	/**
	 * 
	* FunName:        searchStrategyDownstreamGroupByStrategyId
	* Description :   策略平台分组查询（只是有效策略的有效且平台的有效下发分组）id不存在的情况下全部策略查询
	*                     
	* @param  vo
	* @return List<StrategyVO>
	* @throws Exception 
	* @throws 
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-1-22>
	 */
	@Override
	public List<StrategyVO> searchStrategyDownstreamGroupByStrategyId(
			StrategyVO vo) throws Exception {
		// 查询模板表
		List<StrategyDownstreamGroupVO> list = new ArrayList<StrategyDownstreamGroupVO>();
		// 策略列表
		List<StrategyVO> strategyVOList = new ArrayList<StrategyVO>();
		try {
			// 策略分组平台查询
			list = strategyDownstreamGroupMapper.searchStrategyDownstreamGroupByStrategyId(vo);
			
			if (list.size() > 0) {
				// 策略分组平台查询结果循环
				// 策略列表是否存在
				for (StrategyDownstreamGroupVO strategyDownstreamGroupVO:list) {
					boolean strategyflg = false;
					// 策略列表中策略存在判定
					for (StrategyVO strategyVOTemp:strategyVOList) {
						if (strategyVOTemp.getId() == strategyDownstreamGroupVO.getStrategy_id()) {
							// 存在结束循环
							strategyflg = true;
							break;
						}
					}
					// 策略列表中如果不存在
					if (!strategyflg) {
						StrategyVO strategyVO = new StrategyVO();
						// 下游平台查询
						List<DownstreamVO> downstreamList = new ArrayList<DownstreamVO>();
						// 追加策略
						// 策略ID
						strategyVO.setId(strategyDownstreamGroupVO.getStrategy_id());
						// 策略名称
						strategyVO.setName(strategyDownstreamGroupVO.getStrategy_name());
						// 策略平台
						strategyVO.setDownstreamList(downstreamList);
						
						// 策略分组平台查询结果循环
						for (StrategyDownstreamGroupVO strategyDownstreamGroupVOtemp:list) {
							int downstreamId = strategyDownstreamGroupVOtemp.getDownStream_id();
							// 下游平台是否存在
							boolean downstreamflg = false;
							for (DownstreamVO downstreamVOtemp:downstreamList) {
								if (downstreamVOtemp.getId() == downstreamId) {
									// 存在结束循环
									downstreamflg = true;
									break;
								}
							}
							// 下游平台列表中不存在，加入下游平台列表
							if (!downstreamflg) {
								DownstreamVO downstreamVO = new DownstreamVO();
								// downstreamVO的groupVOList设定
								List<GroupVO> groupList = new ArrayList<GroupVO>();
								// TODO :downstreamVO的设定 有需要追加项目
								// 下游平台ID
								downstreamVO.setId(strategyDownstreamGroupVOtemp.getDownStream_id());
								// 下游平台名称
								downstreamVO.setName(strategyDownstreamGroupVOtemp.getDownStream_name());
								// 加入分组列表
								downstreamVO.setGroupList(groupList);
								for (StrategyDownstreamGroupVO strategyGroupVOTemp:list) {
									if(strategyGroupVOTemp.getDownStream_id() == downstreamVO.getId()) {
										// 平台下分组
										GroupVO groupVO = new GroupVO();
										// TODO：平台下分组设置
										// 分组ID
										groupVO.setId(strategyGroupVOTemp.getGroup_id());
										// 分组名称
										groupVO.setName(strategyGroupVOTemp.getGroup_name());
										groupList.add(groupVO);
									}
								}
								
								//加入平台列表
								downstreamList.add(downstreamVO);
							}
						}
						// 策略加入列表
						strategyVOList.add(strategyVO);
					}
				}
			}
		} catch (Exception e) {
			log.error("searchStrategyDownstreamGroupByStrategyId 出错:" + e.getMessage());
		}
		return strategyVOList;
	}

	
	/**
	 * 
	* FunName:        getDownstreamGroups
	* Description :   通过策略检索下发分组和平台
	*                     
	* @param: vo
	* @param: 
	* @param:
	* @return:	StrategyDownstreamGroupVO
	* @throws    Exception
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-01-28>
	 */
	@Override
	public StrategyDownstreamGroupVO getDownstreamGroups(StrategyDownstreamGroupVO vo) throws Exception {
		List<StrategyDownstreamGroupVO> list = new ArrayList<StrategyDownstreamGroupVO>();
		StrategyDownstreamGroupVO newVO = new StrategyDownstreamGroupVO();
		try {
			String groupIds = "";
			String groupNames = "";
			list = strategyDownstreamGroupMapper.searchDownstreamGroupByStrategyIds(vo);
			for (int i =0;i < list.size(); i++) {
				StrategyDownstreamGroupVO svo = list.get(i);
				if (i == 0) {
					groupIds = groupIds + svo.getGroupIds();
				} else {
					groupIds = groupIds + "," +svo.getGroupIds();
				}
				if (i == list.size() - 1) {
					groupNames = groupNames + svo.getDownStream_name()+ ":" + svo.getGroupNames();
				} else {
					groupNames = groupNames + svo.getDownStream_name() + ":" + svo.getGroupNames() + "\n";
				}
				
			}
			newVO.setGroupNames(groupNames);
			newVO.setGroupIds(groupIds);
			String[] groupListIds = groupIds.split(",");
			newVO.setGroupListIds(groupListIds);
		} catch (Exception e) {
			log.error("getDownstreamGroups 出错:" + e.getMessage());
		} 
		return newVO;
	}

	
	
}
