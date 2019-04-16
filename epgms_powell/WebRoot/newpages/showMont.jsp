<%@ page language="java" contentType="text/html;charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="epgmstags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>播控监控</title>
<link rel="stylesheet" href="newpages/css/common2.css" />
<link rel="stylesheet" href="newpages/css/SerMont.css" />
</head>
<body>
	<div class="box">
		<div class="left">
			<div class="date"></div>
			<div class="serData">
				<div class="serDataTit">预警单数据</div>
				<div class="serDataList">
					<span>今日预警数</span>
					<div class="num" id="day">
						<s:property value="#request.dayTotalCount" />
					</div>
				</div>
				<div class="serDataList">
					<span>本月预警数</span>
					<div class="num" id="month">
						<s:property value="#request.monthTotalCount" />
					</div>
				</div>
			</div>
			<div class="Analysis">
				<div class="AnalysisTit">预警单解析</div>
				<div class="AnalysisClass">预警类型</div>
				<div class="chart" id="chart"></div>
				<div class="line">
					<img src="newpages/img/line.jpg" />
				</div>
				<div class="city" id="city"></div>
			</div>
		</div>
		<div class="middle">
			<div class="tit2">预警分布</div>
			<!--安徽省图-->
			<div class="map" id="map">
				<img src="newpages/img/map.png" />
			</div>

			<!--警示灯-->
			<div class="lamp">
				<div class="red_big">
					<div class="red_small"></div>
				</div>
				<div class="green_big">
					<div class="green_small"></div>
				</div>
				<div class="yellow_big">
					<div class="yellow_small"></div>
				</div>
			</div>

			<!--合肥市-->
			<div class="hefei"></div>
			<!--滁州市-->
			<div class="chuzhou"></div>
			<!--黄山市-->
			<div class="huangshan"></div>

			<div class="lebel">
				<div class="lebeList">
					<div class="one1"></div>
					<div class="two">模板</div>
				</div>
				<div class="lebeList">
					<div class="one2"></div>
					<div class="two">数据</div>
				</div>
				<div class="lebeList">
					<div class="one3"></div>
					<div class="two">服务器</div>
				</div>
			</div>
		</div>
		<div class="dateTime">
			<div class="date" id="date"></div>
			<div class="time" id="time"></div>
		</div>

		<div class="right">
			<div class="serverTit">服务器集群</div>
			<div class="list">
				<div class="serverListone">
					<div class="serName">
						<span>服务器</span> <span>1</span>
					</div>
					<div class="one" id="one">
						<img src="newpages/img/ling.png" class="lent" id="pic1" />
					</div>
				</div>
				<div class="serverListone">
					<div class="serName">
						<span>服务器</span> <span>2</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic2" />
				</div>
				<div class="serverListone">
					<div class="serName">
						<span>服务器</span> <span>3</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic3" />
				</div>
				<div class="serverListone">
					<div class="serName">
						<span>服务器</span> <span>4</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic4" />
				</div>
			</div>
			<div class="Servermiddle">
				<div class="serverListTwo">
					<div class="serName">
						<span>服务器</span> <span>5</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic5" />
				</div>
				<div class="serverListTwo">
					<div class="serName">
						<span>服务器</span> <span>6</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic6" />
				</div>
				<div class="serverListTwo">
					<div class="serName">
						<span>服务器</span> <span>7</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic7" />
				</div>
			</div>
			<div class="ServerBottom">
				<div class="serverListThree">
					<div class="serName">
						<span>服务器</span> <span>8</span>
					</div>
					<div class="eight">
						<img src="newpages/img/ling.png" class="lent" id="pic8" />
					</div>
				</div>
				<div class="serverListThree">
					<div class="serName">
						<span>服务器</span> <span>9</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic9" />
				</div>
				<div class="serverListThree">
					<div class="serName">
						<span>服务器</span> <span>10</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic10" />
				</div>
				<div class="serverListThree">
					<div class="serName">
						<span>服务器</span> <span>11</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic11" />
				</div>
			</div>
			<div class="serverLast">
				<div class="serverListfour">
					<div class="serName">
						<span>服务器</span> <span>12</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic12" />
				</div>
				<div class="serverListfour">
					<div class="serName">
						<span>服务器</span> <span>13</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic13" />
				</div>
				<div class="serverListfour">
					<div class="serName">
						<span>服务器</span> <span>14</span>
					</div>
					<img src="newpages/img/ling.png" class="lent" id="pic14" />
				</div>
			</div>
			<div class="rightFoot">
				<div class="footTop">
					<div class="winng">
						<span>14</span> <span>服务器总数</span>
					</div>
					<div class="winng">
						<span>1</span> <span>告警</span>
					</div>
					<div class="winng">
						<span>1</span> <span>故障</span>
					</div>
					<div class="line4">
						<img src="newpages/img/line.jpg" />
					</div>
				</div>
				<div class="footBottom">
					<div class="winng">
						<span>正常</span>
					</div>
					<div class="winng">
						<span>存在预警</span>
					</div>
					<div class="winng">
						<span>存在故障</span>
					</div>
				</div>
				<input type="hidden" id="templateHidden" value=""> <input
					type="hidden" id="serverHidden" value="">

			</div>
		</div>
	</div>
	</div>
</body>
</html>

