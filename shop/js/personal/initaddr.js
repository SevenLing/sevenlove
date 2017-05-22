var $dataList = $('.dataList');  //数据列表
var $provinceList =  $('#provinceList');  //渲染省份数据
var $cityList =  $('#cityList');  //渲染城市数据
var $areaList =  $('#areaList');  //渲染区域数据
var $province = $('#province');  //加载省份数据
var $city = $('#city');  //加载省份数据
var $area = $('#area');  //加载省份数据
var $sureButt = $('.sureButt');

//初始化省份选项
$.ajax({
	type:'get',
	url:'provinceData.html?level=1&parent_id=0',
	//dataType:'html',
	success:function(result){
		var html = "";
		$province.empty().html(result);
		$province.find('option').each(function(){
			html +='<li id="'+$(this).val()+'">'+$(this).html()+'</li>';
		})
		$provinceList.empty().html(html);
	}
})

//根据省份添加城市选项
function get_city(province){
	$.ajax({
		type:'get',
		url:'provinceData.html?level=2&parent_id='+province,
		//dataType:'html',
		success:function(result){			
			var html = "";
			$city.empty().html(result);
			$city.find('option').each(function(){
				html +='<li id="'+$(this).val()+'">'+$(this).html()+'</li>';
			})
			$cityList.empty().html(html);
			$areaList.empty();			
		}
	})
}

//根据城市添加区域选项
function get_area(city){
	$.ajax({
		type:'get',
		url:'provinceData.html?level=3&parent_id='+city,
		//dataType:'html',
		success:function(result){			
			var html = "";
			$area.empty().html(result);
			$area.find('option').each(function(){
				html +='<li id="'+$(this).val()+'">'+$(this).html()+'</li>';
			})
			$areaList.empty().html(html);
		}
	})
}

$provinceList.on('click','li',function(){
	get_city($('#provinceId').attr('data'));
	selectData($(this));
	initSelect($cityList);
	$areaList.parents('.selectBox').find('.select_showbox').val('');
})

//根据城市添加区域选项
$cityList.on('click','li',function(){
	get_area($('#cityId').attr('data'));
	selectData($(this));
	initSelect($areaList);
})

//选择区域
$areaList.on('click','li',function(){
	selectData($(this));
})

//初始化默认选项
function initSelect(obj){
	obj.siblings('.select_showbox').val('请选择');
	//obj.find('li').eq(0).addClass('select');
	/*obj.siblings('.select_showbox').val(obj.find('li').eq(0).html());
	obj.siblings('.select_showbox').attr('data',obj.find('li').eq(0).attr('id'));*/
}

//选择下拉列表数据
function selectData(obj){
	obj.addClass('select').siblings().removeClass('select');
	obj.parents('.selectBox').find('.select_showbox').val(obj.html());
	obj.parents('.selectBox').find('.select_showbox').attr('data',obj.attr('id'));
	obj.parents('.selectBox').removeClass('select');
	obj.parents('.dataList').stop().hide();
}

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

//判断用户填写信息的准确性 
var userName = $('#userName'), nameError = $('#nameError'); 
var userTel = $('#userTel'), telError = $('#telError');
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;  //验证手机号码的正确性

/*userName.blur(function(){
  	if(userName.val() == ""){
  		nameError.show();
  	}
  	else{
  		nameError.hide();
  	}
})*/
userName.focus(function(){
  	nameError.hide();
  	$sureButt.removeClass('disable');
  	$sureButt.css('cursor','pointer');
})

userTel.blur(function(){
  	if(userTel.val() != "" && !myreg.test(userTel.val())){
  		telError.show();
  		$sureButt.addClass('disable');
  		$sureButt.css('cursor','default');
  	}
  	else{
  		telError.hide();
  		$sureButt.removeClass('disable');
  		$sureButt.css('cursor','pointer');
  	}
})
userTel.focus(function(){
  	telError.hide();
  	$sureButt.removeClass('disable');
  	$sureButt.css('cursor','pointer');
})



