package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.UserInfoService;
import com.besto.epgms.mapper.UserInfoMapper;
import com.besto.epgms.po.Role;
import com.besto.epgms.po.UserInfo;
import com.besto.epgms.po.UserPermissionInfo;
import com.besto.epgms.vo.ActionVO;
import com.besto.epgms.vo.PermissionVO;
import com.besto.epgms.vo.UserInfoVO;
import com.besto.util.Constants;
import com.besto.util.TimeSource;
import com.opensymphony.xwork2.ActionContext;
/***
 *Project:  <epgms>
 * Comments:  <用户业务操作实现类>         
 * JDK version used:<JDK1.6>
 * Author：   <powell/滕翔>
 * Create Date：  2015-10-21
 * Version:  <1.0>
 */
@Service("userInfoService")
@Lazy
public class UserInfoServiceImpl implements UserInfoService {
	private static Logger log = Logger.getLogger(UserInfoServiceImpl.class);
	/**初始化DAO类*/
	@Autowired
	private UserInfoMapper userInfoMapper;
	
	public List<UserInfoVO> search(UserInfoVO vo) {
		List<UserInfoVO> list = new ArrayList<UserInfoVO>();
		try{
			list=userInfoMapper.searchPage(vo);
		}catch(Exception e){
			log.error("searchPage 出错:" + e.getMessage());
		}

		return list;
	}
	public UserInfoVO searchById(String id, boolean isDealInfo) {
		log.debug("查询id="+id+",isDealInfo="+isDealInfo);
		UserInfo po=new UserInfo();
		UserInfoVO vo = new UserInfoVO();
		try{
			po =userInfoMapper.searchById(id);
			if(po != null){
				BeanUtils.copyProperties(vo,po);
				if(isDealInfo){
                    log.debug("不转码");
				}
			}
		}catch(Exception e){
			log.error("searchById 出错:" + e.getMessage());
		}
		return vo;
	}
	
	/**
	 * 查询所有角色
	 * @return list
	 */
	public List<Role> searchAllRoles(){
		List<Role> resultList = new ArrayList<Role>();
		try{
			resultList =userInfoMapper.searchAllRoles();
		}catch(Exception e){
			log.error("searchAllRoles 出错:" + e.getMessage());
		}
		return resultList;
	}
	
	/**
	 *插入用户
	 * @param UserInfoVO
	 * @return 条数
	 */
	public String save(UserInfoVO vo) {
		String result = Constants.RESULT_OK;
		try{
			vo.setCreateperson(ActionContext.getContext().getSession().get("admin").toString());
			vo.setCreatetime(TimeSource.getNowTime19());
			UserInfo po = new UserInfo();
			BeanUtils.copyProperties(po,vo);
			String[] authoritys = new String[]{vo.getUserrole()};
			vo.setAuthoritys(authoritys);
			userInfoMapper.save(po);
			if(vo.getAuthoritys() != null){
				for(int i = 0; i < vo.getAuthoritys().length; i++){
					UserPermissionInfo permission = new UserPermissionInfo();
					permission.setRoleid(vo.getAuthoritys()[i]);
					permission.setUserid(vo.getUserid());
					userInfoMapper.saveUserPermission(permission);
				}
			}
			
		}catch(Exception e){
			result = Constants.RESULT_ERROR;
			log.error("save 出错："+e.getMessage());
		}
		return result;
	}
	
	/**
	 *修改用户
	 * @param UserInfoVO
	 * @return 条数
	 */
	public String update(UserInfoVO vo) {
		String result = Constants.RESULT_OK;
		try{
			userInfoMapper.update(vo);
			userInfoMapper.deletePermission(vo);
			String[] authoritys = new String[]{vo.getUserrole()};
			vo.setAuthoritys(authoritys);
			if(vo.getAuthoritys() != null){
				for(int i = 0; i < vo.getAuthoritys().length; i++){
					UserPermissionInfo permission = new UserPermissionInfo();
					permission.setRoleid(vo.getAuthoritys()[i]);
					permission.setUserid(vo.getUserid());
					userInfoMapper.saveUserPermission(permission);
				}
			}
			
		}catch(Exception e){
			result = Constants.RESULT_ERROR;
			log.error("update 出错："+e.getMessage());
		}
		return result;
	}
	
	/**
	 *删除用户
	 * @param UserInfoVO
	 * @return 条数
	 */
	public String delete(UserInfoVO vo) {
		String result = Constants.RESULT_OK;
		try{
			vo.setOlduserid(vo.getUserid());
			userInfoMapper.delete(vo);
			userInfoMapper.deletePermission(vo);
			
		}catch(Exception e){
			result = Constants.RESULT_ERROR;
			log.error("delete 出错："+e.getMessage());
		}
		return result;
	}
	
	/**
	 *验证userid
	 * @param user_id
	 * @return 
	 */
	public int checkUserId(String user_id) {
		int result = 0;
		try{
			result = userInfoMapper.checkUserId(user_id);
		}catch(Exception e){
			log.error("checkUserId 出错："+e.getMessage());
		}
		log.debug("总数："+result);
		return result;
	}
	
	/**
	 * 查询个人权限信息
	 * @return list
	 */
	public List<UserPermissionInfo> searchOwnPer(String user_id){
		List<UserPermissionInfo> list = new ArrayList<UserPermissionInfo>();
		try{
			list = userInfoMapper.searchOwnPer(user_id);
		}catch(Exception e){
			log.error("searchOwnPer 出错："+e.getMessage());
		}
		return list;
	}
	/**
	 * 根据用户id查询权限按钮返回)
	 * @return String
	 */
	public String searchButtonByUserId(String userid){
		List<PermissionVO> list = new ArrayList<PermissionVO>();
		try {
			list = userInfoMapper.searchButtonByUserId(userid);
		} catch (Exception e) {
			log.debug("根据用户id查询权限按钮出错："+e.getMessage());
		}
		//遍历list返回按钮code拼接字符串
		StringBuffer sb = new StringBuffer();
		sb.append(",");		
		if(null!=list){		
			for(PermissionVO vo : list){
				sb.append(vo.getBtncode()+",");
			}
		}
		String btnCodes=sb.toString();
		return btnCodes;
	}
	/**
	 *根据用户权限串查询用户权限 
	 * @param pages 用户权限串
	 * @return 菜单数据
	 */
	public List<ActionVO> searchAction(String pages) {
		List<ActionVO> list=new ArrayList<ActionVO>();
		try{
			list =userInfoMapper.searchAction(pages);
		}catch(Exception e){
			log.error("searchAction 出错:" + e.getMessage());
		}
		return list;
	}
}
