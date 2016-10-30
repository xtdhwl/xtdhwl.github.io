/**
 * Created by xtdhwl on 9/3/16.
 */

var eventBind = window.addEventListener? "addEventListener" : "attachEvent";
var eventUnbind = window.removeEventListener? "removeEventListener" : "detachEvent";
var eventPrefix = eventBind !== 'addEventListener' ? 'on' : '';


var EventUtil ={
    addHandle: function(element , type, handle, capture){
        element[eventBind](eventPrefix + type, handle, capture || false);
    },

    removeHandler: function (element , type, handle, capture) {
        element[eventUnbind](eventPrefix + type, handle, capture || false);
    },

    getEvent: function(event){
        return event? event : window.event;
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },

    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }

};