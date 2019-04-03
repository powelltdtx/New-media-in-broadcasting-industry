var tab1_1_lef,tab1_1_mid,tab1_1_rig,tab1_2_lef,tab1_2_mid,tab1_2_rig,
    tab1_3_lef,tab1_3_mid,tab1_3_rig,tab1_4_lef,tab1_4_mid,tab1_4_rig,
    tab1_5_lef,tab1_5_mid,tab1_5_rig,tab1_6_lef,tab1_6_mid,tab1_6_rig,
    tab1_7_lef,tab1_7_mid,tab1_7_rig,tab1_8_lef,tab1_8_mid,tab1_8_rig,
    tab1_9_lef,tab1_9_mid,tab1_9_rig,tab1_10_lef,tab1_10_mid,tab1_10_rig;
if($('#GDTrial option:selected').val() == '0'){
    $('.GDFreeTrial').css({
        'display':'block'
    })
}else{
    $('.GDFreeTrial').css({
        'display':'none'
    })
}
$(document).ready(function () {
    checkVal();
    var rowNum=0;
    var time=0;
    tab1_1_slice();
    tab1_2_slice();
    tab1_3_slice();
    tab1_4_slice();
    tab1_5_slice();
    tab1_6_slice();
    tab1_7_slice();
    tab1_8_slice();
    tab1_9_slice();
    tab1_10_slice();
    // function updateData() {
    //     tab1_1_lef = $('.tab1_1 tr').slice(0,6);
    //     tab1_1_mid = $('.tab1_1 tr').slice(6,12);
    //     tab1_1_rig = $('.tab1_1 tr').slice(12,18);
    //     tab1_2_lef = $('.tab1_2 tr').slice(0,6);
    //     tab1_2_mid = $('.tab1_2 tr').slice(6,12);
    //     tab1_2_rig = $('.tab1_2 tr').slice(12,18);
    //     tab1_3_lef = $('.tab1_3 tr').slice(0,6);
    //     tab1_3_mid = $('.tab1_3 tr').slice(6,12);
    //     tab1_3_rig = $('.tab1_3 tr').slice(12,18);
    //     tab1_4_lef = $('.tab1_4 tr').slice(0,6);
    //     tab1_4_mid = $('.tab1_4 tr').slice(6,12);
    //     tab1_4_rig = $('.tab1_4 tr').slice(12,18);
    //     tab1_5_lef = $('.tab1_5 tr').slice(0,6);
    //     tab1_5_mid = $('.tab1_5 tr').slice(6,12);
    //     tab1_5_rig = $('.tab1_5 tr').slice(12,18);
    //     tab1_6_lef = $('.tab1_6 tr').slice(0,6);
    //     tab1_6_mid = $('.tab1_6 tr').slice(6,12);
    //     tab1_6_rig = $('.tab1_6 tr').slice(12,18);
    //     tab1_7_lef = $('.tab1_7 tr').slice(0,6);
    //     tab1_7_mid = $('.tab1_7 tr').slice(6,12);
    //     tab1_7_rig = $('.tab1_7 tr').slice(12,18);
    //     tab1_8_lef = $('.tab1_8 tr').slice(0,6);
    //     tab1_8_mid = $('.tab1_8 tr').slice(6,12);
    //     tab1_8_rig = $('.tab1_8 tr').slice(12,18);
    //     tab1_9_lef = $('.tab1_9 tr').slice(0,6);
    //     tab1_9_mid = $('.tab1_9 tr').slice(6,12);
    //     tab1_9_rig = $('.tab1_9 tr').slice(12,18);
    //     tab1_10_lef = $('.tab1_10 tr').slice(0,6);
    //     tab1_10_mid = $('.tab1_10 tr').slice(6,12);
    //     tab1_10_rig = $('.tab1_10 tr').slice(12,18);
    // }

    tab1_1();
    $('.edit').click(function () {
        // $('.dataSY').css({
        //     'display':'block'
        // })
        window.location.href = 'edit_cpsp.html';
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
        }else if(rz==8){
            tab1_9();
        }else{
            tab1_10();
        }
    })

    function tab1_1_slice() {
        var tab1_1_len = $('.tab1_1 tr').length;
        var len = (tab1_1_len)/3;
        if(tab1_1_len % 3 == 0){
            tab1_1_lef = $('.tab1_1 tr').slice(0,len); //0,6
            tab1_1_mid = $('.tab1_1 tr').slice(len,2*len); //6,12
            tab1_1_rig = $('.tab1_1 tr').slice(2*len,3*len); //12,18
        }else if(tab1_1_len % 3 == 1){
            tab1_1_lef = $('.tab1_1 tr').slice(0,Math.ceil(len)); //0,7
            tab1_1_mid = $('.tab1_1 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_1_rig = $('.tab1_1 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_1_lef = $('.tab1_1 tr').slice(0,Math.ceil(len));  //0,7
            tab1_1_mid = $('.tab1_1 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_1_rig = $('.tab1_1 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_2_slice() {
        var tab1_2_len = $('.tab1_2 tr').length;
        var len = (tab1_2_len)/3;
        if(tab1_2_len % 3 == 0){
            tab1_2_lef = $('.tab1_2 tr').slice(0,len); //0,6
            tab1_2_mid = $('.tab1_2 tr').slice(len,2*len); //6,12
            tab1_2_rig = $('.tab1_2 tr').slice(2*len,3*len); //12,18
        }else if(tab1_2_len % 3 == 1){
            tab1_2_lef = $('.tab1_2 tr').slice(0,Math.ceil(len)); //0,7
            tab1_2_mid = $('.tab1_2 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_2_rig = $('.tab1_2 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_2_lef = $('.tab1_2 tr').slice(0,Math.ceil(len));  //0,7
            tab1_2_mid = $('.tab1_2 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_2_rig = $('.tab1_2 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_3_slice() {
        var tab1_3_len = $('.tab1_3 tr').length;
        var len = (tab1_3_len)/3;
        if(tab1_3_len % 3 == 0){
            tab1_3_lef = $('.tab1_3 tr').slice(0,len); //0,6
            tab1_3_mid = $('.tab1_3 tr').slice(len,2*len); //6,12
            tab1_3_rig = $('.tab1_3 tr').slice(2*len,3*len); //12,18
        }else if(tab1_3_len % 3 == 1){
            tab1_3_lef = $('.tab1_3 tr').slice(0,Math.ceil(len)); //0,7
            tab1_3_mid = $('.tab1_3 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_3_rig = $('.tab1_3 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_3_lef = $('.tab1_3 tr').slice(0,Math.ceil(len));  //0,7
            tab1_3_mid = $('.tab1_3 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_3_rig = $('.tab1_3 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_4_slice() {
        var tab1_4_len = $('.tab1_4 tr').length;
        var len = (tab1_4_len)/3;
        if(tab1_4_len % 3 == 0){
            tab1_4_lef = $('.tab1_4 tr').slice(0,len); //0,6
            tab1_4_mid = $('.tab1_4 tr').slice(len,2*len); //6,12
            tab1_4_rig = $('.tab1_4 tr').slice(2*len,3*len); //12,18
        }else if(tab1_4_len % 3 == 1){
            tab1_4_lef = $('.tab1_4 tr').slice(0,Math.ceil(len)); //0,7
            tab1_4_mid = $('.tab1_4 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_4_rig = $('.tab1_4 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_4_lef = $('.tab1_4 tr').slice(0,Math.ceil(len));  //0,7
            tab1_4_mid = $('.tab1_4 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_4_rig = $('.tab1_4 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_5_slice() {
        var tab1_5_len = $('.tab1_5 tr').length;
        var len = (tab1_5_len)/3;
        if(tab1_5_len % 3 == 0){
            tab1_5_lef = $('.tab1_5 tr').slice(0,len); //0,6
            tab1_5_mid = $('.tab1_5 tr').slice(len,2*len); //6,12
            tab1_5_rig = $('.tab1_5 tr').slice(2*len,3*len); //12,18
        }else if(tab1_5_len % 3 == 1){
            tab1_5_lef = $('.tab1_5 tr').slice(0,Math.ceil(len)); //0,7
            tab1_5_mid = $('.tab1_5 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_5_rig = $('.tab1_5 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_5_lef = $('.tab1_5 tr').slice(0,Math.ceil(len));  //0,7
            tab1_5_mid = $('.tab1_5 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_5_rig = $('.tab1_5 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_6_slice() {
        var tab1_6_len = $('.tab1_6 tr').length;
        var len = (tab1_6_len)/3;
        if(tab1_6_len % 3 == 0){
            tab1_6_lef = $('.tab1_6 tr').slice(0,len); //0,6
            tab1_6_mid = $('.tab1_6 tr').slice(len,2*len); //6,12
            tab1_6_rig = $('.tab1_6 tr').slice(2*len,3*len); //12,18
        }else if(tab1_6_len % 3 == 1){
            tab1_6_lef = $('.tab1_6 tr').slice(0,Math.ceil(len)); //0,7
            tab1_6_mid = $('.tab1_6 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_6_rig = $('.tab1_6 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_6_lef = $('.tab1_6 tr').slice(0,Math.ceil(len));  //0,7
            tab1_6_mid = $('.tab1_6 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_6_rig = $('.tab1_6 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_7_slice() {
        var tab1_7_len = $('.tab1_7 tr').length;
        var len = (tab1_7_len)/3;
        if(tab1_7_len % 3 == 0){
            tab1_7_lef = $('.tab1_7 tr').slice(0,len); //0,6
            tab1_7_mid = $('.tab1_7 tr').slice(len,2*len); //6,12
            tab1_7_rig = $('.tab1_7 tr').slice(2*len,3*len); //12,18
        }else if(tab1_7_len % 3 == 1){
            tab1_7_lef = $('.tab1_7 tr').slice(0,Math.ceil(len)); //0,7
            tab1_7_mid = $('.tab1_7 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_7_rig = $('.tab1_7 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_7_lef = $('.tab1_7 tr').slice(0,Math.ceil(len));  //0,7
            tab1_7_mid = $('.tab1_7 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_7_rig = $('.tab1_7 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_8_slice() {
        var tab1_8_len = $('.tab1_8 tr').length;
        var len = (tab1_8_len)/3;
        if(tab1_8_len % 3 == 0){
            tab1_8_lef = $('.tab1_8 tr').slice(0,len); //0,6
            tab1_8_mid = $('.tab1_8 tr').slice(len,2*len); //6,12
            tab1_8_rig = $('.tab1_8 tr').slice(2*len,3*len); //12,18
        }else if(tab1_8_len % 3 == 1){
            tab1_8_lef = $('.tab1_8 tr').slice(0,Math.ceil(len)); //0,7
            tab1_8_mid = $('.tab1_8 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_8_rig = $('.tab1_8 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_8_lef = $('.tab1_8 tr').slice(0,Math.ceil(len));  //0,7
            tab1_8_mid = $('.tab1_8 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_8_rig = $('.tab1_8 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_9_slice() {
        var tab1_9_len = $('.tab1_9 tr').length;
        var len = (tab1_9_len)/3;
        if(tab1_9_len % 3 == 0){
            tab1_9_lef = $('.tab1_9 tr').slice(0,len); //0,6
            tab1_9_mid = $('.tab1_9 tr').slice(len,2*len); //6,12
            tab1_9_rig = $('.tab1_9 tr').slice(2*len,3*len); //12,18
        }else if(tab1_9_len % 3 == 1){
            tab1_9_lef = $('.tab1_9 tr').slice(0,Math.ceil(len)); //0,7
            tab1_9_mid = $('.tab1_9 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_9_rig = $('.tab1_9 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_9_lef = $('.tab1_9 tr').slice(0,Math.ceil(len));  //0,7
            tab1_9_mid = $('.tab1_9 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_9_rig = $('.tab1_9 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }
    function tab1_10_slice() {
        var tab1_10_len = $('.tab1_10 tr').length;
        var len = (tab1_10_len)/3;
        if(tab1_10_len % 3 == 0){
            tab1_10_lef = $('.tab1_10 tr').slice(0,len); //0,6
            tab1_10_mid = $('.tab1_10 tr').slice(len,2*len); //6,12
            tab1_10_rig = $('.tab1_10 tr').slice(2*len,3*len); //12,18
        }else if(tab1_10_len % 3 == 1){
            tab1_10_lef = $('.tab1_10 tr').slice(0,Math.ceil(len)); //0,7
            tab1_10_mid = $('.tab1_10 tr').slice(Math.ceil(len),Math.ceil(2*len));  //7,13
            tab1_10_rig = $('.tab1_10 tr').slice(Math.ceil(2*len),Math.ceil(3*len)); //13,19
        }else{
            tab1_10_lef = $('.tab1_10 tr').slice(0,Math.ceil(len));  //0,7
            tab1_10_mid = $('.tab1_10 tr').slice(Math.ceil(len),Math.ceil(2*len)); //7,14
            tab1_10_rig = $('.tab1_10 tr').slice(Math.ceil(2*len),Math.ceil(3*len));  //14,20
        }
    }

    function tab1_1() {
        //tab1_1切换
        $('.tab2_1').html(tab1_1_mid);
        $('.tab3_1').html(tab1_1_rig);
        $('.tab1_1').html(tab1_1_lef);
        // tab1_1_lef = $('.tab1_1').html();
    }
    function tab1_2() {
        // tab1_2切换
        $('.tab2_1').html(tab1_2_mid);
        $('.tab3_1').html(tab1_2_rig);
        $('.tab1_2').html(tab1_2_lef);
    }
    function tab1_3() {
        // tab1_3切换
        $('.tab2_1').html(tab1_3_mid);
        $('.tab3_1').html(tab1_3_rig);
        $('.tab1_3').html(tab1_3_lef);
    }
    function tab1_4() {
        // tab1_4切换
        $('.tab2_1').html(tab1_4_mid);
        $('.tab3_1').html(tab1_4_rig);
        $('.tab1_4').html(tab1_4_lef);
    }
    function tab1_5() {
        // tab1_5切换
        $('.tab2_1').parent().parent().parent().attr('style','');
        $('.tab2_1').html(tab1_5_mid);
        $('.tab3_1').html(tab1_5_rig);
        $('.tab1_5').html(tab1_5_lef);

    }
    function tab1_6() {
        // tab1_6切换
        $('.tab2_1').html(tab1_6_mid);
        $('.tab3_1').html(tab1_6_rig);
        $('.tab1_6').html(tab1_6_lef);
    }
    function tab1_7() {
        // tab1_7切换
        $('.tab2_1').html(tab1_7_mid);
        $('.tab3_1').html(tab1_7_rig);
        $('.tab1_7').html(tab1_7_lef);
    }
    function tab1_8() {
        // tab1_8切换
        $('.tab2_1').html(tab1_8_mid);
        $('.tab3_1').html(tab1_8_rig);
        $('.tab1_8').html(tab1_8_lef);
    }
    function tab1_9() {
        // tab1_9切换
        $('.tab2_1').html(tab1_9_mid);
        $('.tab3_1').html(tab1_9_rig);
        $('.tab1_9').html(tab1_9_lef);
    }
    function tab1_10() {
        // tab1_10切换
        $('.tab2_1').html(tab1_10_mid);
        $('.tab3_1').html(tab1_10_rig);
        $('.tab1_10').html(tab1_10_lef);
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
    // $('.malvInput').focus(function () {
    //     $('.malvSec').css({
    //         'display':'block'
    //     })
    // })
    // $('.blank').click(function () {
    //     $('.malvSec').css({
    //         'display':'none'
    //     })
    // })
    // $('.malv_none').click(function () {
    //     $('.malvSec').css({
    //         'display':'none'
    //     })
    //     $('.malvInput').val('无');
    // })
    // $('.malvSec').blur(function () {
    //     $(this).css({
    //         'display':'none'
    //     })
    // })
    // $('.malvMul').click(function () {
    //     if(time==0){
    //         $(this).css({
    //             'background':'#098FFF'
    //         });
    //         $(this).addClass('sel');
    //         time++;
    //     }else{
    //         $(this).css({
    //             'background':'#ffffff'
    //         });
    //         $(this).removeClass('sel');
    //         time--;
    //     }
    //     var info ='';
    //     var sel = document.getElementsByClassName('sel');
    //     for(var i=0;i<sel.length;i++){
    //         console.log(sel[i].innerText)
    //         if(i != sel.length-1){
    //             info += sel[i].innerText + ','
    //         }else{
    //             info += sel[i].innerText;
    //         }
    //     }
    //     $('.malvInput').val(info);
    // })
    // alert('562')
    // $(document).on('click','#malv + div',function () {
    //     alert('6665');
    //     checkVal();
    // })
    $('#malv').on('change',function () {
        checkVal();
    })
    function checkVal() {
        var val = $('#malv option:selected').val();
        if(val == '无'){
            $('#malv option:nth-child(1)').siblings().attr('disabled',true);
            if($('.multiselect-container')){
                $('.malv .multiselect-container li:nth-child(1)').siblings().addClass('disabled');
                $('.malv .multiselect-container li:nth-child(1)').siblings().find('input').attr('disabled','disabled');
                var ifDisabled = $('.malv .multiselect-container li');
                for(var i=0;i<ifDisabled.length;i++){
                    if(ifDisabled[i].className = 'active disable'){
                        ifDisabled[i].className = 'disabled';
                    }
                }
            }
            setTimeout(function () {
                $('.malv span.multiselect-selected-text').text('无');
            },1);
        }else{
            $('#malv option:nth-child(1)').siblings().attr('disabled',false);
            if($('.multiselect-container')){
                $('.malv .multiselect-container li:nth-child(1)').siblings().removeClass('disabled');
                $('.malv .multiselect-container li:nth-child(1)').siblings().find('input').removeAttr('disabled');
            }
        }
    }
    console.log($('.multiselect-container li:nth-child(1)'));

    /*点击其他区域，正式转码码率下拉框消失*/
    $('.data-search_SY label').click(function () {
        $('.malvSec').css({
            'display':'none'
        })
    })


    /*双击可编辑tab区，blur自动保存,已有input双击其他区域切换input,已有input单击其他区域去掉input*/
    $(document).on('dblclick','.tabx_1 tr td',function () {
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
    /*每次双击都更新数据*/
    $(document).on('blur','.tabx_1 tr td',function (){
        var tabName = $('.active a').text();
        // var classInfo = $(this).parent().parent().attr('class');
        switch(tabName){
            case 'program':
                tab1_1_lef = $('.tab1_1').html();
                tab1_1_mid = $('.tab2_1').html();
                tab1_1_rig = $('.tab3_1').html();
                break;
            case 'movie':
                tab1_2_lef = $('.tab1_2').html();
                tab1_2_mid = $('.tab2_1').html();
                tab1_2_rig = $('.tab3_1').html();
                break;
            case 'picture':
                tab1_3_lef = $('.tab1_3').html();
                tab1_3_mid = $('.tab2_1').html();
                tab1_3_rig = $('.tab3_1').html();
                break;
            case 'category':
                tab1_4_lef = $('.tab1_4').html();
                tab1_4_mid = $('.tab2_1').html();
                tab1_4_rig = $('.tab3_1').html();
                break;
            case 'series':
                tab1_5_lef = $('.tab1_5').html();
                tab1_5_mid = $('.tab2_1').html();
                tab1_5_rig = $('.tab3_1').html();
                break;
            case 'Pro&Mov':
                tab1_6_lef = $('.tab1_6').html();
                tab1_6_mid = $('.tab2_1').html();
                tab1_6_rig = $('.tab3_1').html();
                break;
            case 'Pro&Pic':
                tab1_7_lef = $('.tab1_7').html();
                tab1_7_mid = $('.tab2_1').html();
                tab1_7_rig = $('.tab3_1').html();
                break;
            case 'Cat&Pro':
                tab1_8_lef = $('.tab1_8').html();
                tab1_8_mid = $('.tab2_1').html();
                tab1_8_rig = $('.tab3_1').html();
                break;
            case 'Cat&Pic':
                tab1_9_lef = $('.tab1_9').html();
                tab1_9_mid = $('.tab2_1').html();
                tab1_9_rig = $('.tab3_1').html();
                break;
            case 'Ser&Pro':
                tab1_10_lef = $('.tab1_10').html();
                tab1_10_mid = $('.tab2_1').html();
                tab1_10_rig = $('.tab3_1').html();
                break;
        }
    })


    $(document).on('click','.tabx_1 tr td',function (e) {
        if($('.inpEdit').length != 0){
            var inpInfo = $('.inpEdit').val();
            $('.inpEdit').parent().text(inpInfo);
        }
    })
    $(document).on('click','.inpEdit',function () {
        e.stopPropagation();
    })


    $(document).on('blur','.inpEdit',function () {
        removeInp();
    })

    /*点击加号 添加tab导航标签*/
    // $('.tabAdd').click(function () {
    //     var con = '<li role="presentation" class="tabAdd"><a href="#category" role="tab" id="category-tab" data-toggle="tab" aria-controls="category" aria-expanded="false"></a></li>';
    //     $(this).before(con);
    // })

    /*点击新增 添加当前tab行*/
    $('.addTr').click(function () {
        var tabName = $('.active a').text();
        var addInfo ='<tr><td></td><td></td><td></td><td style="display: none;">newAdd</td></tr>';
        switch(tabName){
            case 'program':
                if($('.tab1_1 tr').length == $('.tab2_1 tr').length && $('.tab1_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_1').append(addInfo);
                    tab1_1_lef = $('.tab1_1').html();
                }else if($('.tab1_1 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_1_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_1_rig = $('.tab3_1').html();
                };
                break;
            case 'movie':
                if($('.tab1_2 tr').length == $('.tab2_1 tr').length && $('.tab1_2 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_2').append(addInfo);
                    tab1_2_lef = $('.tab1_2').html();
                }else if($('.tab1_2 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_2_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_2_rig = $('.tab3_1').html();
                };
                break;
            case 'picture':
                if($('.tab1_3 tr').length == $('.tab2_1 tr').length && $('.tab1_3 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_3').append(addInfo);
                    tab1_3_lef = $('.tab1_3').html();
                }else if($('.tab1_3 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_3_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_3_rig = $('.tab3_1').html();
                };
                break;
            case 'category':
                if($('.tab1_4 tr').length == $('.tab2_1 tr').length && $('.tab1_4 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_4').append(addInfo);
                    tab1_4_lef = $('.tab1_4').html();
                }else if($('.tab1_4 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_4_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_4_rig = $('.tab3_1').html();
                };
                break;
            case 'series':
                console.log($('.tab1_5 tr').length);
                console.log($('.tab2_1 tr').length);
                console.log($('.tab3_1 tr').length);
                if($('.tab1_5 tr').length == $('.tab2_1 tr').length && $('.tab1_5 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_5').append(addInfo);
                    tab1_5_lef = $('.tab1_5').html();
                }else if($('.tab1_5 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_5_mid = $('.tab2_1').html();
                }else{
                    alert('542');
                    $('.tab3_1').append(addInfo);
                    tab1_5_rig = $('.tab3_1').html();
                };
                break;
            case 'Pro&Mov':
                if($('.tab1_6 tr').length == $('.tab2_1 tr').length && $('.tab1_6 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_6').append(addInfo);
                    tab1_6_lef = $('.tab1_6').html();
                }else if($('.tab1_6 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_6_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_6_rig = $('.tab3_1').html();
                };
                break;
            case 'Pro&Pic':
                if($('.tab1_7 tr').length == $('.tab2_1 tr').length && $('.tab1_7 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_7').append(addInfo);
                    tab1_7_lef = $('.tab1_7').html();
                }else if($('.tab1_7 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_7_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_7_rig = $('.tab3_1').html();
                };
                break;
            case 'Cat&Pro':
                if($('.tab1_8 tr').length == $('.tab2_1 tr').length && $('.tab1_8 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_8').append(addInfo);
                    tab1_8_lef = $('.tab1_8').html();
                }else if($('.tab1_8 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_8_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_8_rig = $('.tab3_1').html();
                };
                break;
            case 'Cat&Pic':
                if($('.tab1_9 tr').length == $('.tab2_1 tr').length && $('.tab1_9 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_9').append(addInfo);
                    tab1_9_lef = $('.tab1_9').html();
                }else if($('.tab1_9 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_9_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_9_rig = $('.tab3_1').html();
                };
                break;
            case 'Ser&Pro':
                if($('.tab1_10 tr').length == $('.tab2_1 tr').length && $('.tab1_10 tr').length == $('.tab3_1 tr').length){
                    $('.tab1_10').append(addInfo);
                    tab1_10_lef = $('.tab1_10').html();
                }else if($('.tab1_10 tr').length > $('.tab2_1 tr').length && $('.tab2_1 tr').length == $('.tab3_1 tr').length){
                    $('.tab2_1').append(addInfo);
                    tab1_10_mid = $('.tab2_1').html();
                }else{
                    $('.tab3_1').append(addInfo);
                    tab1_10_rig = $('.tab3_1').html();
                };
                break;
        }
    })


    function removeInp() {
        var inpInfo = $('.inpEdit').val();
        $('.inpEdit').parent().text(inpInfo);
    }

    /*tab 数据展示区域max-height 自适应*/
    if($('.dataSY_edit .table-responsive').length != 0){
        var tab_maxHeight = $(document).height() - $('.dataSY_edit .table-responsive').offset().top - $('.cpspBtn').height() - 6;
        $('.dataSY_edit .table-responsive').css({
            'max-height':tab_maxHeight
        })
    }

    /*工单审核选中免审时显示新的下拉复选，选中非免审时隐藏新的下拉复选*/
    $(document).on('change','#GDTrial',function () {
        if($('#GDTrial option:selected').val() == '0'){
                $('.GDFreeTrial').css({
                    'display':'block'
                })
        }else{
            $('.GDFreeTrial').css({
                'display':'none'
            })
        }
    })

    /*调用multiselect插件*/
    $('#GDFreeTrial').multiselect();
    $('#malv').multiselect();
});



