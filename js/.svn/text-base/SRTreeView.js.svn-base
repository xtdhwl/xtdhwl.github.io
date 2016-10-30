/**
 * Created by xtdhwl on 9/11/16.
 */

//<div data-f="Download" data-t="1" data-open="true"><div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">&gt;</span>Download<div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div><div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div><div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div></div>

//t类型(type) 1文件夹 0是文件 n
//n名称(name)
//f子文件夹(files)
//open是否打开目录
//isLoad 是否已经加载(请求设备内容)
//{"sdcard":{"t":1,"n":"sdcard",
//          "f":[{"t":1,"n":"Home"},
//                {"t":1,"n":"Download"
//                  ,"f":[{"t":0,"n":1},
//                        {"t":0,"n":1},
//                        {"t":0,"n":1},
//                        {"t":0,"n":1}
//               ]
// }]}}

//TreeNode
// parent
// childs
// type:
// open:
// isLoad: true 已经加载完成 false为加载数据
// state: 0正确 1请求中

function createSRTreeView(option){
    var o = new Object();
    o.files = option.files;
    o.onTreeFileClick = option.onTreeFileClick;
    o.onTreeFolderClick = option.onTreeFolderClick;
    o.rootId = option.rootId;

    //调试
    o.debug = false;  
    o.layout= _treeViewLayout;
    o.requestLayout = _treeViewRequestLayout;
    o.treeViewConvert= _treeViewConvert;
    o.treeViewCreateFileDiv = _treeViewCreateFileDiv;
    o.treeViewCreateFolderDiv = _treeViewCreateFolderDiv;
    o.treeViewOpenFileClick = _treeViewOpenFileClick;
    o.treeViewOpenFolderClick = _treeViewOpenFolderClick;
    o.treeViewFileMapGetKey = _treeViewFileMapGetKey;
    o.getElementsByFile = _treeViewGetElementsByFile;
    return o;
}

/**
 * 布局
 * 1: 把file树形结构转换为div树结构
 * 2: 把rootId内容清空,把div树绘制
 * @private
 */
function _treeViewLayout(){
    //文件与 node 对应表 
    var treeHtml = this.treeViewConvert(null, this.files);

    console.log(treeHtml);

    var treeView = document.createElement("div");
    treeView.className = "sr_TreeView";
    treeView.appendChild(treeHtml);

    var rootTreeView = document.getElementById(this.rootId);
    rootTreeView.innerHTML="";
    rootTreeView.appendChild(treeView);
}

/**
 * 刷新文件列表
 * 1: 把file树形结构转换为div树结构
 * 2: 把div树赋给当前节点
 * @param files
 * @param target
 * @private
 */
function _treeViewRequestLayout(files, target){
    //文件与 node 对应表  
    var fileTree = this.treeViewConvert(null, files);
    target.parentNode.replaceChild(fileTree, target);
}

/**
 * 创建treeview的html5
 * @param file
 * @returns {Element}
 */
function _treeViewConvert(tree, file){
    if(file.t == 1){
        //文件夹
        var subTree = this.treeViewCreateFolderDiv(file);
        if(tree ==null){
            tree = subTree;
        }else{
            tree.appendChild(subTree);
        }

        if(file.f){ //判断是否有子目录
            for(var i=0; i< file.f.length; i++){
                var subFile = file.f[i];
                if(file.open){
                    subFile.p = file;
                    subFile.open = false;
                    this.treeViewConvert(tree, subFile);
                }
            }
        }

    }else{
        //文件
        // var subTree = this.treeViewCreateFileDiv(file);
        // if(tree ==null){
        //     tree = subTree;
        // }else{
        //     tree.appendChild(subTree);
        // }
    }
    return tree;
}

/**
 * 创建treeview中的文件html5
 * @param file
 * @returns {Element}
 */
