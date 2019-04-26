package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.po.Role;
import com.besto.epgms.po.UserPermissionInfo;
import com.besto.epgms.vo.ActionVO;
import com.besto.epgms.vo.UserInfoVO;



/***CopyRright (c)2008-2015: <维动科技widgetdo>
 *Project:  <cspms>
 * Comments:  <用户业务操作接口>         
 * JDK version used:<JDK1.6>
 * Author：   <powell/滕翔>
 * Create Date：  2015-10-21
 * Version:  <1.0>
 */
public interface UserInfoService {
	/**
	 *根据用户id查询用户 
	 * @param id 用户id
	 * @param isDealInfo 是否处理数据转换
	 * @return 用户数据封装类
	 */
	public UserInfoVO searchById(String id, boolean isDealInfo);
	
	/**
	 * 分页查询节目
	 * @param vo 用户页面数据封装类
	 * @return list
	 */
	public List<UserInfoVO> search(UserInfoVO vo);
	
	/**
	 * 查询所有角色
	 * @return list
	 */
	public List<Role> searchAllRoles();
	
	/**
	 * 插入用户
	 * @param UserInfo 产品数据封装类
	 * @return 记录总数
	 * @author <powell/滕翔>
	 * 2015-05-29
	 */
	public String save(UserInfoVO vo);
	
	/**
	 *验证userid
	 * @param user_id
	 * @return
	 */
	public int checkUserId(String user_id);

	/**
	 * 查询个人权限信息
	 * @return list
	 */
	public List<UserPermissionInfo> searchOwnPer(String user_id);
	
	/**
	 *修改用户
	 * @param UserInfoVO
	 * @return 条数
	 */
	public String update(UserInfoVO vo);
	
	/**
	 *删除用户
	 * @param UserInfoVO
	 * @return 条数
	 */
	public String delete(UserInfoVO vo);
	/**
	 * 根据用户id查询权限按钮(按钮code拼接字符串)
	 * @return list
	 */
	public String searchButtonByUserId(String userid);
	/**
	 *根据用户权限串查询用户权限 
	 * @param pages 用户权限串
	 * @return 菜单数据
	 */
	public List<ActionVO> searchAction(String pages);
}
