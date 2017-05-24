function carouselUp(doc){
	var _warp = $(doc);
    var _start = _warp.children().eq(0); //定义滚动区域    
    var _end = _warp.children().eq(1); //定义滚动区域    
    var startTop=0;
    var endTop=parseInt(_start.height());
    var speed = 70;  //定义滚动间隙时间
    
    var MyMar=setInterval(Marquee,speed);
    var $receiveButt = $('#receiveButt');  //领奖按钮
    var $successAlert = $('#successAlert');  //中奖弹窗
	var $receiveTip = $('#receiveTip');  //领奖成功弹窗

    //领取奖品  
    $receiveButt.click(function(){
        var winList = $('#winList');
        var html = "";
        var _this = $(this);
        var $prizeName = $('#prize').attr('alt');
		$.ajax({
			type:'post',
			url:'http://www.99live.com/Ashx/Activity.ashx?type=insertactivitythree',
			data:{Soure:document.title,UserName:$.cookie('EventsUserName'),AccountNumber:$.cookie('EventsAccount'),Tel:$.cookie('EventsTel'),Prize:$prizeName,ActivityType:0,TypeId:0},
			dataType:"json",
			success:function(result){				
				if(result.status == "succeed"){
					if($('#carouselUp').find('#notData').length > 0){
						$('#carouselUp').find('#notData').remove();
					}
					html = '<li><span class="userName">'+getUserName($.cookie('EventsUserName'))+'</span><span class="userTel">'+getUserTel($.cookie('EventsTel'))+'</span><span class="prizeName">翻牌获得 '+$prizeName+'</span></li>'+winList.html();
	        		winList.html(html);
	        		$successAlert.hide();
	        		$receiveTip.fadeIn(200);
					setTimeout(function(){
						$receiveTip.fadeOut(200);
					},1000);
			    	startTop=0;
		    		if(parseInt($('#carouselUp').children().eq(0).height()) > parseInt(_warp.height())){  //判断滚动区域内容是否超过可视区域	    		
				    	_end.html(_warp.children().eq(0).html());
				    	endTop=parseInt(_warp.children().eq(0).height());
				        _end.css('top',endTop);      
				    }
	    		}
			},
			error:function(){
				console.log('插入数据出错');
			}
		})       	
    })
    
    if(parseInt(_start.height()) > parseInt(_warp.height())){  //判断滚动区域内容是否超过可视区域
    	_end.html(_start.html());
        _end.css('top',_start.height());       
    }
       
    function Marquee(){   //滚动函数
    	startTop -= 1;
    	endTop -= 1;
        if(startTop == -parseInt(_start.height())){
        	startTop = parseInt(_start.height()); 
        	return;
        }
        else if(endTop == -parseInt(_start.height())){
        	endTop = parseInt(_end.height()); 
        	return;
        }
        if(parseInt(_start.height()) > parseInt(_warp.height())){
        	_start.css('top',startTop); 
            _end.css('top',endTop);
        }       
    }     
      	
	_warp.mouseover(function(){
		clearInterval(MyMar);    //当鼠标在滚动区域中时,停止滚动
	})
	_warp.mouseout(function(){
		MyMar=setInterval(Marquee,speed);   //当鼠标离开滚动区域时,开始滚动
	})
}

/*把查询出来的中奖名单的用户姓名截取字段隐藏*/
function getUserName(str) {
	if (str != "" && str != null) {
	    var string = str.substring(0, 1) + '*' + str.substring(2, str.length)
	    return string;
	}
}

/*把查询出来的中奖名单的用户手机截取字段隐藏*/
function getUserTel(str) {
	if (str != "" && str != null) {
	    var string = str.substring(0, 3) + '*****' + str.substring(8, str.length)
	    return string;
	}
}