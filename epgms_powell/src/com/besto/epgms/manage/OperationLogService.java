/**
 * 操作日志服务接口
 * @author jackicyang
 */
package com.besto.epgms.manage;

import java.util.List;

import com.besto.epgms.po.OperationLog;


public interface OperationLogService {

	/**
	 * 添加操作日志
	 * 
	 * @param log
	 * @throws Exception
	 */
	void addLog(OperationLog log) throws Exception;

	/**
	 * 查询日志
	 * @param startDate
	 * @param toDate
	 * @param curentPage
	 * @param maxCount
	 * @return
	 * @throws Exception
	 */
	List<OperationLog> search(OperationLog log) throws Exception;
	
	
	/**查询模块总数*/
	public List<OperationLog> selectModules();
	/**
	 * 查询要导出的日志
	 * @param startDate
	 * @param toDate
	 * @return
	 * @throws Exception
	 */
	public List<OperationLog> searchLogsForExport(OperationLog operationLog);
}
