    var i=0,initial_flat =false;
    if (storageAvailable('sessionStorage')) {
        // Yippee! We can use sessionStorage awesomeness
        // alert('You Browser is available!');
    }
    else {
        // Too bad, no sessionStorage for us
        alert('You Browser is not available!');
    }

    $('.saveBtn').click(function () {
    	
        var mainHtml = $('.main').html();
        if(mainHtml == ''){
            alert('请向左侧区域创建或拉取新图片！');
            return false;
        }
        populateStorage();
    });
    /*点击删除 删除当前元素*/
    $(document).on('click','.delBtn',function () {
        var index = $(this).parent().attr('id').split('_')[1];
        if($(this).parent().parent().hasClass('textList')){
            $('.newText_'+index).remove();
        }
        if($(this).parent().parent().hasClass('imgList')){
            $('#img'+ index + '_1').remove();
        }
        /*清空upload值 防止无法重复打开同一图片*/
        $(this).parent().remove();
        var upload = $(".upload");
        upload.after(upload.clone().val(""));
        upload.remove();
    });

    /*main区拖动生成div 放置文字*/
    var isDown = false; //鼠标是否按下 默认否
    var flag = false;
    var imgNum = 0;
    var textNum = 0;
    var mousedown_x,mousedown_y,mouseup_x,mouseup_y,mousePos,textToggle;
    var main_width = $('.main').width();
    var main_height = $('.main').height();
    if(isDown && mouseup_x < main_width && mouseup_y < main_height){ document.onmousemove();}
    $(document).on('mousedown','.main',function (ev) {
        isDown = true;
        mousePos = mousePosition(ev);
        mousedown_x = mousePos.x;
        mousedown_y = mousePos.y;
    });
    $(document).on('mouseup','.main',function (ev) {
        isDown = false;
        mousePos = mousePosition(ev);
        mouseup_x = mousePos.x;
        mouseup_y = mousePos.y;
        var newText = '<div class="program newText newText_'+ textNum +'"><span title=""></span></div>';
        var newText_width = Math.abs(mouseup_x - mousedown_x);
        var newText_height = Math.abs(mouseup_y - mousedown_y);
        if(newText_width < 10 || newText_height < 10){return false;}
        $(this).append(newText);
        var posLeft,posTop;
        mouseup_x > mousedown_x ? posLeft = mousedown_x : posLeft = mouseup_x;
        mouseup_y > mousedown_y ? posTop = mousedown_y : posTop = mouseup_y;
        $(this).find('div:last').css({
            'width':newText_width,
            'height':newText_height,
            'left':posLeft,
            'top':posTop
        });
        var textID = 'text_' + textNum;
        $('.textList').append('<div id=\"' + textID + '\" class="newImg"><div class="textZone">区域'+ (textNum+1) +'</div><button class="btn btn-default delBtn">删除</button></div>');
        textNum ++;
        /*默认选中第一个newImg*/
        // if($('.newImg').length === 1){
        //     $('.newImg').addClass('cur');
        // }
    });
    /*点击.main拉选区域 变更选中元素 更新输入框数据*/
    $(document).on('click','.newText',function (e) {
        e.stopPropagation();
        var index = $(this).attr('class').split('_')[1];
        // console.log($(this).css('transform'));
        if($(this).css('transform') == 'none'){
            $(this).css('transform','matrix(1, 0, 0, 1, 0, 0)');
        }
        var par_a = $(this).css('transform').split('(')[1].split(',',2)[0];
        var par_b = $(this).css('transform').split('(')[1].split(',',2)[1];
        if(Math.abs(par_a) < 0.01){ par_a = 0};
        if(Math.abs(par_b) < 0.01){ par_b = 0};
        $('.editPart .grape').addClass('see');
        $('.newText').removeClass('sel');
        $(this).addClass('sel');
        $('.operateShow *').removeClass('cur');
        console.log($('#text_' + index));
        console.log('#text_' + index);
        $('#text_' + index).addClass('cur');
        $('.e_width').val(Math.round(parseFloat($(this).css('width'))/.66));
        $('.e_height').val(Math.round(parseFloat($(this).css('height'))/.66));
        $('.e_left').val(Math.round(parseFloat($(this).css('left'))/.66));
        $('.e_top').val(Math.round(parseFloat($(this).css('top'))/.66));
        $('.e_deg').val(shiftAngel(par_a,par_b));
        $('.e_zIndex').val($(this).css('zIndex'));
        $('.e_url').val(sessionStorage.getItem('text_' + index + '_url'));
        $('.e_grape').val(sessionStorage.getItem('text_' + index + '_grape'));
        $('.e_flat').val(sessionStorage.getItem('text_' + index + '_flat'));
        populateStorage('text_'+index);
    });

    /*点击.main区图片 变更选中元素 更新输入框数据*/
    $(document).on('click','.main>img',function (e) {
        e.stopPropagation();
        var index = $(this).attr('id').substr(3,1);
        // console.log($(this).css('transform'));
        if($(this).css('transform') == 'none'){
            $(this).css('transform','matrix(1, 0, 0, 1, 0, 0)');
        }
        var par_a = $(this).css('transform').split('(')[1].split(',',2)[0];
        var par_b = $(this).css('transform').split('(')[1].split(',',2)[1];
        if(Math.abs(par_a) < 0.01){ par_a = 0};
        if(Math.abs(par_b) < 0.01){ par_b = 0};
        // console.log(shiftAngel(par_a,par_b));
        $('.editPart .grape').removeClass('see');
        $('.newText').removeClass('sel');
        $('.operateShow *').removeClass('cur');
        $('#img_' + index).addClass('cur');
        $('.e_width').val(Math.round(parseFloat($(this).css('width'))/.66));
        $('.e_height').val(Math.round(parseFloat($(this).css('height'))/.66));
        $('.e_left').val(Math.round(parseFloat($(this).css('left'))/.66));
        $('.e_top').val(Math.round(parseFloat($(this).css('top'))/.66));
        $('.e_deg').val(shiftAngel(par_a,par_b));
        $('.e_zIndex').val($(this).css('zIndex'));
        $('.e_url').val($(this).attr('title'));
        populateStorage('img_'+index);
    });

    /*点击operateShow newImg变更选中元素 更新输入框数据 */
    $(document).on('click','.newImg',function () {
        $('.editPart .grape').removeClass('see');
        $('.newImg').removeClass('cur');
        $(this).addClass('cur');
        var index = $(this).attr('id').split('_')[1];
        if($(this).parent().hasClass('imgList')){
            $('.imgJump').css({
                'display':'inline-block'
            });
            $('.newText').removeClass('sel');
            if(sessionStorage.getItem('img_'+ index + '_width') && sessionStorage.getItem('img_'+ index + '_height')){
                /*已定义值则显示定义的值*/
                $('.e_width').val(sessionStorage.getItem('img_'+ index + '_width'));
                $('.e_height').val(sessionStorage.getItem('img_'+ index + '_height'));
                $('.e_left').val(sessionStorage.getItem('img_'+ index + '_left'));
                $('.e_top').val(sessionStorage.getItem('img_'+ index + '_top'));
                $('.e_deg').val(sessionStorage.getItem('img_'+ index + '_deg'));
                $('.e_zIndex').val(sessionStorage.getItem('img_'+ index + '_zIndex'));
                $('.e_url').val(sessionStorage.getItem('img_'+ index + '_url'));
            }else{
                /*未定义值则获取并显示图片原始宽高*/
                var theImage = new Image();
                theImage.src = $(this).find('img').attr( "src");
                var naturalWidth =  theImage.width;
                var naturalHeight =  theImage.height;
                var cur_ID = $('.cur').attr('id');
                console.log(cur_ID);
//                populateStorage(cur_ID);
                $('.e_width').val(sessionStorage.setItem(cur_ID + '_width',naturalWidth));
                $('.e_height').val(sessionStorage.setItem(cur_ID + '_height',naturalHeight));
                $('.e_width').val(sessionStorage.getItem(cur_ID + '_width'));
                $('.e_height').val(sessionStorage.getItem(cur_ID + '_height'));
                console.log(sessionStorage.getItem(cur_ID + '_width'));
                console.log(sessionStorage.getItem('img_0' + '_width'));
                $('.e_left').val(sessionStorage.getItem('img_'+ index + '_left'));
                $('.e_top').val(sessionStorage.getItem('img_'+ index + '_top'));
                $('.e_deg').val(sessionStorage.getItem('img_'+ index + '_deg'));
                $('.e_zIndex').val(sessionStorage.getItem('img_'+ index + '_zIndex'));
                $('.e_url').val(sessionStorage.getItem('img_'+ index + '_url'));
            }
        }
        if($(this).parent().hasClass('textList')){
            $('.editPart .grape').addClass('see');
            $('.main *').removeClass('sel');
            $('.newText_' + index).addClass('sel');
            var cur_ID = $('.cur').attr('id');
            var index = cur_ID.split('_')[1];
            if($('.newText_' + index).css('transform') == 'none'){
                $('.newText_' + index).css('transform','matrix(1, 0, 0, 1, 0, 0)');
            }
            var par_a = $('.newText_' + index).css('transform').split('(')[1].split(',',2)[0];
            var par_b = $('.newText_' + index).css('transform').split('(')[1].split(',',2)[1];
            if(Math.abs(par_a) < 0.01){ par_a = 0};
            if(Math.abs(par_b) < 0.01){ par_b = 0};
            $('.e_width').val(Math.round(parseFloat($('.newText_'+ index).css('width'))/.66));
            $('.e_height').val(Math.round(parseFloat($('.newText_'+ index).css('height'))/.66));
            $('.e_left').val(Math.round(parseFloat($('.newText_'+ index).css('left'))/.66));
            $('.e_top').val(Math.round(parseFloat($('.newText_'+ index).css('top'))/.66));
            $('.e_deg').val(shiftAngel(par_a,par_b));
            $('.e_zIndex').val($('.newText_'+ index).css('zIndex'));
            $('.e_url').val(sessionStorage.getItem('text_' + index + '_url'));
            $('.e_grape').val(sessionStorage.getItem('text_' + index + '_grape'));
            $('.e_flat').val(sessionStorage.getItem('text_' + index + '_flat'));
            populateStorage(cur_ID);
        }
    });

    /*拖拽图片到main区*/
    $(document).on('dragstart','.imgList img',function () {
        // console.log($(this));
    });
    $(document).on('dragend','.imgList img',function (ev) {
        mousePos = mousePosition(ev);
        if(mousePos.x > $('.main').width() || mousePos.y > $('.main').height()){return false;}
        var index = $(this).parent().attr('id').split('_')[1];
        var src = $(this).attr('src');
        if($('.main').find('#img'+ index +'_1').length == 0){
            dragImg(index,src);
        }
        populateStorage(index);
    });
    /*输入框内容变化 自动更新数据和页面*/
    $(document).on('change','.editPart input,.editPart select',function(){
        var cur_ID = $('.cur').attr('id');
        var index = cur_ID.split('_')[1];
        if($('select.grape').val() =='圆形'){
            $('.flat').addClass('see');
            if($('.e_flat').val() == ''){
                $('.e_flat').val('1');
                initial_flat = true;
            }
            /*仅用于初始化e_flat*/
            if(parseFloat($('.e_width').val()) > 0 && parseFloat($('.e_height').val())> 0 && initial_flat){
                $('.e_flat').val(($('.e_width').val()/$('.e_height').val()).toFixed(2));
                initial_flat = false;
            }
            /*仅在e_flat改变时调用*/
            $('.e_flat').change(function () {
                $('.e_height').val(($('.e_width').val()/$('.e_flat').val()).toFixed(2));
            })
            /*仅在e_height改变时调用*/
            $('.e_height').change(function () {
                if($('.e_flat').hasClass('see')){
                    $('.e_flat').val(($('.e_width').val()/$('.e_height').val()).toFixed(2));
                }
            })
        }else{
            $('.flat').removeClass('see');
            $('.e_flat').val('');
        }
        populateStorage(cur_ID);
        var curWidth = sessionStorage.getItem(cur_ID + '_width');
        var curHeight = sessionStorage.getItem(cur_ID + '_height');
        var curLeft = sessionStorage.getItem(cur_ID + '_left');
        var curTop = sessionStorage.getItem(cur_ID + '_top');
        var curDeg = sessionStorage.getItem(cur_ID + '_deg');
        var curzIndex = sessionStorage.getItem(cur_ID + '_zIndex');
        var curUrl = sessionStorage.getItem(cur_ID + '_url');
        var curGrape = sessionStorage.getItem(cur_ID + '_grape');
        var curFlat = sessionStorage.getItem(cur_ID + '_flat');
        curUrl = $("#urlPath").val();
        console.log(curUrl == '');
        if($('#' + cur_ID).parent().hasClass('textList')){
            $('.newText_' + index).css({
                'width':curWidth*.66,
                'height':curHeight*.66,
                'left':curLeft*.66,
                'top':curTop*.66,
                'transform':'rotate('+ curDeg +'deg)',
                'zIndex':curzIndex
            });
            if(curUrl){
                $('.newText_' + index).find('a').attr('href',curUrl);
            }else{
                $('.newText_' + index).find('a').attr('href','javascript:void(0);')
            }
            if(!curFlat){
                $('.newText_' + index).css('border-radius','0');
            }else{
                $('.newText_' + index).css('border-radius','50%');
                if(!$('.e_flat').val()){
                    alert('564');
                    $('.newText_' + index).css('height',parseInt(curWidth)*.66/(parseFloat(curFlat)));
                    populateStorage(cur_ID);
                }
            }
        }
        if($('#' + cur_ID).parent().hasClass('imgList')){
            $('#img' + index + '_1').css({
                'width':curWidth*.66,
                'height':curHeight*.66,
                'left':curLeft*.66,
                'top':curTop*.66,
                'transform':'rotate('+ curDeg +'deg)',
                'zIndex':curzIndex
            });
            if(curUrl){
            	//alert("addclass")
                $('#img'+ index + '_1').attr('title',curUrl);
                $('#img'+ index + '_1').addClass('program');
                
            }else{
            	//alert("removeProma--index");
                $('#img'+ index + '_1').attr('title','');
                $('#img'+ index + '_1').removeClass('program');
              // alert(index);
              // alert($('#img'+ index + '_1').attr('class'));
              // var clazz = document.getElementById('img'+ index + '_1').getAttribute("class");
              // alert(clazz);
            }
            //alert($('#img'+ index + '_1').attr('title'));
        }
    });
    function shiftAngel(a,b) {
        var A = Math.round(180/Math.PI*Math.acos(a));
        var B = Math.round(180/Math.PI*Math.asin(b));
        // console.log(A);
        // console.log(B);
        if(A >= 0 && A < 90 && B >=0 && B <= 90){
            //    角度在第一象限
            return A;
        }
        if(A >= 90 && A <180 && B >= 0 && B <= 90){
            //    角度在第二象限
            return A;
        }
        if( A > 90 && A <= 180 && B > -90 && B <= 0){
            //    角度在第三象限
            return 180 - B;
        }
        if( A > 0 && A <= 90 && B >= -90 && B < 0){
            //    角度在第四象限
            return 360 - A;
        }
    }
