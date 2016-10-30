/**
 * Created by xtdhwl on 9/11/16.
 */

//<div data-f="Download" data-t="1" data-open="true"><div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">&gt;</span>Download<div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div><div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div><div data-f="1" data-t="0"><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">|</span><span class="treeView">-</span>1</div></div>

//t类型(type) 1文件夹 0是文件 n
//n名称(name)
//f子文件夹(files)
//open是否打开目录
//{"sdcard":{"t":1,"n":"sdcard",
//          "f":[{"t":1,"n":"Home"},
//                {"t":1,"n":"Download"
//                  ,"f":[{"t":0,"n":1},
//                        {"t":0,"n":1},
//                        {"t":0,"n":1},
//                        {"t":0,"n":1}
//               ]
// }]}}

/**
 * GridView
 * rootId:          根div元素id
 * onItemClick:     item单击事件
 * onItemDbClick:   item双击事件
 * adapter:         内容适配器
 *
 *
 * adapter内容适配器
 *          getCount():返回item个数
 *          getView(): 返回对应view
 * @param option
 * @returns {Object}
 */
function createSRGridView(option){
    var o = new Object();
    o.columnWidth = option.columnWidth;
    o.numColumns = option.numColumns;
    o.verticalSpacing = option.verticalSpacing;
    o.horizontalSpacing = option.horizontalSpacing; 
    o.onItemClick = option.onItemClick;
    o.onItemDbClick = option.onItemDbClick;

    o.rootId = option.rootId;

    //调试
    o.debug = true; 
    o.adapter = null;
    o.layout= _gridViewLayout;
    o._layoutNumColumns = _layoutNumColumns;
    o._layoutNotNumColumns = _layoutNotNumColumns;
    o._onGridViewItemClick= _onGridViewItemClick;
    o._onGridViewItemDbClick = _onGridViewItemDbClick;
    return o;
}


/**
 * layout()布局
 * @private
 */
function _gridViewLayout(){
    console.log("gridViewLayout");
    if(this.numColumns){
        this._layoutNumColumns();
    }else{
        this._layoutNotNumColumns();
    }
}

/**
 * 默认为Flex布局(@see:https://developer.mozilla.org/en-US/docs/Web/CSS/flex)
 * 1: 初始化元素并且设置class为sr_GridView
 * 2: 设置itemindex属性作为item的index标记,并且绑定事件
 * @private
 */
function _layoutNotNumColumns(){
    var rootNode = document.getElementById(this.rootId);
    console.log(rootNode);
    rootNode.className = "sr_GridView";
    rootNode.innerHTML = "";

    for(var i =0 ; i< this.adapter.getCount(); i++){

        var view = this.adapter.getView(i);
        view.setAttribute("data-itemindex", i) ;

        rootNode.appendChild(view);
        EventUtil.addHandle(view, "click", this._onGridViewItemClick.bind(this), true);
        EventUtil.addHandle(view, "dblclick", this._onGridViewItemDbClick.bind(this), true);
    }
}

function _layoutNumColumns(){
    var rootNode = document.getElementById(this.rootId);
    rootNode.innerHTML = "";

    for(var i =0 ; i< this.adapter.getCount(); i+=this.numColumns){
        var divColumn = document.createElement("div");
        divColumn.className = "sr_GridViewColumn";
        for(var j = 0; j < this.numColumns ; j++){
            var index = i + j;
            if(index >= this.adapter.getCount()){
                break;
            }
            var view = this.adapter.getView(index);
            view.setAttribute("data-itemindex", index) ;

            divColumn.appendChild(view);
            EventUtil.addHandle(view, "click", this._onGridViewItemClick.bind(this), true);
            EventUtil.addHandle(view, "dblclick", this._onGridViewItemDbClick.bind(this), true);
        }
        rootNode.appendChild(divColumn);
    }
}

/**
 * 点击事件
 * @param event
 */
function _onGridViewItemClick(event){
    console.log("_onGridViewItemClick");
    //event.stopPropagation();
    console.log(event);
    var target = event.target;
    if(target.dataset.itemindex == undefined){
        target = event.target.parentNode;
    }
    var index = target.dataset.itemindex;
    if(this.onItemClick){
        this.onItemClick(index);
    }
}

/**
 * 双击事件
 * @param event
 */
function _onGridViewItemDbClick(event){
    console.log("_onGridViewItemDbClick");
    //event.stopPropagation();
    console.log(event);
    var target = event.target;
    if(target.dataset.itemindex == undefined){
        target = event.target.parentNode;
    }
    var index = target.dataset.itemindex;
    if(this.onItemDbClick){
        this.onItemDbClick(index);
    }
}

