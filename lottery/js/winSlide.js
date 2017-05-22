//领取奖品  
function receivePrize(obj){
	$.ajax({
		type:'post',
		url:'http://testphp.99live.cn/pc.php?s=/Draw/Submit',
		data:{activityname:$activityname,drawtype:$drawtype,status:$status,prizenumber:$prizenumber,prizename:$Prizename,type:$type},
		dataType:'json',
		async:false,
		success:function(){
			console.log('插入数据');			
			$('#allwinList').prepend('<li class="orange">恭喜用户<span class="userName">'+$userName+'</span>抽中<span>'+$Prizename+'</span></li>');			
			obj.addClass('receiveProd');
		    //receivePrize();
		    resetInit();
			changeTip();
		},
		error:function(){
			console.log('数据插入出错');
		}
	})     
}

function initAlert(obj){
	obj.addClass('receiveProd');
    receivePrize();
    resetInit();
	changeTip();
}

$sureBtn.click(function(){  //根据抽中奖品的类型来执行相应的操作
	var _this = $(this);
	switch($status){
		case "2":  //抽中需要用户手机号码的奖品弹出填写手机号码提示框
			$.ajax({
				type:'get',
				url:'http://testphp.99live.cn/pc.php?s=/Draw/SelectUserTel',
				dataType:'json',
				async:false,
				success:function(result){
					$lotteryResult.fadeOut($inSpeed);
					if(result.status == 0){						
						receivePrize(_this);						
					}
					else{
						$writeMobile.fadeIn($inSpeed);
					}
				}
			});		
			break;

		case "实物":  //抽中实物奖品弹出用户的收货地址提示框
		    $.ajax({
		    	type:"get",
		    	url:"test.txt",
		    	dataType:"json",
		    	success:function(result){
		    		$lotteryResult.fadeOut($inSpeed);
		    		if(result.status == 'succeed'){		    			
		    			if(result.addr.length > 0){
		    				$selectAddr.fadeIn($inSpeed);	    				
		    			}
		    			else{
		    				$alertAddr.fadeIn($inSpeed);
		    				initProvince();
		    			}		    			
		    		}
		    	}
		    });
			break;

		default:  //默认领奖即关闭中奖弹窗
			$lotteryResult.hide();
		    receivePrize(_this);		    
	}
});

$receiveButt.click(function(){  //填写手机号之后的操作
	var userTel = $('#userTel');
	var userTel2 = $('#userTel2');
	var userName = $('#userName');
	var select_showbox1 = $('#select_showbox1').html();
	var select_showbox2 = $('#select_showbox2').html();
	var select_showbox3 = $('#select_showbox3').html();
	var detailAddr = $('#detailAddr');
	var _this = $(this);
	var _thisParent1 = $(this).parents('#writeMobile');
	var _thisParent2 = $(this).parents('#alertAddr');
	if(_thisParent1.length > 0){
		if(userTel.length > 0 && (userTel.val() == "" || !myreg.test(userTel.val()))){
	  		telError.show();
	  		return false;
	  	}
		$.ajax({
			type:"post",
			url:"http://testphp.99live.cn/pc.php?s=/Draw/AddUserTel",
			dataType:"json",
			data:{tel:userTel.val()},
			async:false,
			success:function(){
				receivePrize(_this);
			},
			error:function(){
				console.log(userTel.val()+'插入数据库出错');
			}
		});
	}
	else if(_thisParent2.length > 0){
		if(userName.length > 0 && (userName.val() == "" || !myreg2.test(userName.val()))){			
			closeError();
			$errorInfo.html('请填写真实的姓名');
	  		return false;
		}
		else if(userTel2.length > 0 && (userTel2.val() == "" || !myreg.test(userTel2.val()))){
	  		closeError();
			$errorInfo.html('请填写有效的手机号码');
	  		return false;
	  	}
		else if((select_showbox1 == "" || select_showbox1 == "请选择") || (select_showbox2 == "" || select_showbox2 == "请选择") || ($('.selectBox').eq(2).css('display') != "none" && (select_showbox3 == "" || select_showbox3 == "请选择"))){
			closeError();
			$errorInfo.html('请选择地区');
	  		return false;
		}
		else if(detailAddr.val() == ""){
			closeError();
			$errorInfo.html('请填写收货地址');
	  		return false;
		}
		receivePrize(_this);
	}   	
	/*receivePrize();
	setTimeout(function(){
		resetInit();
		$writeMobile.fadeOut(200);
		if($tips.find('#count').html() > 0 && $tips.find('#count').html() <= 3){
			$plateBtn.addClass('plateBtn2');
			$prizeImg.attr('src','');
		}
		else{
			$plateBtn.removeClass('plateBtn2');
			$prizeImg.attr('src','');
		}
	},20)*/		
});

function closeError(){
	$errorTip.fadeIn($inSpeed);
	setTimeout(function(){
		$errorTip.fadeOut($inSpeed);
	},1000)
}

