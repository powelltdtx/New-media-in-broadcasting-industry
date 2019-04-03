$(document).ready(function () {
    var rowNum=0;
    var time=0;
    var tab1_1_all = $('.tab1_1 tr').slice(0,18);
    var tab1_2_all = $('.tab1_2 tr').slice(0,18);
    var tab1_3_all = $('.tab1_3 tr').slice(0,18);
    var tab1_4_all = $('.tab1_4 tr').slice(0,18);
    var tab1_5_lef = $('.tab1_5 tr').slice(0,6);
    var tab1_5_mid = $('.tab1_5 tr').slice(6,12);
    var tab1_5_rig = $('.tab1_5 tr').slice(12,18);
    var tab1_6_lef = $('.tab1_6 tr').slice(0,6);
    var tab1_6_mid = $('.tab1_6 tr').slice(6,12);
    var tab1_6_rig = $('.tab1_6 tr').slice(12,18);
    var tab1_7_lef = $('.tab1_7 tr').slice(0,6);
    var tab1_7_mid = $('.tab1_7 tr').slice(6,12);
    var tab1_7_rig = $('.tab1_7 tr').slice(12,18);
    var tab1_8_lef = $('.tab1_8 tr').slice(0,6);
    var tab1_8_mid = $('.tab1_8 tr').slice(6,12);
    var tab1_8_rig = $('.tab1_8 tr').slice(12,18);
    var tab1_9_lef = $('.tab1_9 tr').slice(0,6);
    var tab1_9_mid = $('.tab1_9 tr').slice(6,12);
    var tab1_9_rig = $('.tab1_9 tr').slice(12,18);
    function fade() {
        $('.tab2_1').parent().parent().parent().removeClass('in');
    }
    function fadeIn() {
        $('.tab2_1').parent().parent().parent().addClass('in');
    }


    tab1_1();
    $('.edit').click(function () {
        // $('.popup').css({
        //     'display':'block'
        // })
        $('.dataSY').css({
            'display':'block'
        })
    })

    $('.tab1 li').click(function () {
        var rz=$(this).index();
        if(rz==0){
            tab1_1();
        }else if(rz==1){
            tab1_2();
        }else if(rz==2){
            tab1_3();
        }else if(rz==3){
            tab1_4();
        }else if(rz==4){
            tab1_5();
        }else if(rz==5){
            tab1_6();
        }else if(rz==6){
            tab1_7();
        }else if(rz==7){
            tab1_8();
        }else{
            tab1_9();
        }
    })

    function tab1_1() {
        //tab1_1切换
        $('.tab1_1 tr').slice(6,12).css({
            'display':'none'
        })
        $('.tab1_1 tr').slice(12,18).css({
            'display':'none'
        })
        var con ='';
        var conTr ='';
        for(var i=6;i<12;i++){
            con ='<tr>'+ $($('.tab1_1 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        $('.tab2_1').html(conTr);
        // $('.tab2_1').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab2_1').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })
        var con ='';
        var conTr ='';
        for(var i=12;i<18;i++){
            con ='<tr>'+ $($('.tab1 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        $('.tab3_1').html(conTr);
        // $('.tab3_1').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab3_1').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })

    }
    function tab1_2() {
        // tab1_2切换
        $('.tab1_2 tr').slice(6,12).css({
            'display':'none'
        })
        $('.tab1_2 tr').slice(12,18).css({
            'display':'none'
        })
        var con ='';
        var conTr ='';
        for(var i=6;i<12;i++){
            con ='<tr>'+ $($('.tab1_2 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        // alert(conTr);
        $('.tab2_1').html(conTr);
        // $('.tab2_2').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab2_2').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })
        var con ='';
        var conTr ='';
        for(var i=12;i<18;i++){
            con ='<tr>'+ $($('.tab1_2 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        $('.tab3_1').html(conTr);
        // $('.tab2_2').html(conTr);
        // $('.tab3_2').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab3_2').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })
    }
    function tab1_3() {
        // tab1_3切换
        $('.tab1_3 tr').slice(6,12).css({
            'display':'none'
        })
        $('.tab1_3 tr').slice(12,18).css({
            'display':'none'
        })
        var con ='';
        var conTr ='';
        for(var i=6;i<12;i++){
            con ='<tr>'+ $($('.tab1_3 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        $('.tab2_1').html(conTr);
        // $('.tab2_3').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab2_3').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })
        var con ='';
        var conTr ='';
        for(var i=12;i<18;i++){
            con ='<tr>'+ $($('.tab1_3 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        $('.tab3_1').html(conTr);
        // $('.tab3_3').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab3_3').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })

    }
    function tab1_4() {
        // tab1_4切换
        $('.tab1_4').html(tab1_4_all);
        $('.tab1_4 tr').slice(6,12).css({
            'display':'none'
        })
        $('.tab1_4 tr').slice(12,18).css({
            'display':'none'
        })
        var con ='';
        var conTr ='';
        for(var i=6;i<12;i++){
            con ='<tr>'+ $($('.tab1_4 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        $('.tab2_1').html(conTr);
        // $('.tab2_4').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab2_4').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })
        var con ='';
        var conTr ='';
        for(var i=12;i<18;i++){
            con ='<tr>'+ $($('.tab1_4 tr')[i]).html() +'</tr>';
            conTr += con;
        }
        $('.tab3_1').html(conTr);
        // $('.tab3_4').parent().parent().parent().siblings().css({
        //     'display':'none',
        //     'opacity':'0'
        // })
        // $('.tab3_4').parent().parent().parent().css({
        //     'display':'block',
        //     'opacity':'1'
        // })
    }
    function tab1_5() {
        // tab1_5切换
        // alert('tab1_5 0');
        // $('.tab1_4').html(tab1_4_all);
        // alert('tab1_5 1');
        // console.log(tab1_4_all);
        // var tab1_5 = $('.tab1_5 tr').slice(0,6);
        // $('.tab1_5 tr').slice(6,12).css({
        //     'display':'none'
        // })
        // $('.tab1_5 tr').slice(12,18).css({
        //     'display':'none'
        // })
        // var con ='';
        // var conTr ='';
        // for(var i=6;i<12;i++){
        //     con ='<tr>'+ $($('.tab1_5 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab2_1').parent().parent().parent().attr('style','');

        // $('.tab3_1').removeClass('in');
        $('.tab2_1').html(tab1_5_mid);
        // tab1_5_mid.css({
        //     'display':'block'
        // })
        // var con ='';
        // var conTr ='';
        // for(var i=12;i<18;i++){
        //     con ='<tr>'+ $($('.tab1_5 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab3_1').html(tab1_5_rig);

        $('.tab1_4').html(tab1_5_lef);
        // $('.tab3_1').addClass('in');

    }
    function tab1_6() {
        // tab1_6切换
        // $('.tab1_4').html(tab1_4_all);
        // var tab1_6 = $('.tab1_6 tr').slice(0,6);
        // $('.tab1_6 tr').slice(6,12).css({
        //     'display':'none'
        // })
        // $('.tab1_6 tr').slice(12,18).css({
        //     'display':'none'
        // })
        // var con ='';
        // var conTr ='';
        // for(var i=6;i<12;i++){
        //     con ='<tr>'+ $($('.tab1_6 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab2_1').html(tab1_6_mid);
        // var con ='';
        // var conTr ='';
        // for(var i=12;i<18;i++){
        //     con ='<tr>'+ $($('.tab1_6 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab3_1').html(tab1_6_rig);
        $('.tab1_4').html(tab1_6_lef);
    }
    function tab1_7() {
        // tab1_7切换
        // $('.tab1_4').html(tab1_4_all);
        // var tab1_7 = $('.tab1_7 tr').slice(0,6);
        // $('.tab1_7 tr').slice(6,12).css({
        //     'display':'none'
        // })
        // $('.tab1_7 tr').slice(12,18).css({
        //     'display':'none'
        // })
        // var con ='';
        // var conTr ='';
        // for(var i=6;i<12;i++){
        //     con ='<tr>'+ $($('.tab1_7 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab2_1').html(tab1_7_mid);
        // var con ='';
        // var conTr ='';
        // for(var i=12;i<18;i++){
        //     con ='<tr>'+ $($('.tab1_7 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab3_1').html(tab1_7_rig);
        $('.tab1_4').html(tab1_7_lef);
    }
    function tab1_8() {
        // tab1_8切换
        // $('.tab1_4').html(tab1_4_all);
        // var tab1_8 = $('.tab1_8 tr').slice(0,6);
        // $('.tab1_8 tr').slice(6,12).css({
        //     'display':'none'
        // })
        // $('.tab1_8 tr').slice(12,18).css({
        //     'display':'none'
        // })
        // var con ='';
        // var conTr ='';
        // for(var i=6;i<12;i++){
        //     con ='<tr>'+ $($('.tab1_8 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab2_1').html(tab1_8_mid);
        // var con ='';
        // var conTr ='';
        // for(var i=12;i<18;i++){
        //     con ='<tr>'+ $($('.tab1_8 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab3_1').html(tab1_8_rig);
        $('.tab1_4').html(tab1_8_lef);
    }
    function tab1_9() {
        // tab1_9切换
        // $('.tab1_4').html(tab1_4_all);
        // var tab1_9 = $('.tab1_9 tr').slice(0,6);
        // $('.tab1_9 tr').slice(6,12).css({
        //     'display':'none'
        // })
        // $('.tab1_9 tr').slice(12,18).css({
        //     'display':'none'
        // })
        // var con ='';
        // var conTr ='';
        // for(var i=6;i<12;i++){
        //     con ='<tr>'+ $($('.tab1_9 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab2_1').html(tab1_9_mid);
        // var con ='';
        // var conTr ='';
        // for(var i=12;i<18;i++){
        //     con ='<tr>'+ $($('.tab1_9 tr')[i]).html() +'</tr>';
        //     conTr += con;
        // }
        $('.tab3_1').html(tab1_9_rig);
        $('.tab1_4').html(tab1_9_lef);
    }




    $('.addBtn').click(function () {
        $('.rateControl .table tbody').html($('.rateControl .table tbody').html() +
            '<tr><td>' + (++rowNum) + '</td>' +
            '<td><input type="text"></td>' +
            '<td><input type="text"></td>' +
            '<td><input type="text"></td>' +
            '<td><span class="fa fa-times-circle-o" id="del2"></span></td></tr>'
        )
    })
    $('#del2').click(function () {
        // alert('999');
        console.log($(this).parent().parent());
    })
//    点击无效 待解决
//     $('.dataSY_edit li').has('role','presentation')
    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    //malvInput
    $('.malvInput').focus(function () {
        $('.malvSec').css({
            'display':'block'
        })
        // //区域外点击 使得div消失
        // var malvSec = document.getElementsByClassName('malvSec')[0];
        // document.body.onclick = function(e){
        //     e = e || window.event;
        //     var target = e.target || e.srcElement;
        //     if(target != malvSec){
        //         malvSec.style.display = 'none';
        //     }
        // }
        // $('body').click(function () {
        //     $('.malvSec').css({
        //         'display':'none'
        //     });
        //     $('.malvSec').click(function () {
        //         $(this).css({
        //             'display':'block'
        //         })
        //     })
        // })
    })
    $('.malvInput').mouseover(function () {
            // $('.malvSec').css({
            //     'display':'block'
            // })
    })
    $('.blank').click(function () {
        $('.malvSec').css({
            'display':'none'
        })
        //字符串拼接
        // // if($('.sel')){
        //     if($('.sel').length>1){
        //         var info = $('.sel').text();
        //         info.slice('')
        //     }else{
        //         $('.malvInput').val($('.sel').text());
        //     }
        // }
    })
    $('.malv_none').click(function () {
        $('.malvSec').css({
            'display':'none'
        })
        $('.malvInput').val('无');
    })
    $('.malvSec').blur(function () {
        $(this).css({
            'display':'none'
        })
    })
    $('.malvMul').click(function () {
        if(time==0){
            $(this).css({
                'background':'#098FFF'
            });
            $(this).addClass('sel');
            time++;
        }else{
            $(this).css({
                'background':'#ffffff'
            });
            $(this).removeClass('sel');
            time--;
        }
        $('.malvInput').val($('.sel').text());
    })

    // var malvSec = $(".malvSec");
    // $(function() {
    //     $(".malvInput").click(function(event) {
    //         // showDiv();//调用显示DIV方法
    //         $(myDiv).toggle();
    //         $(document).one("click",
    //             function() { //对document绑定一个影藏Div方法
    //                 $(myDiv).hide();
    //             });
    //
    //         event.stopPropagation(); //阻止事件向上冒泡
    //     });
    //     $(malvSec).click(function(event) {
    //
    //         event.stopPropagation(); //阻止事件向上冒泡
    //     });
    // });
    // function showDiv() {
    //     $(malvSec).fadeIn();
    // }


    console.log($('.sel').text())
    // $('malvInput').val($('.sel').text());
    // $('.sel').html()
    // var info='';
    // for(var i=0;i< $('.sel').length;i++){
    //     con = $('.sel').eq(i).text() +' ';
    //     info+=con;
    //     console.log(info);
    // }

    /*双击可编辑tab区，blur自动保存,已有input双击其他区域切换input,已有input单击其他区域去掉input*/
    $(document).on('dblclick','.tabx_1 tr td',function () {
        // alert('dbclick');
        // alert($(this).text());
        // alert($('.inpEdit').length);
        if($('.inpEdit').length == 0){
            var info = $(this).text();
            $(this).text('');
            $(this).append('<input type="text" class="inpEdit"/>');
            $(this).find('.inpEdit').attr('value',info);
            $('.inpEdit').focus();
        }
        if($('.inpEdit').length == 1){
            removeInp();
            var info = $(this).text();
            $(this).text('');
            $(this).append('<input type="text" class="inpEdit"/>');
            $(this).find('.inpEdit').attr('value',info);
            $('.inpEdit').focus();
        }
    })

    // $(document).on('click','.tabx_1 tr td',function (e) {
    //     if($('.inpEdit').length != 0){
    //         removeInp();
    //     }
    // })

    $(document).on('click','.tabx_1 tr td',function (e) {
        if($('.inpEdit').length != 0){
            var inpInfo = $('.inpEdit').val();
            $('.inpEdit').parent().text(inpInfo);
        }
    })
    // $('.tabx_1 tr td').click(function (e) {
    //     if($('.inpEdit').length != 0){
    //         var inpInfo = $('.inpEdit').val();
    //         $('.inpEdit').parent().text(inpInfo);
    //     }
    // })
    $(document).on('click','.inpEdit',function () {
        // alert('552');
        e.stopPropagation();
    })
    // $('.inpEdit').on('click',function(e){
    //     alert('552');
    //     e.stopPropagation();
    // });

    $(document).on('blur','.inpEdit',function () {
        removeInp();
    })

    function removeInp() {
        var inpInfo = $('.inpEdit').val();
        $('.inpEdit').parent().text(inpInfo);
    }



})


