var $searchButt = $('#searchButt');  //搜索商品按钮
var $searchVal = $('#searchVal');  //搜索商品内容
$(function(){
	$.ajax({  //读取用户设置的主题样式
		type:'get',
		url:'test.txt',
		//data:{"token":token},
		dataType:'json',
		success:function(result){
			if(result.status == "succeed"){
				$('#themeList li').each(function(){
					if($(this).attr('data-type') == result.data.themeName){
						$(this).addClass('select');
					}
				})
				if(result.data.themeName == "经典原版"){
	    			$('#skin-999').attr('href','');
	    		}
				else{
					$('#skin-999').attr('href','theme/'+result.data.themeSrc+'/theme.css');
				}
				if(result.data.deadline > 0 && result.data.deadline <= 1){
					alert('亲，您使用的“元宵快乐”装扮即将到期，请及时续费购买！')
				}
				else if(result.data.deadline <= 0){
					alert('亲，您使用的“元宵快乐”已到期，若需继续使用，请重新购买。')
				}
			}
		}
	})
	
	//搜索商品
	function searchProd(){
		if($searchVal.val() != ""){
			window.location.href = "themePage.html?"+$searchVal.val();
		}
	}
	
	$searchButt.on('click',searchProd) //绑定搜索事件到按钮上
	$searchVal.on('keypress',function(event){
		var keycode = event.keyCode; //event.keyCode是按键的值，按回车键跳转
		if (keycode == 13){
		    searchProd();
	    } 
	})
	
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
	
	//设置弹窗区域的高度
	if($(window).width() > 1024){
    	$('.alertCont').height($(window).height() - $('#flexslider').height());
    	$('#shopMian').height($(window).height() - $('#flexslider').height() - $('#tabTitle').height());
    }
    else{
    	$('.alertCont').height($(window).height());
    	$('#shopMian').height('auto');
    }
})

//弹窗区域的高度随着浏览器的变化而变化
window.onresize = function(){
	if($(window).width() > 1024){
    	$('.alertCont').height($(window).height() - $('#flexslider').height());
    	$('#shopMian').height($(window).height() - $('#flexslider').height() - $('#tabTitle').height());
    }
    else{
    	$('.alertCont').height($(window).height());
    	$('#shopMian').height('auto');
    }
}

