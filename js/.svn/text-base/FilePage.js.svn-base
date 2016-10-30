/***
 * 文件页面管理器
 *
 *
 * 局部变量
 * this.treeView : 文件树列表
 * this.gridView : 文件夹列表
 * this.gridSelectFileIndex : 文件夹选择index, 文件夹列表获取当前选择文件this.gridView.adapter.obj[this.gridSelectFileIndex]
 * this.treeSelectFile : 文件数列表当前选择的状态
 * this.treeSelectFileHistorys : 文件数列表选择历史列表
 * this.mPasteInfo : {file, path, type(1剪贴 2复制)}
 *
 * 类:
 * File:
 * t:(type)类型1目录, 0是文件
 * f:(files)子目录文件
 * n:(name)文件名称
 * p:(parent)父节点
 * open:是否打开true为打开状态, false为未打开状态.做展示标记使用
 * isLoad: 是否已经获取到数据
 *
 * */

var FilePage = {
    /**
     * 初始化函数
     */
    init(){
        this.self = this;
        //初始化历史记录
        this.treeSelectFileHistorys = new Historys();

        this.initEvent();
        this.initRequestData();
    },

    /**
     * 方法绑定,获取id为fileTopbar下以fileFun开头的函数
     */
    initEvent(){
        var binds = [$("#fileTopbar")[0],
                     $("#filePathbar")[0]];
        for(var node of binds){
            for (var i = 0; i < node.children.length; i++) {
                var nodeId = node.children[i].id;
                if (nodeId != undefined && nodeId.indexOf("fileFun") == 0) {
                    var fun = this["on" + nodeId.replace("file", "")];
                    if (fun) {
                        EventUtil.addHandle($("#" + nodeId)[0], 'click', fun.bind(this));
                    }
                }
            }
        }

        //搜索回车事件处理
        EventUtil.addHandle($("#fileSearchInputView")[0], "keyup", this.onFunSearchKeyEvent.bind(this));
    },

    /**
     * 初始化数据
     */
    initRequestData(){
        //获取根目录数据
        var rootFile = {
            t: 1,
            n: "/",
            f: []
        };
        this.onFileRequest(rootFile);
    },

    openFilePath: function (filePath) {
        //alert(filePath);
    },

    /**
     * 新建文件夹事件
     */
    onFunNewFolder(){
        console.log("================新建=====================");
        if (this.treeSelectFile) {
            var name = prompt("请输入文件夹名称");
            if (name != null) {
                var selectFilePath = this.getTreeFilePath(this.treeSelectFile);
                var toFile = selectFilePath + "/" + name;
                console.log("新建文件路径:" + toFile);
                var cmd = '{"CMD":"File","-mkdir":"' + toFile + '"}';
                var http = new SRHttpManager();
                http.requestAwebCmd(cmd, this.doFileCommCallback.bind(this, "Protocol_NewFolder"));
            }
        }
    },

    /**
     * 搜索事件
     */
    onFunSearch(){
        if (this.treeSelectFile && this.treeSelectFile.f) {
            this.refreshGridView(this.treeSelectFile.f);
        }
    },

    /**
     * 搜索事件
     * @param event
     */
    onFunSearchKeyEvent(event){
        if (event.keyCode == 13) {
            //回车事件
            this.onFunSearch();
        }
    },


    /**
     * 刷新事件
     */
    onFunRefresh(){
        //alert('刷新');
        console.log("================刷新=====================");

        if (this.treeSelectFile) {
            if (this.treeSelectFile.t == 1) {
                //文件夹
                this.onFileRequest(this.treeSelectFile, this.treeView.getElementsByFile(this.treeSelectFile));
            } else {
                //文件
                this.onFileRequest(this.treeSelectFile.p, this.treeView.getElementsByFile(this.treeSelectFile));
            }
        }
    },

    /**
     * 重命名事件
     */
    onFunRename(){
        console.log("================重命名事件=====================");
        if (this.gridSelectFileIndex >= 0) {
            var file = this.gridView.adapter.obj[this.gridSelectFileIndex];
            var name = prompt("请输入文件名", file.n);
            if (name != null && file.n != name) {
                var fromFile = this.getTreeFilePath(file);
                var toFile = StringUtil.getFilePath(fromFile) + name;
                console.log("fromFile:" + fromFile);
                console.log("toFile:" + toFile);
                //  /sdcard/1/  /sdcard/2/
                //  /sdcard/1.txt /sdcard/2.txt
                var cmd = '{"CMD":"File","-move":"","-from":"' + fromFile + '","-to":"' + toFile + '"}';
                var http = new SRHttpManager();
                http.requestAwebCmd(cmd, this.doFileCommCallback.bind(this, "Protocol_Rename"));
            }
        }
    },

    onFunCut(){
        console.log("================剪贴=====================");
        var file = this.gridView.adapter.obj[this.gridSelectFileIndex];
        if (file) {
            this.mPasteInfo = {
                filePath: FilePage.getTreeFilePath(file),
                t: file.t,
                type: 1
            };
            this.refreshFunViewStatus();
        }
    },

    onFunCopy(){
        console.log("================复制=====================");
        var file = this.gridView.adapter.obj[this.gridSelectFileIndex];
        if (file) {
            this.mPasteInfo = {
                filePath: FilePage.getTreeFilePath(file),
                t: file.t,
                type: 2
            };
            this.refreshFunViewStatus();
        }
    },

    onFunPaste(){
        console.log("================粘贴=====================");
        if (this.mPasteInfo != null && this.treeSelectFile != null) {
            var fromFile = this.mPasteInfo.filePath;
            //如果后缀不为空则名字加(1)
            //foo.txt => foo(1).txt
            //foo     => foo(1)
            var fileName = StringUtil.getFileName(fromFile);
            var prefixName = StringUtil.getFileNamePrefix(fileName) ;
            var suffixName = StringUtil.getFileNameSuffix(fileName);
            var toFile = this.getTreeFilePath(this.treeSelectFile)
                            + "/" + prefixName
                            + "(1)" + (suffixName ? "." + suffixName : "");
            console.log("fromFile:" + fromFile);
            console.log("toFile:" + toFile);

            var cmd = null;
            if (this.mPasteInfo.type == 1) {
                cmd = '{"CMD":"File","-move":"","-from":"' + fromFile + '","-to":"' + toFile + '"}';
            } else if (this.mPasteInfo.type == 2) {
                cmd = '{"CMD":"File","-copy":"","-from":"' + fromFile + '","-to":"' + toFile + '"}';
            }

            var http = new SRHttpManager();
            http.requestAwebCmd(cmd, this.doFileCommCallback.bind(this, "Protocol_Paste"));
        }
    },

    onFunDelete(){
        console.log("================删除=====================");
        var file = this.gridView.adapter.obj[this.gridSelectFileIndex];
        if (file != null) {
            var r = confirm("删除文件:" + file.n);
            if (r == true) {
                var filePath = this.getTreeFilePath(file);
                var isDirectory = file.t == 1;
                console.log("删除文件路径:" + filePath);
                var cmd = '{"CMD":"File","-delete":"' + filePath + '", "-r":" ' + isDirectory + '"}';
                var http = new SRHttpManager();
                http.requestAwebCmd(cmd, this.doFileCommCallback.bind(this, "Protocol_Delete"));
            }
        }
    },

    onFunDownload(){
        // var params ={
        //     'header':{"device":"web","version":"0.1"},
        //     'token': "4180fafe-86d1-4ede-a86b-4c6d52b44135",
        //     'method':'GetFile'
        // };
        //
        // var requestInfo = new Object();
        // requestInfo.params = params;
        // requestInfo.callback = this;
        //
        // var http = new SRHttpManager();
        // http.requestInfo(requestInfo, this.requestFileCallback.bind(this));
        
    },

    requestFileCallback(response){
        console.log("");
    },

    /**
     * 上传事件
     */
    onFunUpload(){
        alert('上传');

    },

    /**
     * 文件历史记录,上一次点击
     */
    onFunHistoryBefore(){
        console.log("onFileFunHistoryBefore");
        var beforeFile = this.treeSelectFileHistorys.before;
        if (beforeFile) {
            this.refreshTreeViewOfFile(beforeFile, "History");
        }
    },

    /**
     * 文件历史记录,当前点击
     */
    onFunHistoryCurrent(){
        console.log("onFileFunHistoryCurrent");
        var currentFile = this.treeSelectFileHistorys.current;
        if (currentFile) {
            this.refreshTreeViewOfFile(currentFile, "History");
        }
    },

    /**
     * 文件路径click
     */
    onFilePathListViewClick(event){
        var li = event.target;
        var file = li.file;
        if (file) {
            var divFile = this.treeView.getElementsByFile(file);
            if (divFile != null) {
                file.open = false; //单击前改变状态
                var clickEvent = document.createEvent("HTMLEvents");
                clickEvent.initEvent("click");
                divFile.dispatchEvent(clickEvent);
                return true;
            }
        }
    },



    /**
     * 刷新按钮状态
     */
    refreshFunViewStatus(){
        console.log("===========refreshFunViewStatus============");
        var isSelect = this.gridSelectFileIndex != -1;
        if (this.gridSelectFileIndex != -1) {
            //有选择的文件
            document.getElementById("fileFunRename").disabled = false;
            document.getElementById("fileFunCut").disabled = false;
            document.getElementById("fileFunCopy").disabled = false;
            document.getElementById("fileFunDelete").disabled = false;
        } else {
            //没有选择的文件
            document.getElementById("fileFunRename").disabled = true;
            document.getElementById("fileFunCut").disabled = true;
            document.getElementById("fileFunCopy").disabled = true;
            document.getElementById("fileFunDelete").disabled = true;
        }

        document.getElementById("fileFunPaste").disabled = (this.mPasteInfo == null);


        //文件列表
        this.refreshFilePathListView();
        this.refreshFileStatusView();
    },

    /**
     * 刷新文件列表
     */
    refreshFilePathListView(){
        var filePathListView = document.getElementById("filePathListView");
        filePathListView.innerHTML = "";
        if (this.treeSelectFile) {
            var file = this.treeSelectFile;
            while (file) {
                var li = document.createElement("li");
                li.innerHTML = file.n;
                li.file = file;
                EventUtil.addHandle(li, "click", this.onFilePathListViewClick.bind(this), false);

                file = file.p;
                if (filePathListView.firstChild) {
                    var textView = document.createTextNode(">");
                    filePathListView.insertBefore(textView, filePathListView.firstChild);
                }
                filePathListView.insertBefore(li, filePathListView.firstChild);
            }
        }
    },

    /**
     * 刷新状态类
     */
    refreshFileStatusView(){
        if(this.gridSelectFileIndex == -1){
            var fileStatusView = document.getElementById("fileStatusView");
            fileStatusView.style.display= "none";
        }else{
            var fileStatusView = document.getElementById("fileStatusView");
            fileStatusView.style.display= "flex";
            var file = this.gridView.adapter.obj[this.gridSelectFileIndex];
            var fileStatusImgView = document.getElementById("fileStatusImgView");
            var fileStatusNameView = document.getElementById("fileStatusNameView");
            var fileStatusInfoView = document.getElementById("fileStatusInfoView");

            if (file.t == 1) {
                fileStatusImgView.src = "img/grid_dir.png";
                fileStatusImgView.className = "gridView_folder_img";
                fileStatusNameView.innerHTML = file.n;
                fileStatusInfoView.style.display="none";
            } else {
                fileStatusImgView.src = "img/fm_icon_default.png";
                fileStatusImgView.className = "gridView_file_img";
                fileStatusNameView.innerHTML = file.n;
                fileStatusInfoView.style.display="block";
                
                fileStatusInfoView.innerHTML = DateUtil.formatDate(file.date)  + "  Size:" + file.size;
            }
        }
    },

    getTreeFilePath(file){
        var path = null;
        var parentFile = file;

        do {
            if (path) {
                path = parentFile.n + "/" + path;
            } else {
                path = parentFile.n;
            }

            parentFile = parentFile.p;
        } while (parentFile);
        console.log("=====转换请求文件路径>>>>>>");
        console.log(file);
        console.log(path);
        console.log("=====转换请求文件路径<<<<<<");
        return path;
    },

    getTreeFileParent(file){
        var parentFile = file;
        while (parentFile) {
            if (!parentFile.p) {
                return parentFile;
            }
            parentFile = parentFile.p;
        }
        return parentFile;
    },


    /**
     * 请求文件列表
     * @param requestFile
     * @param target
     */
    onFileRequest(requestFile, target){
        var pathParam = this.getTreeFilePath(requestFile);
        console.log("onTreeRequest>> pathParam:" + pathParam);
        var cmd = '{"CMD":"File","-ls":"' + pathParam + '"}';
        var http = new SRHttpManager();
        http.requestAwebCmd(cmd, this.doFileRequestCallback.bind(this, requestFile, target));
    },

    /**
     * 文件请求回调
     * @param requestFile
     * @param target
     * @param response
     */
    doFileRequestCallback(requestFile, target, response){
        console.log("===========doTreeRequest callback===========");

        var resultFiles = response.result;
        var file = requestFile;
        file.f = resultFiles;
        file.open = true; //状态为打开
        file.isLoad = true; //数据已加载
        console.log(file);
        if (this.treeView) {
            this.treeView.requestLayout(file, target);
        } else {
            //初始化treeView
            var option = {
                files: this.getTreeFileParent(file),
                rootId: "fileTreeView",
                onTreeFolderClick: this.onTreeFolderClick.bind(this)
            };
            var treeView = createSRTreeView(option);
            treeView.layout();
            this.treeView = treeView;
        }

        //刷新grid和功能按钮
        this.refreshGridView(file.f);
        this.refreshFunViewStatus();
    },

    /**
     * 共用文件请求,成功刷新当前目录,失败进行显示
     * @param response
     */
    doFileCommCallback(protocol, response){
        console.log("===========doFileRenameCallback callback===========");
        console.log(response);
        var result = response.result;
        if (result) {
            //重命名成功
            this.onFunRefresh();
        }

        if ("Protocol_Paste" == protocol) {
            this.mPasteInfo = null;
        }
    },

    /**
     * 通过文件刷新tree,
     */
    refreshTreeViewOfFile(file, from){
        var divFile = this.treeView.getElementsByFile(file);
        if (divFile != null) {
            var clickEvent = document.createEvent("HTMLEvents");
            clickEvent.initEvent("click");
            clickEvent.from = from;
            divFile.dispatchEvent(clickEvent);
            return true;
        }
        return false;
    },

    /**
     * treeView点击事件
     * @param target
     * @param file
     * @returns {boolean}
     */
    onTreeFolderClick(file, event){
        console.log("tree click");
        //保存当前选择变量与历史记录
        if(!file.p){
            //防止根目录闭合
            file.open = false;
        }

        if(event.from != "History"){
            this.treeSelectFileHistorys.add(file);
        }
        if (file.isLoad) {
            this.treeSelectFile = file.open ? file.p : file;
            this.refreshGridView(this.treeSelectFile.f);
            this.refreshFunViewStatus();
        } else {
            this.treeSelectFile = file;
            this.onFileRequest(file, this.treeView.getElementsByFile(file));
            return true;
        }
    },

    /**
     * 搜索过滤
     * @param file
     * @returns {*}
     */
    doFileSearchFilter(file){
        var inputView = document.getElementById("fileSearchInputView");
        var value = inputView.value;
        //如果file未空或value为空字符串都直接返回
        if (!file || value == "") {
            return file;
        }
        //搜索不区分大小写,并且支持正则
        var fileList = new Array();
        for (var i = 0; i < this.treeSelectFile.f.length; i++) {
            var f = this.treeSelectFile.f[i];
            if (f.n.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) != -1) {
                fileList.push(f);
            } else if (new RegExp(value).test(f.n)) {
                fileList.push(f);
            }
        }
        return fileList;
    },

    /**
     * 刷新gridView
     * @param file
     */
    refreshGridView(file){
        this.gridSelectFileIndex = -1; //gridView标记清空
        var fileFilterResult = this.doFileSearchFilter(file);
        var option = {
            rootId: "fileView",
            onItemClick: this.onGridViewItemClick.bind(this),
            onItemDbClick: this.onGridViewItemDbClick.bind(this)
        };
        this.gridView = createSRGridView(option);

        var adapter = this.onCreateGirdViewAdapter(fileFilterResult);
        this.gridView.adapter = adapter;
        this.gridView.layout();
    },

    onCreateGirdViewAdapter(files){
        var adapter = new Object();
        adapter.obj = files;
        adapter.getCount = function () {
            return this.obj.length;
        };
        adapter.getView = function (count) {
            var file = this.obj[count];

            // <div class="gridItem" style="width: 80px;text-align: center;">
            //     <img src="img/grid_dir.png">
            //         <div class="gridItemText">ddd22222222222</div>
            // </div>
            var div = document.createElement("div");
            if (FilePage.gridSelectFileIndex == count) {
                div.className = "gridSelectItem";
            } else {
                div.className = "gridItem";
            }


            var img = document.createElement("img");
            if (file.t == 1) {
                img.src = "img/grid_dir.png";
                img.className = "gridView_folder_img";
            } else {
                img.src = "img/fm_icon_default.png";
                img.className = "gridView_file_img";
            }

            var textDiv = document.createElement("div");
            textDiv.className = "gridView_item_text";
            var textView = document.createTextNode(file.n);
            textView.className = "gridView_item_text";
            textDiv.appendChild(document.createTextNode(file.n));

            div.appendChild(img);
            div.appendChild(textDiv);
            return div;
        };
        return adapter;
    },

    onGridViewItemClick(index){
        console.log("onGridViewItemClick index:" + index);
        this.gridSelectFileIndex = index;
        this.gridView.layout();
        this.refreshFunViewStatus();
    },

    onGridViewItemDbClick(index){
        console.log("onGridViewItemDbClick index:" + index);

        var adapter = this.gridView.adapter;
        var file = adapter.obj[index];
        console.log(file);

        if (file.t == 1) {
            //如果是文件夹,则模拟treeview点击事件
            return this.refreshTreeViewOfFile(file);
        } else {
            //如果是文件于打击处理相同
            this.onGridViewItemClick(index);
        }
    }


};

function Historys() {
    this.data = [null, null];
    this.before = this.data[0];
    this.current = this.data[1];
    this.add = function (obj) {
        this.data[0] = this.data[1];
        this.data[1] = obj;
        this.before = this.data[0];
        this.current = this.data[1];
    };
}


