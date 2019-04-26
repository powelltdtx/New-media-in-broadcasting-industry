package com.besto.epgms.manage.impl;

import javax.jws.WebMethod;
import javax.jws.WebService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.InterfacelogService;
import com.besto.epgms.mapper.InterfacelogMapper;
import com.besto.epgms.thread.XMLManageThread;
import com.besto.epgms.vo.InterfacelogVO;


@Service("interfacelogService")
@Lazy
@WebService
public class InterfacelogServiceImpl implements InterfacelogService{

	private static Logger log = Logger.getLogger(InterfacelogServiceImpl.class);
	
	@Autowired
	InterfacelogMapper interfacelogMapper;
	
	@WebMethod
	public String add(InterfacelogVO vo) throws Exception{
		log.info("插入接口日志表");
		//1 插入接口日志表
//		int interfacelogAddResult=interfacelogMapper.add(vo);
		interfacelogMapper.add(vo);
		
		//2下载xml线程
		XMLManageThread h1=new XMLManageThread(vo.getCopid(),vo.getSopid(), vo.getCorrelateid(),vo.getCmdfileurl(),vo.getId());
		Thread t1=new Thread(h1);
		t1.start();
		
		return vo.getId()+"";
	}
	
	
	@Override
	public String updateFromDown(InterfacelogVO vo)throws Exception{
		interfacelogMapper.updateSendError(vo);
		return null;
	}
}
