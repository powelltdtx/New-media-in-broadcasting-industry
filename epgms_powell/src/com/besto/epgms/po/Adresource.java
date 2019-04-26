package com.besto.epgms.po;

import java.util.Date;

/** 
 * @作者 <powell/滕翔> 
 * @创建日期 2014-12-17 
 * @版本 V 1.0 
 * @说明 广告资源信息类
 */
public class Adresource{
	private int id;
	private String name;
	private String adresourcenum;
	private String duration;
	private String imgurl;
	private String title;
	private String sequence;
	private String actionUrl;
	private String guid;
	private String showtitle;
	private String status;
	private String deleteflag;
	private String showtype;
	private String actiontype;
	private String description;
	private String creationperson;
	private Date createtime;
	private String remark;
	private String begintime;
	private String endtime;
	private String begindate;
	private String enddate;
	private String beginmillisecond;
	private String endmillisecond;
	private String categoryid;
	private String listtype;    // 列表页面分类 1代表点播  2直播 3 新闻
	private String seriesflag;  // 节目单集多级的标签
	private String fixedurl;   // 固定页面地址

	private String pagesmark;
	private int plateid;
	private String advertisingName;
	private String adertisingnum;
	private String type;    
	private String showrules;
	private String advertisingid;
	private String categoryName;
	private String programName;
	private String channelName;
	private String scheduleid;
	
	private String keyword;   			// 添加资源的弹出层填写的关键字

	private String primarykey;  		//新的列表类分类  2001直播 2002点播]


	private String createperson;
	private String resourceType;		//资源类型：0-本地资源；1-媒体资源
	private int desplayTime;			//显示时长:0为一直显示
	private String adstrategyid;		//广告位ID
	private Integer sqlCountSt;			//开始记录行数
	private Integer sqlCountEd;			//结束记录行数
	private String mediacontent;
	private String mediatype;
	private String mediacode;
	private String mediaprimaryid;

	public String getCreateperson() {
		return createperson;
	}
	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}
	public String getPrimarykey() {
		return primarykey;
	}
	public void setPrimarykey(String primarykey) {
		this.primarykey = primarykey;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getProgramName() {
		return programName;
	}
	public void setProgramName(String programName) {
		this.programName = programName;
	}
	public String getChannelName() {
		return channelName;
	}
	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAdresourcenum() {
		return adresourcenum;
	}
	public void setAdresourcenum(String adresourcenum) {
		this.adresourcenum = adresourcenum;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getImgurl() {
		return imgurl;
	}
	public void setImgurl(String imgurl) {
		this.imgurl = imgurl;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSequence() {
		return sequence;
	}
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
	public String getActionUrl() {
		return actionUrl;
	}
	public void setActionUrl(String actionUrl) {
		this.actionUrl = actionUrl;
	}
	public String getShowtitle() {
		return showtitle;
	}
	public void setShowtitle(String showtitle) {
		this.showtitle = showtitle;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDeleteflag() {
		return deleteflag;
	}
	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}
	public String getShowtype() {
		return showtype;
	}
	public void setShowtype(String showtype) {
		this.showtype = showtype;
	}
	public String getActiontype() {
		return actiontype;
	}
	public void setActiontype(String actiontype) {
		this.actiontype = actiontype;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCreationperson() {
		return creationperson;
	}
	public void setCreationperson(String creationperson) {
		this.creationperson = creationperson;
	}
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getPagesmark() {
		return pagesmark;
	}
	public void setPagesmark(String pagesmark) {
		this.pagesmark = pagesmark;
	}
	public int getPlateid() {
		return plateid;
	}
	public void setPlateid(int plateid) {
		this.plateid = plateid;
	}
	public String getGuid() {
		return guid;
	}
	public void setGuid(String guid) {
		this.guid = guid;
	}
	public String getAdvertisingName() {
		return advertisingName;
	}
	public void setAdvertisingName(String advertisingName) {
		this.advertisingName = advertisingName;
	}
	public String getAdertisingnum() {
		return adertisingnum;
	}
	public void setAdertisingnum(String adertisingnum) {
		this.adertisingnum = adertisingnum;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getShowrules() {
		return showrules;
	}
	public void setShowrules(String showrules) {
		this.showrules = showrules;
	}
	public String getBegintime() {
		return begintime;
	}
	public void setBegintime(String begintime) {
		this.begintime = begintime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	public String getBegindate() {
		return begindate;
	}
	public void setBegindate(String begindate) {
		this.begindate = begindate;
	}
	public String getEnddate() {
		return enddate;
	}
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}
	public String getBeginmillisecond() {
		return beginmillisecond;
	}
	public void setBeginmillisecond(String beginmillisecond) {
		this.beginmillisecond = beginmillisecond;
	}
	public String getEndmillisecond() {
		return endmillisecond;
	}
	public void setEndmillisecond(String endmillisecond) {
		this.endmillisecond = endmillisecond;
	}
	public String getCategoryid() {
		return categoryid;
	}
	public void setCategoryid(String categoryid) {
		this.categoryid = categoryid;
	}
	public String getListtype() {
		return listtype;
	}
	public void setListtype(String listtype) {
		this.listtype = listtype;
	}
	public String getSeriesflag() {
		return seriesflag;
	}
	public void setSeriesflag(String seriesflag) {
		this.seriesflag = seriesflag;
	}
	public String getAdvertisingid() {
		return advertisingid;
	}
	public void setAdvertisingid(String advertisingid) {
		this.advertisingid = advertisingid;
	}

	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getFixedurl() {
		return fixedurl;
	}
	public void setFixedurl(String fixedurl) {
		this.fixedurl = fixedurl;
	}
	public String getScheduleid() {
		return scheduleid;
	}
	public void setScheduleid(String scheduleid) {
		this.scheduleid = scheduleid;
	}
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public int getDesplayTime() {
		return desplayTime;
	}
	public void setDesplayTime(int desplayTime) {
		this.desplayTime = desplayTime;
	}
	public String getAdstrategyid() {
		return adstrategyid;
	}
	public void setAdstrategyid(String adstrategyid) {
		this.adstrategyid = adstrategyid;
	}
	public Integer getSqlCountSt() {
		return sqlCountSt;
	}
	public void setSqlCountSt(Integer sqlCountSt) {
		this.sqlCountSt = sqlCountSt;
	}
	public Integer getSqlCountEd() {
		return sqlCountEd;
	}
	public void setSqlCountEd(Integer sqlCountEd) {
		this.sqlCountEd = sqlCountEd;
	}
	public String getMediacontent() {
		return mediacontent;
	}
	public void setMediacontent(String mediacontent) {
		this.mediacontent = mediacontent;
	}
	public String getMediatype() {
		return mediatype;
	}
	public void setMediatype(String mediatype) {
		this.mediatype = mediatype;
	}
	public String getMediacode() {
		return mediacode;
	}
	public void setMediacode(String mediacode) {
		this.mediacode = mediacode;
	}
	public String getMediaprimaryid() {
		return mediaprimaryid;
	}
	public void setMediaprimaryid(String mediaprimaryid) {
		this.mediaprimaryid = mediaprimaryid;
	}
}
