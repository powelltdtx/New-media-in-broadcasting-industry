package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.GroupVO;
import com.besto.epgms.vo.AreaVO;
import com.besto.epgms.vo.TemplateAreaVO;

@Repository("templateAreaMapper")
@Lazy
public interface TemplateAreaMapper {
	
	/**
	 * 查询分域信息
	 * @param templateAreaVO
	 * @return
	 */
	public List<AreaVO> searchPage(AreaVO templateAreaVO);

	/**
	 * 查询所以分域信息
	 * @return
	 */
	public List<AreaVO> searchAllArea();

	/**
	 * 保存分域
	 * @param templateAreaVO
	 */
	public int add(AreaVO templateAreaVO);

	/**
	 * 根据模板id删除模板的分域
	 * @param templateAreaVO
	 * @return
	 */
	public int deleteAreaByTempletId(TemplateAreaVO templateAreaVO);

	/**
	 * 保存模板-分域的关联关系
	 * @param templateAreaVO
	 * @return
	 */
	public int save(TemplateAreaVO templateAreaVO);


}
