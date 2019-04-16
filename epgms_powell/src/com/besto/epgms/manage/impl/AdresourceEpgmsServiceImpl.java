package com.besto.epgms.manage.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import com.besto.epgms.manage.AdresourceEpgmsService;
import com.besto.epgms.vo.AdresourceVO;
import com.besto.epgms.vo.ResultVO;
import com.besto.util.AESUtil;
import com.besto.util.ReadProperties;
import com.besto.util.RemoteInterface;
import com.besto.util.SecurityTools;


/**
 * @作者 summer
 * @创建日期 2014-12-17
 * @版本 V 1.0
 * @说明 广告资源服务类实现
 */
@Service("AdresourceEpgmsService")
@Lazy
@SuppressWarnings({ "unchecked", "static-access" })
public class AdresourceEpgmsServiceImpl implements AdresourceEpgmsService {
	private static Logger logger = Logger
			.getLogger(AdresourceEpgmsServiceImpl.class);
	private static String logHeader = "[AdresourceServiceImpl]";
	private static String type1 = "2001"; // iptv 直播type 2001
	private static String type2 = "2002"; // iptv 广播type 2002
	private static final int PAGESCOUNT = 300;


	public static String toString(Object str) {
		String s = "";
		try {
			s = String.valueOf(str);
			if (s.equals("null")){
				s = "";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}

	// 添加页面的弹出层查询cms的分类
	public List searchCmsCategory(AdresourceVO vo, String groupId)
			throws Exception {
		String logMethodName = "searchCmsCategory(.)";
		logger.info(logHeader + logMethodName + "type:" + " " + type1 + " "
				+ type2 + " " + vo.getListtype());
		AESUtil aes = new AESUtil();
		String filepath = ""; // 文件路径
		String path = ""; // 读取配置文件中的接口地址
		String url = ""; // 连接配置文件中的接口地址+参数
		try {
			filepath = this.getClass().getClassLoader()
					.getResource("interface_fromAbsm.properties").toURI().getPath();
		} catch (Exception e) {
			e.printStackTrace();
		}
		SecurityTools st = new SecurityTools();
		String key = "besto";
		long time = System.currentTimeMillis();
		Properties properties = ReadProperties.readProperties(filepath);

		if (groupId.equals("3")) { // 手机

			if (vo.getListtype().equals("3")) { // 查询手机jeecms新闻分类接口
				path = properties.get("newscmscategoryinterface").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?temptoken=&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&keyWord="
						+ vo.getKeyword();
			} else if (vo.getListtype().equals("1")) { // 点播
				path = properties.get("cmscategoryinterface").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?temptoken=&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name=" + vo.getKeyword()
						+ "&type=" + vo.getListtype();
			} else if (vo.getListtype().equals("2")) { // 直播
				path = properties.get("cmscategoryinterface").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?temptoken=&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name=" + vo.getKeyword()
						+ "&type=" + vo.getListtype();
			} else
			// 2015.08.11
			if (vo.getListtype().equals("4")) { // 专题
				path = properties.get("topicInterfacesearch").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&topicName="
						+ aes.encypt(vo.getKeyword());
				// 2016.02.01
			} else if (vo.getListtype().equals("6")) { // 回看
				path = properties.get("cmscategoryinterfacebacktosee")
						.toString();
				if (path == null) {
					path = "";
				}
				url = path + "?temptoken=&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name=" + vo.getKeyword()
						+ "&type=2";
			}

		} else if (groupId.equals("2")) { // ott查询

			if (vo.getListtype().equals("1")) { // 点播
				path = properties.get("cmscategoryinterface.ott").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?temptoken=&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name=" + vo.getKeyword()
						+ "&type=" + vo.getListtype();
			} else if (vo.getListtype().equals("2")) { // 直播
				path = properties.get("cmscategoryinterface.ott").toString();
				if (path == null) {
					path = "";
				}
				// http://10.10.8.201/ott/cms/categoryOtt_searchNodesCategory.action?name=&type=2
				url = path + "?temptoken=&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name=" + vo.getKeyword()
						+ "&type=" + vo.getListtype();
			} else // 2015/12/19
			if (vo.getListtype().equals("4")) { // 专题
				path = properties.get("topicInterfacesearch.ott").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&topicName="
						+ aes.encypt(vo.getKeyword());
				// 2016.02.01
			} else if (vo.getListtype().equals("6")) { // 回看
				path = properties.get("cmscategoryinterfacebacktosee.ott")
						.toString();
				if (path == null) {
					path = "";
				}
				url = path + "?temptoken=&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name=" + vo.getKeyword()
						+ "&type=2";
			}
		} else if (groupId.equals("1")) { // iptv

			if (vo.getListtype().equals("1")) { // 点播
				path = properties.get("cmscategoryinterface.iptv").toString();
				if (path == null) {
					path = "";
				}
				// http://61.161.172.26/cms/categoryIptv_searchNodesCategory.action?name=&type=1
				url = path + "?&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name="
						+ aes.encypt(vo.getKeyword()) + "&type="
						+ vo.getListtype();
			} else if (vo.getListtype().equals("2")) { // 直播
				path = properties.get("cmscategoryinterface.iptv").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name="
						+ aes.encypt(vo.getKeyword()) + "&type=" + type1;
			} else
			// 2015/12/19
			if (vo.getListtype().equals("4")) { // 专题
				path = properties.get("topicInterfacesearch.iptv").toString();
				if (path == null) {
					path = "";
				}
				url = path + "?time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&topicName="
						+ aes.encypt(vo.getKeyword());
				// 2016.02.01
			} else if (vo.getListtype().equals("6")) { // 回看
				path = properties.get("cmscategoryinterfacebacktosee.iptv")
						.toString();
				if (path == null) {
					path = "";
				}
				url = path + "?&time=" + time + "&riddle="
						+ st.encrypt(key + time) + "&name="
						+ aes.encypt(vo.getKeyword()) + "&type=" + type1;
			}
		}
		logger.info(logHeader + logMethodName + "访问：  " + url);
		RemoteInterface re = new RemoteInterface();
		String jsonDatas = re.call(url);

		List<ResultVO> list = new ArrayList<ResultVO>();
		try {
			JSONArray jsonarray = JSONArray.fromObject(jsonDatas);
			if ("4".equals(vo.getListtype())) {
				for (int i = 0; i < jsonarray.size(); i++) {
					JSONObject o = jsonarray.getJSONObject(i);
					ResultVO r = new ResultVO();
					r.setName(o.getString("name"));
					r.setId(o.getString("id"));
					r.setBasecategory(o.getString("level"));
					r.setHtmPath(o.getString("templeturl"));
					r.setChannelName("");
					r.setParentName("");
					list.add(r);
				}
			} else {
				list = (List<ResultVO>) JSONArray.toCollection(jsonarray,
						ResultVO.class);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;

	}

	// 添加页面的弹出层查询cms的内容
	public List searchCmsProgram(AdresourceVO vo, String groupId) {
		String logMethodName = "searchCmsProgram(.)";
		AESUtil aes = new AESUtil();
		String filepath = ""; // 文件路径
		String path = ""; // 读取配置文件中的接口地址
		String url = ""; // 连接配置文件中的接口地址+参数
		try {
			filepath = this.getClass().getClassLoader()
					.getResource("interface_fromAbsm.properties").toURI().getPath();
		} catch (Exception e) {
			logger.error(logHeader + logMethodName
					+ "获取配置文件出错 get properties exception:" + e);
		}
		SecurityTools st = new SecurityTools();
		String key = "besto";
		long time = System.currentTimeMillis();
		Properties properties = ReadProperties.readProperties(filepath);
		try {

			if (groupId.equals("3")) { // 手机

				if (vo.getListtype().equals("3")) { // 查询手机jeecms新闻内容接口
					path = properties.get("newscmsprograminterface").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&keyWord="
							+ vo.getKeyword() + "&vo.pageid=" + vo.getPageid()
							+ "&vo.pagecount=" + PAGESCOUNT;
				} else if (vo.getListtype().equals("1")) { // 点播
					path = properties.get("cmsprograminterface").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				} else if (vo.getListtype().equals("2")) { // 直播
					path = properties.get("cmsliveinterface").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
					// 2016.02.01
				} else if (vo.getListtype().equals("6")) { // 回看
					path = properties.get("cmsliveinterfacebacktosee")
							.toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				}
			} else if (groupId.equals("2")) { // ott查询

				if (vo.getListtype().equals("1")) { // 点播
					path = properties.get("cmsprograminterface.ott").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				} else if (vo.getListtype().equals("2")) { // 直播
					path = properties.get("cmsliveinterface.ott").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				} else if (vo.getListtype().equals("5")) { // 广播
					path = properties.get("cmsliveinterfaceb.ott").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?vo.primarykey=" + type2 + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&time=" + time
							+ "&riddle=" + st.encrypt(key + time)
							+ "&vo.pageid=" + vo.getPageid() + "&vo.pagecount="
							+ PAGESCOUNT;
					// 2016.02.01
				} else if (vo.getListtype().equals("6")) { // 回看
					path = properties.get("cmsliveinterfacebacktosee.ott")
							.toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				}

			} else { // iptv

				if (vo.getListtype().equals("1")) { // 点播
					path = properties.get("cmsprograminterface.iptv")
							.toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				} else if (vo.getListtype().equals("2")) { // 直播
					path = properties.get("cmsliveinterface.iptv").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				} else if (vo.getListtype().equals("5")) { // 广播
					path = properties.get("cmsliveinterfaceb.iptv").toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
					// 2016.02.01
				} else if (vo.getListtype().equals("6")) { // 回看
					path = properties.get("cmsliveinterfacebacktosee.iptv")
							.toString();
					if (path == null) {
						path = "";
					}
					url = path + "?temptoken=&time=" + time + "&riddle="
							+ st.encrypt(key + time) + "&vo.name="
							+ aes.encypt(vo.getKeyword()) + "&vo.pageid="
							+ vo.getPageid() + "&vo.pagecount=" + PAGESCOUNT;
				}
			}

		} catch (Exception e) {
			logger.error(logHeader + logMethodName
					+ "拼接接口地址出错 interfaceAddress exception:" + e);
		}

		logger.info(logHeader + logMethodName
				+ "访问接口地址 searchInterfaceAddress：  " + url);
		RemoteInterface re = new RemoteInterface();
		String jsonDatas = re.call(url);
		if (jsonDatas == null)
			jsonDatas = "";
		logger.info(logHeader + logMethodName
				+ "访问结果 searchInterfaceResult jsonLength：  "
				+ jsonDatas.length());

		if (jsonDatas.equals("")) {
			return null;
		} else {

			JSONArray jsonarray = JSONArray.fromObject(jsonDatas);
			List<ResultVO> list = new ArrayList<ResultVO>();
			if (jsonarray.size() > 0) { // 从cms与jeecms中获取的数据，两端返回的字段不一致，导致获取数据的时候要判断是否为空
				ResultVO resultvo = null;
				logger.info("共" + jsonarray.size() + "条数据！");
				for (int i = 0; i < jsonarray.size(); i++) {
					resultvo = new ResultVO();
					JSONObject json = jsonarray.getJSONObject(i);

					if (json.get("name") != null) { // 判断接口返回的字段是否有name
													// 如果有name就证明是直播或广播
						if (vo.getListtype().equals("1")) { // 判断是否是直播
							String tempGuest = json.get("guest").toString();
							if (tempGuest == null || "null".equalsIgnoreCase(tempGuest)) {
								resultvo.setName(json.get("name").toString());
							} else {
								resultvo.setName(json.get("name").toString() + "	"
									+ json.get("guest").toString());
							}
						} else {
							resultvo.setName(json.get("name").toString()); // 否则就是广播
						}
					}

					if (json.get("id") != null) { // 判断接口返回的字段是否有id
						resultvo.setId(json.get("id").toString());
						if(vo.getListtype().equals("2")){
							resultvo.setId(json.get("channelnumber").toString());
						}
					}

					// 清晰度
					if (json.get("guest") != null) { // 判断接口返回的字段是否有guest
						resultvo.setGuest(json.get("guest").toString());
					}

					if (groupId.equals("1")) { // IPTV
						if ("1".equals(vo.getListtype())) { // 判断查询点播的内容id获取的是主键的值
							if (json.get("primaryid") != null) { // 判断接口返回的字段是否有id
								resultvo.setId(json.get("code").toString());
							}
						}
					} else { // OTT 手机

						if ("1".equals(vo.getListtype())) { // 判断查询点播的内容id获取的是主键的值
							if (json.get("primaryid") != null) { // 判断接口返回的字段是否有id
								//resultvo.setId(json.get("primaryid").toString());
								resultvo.setId(json.get("code").toString());
							}
						}
					}

					if (json.get("title") != null) { // 判断接口返回的字段
						resultvo.setTitle(json.get("title").toString());
					}
					//add start by Fred 20170216
					if (json.get("category_id") != null) { // 判断接口返回的字段
						resultvo.setCategory_id(json.get("category_id").toString());
					}
					//add end by Fred 20170216
					if (json.get("seriesflag") != null) { // 判断接口返回的字段
						resultvo.setSeriesflag(json.get("seriesflag")
								.toString());
					} else {

						if (vo.getListtype().equals("2")) {
							resultvo.setSeriesflag("2"); // 0：单集；1：多集；2：代表直播单集;3代表新闻
						} else if (vo.getListtype().equals("3")) {
							resultvo.setSeriesflag("3"); // 0：单集；1：多集；2：代表直播单集；3代表新闻
							resultvo.setHtmPath(json.get("htmPath").toString()); // 新闻模板地址
						} else if (vo.getListtype().equals("5")) {
							resultvo.setSeriesflag("4"); // 0：单集；1：多集；2：代表直播单集;3代表新闻;4代表广播
						} else if (vo.getListtype().equals("6")) {
							resultvo.setSeriesflag("5");
						}
						if (json.get("basecategory") != null) { // 判断接口返回的字段
							resultvo.setBasecategory(json.get("basecategory")
									.toString());
						}
					}

					list.add(resultvo);
				}
			}
			return list;
		}
	}


	/**
	 * 添加页面的弹出层查询cms的直播列表
	 */
	public Map searchCmsLive(AdresourceVO vo, String groupid) {
		String logMethodName = "searchCmsLive(.)";
		String filepath = ""; // 文件路径
		String path = ""; // 读取配置文件中的接口地址
		String url = ""; // 连接配置文件中的接口地址+参数

		try {
			filepath = this.getClass().getClassLoader()
					.getResource("interface_fromAbsm.properties").toURI().getPath();
		} catch (Exception e) {
			e.printStackTrace();
		}

		SecurityTools st = new SecurityTools();
		String key = "besto";
		long time = System.currentTimeMillis();
		Properties properties = ReadProperties.readProperties(filepath);
		if (groupid.equals("3")) { // 手机
			path = properties.get("cmschannelinterface").toString();
			url = path + "?temptoken=&time=" + time + "&riddle="
					+ st.encrypt(key + time);
		} else if (groupid.equals("2")) { // OTT
			path = properties.get("cmschannelinterface.ott").toString();
			url = path + "?temptoken=&time=" + time + "&riddle="
					+ st.encrypt(key + time);
		} else if (groupid.equals("1")) { // iptv
			path = properties.get("cmschannelinterface.iptv").toString();
			url = path + "?temptoken=&time=" + time + "&riddle="
					+ st.encrypt(key + time);
		}
		logger.info(logHeader + logMethodName + "分类id:" + groupid + "$URL:"
				+ url);

		RemoteInterface re = new RemoteInterface();
		String jsonDatas = re.call(url);
		System.out.println(logMethodName + "jsonDatas：  " + jsonDatas);
		JSONArray jsonarray = JSONArray.fromObject(jsonDatas);
		Map<String, String> channelMap = new LinkedHashMap<String, String>();
		if (jsonarray.size() > 0) {
			for (int i = 0; i < jsonarray.size(); i++) {
				@SuppressWarnings("unused")
				ResultVO resultvo = new ResultVO();
				JSONObject json = jsonarray.getJSONObject(i);
				channelMap.put(json.get("primaryid").toString(),
						json.get("name").toString());
			}
		}
		return channelMap;

	}

	/**
	 * 添加页面的弹出层查询cms的节目单
	 */
	public List searchCmsSchedule(AdresourceVO vo, String groupId) {
		String logMethodName = "searchCmsSchedule(.)";
		String filepath = ""; // 文件路径
		String path = ""; // 读取配置文件中的接口地址
		String url = ""; // 连接配置文件中的接口地址+参数
		try {
			filepath = this.getClass().getClassLoader()
					.getResource("interface_fromAbsm.properties").toURI().getPath();
		} catch (Exception e) {
			e.printStackTrace();
		}

		SecurityTools st = new SecurityTools();
		String key = "besto";
		long time = System.currentTimeMillis();
		Properties properties = ReadProperties.readProperties(filepath);

		String datetime = vo.getBegindate().replace("-", "");
		if (groupId.equals("3")) { // 手机
			// categoryId=4&channelId=474&offset=0&type=2&temptoken=&time=1465779233377&riddle=8a0850b7e1ac957ecc16ba61cd1b1c00&date=20160614
			path = properties.get("cmsscheduleinterface").toString();
			url = path + "&temptoken=&time=" + time + "&riddle="
					+ st.encrypt(key + time) + "&date=" + datetime
					+ "&channelId=" + vo.getGuid() + "&categoryId=" + vo.getCategoryid();

		} else if (groupId.equals("2")) { // OTT

			path = properties.get("cmsscheduleinterface.ott").toString();
			url = path + "&temptoken=&time=" + time + "&riddle="
					+ st.encrypt(key + time) + "&date=" + datetime
					+ "&channelId=" + vo.getGuid();

		} else if (groupId.equals("1")) { // iptv

			path = properties.get("cmsscheduleinterface.iptv").toString();
			url = path + "&temptoken=&time=" + time + "&riddle="
					+ st.encrypt(key + time) + "&channelId=" + vo.getGuid()
					+ "&date=" + datetime;
		}
		logger.info(logHeader + logMethodName + "分类id:" + groupId + "$URL:"
				+ url);

		RemoteInterface re = new RemoteInterface();
		String jsonDatas = re.call(url);
		JSONObject jsonObj = JSONObject.fromObject(jsonDatas);
		JSONArray jsonarray = (JSONArray) jsonObj.get(datetime);

		List<ResultVO> list = new ArrayList<ResultVO>();
		if (jsonarray != null && jsonarray.size() > 0) {
			for (int i = 0; i < jsonarray.size(); i++) {
				ResultVO resultvo = new ResultVO();
				JSONObject json = jsonarray.getJSONObject(i);
				resultvo.setName(json.get("programName").toString());
				resultvo.setId(json.get("primaryid").toString());
				resultvo.setStartTime(json.get("startTime").toString());
				resultvo.setState(json.get("startDate").toString());
				resultvo.setDuration(json.getString("duration").toString());
				String categroyName = json.getString("categoryName").toString();
				if(categroyName.equals("null")) { categroyName = "";}
				resultvo.setCategoryName(categroyName);
				list.add(resultvo);
			}
		}
		return list;
	}


	/**
	 * 添加页面的弹出层查询cms的节目单分类
	 * @author william
	 * @version 1.8.6  2016.06.20
	 * @param vo
	 * @param groupid
	 * @return map
	 */
	public Map<String, String> searchScheduleClassify(AdresourceVO vo) {
		String logMethodName = "searchScheduleClassify(.)";
		String filepath = ""; // 文件路径
		String path = ""; // 读取配置文件中的接口地址
		String url = ""; // 连接配置文件中的接口地址+参数

		try {
			filepath = this.getClass().getClassLoader()
					.getResource("interface_fromAbsm.properties").toURI().getPath();
		} catch (Exception e) {
			e.printStackTrace();
		}

		SecurityTools st = new SecurityTools();
		String key = "besto";
		long time = System.currentTimeMillis();
		Properties properties = ReadProperties.readProperties(filepath);
		path = properties.get("cmsscheduleclassifyinterface").toString();
		
		// http://10.10.4.101:8080/cms/scheduleInterface_searchCategory.do?time=1418439444437&riddle=00eae19783805eb7312b5fe2b989390a
		url = path + "?time=" + time + "&riddle="
				+ st.encrypt(key + time);
		logger.info(logHeader + logMethodName + "$URL: "
				+ url);

		RemoteInterface re = new RemoteInterface();
		String jsonDatas = re.call(url);
		System.out.println(logMethodName + "jsonDatas：  " + jsonDatas);
		JSONArray jsonarray = JSONArray.fromObject(jsonDatas);
		Map<String, String> channelMap = new LinkedHashMap<String, String>();
		if (jsonarray.size() > 0) {
			for (int i = 0; i < jsonarray.size(); i++) {
				@SuppressWarnings("unused")
				ResultVO resultvo = new ResultVO();
				JSONObject json = jsonarray.getJSONObject(i);
				channelMap.put(json.get("id").toString(),
						json.get("name").toString());
			}
		}
		return channelMap;

	}

	





}
