var box,etemp;
var count = 0;
var piccount = 0;
var p=0.46;
var hh=0.625;
var y=1.6;

function gg(e){  
	e.preventDefault();  
	var img=document.getElementById(e.dataTransfer.getData("imgID"));
	img.style.display="block";
	if (count == 0) {	
			e.target.appendChild(img); 
			etemp = e;
	} else {
			etemp.target.appendChild(img);
	}
	count = count + 1;
}  
//获取图片路径
function getImgURL(node) {
	var imgURL = "";
	try {
		var file = null;
		if(node.files && node.files[0]) {
			file = node.files[0];
		} else if(node.files && node.files.item(0)) {
			file = node.files.item(0);
		}
		//Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
		try {
			//Firefox7.0
			imgURL = file.getAsDataURL();
		} catch(e) {
			//Firefox8.0以上
			imgRUL = window.URL.createObjectURL(file);
		}
	} catch(e) {
		//支持html5的浏览器,比如高版本的firefox、chrome、ie10
		if(node.files && node.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				imgURL = e.target.result;
			};
			reader.readAsDataURL(node.files[0]);
		}
	}
	createpic(piccount,imgRUL);
	dws(piccount, imgRUL);
	piccount = piccount + 1;
	return imgURL;
}
// 创建图片
function createpic(piccount,imgRUL){
	
	var img = document.createElement('img');
	img.setAttribute('id','img'+piccount);
	img.style.width="237px";
	img.style.height="94px";
    img.style.display="block";
	img.src=imgRUL;
	img.onclick=function(){
		showParam('img'+piccount);
		var that=this;
		var clearId=that.id;
		//重置按钮
		$("#clearBtn").click(function(){
             inpntNull()
		   sessionStorage.removeItem(clearId);
		})
	}
	var tr="<tr>";
//	    tr+="<td><a href='javascrip:;' class='get' style='margin-left:105px;margin-top:45px;'>删除</a></td>";
//      tr+="<td><a href='javascrip:;' class='get' style='margin-left:185px;margin-top:40px;'><img src='img/shanchu.png'/></a></td>";
        tr+="<td><a href='javascrip:;' class='get' style='margin-left:185px;padding:40px auto;'><img src='img/shanchu.png'/></a></td>";
	    tr+="</tr>";
		    $("#text").append(tr);
//          var html="<img src='img/shanchu.png'/>";
//         $("#text").html(html);
		    
		    
	var father = document.getElementById('pic');
    father.appendChild(img);
	return img;
}
// 拖拽部分操作
var td;
function dws(piccount, imgSrc) {
	var img = document.getElementById("img" + piccount);
    img.ondragstart=function(e) {
		var result=[];
        var inputArr=document.getElementsByTagName("input");
	    for (var i=0;i<inputArr.length;i++) {
			result.push(inputArr[i].value)
		}
//	    console.log(result);
        var width=result[1]*p;
        var height=result[2]*hh;
        var left=result[3]*p;
        var top=result[4]*p;
        var deg=result[5];
        var zindex=result[6];
        var url=result[7];
        var img1;
        if (document.getElementById('img'+piccount+'_1') == null) {
        	img1 = document.createElement('img');
        	img1.setAttribute('id','img'+piccount+'_1');
        	img1.setAttribute('src',imgSrc);
        	img1.setAttribute('date-url',url);
        } else {
        	img1 = document.getElementById('img'+piccount+'_1');
        }     
        img1.style.width=width+"px";
    	img1.style.height=height+"px";
    	img1.style.left=left+"px";
    	img1.style.top=top+"px";
    	img1.style.position="absolute";
    	img1.style.transform="rotate("+deg+"deg)";
    	img1.style.zIndex=zindex;
		img1.style.display="none";
		//地址跳转
//		img1.onclick=function(){
//			if(url!=""){
//				window.location=url;
//			}
//		}
		td=img1;
		var before = document.getElementById('pic');
		before.appendChild(img1);
        e.dataTransfer.setData("imgID",'img'+piccount+'_1');
        var clearId=img1.id;
        //数据存储
        var imgNum=width+','+height+','+left+','+top+','+deg+','+zindex+','+url;
        sessionStorage.setItem('img'+piccount,imgNum);
    }
	box=document.getElementById("box"); 
	box.ondragover=function(e){
        e.preventDefault();
    }  
    box.ondrop=gg;	
}
//展示参数
function showParam(id){
	 var date=sessionStorage.getItem(id);
	 if(date==null){
//	 	 return;
	 }else{
	 	var picNum=date.split(",");
           var w=picNum[0]*y;
           var h=picNum[1]*y;
           var l=picNum[2]*y;
           var t=picNum[3]*y;
           var d=picNum[4]*y;
           var z=picNum[5]*y;
           var u=picNum[6]*y;
	 }
      $(".w").val(w); 
      $(".h").val(h);
      $(".l").val(l); 
      $(".t").val(t);
      $(".d").val(d); 
      $(".z").val(z);
      $(".u").val(u); 
}
//f5 || 刷新清除sessionStorage
init();
function init(){
    sessionStorage.clear(); 
}
//刷新按钮
   $(function(){
 	$("#sx").click(function(){
 		if(confirm("确定刷新吗？")){
 			var picImg=$('.pic img,.box img,.text img').remove();
 			inpntNull();
 			init();
 		}
 	})
   })
//删除图片
$(document).on('click','.get',function () {
	var index = $('.get').index(this);
    var DelPicSrc = $('#pic img')[index].src;
    $('#pic img')[index].remove();
    $(this).parent().parent().remove();
  //拖拽区域图片删除
    if($('#box img').src != ''){
        var appendPicSrc = $('#box img').eq(index).attr('src');
        if(DelPicSrc == appendPicSrc){
            $('#box img').eq(index).remove();
        }
    }
//	   var dragPicId=td.id;
//	   sessionStorage.removeItem(dragPicId);
	   inpntNull();
})
//清空input输入框	
function inpntNull(){
	$(".w").val(""); 
    $(".h").val("");
	$(".l").val(""); 
	$(".t").val("");
    $(".d").val(""); 
    $(".z").val("");
    $(".u").val(""); 
}
