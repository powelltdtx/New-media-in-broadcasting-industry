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
<title>模板下发</title>
<link rel="stylesheet" href="resource/newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="resource/newpages/css/font-awesome.min.css">
<link rel="stylesheet"
	href="resource/newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="resource/newpages/js/lib/layer/skin/layer.css">
<link rel="stylesheet" href="resource/newpages/css/common.css">
<link rel="stylesheet" href="resource/newpages/css/cpsp.css">


</head>
<body>
	<div class="container-fluid">
		<!--主内容部分-->
		<main>
		<div class="data data_table navbar-left dataDefault">
			<form action="" class="form-inline" method="post">
				<div class="data-search" style="width: 98%;">
					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-5">服务器分组：</label> <input type="text"
							class="col-md-6">
					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-5">服务器名称：</label> <input type="text"
						   name="templetVO.serverName" class="col-md-6" >
					</div>


					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-5">服务器IP：</label> <input type="text"
							name="templetVO.serverIp" class="col-md-6">
					</div>
					<div class="form-group col-md-3">

						<label for="" class="col-md-5">模板名称：</label> <input type="text"
							name="templetVO.name" class="col-md-6" id="nameInput">
					</div>

					<div class="form-group col-md-3 ID">
						<label for="" class="col-md-5">审核状态：</label>

						<s:select class="sel col-md-6 ipt2" name="templetVO.status"
							id="status" list="#request.templet_status" headerKey=""
							headerValue="全部">
						</s:select>
					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="time col-md-5">时间：</label> <input type="text"
							name="templetVO.begintime" maxlength="20" value="" id="bTime"
							class="date-icon ipt3 col-md-6"/>
					</div>
					<div class="form-group col-md-3 ID">
						<label for="" class="time col-md-5">——：</label><input type="text"
						name="templetVO.endtime" maxlength="20" value="" id="eTime"
						class="date-icon ipt3 col-md-6" />
					</div>
					<div class="form-group col-md-3" style="height: 25px;"></div>
				</div>

				<div class="search_btn">
					<input type="button" name="" id="que" onclick="query()"
						class="resetBtn" value="查询" /> <input type="button" name="" id=""
						class="resetBtn" value="重置" /> <input type="button" name=""
						id="sub" class="resetBtn" value="重新下发" />
				</div>
				<div class="table-responsive">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th width="5%"><input type="checkbox" name="allIds"
									id="allIds" class="selectAll" onclick="checkAll(this)" /></th>
								<!-- <th><input class="th_checkbox checkBox" type="checkbox"></th> -->
								<th width="15%">模板名称</th>
								<th width="15%">服务器分组</th>
								<th width="15%">服务器IP</th>
								<th width="15%">服务器名称</th>
								<th width="15%">下发状态</th>
								<th width="20%">下发时间</th>
							</tr>
						</thead>
						<tbody class="form-body">
							<s:iterator var="vo" value="#request.list" status="sta">
								<tr>
									<td><input type="checkbox" name="templetVO.ids"
										value="<s:property value="#vo.id"/>" onclick="checkNode(this)"
										statusval="<s:property value="#vo.status"/>" /></td>

									<!-- 隐藏标签,存放tar的名称 -->
									<td id="tarName" name="tarNames" style="display: none"
										title="<s:property value="#vo.filename"/>"><s:property
											value="#vo.filename" /></td>

									<td title="<s:property value="#vo.name"/>"><s:property
											value="#vo.name" /></td>

									<td title="<s:property value="getTypeName()"/>"><s:property
											value="getTypeName()" /></td>

									<td title="<s:property value="#vo.serverIp"/>"><s:property
											value="#vo.serverIp" /></td>

									<td title="<s:property value="#vo.serverName"/>"><s:property
											value="#vo.serverName" /></td>

									<td title="<s:property value="getStatusName"/>"><s:property
											value="getStatusName()" /></td>

									<td title="<s:property value="#vo.createdate"/>"><s:property
											value="#vo.createdate" /></td>
								</tr>
							</s:iterator>
						</tbody>
					</table>
					<div class="page center-block">
						<ul>
							<li><input type="hidden" name="templetVO.pageid" id="page"
								value="<s:property value="#request.pid"/>" /> <input
								type="hidden" name="pages"
								value="<s:property value="#request.pages"/> " />
								<button type="button" class="" onclick="firstpage()">首页</button>
								<button type="button" class="" onclick="backpage()">上一页</button>
								<button type="button" class="" onclick="nextpage()">下一页</button>
								<button type="button" class="" onclick="lastpage()">尾页</button>
								<span>每页显示 <select name="templetVO.pagecount" id=""
									class="text-input" onchange="dosearch()">
										<s:iterator var="num" value="#request.sizelist">
											<option
												<s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>
												value="<s:property value="#num.key"/>"><s:property
													value="#num.value" /></option>
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
					<div class="layer confirm" id="confirm" style="display: none">
						<div class="layer-tit"></div>
						<div class="layer-msg">提交即发布，是否确认发布？</div>
						<div class="buttons">
							<input type="button" class="btn blue-btn" value="确认"
								onclick="goSub()" /> <input type="button"
								class="btn blue-btn cancel" value="取消" />
						</div>
					</div>

				</div>
			</form>
		</div>
		</main>
	</div>
	<script src="resource/newpages/js/jquery-3.2.1.min.js"></script>
	<script src="resource/newpages/js/bootstrap.min.js"></script>
	<script src="resource/newpages/layDate/laydate/laydate.js"></script>
	<script src="resource/newpages/js/lib/layer/layer.js"></script>
	<script src="resource/newpages/js/common.js"></script>
	<script type="text/javascript">
		function dosearch() {
			/* document.forms[0].page.value = "1";
			document.forms[0].submit(); */

			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchByRelease.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "templet_searchByRelease.do";
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
			document.forms[0].action = "templet_searchByRelease.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "templet_searchByRelease.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "templet_searchByRelease.do";
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
				document.forms[0].action = "templet_searchByRelease.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}

		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchByRelease.do";
			document.forms[0].submit();
			return false;
		}

		function funreset() {
			$('#nameInput, #bTime,#eTime,#type,#level,#status,#source').val('');
			return false;
		}

		function goSub() {
			layer.closeAll();
			$("#h_bj1").show();
			$(".loading").show();
			document.forms[0].action = "templet_releaseSubmitByAgain.do";
			document.forms[0].method = "POST";
			document.forms[0].submit();
		}

		/**发布*/
		$("#sub").on('click', function() {
			var strIds = new Array();
			$("input[name='templetVO.ids']:checked").each(function() {
				strIds[strIds.length] = $(this).val()
			});

			if (strIds.length == 0) {
				alert("请选择需要操作的对象模板!!");
				//layer.msg("请选择需要操作的对象",2,3);
				return false;
			} else {
				$.layer({
					type : 1, //0-4的选择,
					shade : [ 0.6, '#000', true ],
					title : false,
					border : [ 0 ],
					closeBtn : [ 0 ],
					shadeClose : true,
					area : [ '450px', '280px' ],
					page : {
						dom : "#confirm"
					}
				});
			}
		});
		$('.cancel').on('click', function() {
			layer.closeAll();
		});

		/* 	function checkAll(o) {
				var ids = document.getElementsByName("templetVO.ids");
				var allIds = document.getElementsByName("allIds");
				if (ids.length != undefined) {
					for (var i = 0; i < ids.length; i++) {
						ids[i].checked = o.checked;
					}
				}
				if (allIds.length != undefined) {
					for (i = 0; i < allIds.length; i++) {
						allIds[i].checked = o.checked;
					}
				}
			}
			function checkNode(o) {
				if (!o.checked) {
					var ids = document.getElementsByName("allIds");
					if (ids.length != undefined) {
						for (var i = 0; i < ids.length; i++) {
							ids[i].checked = false;
						}
					}
				}
			} */
	</script>

</body>
</html>
<script>
	//执行一个laydate实例
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