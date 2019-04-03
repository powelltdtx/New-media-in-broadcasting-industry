$(document).ready(function () {
    $('.CMS_GDManage').click(function () {
        window.location.href = 'CMSxmllist.html';
    })
    // window.document.click(function () {
    //     console.log($('.layui-laydate'));
    // })

    // document.getElementsById('layui-laydate1').addEventListener('onclick',function () {
    //     alert('521');
    // })

    // $('body').click(function () {
    //     alert('556');
    // })
    $(document.body).on('click','.layui-laydate-main',function () {
        alert('dsa');
    })
    $('#layui-laydate1').on('click',function () {
        alert('4545');
        if($('#receiveTimeFrom').val()!= ''){
            $('.receiveIconFrom').css({
                'display':'none'
            })
        }else{
            $('.receiveIconFrom').css({
                'display':'block'
            })
        };
        if($('#receiveTimeTo').val()!= ''){
            $('.receiveTimeTo').css({
                'display':'none'
            })
        }else{
            $('.receiveTimeTo').css({
                'display':'block'
            })
        }
    })

    /*data表格*/
    $('.table tr td').mouseover(function () {
        var info = $(this).find('span').text();
        // alert(info);
        $(this).find('span').attr('titiel',info);
    })
})