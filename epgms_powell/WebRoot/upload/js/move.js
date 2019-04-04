var newztad = document.getElementsByClassName('program');
var dataUrl=[]
//广告位
// var newztParas = [
//     {up:-1,right:1,down:1,left:-1},
//     {up:0,right:2,down:2,left:0},
//     {up:1,right:3,down:3,left:1},
//     {up:2,right:4,down:4,left:2},
//     {up:3,right:5,down:5,left:3},
//     {up:4,right:-1,down:-1,left:4}
// ];

var area = {
    100:{
        ele:newztad,
        paras:newztParas,
        currentIndex:0,
        selStyle:'selStyle'
    },
    'current':100
};

var current = {};
var pageControl = {};

function fnSetCurrent(){
    var ca = area[area.current];
    current.area = ca;

    current.index = ca.currentIndex;
    current.ele = ca.ele[current.index];
}

function fnGetNextEleIndex(dir){
    return current.area.paras[current.index][dir];
}
// function marqueeText() {
//     if(!current.ele.getElementsByTagName('span')[0]) return;
//     var cur_span = current.ele.getElementsByTagName('span')[0];
//     var curWidth = window.getComputedStyle(current.ele,null).width;
//     var maxlen = Math.floor(parseFloat(curWidth)/20)*2;
//     var realLen = getStrLength(cur_span.innerText);
//     if(realLen > maxlen){
//         var marq = '<marquee scrollamount="4">' + cur_span.innerHTML + '</marquee>';
//         cur_span.innerHTML = marq;
//     }
// }
// function contentlistblur(){
//     if(current.ele.getElementsByTagName("marquee")[0]){
//         var name = current.ele.getElementsByTagName("marquee")[0].innerHTML;
//         current.ele.getElementsByTagName("span")[0].innerHTML = name;
//     }
// }

pageControl.moveLeft = function(){
	
    var nextEle = fnGetNextEleIndex('left');
    if(nextEle == -1){
        return false;
    }
    if(nextEle>=100){
        area.current = nextEle;
        nextEle = current.index;
    }
    fnRemoveEleClass(current.ele,current.area.selStyle);
    current.area.currentIndex = nextEle;
    fnSetCurrent();
    fnAddEleClass(current.ele,current.area.selStyle);
};

pageControl.moveRight = function(){
    var nextEle = fnGetNextEleIndex('right');
    if(nextEle == -1){
        return false;
    }
    if(nextEle>=100){
        area.current = nextEle;
        nextEle = current.index;
    }
    fnRemoveEleClass(current.ele,current.area.selStyle);
    current.area.currentIndex = nextEle;
    fnSetCurrent();
    fnAddEleClass(current.ele,current.area.selStyle);
};

pageControl.moveUp = function(){
    var nextEle = fnGetNextEleIndex('up');
    if(nextEle == -1){
        return false;
    }
    if(nextEle >= 100){
        area.current = nextEle;
        nextEle = current.index;
    }else{
        fnRemoveEleClass(current.ele,current.area.selStyle);
    }
    current.area.currentIndex = nextEle;
    fnSetCurrent();
    fnAddEleClass(current.ele,current.area.selStyle);
};

pageControl.moveDown = function(){
    var nextEle = fnGetNextEleIndex('down');
    console.log(nextEle);
    if(nextEle == -1){
        return false;
    }
    if(nextEle >= 100){
        area.current = nextEle;
        nextEle = current.index;
    }
    fnRemoveEleClass(current.ele,current.area.selStyle);
    current.area.currentIndex = nextEle;
    fnSetCurrent();
    fnAddEleClass(current.ele,current.area.selStyle);
};

pageControl.ok=function(){
    //
    // baseurl = '' + location;
    // baseurl = baseurl.substring(0, baseurl.indexOf('movieList.html'));
	// console.log(current.ele.className);
    if(area.current == 100){
        if(current.ele.className.split(' ')[1] == 'newText'){
			
            var targetEle = current.ele.children[0];
            var targetEle_url = targetEle.getAttribute("href");
            setpageurl(window.location);
        }else{
			
            var targetEle_url =current.ele.getAttribute('title');
            setpageurl(window.location);
        }
        window.location = targetEle_url;
    }
};

window.onload=function(){
    fnSetCurrent();
    // adinit();
    // contentjsonmerge(parent.columnjson);
    // columndata();
    // var areaFrom=fnGetQueryStringByName('area');
    // var indexFrom=fnGetQueryStringByName('index');
    // if(areaFrom!=''&&indexFrom!=''&&area[areaFrom].ele[indexFrom]){
    //     area.current=areaFrom;
    //     area[area.current].currentIndex=indexFrom;
    // }
    //找到获取焦点元素
    fnSetCurrent();
    //添加样式
    fnAddEleClass(current.ele,current.area.selStyle);
};

