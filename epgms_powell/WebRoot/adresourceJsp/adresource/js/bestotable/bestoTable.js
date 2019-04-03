function Map_() {
    this.elements = new Array();
    this.size = function () {
        return this.elements.length
    };
    this.isEmpty = function () {
        return (this.elements.length < 1)
    };
    this.clear = function () {
        this.elements = new Array()
    };
    this.put = function (_key, _value) {
        this.remove(_key);
        this.elements.push({key: _key, value: _value})
    };
    this.remove = function (_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true
                }
            }
        } catch (e) {
            bln = false
        }
        ;
        return bln
    };
    this.get = function (_key) {
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value
                }
            }
        } catch (e) {
            return null
        }
    };
    this.element = function (_index) {
        if (_index < 0 || _index >= this.elements.length) {
            return null
        }
        ;
        return this.elements[_index]
    };
    this.containsKey = function (_key) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true
                }
            }
        } catch (e) {
            bln = false
        }
        ;
        return bln
    };
    this.containsValue = function (_value) {
        var bln = false;
        try {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true
                }
            }
        } catch (e) {
            bln = false
        }
        ;
        return bln
    };
    this.values = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value)
        }
        ;
        return arr
    };
    this.keys = function () {
        var arr = new Array();
        for (i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key)
        }
        ;
        return arr
    }
}

function $id$(id) {
    return document.getElementById(id);
}
function $name$(name) {
    return document.getElementsByName(name);
}

function $selectIndex$(obj) {
    return obj.options[obj.options.selectedIndex];
}

