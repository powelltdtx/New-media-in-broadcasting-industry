function $(aaa) {
	var a = document.getElementById(aaa);
	return a;
}
var arrdirectorLength = 0;
var tuijianLength = 0;
var arrkpeopleLength = 0;
var tabnumLength = 0;
var seriesLength = 0;
var imgurlhistory;
// datainit();

function datainit() {
	$("title").innerHTML = strCotent.name.replace(/quot/g, '"');
	var director = strCotent.director;
	if (director == '' || director == null || director == 'null') {
		director = '暂无';
	}
	var description = strCotent.description.replace(/quot/g,'"');
	if (description == null || description == '' || description == 'null') {
		description = '暂无';
	}
	if (description.length > 22) {
		description = description.substring(0, 50);
		document.getElementsByClassName("readMore")[0].style.display = 'inline-block';
		$("description").innerHTML = description + "...";
	} else {
		$("description").innerHTML = description;
		document.getElementsByClassName("readMore")[0].style.display = 'none';
	}
	var strvariety = '';
	for (var i = 0; i < contentArray.length; i++) {
		if (i < 5) {
			strvariety = strvariety + '<div class="Variety">'
					+ contentArray[i].name.replace(/quot/g,'"') + '</div>';
		} else {
			if ((i + 1) < contentArray.length) {
				strvariety = strvariety + '<div class="Variety">更多往期内容>></div>';
			} else {
				strvariety = strvariety + '<div class="Variety">'
						+ contentArray[i].name.replace(/quot/g,'"') + '</div>';
			}
			break;
		}
	}
	$("Variety").innerHTML = strvariety;
	variety = document.getElementsByClassName('Variety');
	area[104].ele = variety;
	var innertuijian = '';
	var tjfileurl = "";
	tuijianLength = tuijianlist.length;
	var random = 0;
	var data = '';
	var lengthList = 0;
	if (tuijianlist.length > 6) {
		lengthList = 6;
	} else {
		lengthList = tuijianlist.length - 1;
	}
	for (var m = 0; m < tuijianlist.length; m++) {
		if (tuijianlist[m].primaryid == category_id) {
			for (var k = 0; k < tuijianlist[m].piclist.length; k++) {
				imgurlhistory = tuijianlist[m].piclist[k][""];
				if (imgurlhistory == null) {
					imgurlhistory = tuijianlist[m].piclist[k][k];
					if (imgurlhistory != null && imgurlhistory != '') {
						break;
					}
				}
			}
		}
	}
	for (var i = 0; i < lengthList; i++) {
		random = parseInt(Math.random() * tuijianLength);
		if (tuijianlist[random].primaryid != category_id  && data.indexOf(random.toString()) < 0 && tuijianlist[random].primaryid.indexOf("1099001002005")<0) {
			tjfileurl = tuijianlist[random].fileurl;
			if (tjfileurl == '' || tjfileurl == null || tjfileurl == 'null') {
				for (var j = 0; j < tuijianlist[random].piclist.length; j++) {
					tjfileurl = tuijianlist[random].piclist[j][""];
					if (tjfileurl == null) {
						tjfileurl = tuijianlist[random].piclist[j][j];
					}
					if (tjfileurl != null && tjfileurl != '') {
						break;
					}
				}
			}
			innertuijian = innertuijian + '<li class="recommod img"><img src="'
					+ tjfileurl
					+ '" width="166" height="222"><p>'
					+ tuijianlist[random].name.replace(/quot/g,'"')+ '</p></li>';
			recommendRandomList.push(tuijianlist[random].primaryid);
		} else {
			i--;
		}
		data += random + ",";
	}
	$('recommod').getElementsByTagName("ul")[0].innerHTML = innertuijian;
	recommod = document.getElementsByClassName('recommod');
	area[106].ele = recommod;

	if (resjianquan == '2') {
		fun = document.getElementsByClassName('has');
	} else {
		fun = document.getElementsByClassName('fun');
	}
	area[105].ele = fun;

	// setcollectionMoveParas();
	setvarietyMoveParas();
	setfunMoveParas();
	setrecommodMoveParas();

}
var tabnum = 0;
// var startindex = 0;
function tabload() {
	var volumncount = contentArray.length;
	tabnum = Math.ceil(volumncount / 10);
	var temp = volumncount;
	var collpop = '';

	for (var i = 0; i < tabnum; i++) {
		if ((temp - 10) > 0) {
			collpop = collpop + '<div class="collPop">' + temp + '-'
					+ (temp - 9) + '</div>';
			temp = temp - 10;
		} else {
			collpop = collpop + '<div class="collPop">' + temp + '-'
					+ '1</div>';
		}
	}
	$("collPop").innerHTML = collpop;
	collPop = document.getElementsByClassName('collPop');
	area[107].ele = collPop;
	setcollPopMoveParas();
}