<script src="newpages/js/SerMont.js"></script>
<script src="newpages/js/echarts.min.js"></script>
<script src="newpages/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript">
</script>
<script type="text/javascript">
	var barChart = echarts.init(document.getElementById('city'));
	
		var groupNameJson = <%=request.getAttribute("groupNameJson")%>;
		var totalCountJson = <%=request.getAttribute("totalCountJson")%>;
		/* var groupNameJson; 
		var totalCountJson; */
	
	var barOption = {
		tooltip : {},
		xAxis : {
			data : groupNameJson,
			axisLabel : {
				interval : 0,
				rotate : 0,
			},
			axisLine : {
				lineStyle : {
					color : "#FFFFFF",
				}
			}
		},
		yAxis : {
			splitLine : "none",
			nameTextStyle : {
				color : [ "red", "green" ]
			},
			axisLine : {
				lineStyle : {
					color : "#FFFFFF",
				}
			}
		},
		series : [ {
			name : '数量',
			type : 'bar',
			color : "#ffc300",
			barWidth : 6,
			data : totalCountJson,
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
						var colorList = [ '#b27cdb', '#1fe0e9', '#ffc300',
								'#00ff00', '#e52f2f', '#b5b5b5', '#b27cdb',
								'#1fe0e9', '#ffc300', '#00ff00', '#e52f2f',
								'#b5b5b5', '#F4E001', '#b27cdb', '#1fe0e9',
								'#ffc300', '#00ff00'

						];
						return colorList[params.dataIndex]
					}
				}
			}
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	barChart.setOption(barOption);
</script>
<script type="text/javascript">

	function goChart(){
		
		$.ajax({
			url : 'templet_showPieChart.action',
			type : 'post',
			dataType : 'json',
			success : function(data) {
				$("#day").html(data.dayTotalCount);
				$("#month").html(data.monthTotalCount);
				pieOption.series[0].data[0].value = data.totalCountByServer;
				pieOption.series[0].data[2].value = data.totalCountByTemplate;
				pieChart.setOption(pieOption);
			}
		})
		
		
		$.ajax({
			url : 'templet_showBarChart.action',
			type : 'post',
			dataType : 'json',
			success : function(data) {
				barOption.xAxis.data = data.groupNameJson;
				barOption.series[0].data = data.totalCountJson;
				barChart.setOption(barOption);
			}
		})
		
		
		
	} 
	
	
	
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
	
	function goAjax(){
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
						if(arr.length == 1 && "dir"!=t){
								$("#templateHidden").val(data);
								var templateLightList=data;
								
								voiceurl = 'newpages/pic/template.mp3';//服务器攻击语音地址，不要有中文
								var startTime = new Date().getTime();
								//第一次声音提醒
								voice(voiceurl);
								//第二次声音提醒
								var interval = setInterval(function () { voice(voiceurl)
									if(new Date().getTime() - startTime > 3000){
										clearInterval(interval);
										return;
										}
								},5000);
								
								for(var index in templateLightList){
								// alert(templateLightList[index].platForm);
								 mapWin(templateLightList[index].platForm,2);
								 serState(templateLightList[index].serverName,templateLightList[index].lightType);
								}
						}
						if(arr.length > 1 && "dir"!=t){
							$("#templateHidden").val("dir");
							var templateLightList=data;
							
							voiceurl = 'newpages/pic/template.mp3';//服务器攻击语音地址，不要有中文
							var startTime = new Date().getTime();
							//第一次声音提醒
							voice(voiceurl);
							//第二次声音提醒
							var interval = setInterval(function () { voice(voiceurl)
								if(new Date().getTime() - startTime > 3000){
									clearInterval(interval);
									return;
									}
							},5000);
							
							for(var index in templateLightList){
							// alert(templateLightList[index].platForm);
							 mapWin(templateLightList[index].platForm,2);
							 serState(templateLightList[index].serverName,templateLightList[index].lightType);
							}
						}
					  if(arr.length == 0){
						  $("#templateHidden").val("");
							mapWin("消失",0);
							serState("消失",5);
					  }
				 	}
				
					}
				})
			$.ajax({
					url : 'templet_showMontByLightServer.do',
					type : 'post',
					dataType : 'json',
					success : function(data) {
					var arr=[];
					arr=data;
					
					var r =$("#serverHidden").val();
					
					if(data != r){
						//alert("t:"+t);
						$("#serverHidden").val(data);
					if(arr.length > 0){
						
						voiceurl = 'newpages/pic/service.mp3';//服务器攻击语音地址，不要有中文
						voice(voiceurl);
						intervalServer = setInterval(function () { voice(voiceurl)},5000);
							var serverLightList=data;
							for(var index in serverLightList){
								 //alert(templateLightList[index].platForm);
								 mapWin(serverLightList[index].serverGroup,3);
								 serState(serverLightList[index].serverName,serverLightList[index].lightType);
							 }
							
					}else{
						clearInterval(intervalServer);
						 // alert("=0");
						 mapWin("消失",0);
						 serState("消失",5);
						
					}
					}
								
					}
				})
		}

	var pieChart = echarts.init(document.getElementById('chart'));

	var totalCountByServer ='<%=request.getAttribute("totalCountByServer")%>';
	var totalCountByTemplate ='<%=request.getAttribute("totalCountByTemplate")%>';
	/* var totalCountByServer;
	var totalCountByTemplate; */
	
	
	var pieOption = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			left : 'left',
			data : [ '服务器', '数据', '模板' ],
			textStyle : { //图例文字的样式
				color : '#1d9ff2',
				fontSize : 12
			}
		},
		series : [ {
			name : '访问来源',
			type : 'pie',
			radius : '65%',
			center : [ '50%', '60%' ],
			data : [ {
				value : totalCountByServer,
				name : '服务器'
			}, {
				value : 0,
				name : '数据'
			}, {
				value : totalCountByTemplate,
				name : '模板'
			} ],
			itemStyle : {
				emphasis : {
					shadowBlur : 10,
					shadowOffsetX : 0,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			}
		} ]
	};
	// 使用刚指定的配置项和数据显示图表。
	pieChart.setOption(pieOption);
	//定时执行
	setInterval(goAjax,3000);
	
 	setInterval(goChart,5000);
</script>