function carouselUp(doc){
	var _warp = $(doc);
    var _start = _warp.children().eq(0); //定义滚动区域    
    var _end = _warp.children().eq(1); //定义滚动区域    
    var startTop=0;
    var endTop=parseInt(_start.height());
    var speed = 70;  //定义滚动间隙时间
    
    var MyMar=setInterval(Marquee,speed);
      
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
      	   	
    _warp.on("touchstart", function(e){ 	
        e.preventDefault();
        clearInterval(MyMar);  //当触摸滚动区域时,停止滚动
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    });

　　  _warp.on("touchmove", function(e){
	    e.preventDefault();
	    clearInterval(MyMar);  //当触摸滚动区域时,停止滚动
	    moveEndX = e.originalEvent.changedTouches[0].pageX,
	    moveEndY = e.originalEvent.changedTouches[0].pageY,
	    X = moveEndX - startX,
	    Y = moveEndY - startY;

	    if( Y > 0 ){
	    	if(startTop != 0){
		    	startTop += 1;
		    	endTop += 1;
		        if(startTop == parseInt(_start.height())){
		        	startTop = parseInt(_start.height()); 
		        	return;
		        }
		        else if(endTop == parseInt(_start.height())){
		        	endTop = parseInt(_end.height()); 
		        	return;
		        }
		        if(parseInt(_start.height()) > parseInt(_warp.height())){
		        	_start.css('top',startTop); 
		            _end.css('top',endTop);
		        }
	        }
	    	console.log('向下拖动');
	    }
	    else if( Y < 0 ){
	    	console.log('向上拖动');
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
    });
    
    _warp.on("touchend", function(e){
        e.preventDefault();
        MyMar=setInterval(Marquee,speed);  //当手指离开滚动区域时,开始滚动
    });
}

function carouselLeft(doc){
	var _warp = $(doc);
    var _start = _warp.children().eq(0); //定义滚动区域    
    var startLeft=0;
    var speed = 30;  //定义滚动间隙时间
    
    var MyMar=setInterval(Marquee,speed);
    
    function resetMarquee(){  //恢复滚动初始化  	
    	setTimeout(function(){
    		startLeft = 0;
    	},100)
    }
    
    $sureBtn.click(function(){
    	var _this = $(this);
		if(_this.hasClass('receiveProd')){
			resetMarquee();
			setTimeout(function(){
				_this.removeClass('receiveProd');
			},100)						
		}
	});
	
    $receiveButt.click(function(){
    	var _this = $(this);
		if(_this.hasClass('receiveProd')){
			resetMarquee();
			setTimeout(function(){
				_this.removeClass('receiveProd');
			},100)						
		}
	});
       
    function Marquee(){   //滚动函数
    	startLeft -= 1;
        if(startLeft == -parseInt(_start.width())){
        	startLeft = parseInt(_warp.width()); 
        	return;
        }

        if(parseInt(_start.width()) > parseInt(_warp.width())){
        	_start.css('left',startLeft);
        }       
    }     

	_warp.mouseover(function(){
		clearInterval(MyMar);    //当鼠标在滚动区域中时,停止滚动
	})
	_warp.mouseout(function(){
		MyMar=setInterval(Marquee,speed);   //当鼠标离开滚动区域时,开始滚动
	})
}

$(function(){
	//读取幸运玩家数据
	$.ajax({
		type:"post",
		url:"http://testphp.99live.cn/pc.php?s=/Draw/GetPrizeUserInfo",
		data:{activityname:$activityname},
		dataType:'json',
		success:function(result){			
			if(result.data.length > 0){
				$allwinList = new Vue({
					el:"#allwinList",
					data: {
						winlist:result.data
					}
				});				
			}
			else{
				$('#allwinList').html('');
			}
			carouselLeft('#slideCont');
		},
		error:function(){
			console.log('暂时没有数据');
		}
	});
	
	//读取我的中奖记录
	if(token || token != ""){
		if($('#personalWin').length > 0){
		    $.ajax({
		    	type:"get",
		    	url:"winlist.txt",
		    	dataType:'json',
		    	success:function(result){
		    		if(result.data.length > 0){
			    		var winlist = new Vue({
							el:"#personalList",
							data: {
								winlist:result.data
							}
						});		    		
		    		}
		    		else{
		    			$('#personalWin').html('');
		    			$('#notData').show();
		    		}
		    		//carouselUp('#personalWin');
		    		
					new UcanSlide('#personalWin',{
					    'scrollStep':1,
					    'scrollSpeed':20,
					    'autoScroll':true,
					    'marginBottom':0
					});
		    	},
		    	error:function(){
		    		console.log('查询数据出错');
		    	}
		    });
		}
		else{
			$('.personalWin').addClass('notThing');
			$('.personalWin').html('<p class="tip orang">亲~请先<a id="login" class="login">登录</a>再查看中奖记录吧！</p>');
		}
	}
})