/* 封装BestoTable，BestoTable是一个基于jquery的ajax表格插件，可以自动计算分页，可以很方便的配置表格的列等 */
$(function () {
    $.fn.BestoTable = function (options) {
        var defaults = {
            /* 描述：是否自动加载。
             可选项：true,false。
             可选项描述：true为自动加载，false为不自动加载。
             默认：true*/
            autoLoad: true,

            /* 描述：是否在表格左侧显示选中列。
             可选项：true,false。
             可选项描述：true为显示选中列,false为不显示选中列。
             默认：false*/
            useCheck: false,

            /* 描述：选中列的形式，单选或者多选，依赖于useCheck设置为true时才生效。
             可选项：single,multi。
             可选项描述：single为单选,multi为多选。
             默认：single*/
            checkStyle: "single",

            /* 描述：选中列对应的字段属性，为对象的唯一标识，如id，依赖于useCheck设置为true时才生效。
             默认：无默认值*/
            checkUniqueKeyField: "id",

            /* 描述：是否使用分页。
             可选项：true,false。
             可选项描述：true为使用分页,false为不使用分页。
             默认：true*/
            usePageBar: true,

            /* 描述：是否显示“每页显示行数”下拉列表，依赖于usePageBar设置为true时才生效。
             可选项：true,false。
             可选项描述：true为显示“每页显示行数”,false为不显示“每页显示行数”。
             默认：true*/
            showPageCountOptions: true,

            pageBarConfig: {
                /* 描述：“每页显示行数”的可选项，依赖于usePageBar设置为true并且showPageCountOptions设置成true时才生效。
                 默认：[10, 15, 20, 250]
                 注意：当使用此配置时，您可能认为与store中的pageSize产生冲突，程序将优先使用此配置的第0位。
                 */
                pageCountOptions: [10, 15, 20, 50]
            },

            /* 描述：表格加载时是否显示loading。
             可选项：true,false。
             可选项描述：true为显示loading,false为不显示loading。
             默认：true*/
            showLoading: true,

            //showShadow: true,

            /* 描述：显示loading的文字。
             默认："正在加载中，请稍后..."*/
            loadingText: "正在加载中，请稍后 ...",

            store: {
                /* 描述：每页显示行数，依赖于usePageBar设置为true时才生效。
                 默认：10
                 注意：当使用此配置时，您可能认为与pageBarConfig中的pageCountOptions产生冲突，程序将优先使用pageCountOptions的第0位。
                 */
                pageSize: 10,

                /* 描述：请求表格数据源的地址。*/
                url: ""
            },

            /* 描述：是否显示序号。
             可选项：true,false。
             可选项描述：true为显示序号,false为不显示序号。
             默认：true*/
            showRowNumber: true,

            /* 表格中的列
             例如
             columns:[{
             title : "广告名称",   //title为对应的表格列标题
             dataIndex : 'name',   //dataIndex为对应的java对象中的对象属性
             width : 150
             },
             {
             title : "类型",
             dataIndex : 'type',
             width : 150,
             renderer : function(record,value,index) {  //renderer为当前列重新渲染的方法，其中value为当前列的值，index为行数
             return value;
             }
             }]
             */
            columns: [],

            /* 描述：获取查询条件的方法。
             例如：
             getQueryParams : function() {
             return {
             name : $("name").value,
             type : $("type").value
             };
             }
             默认：return {}*/
            getQueryParams: function () {
                return {};
            },
            afterLoad: function (data) {
            }
        };

        /* 获取BestoTable依赖的图片目录路径 */
        this.getPath = function () {
            var path, A, $ = document.getElementsByTagName("script");
            for (var B = 0; B < $.length; B++) {
                path = $[B].getAttribute("src") || "";
                path = path.substr(0, path.indexOf("bestoTable.js"));
                A = path.lastIndexOf("/");
                if (A > 0) {
                    path = path.substring(0, A + 1);
                }
                if (path) {
                    break;
                }
            }
            return path;
        };

        var basePath = this.getPath();
        var imgFolderPath = basePath + "img/";
        var $this = $(this);

        var _bestoTable = init(options);
        /* 初始化BestoTable */
        function init(options) {
            /*key一般是id，value是record*/
            var _selectMap = new Map_();
            /* 合并默认值与用户选项 */
            var options = $.extend(defaults, options);
            var t = this;
            var _layerIndex;
            /* 初始化pageSize，即每页显示行数 */
            this.initPageSize = function () {
                var _pageSize = 10;
                if (options.showPageCountOptions) {
                    _pageSize = options.pageBarConfig.pageCountOptions[0];
                } else {
                    _pageSize = options.store.pageSize;
                }
                return _pageSize;
            }
            var _pageSize = this.initPageSize();

            /* record数组存储的是每行数据的json对象，例如后台返回list<UserVo>,UserVo中包含name和password两个属性，
             那么可使用record[i].name,record[i].password获取属性 */
            var record = [];

            /* columnTitles数组存储的是每行数据的标题字符串 */
            var columnTitles = [];

            /* columnTitles数组存储的是每行数据的java对象属性 */
            var dataIndex = [];

            /* rendererFunction为每行数据创建rendererFunction */
            var rendererFunction = [];

            var _hiddens = [];

            /* 分页数据，数据总数 */
            var _totalCount = 0;

            /* 分页数据，数据页数 */
            var _totalPage = 0;

            /* 分页数据，当前页 */
            var _pid = 1;

            /* 分页数据，开始行数 */
            var _start = 0;

            /* 用于判断查询条件变更时的一组数据，更新分页数据为首页！ */
            var _lastQueryStr = undefined;
            var _queryChange = false;
            var _lastData = undefined;

            /* 多选选中项目返回的key集合 */
            var _selects = new Array();

            /* 单选选中项目返回的key */
            var _singleSelect = undefined;

            var _loadingIndex = -1;

            var _emptyHtml = "";

            /* 初始化ColumnParams */
            this.initColumnParams = function () {
                for (var i = 0; i < options.columns.length; i++) {
                    record[i] = options.columns[i];
                    columnTitles[i] = options.columns[i].title;
                    dataIndex[i] = options.columns[i].dataIndex;
                    rendererFunction[i] = options.columns[i].renderer;
                    _hiddens[i] = options.columns[i].hidden;
                }
            };

            /* 初始化表格head的html */
            this.buildThead = function () {
                var head = "<thead>";
                if (options.useCheck) {
                    if (options.checkStyle == "single") {
                        head = head + "\n<th>选择</th>";
                    } else {
                        //todo
                        head = head + "\n<th>选择</th>";
                    }
                }
                if (options.showRowNumber) {
                    head = head + "\n<th>序号</th>";
                }
                for (var i = 0; i < columnTitles.length; i++) {
                    if (!_hiddens[i]) {
                        head = head + "\n<th>" + columnTitles[i] + "</th>";
                    }
                }
                head = head + "</thead>";
                return head;
            };

            /* 初始化表格body的html */
            var _index = 1;
            this.buildBody = function (data) {
                _index = (_pid - 1) * _pageSize + 1;
                if (_index <= 0) {
                    _index = 1;
                }
                var list = data.resultList;
                var tbody = "<tbody class=\"form-body\">";
                var size = _pageSize;
                if (!options.usePageBar) {
                    size = list.length;
                }
                for (var i = 0; i < size; i++) {
                    if (list[i] != undefined && list[i] != null) {
                        tbody = tbody
                        + "\n<tr onmouseover=\"javascript:for(var i=0;i<this.cells.length;i++){this.cells[i].style.backgroundColor='#245297';}\" "
                        + "onmouseout=\"javascript:for(var i=0;i<this.cells.length;i++){this.cells[i].style.backgroundColor='#38466D';} \">";
                        if (options.useCheck) {
                            var val = eval("list[i]."
                            + options.checkUniqueKeyField);
                            _selectMap.put(val, eval("list[i]"));
                            if (options.checkStyle == "single") {
                                if (this.checkSingleElementIfExist(val)) {
                                    tbody = tbody
                                    + "\n<td style=\"width:50px;\"><input type=\"radio\" checked=checked name=\"_singleSelect\" "
                                    + "onclick=\"addSingleSelect(this.value);\" value="
                                    + val + " /></td>";
                                } else {
                                    tbody = tbody
                                    + "\n<td style=\"width:50px;\"><input type=\"radio\" name=\"_singleSelect\" "
                                    + "onclick=\"addSingleSelect(this.value);\" value="
                                    + val + " /></td>";
                                }
                            } else {
                                if (this.checkElementIfExist(val)) {
                                    tbody = tbody
                                    + "\n<td style=\"width:50px;\"><input type=\"checkbox\" checked=checked name=\"_batchSelect\" "
                                    + "onclick=\"if(this.checked){addSelect(this.value)}else{removeSelect(this.value);}\" value="
                                    + val + " /></td>";
                                } else {
                                    tbody = tbody
                                    + "\n<td style=\"width:50px;\"><input type=\"checkbox\" name=\"_batchSelect\" "
                                    + "onclick=\"if(this.checked){addSelect(this.value)}else{removeSelect(this.value);}\" value="
                                    + val + " /></td>";
                                }
                            }
                        }
                        if (options.showRowNumber) {
                            tbody = tbody + "\n<td style=\"width:80px;\">"
                            + _index++ + "</td>";
                        }
                        for (var j = 0; j < dataIndex.length; j++) {
                            if (!_hiddens[j]) {
                                if (rendererFunction[j] != undefined
                                    && rendererFunction[j] != null) {
                                    var str = record[j].renderer(list[i],
                                        eval("list[i]." + dataIndex[j]), i);
                                    tbody = tbody + "\n<td>" + str + "</td>";
                                } else {
                                    tbody = tbody + "\n<td>"
                                    + eval("list[i]." + dataIndex[j])
                                    + "</td>";
                                }
                            }
                        }
                        tbody = tbody + "\n</tr>";
                    }
                }
                tbody = tbody + "\n</tbody>";
                return tbody;
            };

            /* 初始化表格分页的html */
            this.buildPageBar = function () {
                var pcConfig = options.pageBarConfig.pageCountOptions;
                var selectOptionStr = "";
                if (options.showPageCountOptions) {
                    selectOptionStr = " 每页显示 <select id=\"_pageCountP\" onchange=\"changePageCount(this.value);\">\n";
                    for (var i = 0; i < pcConfig.length; i++) {
                        if (pcConfig[i] == _pageSize) {
                            selectOptionStr = selectOptionStr
                            + "<option selected=selected value=\""
                            + pcConfig[i] + "\">" + pcConfig[i]
                            + "</option>\n";
                        } else {
                            selectOptionStr = selectOptionStr + "<option value=\""
                            + pcConfig[i] + "\">" + pcConfig[i]
                            + "</option>\n";
                        }
                    }
                    selectOptionStr = selectOptionStr + "</select> 条";
                }
                var pagelist = "<div class=\"pagelist\" style=\"float:right;margin-right:10px\">"
                    + "<a style=\"cursor: pointer;\" onclick=\"clickFirst()\">首页</a>"
                    + "<a style=\"cursor: pointer;\" onclick=\"clickPre()\">上一页</a> "
                    + "<a style=\"cursor: pointer;\" onclick=\"clickNext()\">下一页</a> "
                    + "<a style=\"cursor: pointer;\" onclick=\"clickLast()\">尾页</a> "
                    + selectOptionStr
                    + " 跳转到<input onkeyup=\"this.value=this.value.replace(/\\D/g,'');\" "
                    + "onafterpaste=\"this.value=this.value.replace(/\\D/g,'')\" type=\"text\" id=\"_jumpto\"class=\"ipt\"\n"
                    + " value=\""
                    + _pid
                    + "\" />页 <span>\n"
                    + "<span>"
                    + _pid
                    + "</span>/\n"
                    + "<span>"
                    + _totalPage
                    + "</span></span> <input\n"
                    + "type=\"button\" class=\"btn go-page\" value=\"GO\" onclick=\"clickGo()\" /></div>";
                return pagelist;
            };

            /* 渲染表格 */
            this.renderTable = function (data) {
                //this.initColumnParams();
                var thead = this.buildThead();
                var tbody = "";
                if (_totalCount != 0) {
                    tbody = this.buildBody(data);
                }
                var pageBarStr = "";
                if (options.usePageBar) {
                    pageBarStr = this.buildPageBar();
                }
                var table = "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"form-list\">";
                table = table + thead + tbody + "</table>" + pageBarStr;
                $this.html($this.html() + table);
            };

            this.renderEmptyTable = function () {
                this.initColumnParams();
                var thead = this.buildThead();
                var table = "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"form-list\">";
                table = table + thead + "</table>";
                return table;
            };

            /* 单选返回值处理函数 */
            this.addSingleSelect = function (val) {
                _singleSelect = val;
            };

            /* 删除单选返回值处理 */
            this.removeSingleSelect = function (val) {
                _singleSelect = undefined;
            };

            /* 复选返回值处理函数 */
            this.addSelect = function (val) {
                _selects.push(val);
            };

            /* 删除复选返回值处理函数 */
            this.removeElement = function (index, array) {
                if (index >= 0 && index < array.length) {
                    for (var i = index; i < array.length; i++) {
                        array[i] = array[i + 1];
                    }
                    array.length = array.length - 1;
                }
                return array;
            };

            /* 删除复选选中项处理函数 */
            this.removeSelect = function (val) {
                for (var i = 0; i < _selects.length; i++) {
                    if (_selects[i] == val) {
                        _selects = this.removeElement(i, _selects);
                    }
                }
            };

            /* 单选的元素是否已经存在 */
            this.checkSingleElementIfExist = function (val) {
                return _singleSelect == val;
            };

            /* 复选的元素是否已经存在 */
            this.checkElementIfExist = function (val) {
                for (var i = 0; i < _selects.length; i++) {
                    if (_selects[i] == val) {
                        return true;
                    }
                }
                return false;
            };

            /* 变更每页显示条数的函数 */
            this.changePageCount = function (val) {
                _pid = 1;
                _pageSize = val;
                this.load();
            };

            /* 点击上一页 */
            this.clickPre = function () {
                if (_pid <= 1) {
                    return;
                }
                _pid--;
                this.load(eval(options.getQueryParams()));
            };

            /* 点击下一页 */
            this.clickNext = function () {
                if (_pid == _totalPage) {
                    return;
                }
                _pid++;
                this.load(eval(options.getQueryParams()));
            };

            /* 点击首页 */
            this.clickFirst = function () {
                _pid = 1;
                this.load(eval(options.getQueryParams()));
            };

            /* 点击尾页 */
            this.clickLast = function () {
                this.loadLast(eval(options.getQueryParams()));
            };

            /* 点击跳转按钮 */
            this.clickGo = function () {
                _pid = $('#_jumpto').val();
                _pid = _pid.replace(/\D/g, '');
                $('#_jumpto').val(_pid);
                this.loadAPage(eval(options.getQueryParams()));
            };

            this.reload = function () {
                _pid = $('#_jumpto').val();
                _pid = _pid.replace(/\D/g, '');
                $('#_jumpto').val(_pid);
                this.loadAPage(eval(options.getQueryParams()));
            }

            /* 处理loading查询条件变更问题 */
            this.processQueryCondition = function (params) {
                if (_lastQueryStr == undefined) {
                    _lastQueryStr = params;
                } else {
                    if (_lastQueryStr != params) {
                        _pid = 1;
                        _selects = new Array();
                        $('#_jumpto').val(1);
                        _lastQueryStr = params;
                    }
                }
                _start = (_pid - 1) * _pageSize;
            };

            /* 处理尾页查询条件变更问题 */
            this.processQueryConditionFinal = function (params) {
                _pid = _totalPage;
                if (_lastQueryStr == undefined) {
                    _lastQueryStr = params;
                } else {
                    if (_lastQueryStr != params) {
                        _queryChange = true;
                        _selects = new Array();
                        _pid = 1;
                        $('#_jumpto').val(1);
                        _lastQueryStr = params;
                    }
                }
                _start = (_pid - 1) * _pageSize;
            };

            /* 处理跳转到某个页面变更问题 */
            this.processAPageQueryCondition = function (params) {
                if (_pid >= _totalPage) {
                    _pid = _totalPage;
                } else if (_pid < 1) {
                    _pid = 1;
                }
                if (_lastQueryStr == undefined) {
                    _lastQueryStr = params;
                } else {
                    if (_lastQueryStr != params) {
                        _pid = 1;
                        _lastData = data;
                        $('#_jumpto').val(1);
                        _lastQueryStr = params;
                    }
                }
                _start = (_pid - 1) * _pageSize;
            };

            /* showLoading */
            function showLoading() {
                _loadingIndex = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            }

            /* hideLoading */
            function hideLoading() {
                layer.close(_loadingIndex);
            }

            /* 通过ajax加载表格，可选无参数或者1个参数*/
            this.load = function (queryMethod) {
                showLoading();
                //alert($this.html());
                if (queryMethod == undefined) {
                    queryMethod = eval(options.getQueryParams());
                }
                var params = eval(queryMethod);
                params = JSON.stringify(params);
                this.processQueryCondition(params);
                if (_start < 0) {
                    _start = 0;
                }
                $.ajax({
                    url: options.store.url + "?requestData=" + encodeURIComponent(params) + "&start="
                    + _start + "&limit=" + _pageSize,
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        hideLoading();
                        _lastData = data;
                        $this.html("");
                        _totalCount = data.totalCount;
                        _totalPage = Math.ceil(_totalCount / _pageSize);
                        if (_pid > _totalPage) {
                            _pid = _totalPage;
                        }
                        t.renderTable(data);
                        options.afterload(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        hideLoading();
                        if ($this.html() == "") {
                            $this.html(_emptyHtml);
                        }
                        var obj = eval("(" + XMLHttpRequest.responseText + ")");
                        if (obj != undefined && obj.errorMsg != "" && obj.errorMsg != undefined) {
                            layer.alert(obj.errorMsg, {
                                icon: 7, shift: -1
                            });
                        }
                    }
                });
            };

            /* 通过ajax加载表格尾页*/
            this.loadLast = function (queryMethod) {
            	showLoading();
                var params = eval(queryMethod);
                params = JSON.stringify(params);
                this.processQueryConditionFinal(params);
                if (_start < 0) {
                    _start = 0;
                }
                $.ajax({
                    url: options.store.url + "?requestData="
                    + encodeURIComponent(params) + "&start=" + _start
                    + "&limit=" + _pageSize,
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                    	hideLoading();
                        _lastData = data;
                        $this.html("");
                        _totalCount = data.totalCount;
                        _totalPage = Math.ceil(_totalCount / _pageSize);
                        _pid = _totalPage;
                        if (_queryChange) {
                            _pid = 1;
                            _queryChange = false;
                        }
                        t.renderTable(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        hideLoading();
                        if ($this.html() == "") {
                            $this.html(_emptyHtml);
                        }
                        var obj = eval("(" + XMLHttpRequest.responseText + ")");
                        if (obj != undefined && obj.errorMsg != "" && obj.errorMsg != undefined) {
                            layer.alert(obj.errorMsg, {
                                icon: 7, shift: -1
                            });
                        }
                    }
                });
            };

            /* 通过ajax加载表格某页*/
            this.loadAPage = function (queryMethod) {
                showLoading();
                var params = eval(queryMethod);
                params = JSON.stringify(params);
                this.processAPageQueryCondition(params);
                if (_start < 0) {
                    _start = 0;
                }
                $.ajax({
                    url: options.store.url + "?requestData="
                    + encodeURIComponent(params) + "&start=" + _start
                    + "&limit=" + _pageSize,
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        hideLoading();
                        _lastData = data;
                        var _jumpto = $("#_jumpto").val();
                        _totalCount = data.totalCount;
                        $this.html("");
                        //_totalCount = data.totalCount;
                        _totalPage = Math.ceil(_totalCount / _pageSize);
                        if (_jumpto > _totalPage) {
                            _pid = _totalPage;
                        } else {
                            _pid = _jumpto;
                        }
                        t.renderTable(data);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        hideLoading();
                        if ($this.html() == "") {
                            $this.html(_emptyHtml);
                        }
                        var obj = eval("(" + XMLHttpRequest.responseText + ")");
                        if (obj != undefined && obj.errorMsg != "" && obj.errorMsg != undefined) {
                            layer.alert(obj.errorMsg, {
                                icon: 7, shift: -1
                            });
                        }
                    }
                });
            };

            _emptyHtml = this.renderEmptyTable();

            /* 自动加载与否 */
            if (options.autoLoad) {
                this.load();
            }

            /* 获取选中的值 */
            this.getSelects = function () {
                if (options.checkStyle == "single") {
                    var selectIds = [];
                    selectIds[0] = _singleSelect;
                    return selectIds;
                } else {
                    return _selects;
                }
            };

            /* 获取选中的值 */
            this.getSelectsRecord = function () {
                if (options.checkStyle == "single") {
                    var _returns = [];
                    _returns[0] = _selectMap.get(_singleSelect);
                    return _returns;
                } else {
                    return _selects;
                }
                //alert(_singleSelect);
                //var returns = [];
                //if (options.checkStyle == "single") {
                //    var list = _lastData.resultList;
                //    for (var i = 0; i < list.length; i++) {
                //        if (list[i].id == _singleSelect) {
                //            returns[0] = list[i];
                //            break;
                //        }
                //    }
                //    return returns;
                //} else {
                //    return _selects;
                //}
            };
            return this;
        }

        return _bestoTable;
    };
});
