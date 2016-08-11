$(document).ready(function(){
	new ZoomPic("box");  //加载轮播图
	
  //填写用户资料
  var infoAlert = $('#infoAlert');
  var receiveAlert = $('#receiveAlert');
  var joinButt = $('#joinButt');
  var startButt = $('#startButt');
  var infoClose = $('#infoClose');
  var tips01 = $('.tips01');
  var tips02 = $('.tips02');
  var tips03 = $('.tips03');
  var tips04 = $('.tips04');
  var inp = $('.inpLabel input');
  var submitButt = $('#submitInfo');
  var userName = $('#userName'), userId = $('#userId'), userTel = $('#userTel');
  var nameError = $('#nameError'),idError = $('#idError'),telError = $('#telError');
  
  joinButt.on('click',function(){
  	infoAlert.show();
  	var userLevel = $('#userLevel');
  	userLevel.val($(this).attr('id'));
  })   //弹出填写资料框
  
  infoClose.on('click',function(){
  	infoAlert.hide(); 
    nameError.hide();
    idError.hide();
    telError.hide();
    $('.inpLabel span').show();
  	var userName = $('#userName'), userId = $('#userId'), userTel = $('#userTel');
    userName.val("");
    userId.val("");
    userTel.val("");
  })   //关闭填写资料框
  
  inp.focus(function(){
  	$(this).siblings('span').hide();
  })  //触焦时隐藏提示信息框
  
  inp.blur(function(){
  	if($(this).val() != ""){
  		$(this).siblings('span').hide();
  	}
  	else{
  		$(this).siblings('span').show();
  	}
  })  //失焦时判断文本框的内容是否为空，为空则显示提示信息框，否则隐藏提示框
  
  //判断用户填写信息的准确性 
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;    //验证手机号码的正确性
  
  userName.blur(function(){
  	if(userName.val().match("\\d")){
  		nameError.show();
  		submitButt.attr("disabled",true); 
  	}
  	else{
  		nameError.hide();
  		submitButt.attr("disabled",false);
  	}
  })  
  userName.focus(function(){
  	nameError.hide();
  	submitButt.attr("disabled",false);
  })   //验证用户名
  
  userId.blur(function(){
  	if(userId.val() != "" && userId.val().length < 10){
  		idError.show();
  		submitButt.attr("disabled",true); 
  	}
  	else{
  		idError.hide();
  		submitButt.attr("disabled",false);
  	}
  })
  userId.focus(function(){
  	idError.hide();
  	submitButt.attr("disabled",false); 
  })   //验证账号
  
  userTel.blur(function(){
  	if(userTel.val() != "" && !myreg.test(userTel.val())){
  		telError.show();
  		submitButt.attr("disabled",true); 
  	}
  	else{
  		telError.hide();
  		submitButt.attr("disabled",false);
  	}
  })
  userTel.focus(function(){
		telError.hide();
		submitButt.attr("disabled",false);
  })   //验证手机号
  //判断用户填写信息的准确性end
  
  submitButt.on('click',function(){  	
  	if(userName.val() == "" || userName.val().match("\\d")){
  		nameError.show();
  		submitButt.attr("disabled",true);
  	}
  	else if(userId.val() == "" || userId.val().length < 10){
  		idError.show();
  		submitButt.attr("disabled",true);
  	}
  	else if(userTel.val() == "" || !myreg.test(userTel.val())){
  		telError.show();
  		submitButt.attr("disabled",true);
  	}
  	else{
  		submitButt.attr("disabled",false);
	  	infoAlert.find('.alertCont').hide(); 
	  	joinButt.hide();
	  	startButt.show();
	  	tips02.show();
	  	setTimeout(function(){tips02.hide();},1200);  //过1.2秒通关提示框消失  	    
		  setTimeout(function(){infoAlert.hide();},1200);  //过1.2秒弹框消失
		  
		  var qxJigsaw = $('#qxJigsaw');
		  setTimeout(function(){$(window).scrollTop($('#qxJigsaw').offset().top - $(window).height()/2 + $('#qxJigsaw').height()/2);},1200);
		  	  
	    userName.val("");
	    userId.val("");
	    userTel.val("");
		  /*$.ajax({
		  	//type:"post",
		  	url:"test.txt",
		  	//data:{"userName":userName,"userId":userId,"userTel":userTel},
		  	success:function(){
		  		infoAlert.find('.alertCont').hide(); 	
			  	clickAlert.hide();
			  	tips02.show();
			  	setTimeout(function(){tips02.hide();},1200);  //过1.2秒通关提示框消失  	    
				  setTimeout(function(){infoAlert.hide();},1200);  //过1.2秒弹框消失
				  var qxJigsaw = $('#qxJigsaw');
		      setTimeout(function(){$(window).scrollTop($('#qxJigsaw').offset().top - $(window).height()/2 + $('#qxJigsaw').height()/2);},1200);  //过1.2秒页面移到拼图处
		      userName.val("");
			    userId.val("");
			    userTel.val("");
		  	}
		  })*/
		}
  })   //提交用户信息完成通关页面移到拼图处
  
  //点击小鱼的时候进行相关的提示
  $('.fishImg').on('click',function(){
  	if(startButt.css('display') == "none"){
  		tips01.show();
  		setTimeout(function(){
  			tips01.hide();
  			infoAlert.show();
  		},1200);  //过1.2秒未提示框消失
  	}
  	else{
  		tips02.show();
  		setTimeout(function(){
  			tips02.hide();
  		},1200);  //过1.2秒提示框消失
  	}
  })
  
  //捕鱼游戏开始
  startButt.click(function(){  	
		$('.fishNet').show();
		setTimeout(function(){
			var fishImg = $('#fishImg');
			var jpImg = $('#jpImg');
			$('.fishNet').hide();			
			$.ajax({
				url:"test.txt",
				dataType:"json",
				success:function(result){
					$('#receiveAlert').show();					
					if(result.prizeName == "红名单"){	
						fishImg.show();
						fishImg.find('img').attr("src","images/fish_purple.png");
						setTimeout(function(){
							fishImg.hide();
							jpImg.show();
							jpImg.find('img').attr("src","images/banner/fish2.png");
						},1500)
					}
					else{
						fishImg.show();
						fishImg.find('img').attr("src","images/fish_gold.png");
						setTimeout(function(){
							fishImg.hide();
							jpImg.show();
							jpImg.find('img').attr("src","images/banner/fish3.png");
						},1500)
					}
				}
			})
		},5000)  //弹出领取奖品框
	})
  //捕鱼游戏end
  
   function  recoverFish(){
  	receiveAlert.hide();
  	$('#fishImg').hide();
  	$('#jpImg').hide();
  	tips04.show();
  	setTimeout(function(){tips04.hide();},1500); 
  }  //领取完奖品弹出领取奖品成功提示并复原拼图状态
  
  $('#jpImg .close').on('click',recoverFish);
  $('#submitLj').on('click',recoverFish);
})