package com.besto.epgms.websinterface;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.defaults.DefaultSqlSessionFactory;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.vo.GuardVO;
import com.besto.util.MyBatisUtil;

//@WebService(endpointInterface = "com.besto.epgms.websinterface.GuardForCxfService")
//@SOAPBinding(style = Style.RPC)
@Service("guardForCxfService")
@Lazy
public class GuardlForCxfServiceImp implements GuardForCxfService {

	private static Logger log = Logger.getLogger(GuardlForCxfServiceImp.class);


	public String testMethod(String s) {
		System.out.println("webServiceccccccccccccc" + s);
		return "testMethod";
	}

	@SuppressWarnings("deprecation")
	public String tamperNoticeByJson(String jsonArray) {
		
		JSONArray array = JSONArray.fromObject(jsonArray);
        List<GuardVO> list = JSONArray.toList(array, GuardVO.class);
        
		DefaultSqlSessionFactory sqlSessionFactory = MyBatisUtil.getSqlSessionFactory();
		SqlSession session = null;

		
		try {
			session = sqlSessionFactory.openSession();
			// namespace+id
			
			for (GuardVO guardVO : list) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("filePath", guardVO.getFilePath());
				map.put("platForm", guardVO.getPlatForm());
				String ip = guardVO.getIp();
				map.put("ip", ip);
				map.put("tamperMode", guardVO.getTamperMode());
				String tamperTime = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss").format(new Date());
				
				map.put("tamperTime", tamperTime);
				map.put("handleMode", guardVO.getHandleMode());
				map.put("handleResult", guardVO.getHandleResult());
				map.put("serverName", guardVO.getServerName());
				session.update("com.besto.epgms.mapper.GuardMapper.del_tamperNotice", map);
			}
			
			session.update("com.besto.epgms.mapper.GuardMapper.tamperNoticeForList",list);
			
			session.commit(true);
		} catch (Exception e) {
			e.printStackTrace();
			session.rollback(true);
		} finally {
			session.close();
		}
        
		
		return "ok";
	}
}