function columndata() {
    var contentlist = userContentJson.list;
    var len = contentlist.length;
    var index = area[100].currentIndex;
    var count = 10;

    var tagul = $("moveList").getElementsByTagName("ul");
    var fileurl = "";
    var charging = 0;
    var usecount = 0;
    for (var i = 0; i < (count + 5) && i < contentlist.length; i++) {
        if (i < count) {
            usecount = usecount + 1;
        }
        fileurl = contentlist[i].enterimg;
        var jumpurl = contentlist[i].description;
        huiztadParas[i].url = jumpurl;
        dataUrl[i]=jumpurl;
        tagul[0].innerHTML = tagul[0].innerHTML
            + '<li class="moveListLi program"><img src="'
            + fileurl + '"><p><span>'
            + contentlist[i].name + '</span></p></li>';
    }

    var pageid = $("page");
    cupage = 1;
    if (index == 0) {
        if (usecount > 5) {
            cupage = Math.ceil((usecount - 5) / 10) + 1;
        }
        if (userContentJson.count == 0) {
            totalpage = 0;
        } else {
            totalpage = Math.ceil((userContentJson.count - 5) / 10) + 1;
        }

    } else {
        cupage = Math.ceil(usecount / 10);
        if (userContentJson.count == 0) {
            totalpage = 0;
        } else {
            totalpage = Math.ceil(userContentJson.count / 10);
        }
    }

    pageid.innerHTML = "第" + 1 + "/" + totalpage + "页";

    setmoiveMoveParas();
    if (area.current == 100) {
        fnSetCurrent();
        fnAddEleClass(current.ele, current.area.selStyle);
        if (area.current == 100) {
            movielistfocus();
        }
    }
}

function pageToggle() {
    var pageid = $("page");
    var contentlist = userContentJson.list;
    var len = contentlist.length;
    var index = area[100].currentIndex;
    var count = 10;
    //  alert('contentlist='+contentlist);  //长度为十四的数组
    //  alert('len='+len);  //14
    //  alert('index='+index); //0

    var moveListRow = document.getElementById('moveListRow');
    var totalPage = Math.ceil(len/10);
    var curPage = 1;
    if(len>10){
        curPage = Math.ceil((index+1)/10);
    }
    if(index<10){
        moveListRow.style.top = 0+ 'px';
    }else{
        moveListRow.style.top = - 474*Math.floor((index+1)/10) + 'px';
    }

    pageid.innerHTML = "第" + curPage + "/" + totalPage + "页";
    setmoiveMoveParas();
}

var userContentJson;
var backflag =false;
var getpageid = 1;
function contentjsonmerge(json){
    if(backflag){
        backflag = false;
        userContentJson = json;
        return;
    }
    if(getpageid == 1){
        userContentJson = json;
        return;
    }
    var arrjson = json.list;
    var len = arrjson.length;
    var userarrjson = userContentJson.list;
    for(var i = 0; i < len; i++){
        userarrjson.push(arrjson[i]);
    }
    userContentJson.list = userarrjson;
}


function setmoiveMoveParas(){
    var moviePara = {};
    var up = -1;
    var right = -1;
    var down = -1;
    var left = -1;
    moveList = document.getElementsByClassName('moveListLi');
    moiveMoveParas = [];
    var count = moveList.length;
    for(var i = 0; i < count; i++){
        moviePara = {};
        if(i < 5 && getpageid == 1 && usecount == 5){
            up = -1;
        }else{
            if(i < 5){
                up = -1;
            }else{
                up = i - 5;
            }
        }

        if((i + 5) < count){
            down = i + 5;
        }else if(Math.ceil((i+1)/5)+1 == Math.ceil(count/5)){
            // down = (Math.ceil((i+1)/5))*5;
            down = count -1;
        }else{
            down = 101;
        }

        if(i == 0 || i%5 == 0){
            left = -1;
        }else{
            left = i - 1;
        }

        if(i == 4 || i == 9){
            right = -1;
        }else{
            if((i + 1) < count){
                right = i + 1;
            }else{
                right = -1;
            }

        }

        moviePara.up = up;
        moviePara.down = down;
        moviePara.left = left;
        moviePara.right = right;
        moiveMoveParas[i] = moviePara;
    }
    area[100].paras = moiveMoveParas;
    area[100].ele = moveList;
}
