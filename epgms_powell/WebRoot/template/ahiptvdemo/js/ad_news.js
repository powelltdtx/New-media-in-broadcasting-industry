function init(){
	//alert(123);
		loadAdConfingJSONData(addatas,'','','',getData);
		setTimer(addatas,'','','',getData);
		
	}

var twoad = "";


function setTimer(pageId,code,nodeId,contentType,functionName) {
	setInterval(function() {
		loadAdConfingJSONData(pageId,code,nodeId,contentType,functionName);
	}, 300000);
}

function getData(iptv_jpad) {

	var lsflag = 137;
	var baseurl = "";
	var xmlhttp;
	var obj;	
	var aad;
	var providerid = "hw";
	var ChannelCount = '137';
	twoad = "";
	//baseurl = "http://117.71.25.104:81/bytuetechAPI/jsp/ahiptv/";
	baseurl = "http://117.71.25.104:81/bytuetechAPI/jsp/ahiptv/";
	
	var plates = iptv_jpad.position;
	var advers = plates[0].plate;
	var adress = advers[0].advertising;
	
	for ( var j = 0; j < adress.length; j++) {
		var adarr = adress[j].adresource;
		//no ad exist
		if(adarr.length == 0){
			aad = "" + "@@@@" + "";
			twoad += aad + "||||";
			continue;
		}
		for ( var i = 0; i < 1; i++) {
			var actionType = adarr[i].actiontype;

			var categoryid = adarr[i].categoryid;

			var parentid = adarr[i].parentId;

			var listtype = adarr[i].listtype;

			var guid = adarr[i].guid;

			var img = adarr[i].imgurl;

			var actionUrl = adarr[i].actionUrl;

			var pageurl;

			if ("6" == actionType) {

				if ("1" == listtype) {

					pageurl = baseurl + "moiveList.jsp?category_id=" + categoryid;

				} else if ("2" == listtype) {

					pageurl = baseurl + "zb_page.jsp?parentid=" + parentid
							+ "&categoryid=" + categoryid;

				} else if ("4" == listtype) {

					pageurl = baseurl + "special.jsp?topic_id=" + categoryid;

				} else {

					pageurl = baseurl + "dy_page.jsp?parentid=" + parentid
							+ "&categoryid=" + categoryid;

				}

			} else if ("2" == actionType) {
				guid = guid.replace(/UmaiPROG/,"Umai:PROG/");
				guid = guid.replace(/AHTVAHGD/,"@AHTV.AHGD");
				pageurl = baseurl + "moiveDet2.jsp?code=" + guid;

			} else if ("3" == actionType) {
				guid = guid.replace(/UmaiPROG/,"Umai:PROG/");
				guid = guid.replace(/AHTVAHGD/,"@AHTV.AHGD");
				pageurl = baseurl + "moiveDet.jsp?code=" + guid;

			} else if ("1" == actionType) {

				pageurl = actionUrl;

			}else if ("5" == actionType) {

				pageurl = actionUrl;

			}else {

				pageurl = "";

			}
			aad = pageurl + "@@@@" + img;
			twoad += aad + "||||";
		
		}
	}
	initdata();
}

function initdata() {

	var str = new Array();
	str = twoad.split("||||");
	for (var i=0; i < str.length; i++) {
		//alert(j);
		var addata = new Array();
		if (str[i] != "") {
			
			addata = str[i].split("@@@@");
			var ahref = addata[0];
			var pic = addata[1];
			//var jumpurl = "javascript:jumptohref('" + ahref + "')";
			//document.getElementById("LJ_" + (i + 1)).href = jumpurl;
			newsImgMoveParas[i].url = ahref;
			document.getElementById("img_" + i).src = pic;
			newsImgMoveParas[i].url = ahref;
			
		}
		
	}
}


