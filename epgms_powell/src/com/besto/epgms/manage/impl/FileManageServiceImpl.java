
package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.besto.epgms.manage.FileManageService;
import com.besto.epgms.mapper.FileManageMapper;
import com.besto.epgms.mapper.OperationLogMapper;
import com.besto.epgms.po.OperationLog;
import com.besto.epgms.vo.FileInfoVO;

@Service("fileManageService")
@Lazy
public class FileManageServiceImpl implements FileManageService {
	private Logger logger = Logger.getLogger(this.getClass());
	@Autowired
	private FileManageMapper fileManageMapper;

	//分页查询
	public List<FileInfoVO> search(FileInfoVO fileInfo) {

		List<FileInfoVO> list = new ArrayList<FileInfoVO>();
		try{
			list=fileManageMapper.searchPage(fileInfo);
		}catch(Exception e){
			logger.error("searchPage 出错:" + e.getMessage());
		}
		return list;
	}
	public List<FileInfoVO> searchByCode(FileInfoVO fileInfo){
		List<FileInfoVO> list = new ArrayList<FileInfoVO>();
		try{
			list=fileManageMapper.searchByCode(fileInfo);
		}catch(Exception e){
			logger.error("searchPage 出错:" + e.getMessage());
		}
		return list;
	}
}
