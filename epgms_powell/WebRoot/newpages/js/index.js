$(document).ready(function () {
	var time=0;

    
    for(var i=0;i<$('.left_nav .fa').length;i++){
        $('.left_nav .fa').eq(i).parent().click(function () {
            if($(this).find('i').attr('class') == 'fa fa-angle-right'){
                $(this).find('i').attr('class','fa fa-angle-double-down');
            }else{
                $(this).find('i').attr('class','fa fa-angle-right');
            }
            $(this).parent().siblings().find('ul').hide(200,function () {
                $(this).prev().find('i.fa').attr('class','fa fa-angle-right');
            });
            $(this).next().toggle(200);
        });


        $('.con a').click(function () {
            $('.con a').removeClass('current');
            $(this).addClass('current');
            // getCon_height();
        })
    }



    var i=true;//定义全局变量i
    $(".more").click(function () {
        $('#search_hidden').toggle();
        if(i){//第一次点击，动画展开效果
            $('.data-search form').animate({
                height: "155px"
            }, 200);
        }else{//第二次点击，动画收缩效果
            $('.data-search form').animate({
                height: "62px"
            }, 200);
        }
        i=!i;//将全局变量i取反。
    });


    $('.select').click(function () {
        if(time%2 ==0){
            $(this).css({
                'overflow':'visible',
                // 'border':'1px solid #66AFE9'
                'z-index':'9999'
            })
            time++;
        }else{
            $(this).css({
                'overflow':'hidden',
                'z-index':'1',
            })
            time++;
        }
    });

    $('.select:eq(7)').click(function () {
        $(this).find('.option').css({
            'top':'-143px'
        })
    })
    $('.select:eq(8)').click(function () {
        $(this).find('.option').css({
            'top':'-143px'
        })
    })

    $('.option').click(function () {
        $(this).parent().children().eq(0).html('<span>' + $(this).text() + '<i class="fa fa-caret-down"></i></span>');
        var len = $('.select').length;
        for(var i=0;i<len;i++){
            if($('.select:eq(i)').find('li:nth-child(1)').text() != '操作类型'){
                $('.popup').css({
                    'display':'block'
                })
                $('.popup_info').text($(this).text());
            }
        }
    })

    $('.cancelBtn').click(function () {
        $('.popup').css({
            'display':'none'
        })
    })


    $('.data *').not('ul.select').click(function () {
        // console.log('not select');
        // for(var i=0;i<$('.select').length;i++){
        //     if($('.select').eq(i).css('overflow')=='visible') {
        //         console.log('123');
        //         $('.select').eq(i).css({
        //             'overflow': 'hidden'
        //         });
        //     }
        // }
    });

    /*previewDel 点击删除预览图片*/
    $('.previewDel').click(function () {
        $('.preview').attr('src',' ');
    })


});

//控制左侧导航滚动条
    function getCon_height() {
        // var content_height = document.getElementsByTagName('content')[0].clientHeight;
        var content_height = $('content').height();
        // var scroll_bar = document.getElementsByClassName('scroll_bar')[0];
        var scroll_bar = $('.scroll_bar');
        console.log(content_height);
        console.log(scroll_bar.css());
        if(content_height > 625){
            // scroll_bar.style.display = 'block';
            // scroll_bar.style.height = 625-(content_height - 625)+'px';
        }else{
            // scroll_bar.style.display = 'none';
        }
    }






    // function getCon_height() {
    //     var content_height = document.getElementsByTagName('content')[0].clientHeight;
    //     var scroll_bar = document.getElementsByClassName('scroll_bar')[0];
    //     console.log(content_height);
    //     if(content_height > 625){
    //         scroll_bar.style.display = 'block';
    //         scroll_bar.style.height = 625-(content_height - 625)+'px';
    //     }else{
    //         scroll_bar.style.display = 'none';
    //     }
    // }
// };
// 
    // function active () {
    //     var div =document.getElementsByClassName("col-md-1")[0];
    //     console.log(div);
    //     var a = document.div.childNodes;
    //     console.log(a)
    // }
    // active();







    // var leftNav = document.getElementsByClassName('left_nav')[0];
    // var height = leftNav.offsetHeight;
    // console.log(height);



    // var con = document.getElementsByClassName('con');
    // for(var i=0;i<con.length;i++){
    //     if(con[i].getElementsByTagName('ul')){
    //         var con_sub = con[i].getElementsByClassName('con_sub')[0].innerHTML;
    //         var ele_i = document.createElement('i');
    //         ele_i.setAttribute('class','fa fa-angle-right');
    //         con_sub.insertBefore(ele_i,con_sub.childNodes[0]);
    //     }
    // }
    //
    // function closeMenu_icon() {
    //     var ele_i = document.createElement('i');
    //     ele_i.setAttribute('class','fa fa-angle-right');
    // }
    // function openMenu_icon() {
    //     var ele_i = document.createElement('i');
    //     ele_i.setAttribute('class','fa fa-angle-double-down');
    // }

    // function addClass(obj,cls) {
    //     var obj_class = obj.className;
    //     var blank = (obj_class != '') ? " ":"";
    //     added = obj_class + blank + cls;
    //     obj.className = added;
    // }
    // function removeClass(obj, cls){
    //     var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
    //     obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
    //         removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    //     removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    //     obj.className = removed;//替换原来的 class.
    // }


//中间部分选中的方法


