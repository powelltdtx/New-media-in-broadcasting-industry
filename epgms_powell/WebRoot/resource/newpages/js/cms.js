$(document).ready(function () {
    /*点击编辑 自动获取当前页面当前行的需要编辑的项目*/
    $('.edit').click(function () {
        $('#EditModal .modal-body').html('');
        var title = $(this).parent().parent().parent().parent().parent().find('.spanCls');
        var con = '<label for=""><span class="e_titleName"></span><input type="text" class="e_conText"></label>';
        for(var i=0;i<title.length-1;i++){
            $('#EditModal .modal-body').append(con);
            $('.e_titleName').eq(i).text(title.eq(i).text()+'：');
            console.log($('.e_titleName').eq(i).text());
        }
        var conText = $(this).parent().parent().parent().find('span');
        for(var i=0;i<conText.length-1;i++){
            $('.e_conText').eq(i).val(conText.eq(i).text());
        }
    });
    /*点击添加 自动获取当前页面当前行的需要添加的项目*/
    $('.addBtn').click(function () {
        $('#addModal .modal-body').html('');
        var title = $(this).parent().parent().parent().parent().find('.spanCls');
        var con = '<label for=""><span class="a_titleName"></span><input type="text"></label>'
        for(var i=0;i<title.length-1;i++){
            $('#addModal .modal-body').append(con);
            $('.a_titleName').eq(i).text(title.eq(i).text()+'：');
        }
    })

    /*此处有坑：添加和编辑添加的con中的class名不能重复，否则会发生后者替代前者的问题*/
});