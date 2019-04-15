package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.GroupVO;
import com.besto.epgms.vo.TempletGroupVO;

/**分组service*/
public interface GroupService {
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
	* @Author:   <powell/滕翔>  
	* @Create Date:<2016-01-28>
	 */
	public List<GroupVO> searchAllPreviewGroups();
	
	
	/**
	 * 添加分组
	 * @param templateAreaVO
	 */
	public int addGroup(GroupVO groupVO);

	/**
	 * 根据分组id,查询所有的分组
	 * @param groupIds
	 * @return
	 */
	public List<GroupVO> searchGroupByIds(String[] groupIds) throws Exception;


	/**
	 * 根据id删除分组
	 * @param groupVO
	 */
	public void deleteGroupById(GroupVO groupVO);
}
