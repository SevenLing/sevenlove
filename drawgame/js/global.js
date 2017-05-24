//移动端页面适配
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  
  var win = $(window);
  var giftCont = $("#giftCont");
  var proportion = win.width()/giftCont.width();
  giftCont.css("-webkit-transform","scale("+proportion+")");
  giftCont.css("-o-transform","scale("+proportion+")");
  giftCont.css("-moz-transform","scale("+proportion+")");
  giftCont.css("transform","scale("+proportion+")");
  //控制轮播区域自适应
})(document, window);

window.onresize = function(){
  var win = $(window);
  var giftCont = $("#giftCont");
  var proportion = win.width()/giftCont.width();
  giftCont.css("-webkit-transform","scale("+proportion+")");
  giftCont.css("-o-transform","scale("+proportion+")");
  giftCont.css("-moz-transform","scale("+proportion+")");
  giftCont.css("transform","scale("+proportion+")");
  //控制轮播区域自适应
}

var $writeinfoButt = $('#writeinfoButt');  //填写资料按钮
var $infoAlert = $('#infoAlert');  //填写资料弹窗
var $joinButt = $('#joinButt');  //提交填写资料按钮
var $submitSuccess = $('#submitSuccess');  //填写资料成功提示
var $successAlert = $('#successAlert');  //中奖弹窗
var $receiveButt = $('#receiveButt');  //领奖按钮
var $receiveTip = $('#receiveTip');  //领奖成功弹窗
var $notjoinTip = $('#notjoinTip');  //未填写资料提示
var $notChance = $('#notChance');  //翻牌机会用完提示
var $notChance2 = $('#notChance2');  //填写完信息之后提示翻牌机会用完
var $closeInfo = $('#closeInfo');  //关闭填写资料弹窗按钮
var $closeSuccess = $('#closeSuccess');  //关闭中奖弹窗按钮
var $autoAlert = $('.autoAlert');  //自动关闭弹窗区域
var $chanceTip = $('#chanceTip');  //翻牌剩余机会
var $giftSlide = $('#giftSlide');  //奖品轮播区域
var $giftButt = $('.giftButt');  //奖品按钮
var $isActive = true;  //防止在规定时间内重复点击
var $clickNum = "";  //保存点击次数传给后台
var $time = "";  //保存点击次数在前端显示
var $count = $('#clickCount');  //剩余翻牌的机会
$giftButt.addClass('class1');  //指定抽奖类

