/**
 * Created by xtdhwl on 10/7/16.
 */



var StringUtil ={

    /**
     * 获取文件路径
     * 目录:/sdcard/1
     *     /sdcard/1/     返回/sdcard/
     * 文件:/sdcard/1.txt
     *     /sdcard/1.txt/ 返回/sdcard/
     * @param filePath
     */
    getFilePath: function(filePath){
        var filePathTemp = filePath;
        var indexOf = filePathTemp.lastIndexOf("/");
        if(indexOf == filePathTemp.length -1 ){
            filePathTemp = filePathTemp.substring(0, indexOf -1);
        }

        indexOf = filePathTemp.lastIndexOf("/");
        if(indexOf != -1){
            filePathTemp = filePathTemp.substring(0, indexOf + 1);
        }
        return filePathTemp;
    },

    getFileName: function(filePath){
        var filePathTemp = filePath;
        var indexOf = filePathTemp.lastIndexOf("/");
        if(indexOf == filePathTemp.length -1 ){
            filePathTemp = filePathTemp.substring(0, indexOf -1);
        }

        indexOf = filePathTemp.lastIndexOf("/");
        if(indexOf != -1){
            filePathTemp = filePathTemp.substring(indexOf + 1, filePathTemp.length);
        }
        return filePathTemp;
    },

    /**
     * 获取文件名的前缀
     * @param name
     * @returns {*}
     */
    getFileNamePrefix(name){
        var str = name;
        var indexOf = str.lastIndexOf(".");
        if(indexOf != -1){
            str = str.substring(0, indexOf);
        }
        return str;
    },

    /**
     * 获取文件名的后缀
     * @param name
     * @returns {*}
     */
    getFileNameSuffix(name){
        var str = name;
        var indexOf = str.lastIndexOf(".");
        if(indexOf != -1){
            if(indexOf != -1){
                str = str.substring(indexOf + 1, str.length);
            }
        }
        return str;
    }




};