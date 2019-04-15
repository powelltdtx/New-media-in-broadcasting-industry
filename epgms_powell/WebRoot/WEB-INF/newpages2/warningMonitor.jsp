<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		<meta charset="UTF-8">
		<meta name="Page-View-Size" content="1920*1080">
		<title>监控系统</title>
		<link rel="stylesheet" href="resource/monitoringSystem/css/common.css"/>
		<link rel="stylesheet" href="resource/monitoringSystem/css/anhui.css"/>
	</head>
<body>
		<div class="box">
			<img src="resource/monitoringSystem/img/nmg.jpg"/>
			<!--实时监控信息--> 
			<div class="timeInform">
				<div class="title1">实时监控信息</div>
				<div class="numList">
					<%-- <div class="num1">在线服务器数量<span>19</span>台</div>_ --%>
					<div class="num2">本日告警总数<span id="dayTotalCount"></span></div>
					<div class="num3">告警总数<span id="totalAll"></span></div>
				</div>
			</div>
			<!--告警趋势-->
			<div class="alarmTrend">
				<div class="title2">告警趋势</div>
				<div class="alarmTrendPic" id="alarmTrendPic">
			</div>
			</div>
			<!--日期时间-->
			<div class="dateTime">
				<div class="date" id="date"></div>
				<div class="time" id="time"></div>
			</div>
			<!--服务器分布-->
			<div class="serverLocation">
				<ul id="serverImgs">
					<!-- 
					<li><img name="0" title="10.23.249.14" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="1" title="10.23.249.15" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="2" title="10.23.249.11" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="3" title="10.23.249.12" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="4" title="10.23.249.50" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="5" title="10.23.249.51" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="6" title="10.23.249.52" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="7" title="10.23.249.53" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="8" title="10.23.249.54" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="9" title="10.23.249.55" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="10" title="10.23.249.56" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="11" title="10.23.249.57" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="12" title="10.23.249.58" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="13" title="10.23.249.59" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="14" title="10.23.249.60" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="15" title="10.23.249.61" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="16" title="10.23.249.62" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					青岛移动
					<li><img name="17" title="10.23.250.14" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="18" title="10.23.250.15" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="19" title="10.23.250.11" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="20" title="10.23.250.12" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="21" title="10.23.250.50" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="22" title="10.23.250.51" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="23" title="10.23.250.52" src="resource/monitoringSystem/img/ah_icon_green.png"/></li>
					<li><img name="24" title="10.23.250.53" src="resource/monitoringSystem/img/ah_icon_green.png"/></li> -->
				</ul>
			</div>
			<!--告警日志-->
			<div class="alarmLog">
				<div class="title3">告警日志</div>
				<div class="details">
					<table class="">
						<thead>
							<tr >
								<th class="tit">攻击时间</th>
								<th class="tit">服务器名称</th>
								<th class="tit">服务器IP</th>
								<th class="tit">攻击类型</th>
								<th class="tit">处理结果</th>
								<!-- <th class="tit">当前状态</th> -->
							</tr>
						</thead>
						<tbody class="form-body" id="alarmLog">
						
						</tbody>
					</table>
				</div>
			<!--服务器状态-->
			<div class="serverStatus">
				<div class="title4">服务器状态</div>
				<div class="statusList">
					<ul>
						<li>
							<span id="serverIp1" class="serNum"></span>
							<span id="serverIp1_notic">正常</span>
						</li>
						<li>
							<span id="serverIp2" class="serNum"></span>
							<span id="serverIp2_notic">正常</span>
						</li>
						<li>
							<span class="serNum"></span>
							<span>正常</span>
						</li>
					</ul>
					<ul>
						<li>
							<span class="serNum"></span>
							<span>正常</span>
						</li>
						<li>
							<span class="serNum"></span>
							<span>正常</span></li>
						<li>
							<span class="serNum"></span>
							<span>正常</span>
						</li>
					</ul>
				</div>
			</div>
			<!--告警事件-->
			<div class="alarmEvent">
				<div class="title5">告警事件</div>
				<div class="alarmEventPic" id="alarmEventPic"></div>
				<div class="defaultImage">
					<img src="resource/monitoringSystem/img/ah_fanghu.png" width="324" height="280"/>
				</div>
			</div>
			<input type="hidden" id="templateHidden" value=""> 
			<input type="hidden" id="serverHidden" name="0" value="">
		</div>
	</body>
