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

var $rotateBg = $('#rotateBg');  //转盘背景图
var $rotateBg02 = $('#rotateBg02');
var $plateBtn = $('#plateBtn');  //抽奖按钮
var $result = $('#result');
var $allwinList = $('#allwinList');  //幸运玩家列表
var $lotteryResult = $('#lotteryResult');  //中奖弹窗
var $notsuccessResult = $('#notsuccessResult');  //没有中奖弹窗
var $prizeImg = $('#prizeImg');  //奖品图片
var isActive = true;  //控制转盘转动时，抽奖按钮禁止重复点击
var $tips = $('#chanceTip');  //抽奖机会提示
/*var $alert_bg = $('#alert_bg');  //弹窗背景
var $alertCont = $('.alertCont');  //弹窗区1*/
var $activeRule = $('#activeRule');  //活动规则
var $alertRule = $('#alertRule');  //活动规则弹窗
var $initClose = $('.initClose');  //关闭弹窗按钮
var $deClose = $('.deClose');  //关闭弹窗按钮2   关闭弹窗时减少抽奖次数以及改变抽奖按钮状态
var $notChance = $('#notChance');  //抽奖机会用完提示弹窗
var $sureBtn = $('#sureBtn');  //确定领奖按钮
var $writeMobile = $('#writeMobile');  //填写手机号弹窗
var $alertAddr = $('#alertAddr');  //填写收货地址弹窗
var $selectAddr = $('#selectAddr');  //选择收货地址弹窗
var $receiveButt = $('.receiveButt');  //填完信息确定按钮
var $errorTip = $('#errorTip');  //填写信息出错弹窗
var $errorInfo = $('#errorInfo');  //出错信息提示语
var $alertTip = $('.alertTip');  //弹窗区2
var $notLogin = $('#notLogin'); //弹窗区2
var $jifenTip = $('#jifenTip');  //扣除积分提示弹窗区
var $notPoints = $('#notPoints');  //积分不够弹窗
var $cancelButt = $('#cancelButt');  //取消扣除积分按钮
var $deductButt = $('#deductButt');  //确定扣除积分按钮
var $loginButt = $('#loginButt');  //登录按钮
var $clickTime = "";  //保存抽奖机会剩余次数传值给后台
var $time = "";  //保存抽奖机会剩余次数在客户端
var $activityname = "";  //保存活动名称
var $type = "";  //保存奖品类型    0:虚拟礼品  1:实物礼品
var $drawtype = "";  //抽奖类型    0:免费      1:积分
var $status = "";  //保存抽中的奖品种类    0:积分      1:金币      2:话费      3:其他
var $prizenumber = "";  //保存奖品数量
var $Prizename = "";  //保存奖品名称
var $prizeUrl = "";  //保存奖品路径
var $stopTimer = null;  //保存setTimeout定时器
var $inSpeed = 100;  //弹窗弹出速度
 
/*var token = "";  //保存用户的userID
$.ajax({  //判断登录
	type:'get',
	url:'http://testphp.99live.cn/pc.php?s=/Draw/lotterypage',
	dataType:'json',
	async:false,
	success:function(result){
        if(result.status == 0){
        	token = true;           	
        }
        else{
        	//windowRequest('','openLogin');
        	token = false;
        }
    }
})*/

var $userName = "";
$.ajax({  //获取用户的信息
	type:'get',
	url:'http://testphp.99live.cn/pc.php?s=/Draw/SelectUser',
	dataType:'json',
	async:false,
	success:function(result){
        if(result.status == 0){
        	$userName = result.data[0].calias;
        }       
    }
})

//读取活动规则以及活动时间
$.ajax({
	type:"get",
	url:"http://testphp.99live.cn/pc.php?s=/Draw/GetActivitList",
	dataType:'json',
	async:false,
	success:function(result){
		if(result.data.length > 0){
			/*var dataList = new Vue({
        		el:"#tips",
				data: {
					dataList:result.data[0]
				}
        	})*/
        	$activityname = result.data[0].Activityname;  //保存活动名称
        	//$tips.html('您今日有 <i id="count" class="count orange">1</i>次免费抽奖机会');  //提示抽奖机会
        	$('.tips').show();  //显示活动规则，抽奖次数，活动时间
        	$('#startTime').html(result.data[0].Effect_time);
        	$('#deadLine').html(result.data[0].Dead_time);
        	$('#rule').html(result.data[0].Activityrule);
        }
		else{
				$('#carouselUp').addClass('notThing');
    		$('#carouselUp').html('<p class="tip">活动尚未开始!</p>');
    		$plateBtn.addClass('plateBtn3');
    		$rotateBg.addClass('rotateBg02');
		}
  }
})

//判断用户填写信息的准确性 
var userName = $('#userName'), nameError = $('#nameError'); 
var userTel = $('#userTel'), telError = $('#telError'); 
var userTel2 = $('#userTel2'), telError2 = $('#telError2'); 
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;  //验证手机号码的正确性
var myreg2 = /^[a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,10}/;    //验证用户名的正确性

/*userName.blur(function(){
  	if(userName.val() != "" && !myreg2.test(userName.val())){
  		nameError.show();
  	}
  	else{
  		nameError.hide();
  	}
})*/

userTel.focus(function(){
  	telError.hide();	  	
})

userTel.blur(function(){
  	if(userTel.val() != "" && !myreg.test(userTel.val())){
  		telError.show();
  	}
  	else{
  		telError.hide();
  	}
})
userTel.focus(function(){
  	telError.hide();	  	
})
/*
userTel2.blur(function(){
  	if(userTel2.val() != "" && !myreg.test(userTel2.val())){
  		telError2.show();
  	}
  	else{
  		telError2.hide();
  	}
})
userTel2.focus(function(){
  	telError2.hide();	  	
})*/

//显示隐藏文本提示框
$('.inpLabel .input-txt').each(function(){
	if($(this).val() != ""){
		$(this).siblings('span').hide();
	}
})
	
$('.inpLabel .input-txt').focus(function(){
	$(this).siblings('span').hide();
})  //触焦时隐藏提示信息框
	  
$('.inpLabel .input-txt').blur(function(){
    if($(this).val() != ""){
        $(this).siblings('span').hide();
    }
    else{
        $(this).siblings('span').show();
	}
})  //失焦时判断文本框的内容是否为空，为空则显示提示信息框，否则隐藏提示框

//显示隐藏所在区域选项
var $selectBox = $('.selectBox');
var $select_showbox = $('.select_showbox');
var $dataList = $('.dataList');
$(document).on('click',function(){  //点击选项以外的地方关闭下拉选择框
	$selectBox.removeClass('select');
	$dataList.hide();
})

$select_showbox.on('click',function(event){
	$(this).parents('.selectBox').addClass('select').siblings().removeClass('select');
	$dataList.hide();
	$(this).siblings('.dataList').toggle();
	event.stopPropagation();  //防止事件冒泡
})

//返回给APP调用登录页面
function loginAPP(){
	clientInterface.loginAPP();  //用于安卓的调用
	console.log('调用APP登录页面');
}
