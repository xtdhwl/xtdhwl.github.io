/**
 * sr http类
 * Created by xtdhwl on 9/27/16.
 */


function SRHttpManager(){
    
}

SRHttpManager.prototype.requestInfo = function(requestInfo){

    requestInfo.url = "http://192.168.0.105:8080/Aweb/userAction";
    requestInfo.json = JSON.stringify(requestInfo.params != null ? requestInfo.params : "");


    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        var responseText = xhr.responseText;
        var response = JSON.parse(responseText);
        if(requestInfo.callback){
            response.result = JSON.parse(response.result).result;
            requestInfo.callback(response)
        }
    };
    xhr.error = function(){
        if(requestInfo.callback){
            var response = new Object();
            response.exception = true;
            response.msg="error";
            response.code = -1; 
            requestInfo.callback(response)
        }
    };
    xhr.progress = function (loaded,total) {
        console.log("loaded:" + loaded + ",total:" + total);
    };
    xhr.open('POST', requestInfo.url);

    if(!requestInfo.json){
        requestInfo.updateJson();
    }
    xhr.send(requestInfo.json);
};

/**
 * 请求方法为AwebCmd的请求
 * @param cmd
 * @param callback
 */
SRHttpManager.prototype.requestAwebCmd = function(cmd, callback){
    var params ={
        'header':{"device":"web","version":"0.1"},
        'token': "4180fafe-86d1-4ede-a86b-4c6d52b44135",
        'method':'AwebCmd',
        'params':{"aweb":"a2fdb12bb292318624fbe00391d0ba45",
            "time":"60",
            "cmd":JSON.parse(cmd)
        }
    };

    var requestInfo = new Object();
    requestInfo.params = params;
    requestInfo.callback = callback;

    this.requestInfo(requestInfo);
};

