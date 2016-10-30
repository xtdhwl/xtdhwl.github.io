/**
 * Created by xtdhwl on 9/3/16.
 */


(function init(){
    var script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = './js/util/EventUtil.js'
    document.body.appendChild(script);
    console.log("EventUtil init");

})();

var PageManager ={
    
    loadJs: function(src){
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = src;
        document.body.appendChild(script);
    }
}

// var PageManager = function PageManager(){
//
// };
//
// PageManager.prototype.loadJs = function (src) {
//     var script = document.createElement("script");
//     script.type = 'text/javascript';
//     script.src = src;
//     document.body.appendChild(script);
// }

function addPage(){

}

function removePage(){

}

