window.onload=function(){
	 // 时间
    time=$('time')
    console.log(time);
	var interval=60-new Date().getSeconds();
	fnRefreshTime(interval);
	// 刷新时间
	function fnRefreshTime(interval){
		interval=typeof interval==='undefined'?60:interval;
		var d=new Date()
		var mins=d.getMinutes()
		var secons=d.getSeconds()
		time.innerHTML=d.getHours()+':'+(mins<10?('0'+mins):mins)+':'+(secons<10?('0'+secons):secons);
		setTimeout(function(){
			fnRefreshTime()
		},interval)
		date.innerHTML=(d.getFullYear()+'年'+d.getMonth() + 1) + '月' + d.getDate()+'日';
	}
}

$("#intBtn").click(function() {
	alert('aaa');
})

// 获取id
function $(aaa) {
	var a = document.getElementById(aaa);
	return a;
}

var city = [];
var state = [];

function mapWin(citys, states) {
	var city = [];
	var state = [];
	city.push(citys);
	state.push(states)
	// console.log(city)
	// console.log(state)

	var red = document.getElementsByClassName("red_big")[0];
	var green = document.getElementsByClassName("green_big")[0];
	var yellow = document.getElementsByClassName("yellow_big")[0];
	var lamp = document.getElementsByClassName("lamp")[0];

	for (var i = 0; i < city.length; i++) {

		if (city[i] == "合肥市") {
			lamp.style.position = "relative";
			lamp.style.left = "209px";
			lamp.style.top = "245px";

			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					red.style.display = "block";
				}
				if (state[y] == 2) {
					green.style.display = "block";
				}
				if (state[y] == 3) {
					yellow.style.display = "block";
				}
			}
		}
		if (city[i] == "滁州市") {
			lamp.style.position = "relative";
			lamp.style.left = "271px";
			lamp.style.top = "180px";

			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					red.style.display = "block";
				}
				if (state[y] == 2) {
					green.style.display = "block";
				}
				if (state[y] == 3) {
					yellow.style.display = "block";
				}
			}
		}
		if (city[i] == "黄山市") {
			lamp.style.position = "relative";
			lamp.style.left = "277px";
			lamp.style.top = "443px";

			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					red.style.display = "block";
				}
				if (state[y] == 2) {
					green.style.display = "block";
				}
				if (state[y] == 3) {
					yellow.style.display = "block";
				}
			}
		}

	if (city[i] == "消失") {
// alert("消失");
// lamp.style.display = "none";
			red.style.display = "none";
			green.style.display = "none";
			yellow.style.display = "none";
		}
	}

}
function serState(servers, states) {
	var server = [];
	var state = [];
	server.push(servers);
	state.push(states)

	var lent = document.getElementsByClassName("lent");
	console.log(lent);
	for (var i = 0; i < server.length; i++) {
		if (server[i] == "消失") {
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 5) {
					for (var z = 0; z < lent.length; z++) {
						console.log(lent[z]);
						lent[z].src = "newpages/img/ling.png";
					}

				}
			}
		}
	}
	for (var i = 0; i < server.length; i++) {
		var pic = document.getElementById('pic1');

		if (server[i] == "服务器1") {
			var pic = document.getElementById('pic1');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器2") {
			var pic = document.getElementById('pic2');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器3") {
			var pic = document.getElementById('pic3');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器4") {
			var pic = document.getElementById('pic4');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器5") {
			var pic = document.getElementById('pic5');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器6") {
			var pic = document.getElementById('pic6');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器7") {
			var pic = document.getElementById('pic7');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器8") {
			var pic = document.getElementById('pic8');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器9") {
			var pic = document.getElementById('pic9');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器10") {
			var pic = document.getElementById('pic10');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器11") {
			var pic = document.getElementById('pic11');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器12") {
			var pic = document.getElementById('pic12');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器13") {
			var pic = document.getElementById('pic13');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
		if (server[i] == "服务器14") {
			var pic = document.getElementById('pic14');
			for (var y = 0; y < state.length; y++) {
				if (state[y] == 1) {
					pic.src = "newpages/img/ling.png";
				}
				if (state[y] == 2) {
					pic.src = "newpages/img/red.png";
				}
				if (state[y] == 3) {
					pic.src = "newpages/img/green.png";
				}
			}
		}
	}
}