$(document).ready(function(){	
	/*根据cookie判断是否填写资料，从而显示相关的提示;*/
	if($.cookie('EventsUserName') != null && $.cookie('EventsAccount') != null && $.cookie('EventsTel') != null){
		$writeinfoButt.hide();
		$chanceTip.show();	
		$joinButt.addClass('success');
		
		//读取用户剩余翻牌机会
		$.ajax({
			type:"get",
			url:"http://www.99live.com/Ashx/Activity.ashx?type=SelectBreak2",
			async:false,
			data:{Soure:document.title,UserName:$.cookie('EventsUserName'),AccountNumber:$.cookie('EventsAccount'),Tel:$.cookie('EventsTel')},
			dataType:"json",
			success:function(result){
				$clickNum = result.msg;
				$time = result.msg;
				$count.html(result.msg);
				if(result.msg != 0){
					$giftButt.find('.prizeImg').remove();
				}
			}
		});
	}
	
	else if($.cookie('EventsUserName') == null && $.cookie('EventsAccount') == null && $.cookie('EventsTel') == null){
		$writeinfoButt.show();
		$chanceTip.hide();
		$joinButt.removeClass('success');
	}
	
	$writeinfoButt.on('click',function(){
		openAlert($infoAlert);  //弹出填写资料弹窗
	})
	
	//提交用户信息操作
	$joinButt.on('click',function(){
		$isActive = false;  //防止洗牌未结束就进行翻牌抽奖
		var _this = $(this);
		var $userName = $('#userName').val();
		var $userId= $('#userId').val();
		var $userTel = $('#userTel').val();
		if(_this.hasClass('success')){
			closeAlert($infoAlert);  //关闭填写资料弹窗
			//autoClose($submitSuccess);  //弹出并自动关闭提交资料弹窗
			$writeinfoButt.hide();
			$chanceTip.show();
			$.cookie('EventsUserName', $userName);
	    $.cookie('EventsAccount', $userId);
	    $.cookie('EventsTel', $userTel);
	    $.ajax({
	    	type:"post",
	    	url:"http://www.99live.com/Ashx/Activity.ashx?type=SelectBreak2",
	    	data:{Soure:document.title,UserName:$userName,AccountNumber:$userId,Tel:$userTel},
	    	dataType:"json",
	    	success:function(result){
	    		if(result.status == "succeed"){
	    			$clickNum = result.msg;
						$time = result.msg;
						$count.html(result.msg);
		    		if(result.msg != 0){  //表示用户还有剩余抽奖机会
		    			$giftSlide.queue('animate',animateArry);  //按顺序执行一个或多个等待运行的队列函数
		    			_callback();
		    		}
		    		else{
		    			autoClose($notChance2);  //弹出并自动关闭翻牌机会用完弹窗
		    			$isActive = true;
		    		}
	    		}
	    	}
	    })
		}
	})
	
	var list = ['class1','class2'];
	var randList = getEle(list, 2);
	//翻牌操作
	$giftButt.on('click',function(){
		var _this = $(this);
		if(_this.hasClass('giftButt')){
			if(!$joinButt.hasClass('success')){
				autoClose($notjoinTip);  //弹出并自动关闭未填写资料弹窗
			}
			else{
				if($isActive){
					if($time > 0){
						$isActive = false;
						$time--;  //成功返回后前端次数自减1
						$count.html($time);
						_this.removeClass('giftButt');
						if(_this.hasClass(randList[0])) {  //抽中黄金宝典
							$giftButt.removeClass(randList[0]);  //防止第二次翻牌再抽中黄金宝典
							Draw('images/banner/goldbook.png',_this);
							$('#prize').attr('src','images/prizeImg/goldbook.png');
							$('#prize').attr('alt','黄金宝典');
							setTimeout(function(){
								openAlert($successAlert);													
							},700)
							setTimeout(function(){
								$isActive = true;
							},700)
						}
						else{
							_this.removeClass('class1');
							$giftButt.addClass(randList[0]);
							$.ajax({
								type:"get",
								url:"http://www.99live.com/Ashx/Activity.ashx?type=fanpaione",
								dataType:"json",
								success:function(result){
									if(result.status == "succeed"){
										$('#prize').attr('alt',result.msg);
										if(result.msg == "50元话费"){
											Draw("images/banner/huafei50.png",_this);
											$('#prize').attr('src',"images/prizeImg/huafei50.png");														
										}
										else if(result.msg == "30元话费"){
											Draw("images/banner/huafei30.png",_this);
											$('#prize').attr('src',"images/prizeImg/huafei30.png");
										}
										else{
											Draw("images/banner/gold999.png",_this);
											$('#prize').attr('src',"images/prizeImg/gold999.png");
										}
										setTimeout(function(){
											openAlert($successAlert);
											insertPrizeData(result.msg);
										},700)
									}
									setTimeout(function(){
										$isActive = true;
									},700)
								}
							});
						}
					}
					else{
						autoClose($notChance);  //弹出并自动关闭翻牌机会用完弹窗
					}
				}
			}
		}
	})
	
	//弹出弹窗
	function openAlert(obj){
		obj.show();
		obj.find('.alertCont').addClass('active');
	}
	
	//关闭弹窗
	function closeAlert(obj){
		obj.hide();
		obj.find('.alertCont').removeClass('active');
		if(obj.find('input').length > 0){
			obj.find('input').val('');
		}
		if(obj.find('.error').length > 0){
			obj.find('.error').hide();
		}
	}
	
	//自动关闭弹窗
	function autoClose(obj){
		obj.fadeIn(200);
		setTimeout(function(){
			obj.fadeOut(200);
		},1000);
	}
	
	$infoAlert.find('.closeAlert').click(function(){
		closeAlert($infoAlert)
	});  //关闭填写资料弹窗
	
	$successAlert.find('.closeAlert').click(function(){
		closeAlert($successAlert)
	});  //关闭中奖弹窗
	
  //读取中奖名单内容
	$.ajax({
		type:"get",
		url:"http://www.99live.com/Ashx/Activity.ashx?type=selectprizepeople&Soure="+document.title,
		dataType:'json',
		success:function(result){
			if(result.status == "succeed"){
				$.each(result.obj,function(index,data){
					$('#winList').append('<li><span class="userName">'+getUserName(data.UserName)+'</span><span class="userTel">'+getUserTel(data.Tel)+'</span><span class="prizeName">翻牌获得 '+data.Prize+'</span></li>');
				})
			}
			else{
				$('#carouselUp').append('<p id="notData" class="notData"><span>暂无用户中奖数据<span></p>');
			}
			carouselUp('#carouselUp');
		}
	});
})

