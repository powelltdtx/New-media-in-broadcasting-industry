/**
 * 查询log记录action
 * @author jackicyang
 */
package com.besto.epgms.action;

import java.util.List;
import net.sf.json.JSONArray;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import com.besto.epgms.manage.ServersGroupService;
import com.besto.epgms.manage.ServersManageService;
import com.besto.epgms.vo.ServerVO;
import com.besto.epgms.vo.ServersGroupVO;

@Controller("serversManageAction")
@Scope("prototype")
@Lazy
public class ServersManageAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private ServerVO vo;
	@Autowired
	private ServersManageService serversManageService;
	@Autowired
	private ServersGroupService serversGroupService;

	private static ObjectMapper objectMapper = new ObjectMapper();

	private Logger logger = Logger.getLogger(this.getClass());

	private String serverIds;

	// 分页查询
	public String search() throws Exception {
		logger.debug("进入ServersManageAction的search方法");
		if (null == vo) {
			vo = new ServerVO();
		}
		// 初始化分页值(保值)
		vo = (ServerVO) this.initPageValueAndKeepValue(vo, ServerVO.class);
		// 查询分页
		List<ServerVO> list = serversManageService.search(vo);
		List<ServersGroupVO> grouplist = serversGroupService.search();
		this.getRequest().put("grouplist", grouplist);
		// 结果集绑定到request 中供前台使用
		this.pageBindValue(vo, "list", list);

		return "index";
	}

	// 全量查询不分页
	public String searchAll() throws Exception {
		logger.debug("进入ServersManageAction的searchAll方法");

		// 查询分页
		List<ServerVO> list = serversManageService.searchAll();
		JSONArray serverList = JSONArray.fromObject(list);

		this.jsnt(objectMapper.writeValueAsString(serverList));
		return null;
	}

	// 根据服务器id查询
	public String searchServerByIds() throws Exception {
		logger.debug("进入ServersManageAction的searchServerByIds方法");

		vo = new ServerVO();
		String[] ids = serverIds.split(",");
		vo.setIds(ids);
		List<ServerVO> list = serversManageService.searchServerByIds(vo);
		JSONArray serverList = JSONArray.fromObject(list);
		this.jsnt(objectMapper.writeValueAsString(serverList));
		return null;
	}

	public String addPage() throws Exception {
		vo = new ServerVO();
		logger.debug("进入ServersManageAction的addPage方法");
		List<ServersGroupVO> grouplist = serversGroupService.search();
		this.getRequest().put("grouplist", grouplist);
		return "add";
	}

	public String cancel() {
		vo = new ServerVO();
		return "cancel";
	}

	public String editPage() throws Exception {
		logger.debug("进入ServersManageAction的addPage方法 id:" + vo.getId());
		List<ServersGroupVO> grouplist = serversGroupService.search();
		this.getRequest().put("grouplist", grouplist);
		vo = serversManageService.searchById(vo);
		return "edit";
	}

	public String delete() throws Exception {
		serversManageService.deleteById(vo);
		return "delete";
	}

	public String save() throws Exception {
		int rows = serversManageService.save(vo);
		logger.debug("[save] rows:" + rows);
		vo = new ServerVO();
		return "save";
	}

	public String update() throws Exception {
		int rows = serversManageService.update(vo);
		logger.debug("[update] rows:" + rows);
		vo = new ServerVO();
		return "update";
	}

	public ServerVO getVo() {
		return vo;
	}

	public void setVo(ServerVO vo) {
		this.vo = vo;
	}

	public String getServerIds() {
		return serverIds;
	}

	public void setServerIds(String serverIds) {
		this.serverIds = serverIds;
	}

}
