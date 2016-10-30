/**
 * Created by xtdhwl on 9/4/16.
 */

var Color_MainFun_background = 'gainsboro';
var Color_MainFun_background_Select = '#b3b3b3';

(function init() {
    
    funListInit();
    showFilePage();//打开文件管理器
})();


function funListClick(event){
    var li = event.target;
    var funname = li.dataset.funname;
    console.log("选择了功能表 funname:" + funname);
    if(funname == "file"){
        showFilePage();
    }else if(funname == "english") {

    }else if(funname == "terminal") {

    }
}

function showFilePage(){
    var htmlobj=$.ajax({url:"/aweb/src/html/FilePage.html",async:false});
    console.log(htmlobj);
    console.log(htmlobj.responseText);

    var appContent = document.getElementById("appContent");
    appContent.innerHTML = htmlobj.responseText;


    // var filePage  = new FilePage();
    // filePage.init();
    FilePage.init();
}



function showFilePage2(){
    var frame = document.createElement("frame");
    frame.src = 'test2.html';


    var frameset = document.createElement("frameset");
    //
    var appContent = document.getElementById("appContent");
    //
    //
    appContent.appendChild(frameset);
    frameset.appendChild(frame);
    console.log(frame);
    console.log(frame.innerHTML);

}

function funListInit() {
    var funLists = $(".funList");
    for(var i=0; i<  funLists.length; i++){
        var funList = funLists[i];
        console.log(funList);
        for(var j=0; j<  funList.children.length; j++){
            var li = funList.children[j];
            li.onclick = function(event){
                funListClienSelect();
                event.target.style.background = Color_MainFun_background_Select;
                funListClick(event);
            }
            if(j==0){
                li.style.background = Color_MainFun_background_Select;
            }
        }
    }
}

function funListClienSelect(){
    var funLists = $(".funList");
    for(var i=0; i<  funLists.length; i++){
        var funList = funLists[i];
        console.log(funList);
        for(var j=0; j<  funList.children.length; j++){
            var li = funList.children[j];
            li.style.background = Color_MainFun_background;
        }
    }
}