/*获取鼠标位于浏览器窗口的位置*/
function mousePosition(ev){
    if(ev.pageX || ev.pageY){
        return {x:ev.pageX, y:ev.pageY};
    }
    return {
        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y:ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}
function getImgUrl(node) {
   // var strCookie=document.cookie;
  //  var time =strCookie.toString();
    var imgURL = "";
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'updatePages/servlet/upload' );
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //发送请求
    xhr.send("num1="+i + "&time="+time);
    xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            i++
        }
    };
    try{
        var file = null;
        if(node.files && node.files[0] ){
            file = node.files[0];
        }else if(node.files && node.files.item(0)) {
            file = node.files.item(0);
        }
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
        try{
            //Firefox7.0
            imgURL =  file.getAsDataURL();
            //alert("//Firefox7.0"+imgRUL);
        }catch(e){
            //Firefox8.0以上
            imgRUL = window.URL.createObjectURL(file);
            //alert("//Firefox8.0以上"+imgRUL);
        }
    }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10
        if (node.files && node.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgURL = e.target.result;
            };
            reader.readAsDataURL(node.files[0]);
        }
    }
    //imgurl = imgURL;
    creatImg(imgRUL);
    return imgURL;
}
function creatImg(imgUrl) {
    var fileName = $('.upload')[0].files[0].name;
    var imgID = 'img_' + imgNum;
    var imgText = '<div id=\"'+ imgID + '\" class="newImg"><img draggable="true" src="'+ imgUrl +'"/><span>'+ fileName +'</span><button class="btn btn-default delBtn">删除</button></div>';
    imgNum ++;
    $('.imgList').append(imgText);
    /*默认选中第一个newImg program newText newText_5 sel*/
    // if($('.newImg').length === 1){
    //     $('.newImg').addClass('cur');
    // }
}
function dragImg(INDEX,SRC) {
    var imgID = 'img'+ INDEX + '_1';
    var imgText = '<img id="' + imgID + '"draggable="false" src="'+ SRC +'"/>';
    $('.main').append(imgText);
}
function setStyles(id) {
    var curWidth = sessionStorage.getItem(id + '_width');
    var curHeight = sessionStorage.getItem(id + '_height');
    var curLeft = sessionStorage.getItem(id + '_left');
    var curTop = sessionStorage.getItem(id + '_top');
    var curDeg = sessionStorage.getItem(id + '_deg');
    var curzIndex = sessionStorage.getItem(id + '_zIndex');
    /*设置main区背景大图尺寸*/
    $('#img'+ id + '_1').css({
        'width':curWidth*.66,
        'height':curHeight*.66,
        'left':curLeft*.66,
        'top':curTop*.66,
        'transform':'rotate('+ curDeg +'deg)',
        'zIndex':curzIndex
    });
    // console.log(curDeg);
}
function populateStorage(id) {
    sessionStorage.setItem(id + '_width',$('.e_width').val());
    sessionStorage.setItem(id + '_height',$('.e_height').val());
    sessionStorage.setItem(id + '_left',$('.e_left').val());
    sessionStorage.setItem(id + '_top',$('.e_top').val());
    sessionStorage.setItem(id + '_deg',$('.e_deg').val());
    sessionStorage.setItem(id + '_zIndex',$('.e_zIndex').val());
    sessionStorage.setItem(id + '_url',$('.e_url').val());
    sessionStorage.setItem(id + '_grape',$('.e_grape').val());
    sessionStorage.setItem(id + '_flat',$('.e_flat').val());
    console.log($('.e_grape').val());
    console.log($('.e_flat').val());
    setStyles(id);
}
// if(!localStorage.getItem('bgcolor')) {
//     populateStorage();
// } else {
//     setStyles();
// }
/*检测sessionStorage可用性*/
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}