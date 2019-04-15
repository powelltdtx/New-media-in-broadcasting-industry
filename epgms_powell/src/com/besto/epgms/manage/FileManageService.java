/**
 * 操作日志服务接口
 * @author jackicyang
 */
package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.po.FileInfo;
import com.besto.epgms.po.OperationLog;
import com.besto.epgms.vo.FileInfoVO;


public interface FileManageService {

	/**
	 * 查询文件信息
	 * @return
	 * @throws Exception
	 */
	List<FileInfoVO> search(FileInfoVO fileInfo) throws Exception;
	/**
	 * 根据code查询文件信息
	 * @return
	 * @throws Exception
	 */
	List<FileInfoVO> searchByCode(FileInfoVO fileInfo) throws Exception;
}
