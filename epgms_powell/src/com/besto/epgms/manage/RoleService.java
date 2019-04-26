package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.vo.ButtonVO;
import com.besto.epgms.vo.MenuVO;
import com.besto.epgms.vo.PermissionVO;
import com.besto.epgms.vo.RoleVO;

/**角色管理service*/
public interface RoleService {
	/**
	 * 分页查询角色
	 * @author powell
	 * 2015-10-21
	 * @param RoleVO
	 * @return list
	 */
	public List<RoleVO> searchAllRoles(RoleVO vo);
	/**
	 * 根据角色id查询角色信息
	 * @author powell
	 * 
	 * */
	public RoleVO searchRoleById(String id);
	/**
	 * 查询所有权限菜单和按钮
	 * @author powell
	 * 
	 * */
	public List<MenuVO> searchAllMenuAndbtn();
	/**
	 * 根据角色id查询按钮
	 * @author powell
	 * 
	 * */
	public List<ButtonVO> searchButtonByRoleId(String id);
	/**
	 * 编辑角色
	 * @param name
	 * @return Integer
	 * @throws Exception
	 * @powell
	 * 
	 */
	public void editRole(RoleVO vo,String rolename,List<PermissionVO> list )throws Exception;
	/**
	 * 验证策略名
	 * @param  
	 * @return 
	 * @author powell
	 * 
	 */
	public Integer chackRoleName(String roleName);
	/**
	 * 添加角色
	 * @author powell
	 * 
	 * */
	public String   insertRole(RoleVO roleVO,List<PermissionVO> list) throws Exception;
	/**
	 * 判断角色是否关联了用户
	 * @param name
	 * @return 
	 * @throws Exception
	 * @powell
	 * 
	 */
	public int checkRole(String roleid);
	/**
	 * 删除角色
	 * @param name
	 * @return 
	 * @throws Exception
	 * @powell
	 * 
	 */
	public void delRole(String id) throws Exception ;
}
