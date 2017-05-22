var $alertBg = $('#alertBg');  //弹窗背景层
var $alertCont = $('#alertCont');  //弹窗窗口
var $closeAlert = $('.closeAlert');  //关闭弹窗按钮
var $cancelButt = $('.cancelButt');  //取消按钮

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

/*
 * 幻灯片
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

var $alertCont = $('#alertCont');  //弹窗窗口

//弹出弹窗
function openAlert(obj){
	$alertBg.show();
	$alertCont.addClass('active');
	$alertCont.html(obj.html());
	$alertCont.css({
		'z-index':999,
		'margin-left':-obj.width()/2,
		'margin-top':-obj.height()/2
	});
}

//关闭弹窗
function closeAlert(){
	$alertBg.hide();
	$alertCont.removeClass('active');
	$alertCont.css({
		'z-index':'-1',
		'margin-left':'',
		'margin-top':''
	});
}

//自动关闭弹窗
function autoClose(obj){
	obj.fadeIn(200);
	setTimeout(function(){
		obj.fadeOut(200);
	},1000);
}

$alertCont.on('click','.closeAlert',closeAlert);  //关闭弹窗操作
$alertCont.on('click','.cancelButt',closeAlert);  //取消操作时，关闭弹窗
