package com.besto.epgms.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import com.besto.epgms.po.OperationLog;

@Repository("operationLogMapper")
@Lazy
public interface OperationLogMapper {

	/**
	 * 记录日志
	 * @param log
	 * @throws Exception
	 */
	void insertLog(OperationLog log) throws Exception;
	
	/**
	 * 分页查询
	 * @param log
	 * @return
	 * @throws Exception
	 * @ella
	 * 2015-05-19
	 */
	public List<OperationLog> searchPage(OperationLog log)throws Exception;
	
	/**
	 * 查询是否有方法名记录
	 * @param name
	 * @return 方法ID
	 * @throws Exception
	 */
	Integer selectMethodName(@Param("moduleName")String moduleName, @Param("optName")String optName) throws Exception;
	
	/**
	 * 查询总行数
	 * @param startDate
	 * @param toDate
	 * @return
	 * @throws Exception
	 */
	public List<OperationLog> selectModules() throws Exception;
	/**
	 * 查询需要导出的日志
	 * @param startDate
	 * @param toDate
	 * @return
	 * @throws Exception
	 */
	List<OperationLog> searchLogsForExport(OperationLog operationLog) throws Exception;
}
