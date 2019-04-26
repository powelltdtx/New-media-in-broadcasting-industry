/**
 * 日志操作服务实现
 * @author jackicyang
 */
package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.OperationLogService;
import com.besto.epgms.mapper.OperationLogMapper;
import com.besto.epgms.po.OperationLog;

@Service("operationLogBiz")
@Lazy
public class OperationLogServiceImpl implements OperationLogService {
	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired
	private OperationLogMapper operationLogMapper;

	public void addLog(OperationLog log) throws Exception {
		logger.debug("进入日志添加方法");
		// TODO Auto-generated method stub
		Integer optId = operationLogMapper.selectMethodName(log.getModuleName(),log.getOptidName());
//		if(null == optId)
//			logger.error("无法找到指定方法的ID");
//		else{
//			log.setOptid(optId+"");
//			operationLogMapper.insertLog(log);
//		}
	}
	//分页查询
	public List<OperationLog> search(OperationLog operationLog) {

		List<OperationLog> list = new ArrayList<OperationLog>();
		try{
			list=operationLogMapper.searchPage(operationLog);
		}catch(Exception e){
			logger.error("searchPage 出错:" + e.getMessage());
		}
		return list;
	}

	public OperationLogMapper getOperationLogMapper() {
		return operationLogMapper;
	}

	public void setOperationLogMapper(OperationLogMapper operationLogMapper) {
		this.operationLogMapper = operationLogMapper;
	}
	/**查询模块总数*/
	public List<OperationLog> selectModules(){
		logger.debug("进入模块数量查询模块");
		List<OperationLog> list=new ArrayList<OperationLog>();
		try {
			list = operationLogMapper.selectModules();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
	//查询需要导出的日志
    public List<OperationLog> searchLogsForExport(OperationLog operationLog){
    	List<OperationLog> list = new ArrayList<OperationLog>();
		try {
//			if(operationLog!=null&&operationLog.getStartDate()!=null)operationLog.setStartDate(operationLog.getStartDate().replace("-", ""));
//			if(operationLog!=null&&operationLog.getToDate()!=null)operationLog.setToDate(operationLog.getToDate().replace("-", ""));
			list =  operationLogMapper.searchLogsForExport(operationLog);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return list;
    }
}
