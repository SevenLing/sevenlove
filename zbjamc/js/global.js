//移动端页面适配
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

window.onload = function(){
  //控制聊天版面展示最新聊天记录
  var chatCont = $('#chatCont');
  var chatInnercont = $('#chatInnercont');
  chatCont.scrollTop(chatInnercont.height() - chatCont.height());

  $('#zbjTab').height($(window).height() - $('.zbjVideo').height() - $('.navList').height());   //初始化tab的高
}

window.onresize = function(){
  $('#zbjTab').height($(window).height() - $('.zbjVideo').height() - $('.navList').height());   //控制tab的高度变化
}

$(document).ready(function(){
  //切换tab
  var navList = $('#navList');
  var tabChild = $('#zbjTab').find('.tabChild');
  navList.on('touchstart','li',function(){
    $(this).addClass('selectLi').siblings().removeClass('selectLi'); 
    tabChild.eq($(this).index()).show().siblings().hide();
  })

  //控制聊天记录左右显示
  $('#chatInnercont .chat:even').addClass('chatLeft');
  $('#chatInnercont .chat:odd').addClass('chatRight');
  
  //发送消息
  $('#send').on('touchstart',function(){
  	var inpval = $('#sendCont').val();
  	if(inpval == ""){
  		alert('请输入发送内容!');
  	}
  	else{
	  	var myDate = new Date();
	  	var minute = myDate.getMinutes();
	  	if(minute<=9){
	  		minute="0"+minute;
	  	}
	  	var mytime = myDate.getHours()+":"+minute;     //获取当前时间
	  	var chatlist = $('#chatInnercont').html();
	  	
	    /*chatlist += '<div class="chat" usid="123">';
	    chatlist += '<div class="showSay">';
	    chatlist += '<a class="toSay">对他说</a><p class="stopShow"><span>|</span><a class="stopSay">禁言他+删除言论</a></p></div>';
	    chatlist += '<span class="userImg">';
	    chatlist += '<img src="images/headImg.png" alt="HC"/></span>';
	    chatlist += '<div class="userWord">';
	    chatlist += '<span class="userName">游客</span>';
	    chatlist += '<p class="chatWord">'+inpval+'</p>';
	    chatlist += '<span class="time">'+mytime+'</span></div></div>';
	    $('#chatInnercont').html(chatlist);*/
	   
	  	$.ajax({
	  		url:"test.txt",
	  		data:{"inpval":inpval},
	  		dataType:'json',
	  		success:function(result){
	  			chatlist += '<div class="chat" usid="'+result.userId+'">';
			    chatlist += '<div class="showSay">';
			    chatlist += '<a class="toSay">对他说</a><p class="stopShow"><span>|</span><a class="stopSay">禁言他+删除言论</a></p></div>';
			    chatlist += '<span class="userImg">';
			    chatlist += '<img src="'+result.imgSrc+'" alt="HC"/></span>';
			    chatlist += '<div class="userWord">';
			    chatlist += '<span class="userName">'+result.userName+'</span>';
			    chatlist += '<p class="chatWord">'+inpval+'</p>';
			    chatlist += '<span class="time">'+mytime+'</span></div></div>';  
			    $('#chatInnercont').html(chatlist);
			    
			    //控制聊天版面展示最新聊天记录
				  var chatCont = $('#chatCont');
				  var chatInnercont = $('#chatInnercont');
				  chatCont.scrollTop(chatInnercont.height() - chatCont.height());
				  
				  //控制聊天记录左右显示
				  $('#chatInnercont .chat:even').addClass('chatLeft');
				  $('#chatInnercont .chat:odd').addClass('chatRight');
	  		}
	  	})
	  	
	  	//清空输入框
	  	$('#sendCont').val("");
	  	
	  	/*//控制聊天版面展示最新聊天记录
		  var chatCont = $('#chatCont');
		  var chatInnercont = $('#chatInnercont');
		  chatCont.scrollTop(chatInnercont.height() - chatCont.height());
		  
	  	//控制聊天记录左右显示
		  $('#chatInnercont .chat:even').addClass('chatLeft');
		  $('#chatInnercont .chat:odd').addClass('chatRight');*/
		}
  })
  //发送消息 end
  
  //显示对他说/禁言操作框
  $('#chatInnercont').on('touchstart','.userImg',function(event){ 	
  	event.stopPropagation();
  	var showSay = $('.showSay');
  	var thisshowSay = $(this).siblings('.showSay');
  	var thisstopShow = $(this).siblings().find('.stopShow');
  	/*var admin = true;
  	if(admin){
  		showSay.hide();
  		thisshowSay.show();
  	}
  	else{
  		showSay.hide();
  		thisstopShow.hide();
  		thisshowSay.show();  
  	}*/
  	
  	$.ajax({
  		url:"test.txt",
  		dataType:'json',
  		success:function(result){
  			if(result.obj == "true"){
					showSay.hide();
  				thisshowSay.show();
				}
				else{
					showSay.hide();
		  		thisstopShow.hide();
		  		thisshowSay.show();   					
				}
  		}
  	})
  	
  	$(".zbjPanel").on("touchstart",function(event){
			$(".showSay").hide();
		});
  })
  //显示对他说/禁言操作框 end
  
  //点击对他说
  $('#chatInnercont').on('touchstart','.toSay',function(){
  	var name = $(this).parent().siblings('.userWord').find('.userName').html();
		var str = "对【"+name+"】说：";
		$("#sendCont").val(str);
  })
  //点击对他说 end
  
  //禁止言论
  $('#chatInnercont').on('touchstart','.stopSay',function(){
  	var userId = $(this).parents('.chat').attr('usid');
  	//$('#chatInnercont > div[usid='+userId+']').remove(); 
  	
  	$.ajax({
  		//type:"post",
  		url:"test.txt",
  		data:{"userId":userId},
  		dataType:"json",
  		success:function(result){
  			$('#chatInnercont > div[usid='+result.userId+']').remove(); 
  		}
  	})
  })
  //禁止言论 end
})