


// export async function GetDeviceData(){

//         //debug
//         // localStorage["host"] = "http://192.168.30.1";
//         // localStorage["deviceGuids"] = JSON.stringify({deviceGuids:["adffa8da-0ca8-432d-aadc-011050afd100","082cdeca-e930-4b98-9b0f-46d2b33dbde0","d58c2b8b-321f-486e-a81c-5e3fbf373108","b35a14f9-851d-4a52-be30-ae5b86e53b8c"]})
//         //debug

//         if(localStorage.hasOwnProperty("deviceGuids") == false)
//             localStorage["deviceGuids"] = JSON.stringify({deviceGuids:[]})
        
//         var host = localStorage["host"]
        
//         let data = await post(`${host}/NLDTVSvc/Service.svc/GetDeviceData`, {deviceGuids: JSON.parse(localStorage["deviceGuids"]).deviceGuids})
//         return data

// }

// export async function ConnectionTest()
// {
//     var host = localStorage["host"]
//     let res = await fetch(`${host}/NLDTVSvc/Service.svc/ConnectionTest`)
//     let data = await res.json();
// }

// export async function GetConfigDeviceList()
// {

//         //debug
//         // localStorage["host"] = "http://192.168.30.1";
//         // localStorage["deviceGuids"] = JSON.stringify({deviceGuids:["adffa8da-0ca8-432d-aadc-011050afd100","082cdeca-e930-4b98-9b0f-46d2b33dbde0","d58c2b8b-321f-486e-a81c-5e3fbf373108","b35a14f9-851d-4a52-be30-ae5b86e53b8c"]})
//         //debug
        
//         var host = localStorage["host"]
        
//         let res = await fetch(`${host}/NLDTVSvc/Service.svc/GetConfigDeviceList`)
//         let data = await res.json();
//         return data

// }

export async  function checkVersion(type){
    if(localStorage.hasOwnProperty("localVersion") == false)
        localStorage["localVersion"] = "0.0"

    var strCurrentDate = new Date().toString("yyyy-MM-dd")
    var strCurrentHour = new Date().toString("HH")

  

    var host = localStorage["host"]


    var jsMemory = performance.memory;
    // bugout.log("Get memory by js performance.memory... usedJSHeapSize:" + Math.round(jsMemory.usedJSHeapSize /1048576) + "MB" + 
    // ",  jsHeapSizeLimit:" + Math.round(jsMemory.jsHeapSizeLimit /1048576) + "MB" + 
    // ",  totalJSHeapSize:" + Math.round(jsMemory.totalJSHeapSize /1048576) + "MB")

    // bugout.log("start to checkVersion...")

    var wgtVer=null;
    async function plusReady(){
        // bugout.log("plus ready.")  


        var Context = plus.android.importClass("android.content.Context");
        var ActivityManager = plus.android.importClass("android.app.ActivityManager");
        var mi = new ActivityManager.MemoryInfo();
        var activityService = plus.android.runtimeMainActivity().getSystemService(Context.ACTIVITY_SERVICE);
        activityService.getMemoryInfo(mi);
        // 获取mi对象的availMem属性值
        var availMem = plus.android.getAttribute(mi,"availMem");
        var totalMem = plus.android.getAttribute(mi,"totalMem");
        // bugout.log("Get memory by native method... availMemory:" + Math.round(availMem /1048576) + "MB" + ",  totalMemory:" + Math.round(totalMem /1048576) + "MB")

        // if(window.isFetchingNewVersion != undefined && window.isFetchingNewVersion == true)
        //     return;
        window.isFetchingNewVersion = true;

        let res = await fetch(`${host}/JLDPWebApi/api/ClientVersion/GetLatestVersionForTV`)
        let data = await res.json();
        var newVersion = data;
        alert(newVersion);
        // bugout.log("寻找新版本...")
        if(newVersion != localStorage["localVersion"])
        {
            // if(window.wsocket == null)
            // {
            //     try
            //     {
            //         var wsHost = host.substring(7);
            //         const options = {
            //             url: `ws://${wsHost}:8081/tv`,
            //             pingTimeout: 15000, 
            //             pongTimeout: 10000, 
            //             reconnectTimeout: 2000,
            //             pingMsg: "heartbeat"
            //         }
            //         window.wsocket = new WebsocketHeartbeatJs(options);
            //         bugout.log("WebSocket初始化成功！");
            //     }
            //     catch(error)
            //     {
            //         bugout.log("WebSocket初始化失败了 " + error);
            //     }
            //     initWS();
            // }
        
            // bugout.log("发现新版本")
            let resDir = await fetch(`${host}/JLDPWebApi/api/ClientVersion/GetLatestUpdateFilesForTV`)
            let filesData = await resDir.json();
            if(filesData.d == "")
            {
                // bugout.log("不好！找不到新版本下载地址")
                return;
            }
            // 下载wgt文件
            var wgtUrl=`${host}/JLDPWebApi/` + filesData.d;
            //alert(wgtUrl);
            downloadWgt();
            function downloadWgt(){
                plus.io.resolveLocalFileSystemURL("_doc/update",function(entry){
                    entry.removeRecursively(function(a){},function(e1){});
                    },function(e){
                        // bugout.log(e);
                    });
                plus.nativeUI.closeWaiting();
                plus.nativeUI.showWaiting("发现新版本，正下载更新包...");
                // bugout.log("发现新版本，正下载更新包...");
                plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/", timeout:45}, function(d,status){
                    if ( status == 200 ) { 
                        // bugout.log("下载wgt成功："+d.filename);
                        installWgt(d.filename); // 安装wgt包
                    } else {
                        // bugout.log("下载wgt失败！");
                        plus.nativeUI.toast("下载失败了，稍后重试。",{verticalAlign:"center", align:"center"});
                        window.isFetchingNewVersion = false;
                    }
                    plus.nativeUI.closeWaiting();
                }).start();
            }

            // 更新应用资源
            function installWgt(path){
                plus.nativeUI.showWaiting("安装更新包...");
                // bugout.log("安装更新包...");
                plus.runtime.install(path,{force:true},function(){
                    plus.nativeUI.closeWaiting();
                    localStorage["localVersion"] = newVersion
                    plus.nativeUI.toast("更新成功，开始重启...",{verticalAlign:"center", align:"center"});
                    setTimeout(() => {
                        window.isFetchingNewVersion = false;
                        // PostLog();
                        var ws=window.plus.webview.currentWebview();
                        ws.clear();
                        plus.runtime.restart();
                    }, 2000);
                    // bugout.log("更新成功，开始重启...");
                },function(e){
                    window.isFetchingNewVersion = false;
                    plus.nativeUI.closeWaiting();
                    plus.nativeUI.toast("安装wgt文件失败["+e.code+"]："+e.message);
                    // bugout.log("不好！安装wgt文件失败["+e.code+"]："+e.message);
                    setTimeout(() => {
                        PostLog();
                        plus.runtime.restart();
                    }, 2000);
                    
                });
            }
        }
        // else
        // {
        //     // bugout.log("没有找到新版本")
        //     if(window.wsocket == null)
        //     {
        //         try
        //         {
        //             var wsHost = host.substring(7);
        //             const options = {
        //                 url: `ws://${wsHost}:8081/tv`,
        //                 pingTimeout: 15000, 
        //                 pongTimeout: 10000, 
        //                 reconnectTimeout: 2000,
        //                 pingMsg: "heartbeat"
        //             }
        //             window.wsocket = new WebsocketHeartbeatJs(options);
        //             // bugout.log("WebSocket初始化成功！");
        //         }
        //         catch(error)
        //         {
        //             // bugout.log("WebSocket初始化失败了 " + error);
        //         }
        //         initWS();
        //     }
        // }
    }
    if(window.plus){
        plusReady();
    }else{
        // bugout.log("window.plus not ready")
        document.addEventListener('plusready',plusReady,false);
    }
}

