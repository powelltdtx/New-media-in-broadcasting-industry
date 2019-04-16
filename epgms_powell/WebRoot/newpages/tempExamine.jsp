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
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>模板审核</title>
<link rel="stylesheet" href="newpages/css/bootstrap.min.css">
<link rel="stylesheet" href="newpages/css/font-awesome.min.css">
<link rel="stylesheet"
	href="newpages/layDate/laydate/theme/default/laydate.css">
<link rel="stylesheet" href="newpages/css/common.css">
<link rel="stylesheet" href="newpages/css/cpsp.css">
<link rel="stylesheet" href="newpages/css/newTemp.css">
</head>
<body>
	<div class="container-fluid">
		<!--头部-->
		<header class="header">
		<div class="row clearfix">
			<div class="col-md-2 logo clearfix">
				<span class="logoText">播控2.0系统</span>
				<div class="user col-md-11">
					<span>admin</span> <span>退出</span>
				</div>
			</div>
			<div class="col-md-10 text-center header_nav clearfix">
				<div class="col-md-3"
					style="border-bottom: 2px solid #FF7A19 !important;">
					<a href="templet_search.do" class="t"
						style="color: #FF7A19 !important;">模板管理</a>
				</div>
				<div class="col-md-3">
					<a href="mangeFile.html" class="f">文件管理</a>
				</div>
				<div class="col-md-3">
					<a href="heartBeat_search.do">预警监控</a>
				</div>
				<div class="col-md-3">
					<a href="javascript:void(0);">系统管理</a>
				</div>
			</div>
		</div>
		</header>
		<!--主内容部分-->
		<main> <!--左侧导航--> <nav class="left_nav navbar-left bg-info">
		<content class="content">
		<div class="con">
			<a class="con_sub" href="templet_search.do"><i></i>模板创建</a>
		</div>
		<div class="con">
			<a class="con_sub  headerCur" href="javascript:void(0);" id="#temVie"><i></i>模板审核</a>
		</div>
		<div class="con">
			<a class="con_sub" href="javascript:void(0);" id="main"><i></i>模板开发</a>
		</div>
		<div class="con">
			<a class="con_sub" href="javascript:void(0);" id="templeCple"><i></i>模板下发</a>
		</div>
		<div class="con">
			<a class="con_sub" href="javascript:void(0);"><i></i>模板库</a>
		</div>
		</content> </nav> <!--右侧数据(默认)-->


		<div class="data data_table navbar-left dataDefault">
			<form action="" class="form-inline" method="post">
				<input type="hidden" id="templateId" name=templetVO.id value="">
				<div class="data-search" style="width: 85%;">
					<div>
						<div class="form-group col-md-4">
							<label class="col-md-5">模板名称：</label>
							<s:textfield name="templetVO.name" class="col-md-6 ipt"
								maxlength="20" id="nameInput" style="width: 164px;">
							</s:textfield>
						</div>

						<div class="form-group col-md-4">
							<label class="col-md-5">模板类型：</label>
							<s:select class="col-md-5 ipt" name="templetVO.type" id="type"
								list="#request.templet_type" headerKey="" headerValue="全部">
							</s:select>
						</div>

						<div class="form-group col-md-4">
							<label class="col-md-5">模板来源：</label>
							<s:select class="col-md-5 ipt" name="templetVO.source"
								id="source" list="#request.templet_source" headerKey=""
								headerValue="全部">
							</s:select>
						</div>

						<div class="form-group col-md-6">
							<label class="sel col-md-3">模板状态：</label>
							<s:select class="sel col-md-5 ipt2" name="templetVO.status"
								id="status" list="#request.templet_status" headerKey=""
								headerValue="全部">
							</s:select>
						</div>

						<div class="form-group col-md-6">
							<label class="">创建时间：</label>
							<s:textfield name="templetVO.begintime" maxlength="20" id="bTime"
								class="date-icon ipt">
							</s:textfield>
							<span>至</span>
							<s:textfield name="templetVO.endtime" maxlength="20" id="eTime"
								class="date-icon ipt">
							</s:textfield>
						</div>


						<input type="hidden" id="strategyGroupIds"
							name="templetVO.groupIds" value="">

					</div>

					<div class="search_btn">

						<button class="btn btn-default primary" id="sub" onclick=""
							type="button">通过</button>
							
						<button class="btn btn-default primary" id="noPass" onclick="">不通过</button>

						<button class="btn btn-default primary" id="que" onclick="query()"
							type="submit">查询</button>
						<button class="btn btn-default primary" id="J_clearBtn"
							onclick="funreset()">重置</button>

					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-hover text-center">
						<thead>
							<tr>
								<th width="5%"><input type="checkbox" name="allIds"
									id="allIds" class="selectAll" onclick="checkAll(this)" /></th>
								<th><span class="spanCls">创建时间</span></th>
								<th><span class="spanCls">模板名称</span></th>
								<th><span class="spanCls">模板类型</span></th>
								<th><span class="spanCls">模板来源</span></th>
								<th><span class="spanCls">状态</span></th>
								<th><span class="spanCls">操作</span></th>

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

									<td title="<s:property value="getStatusName"/>"><s:property
											value="getStatusName()" /></td>

									<td><select class="oper" id="selected">
											<option value="">操作</option>
											<option value="<s:property value="#vo.id"/>">查看</option>
											<option value="<s:property value="#vo.id"/>">编辑</option>
											<option value="<s:property value="#vo.id"/>">预览</option>
									</select></td>
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
								<span>每页显示 <select name="vo.pagecount" id=""
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
						<div class="layer-msg">通过审核即发布，是否确认通过审核？</div>
						<div class="buttons">
							<input type="button" class="btn blue-btn" value="确认"
								onclick="goSub()" /> <input type="button"
								class="btn blue-btn cancel" value="取消" />
						</div>
					</div>
					
					
				</div>
			</form>
		</div>
	</div>
	</main>
	</div>
	<script src="newpages/js/jquery-3.2.1.min.js"></script>
	<script src="newpages/js/bootstrap.min.js"></script>
	<script src="newpages/layDate/laydate/laydate.js"></script>
	<script src="newpages/js/lib/layer/layer.js"></script>
	<script src="newpages/js/common.js"></script>
	<script src="newpages/js/cscp.js"></script>
	<script type="text/javascript">
		//分页
		function dosearch() {
			/* document.forms[0].page.value = "1";
			document.forms[0].submit(); */

			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchByExamine.do";
			document.forms[0].submit();
		}
		function firstpage() {
			document.forms[0].page.value = 1;
			document.forms[0].action = "templet_searchByExamine.do";
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
			document.forms[0].action = "templet_searchByExamine.do";
			document.forms[0].submit();
			return false;
		}
		function nextpage() {
			if (parseInt(document.forms[0].page.value) >= parseInt(document.forms[0].pages.value)) {
				document.forms[0].page.value = document.forms[0].pages.value;
			} else {
				document.forms[0].page.value = parseInt(document.forms[0].page.value) + 1;
			}
			document.forms[0].action = "templet_searchByExamine.do";
			document.forms[0].submit();
			return false;
		}
		function lastpage() {
			document.forms[0].page.value = document.forms[0].pages.value;
			document.forms[0].action = "templet_searchByExamine.do";
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
				document.forms[0].action = "templet_searchByExamine.do";
				document.forms[0].submit();
			} else {
				alert('请输入正整数');
			}
			return false;
		}

		function query() {
			document.getElementById("page").value = "1";
			document.forms[0].action = "templet_searchByExamine.do";
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