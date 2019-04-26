package com.besto.epgms.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.ButtonVO;
import com.besto.epgms.vo.MenuVO;
import com.besto.epgms.vo.PermissionVO;
import com.besto.epgms.vo.RoleVO;

@Repository("roleMapper")
@Lazy
public interface RoleMapper {
	/**
	 * 查询所有角色信息
	 * @param 
	 * @return
	 */
	public List<RoleVO> searchPage(RoleVO vo)  throws Exception;
	/**
	 * 根据角色id查询角色信息
	 * @param 
	 * @return
	 */
	public RoleVO searchRoleById(@Param(value="id")String id)  throws Exception;
	/**
	 * 查询所有菜单
	 * @param 
	 * @return
	 */
	public List<MenuVO> searchAllMenu()  throws Exception;
	/**
	 * 根据菜单code查询按钮
	 * @param 
	 * @return
	 */
	public List<ButtonVO> searchButtonByMenu(@Param(value = "menucode")String menucode)  throws Exception;
	/**
	 * 更新角色名
	 * @param name
	 * @return Integer
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */
	public int updateRole(RoleVO vo)throws Exception;
	/**
	 * 删除角色下的所有按钮
	 * @param name
	 * @return Integer
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */  
	public int delRolePermission(@Param(value = "roleid")String roleid)throws Exception;
	/**
	 * 根据角色id和菜单code查询角色按钮
	 * @param 
	 * @return
	 */
	public List<ButtonVO> searchButtonByRoleIdAndMenuCode(@Param(value="id")String id,@Param(value="code")String code)  throws Exception;
	/**
	 * 添加角色关系
	 * @param 
	 * @return
	 */
	public int insertPermission(List<PermissionVO> list) throws Exception;
	/**
	 * 验证角色名
	 * @param name
	 * @return Integer
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */
	public int chackRoleName(@Param(value = "name")String name)throws Exception;
	/**
	 * 添加角色
	 * @param 
	 * @return
	 */
	public int insertRole(RoleVO vo) throws Exception;
	/**
	 * 判断角色是否关联了用户
	 * @param name
	 * @return Integer
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */  
	public int checkRole(@Param(value = "roleid")String roleid) throws Exception;
	/**
	 * 删除角色
	 * @param name
	 * @return Integer
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */  
	public int delRole(@Param(value = "id")String id)throws Exception;
}
