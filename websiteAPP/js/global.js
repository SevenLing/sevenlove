// JavaScript Document
window.onload = function(){
    /*延迟加载*/
	$(".loading").fadeOut(300);
	/*延迟加载end*/

	//设置首页轮播图的宽度与背景宽度一致
	var imgWid = $('.banner_bg img').width();
    $('.focus-banner').width(imgWid);
    //设置首页轮播图的宽度与背景宽度一致 end
}

window.onresize = function(){
	$('body').height($(window).height());   //设置页面的body高度与浏览器可视高度一致
	
	var imgWid = $('.banner_bg img').width();   //设置首页轮播图的宽度与背景宽度一致
    $('.focus-banner').width(imgWid);
       
    $('.about_cont1').css('min-height',$('.aboutsection').height());   //设置公司简介页的页面高度

    //根据不同分辨率设置html的fontsize大小
    var docEl = document.documentElement,
        clientWidth = $('body').width();
          if (!clientWidth) return;
    docEl.style.fontSize = 9 * (clientWidth / 320) + 'px';
    //根据不同分辨率设置html的fontsize大小 end
}

$(document).ready(function(){
	if($('nav').length > 0){
		$('nav').load('nav.html');   //加载菜单页
	}

	$('body').height($(window).height());   //设置页面的body高度与浏览器可视高度一致

	//根据不同分辨率设置html的fontsize大小
    var docEl = document.documentElement,
        clientWidth = $('body').width();
          if (!clientWidth) return;
    docEl.style.fontSize = 9 * (clientWidth / 320) + 'px';
    //根据不同分辨率设置html的fontsize大小 end
    
    /*
    展示菜单栏
    点击.menu_butt时要阻止冒泡，否则 nav 是不显示的，
	因为冒泡了，会让最外层的document执行到下面的方法。
    */
	$('.menu_butt').click(function(e){
	    if($('nav').hasClass('show_nav')){
	    	$('nav').removeClass('show_nav');
	    }
	    else{
	    	$('nav').addClass('show_nav');
	    }
	    var ev = e || window.event;
	        if(ev.stopPropagation){
	            ev.stopPropagation();
	        }
	        else if(window.event){
	            window.event.cancelBubble = true;//兼容IE
	        }
    })
	document.onclick = function(){
	    $('nav').removeClass('show_nav');
	}
	$("nav").click(function(e){
	    var ev = e || window.event;
        if(ev.stopPropagation){
            ev.stopPropagation();
         }
        else if(window.event){
            window.event.cancelBubble = true;//兼容IE
        }
	})

    $("#next-img").click(function(e){
        var ev = e || window.event;
        if(ev.stopPropagation){
            ev.stopPropagation();
         }
        else if(window.event){
            window.event.cancelBubble = true;//兼容IE
        }
    })
    //展示菜单栏 end

    $('.about_cont1').css('min-height',$('.aboutsection').height());  //设置公司简介页的页面高度

    $('.color img').each(function(){   //设置与当前大图相同地址的缩略图高亮，点击缩略图，切换成大图
        if($(this).attr('src') == $(this).parents('.collect_list_inner').find('.prod_img img').attr('src')){        	
        	$(this).css('opacity',1);
        }
        $(this).click(function(){
	        var smallimgSrc = $(this).attr('src');
	        $(this).parents('.collect_list_inner').find('.prod_img img').attr('src',smallimgSrc);
	        $(this).css('opacity',1).siblings().css('opacity',.2);   //设置当前缩略图高亮，其余缩略图变灰
	    })
    })
    
    $(".fold dt").click(function(){   //折叠显示
        $(this).parent().find('dd').removeClass("chioce");
        $(".chioce").slideUp(); 
        if($(this).parent().find('dd').css("display") == "none"){
            $(this).parent().find('dd').slideDown();
        }
        else{
            $(this).parent().find('dd').slideUp();
        }
        $(this).parent().find('dd').addClass("chioce"); 
    })    

    /***slide-button的执行动画***/
	$('input').each(function(){
		var label_wid = $(this).parent().width();
	    span_wid = $('.slide-butt').width();
		if($(this).val() != ""){
			$(this).parent().find('.slide-butt').animate({'left':label_wid - span_wid},0);
		}
	})

	$('input').focus(function(){
		var label_wid = $(this).parent().width();
		var span_wid = $('.slide-butt').width();
		$(this).parent().find('.slide-butt').animate({'left':label_wid - span_wid},700);
	})

	$('input').blur(function(){
		if($(this).val() == "")
		$(this).parent().find('.slide-butt').animate({'left':0},700);
	})
	/***slide-button的执行动画 end***/ 

    //上拉加载数据
    $(window).bind('scroll',function(){show()});

    function show(){
        if($(window).scrollTop()+$(window).height()>=$(document).height()-$('footer').height()){
            ajaxRead();
        }
    }   

    function ajaxRead(){
        var html="";
        $.ajax({
            type:'post',
            dataType:'json',
            url:"#",
            beforeSend:function(){$('.load-data').show()},
            success:function(data){
                            var html=data;
            },
            //complete:function(){$('.load-data').hide()}
        });
    }
    //上拉加载数据end
})