</html>
 <script src="resource/monitoringSystem/js/echarts.min.js"></script>
 <script type="text/javascript">
 	//告警趋势
   	var alarmTrendPic = echarts.init(document.getElementById('alarmTrendPic'));
   	option1 = {

    tooltip: {
        trigger: 'axis'
    },
    legend: {
    	right:'0',
        data:[
        {
          name:'客户端',
           textStyle:{
                    fontSize:14,
                    color:'#847be6'
                },
                icon:'bar'
        },
        {
          name:'EPG模板',
           textStyle:{
                    fontSize:14,
                    color:'#00c3d5'
                },
                icon:'bar'
        }
        ]
    },
    grid: {
        left: '1%',
        right: '2%',
        bottom: '3%',
//      tooltip:{
//      	axisPointer:{
//  		lineStyle:{
//      	  color:"red"
//      	 }
//      	}
//      },
        containLabel: true
    },
//  toolbox: {
//      feature: {
//          saveAsImage: {}
//      }
//  },
    xAxis: {
    	 axisTick :{                 //坐标轴刻度相关设置
            show:false
          },
        type: 'category',
        boundaryGap: 'true',
         axisLine:{
        	lineStyle:{
        		color:"#FFFFFF",
        	}
               },
        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
    },
    yAxis: {
    	axisTick :{                 //坐标轴刻度相关设置
            show:false
          },
        type: 'value',
                axisLine:{
                	lineStyle:{
                		color:"#FFFFFF",
                	}
                }
    },
    series: [  
        {
            name:'客户端',
            type:'line',
            stack: '总量',
            
	        itemStyle: {
	            normal: {
	                color: '#847be6'
	            }
	        },
        
            data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            name:'EPG模板',
            type:'line',
            stack: '总量',
            itemStyle: {
	            normal: {
	                color: '#00c3d5'
	            }
	        },
            data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
    ]
};
      // 使用刚指定的配置项和数据显示图表。
   	 alarmTrendPic.setOption(option1);
 	
 	//告警事件
var alarmEventPic = echarts.init(document.getElementById('alarmEventPic'));
var option2 = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left:'10',
        top:'400',
        data: [
        {
          name:'客户端告警',
           textStyle:{
                    fontSize:14,
                    color:'#847be6'
                },
                icon:'bar'
        },
        {
          name:'EPG模板告警',
           textStyle:{
                    fontSize:14,
                    color:'#ff9c00'
                },
                icon:'bar'
        }
//      '服务器','模板'
        ],
        textStyle:{    //图例文字的样式
	        color:'#847be6',
	        fontSize:12
       }
    },
    series : [
        {
//          name: '访问来源',
            type: 'pie',
            radius : '55%',
            
            label : {
				normal : {
//				formatter: '{b}:{c}: ({d}%)',
				textStyle : {
				fontSize :16
			  }
			}
         }, 
            
            
            center: ['55%', '70%'],
            data:[
                {value:0, name:'客户端告警',itemStyle:{normal:{color:'#847be6'} }},
                {value:0, name:'EPG模板告警',itemStyle:{normal:{color:'#ff9c00'} }}
            ]
        }
    ]
};
       // 使用刚指定的配置项和数据显示图表。
        alarmEventPic.setOption(option2);
</script>


<script type="text/javascript">
window.onload = function(){ 
	var serverListJson = <%=request.getAttribute("serverListJson")%>;
	for(var index in serverListJson){
		$("#serverImgs").append( "<li><img name=" + index + " title="+ serverListJson[index].ip +" src='resource/monitoringSystem/img/ah_icon_green.png'/></li>");
	}
} 