async function post (url, data) {
    let headers = {
        'Content-Type': 'application/json; charset=UTF-8'
    }
    // url = "http://localhost:5797/Service.svc/GetDeviceData";
    let res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    })
    
    res = await res.json()
    
    return res
}



// export async function PostLog(){
//     try
//     {
//         if(window.plus)
//         {
//             try
//             {
//                 bugout.log("DEVICE_ID:" + plus.device.uuid);
//             }
//             catch(error)
//             {
//                 bugout.log("获取DEVICE_ID 失败了！ " + error)
//             }
//         }
//         bugout.log("开始上传log到服务器...")
//         var host = localStorage["host"]
        
//         await post(`${host}/NLDTVSvc/Service.svc/WriteToLog`, {content: window.bugout.getLog()})
//         bugout.clear()
//     }
//     catch(error)
//     {
//         bugout.clear()
//         bugout.log("PostLog 失败了！ " + error)
//     }
// }

// export async function PostCrashLog()
// {
//     try
//     {
//         if(localStorage.hasOwnProperty("host") == true &&
//             localStorage.hasOwnProperty("crashLog") == true &&
//             localStorage["crashLog"] != "")
//         {
//             var host = localStorage["host"]
//             await post(`${host}/NLDTVSvc/Service.svc/WriteToLog`, {content: localStorage["crashLog"]})
//             localStorage["crashLog"] = "";
//         }
//     }
//     catch(error)
//     {
//         if(window.bugout)
//             bugout.log("PostCrashLog 失败了！ " + error)
//     }
// }




// function initWS()
// {
//     window.wsocket.onmessage = function (e) {
//         if(e.data.indexOf("CaptureScreen") >= 0)
//         {
//             if(window.plus)
//             {
//                 try
//                 {
//                     if((e.data.indexOf("@") >= 0 && plus.device.uuid == e.data.substring(e.data.indexOf("@") + 1)) ||
//                         e.data == "CaptureScreen")
//                     {
//                         var wv = plus.webview.currentWebview();
//                         var bitmap = new plus.nativeObj.Bitmap('screen');
//                         // 将webview内容绘制到Bitmap对象中
//                         wv.draw(bitmap,function(){
//                             bugout.log('截屏绘制图片成功，正向服务器发送截图');
//                             var base64 = bitmap.toBase64Data();
//                             window.wsocket.send(base64);
//                             bitmap.clear();
//                         },function(e){
//                             bugout.log('截屏绘制图片失败：'+ JSON.stringify(e));
//                             window.wsocket.send('截屏绘制图片失败：'+ JSON.stringify(e));
//                             bitmap.clear();
//                         });
//                     }
//                     else
//                         bugout.log('收到服务器指令：' + e.data);
//                 }
//                 catch(error)
//                 {
//                     bugout.log('尝试截屏失败 ' + error);  
//                     window.wsocket.send('尝试截屏失败 ' + error);  
//                 }
//             }
//             else
//             {
//                 bugout.log('window.plus not ready 尝试截屏失败');  
//                 window.wsocket.send('window.plus not ready 尝试截屏失败');  
//             }
//         }
//     }
// }