var tabindex = 0;
function seriesload() {
	area[108].currentIndex = 0;
	var volumncount = contentArray.length;
	var startindex = area[107].currentIndex * 10;
	var j = 0;
	var strvariety = '';
	/*for (var i = (startindex - 1); i >= 0 && j < 10; i--) {
		strvariety = strvariety + ' <div class="VarietyPop">'
				+ contentArray[i].name + '</div>';
		j++;
	}*/
	for (var i = startindex; i < volumncount  && j < 10; i++) {
		strvariety = strvariety + ' <div class="VarietyPop">'
				+ contentArray[i].name + '</div>';
		j++;
	}
	$("VarietyPop").innerHTML = strvariety;

	varietyPop = document.getElementsByClassName('VarietyPop');
	area[108].ele = varietyPop;
	setvarietyPopMoveParas();
}

function setvarietyMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	varietyMoveParas = [];
	var varietyMovePara = {};
	var len = variety.length;

	for (var i = 0; i < len; i++) {
		varietyMovePara = {};
		if (i < 2) {
			if (strCotent.description.length > 22) {
				up = 103;
			} else {
				up = -1;
			}
		} else {
			up = i - 2;
		}
		if ((i + 2) < len) {
			down = i + 2;
		} else {
			if (i == 1 || i == 3) {
				if ((i + 1) < len) {
					down = i + 1;
				}
			} else {
				down = 105;
			}
		}

		if (i == 1 || i == 3 || i == 5) {
			right = -1;
		} else {
			if ((i + 1) < len) {
				right = i + 1;
			} else {
				right = -1;
			}
		}

		if (i == 0 || i == 2 || i == 4) {
			left = 100;
		} else {
			left = i - 1;
		}

		varietyMovePara.up = up;
		varietyMovePara.down = down;
		varietyMovePara.right = right;
		varietyMovePara.left = left;
		varietyMoveParas[i] = varietyMovePara;
	}
	area[104].paras = varietyMoveParas;
}

function setfunMoveParas() {
	if (resjianquan == '2') {
		funMoveParas = [ {
			up : 104,
			right : 1,
			down : 106,
			left : -1
		}, {
			up : 104,
			right : -1,
			down : 106,
			left : 0
		} ];
	} else {
		funMoveParas = [ {
			up : 104,
			right : 1,
			down : 106,
			left : -1
		}, {
			up : 104,
			right : 2,
			down : 106,
			left : 0
		}, {
			up : 104,
			right : -1,
			down : 106,
			left : 1
		} ];
	}

	area[105].paras = funMoveParas;
}

function setrecommodMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	recommodMoveParas = [];
	var recommodMovePara = {};

	var recLenth = document.getElementsByClassName('recommod').length;
	for (var i = 0; i < recLenth; i++) {
		recommodMovePara = {};
		up = 105;
		down = -1;
		if ((i + 1) < recLenth) {
			right = i + 1;
		} else {
			right = -1;
		}
		if (i > 0) {
			left = i - 1;
		} else {
			left = -1;
		}
		recommodMovePara.up = up;
		recommodMovePara.down = down;
		recommodMovePara.right = right;
		recommodMovePara.left = left;
		recommodMoveParas[i] = recommodMovePara;
	}
	area[106].paras = recommodMoveParas;
}

function setcollPopMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	collPopMoveParas = [];
	var collPopMovePara = {};
	var len = collPop.length;
	for (var i = 0; i < len; i++) {
		collPopMovePara = {};
		up = -1;
		down = 108;
		if ((i + 1) < len) {
			right = i + 1;
		} else {
			right = -1;
		}
		if (i > 0) {
			left = i - 1;
		} else {
			left = -1;
		}
		collPopMovePara.up = up;
		collPopMovePara.down = down;
		collPopMovePara.right = right;
		collPopMovePara.left = left;
		collPopMoveParas[i] = collPopMovePara;
	}
	area[107].paras = collPopMoveParas;
}

function setvarietyPopMoveParas() {
	var up = -1;
	var down = -1;
	var right = -1;
	var left = -1;
	varietyPopMoveParas = [];
	var varietyPopMovePara = {};
	var len = varietyPop.length;

	for (var i = 0; i < len; i++) {
		varietyPopMovePara = {};
		if (i < 2) {
			up = 107;
		} else {
			up = i - 2;
		}
		if ((i + 2) < len) {
			down = i + 2;
		} else {
			if (i == 1 || i == 3 || i == 5 || i == 7) {
				if ((i + 1) < len) {
					down = i + 1;
				}
			} else {
				down = -1;
			}
		}

		if (i == 1 || i == 3 || i == 5 || i == 7 || i == 9) {
			right = -1;
		} else {
			if ((i + 1) < len) {
				right = i + 1;
			} else {
				right = -1;
			}
		}

		if (i == 0 || i == 2 || i == 4 || i == 6 || i == 8) {
			left = -1;
		} else {
			left = i - 1;
		}

		varietyPopMovePara.up = up;
		varietyPopMovePara.down = down;
		varietyPopMovePara.right = right;
		varietyPopMovePara.left = left;
		varietyPopMoveParas[i] = varietyPopMovePara;
	}
	area[108].paras = varietyPopMoveParas;
}

function replace(str, substr, newstr) {
	  var p = -1; // 字符出现位置
	  var s = 0; // 下一次起始位置

	  while((p = str.indexOf(substr, s)) > -1) {
	    s = p + newstr.length; // 位置 + 值的长度
	    str = str.replace(substr, newstr);
	  }

	  return str;
	}