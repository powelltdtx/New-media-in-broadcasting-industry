package com.besto.epgms.mapper;

import java.util.List;
import com.besto.epgms.vo.GroupVO;

public interface GroupMapper {

	
	/**
	 * 
	* FunName:        searchByIds
	* Description :   查询
	*                     
	* @param:   @param vo
	* @param:   @return
	* @param:   @throws Exception   
	* @return:	List<GroupVO>  
	* @throws                  
	* @Author:   <powell/滕翔> 
	* @Create Date:<2016-01-25>
	 */
	public List<GroupVO> searchByIds(String[] group_ids) throws Exception;
	
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
	public List<GroupVO> searchAllPreviewGroups() throws Exception;

	/**
	 * 添加分组 
	 */
	public int addGroup(GroupVO groupVO);

	/**
	 * 根据id删除分组
	 * @param groupVO
	 */
	public void deleteGroupById(GroupVO groupVO);

}
