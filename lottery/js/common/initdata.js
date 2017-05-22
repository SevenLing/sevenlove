var $dataList = $('.dataList');
var $provinceList =  $('#provinceList');
var $cityList =  $('#cityList');
var $areaList =  $('#areaList');

//初始化省份数据
function initProvince(){
	var html = "";
	for(var i=0; i<area_array.length; i++){
		if(area_array[i] == undefined){
			continue;
		}
		html += '<li id="'+i+'">'+area_array[i]+'</li>';
	}
	$provinceList.html(html);
}

//根据省份添加城市数据
function selectCity(id){
	var html = "";
	if(sub_array[id] != undefined){
		for(var i=0; i<sub_array[id].length; i++){
			if(sub_array[id][i] == undefined){
				continue;
			}
			html += '<li id="'+i+'">'+sub_array[id][i]+'</li>';
		}
		$cityList.empty().html(html);		
	}
}

//根据城市添加地区数据
function selectArea(id){
	var html = "";
	if(sub_arr[id] != undefined){
		$('.selectBox').eq(2).show();
		for(var i=0; i<sub_arr[id].length; i++){
			if(sub_arr[id][i] == undefined){
				continue;
			}
			html += '<li id="'+i+'">'+sub_arr[id][i]+'</li>';
		}
		$areaList.empty().html(html);
	}
	else{
		if(id != 0 && id != undefined){
		    $('.selectBox').eq(2).hide();
		}
	}
}

$provinceList.on('click','li',function(){
	var _this = $(this);
	selectData(_this);  //选择相应的省份
	$cityList.empty().html('<li id="0">请选择</li>');
	if(_this.attr != 0){
		selectCity(_this.attr('id'));  //根据省份添加城市数据
	}	
	initSelect($cityList);  //初始化城市的第一个选项
	
	$areaList.empty().html('<li id="0">请选择</li>');
	initSelect($areaList);  //初始化地区的第一个选项
})

$cityList.on('click','li',function(){
	var _this = $(this);
	selectData(_this);  //选择相应的城市
	$areaList.empty().html('<li id="0">请选择</li>');
	if(_this.attr != 0){
		selectArea(_this.attr('id'));  //根据城市添加地区数据
	}
	initSelect($areaList);  //初始化地区的第一个选项
})

//选择城市
$areaList.on('click','li',function(){
	selectData($(this));
})

//初始化默认选项
function initSelect(obj){
	obj.find('li').eq(0).addClass('select');
	obj.siblings('.select_showbox').html(obj.find('li').eq(0).html());
	/*obj.siblings('.select_showbox').attr('data_value',obj.find('li').eq(0).attr('id'));*/
}

//选择下拉列表数据
function selectData(obj){
	obj.addClass('select').siblings().removeClass('select');
	obj.parents('.selectBox').find('.select_showbox').html(obj.html());
	obj.parents('.selectBox').find('.select_showbox').attr('data_value',obj.attr('id'));
	obj.parents('.selectBox').removeClass('select');
	obj.parents('.dataList').stop().hide();
	obj.parents('.dataList').stop().hide();
}



