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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>模板管理</title>
<link href="resource/css/admin.css" rel="stylesheet" type="text/css" />
<script src="resource/js/jquery.js" type="text/javascript"></script>
<script src="resource/js/jquery.treeview.js" type="text/javascript"></script>
<script src="resource/js/common.js" type="text/javascript"></script>
<script type="text/javascript" src="resource/js/lib/layer/layer.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>resource/js/pageFooter.js"></script>
<script type="text/javascript" src="resource/js/lib/laydate/laydate.js"></script>
<!--[if IE 6]>
	<script src="js/DD_belatedPNG.js"></script>
<![endif]-->
<style type="text/css">
.loading {
	width: 30px;
	height: 30px;
	position: absolute;
	left: 50%;
	margin-left: -15px;
	top: 50%;
	margin-top: -15px;
	z-index: 500;
	display: none;
}

.loading img {
	width: 100%;
}

.h_bj {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #000000;
	opacity: .5;
	z-index: 1000;
	display: none;
	filter: alpha(opacity = 50);
	/* IE */
	-moz-opacity: 0.5;
	/* 老版Mozilla */
	-khtml-opacity: 0.5;
	/* 老版Safari */
	_position: absolute;
	_bottom: auto;
	_top: expression(eval(document.documentElement.scrollTop));
}
</style>
</head>
<body onload="init()">
	<form action="templet_search.do" method="post">
		<div class="main-wrap">
			<!-- 查询条件区 -->
			<div class="form-head">
				<div class="crumb">
					<a href="#">模板管理</a> >
				</div>
				<div class="head-table">
					<div class="cx-reset cx-reset-h">
						<input type="button" class="btn blue-btn" value="查询" onclick="dosearch()" /> 
						<input type="button" class="btn blue-btn" value="重置" id="J_clearBtn" />
						
					</div>
					<ul>
						<li>
							<label>模板名称：</label> 
								<s:textfield name="templetVO.name"
									class="ipt" maxlength="20" id="nameInput" style="width: 164px;" />
						</li>
						
						<li>
							<label>模板类型：</label> 
								<s:select class="ipt"
										name="templetVO.type" id="type" list="#request.templet_type"
										headerKey="" headerValue="全部">
								</s:select>
						</li>

						<li>
							<label>创建时间：</label> 
								<s:textfield
										name="templetVO.begintime" maxlength="20" id="bTime"
										class="date-icon ipt"></s:textfield> <span>至</span> <s:textfield
										name="templetVO.endtime" maxlength="20" id="eTime"
										class="date-icon ipt">
								</s:textfield>
						</li>


						<li>
							<label>厂商来源：</label>
								<s:select class="ipt"
										name="templetVO.source" id="source"
										list="#request.templet_source" headerKey="" headerValue="全部">
								</s:select>
							</li>
					</ul>
				</div>
			</div>

			<div class="form-main">
				<table width="100%" cellpadding="0" cellspacing="0" border="0"
					class="form-operation">
					<tbody>
						<tr>
							<td class="btn_left"><input type="button" id="add"
								<c:roleTag btncode='templet_add'></c:roleTag> value="新增"
								class="btn blue-btn" /> <!--							<input type="button"  id="del" value="提交删除"  class="btn blue-btn" onclick=""/>-->
								<input type="button" id="sub"
								<c:roleTag btncode='templet_sub'></c:roleTag> value="提交发布"
								class="btn blue-btn" /></td>
						</tr>
					</tbody>
				</table>
				<table width="100%" cellpadding="0" cellspacing="0" border="0"
					class="form-list">
					<thead>
						<tr>
							<th width="5%"><input type="checkbox" name="allIds"
								id="allIds" class="selectAll" onclick="checkAll(this)" /></th>
							<th width="10%">创建时间</th>
							<th width="15%">模板名称</th>
							<th width="15%">模板类型</th>
							<th width="10%">厂商来源</th>
							<th width="30%">操作</th>
						</tr>
					</thead>
					<tbody class="form-body">
						<s:iterator var="vo" value="#request.list" status="sta">
							<tr>
								<td><input type="checkbox" name="templetVO.ids"
									value="<s:property value="#vo.id"/>" onclick="checkNode(this)"
									statusval="<s:property value="#vo.status"/>" /></td>


								<td title="<s:property value="#vo.createdate"/>"><s:property
										value="#vo.createdate" /></td>

								<!-- 隐藏标签,存放tar的名称 -->
								<td id="tarName" name="tarNames" style="display: none"
									title="<s:property value="#vo.filename"/>"><s:property
										value="#vo.filename" /></td>

								<td title="<s:property value="#vo.name"/>"><s:property
										value="#vo.name" /></td>
								<td title="<s:property value="getTypeName()"/>"><s:property
										value="getTypeName()" /></td>
								<td title="<s:property value="getSourceName()"/>"><s:property
										value="getSourceName()" /></td>
								<td class="option-td"><input type="button"
									<c:roleTag btncode='templet_detail'></c:roleTag> value="查看"
									onclick="goDetail('<s:property value="#vo.id"/>')"
									class="btn blue-btn" /> <input type="button"
									<c:roleTag btncode='templet_edit'></c:roleTag> value="编辑"
									onclick="goEdit('<s:property value="#vo.id"/>')"
									class="btn blue-btn" /> <input type="button"
									<c:roleTag btncode='templet_preview'></c:roleTag> value="下发预览"
									class="btn blue-btn"
									onclick="goPreview('<s:property value="#vo.id"/>')" /></td>
							</tr>
						</s:iterator>
					</tbody>
				</table>

				<!-- 信息总页数 隐藏字段-->
				<div class="pagelist">
					<label class=""> 每页显示： <select name="templetVO.pagecount"
						id="" class="text-input" onchange="dosearch()">
							<s:iterator var="num" value="#request.sizelist">
								<option
									<s:if test='#request.pagecount==#num.key'>selected="selected"</s:if>
									value="<s:property value="#num.key"/>"><s:property
										value="#num.value" /></option>
							</s:iterator>
					</select>
					</label> <input type="hidden" name="templetVO.pageid" id="page"
						value="<s:property value="#request.pid"/> " /> <input
						type="hidden" name="pages"
						value="<s:property value="#request.pages"/> " /> <span
						<s:if test="request.pid>1">id="firstpage"</s:if>
						style="<s:if test="request.pid>1">cursor:pointer;</s:if> text-decoration: none;">首页</span>
					<span <s:if test="request.pid>1">id="backpage"</s:if>
						style="<s:if test="request.pid>1">cursor:pointer;</s:if> text-decoration: none;">上一页</span>
					<span <s:if test="request.pid!=request.pages">id="nextpage"</s:if>
						style="<s:if test="request.pid!=request.pages">cursor:pointer;</s:if> text-decoration: none;">下一页</span>
					<span <s:if test="request.pid!=request.pages">id="lastpage"</s:if>
						style="<s:if test="request.pid!=request.pages">cursor:pointer;</s:if> text-decoration: none;">尾页</span>

					跳转到<input name="showPage" id="showPage" size="3" class="ipt"
						value="<s:property value="#request.pid"/> " />页 <span><s:property
							value="#request.pid" />/ <s:property value="#request.pages" /></span>
					<input type="button" class="btn go-page" value="GO" id="JumptoPage" />
				</div>
			</div>

		</div>
		<div class="layer alert-suc" id="submitSuc">
			<div class="layer-msg">
				<span style="width: 150px;">提交发布成功！</span>
			</div>
		</div>
		<div class="layer alert-fail" id="submitFail">
			<div class="layer-msg">
				<span style="width: 150px;">提交发布失败！</span>
			</div>
		</div>
		<div class="layer alert-fail" id="checkFail">
			<div class="layer-msg">
				<span style="width: 160px;">提交发布失败！<br />存在已经发布的模板！
				</span>
			</div>
		</div>
		<div class="layer alert-fail" id="groupFail">
			<div class="layer-msg">
				<span style="width: 180px;">该模板无分组！<br />请给模板选择下发分组！
				</span>
			</div>
		</div>
		<div class="layer alert-suc" id="preSubmitSuc">
			<div class="layer-msg">
				<span style="width: 150px;">提交预览成功！</span>
			</div>
		</div>
		<div class="layer alert-fail" id="preSubmitFail">
			<div class="layer-msg">
				<span style="width: 150px;">提交预览失败！</span>
			</div>
		</div>
		<div class="layer alert-suc" id="updateSuc">
			<div class="layer-msg">
				<span style="width: 150px;">更新模板成功！</span>
			</div>
		</div>
		<div class="layer alert-fail" id="updateFail">
			<div class="layer-msg">
				<span style="width: 150px;">更新模板失败！</span>
			</div>
		</div>
		<div class="layer alert-suc" id="addSuc">
			<div class="layer-msg">
				<span style="width: 150px;">新增模板成功！</span>
			</div>
		</div>
		<div class="layer alert-fail" id="addFail">
			<div class="layer-msg">
				<span style="width: 150px;">新增模板失败！</span>
			</div>
		</div>
		<div class="layer confirm" id="confirm">
			<div class="layer-tit"></div>
			<div class="layer-msg">提交即发布，是否确认发布？</div>
			<div class="buttons">
				<input type="button" class="btn blue-btn" value="确认"
					onclick="goSub()" /> <input type="button"
					class="btn blue-btn cancel" value="取消" />
			</div>
		</div>
		<div class="layer confirm" id="confirmPre">
			<div class="layer-tit"></div>
			<div class="layer-msg">提交即发布，是否确认发布预览？</div>
			<div class="buttons">
				<input type="button" class="btn blue-btn" value="确认"
					onclick="goPreSub()" /> <input type="button"
					class="btn blue-btn cancel" value="取消" />
			</div>
		</div>
		<div class="layer select_box" id="select_box"
			style="display: none; height: 280px; weidth: 450px; z-index: 20000;">
			<div class="title">请选择预览分组</div>
			<div class="main2"
				style="overflow: auto; height: 150px; weidth: 450px;">
				<table width="100%" cellpadding="0" cellspacing="0" border="0"
					class="seleBox">
					<tbody class="form-body" id="preTbody" id="preTbody">

					</tbody>
				</table>
			</div>
			<div class="button">
				<br />
				<ul>
					<input type="hidden" name="templetVO.id" id="selectedTempletId" />
					<li><input type="button" class="btn blue-btn" value="确定"
						id="preSubmit"></li>
					<li><input type="button" class="btn blue-btn" value="取消"
						id="close_sel"></li>
				</ul>
			</div>
		</div>
		<!--灰背景-->
		<div class="h_bj" id="h_bj1"></div>
		<div class="h_bj" id="h_bj2" style="z-index: 30000;"></div>
		<!--loading-->
		<div class="loading" style="z-index: 30001;">
			<img src="resource/img/admin/loading.gif" />
		</div>
	</form>
	<script type="text/javascript">
		$(".form-list tbody").find("tr").hover(function() {
			$(this).addClass("tr-hover");
		}, function() {
			$(this).removeClass("tr-hover");
		});
		$('#J_clearBtn').click(
				function() {
					$('#nameInput, #bTime,#eTime,#type,#level,#status,#source')
							.val('');
				});
		$('.cancel').on('click', function() {
			layer.closeAll();
		});
		function goSub() {
			layer.closeAll();
			$("#h_bj1").show();
			$(".loading").show();
			document.forms[0].action = "templet_releaseSubmit.do";
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
				alert("请选择需要操作的对象模板");
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

		/**增加*/
		$("#add").on('click', function() {
			window.location.href = "templet_showAdd.do";
		});

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

		function checkAll(o) {
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
		}
		function dosearch() {
			document.forms[0].page.value = "1";
			document.forms[0].submit();
		}
		function init() {
			if ('1' == '<s:property value="doFlag"/>') {
				alertSuc();
			} else if ('2' == '<s:property value="doFlag"/>') {
				alertCheckFail();
			} else if ('3' == '<s:property value="doFlag"/>') {
				alertNoGroupFail();
			} else if ('4' == '<s:property value="doFlag"/>') {
				alertSubmitFail();
			} else if ('5' == '<s:property value="doFlag"/>') {
				alertPreSubmitSuc();
			} else if ('6' == '<s:property value="doFlag"/>') {
				alertPreSubmitFail();
			} else if ('7' == '<s:property value="doFlag"/>') {
				alertUpdateSuc();
			} else if ('8' == '<s:property value="doFlag"/>') {
				alertUpdateFail();
			} else if ('9' == '<s:property value="doFlag"/>') {
				alertAddSuc();
			} else if ('10' == '<s:property value="doFlag"/>') {
				alertAddFail();
			}

		}
		function alertSuc() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#submitSuc"
				}
			});
		}
		function alertCheckFail() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#checkFail"
				}
			});
		}
		function alertNoGroupFail() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#groupFail"
				}
			});
		}
		function alertSubmitFail() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#submitFail"
				}
			});
		}
		function alertPreSubmitSuc() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#preSubmitSuc"
				}
			});
		}
		function alertPreSubmitFail() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#preSubmitFail"
				}
			});
		}
		function alertUpdateSuc() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#updateSuc"
				}
			});
		}
		function alertUpdateFail() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#updateFail"
				}
			});
		}
		function alertAddSuc() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#addSuc"
				}
			});
		}
		function alertAddFail() {
			$.layer({
				type : 1, //0-4的选择,
				shade : [ 0.6, '#000', true ],
				title : false,
				time : 2,
				border : [ 0 ],
				closeBtn : [ 0 ],
				shadeClose : true,
				area : [ '450px', '280px' ],
				page : {
					dom : "#addFail"
				}
			});
		}
		function goDetail(id) {
			window.location.href = "templet_getDetail.do?templetVO.id=" + id;

		}
		function goEdit(id) {
			window.location.href = "templet_getDetail.do?templetVO.id=" + id
					+ "&tip=" + "edit";
		}
		function checkGroupAll(o) {
			var ids = document.getElementsByName("groupIds");
			var allIds = document.getElementsByName("allgroupIds");
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
		function checkGroupNode(o) {
			if (!o.checked) {
				var ids = document.getElementsByName("allgroupIds");
				if (ids.length != undefined) {
					for (var i = 0; i < ids.length; i++) {
						ids[i].checked = false;
					}
				}
			}
		}
		function goPreview(id) {
			$("#selectedTempletId").val(id);
			$
					.ajax({
						url : 'templet_getAllPreviewGroups.do',
						type : 'post',
						dataType : 'json',
						success : function(data) {
							$("#preTbody").children().remove();
							//console.log(data);
							$("#preTbody")
									.append(
											"<tr>"
													+ "<td width='10%'><input type='checkbox' name='allgroupIds' id='allgroupIds' class='selectAll' onclick='checkGroupAll(this)'/></td>"
													+ "<td width='50%'>分组名称</td>"
													+ "<td width='50%'>下游名称</td></tr>");
							for (var i = 0; i < data.length; i++) {
								$("#preTbody").append("<tr>");
								$("#preTbody")
										.append(
												"<td><input type='checkbox' name='groupIds' value="
														+ data[i].id
														+ " onclick='checkGroupNode(this)' /></td>");
								$("#preTbody").append(
										"<td title="+data[i].name+">"
												+ data[i].name + "</td>");
								$("#preTbody").append(
										"<td title="+data[i].downstream_name+">"
												+ data[i].downstream_name
												+ "</td>");
								$("#preTbody").append("<tr/>");
							}
							$("#h_bj1").show();
							$('#select_box').show();
							//			$.layer({
							//				type: 1,   //0-4的选择,
							//				shade: [0.6 , '#000' , true],
							//				title: false,
							//				border: [0],
							//				closeBtn: [0],
							//				shadeClose: true,
							//				area: ['450px', '280px'],
							//				page: {
							//					dom:"#select_box"
							//				}
							//			});
						}
					});
		}

		$("#preSubmit").on('click', function() {
			var strIds = new Array();
			$("input[name='groupIds']:checked").each(function() {
				strIds[strIds.length] = $(this).val();
			});
			if (strIds.length == 0) {
				alert("请选择预览分组");
				//layer.msg("请选择预览分组",2,3);
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
						dom : "#confirmPre"
					}
				});
			}
		});
		function goPreSub() {
			layer.closeAll();
			$("#h_bj2").show();
			$(".loading").show();
			document.forms[0].action = "templet_preReleaseSubmit.do";
			document.forms[0].method = "POST";
			document.forms[0].submit();
		}

		$("#close_sel").on('click', function() {
			$("#select_box").hide();
			$("#h_bj1").hide();
			$("#h_bj2").hide();
		});
	</script>
</body>
</html>

