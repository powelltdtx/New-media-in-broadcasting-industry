//当告警事件alarmEvent无数据时调用次方法

//defaultImage();
function defaultImage(){
	$(".alarmEventPic").css("display","none");
    $(".defaultImage").css("display","block");
}
function defaultImageClose(){
	$(".alarmEventPic").css("display","block");
	$(".defaultImage").css("display","none");
}


//服务器分布
//serverWorn(18, 2);	
//服务器状态
//serverStates(3, 2);

//服务器分布
function serverWorn(servers, states) {
	var imgs = $('.serverLocation img');

	for(var i = 0; i < imgs.length; i++) {
		if(servers == i) {
			//states:1:正常;2:故障;3:离线
			if(states == 1) {
				imgs[i].src = "resource/monitoringSystem/img/ah_icon_green.png";
			} else if(states == 2) {
				imgs[i].src = "resource/monitoringSystem/img/ah_icon_red.png";
			} else if(states == 3) {
				imgs[i].src = "resource/monitoringSystem/img/ah_icon_grey.png";
			}
		}
	}
}

//服务器状态

function serverStates(servers, states) {
	var lis = $('.statusList li');
	var spans = $('.statusList span');

	for(var i = 0; i < lis.length; i++) {
		if(servers == i) {
		//states:1:正常;2:故障;3:离线
			 //1:正常，不做处理
			if(states == 1) {
				for(var y = 0; y < spans.length; y++) {
					if(servers == y) {
						$(spans[y]).text("正常");
						$(spans[y]).css({
							color: "rgba(60,166,120,0.9)"
						});
						$(spans[y]).prev().css({
							color: "rgba(60,166,120,0.9)"
						});
						$(spans[y]).parent().css({
							border: "2px solid rgba(60,166,120,0.9)",
							background: "url(resource/monitoringSystem/img/ah_icon_green.png) no-repeat 10px"
						});
						//$(spans[y]).parent().remove('< img src="img/ah_icon_4.png" width="30" height="30"/>')
					}
				}
			}
			//2:故障
			if(states == 2) {
				for(var y = 0; y < spans.length; y++) {
					if(servers == y) {
						$(spans[y]).text("故障");
						$(spans[y]).css({
							color: "rgba(246,80,80,0.9)"
						});
						$(spans[y]).prev().css({
							color: "rgba(246,80,80,0.9)"
						});
						$(spans[y]).parent().css({
							border: "2px solid rgba(246,80,80,0.9)",
							background: "url(resource/monitoringSystem/img/ah_icon_red.png) no-repeat 10px"
						});
						//$(spans[y]).parent().append('<img src="resource/monitoringSystem/img/ah_icon_4.png" width="30" height="30"/>')
					}
				}
			}
			//3:离线
			if(states == 3) {
				for(var y = 0; y < spans.length; y++) {
					if(servers == y) {
						$(spans[y]).text("服务器异常");
						$(spans[y]).css({
							color: "rgba(102,102,102,0.9)"
						});
						$(spans[y]).prev().css({
							color: "rgba(102,102,102,0.9)"
						});
						$(spans[y]).parent().css({
							border: "2px solid rgba(102,102,102,0.9)",
							background: "url(resource/monitoringSystem/img/ah_icon_grey.png) no-repeat 10px"
						});
					}
				}
			}
		}
	}
}

//时间
var interval = 60 - new Date().getSeconds();
fnRefreshTime(interval);
//刷新时间
function fnRefreshTime(interval) {
	interval = typeof interval === 'undefined' ? 60 : interval;
	var d = new Date()
	var mins = d.getMinutes()
	var secons = d.getSeconds()
	time.innerHTML = d.getHours() + ':' + (mins < 10 ? ('0' + mins) : mins) + ':' + (secons < 10 ? ('0' + secons) : secons);
	setTimeout(function() {
		fnRefreshTime()
	}, interval)

	date.innerHTML = (d.getFullYear() + '年' + (d.getMonth() + 1)) + '月' + d.getDate() + '日';
}


