$(document).ready(function(){
	$('.inpLabel input').each(function(){
		if($(this).val() != ""){
			$(this).siblings('span').hide();
		}
	})
		
    $('.inpLabel input').focus(function(){
	    $(this).siblings('span').hide();
    })  //触焦时隐藏提示信息框
	  
    $('.inpLabel input').blur(function(){
		if($(this).val() != ""){
		  $(this).siblings('span').hide();
		}
		else{
		  $(this).siblings('span').show();
		}
    })  //失焦时判断文本框的内容是否为空，为空则显示提示信息框，否则隐藏提示框
    
    var sureSubmit = $('#joinButt'), cancelSubmit = $('#cancelSubmit');
    var userName = $('#userName'), userId = $('#userId'), userAddr = $('#userAddr'), 
        userTel = $('#userTel'), userQQ = $('#userQQ');
    var nameError = $('#nameError'), idError = $('#idError'), addrError = $('#addrError'),
        telError = $('#telError'), qqError = $('#qqError');
      
    userName.val('');
	userId.val('');
	userTel.val('');
	$('.inpLabel').find('span').show();
    sureSubmit.attr("disabled",false);
  
    //判断用户填写信息的准确性 
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;    //验证手机号码的正确性
    var myreg2 = /^[a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,10}/;    //验证用户名的正确性
  
	userName.blur(function(){
	  	if(userName.val() != "" && !myreg2.test(userName.val())){
	  		nameError.show();
	  		sureSubmit.attr("disabled",true); 
	  	}
	  	else{
	  		nameError.hide();
	  		sureSubmit.attr("disabled",false);
	  	}
	})  
	userName.focus(function(){
	  	nameError.hide();
	  	sureSubmit.attr("disabled",false);
	})   //验证用户名
  
	userId.blur(function(){
	  	if(userId.val() != "" && userId.val().length < 10){
	  		idError.show();
	  		sureSubmit.attr("disabled",true); 
	  	}
	  	else{
	  		idError.hide();
	  		sureSubmit.attr("disabled",false);
	  	}
	})
	userId.focus(function(){
	  	idError.hide();
	  	sureSubmit.attr("disabled",false); 
	})   //验证身份证号
  
	userTel.blur(function(){
	  	if(userTel.val() != "" && !myreg.test(userTel.val())){
	  		telError.show();
	  		sureSubmit.attr("disabled",true); 
	  	}
	  	else{
	  		telError.hide();
	  		sureSubmit.attr("disabled",false);
	  	}
	})
	userTel.focus(function(){
		telError.hide();
		sureSubmit.attr("disabled",false);
	})   //验证手机号
  
    sureSubmit.click(function(){
	    if(userName.val() == "" || !myreg2.test(userName.val())){
	  		nameError.show();
	  		sureSubmit.attr("disabled",true);
	  	}
	
	  	else if(userId.val() == "" || userId.val().length < 10){
	  		idError.show();
	  		sureSubmit.attr("disabled",true);
	  	}
	
	  	else if(userTel.val() == "" || !myreg.test(userTel.val())){
	  		telError.show();
	  		sureSubmit.attr("disabled",true);
	  	}
	  	
	  	else{
	  		sureSubmit.attr("disabled",false);
	  		sureSubmit.addClass('success');
	  	}
    })
  
    /*cancelSubmit.click(function(){
	  	sureSubmit.attr("disabled",false);
	  	sureSubmit.removeClass('success');
	  	userName.val('');
	  	userId.val('');
	  	userAddr.val('');
	  	userTel.val('');
	  	userQQ.val('');
	  	nameError.hide();
	  	idError.hide();
	  	addrError.hide();
	  	telError.hide();
	  	qqError.hide();
	  	addrError.hide();
	  	telError.hide();
	  	$('.inpLabel').find('span').show();
    })*/
    //判断用户填写信息的准确性end
})