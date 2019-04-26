package com.besto.epgms.mapper;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.besto.epgms.vo.TempletVO;

@Repository("templateServerMapper")
@Lazy
public interface TemplateServerMapper {

	/**
	 * 查询模板&服务器信息信息
	 * @param templateAreaVO
	 * @return
	 */
	public List<TempletVO> searchPage(TempletVO templateVO);

}