function _treeViewCreateFileDiv(file){
    console.log("---createFileDiv START---");
    console.log(file);

    var div = document.createElement("div");
    EventUtil.addHandle(div, "click", this.treeViewOpenFileClick.bind(this), false);
    do{
        var p = p != null ? p.p : file.p;

        var span = document.createElement("span");
        span.className = "sr_TreeViewSpan";

        if(div.children.length == 0){ //第一个元素
            span.appendChild(document.createTextNode("-"));
            div.appendChild(span);
        }else{
            span.appendChild(document.createTextNode("|"));
            div.insertBefore(span, div.lastChild);
        }
    }while(p);
    div.appendChild(document.createTextNode(file.n));
    div.file = file; 
    console.log(div);
    console.log("---createFileDiv END---");
    return div;
}

/**
 * 创建treeview中的文件夹html5
 * @param file
 * @returns {Element}
 */
function _treeViewCreateFolderDiv(file){
    console.log("---createFolderDiv START---");
    console.log(file);

    var div = document.createElement("div");
    if(file.open != null){
        div.setAttribute("data-open", file.open) ;
    }
    EventUtil.addHandle(div, "click", this.treeViewOpenFolderClick.bind(this), false);

    do{
        var p = p != null ? p.p : file.p;

        var span = document.createElement("span");
        span.className = "sr_TreeViewSpan";

        if(div.children.length == 0){ //第一个元素
            span.appendChild(document.createTextNode(file.open ? ">" : "+"));
            div.appendChild(span);
        }else{
            span.appendChild(document.createTextNode("|"));
            div.insertBefore(span, div.lastChild);
        }
    }while(p);
    div.appendChild(document.createTextNode(file.n));
    div.file = file; 
    console.log(div);
    console.log("---createFolderDiv END---");
    return div;
}

/**
 * 文件点击事件
 * @param event
 */
function _treeViewOpenFileClick(event){
    console.log("openFileClick");
    event.stopPropagation();
    var target = event.target;
    if(target.nodeName.toLocaleLowerCase() != "div"){
        target = event.target.parentNode;
    }

    var file = this.treeViewFileMapGetKey(target);
    //文件回调
    if(this.onTreeFileClick){
        if(this.onTreeFileClick(target, file)){
            return;
        }
    }
}

//文件夹点击事件
function  _treeViewOpenFolderClick(event){
    console.log("openFolderClick");
    event.stopPropagation();
    var target = event.target;
    if(target.nodeName.toLocaleLowerCase() != "div"){
        target = event.target.parentNode;
    }

    var file = this.treeViewFileMapGetKey(target);
    //文件夹回调
    if(this.onTreeFolderClick){
        if(this.onTreeFolderClick(file, event)){
            return;
        }
    }


    if(file.open){
        //本文件夹与子文件状态改为未打开
        file.open = false;
        //刷新html
        console.log(target.childNodes);
        var removeChilds = new Array();
        for(var i = 0; i< target.childNodes.length;i++) {
            var subChild = target.childNodes[i];
            if (subChild.nodeName.toLocaleLowerCase() == "div") {
                removeChilds.push(subChild);
            } else if (subChild.nodeName.toLocaleLowerCase() == "span") {
                if (subChild.innerText == ">") {
                    subChild.innerText = "+";
                }
            }
        }
        for(var sub of removeChilds){
            target.removeChild(sub);
        }
    }else{
        file.open = true;
        var fileTree = this.treeViewConvert(null, file);
        target.parentNode.replaceChild(fileTree, target);
    }

}

//通过value获取map中的key
function _treeViewFileMapGetKey(target){ 
    return target.file;
}

/**
 * 获取所有div, 通过file对象判断
 * @param file
 * @returns {*}
 * @private
 */
function _treeViewGetElementsByFile(file){
    var rootTreeView = document.getElementById(this.rootId);
    var divList = rootTreeView.getElementsByTagName("div");
    for(var i= 0; i < divList.length ; i++){
        var div = divList[i];
        if(div.file == file){
            return div;
        }
    }
    return null;
}

