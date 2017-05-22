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
var $deleteAlert = $('#deleteAlert');  //删除订单弹窗
var $deleteSuccess = $('#deleteSuccess');  //删除商品成功弹窗
var $refundAlert = $('#refundAlert');  //退款弹窗
var $notReason = $('#notReason');  //未选择退款理由弹窗
var $notReason2 = $('#notReason2');  //未填写退款理由弹窗
var $refundSuccess = $('#refundSuccess');  //未填写退款理由弹窗
var $confirmReceipt = $('#confirmReceipt');  //确认收货弹窗
var $assessAlert = $('#assessAlert');  //评价弹窗
var $overTop = $('#overTop');  //超出上传图片上限弹窗
var $sizeoverTop = $('#sizeoverTop');  //超出上传图片上限弹窗
var $assessoverTop = $('#assessoverTop');  //评论内容超出上限弹窗
var $stayAssess = $('#stayAssess');  //没有留下好评度弹窗
var $sendSuccess = $('#sendSuccess');  //评论发布成功弹窗
var $serviceAlert = $('#serviceAlert');  //申请售后弹窗
var $logisticAlert = $('#logisticAlert');  //物流详情弹窗
var $closeAlert = $('.closeAlert');  //关闭弹窗按钮
var $cancelButt = $('.cancelButt');  //取消按钮
var $refundButt = $('#refundButt');  //退款按钮
var $deleteButt = $('#deleteButt');  //删除按钮
var $thisID = ""  //保存选择当前行的id
var $thisparentID = ""  //保存选择当前行的orderList的id

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
	})
	
	//读取数据
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
				}
				else{
					callback(null);
				}
			}
		})
	}
	
	/*//初始化-读取全部订单列表
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
	})*/
	
	//按时间搜索订单
	$searchButt.on('click',function(){
		if($startDate.val() == ''){
			return false;
		}
		else{
			if($endDate.val() != '' && $endDate.val() < $startDate.val()){
				return false;
			}
			else{
				/*getData('get','orderlist.txt',{startDate:$startDate.val(),endDate:$endDate.val()},function(data){
					prodList.dataList = data;				
				})*/
			}
		}
	})
	
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
	
	//弹出删除商品弹窗
	$orderCont.on('click','.delete',function(){
		openAlert($deleteAlert);
		var _this = $(this);
		//$orderNum = _this.parents('li').find('.num').html();
		$alertCont.find('.num').val(_this.parents('li').find('.num').html());
		$thisID = _this.parents('li').index();
		$thisparentID = _this.parents('.orderCont').index();
	})
	
	//确定删除商品
	$alertCont.on('click','#deleteButt',function(){
		$('.orderCont').eq($thisparentID).find('li').eq($thisID).remove();  //删除当前行的数据
		closeAlert();
		autoClose($deleteSuccess);  //删除商品成功弹窗
	})
	
	//弹出退款弹窗
	$orderCont.on('click','.tuikuan',function(){
		openAlert($refundAlert);
		var _this = $(this);
		//$orderNum = _this.parents('li').find('.num').html();
		$alertCont.find('.num').val(_this.parents('li').find('.num').html());		
	})
	
	//确定退款
	$alertCont.on('click','.refundButt',function(){
		var $refundReason = $('#refundReason');  //退款理由
		var list= $('input:radio[name="reason"]:checked').length;
		if(list <= 0){
			autoClose($notReason);  //没有勾选退款理由弹窗
			return false;
		}
		else if($alertCont.find('.checkboxCont:last input').prop('checked')/*$('#reason3:checked').length > 0*/ && $refundReason.val() == ''){
			autoClose($notReason2);  //没有填写退款理由弹窗
			return false;
		}
		else{
			closeAlert();
			autoClose($refundSuccess);  //提交退款申请成功弹窗
		}
	})
	
	//确认收货
	$orderCont.on('click','.shouhuo',function(){
		var _this = $(this);
		$orderNum = _this.parents('li').find('.num').html();
		autoClose($confirmReceipt);  //确认收货成功弹窗
	})
	
	//弹出评价弹窗
	$orderCont.on('click','.pingjia',function(){
		openAlert($assessAlert);
		var _this = $(this);
		$alertCont.find('.num').val(_this.parents('li').find('.num').html());		
		$alertCont.find('#prodImg').attr('src',$(this).parents('li').find('.prodImg').attr('src'));
	})
	
	//弹出售后弹窗
	$orderCont.on('click','.shouhou',function(){
		openAlert($serviceAlert);
		var _this = $(this);
		$alertCont.find('.num').val(_this.parents('li').find('.num').html());		
	})
	
	//选择好评度
	$alertCont.on('click','.star-i',function(){
		var index = $(this).index();
		$alertCont.find('.star-i').removeClass('active');
		for(var i=0; i<=index; i++){
			$alertCont.find('.star-i').eq(i).addClass('active');
		}
		$alertCont.find('#starLevel').val(index+1);
	})
	
	//监控评论字符的数量
	$alertCont.on('keyup','#assessCont',function(){
		if($(this).val().length > 1000){
			autoClose($assessoverTop);  //评论内容超出上限弹窗
			return false;
		}
	})
	
	//发布评价
	$alertCont.on('click','.sendButt',function(){
		var starLevel = $alertCont.find('#starLevel').val();
		var assessCont = $alertCont.find('#assessCont').val();
		if(starLevel == ""/* || assessCont == ""*/){
			autoClose($stayAssess);  //没有留下好评度弹窗
			return false;
		}
		else if($alertCont.find('#assessCont').val().length > 1000){
			autoClose($assessoverTop);  //评论内容超出上限弹窗
			return false;
		}
		else{
			for(var i=0; i<$alertCont.find('.previewPoto').length; i++){
				document.getElementById("photo"+i).value = document.getElementById("img"+i).src;
			}
			closeAlert();
			autoClose($sendSuccess);  //发布成功弹窗
		}
	})
	
	$alertCont.on('change','#photo',setImagePreviews);  //上传图片
		
	//上传多图片预览
	function setImagePreviews(avalue) {
        var uploadPhoto = document.getElementById('photo');
        var imgList = document.getElementById('imgList');
        //imgList.innerHTML = "";
        var fileList = uploadPhoto.files;  //上传的文件
        var imgCount = document.getElementById('imgCount');
        var previewPoto = $alertCont.find('.previewPoto');
        var previewCount = previewPoto.length;
        var count = parseInt(imgCount.innerHTML);
        
        if(fileList.length+previewCount <= 5){
	        for (var i = 0; i < fileList.length; i++){
	        	if(fileList[i].size <= 1024*1024){
		        	count += 1;
		        	imgCount.innerHTML = count;
		            imgList.innerHTML = imgList.innerHTML+'<label class="previewPoto"><img id="img'+parseInt(i+previewCount)+'" /><input id="photo'+parseInt(i+previewCount)+'" name="photo'+parseInt(i+previewCount)+'" hidden /><span class="delete"></span></label>';
		            //imgList.html(html);
		            var imgObjPreview = document.getElementById("img"+parseInt(i+previewCount));
		            var imgObjPreviewSrc = document.getElementById("photo"+parseInt(i+previewCount));
		            if (uploadPhoto.files && uploadPhoto.files[i]) {
		                //火狐下，直接设img属性
		                imgObjPreview.style.display = 'block';
		                imgObjPreview.style.width = '40px';
		                imgObjPreview.style.height = '40px';
		                //imgObjPreview.src = docObj.files[0].getAsDataURL();
		                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		                imgObjPreview.src = window.URL.createObjectURL(uploadPhoto.files[i]);
		                /*imgObjPreviewSrc.value = imgObjPreview.src;*/
		            }
		            else {
		                //IE下，使用滤镜
		                uploadPhoto.select();
		                var imgSrc = document.selection.createRange().text;
		                var localImagId = document.getElementById("img" + i);
		                //必须设置初始大小
		                localImagId.style.width = "40px";
		                localImagId.style.height = "40px";
		                //图片异常的捕捉，防止用户修改后缀来伪造图片
		                try {
		                    localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";                   localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		                }
		                catch (e) {
		                    //alert("您上传的图片格式不正确，请重新选择!");
		                    return false;
		                }
		                imgObjPreview.style.display = 'none';
		                document.selection.empty();
		            }
		        }
	        	else{
	        		autoClose($sizeoverTop);  //上传图片大小超出上限弹窗
	        	}
	        }
	        //return true;
        }
        else{
        	autoClose($overTop);  //上传图片数量超出上限弹窗
        }
        //在请求成功之后,重置表单才能连续上传同一张图片
        $('input[type=file]').wrap('<form>').closest('form').get(0).reset();
    }
	
	//删除选中的图片
	$alertCont.on('click','.delete',function(){
		var deleteEle = $(this).parents('.previewPoto');
		deleteEle.remove();
		var imgCount = document.getElementById('imgCount');
		var count = parseInt(imgCount.innerHTML);
		count--;
		imgCount.innerHTML = count;
	})
	
	//物流详情弹窗
	$orderCont.on('click','.wuliu',function(){
		openAlert($logisticAlert);
		$alertCont.find('.num').html($(this).parents('li').find('.num').html());
	})
})