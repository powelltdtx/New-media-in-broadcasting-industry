package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.GroupService;
import com.besto.epgms.mapper.GroupMapper;
import com.besto.epgms.vo.GroupVO;


@Service("groupService")
@Lazy
public class GroupServiceImpl implements GroupService{


	private static Logger log = Logger.getLogger(GroupServiceImpl.class);

	@Autowired
	GroupMapper groupMapper;
	

	/**
	 * 
	* FunName:        searchAllPreviewGroups
	* Description :   所有预览分组查询 
	*                     
	* @param: 
	* @param:
	* @param:
	* @return:	List<GroupVO>  
	* @throws    Exception
	* @Author:   <Robin/宗国彬>  
	* @Create Date:<2016-01-28>
	 */
	public List<GroupVO> searchAllPreviewGroups(){
		List<GroupVO> list = new ArrayList<GroupVO>();
		try {
			list = groupMapper.searchAllPreviewGroups();
		} catch (Exception e) {
			log.error("searchAllPreviewGroups 出错 ："+e.getMessage() );
		}
		return list;
		
	}
	
	@Override
	public int addGroup(GroupVO groupVO) {
		groupMapper.addGroup(groupVO);
		return groupVO.getId();
	}

	@Override
	public List<GroupVO> searchGroupByIds(String[] groupIds) throws Exception {
		
		List<GroupVO> list = groupMapper.searchByIds(groupIds);
		return list;
	}

	@Override
	public void deleteGroupById(GroupVO groupVO) {

		groupMapper.deleteGroupById(groupVO);
	}

}
