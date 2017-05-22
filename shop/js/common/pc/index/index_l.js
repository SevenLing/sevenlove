$(function() {
	
	/*
	 * 金银情报，切换方法
	 */
	$(".lwl-intelligenceCont p").find("a").on("click",function(){
		$(this).addClass("lwl-on").siblings().removeClass("lwl-on");
		$(".lwl-intelligenceImgs").attr("src",$(this).attr("href"));
		return false;
	});
});
/*
 * 获取数据
 */
function getJson(url,data,callback){

	$.ajax({  
        url:url,
        dataType:'json', 
        data:data,  
        jsonp:'callback',  
        success:function(res) {
        	//产品部数据
            if(res.status == 0){
				callback(res.data);
				return;
		    }
            //策划部数据
            if(res.status == "succeed"){
            	callback(res.obj);
            	return;
            }
            callback(null);
        },error : function() {  
            callback(null);
        } 
    });
}

//跑马灯
var textScrollTimer = null;
function textScroll(obj) {
	var text = obj;
	var boxWidth = text.parent().innerWidth();
	var textWidth = text.innerWidth();
	window.clearInterval(textScrollTimer);
	textScrollTimer = window.setInterval(function() {
		animation();
	}, 20);
	text.on("mouseover", function() {
		window.clearInterval(textScrollTimer);

	});
	text.on("mouseout", function() {
		window.clearInterval(textScrollTimer);
		textScrollTimer = window.setInterval(function() {
			animation();
		}, 20);

	});
	function animation() {
		var textLeft = parseInt(text.css("left"));

		if(textLeft < (boxWidth - textWidth + (-boxWidth))) {
			text.css("left", boxWidth + "px");
			return;
		}
		text.css("left", textLeft - 1 + "px");
	}
}
/*
 * 首页幻灯片
 */
function setBanner(){
	/*
	 * 首页幻灯片
	 */
	$('.flexslider').flexslider({
		directionNav: true,
		pauseOnAction: false,
		slideshowSpeed: 5000,
		directionNav: false,
		pauseOnHover: true
	});
}

/*
 * 投资报告，官方公告文章列表(内容页)切换
 */
function switchList(){
	var btn = $("#price-title-btn span");
	var list = $("#price-right-list ul");
	btn.on("click",function(){
		btn.removeClass("active");
		$(this).addClass("active");
		var index = $(this).index();
		list.fadeOut(0);
		list.eq(index).fadeIn(200);
		//隐藏内容页
		$("#official-announcement-content").hide();
		$(".price .right-list").scrollTop(0);
	});
}















