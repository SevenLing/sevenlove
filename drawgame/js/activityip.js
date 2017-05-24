$(document).ready(function () {
    /*设置活动过期的时间一旦过期就执行某事件*/
    var d1 = new Date("2017-06-16 00:00");
    if (d1 < new Date) {
        alert("亲，该活动已经结束您来晚喽");// 此处弹出，时间是特殊的类型，可以直接进行比较
    } else {
    }
    /*IP:IP; Ctiy:IP对应的城市; Browser:浏览器; OS:操作平台*/
    /*http://ip.taobao.com/service/getIpInfo.php?ip=IP*/
    var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
    $.getJSON(url, function (data) {
        //$("#b").html("显示：IP【" + data.Ip + "】 地址【" + data.Isp + "】 浏览器【" + data.Browser + "】 系统【" + data.OS + "】");
        var IP = data.Ip;
        var City = data.Isp;
        var Browser = data.Browser;
        var OS = data.OS;
        $.cookie('IP', IP);
        $.cookie('City', City);
        $.cookie('Browser', Browser);
        $.cookie('OS', OS);
        //alert(IP);
        //alert(City);
        //alert(Browser);
        //alert(OS);
    });
    //alert(document.title)
    $.ajax({
        type: "post",
        url: "../../../ashx/Activity.ashx",
        data: {
            Type: "activitysoure",
            LocationUrl: window.location.href,            
            Soure:document.title,
            UserIp: $.cookie('IP'),
            City: $.cookie('City'),
            Browser: $.cookie('Browser'),
            OS: $.cookie('OS'),
        },
        dataType: "json",
        success: function (message) {
        }
    });
})

