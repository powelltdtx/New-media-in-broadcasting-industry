package com.besto.epgms.manage.impl;

import com.besto.epgms.manage.RoleService;
import com.besto.epgms.mapper.RoleMapper;
import com.besto.epgms.vo.ButtonVO;
import com.besto.epgms.vo.MenuVO;
import com.besto.epgms.vo.PermissionVO;
import com.besto.epgms.vo.RoleVO;
import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.util.Constants;
@Service("RoleService")
@Lazy
public class RoleServiceImpl implements RoleService {
	private static Logger log = Logger.getLogger(RoleServiceImpl.class);
	@Autowired
	private RoleMapper roleMapper;
	/**
	 * 分页查询
	 * @author JackicYang
	 * 
	 * */
	public List<RoleVO> searchAllRoles(RoleVO vo) {
		List<RoleVO> list = new ArrayList<RoleVO>();
		try{
			list=roleMapper.searchPage(vo);
		}catch(Exception e){
			log.error("searchPage 出错:" + e.getMessage());
		}
		return list;
	}
	/**
	 * 根据角色id查询角色信息
	 * @author <powell/滕翔>
	 *  
	 * */
	public RoleVO searchRoleById(String id){
		RoleVO vo =  new RoleVO();
		try {
			vo = roleMapper.searchRoleById(id);
		} catch (Exception e) {
			log.debug("searchRoleById出错："+e.getMessage());
		}
		return vo;
	}
	/**
	 * 查询所有权限菜单和按钮
	 * @author <powell/滕翔>
	 * 
	 * */
	public List<MenuVO> searchAllMenuAndbtn() {
		List<MenuVO> menuList = new ArrayList<MenuVO>();
		try {
			menuList = roleMapper.searchAllMenu();
			//遍历menuList
			for(int i = 0;i<menuList.size();i++){
				List<ButtonVO> buttonList = new ArrayList<ButtonVO>();
				//根据menucode查询btn
				buttonList=roleMapper.searchButtonByMenu(menuList.get(i).getCode());
				//将buttonlist放入menuVO
				menuList.get(i).setButtonList(buttonList);
			}
		} catch (Exception e) {
			log.debug("searchAllMenu出错："+e.getMessage());
		}
		return menuList;
		
	}
	/**
	 * 根据角色id查询按钮
	 * @author <powell/滕翔>
	 * 
	 * */
	public List<ButtonVO> searchButtonByRoleId(String id) {
		List<ButtonVO> list = new ArrayList<ButtonVO>();
		try {
			list=roleMapper.searchButtonByRoleIdAndMenuCode(id, null);
		} catch (Exception e) {
			log.debug("根据角色id查询按钮出错："+e.getMessage());
		}
		return list;
	}
	/**
	 * 编辑角色
	 * @param name
	 * @return 
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */
	public void editRole(RoleVO vo,String roleid ,List<PermissionVO> list)throws Exception{
		//更新角色名
		roleMapper.updateRole(vo);
		//删除角色权限关系
		roleMapper.delRolePermission(roleid);
		//重新插入权限关系
		if(null!=list&&list.size()>0){
		roleMapper.insertPermission(list);
		}
	}
	/**
	 * 验证策略名
	 * @author <powell/滕翔>
	 * 
	 * */
	public Integer chackRoleName(String roleName) {
		int count = 1;
		try {
			count = roleMapper.chackRoleName(roleName);
		} catch (Exception e) {
			log.error("根据策略名查询出错：" + e.getMessage());
		}
		return count;
	}
	/**
	 * 添加角色
	 * @author <powell/滕翔>
	 * 
	 * */
	public String  insertRole(RoleVO roleVO,List<PermissionVO> list) throws Exception{
		String result= Constants.RESULT_NO;
		//插入角色
		roleMapper.insertRole(roleVO);
		//插入角色关系表
		if(null!=list&&list.size()>0){
			roleMapper.insertPermission(list);
		}
		result = Constants.RESULT_OK;
		return result;
	}
	/**
	 * 判断角色是否关联了用户
	 * @param name
	 * @return 
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */
	public int checkRole(String roleid){
		int  count = 1;
		try {
			count = roleMapper.checkRole(roleid);
		} catch (Exception e) {
			log.debug("判断角色是否关联了用户出错:"+e.getMessage());
		}
		return count;
		
	}
	/**
	 * 删除角色
	 * @param name
	 * @return 
	 * @throws Exception
	 * @<powell/滕翔>
	 * 
	 */
	public void delRole(String id)throws Exception{
		//删除角色权限关系
		roleMapper.delRolePermission(id);
		//删除角色
		roleMapper.delRole(id);
	}
}
