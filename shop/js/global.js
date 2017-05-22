$(document).ready(function(){	
	var infoCont = $('#infoCont'),	   
    	joinButt = $('#joinButt'),
    	eggButt = $('.eggButt'),
		alterTips_bg = $('.alterTips_bg'),
		alertTips = $('.alterTips'),
		joinTip = $('#joinTip'),
		notjoinTip = $('#notjoinTip'),
		successTip = $('#successTip'),
		receiveTip = $('#receiveTip'),
		notsuccessTip = $('#notsuccessTip'),
		repeatTip = $('#repeatTip'),
		giftCont = $('#giftCont'), 
		closeButt = $('.close'),
		receiveButt = $('#receiveButt'),
		restartButt = $('#restartButt');
    
    //点击报名参加
    joinButt.on('click',function(){
    	if(joinButt.hasClass('success')){
    		infoCont.hide();
    		joinTip.show();
    		joinTip.find('.egg01').animate({  //金蛋向两边移动
    			'left':13
    		},1000);
    		joinTip.find('.egg02').animate({  //金蛋向两边移动
    			'left':835
    		},1000);    		  		
    	}
    })
      
    //弹出提示框
    function alertShow(obj){
    	alterTips_bg.show();
  		obj.show();
  		setTimeout(function(){
  			alterTips_bg.hide();
  			obj.hide();
  		},1000);  //过1秒未填写资料提示框消失
    }
    
    eggButt.on('click',function(){
      //未填写资料砸蛋进行相关提示
  	  if(!joinButt.hasClass('success')){
  	  	$('html,body').animate({scrollTop:$('#infoMain').offset().top},300);
  		alertShow(notjoinTip);
  	  }
  	  else{
  	  	  var _this = $(this);
	      var userId = $('#userId').val();
	      var prizeImg = $('#prize');
	      var random = Math.random();
		  if(joinButt.hasClass('success')){
		      $.ajax({
		      	type:'get',
		      	url:'test.txt',
		      	dataType:'json',
		      	success:function(result){		      		
	      			if((userId == result.obj.userAccount && result.obj.ActivityType == "have") || $('.receiveButt').hasClass('receive')){	
	      				alterTips_bg.show();
	      				repeatTip.show();
		      			if(random <= 0.33){
		      				$('.repeat').hide();
		      				$('.repeat01').show();
		      			}
		      			else if(random > 0.33 && random <= 0.66){
		      				$('.repeat').hide();
		      				$('.repeat02').show();
		      			}
		      			else{
		      				$('.repeat').hide();
		      				$('.repeat03').show();
		      			}
		      		}
	      			else{
	      				var thisLeft = $('#hammer').css('left');
	      				var thisTop = $('#hammer').css('top');
	      				if(!eggButt.hasClass('going')){
	      					eggButt.addClass('going');  //防止砸多次
		      				$('#hammer').stop().animate({  //锤子敲打的动作
		      					'top':parseInt(thisTop)-50,
		      					'left':parseInt(thisLeft)+30
		      				},200).animate({
		      					'top':thisTop,
		      					'left':thisLeft
		      				},200);
		      				
		      				setTimeout(function(){  //鸡蛋破裂的效果
		      					_this.siblings('.egg').hide().siblings('.breakegg').show();
		      				},400);
		      				
		      				setTimeout(function(){  //砸中奖品弹窗中奖框
	      				    	alterTips_bg.show();
	      				    	successTip.show();
	      				    	eggButt.removeClass('going');
	      				    },1000);
	      				    
		      				/*if(result.obj.AwardNum == "0.1"){
		      					prizeImg.attr('src','images/prizeImg/goldroster_s.png');
		      					prizeImg.attr('alt','六福素金金鸡');	      				    
			      			}*/
			      			/*if(random <= 0.005){
		      					prizeImg.attr('src','images/prizeImg/goldroster_s.png');
		      					prizeImg.attr('alt','六福素金金鸡');	      				    
			      			}
		      				else if(random > 0.005 && random <= 0.015){			                    								prizeImg.attr('src','images/prizeImg/goldegg_s.png');
		      					prizeImg.attr('alt','足金金蛋吊坠');
			      			}*/
		      				if(random <= 0.02){			                    								prizeImg.attr('src','images/prizeImg/shouhuan_s.png');
		      					prizeImg.attr('alt','蓝牙运动手环');
			      			}
		      				else if(random > 0.02 && random <= 0.07){			                    								prizeImg.attr('src','images/prizeImg/jycard_s.png');
		      					prizeImg.attr('alt','新年加油卡');
			      			}
		      				else if(random > 0.07 && random <= 0.15){			                    								prizeImg.attr('src','images/prizeImg/baozhen_s.png');
		      					prizeImg.attr('alt','可爱两用抱枕');
			      			}
		      				else if(random > 0.15 && random <= 0.3){			                    								prizeImg.attr('src','images/prizeImg/phonecard_s.png');
		      					prizeImg.attr('alt','10元话费充值卡');
			      			}
			      			else{
			      				prizeImg.attr('src','images/prizeImg/hjbd_s.png');
		      					prizeImg.attr('alt','黄金宝典');
			      			}
			      		}
	      			}	     		    		
		      	}
		      })
		  }
  	  }
    })  
    
    //锤子以及中奖鼓励提示跟随鼠标移动而移动
    eggButt.on('mouseenter mouseout',function(event){
		if(event.type == "mouseenter"){
			$('#hammer').stop().animate({
				'left':$(this).parent().position().left+216,
				'top':'280px'
			},200);	
			if(!$('#receiveButt').hasClass('receive')){  //根据用户是否领奖来显示中奖鼓励提示
				$('.hovertips').stop().fadeIn(300);
				$('.hovertips').css({
					'left':$(this).parent().position().left-68
				})
			}
		}
		else if(event.type == "mouseout"){
			$('.hovertips').stop().fadeOut(300);			
		}
	})
     
    //关闭弹窗
    function closeTips(){
    	alterTips_bg.hide();
    	alertTips.hide();
    	$('.egg').show();
		$('.breakegg').hide();  //还原砸蛋效果
    }
    
    closeButt.on('click',closeTips);  //关闭提示   
    
	$('#knowButt').on('click',function(){   //关闭重复领奖弹窗
        closeTips();
	});  
	
    /*$('#receiveButt').on('click',function(){   //领取奖品
    	closeTips();
    	alertShow(receiveTip);
    }) */
    
        
    //幸运玩家名单/我的中奖记录切换
    $('#titleTab span').on('click',function(){
    	$(this).addClass('active').siblings().removeClass('active');
    	$('#winlistCont .wincont').eq($(this).index()).addClass('active').siblings().removeClass('active');
    })
    
	//读取中奖名单内容
    $.ajax({
    	type:"get",
    	url:"winlist.txt",
    	dataType:'json',
    	success:function(result){
    		$.each(result.obj,function(index,data){
    			$('#winList').append('<li><p class="userName">'+data.userName+'</p><p class="prizeName">砸中 '+data.prizeName+'</p></li>');
    		})
    		carouselUp('#carouselUp');
    	}
    });
    
    var token = $('#token').val();
    //我的中奖记录
    if(token || token != ""){
	    $.ajax({
	    	type:"get",
	    	url:"winlist.txt",
	    	data:{"token":token},
	    	dataType:'json',
	    	success:function(result){
	    		$.each(result.obj,function(index,data){
	    			$('#personalList').append('<li><span class="prize">'+data.prizeName+'</span><span class="prizeTime">'+data.quotetime.split(' ')[1]+'</span><span class="prizeTime">'+data.quotetime.split(' ')[0]+'</span></li>');
	    		})
	    		carouselUp('#personalWin');
	    	}
	    });
    }
    else{
    	$('#personalList').append('<li>亲，您还未参与活动！</li>');
    }
    
    /**商城装扮**/  
    var new_skinHref = $('#new_skinHref');
    var skinHref = $('#skin-999');
    //var token = $('#token').val();
    var html = "";
    
    $('#changeSkin').on('click',function(){ //展示主题列表
    	$('#skinWrap').slideToggle();
    })
    
    $.ajax({  //读取主题数据
		type:'get',
		url:'themeslist.txt',
		data:{"token":token},
		dataType:'json',
		success:function(result){
			if(result.status == "succeed"){
				$.each(result.obj,function(index,data){
					if(data.type == "free" || data.type == "hadCharge"){
						html+='<li data-type="'+data.themeName+'" data-src="'+data.themeSrc+'">'+
			    				'<span class="themeImg">'+data.themeImg+'</span>'+
			    				'<span class="themeName">'+data.themeName+'</span>'+
			    				'<span class="themePrice">'+data.themePrice+'</span>'+
			    				'<p class="buttList">'+
			    					'<button class="butt preButt previewButt">预览</button>'+
			    					'<button class="butt zbButt">装扮</button>'+
			    				'</p>'+
			    			'</li>';
		    		}
					else{
						html+='<li data-type="'+data.themeName+'" data-src="'+data.themeSrc+'">'+
			    				'<span class="themeImg">'+data.themeImg+'</span>'+
			    				'<span class="themeName">'+data.themeName+'</span>'+
			    				'<span class="themePrice">'+data.themePrice+'</span>'+
			    				'<p class="buttList">'+
			    					'<button class="butt preButt previewButt">预览</button>'+
			    					'<button class="butt buyButt">购买</button>'+
			    				'</p>'+
			    			'</li>';
					}
				})
				$('#skinList').html(html);
			}
		}
	}) 
      
    $.ajax({  //读取用户设置的主题样式
		type:'get',
		url:'test.txt',
		data:{"token":token},
		dataType:'json',
		success:function(result){
			if(result.status == "succeed"){
				$('#skinList li').each(function(){
					if($(this).attr('data-type') == result.obj.themeName){
						$(this).addClass('select');
					}
				})
				if(result.obj.themeName == "经典原版"){
	    			$('#skin-999').attr('href','');
	    		}
				else{
					$('#skin-999').attr('href','theme/'+result.obj.themeSrc+'/theme.css');
				}
				if(result.obj.deadline > 0 && result.obj.deadline <= 1){
					alert('亲，您使用的“元宵快乐”装扮即将到期，请及时续费购买！')
				}
				else if(result.obj.deadline <= 0){
					alert('亲，您使用的“元宵快乐”已到期，若需继续使用，请重新购买。')
				}
			}
		}
	})   
    
    $('#skinList').on('click','.previewButt',function(){  //预览主题样式
    	var _this = $(this);  
    	if(token || token != ""){
	    	_this.parents('li').addClass('select').siblings().removeClass('select');
	    	$('#skinList').find('.preButt').html('预览');
	    	$('#skinList').find('.preButt').removeClass('cancelPrv').addClass('previewButt');
	    	_this.html("取消预览");   	
	    	_this.removeClass('previewButt').addClass('cancelPrv');
	    	if(_this.parents('li').attr('data-type') == "经典原版"){
	    		skinHref.attr('href','');
	    	}
	    	else{
	    		skinHref.attr('href','theme/'+_this.parents('li').attr('data-src')+'/theme.css');
	    	}
    	}
    	else{
    		alert('亲，您还没有登录!');
    	}
    	//new_skinHref.val(skinHref.attr('href'));
    })
    
    $('#skinList').on('click','.cancelPrv',function(){  //取消主题预览效果
    	var _this = $(this);   	
    	_this.html("预览");   	
    	_this.removeClass('cancelPrv').addClass('previewButt');
    	$.ajax({
    		type:'get',
    		url:'test.txt',
    		data:{"token":token},
    		dataType:'json',
    		success:function(result){
    			if(result.status == "succeed"){
    				$('#skinList li').each(function(){
						if($(this).attr('data-type') == result.obj.themeName){
							$(this).addClass('select').siblings().removeClass('select');
						}
					})
    				if(result.obj.themeName == "经典原版"){
		    			$('#skin-999').attr('href','');
		    		}
					else{
						$('#skin-999').attr('href','theme/'+result.obj.themeSrc+'/theme.css');
					}
	    			$('#skinWrap').slideToggle();
    			}
    		}
    	})
    })
    
    $('#skinList').on('click','.zbButt',function(){  //设置选中的主题保存到数据库
    	var _this = $(this);
    	if(token || token != ""){  	
	    	_this.parents('li').addClass('select').siblings().removeClass('select');
	    	$.ajax({
	    		type:'get',
	    		url:'test.txt',
	    		data:{"token":token,"skin":new_skinHref.val()},
	    		dataType:'json',
	    		success:function(result){
	    			if(result.status == "succeed"){
		    			if(_this.parents('li').attr('data-type') == "经典原版"){
				    		skinHref.attr('href','');
				    	}
				    	else{
				    		skinHref.attr('href','theme/'+_this.parents('li').attr('data-src')+'/theme.css');
				    	}
				    	$('#skinList').find('.preButt').html('预览');   					$('#skinList').find('.preButt').removeClass('cancelPrv').addClass('previewButt');
		    			$('#skinWrap').slideToggle();
	    			}
	    		}
	    	})
    	}
    	else{
    		alert('亲，您还没有登录!');
    	}
    })
    
    $('#skinList').on('click','.buyButt',function(){  //购买主题
    	var _this = $(this);
    	var themePrice = _this.parents('li').find('.themePrice').html();
    	if(token || token != ""){
	    	_this.parents('li').addClass('select').siblings().removeClass('select');
	    	$.ajax({
	    		type:'get',
	    		url:'test.txt',
	    		data:{"token":token,"themePrice":themePrice},
	    		dataType:'json',
	    		success:function(result){
	    			if(result.status == "succeed"){
		    			if(result.obj.goldNum >= themePrice){
		    				$('#thisIndex').val(_this.parents('li').index());
		    				$('#goldPrice').html(themePrice);
				    		$('#alertTip').show();
				    		$('#alert01').show();
				    	}
				    	else{
				    		$('#alertTip').show();
				    		$('#alert02').show();
				    	}
				    }
	    		}
	    	})
    	}
    	else{
    		alert('亲，您还没有登录!');
    	}
    })
    
    $('#sureButt').on('click',function(){  //确定购买主题样式
    	var _this = $(this);
    	var price = $('#goldPrice').html();
    	var buyButt = $('#skinList').find('li').eq($('#thisIndex').val()).find('.buyButt');
    	$.ajax({
    		type:'get',
    		url:'test.txt',
    		data:{"token":token,"themePrice":price},
    		dataType:'json',
    		success:function(result){
    			if(result.status == "succeed"){
	    			$('#alertTip').hide();
				    $('#alert01').hide();
				    buyButt.html('装扮');
				    buyButt.removeClass('buyButt').addClass('zbButt');
			    }
    		}
    	})
    })
    
    $('.cancelButt').on('click',function(){  //取消购买主题样式   	
		$('#alertTip').hide();
	    $('#alert01').hide();
	    $('#alert02').hide();
    })
    
    $('#recharge').on('click',function(){  //进到充值弹窗  	
		$('#alertTip').hide();
	    $('#alert02').hide();
    })  
    
    /**方式二**/  
    /*$('#skinList li').on('click',function(){  //预览主题样式
    	var _this = $(this);
    	var skinHref = $('#skin-999');
    	_this.addClass('select').siblings().removeClass('select');
    	if(_this.attr('data-type') == "经典原版"){
    		skinHref.attr('href','');
    	}
    	else{
    		skinHref.attr('href','theme/'+_this.attr('data-src')+'/theme.css');
    	}
    	new_skinHref.val(skinHref.attr('href'));
    })
    
    $('#sureButt').on('click',function(){  //设置选中的主题保存到数据库
    	$.ajax({
    		type:'get',
    		url:'test.txt',
    		data:{"token":token,"skin":new_skinHref.val()},
    		dataType:'json',
    		success:function(result){
    			if(result.status == "succeed"){
	    			$('#skin-999').attr('href',new_skinHref.val());
	    			$('#skinWrap').slideToggle();
    			}
    		}
    	})    	    	
    })
      
    $('#cancelButt').on('click',function(){  //取消主题预览效果
    	$.ajax({
    		type:'get',
    		url:'test.txt',
    		data:{"token":token},
    		dataType:'json',
    		success:function(result){
    			if(result.status == "succeed"){
    				$('#skinList li').each(function(){
						if($(this).attr('data-type') == result.obj.themeName){
							$(this).addClass('select').siblings().removeClass('select');
						}
					})
    				if(result.obj.themeName == "经典原版"){
		    			$('#skin-999').attr('href','');
		    		}
					else{
						$('#skin-999').attr('href','theme/'+result.obj.themeSrc+'/theme.css');
					}
	    			$('#skinWrap').slideToggle();
    			}
    		}
    	})
    })*/
    /**方式二 end**/
    /**商城装扮 end**/
})