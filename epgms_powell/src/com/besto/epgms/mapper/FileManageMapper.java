package com.besto.epgms.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.po.OperationLog;
import com.besto.epgms.vo.FileInfoVO;

@Repository("fileManageMapper")
@Lazy
public interface FileManageMapper {
	/**
	 * 分页查询
	 * @param log
	 * @return
	 * @throws Exception
	 * @ella
	 * 2015-05-19
	 */
	public List<FileInfoVO> searchPage(FileInfoVO fileInfo)throws Exception;
	public List<FileInfoVO> searchByCode(FileInfoVO fileInfo)throws Exception;
}
