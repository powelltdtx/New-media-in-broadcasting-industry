package com.besto.epgms.mapper;

import java.util.List;


import org.apache.ibatis.annotations.Param;

import com.besto.epgms.po.Role;
import com.besto.epgms.po.UserInfo;
import com.besto.epgms.po.UserPermissionInfo;
import com.besto.epgms.vo.ActionVO;
import com.besto.epgms.vo.PermissionVO;
import com.besto.epgms.vo.UserInfoVO;


public interface UserInfoMapper {
	/**
	 * 根据id查询对应实体
	 * @param id 查询id号
	 * @return 	   获取实体
	 */
	public UserInfo searchById(@Param(value = "id")String id) throws Exception;
	
	/**
	 * 分页查询用户
	 * @param entity  	持久对象
	 * @return list		查询结果集合
	 */
	public List<UserInfoVO> searchPage(UserInfoVO entity) throws Exception;

	/**
	 * 查询所有角色
	 * @return list
	 */
	public List<Role> searchAllRoles() throws Exception;
	
	/**
	 * 插入用户
	 * @param userInfo
	 * @return
	 * @throws Exception
	 */
	public Integer save(UserInfo userInfo)throws Exception;
	public Integer saveUserPermission(UserPermissionInfo userpermissioninfo)throws Exception;
	/**
	 * 验证userid
	 * @param pages
	 * @return
	 * @throws Exception
	 * @oxygengao
	 * 2015-06-03
	 */
	public Integer checkUserId(@Param(value = "user_id")String user_id)throws Exception;
	
	/**
	 * 查询个人权限信息
	 * @return list
	 */
	public List<UserPermissionInfo> searchOwnPer(@Param(value = "user_id")String user_id)throws Exception;
	
	/**
	 * 删除用户
	 * @param userInfo
	 * @return
	 * @throws Exception
	 */
	public Integer delete(UserInfoVO entity)throws Exception;
	
	public Integer deletePermission(UserInfoVO entity)throws Exception;
	
	/**
	 * 修改用户
	 * @param userInfo
	 * @return
	 * @throws Exception
	 */
	public Integer update(UserInfoVO entity)throws Exception;
	/**
	 * 根据userid查询所有按钮 
	 * @param userInfo
	 * @return
	 * @throws Exception
	 */
	public List<PermissionVO> searchButtonByUserId(@Param(value = "userid")String userid)throws Exception;	
	
	/**
	 * 查询个人权限信息
	 * @return list
	 */
	public List<Role> searchUserRole(@Param(value = "user_id")String user_id)throws Exception;
	/**
	 * 查询有权限的菜单
	 * @param pages
	 * @return
	 * @throws Exception
	 * @oxygengao
	 * 2015-06-03
	 */
	public List<ActionVO> searchAction(String pages) throws Exception;
}
