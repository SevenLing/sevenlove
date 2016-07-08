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

$(document).ready(function(){
	//$('#audio_btn img').addClass('rotate');   //给音乐图标加上动画效果
	
	function audioAutoPlay(id){
		var audio = document.getElementById(id),
		play = function(){
			audio.play();
			document.removeEventListener("touchstart",play, false);
		};
		audio.play();
		document.addEventListener("WeixinJSBridgeReady", function () {//微信
			play();
		}, false);
		document.addEventListener('YixinJSBridgeReady', function() {//易信
			play();
		}, false);
		document.addEventListener("touchstart",play, false);
	}
  audioAutoPlay('MusicBox');
  //打开页面自动播放背景音乐
	
	var MusicBox = document.getElementById("MusicBox");
	var bol=true;
	$("#audio_btn img").on("touchstart",function(){
		if(bol){
			$(this).removeClass('rotate');
			MusicBox.pause();
			bol=false;
		}
		else{
			$(this).addClass('rotate');
			MusicBox.play();			
			bol=true;
		}	
		return bol;
	});   //音乐按键的操作
	
  var swiper = new Swiper('.swiper-container', {   //引入swiper
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical',
    onSlideChangeEnd: function(swiper){
    	if(!$('.part6').hasClass("swiper-slide-active")){
	    	$('#ptjs').removeClass('active');
	    }
    	switch (swiper.activeIndex){
    		case 0: 
			setState($(".part1"));
    		break;
    		
    		case 1: 
			setState($(".part2"));
    		break;
    		
     		case 2: 
			setState($(".part3"));
    		break;
    		
      		case 3: 
			setState($(".part4"));
    		break;
    		
     		case 4: 
			setState($(".part5"));
    		break;
    		
    		case 5: 
			setState($(".part6"));
    		break;  
    		
    		case 6: 
			setState($(".part7"));
    		break;  
    		
     		case 7: 
			setState($(".part8"));
    		break; 
    		
     		case 8: 
			setState($(".part9"));
    		break;  
    		
    		case 9: 
			setState($(".part10"));
    		break;  
    		
    		case 10: 
			setState($(".part11"));
    		break; 	   		
    	}    	
    }    
  });

	setState($(".part1"));   //设置第一页可见
	
	function setState(option){
		option.find("p").css("display","block");
		option.find("div").css("display","block");
		option.siblings("div").find("p").css("display","none");
		option.siblings("div").find("div").css("display","none");
	}   //上下滑动来触发页面的切换
	
	$('#more').click(function(){
		$('#ptjs').addClass('active');
	})   //点击更多跳转到平台介绍界面
})