package com.besto.epgms.mapper;

import java.util.List;






import org.apache.ibatis.annotations.Param;

import com.besto.epgms.po.FileInfo;
import com.besto.epgms.po.Role;
import com.besto.epgms.po.Server;
import com.besto.epgms.po.UserInfo;
import com.besto.epgms.po.UserPermissionInfo;
import com.besto.epgms.vo.ActionVO;
import com.besto.epgms.vo.FileInfoVO;
import com.besto.epgms.vo.PermissionVO;
import com.besto.epgms.vo.UserInfoVO;


public interface SDMSInfoMapper {
	/**
	 * 根据id查询对应实体
	 * @param id 查询id号
	 * @return 	   获取实体
	 */
	public List<Server> searchServers() throws Exception;
	/**
	 * 根据code查询对应实体
	 * @param id 查询code
	 * @return 	   获取实体
	 */
	public List<FileInfo> searchFileinfoByFileCode(FileInfoVO vo) throws Exception;	

	public int updateFileinfoByFileCode(FileInfoVO vo) throws Exception;
	public int insertFileinfo(FileInfoVO vo) throws Exception;
	public int deleteFileinfo(FileInfoVO vo) throws Exception;
	public List<String> searchNames(FileInfoVO vo);
}
