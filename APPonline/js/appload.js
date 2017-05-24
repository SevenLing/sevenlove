$(document).ready(function(){	
	// 获取终端的相关信息
    var Terminal = {
        // 辨别移动终端类型
        platform : function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                // android终端或者uc浏览器
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                // 是否为iPhone或者QQHD浏览器
                iPhone: u.indexOf('iPhone') > -1 ,
                // 是否iPad
                iPad: u.indexOf('iPad') > -1,
                //是否微信
                micromessenger: !!(~navigator.userAgent.toLowerCase().indexOf("micromessenger"))
            };
        }(),
        // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
            language : (navigator.browserLanguage || navigator.language).toLowerCase()
        }
 
        if(Terminal.platform.micromessenger){
            //微信端
            $('#appDownload').attr('href','loadApp.html');     
    }else{
        // 根据不同的终端，跳转到不同的地址
        var theUrl = 'http://m.99live.com';
        var ios_download_site = 'https://itunes.apple.com/us/app/99jiu/id1132509294?l=zh&ls=1&mt=8';
        var android_download_site = 'http://www.99live.com/app/999_1.1.3.apk';

        if(Terminal.platform.android){
            theUrl = android_download_site
        }else if(Terminal.platform.iPhone){
            theUrl = ios_download_site;
        }else if(Terminal.platform.iPad){
            theUrl = ios_download_site
        }
 
        $('#appDownload').attr('href',theUrl);           
    }
})