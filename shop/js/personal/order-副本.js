var $startDate = $('#startDate');  //开始日期
var $endDate = $('#endDate');  //结束日期
var $orderCont = $('.orderCont');  //订单列表内容
//var $notThing = $('#notThing');  //订单列表内容为空
var $orderList = $('#orderList');  //全部订单列表
var $notsendList = $('#notsendList');  //待发货订单列表
var $waitdeliverList = $('#waitdeliverList');  //待收货订单列表
var $haddeliverList = $('#haddeliverList');  //已收货订单列表
var $searchButt = $('#searchButt');  //搜索按钮
var $tipWord = $('#tipWord');  //没有订单提示标语
var $alertBg = $('#alertBg');  //弹窗背景层
var $alertCont = $('#alertCont');  //弹窗窗口
var $refundAlert = $('#refundAlert');  //退款弹窗
var $notReason = $('#notReason');  //未选择退款理由弹窗
var $notReason2 = $('#notReason2');  //未填写退款理由弹窗
var $refundSuccess = $('#refundSuccess');  //未填写退款理由弹窗
var $refundAlert = $('#refundAlert');  //退款弹窗
var $closeAlert = $('.closeAlert');  //关闭弹窗按钮
var $cancelButt = $('.cancelButt');  //取消按钮
var $refundButt = $('#refundButt');  //退款按钮
var $orderNum = ""  //保存选择的订单号

$(function(){
	//加载头部内容
	//$('#headPart').load('headPart.html');
	
	//开始日期选择
	laydate({
	    elem:'#startDate'
	});
	
	//结束日期选择
	laydate({
	    elem:'#endDate'
	});		
	
	//切换菜单样式
	$('#tabTitle a').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.orderCont').eq($(this).index()).addClass('active').siblings().removeClass('active');
		
		//读取全部订单列表
		if($orderList.parent().hasClass('active')){
			getData('get','orderlist.txt',null,function(data){
				orderList.dataList = data;
				Vue.nextTick(function(){
					if(orderList.dataList.length > 0){
						$orderList.show();
						$orderList.siblings('.notData').hide();
					}
					else{
						$orderList.hide();
						$orderList.siblings('.notData').show();
					}
				})
			})
		}
		
		//读取待发货订单列表
		else if($notsendList.parent().hasClass('active')){
			getData('get','orderlist.txt',null,function(data){
				notsendList.dataList = data;
				Vue.nextTick(function(){
					if(notsendList.dataList.length > 0){
						$notsendList.show();
						$notsendList.siblings('.notData').hide();
					}
					else{
						$notsendList.hide();
						$notsendList.siblings('.notData').show();
					}
				})
			})		
		}
		
		//读取待收货订单列表
		else if($waitdeliverList.parent().hasClass('active')){
			getData('get','orderlist.txt',null,function(data){
				waitdeliverList.dataList = data;
				Vue.nextTick(function(){
					if(waitdeliverList.dataList.length > 0){
						$waitdeliverList.show();
						$waitdeliverList.siblings('.notData').hide();
					}
					else{
						$waitdeliverList.hide();
						$waitdeliverList.siblings('.notData').show();
					}
				})
			})
		}
		
		//读取已收货订单列表
		else if($haddeliverList.parent().hasClass('active')){
			getData('get','orderlist.txt',null,function(data){
				haddeliverList.dataList = data;
				Vue.nextTick(function(){
					if(haddeliverList.dataList.length > 0){
						$haddeliverList.show();
						$haddeliverList.siblings('.notData').hide();
					}
					else{
						$haddeliverList.hide();
						$haddeliverList.siblings('.notData').show();
					}
				})
			})
		}
	})
	
	//读取订单列表
	function getData(type,url,data,callback){
		$.ajax({
			type:type,
			url:url,
			dataType:"json",
			data:data,
			jsonp:'callback',
			success:function(result){
				if(result.status == 1){
					callback(result.data);
					/*if(result.data.length > 0){
						callback(result.data);
					}
					else{
						callback(null);
						$orderCont.empty();
						$notThing.show();
					}*/
				}
				else{
					callback(null);
				}
			}
		})
	}
	
	//初始化-读取全部订单列表
	if($orderList.parent().hasClass('active')){
		getData('get','orderlist.txt',null,function(data){		
			orderList = new Vue({
				el:"#orderList",
				data:{
					dataList:data
				}
			});
			Vue.nextTick(function(){
				if(orderList.dataList.length <= 0){
					$orderList.hide();
					$orderList.siblings('.notData').show();
				}
			})
		})
	}
	
	//初始化-读取待发货订单列表
	getData('get','orderlist.txt',null,function(data){		
		notsendList = new Vue({
			el:"#notsendList",
			data:{
				dataList:data
			}
		});
		Vue.nextTick(function(){
			if(notsendList.dataList.length <= 0){
				$notsendList.hide();
				$notsendList.siblings('.notData').show();
			}
		})
	})
	
	//初始化-读取待收货订单列表
	getData('get','orderlist.txt',null,function(data){		
		waitdeliverList = new Vue({
			el:"#waitdeliverList",
			data:{
				dataList:data
			}
		});
		Vue.nextTick(function(){
			if(waitdeliverList.dataList.length <= 0){
				$waitdeliverList.hide();
				$waitdeliverList.siblings('.notData').show();
			}
		})
	})
	
	//初始化-读取已收货订单列表
	getData('get','orderlist.txt',null,function(data){		
		haddeliverList = new Vue({
			el:"#haddeliverList",
			data:{
				dataList:data
			}
		});
		Vue.nextTick(function(){
			if(haddeliverList.dataList.length <= 0){
				$haddeliverList.hide();
				$haddeliverList.siblings('.notData').show();
			}
		})
	})
	
	//按时间搜索订单
	$searchButt.on('click',function(){
		if($startDate.val() != ''){
			if($endDate.val() == '' || $endDate.val() >= $startDate.val()){
				getData('get','orderlist.txt',{startDate:$startDate.val(),endDate:$endDate.val()},function(data){
					prodList.dataList = data;				
				})
			}
		}
	})
	
	/*$.ajax({
		type:"get",
		url:"orderlist.txt",
		dataType:"json",
		success:function(result){
			if(result.status == 1){
				if(result.data.length > 0){
					$orderCont.show();
					var prodList = new Vue({
						el:"#orderList",
						data:{
							prodList:result.data
						}
					})
				}
				else{
					$orderCont.empty();
					$notThing.show();
				}
			}
		}
	})*/
	
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
			'z-index':'',
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
	
	//弹出退款弹窗
	$orderCont.on('click','.tuikuan',function(){
		var _this = $(this);
		//$orderNum = _this.parents('li').find('.num').html();
		$orderCont.find('.num').val(_this.parents('li').find('.num').html());
		openAlert($refundAlert);
	})
	
	//确定退款
	$alertCont.on('click','.refundButt',function(){
		var $refundReason = $('#refundReason');  //退款理由
		var list= $('input:radio[name="reason"]:checked').length;
		if(list <= 0){
			autoClose($notReason);  //自动关闭弹窗
			return false;
		}
		else if($('#reason3:checked').length > 0 && $refundReason.val() == ''){
			autoClose($notReason2);  //自动关闭弹窗
			return false;
		}
		else{
			$.ajax({
				type:"get",
				url:"test.txt",
				data:{orderNum:$orderNum},
				dataType:"json",
				success:function(result){
					if(result.status == 1){
						closeAlert();
						autoClose($refundSuccess);  //自动关闭弹窗						
					}
				}
			});
		}
	})
	
})