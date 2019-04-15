package com.besto.epgms.action;

import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.RoleService;
import com.besto.epgms.vo.ButtonVO;
import com.besto.epgms.vo.MenuVO;
import com.besto.epgms.vo.PermissionVO;
import com.besto.epgms.vo.RoleVO;
import com.besto.util.Constants;
import com.opensymphony.xwork2.ActionContext;


/**
 * 角色管理
 * @author 滕翔
 * 2015-8-3
 */
@SuppressWarnings("serial")
@Scope("prototype")
@Controller("roleAction")
@Lazy
public class RoleAction extends BaseAction {
private static Logger logger = Logger.getLogger(RoleAction.class);
	
	private RoleVO vo;
	private MenuVO menuVO;
	private ButtonVO buttonVO;
	private String doFlag;
	@Autowired
	RoleService roleService;
	/**
	 * 查询角色信息
	 * @author JackicYang
	 * 2015-8-3
	 * @param  
	 * @return 
	 * @throws Exception
	 */
	public String searchAllRoles() throws Exception {
		if (null == vo) {
			//如果vo不存在 则创建一个初始的vo
			vo = new RoleVO();
		}
		//初始化分页值(保值)
		vo=(RoleVO)this.initPageValueAndKeepValue(vo, RoleVO.class);
		//查询分页
		List<RoleVO> list=roleService.searchAllRoles(vo);
		//结果集绑定到request 中供前台使用
		this.pageBindValue(vo,"list",list);
		return "index";
	}
	/**
	 * 跳转编辑页
	 * @author 滕翔
	 * 2015-8-5
	 * @param  
	 * @return 
	 * @throws Exception
	 */
	public String toEditRole(){
		//查询所有权限菜单和按钮
		List<MenuVO> allMenuList = new ArrayList<MenuVO>();
		allMenuList = roleService.searchAllMenuAndbtn();
		this.pageBindValue("allMenuList", allMenuList);
		//查询当前角色信息
		vo = roleService.searchRoleById(vo.getId());
		//查询当前角色下的按钮
		List<ButtonVO> roleBtnlList = new ArrayList<ButtonVO>();
		roleBtnlList = roleService.searchButtonByRoleId(vo.getId());
		this.pageBindValue("roleBtnlList", roleBtnlList);
		return "toedit";
	}
	/**
	 * 编辑角色
	 * @author 滕翔
	 * 2015-8-5
	 * @param  
	 * @return 
	 * @throws Exception
	 */
	public String editRole(){
		String result=Constants.RESULT_NO;
		//获取角色权限关系vo集合
		List<PermissionVO> list = new ArrayList<PermissionVO>();
		//遍历btnCodes放入角色权限关系vo集合
		String[] btnCodes = vo.getBtnCodes();
		if(null!=btnCodes){
			for(String codes:btnCodes){
				PermissionVO permissionVO = new PermissionVO();//角色权限关系vo
					permissionVO.setBtncode(codes);
					permissionVO.setRoleName(vo.getName());
					list.add(permissionVO);
				}
		}
		try {
			roleService.editRole(vo, vo.getId(),list);
		     result=Constants.RESULT_OK;
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 查询所有权限菜单和按钮
	 * @author 滕翔
	 * 2015-10-21
	 * @param  
	 * @return 
	 * @throws Exception
	 */
	public String searchAllMenuAndbtn(){
		List<MenuVO> menuList = new ArrayList<MenuVO>();
		menuList = roleService.searchAllMenuAndbtn();
		//结果集绑定到request中供前台使用 
		this.pageBindValue("list", menuList);
		return "toadd";
	}
	/**
	 * 验证用户名
	 * @author 滕翔
	 * 2015-8-4
	 * @param  
	 * @return 
	 * @throws Exception
	 */
	public void chackRoleName(){
		String result = "1";
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		String chackRoleName=request.getParameter("roleName");
		result = roleService.chackRoleName(chackRoleName).toString();	
		try {
			PrintWriter out = response.getWriter();
			out.write(result);
			out.flush();
			out.close();
		} catch (Exception e) {
			
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	/**
	 * 添加角色
	 * @author 滕翔
	 * 2015-8-4
	 * @param  
	 * @return 
	 * @throws Exception
	 */
	public String insertRole() {
		//获取创建人 创建时间
		Map<String, Object> session = ActionContext.getContext().getSession();
		String ceratepersonId = (String) session.get("admin");
		DateFormat df = new SimpleDateFormat("yyyyMMddhh:mm:ss");
		String date = df.format(new Date()); 
		vo.setCreateperson(ceratepersonId);
		vo.setCreatetime(date);
		//获取角色权限关系vo集合
		List<PermissionVO> list = new ArrayList<PermissionVO>();
		//遍历btnCodes放入角色权限关系vo集合
		String[] btnCodes = vo.getBtnCodes();
		if(null!=btnCodes){
			for(String codes:btnCodes){
				 PermissionVO permissionVO = new PermissionVO();//角色权限关系vo
					permissionVO.setBtncode(codes);
					permissionVO.setRoleName(vo.getName());
					list.add(permissionVO);
				}
		}
		
		//插入数据库
		
			String result=Constants.RESULT_NO;
			try {
				result = roleService.insertRole(vo, list);
			} catch (Exception e) {
				logger.debug("新建角色失败！"+e.getMessage());
			}
		return result;
	}
	/**
	 * 判断角色是否关联了用户
	 * @author 滕翔
	 * 2015-8-5
	 * @param  
	 * @throws Exception
	 */
	public void checkRole(){
		String result;
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		String roleid=request.getParameter("roleid");
		result =String.valueOf(roleService.checkRole(roleid));
		try {
			PrintWriter out = response.getWriter();
			out.write(result);
			out.flush();
			out.close();
		} catch (Exception e) {
			logger.debug("checkRole出错！");
			e.printStackTrace();
		}	
	}
	/**
	 * 删除角色
	 * @author 滕翔
	 * 2015-8-5
	 * @param  
	 * @return 
	 * @throws Exception
	 */
	public String delRole(){	
			//删除角色
			try {
				roleService.delRole(vo.getId());
				doFlag = "ok";
			} catch (Exception e) {
				logger.debug("删除角色出错："+e.getMessage());
				doFlag = "no";
			}
		return doFlag;
		
	}
	/**
	 * @return the vo
	 */
	public RoleVO getVo() {
		return vo;
	}
	/**
	 * @param vo the vo to set
	 */
	public void setVo(RoleVO vo) {
		this.vo = vo;
	}
	/**
	 * @return the menuVO
	 */
	public MenuVO getMenuVO() {
		return menuVO;
	}
	/**
	 * @param menuVO the menuVO to set
	 */
	public void setMenuVO(MenuVO menuVO) {
		this.menuVO = menuVO;
	}
	/**
	 * @return the buttonVO
	 */
	public ButtonVO getButtonVO() {
		return buttonVO;
	}
	/**
	 * @param buttonVO the buttonVO to set
	 */
	public void setButtonVO(ButtonVO buttonVO) {
		this.buttonVO = buttonVO;
	}
	/**
	 * @return the doFlag
	 */
	public String getDoFlag() {
		return doFlag;
	}
	/**
	 * @param doFlag the doFlag to set
	 */
	public void setDoFlag(String doFlag) {
		this.doFlag = doFlag;
	}
	
}
