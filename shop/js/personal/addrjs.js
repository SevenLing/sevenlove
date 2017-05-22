var $createAddr = $('#createAddr');  //进入添加新地址按钮
var $addrList = $('#addrList');  //收货地址列表
var $sureButt = $('.sureButt');  //确定保存地址按钮
var $selectBox = $('.selectBox');  //下拉列表区域
var $select_showbox = $('.select_showbox');  //选择的数据
var $dataList = $('.dataList');  //下拉列表
var $addroverTop = $('#addroverTop');  //收货地址已满弹窗
var $defaultSuccess = $('#defaultSuccess');  //设置默认收货地址成功弹窗
var $deleteSuccess = $('#deleteSuccess');  //删除地址成功弹窗
var $deleteAlert = $('#deleteAlert');  //删除地址弹窗
var $addEditAlert = $('#addEditAlert');  //加载修改地址的弹窗
var $editAlert = $('#editAlert');  //修改地址弹窗
var $editButt = $('#editButt');  //修改按钮
var $addrId= "";  //保存选中的地址ID

$(function(){
	//创建新收货地址
	$createAddr.on('click',function(){
		if($addrList.find('li').length >= 20){
			autoClose($addroverTop);  //收货地址已满弹窗
		}
		else{
			window.location.href = "createAddrPage.html";
		}
	})
	
	//选择默认地址
	$addrList.on('click','.defaultAddr',function(){
		var _this = $(this);
		var $parentId = _this.parents('li').attr('id');
		$.ajax({
			url:'provinceData.html',
			data:{parentId:$parentId},
			dataType:'html',
			success:function(){
				_this.parents('li').addClass('isdefault').siblings('li').removeClass('isdefault');
				autoClose($defaultSuccess);  //设置默认地址成功弹窗
			}		
		})
	})
	
	//弹出删除地址弹窗
	$addrList.on('click','.deleteButt',function(){
		openAlert($deleteAlert);
		$alertCont.find('.addrId').val($(this).parents('li').attr('id'));
		$addrIndex = $(this).parents('li').index();
	})
	
	//确定删除地址
	$alertCont.on('click','#deleteButt',function(){
		closeAlert();
		autoClose($deleteSuccess);  //删除地址成功弹窗
		$addrList.find('li').eq($addrIndex).remove();
	})
	
	//弹出修改地址弹窗
	$addrList.on('click','.editButt',function(){
		var $addrId = $(this).parents('li').attr('id');
		var $userName = $(this).parents('li').find('.userName');
		var $userTel = $(this).parents('li').find('.userTel');
		var $province = $(this).parents('li').find('.province');
		var $city = $(this).parents('li').find('.city');
		var $area = $(this).parents('li').find('.area');
		var $addrDetail = $(this).parents('li').find('.addrDetail');
		$editAlert.addClass('active');
		$editAlert.find('.addrId').val($(this).parents('li').attr('id'));
		get_city($province.html());  //加载相应的城市列表
		get_area($city.html());  //加载相应的区域列表
		$provinceList.find('li').each(function(){  //给已选择的省份添加样式
			if($(this).attr('id') == $province.attr('data')){
				selectData($(this));
			}			
		})
		$cityList.find('li').each(function(){  //给已选择的城市添加样式
			if($(this).attr('id') == $city.attr('data')){
				selectData($(this));
			}			
		})
		$areaList.find('li').each(function(){  //给已选择的区域添加样式
			if($(this).attr('id') == $area.attr('data')){
				selectData($(this));
			}		
		})
		$('#userName').val($userName.html());
		$('#userTel').val($userTel.html());
		$('#addrDetail').val($addrDetail.html());
		$('#provinceId').attr('data',$province.attr('data'));
		$('#provinceId').val($province.html());
		$('#cityId').attr('data',$city.attr('data'));
		$('#cityId').val($city.html());
		$('#areaId').attr('data',$area.attr('data'));
		$('#areaId').val($area.html());
		$editAlert.find('.error').hide();
		$('.inpLabel span').hide();
		$editAlert.find('#default').removeAttr("checked");
		if($editButt.hasClass('disable')){
			$editButt.removeClass('disable');
		}	
	})

	//确认修改
	$editButt.on('click',function(){
		return checkInfo();
		$editAlert.removeClass('active');		
	})
	
	//取消修改地址
	$cancelButt.on('click',function(){
		$editAlert.removeClass('active');
		if($editButt.hasClass('disable')){
			$editButt.removeClass('disable');
		}
		$editAlert.find('#default').removeAttr("checked");
	})
	
	$(document).on('click',function(){  //点击选项以外的地方关闭下拉选择框
		$selectBox.removeClass('select');
		if($dataList.css('display') != "none"){
			$dataList.hide();
		}
	})	
	
	//显示下拉列表
	$select_showbox.on('click',function(event){	
		if(!$(this).parents('.selectBox').hasClass('select')){
			$(this).parents('.selectBox').addClass('select');
		}
	    else{
	    	$(this).parents('.selectBox').removeClass('select');
	    }
	    
		$(this).parents('.selectBox').siblings('.selectBox').removeClass('select');
		$(this).parents('.selectBox').siblings('.selectBox').find('.dataList').hide();
		
		$(this).siblings('.dataList').toggle();
		event.stopPropagation();  //防止事件冒泡
	})
	
	//验证表单信息
	function checkInfo(){
		if(userName.length > 0 && userName.val() == "" ){
			nameError.show();
			$sureButt.addClass('disable');
  			$sureButt.css('cursor','default');
	  		return false;
		}
		else if(userTel.length > 0 && (userTel.val() == "" || !myreg.test(userTel.val()))){
	  		telError.show();
	  		$sureButt.addClass('disable');
  			$sureButt.css('cursor','default');
	  		return false;
		}
		return true;
	}
	
	//保存新收货地址
	$sureButt.on('click',function(){
		return checkInfo();
	})
})



