<%@ page language="java" contentType="text/html;charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="epgmstags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>模板创建</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet" href="resource/newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">
<link rel="stylesheet" href="resource/newpages/css/newTemp.css">
<link rel="stylesheet" href="resource/newpages/css/templatePool.css">
</head>
<style>
.poolPic{
	margin-left: 65px;
	margin-top: 20px;
	position: relative;
}
.poolPic span{
	color: #FFFFFF !important;
	width: 200px;
	text-align: center;
	position: absolute;
	top: 130px;
	background-color: rgba(0,0,0,0.6);
}
ul li{
	float: left;
}
</style>	
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main> 
		<div class="data data_table navbar-left dataDefault">
			<form action="templetPool_searchTemplatePool.do" class="form-inline" method="post">
				<input type="hidden" id="poolId" name=poolVO.id value="">
				<div class="data-search" style="width: 98%; border-bottom:2px solid #ff7a19;height:80px;">
					<div>
						<div class="col-md-3">
							<label class="col-md-5">模板名称：</label>
							<s:textfield name="poolVO.name" class="col-md-6 ipt"
								maxlength="20" id="nameInput">
							</s:textfield>
						</div>

						<div class="col-md-3">
							<label class="col-md-5">模板类型：</label>
							<s:select class="col-md-6 ipt" name="poolVO.type" id="type"
								list="#request.templet_type" headerKey="" headerValue="全部">
							</s:select>
						</div>

						<div class="col-md-6">
							<label class="col-md-3">创建时间：</label>
							<s:textfield name="poolVO.begintime" maxlength="20" id="bTime"
										 class="col-md-4 date-icon ipt">
							</s:textfield>
							<label class="col-md-1">至：</label>
							<s:textfield name="poolVO.endtime" maxlength="20" id="eTime"
										 class="col-md-4 date-icon ipt">
							</s:textfield>
						</div>

						<input type="hidden" id="strategyGroupIds" name="poolVO.groupIds" value="">
					</div>

					<div class="form-group search_btn" style="width:100%;text-align:center;">
						<input  class="btn btn-default primary" type="submit" id="que" onclick="query()" value="查询" >
						<input  type="button" class="btn btn-default primary" onclick="funreset()" id="reset" value="重置" >
						<input  type="button" name="saveToTemplate" id="saveToTemplate" value="上线" class="btn btn-default primary" />
						<input  type="button" name="downLoadTemplate" id="downLoadTemplate" value="下载" class="btn btn-default primary" />
					</div>
				</div>

				<div class="table-responsive">
					<tbody class="form-body">
						<ul>
							<s:iterator var="vo" value="#request.list" status="sta">
									<li class="poolPic" title="双击即可预览" poolId="<s:property value="#vo.id"/>">
										<span><s:property value="#vo.name"/></span>
										<img src="<s:property value="#vo.picPath"/>" width="200" height="150"/>
									</li>
							</s:iterator>
						</ul>
					</tbody>
				</div>
				<div class="page center-block">
					<ul>
						<li><input type="hidden" name="poolVO.pageid" id="page"
							value="<s:property value="#request.pid"/>" /> <input
							type="hidden" name="pages"
							value="<s:property value="#request.pages"/> " />
							<button type="button" class="" onclick="firstpage()">首页</button>
							<button type="button" class="" onclick="backpage()">上一页</button>
							<button type="button" class="" onclick="nextpage()">下一页</button>
							<button type="button" class="" onclick="lastpage()">尾页</button>
							<span>每页显示 <select name="poolVO.pagecount" id=""
								class="text-input" onchange="dosearch()">
									<s:iterator var="num" value="#request.sizelist">
										<option
											<s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>
													value="<s:property value="#num.key"/>"><s:property value="#num.value" />
										</option>
									</s:iterator>
							</select> 条
						</span> 跳转到 <input type="text" size="3" id="showPage"
							value="<s:property value="#request.pid"/>" />页 <span><s:property
									value="#request.pid" />/ <s:property value="#request.pages" /></span>
							<button type="button" class="pageBtn7"
								style="background-color: #ff7a19;" onclick="jumptoPage()">跳转</button>
						</li>
					</ul>
				</div>
			</form>
		</div>
	</div>
	</main>

	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/lib/layer/layer.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script src="resource/js/ajaxFileUpload/ajaxfileupload.js"></script>
	<script type="text/javascript">
		//页面事件-模板单击事件-选中
		 var poolId = null;
	     $(".poolPic").bind("click", function() {
	    	 //为被选中的模板增加光圈效果
             $(this).find('img').css("border","3px solid #ff7a19");
             var img= $(this).find('img').parent().siblings().children();
             //移除其他模板上的光圈效果
             $(img).css('border','none');
             poolId = $(this).attr("poolId");
	     });
   	     //双击事件--预览
	     $(".poolPic").bind("dblclick", function() { 
    	 	var poolId = $(this).attr("poolId");
			$.ajax({
				url : 'templetPool_searchPicByPoolId.do?poolVO.id='+poolId,
				type : 'post',
				dataType : 'json',
				success : function(data) {
					window.open(data +'?random='+Math.random(), '_blank', 'height=500, width=800, top=0px, left=0px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
				}
			})
	     });
	     //下载
   		 $("#downLoadTemplate").bind("click", function() {
   			 if(poolId == null){
        	 	alert("请选择模板");
        	 }else{
   				window.location.href = "templetPool_downLoad.do?poolVO.id=" + poolId ;
        	 }
       	 })
       	 //上线
		 $("#saveToTemplate").bind("click", function() {
			 if(poolId == null){
        	 	alert("请选择模板");
        	 }else{
				$.ajax({
					url : 'templetPool_savePoolToTemplate.do?poolVO.id=' + poolId,
					type : 'post',
					dataType : 'json',
					success : function(data) {
						if("fail" != data){
							alert("已上线成功");
							window.location.replace("templetPool_searchTemplatePool.do?poolVO.pagecount=12");
						}
					}
				})
        	 }
         })           
	
		//分页
		function dosearch() {
			/* document.forms[0].page.value = "1";
			document.forms[0].submit(); */

			document.getElementById("page").value = "1";
			document.forms[0].action = "templetPool_searchTemplatePool.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "templetPool_searchTemplatePool.do";
			document.forms[0].submit();
			return false;
		}
		function backpage() {
			if (document.forms[0].page.value == "1") {
				document.forms[0].page.value = 1;
			} else {
				if (document.forms[0].page.value == "0") {
					document.forms[0].page.value = 1;
				} else {
					document.forms[0].page.value = parseInt(document.forms[0].page.value) - 1;
				}
			}
			document.forms[0].action = "templetPool_searchTemplatePool.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "templetPool_searchTemplatePool.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "templetPool_searchTemplatePool.do";
			document.forms[0].submit();
			return false;
		}
		function jumptoPage() {
			if (/^[1-9]\d*$/.exec(parseInt($('#showPage').val()))) {
				document.getElementById("page").value = document
						.getElementById("showPage").value;
				if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
					document.forms[0].page.value = document.forms[0].pages.value;
				}
				document.forms[0].action = "templetPool_searchTemplatePool.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}

		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "templetPool_searchTemplatePool.do";
			document.forms[0].submit();
			return false;
		}

		function funreset() {
			$('#nameInput, #bTime,#eTime,#type').val('');
			window.location.replace("templetPool_searchTemplatePool.do");
			return false;
		}
	</script>
</body>
</html>

<script>
	//	执行一个laydate实例
	laydate({
		istime : true,
		isclear : false,
		elem : '#bTime',
		format : 'YYYY-MM-DD hh:mm:ss'
	});
	laydate({
		istime : true,
		isclear : false,
		elem : '#eTime',
		format : 'YYYY-MM-DD hh:mm:ss'
	});
	
</script>
