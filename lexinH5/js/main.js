var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical',
    onSlideChangeEnd: function(swiper){	
    	switch (swiper.activeIndex)
    	{
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
     		case 11: 
			setState($(".part12"));
    		break;    	
     		case 12: 
			setState($(".part13"));
    		break;    	   		
    	}
    	
    }
});

setState($(".part1"));

function setState(option){
	option.find("p").css("display","block");
	option.siblings("div").find("p").css("display","none");
}

var MusicBox = document.getElementById("MusicBox");
var bol=true;
$(".music").bind("touchstart",function(){
if(bol){
	MusicBox.pause();
	$(".music").attr({'src':'images/music_off.png'}).css({'-webkit-animation':'none'});
	bol=false;
}
else{
	MusicBox.play();
	$(".music").attr({'src':'images/music_icon.png'}).css({'-webkit-animation':'myRotate 1.0s linear 0s infinite'});
	bol=true;
	}	
});