//将领奖数据保存到数据库
function insertPrizeData(obj){
	$.ajax({
		type:'post',
		url:'http://www.99live.com/Ashx/Activity.ashx?type=insertactivitythree',
		data:{Soure:document.title,UserName:$.cookie('EventsUserName'),AccountNumber:$.cookie('EventsAccount'),Tel:$.cookie('EventsTel'),Prize:obj,ActivityType:0,TypeId:0}
	})
}

//随机生成抽奖区域
function getEle(arr, num) {
	var tempArray = []; //定义一个数组来保存传入的参数数组，可避免直接操作传入的数组
	for(var i in arr) {
		tempArray.push(arr[i]);
	}
	var returnArray = []; //定义一个数组来保存随机抽取的元素
	for(var j = 0; j < num; j++) {
		if(tempArray.length > 0) {
			var arrIndex = Math.floor(Math.random() * tempArray.length); //定义随机抽取的元素下标
			returnArray[j] = tempArray[arrIndex]; //把抽取的元素赋值给返回的数组
			tempArray.splice(arrIndex, 1) //把抽取出来的元素在原数组中删除，避免抽取到重复项
		} else {
			break; //数组中数据抽取完后,退出循环
		}
	}
	return returnArray;
}

/**洗牌效果**/
function animate(object,callback){
	this.obj = $('.'+object);
	this.fromX = this.obj.css('left');
	this.fromY = this.obj.css('top');
	this.toX = $chanceTip.css('left');
	this.toY = $chanceTip.css('top');
	this.speed = 300;
	var child = this.obj.children('.prizeImg');
		
	this.Focus = function(){  //收回		
		this.obj.animate({
			left:this.toX,
			top:this.toY
		},this.speed,callback);
		this.Bind();
	}

	this.Spread = function(){  //发出
		this.obj.animate({
			left:this.fromX,
			top:this.fromY
		},this.speed,callback);
	}
	
	this.Bind = function(){  //显示背面图
		setTimeout(function(){
			child.remove();
		},this.speed);	
	}
}

var _callback = function(){  //终止队列函数的操作
	$giftSlide.dequeue('animate');
}

var giftArry = [];  //保存翻牌的队列
giftArry[0] = new animate('gift1',_callback);
giftArry[1] = new animate('gift2',_callback);
giftArry[2] = new animate('gift3',_callback);
giftArry[3] = new animate('gift4',_callback);
giftArry[4] = new animate('gift5',_callback);
giftArry[5] = new animate('gift6',_callback);
giftArry[6] = new animate('gift7',_callback);
giftArry[7] = new animate('gift8',_callback);

//保存洗牌动作队列
var animateArry = [function(){giftArry[0].Focus();},function(){giftArry[1].Focus();},function(){giftArry[2].Focus();},function(){giftArry[3].Focus();},function(){giftArry[4].Focus();},function(){giftArry[5].Focus();},function(){giftArry[6].Focus();},function(){giftArry[7].Focus();},function(){giftArry[0].Spread();},function(){giftArry[1].Spread();},function(){giftArry[2].Spread();},function(){giftArry[3].Spread();},function(){giftArry[4].Spread();},function(){giftArry[5].Spread();},function(){giftArry[6].Spread();},function(){giftArry[7].Spread();},function(){$isActive=true;}];
/**洗牌效果**/

/**翻牌效果**/
function Draw(imgUrl,obj){
	obj.append('<img class="prizeImg2" src="'+imgUrl+'" />');
	obj.find('.prizeImg2').addClass('active');
	obj.find('.prizeBg').addClass('active');
}