function goChart(){
	$.ajax({
		url : 'templet_showPieChart.action',
		type : 'post',
		dataType : 'json',
		success : function(data) {
			//$("#day").html(data.dayTotalCount);
			//$("#month").html(data.monthTotalCount);
			option2.series[0].data[0].value = data.totalCountByServer;
			option2.series[0].data[1].value = data.totalCountByTemplate;
			var pieServerCount = data.totalCountByServer;
			var pieTemplateCount = data.totalCountByTemplate;
			if(pieServerCount == 0 && pieTemplateCount == 0){
				defaultImage();
			}else{
				defaultImageClose();
			}
			 $("#totalAll").html(data.totalAll);
			 $("#dayTotalCount").html(data.dayTotalCount);
			alarmEventPic.setOption(option2);
		}
	})
	
	$.ajax({
		url : 'templet_showBarChart.action',
		type : 'post',
		dataType : 'json',
		success : function(data) {
			option1.series[0].data = data.serverListJson;
			option1.series[1].data = data.templateListJson;
			alarmTrendPic.setOption(option1);
		}
	})
} 

	//定时查询
	setInterval(goChart,3000);
	
	//告警日志
	function alarmLogFun() {
		$.ajax({
			url : 'templet_showGuardNotice.action',
			type : 'get',
			dataType : 'json',
			success : function(data) {
				$("#alarmLog").children().remove();
				for (var i = 0; i < data.length; i++) {
					$("#alarmLog").append( "<tr class='ul'>");
					$("#alarmLog").append( "<td class='litime' title="+data[i].tamperTime+">" + data[i].tamperTime + "</td>");
					$("#alarmLog").append( "<td class='li' title="+data[i].serverName+">" + data[i].serverName + "</td>");
					$("#alarmLog").append( "<td class='li' title="+data[i].ip+">" + data[i].ip + "</td>");
					$("#alarmLog").append( "<td class='li' title="+data[i].tamperMode+">" + data[i].tamperMode + "</td>");
					$("#alarmLog").append( "<td class='li' title="+data[i].handleResult+">" + data[i].handleResult + "</td>");
					$("#alarmLog").append("<tr/>");
				}
			}
		})
	}
	setInterval(alarmLogFun, 3000);
	
	var intervalServer = null;
	function voice (voiceurl) {
		var file = [];
		file['mp3'] = voiceurl;
		audioplayer('service', file, false);
	}
	/** 音乐播放器 * @param obj 播放器id * @param file 音频文件 mp3: ogg: * @param loop 是否循环 */ 
	function audioplayer(id, file, loop){
	    var audioplayer = document.getElementById(id);
	    if(audioplayer!=null)
	    {
	        document.body.removeChild(audioplayer);
	    }
	    if(typeof(file)!='undefined')
	    {
	        if(navigator.userAgent.indexOf("MSIE")>0)
	        {
	            // IE
	            var player = document.createElement('bgsound');
	            player.id = id;
	            player.src = file['mp3'];
	            player.setAttribute('autostart', 'true');
	            if(loop){ player.setAttribute('loop', 'infinite');
	            }
	            document.body.appendChild(player);
	        }else{
	            // Other FF Chome Safari Opera
	            var player = document.createElement('audio');
	            player.id = id;
	            player.setAttribute('autoplay', 'autoplay');
	            if (loop) {
	                player.setAttribute('loop', 'loop');
	            }
	            document.body.appendChild(player);
	            var mp3 = document.createElement('source');
	            mp3.src = file['mp3'];
	            mp3.type = 'audio/mpeg';
	            player.appendChild(mp3);
	            var ogg = document.createElement('source');
	            ogg.src = file['ogg'];
	            ogg.type = 'audio/ogg';
	            player.appendChild(ogg);
	        }
	    }
	}
	
	//存储模板异常的服务器ip
	var exceptionArr = new Array();
	//亮灯
	function goAjax(){
			//模板异常信息查询
			$.ajax({
					url : 'templet_showMontByLightTemplate.do',
					type : 'post',
					dataType : 'json',
					success : function(data) {
						var arr=[];
						arr=data;
						var t =$("#templateHidden").val();
						if(data != t){
							//var r =$("#templateHidden").val();
							//alert(arr.length);
							if(arr.length != 0 && "dir"!=t){
								$("#templateHidden").val("dir");
								var templateLightList=data;
								voiceurl = 'newpages/pic/template.mp3';//模板攻击语音地址，不要有中文
								//var startTime = new Date().getTime();
								//第一次声音提醒
								voice(voiceurl);
								/* //第二次声音提醒
								var interval = setInterval(function () { voice(voiceurl)
									if(new Date().getTime() - startTime > 3000){
										clearInterval(interval);
										return;
										}
								},5000); */
								for(var index in templateLightList){
									var imgs = $('.serverLocation img');
									for(var i = 0; i < imgs.length; i++) {
										if(imgs[i].title==templateLightList[index].ip){
											serverWorn(imgs[i].name,2);
											exceptionArr.push(templateLightList[index].ip);
										}
									}
								}
								 serverStates(1,2);
								 $("#serverIp1").html("数据文件异常");
								 $("#serverIp1_notic").html(templateLightList[0].ip);
							}
						  if(arr.length == 0){
							  $("#templateHidden").val("");
							  // serverException==0 ,无服务器异常信息,== 1 服务器异常信息
							  var serverException = $("#serverHidden").attr("name");
							  var imgs = $('.serverLocation img');
							  if(serverException == 1){//有服务器预警信息
								  if(exceptionArr.length > 0){
								 	  for(var j = 0; j < exceptionArr.length; j++) {
										  for(var i = 0; i < imgs.length; i++) {
											  if(exceptionArr[j] == imgs[i].title){
												  //将灯光提示改为服务器预警灯光(灰色)
											  	  serverWorn(imgs[i].name,3);
											 	  serverStates(1,1);
												  $("#serverIp1").html("正常");
												  $("#serverIp1_notic").html("");
											  }
										  }
									  }
								  }
							  }else{		//无服务器预警信息
								  if(exceptionArr.length > 0){
								 	  for(var j = 0; j < exceptionArr.length; j++) {
										  for(var i = 0; i < imgs.length; i++) {
											  if(exceptionArr[j] == imgs[i].title){
												  //将灯光提示改为正常灯光(绿色)
												  serverWorn(imgs[i].name,1);
											 	  serverStates(1,1);
												  $("#serverIp1").html("正常");
												  $("#serverIp1_notic").html("");
											  }
										  }
									  }
								  }
							  }
						 	 exceptionArr.splice(0,ary.length);
						  }
					 	}
					}
				})
			//服务器异常信息查询
			$.ajax({
					url : 'templet_showMontByLightServer.do',
					type : 'post',
					dataType : 'json',
					success : function(data) {
						var arr=[];
						arr=data;
						var r =$("#serverHidden").val();
						if(arr.length > 0){
							voiceurl = 'newpages/pic/service.mp3';//服务器攻击语音地址，不要有中文
							voice(voiceurl);
						}
						if(data != r){
							//alert("t:"+t);
							$("#serverHidden").val(data);
								if(arr.length > 0){
									$("#serverHidden").attr("name","1");
									
									//intervalServer = setInterval(function () { voice(voiceurl)},5000);
									var serverLightList=data;
									for(var index in serverLightList){
										var imgs = $('.serverLocation img');
										for(var i = 0; i < imgs.length; i++) {
											if(imgs[i].title==serverLightList[index].ip){
												serverWorn(imgs[i].name,3);
											}
										}
									}
									serverStates(2,3);
									$("#serverIp2").html("服务器异常");
									$("#serverIp2_notic").html(serverLightList[0].ip);
								}else{
									$("#serverHidden").attr("name","0");
									clearInterval(intervalServer);
									var imgs = $('.serverLocation img');
									for(var i = 0; i < imgs.length; i++) {
										serverWorn(imgs[i].name,1);
									}
									serverStates(2,1);
									$("#serverIp2").html("正常");
									$("#serverIp2_notic").html("");
								}
						}
					}
				})
		}
	
	setInterval(goAjax,5000);
	
	
	
</script>
<script src="resource/monitoringSystem/js/jquery-3.2.1.min.js"></script>
<script src="resource/monitoringSystem/js/anhui.js"></script>