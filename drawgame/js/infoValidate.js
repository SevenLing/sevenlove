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
      userTel = $('#userTel'), userQQ = $('#userQQ'), userEmail = $('#userEmail');
  var nameError = $('#nameError'), idError = $('#idError'), addrError = $('#addrError'),
      telError = $('#telError'), qqError = $('#qqError'), emailError = $('#emailError');
      
  
  //判断用户填写信息的准确性 
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;    //验证手机号码的正确性
  var myreg2 = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;    //验证邮箱的正确性
  
  userName.blur(function(){
  	if(userName.val().match("\\d")){
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
  		//sureSubmit.attr("disabled",true); 
  	}
  	else{
  		idError.hide();
  		//sureSubmit.attr("disabled",false);
  	}
  })
  userId.focus(function(){
  	idError.hide();
  	//sureSubmit.attr("disabled",false); 
  })   //验证身份证号
  
  /*userAddr.blur(function(){
  	if(userAddr.val().match("\\d")){
  		addrError.show();
  		sureSubmit.attr("disabled",true); 
  	}
  	else{
  		addrError.hide();
  		sureSubmit.attr("disabled",false);
  	}
  })*/
  userAddr.focus(function(){
		addrError.hide();
		//sureSubmit.attr("disabled",false);
  })   //验证住址
  
  userTel.blur(function(){
  	if(userTel.val() != "" && !myreg.test(userTel.val())){
  		telError.show();
  		//sureSubmit.attr("disabled",true); 
  	}
  	else{
  		telError.hide();
  		//sureSubmit.attr("disabled",false);
  	}
  })
  userTel.focus(function(){
		telError.hide();
		//sureSubmit.attr("disabled",false);
  })   //验证手机号
  
  /*userQQ.blur(function(){
  	if(userQQ.val() == ""){
  		qqError.show();
  		sureSubmit.attr("disabled",true); 
  	}
  	else{
  		qqError.hide();
  		sureSubmit.attr("disabled",false);
  	}
  })*/
  userQQ.focus(function(){
		qqError.hide();
		//sureSubmit.attr("disabled",false);
  })   //验证qq号
  
  userEmail.blur(function(){
  	if(userEmail.val() != "" && !myreg2.test(userEmail.val())){
  		emailError.show();
  		//sureSubmit.attr("disabled",true); 
  	}
  	else{
  		emailError.hide();
  		//sureSubmit.attr("disabled",false);
  	}
  })
  userEmail.focus(function(){
		emailError.hide();
		//sureSubmit.attr("disabled",false);
  })   //验证邮箱
  
  sureSubmit.click(function(){
  	if(userName.length > 0 && (userName.val() == "" || userName.val().match("\\d"))){
  		nameError.show();
  		//sureSubmit.attr("disabled",true);
  		return false;
  	}
  	else if(userId.length > 0 && (userId.val() == "" || userId.val().length < 10)){
  		idError.show();
  		return false;
  	}
  	else if(userAddr.length > 0 && userAddr.val() == ""){
  		addrError.show();
  		return false;
  	}
  	else if(userTel.length > 0 && (userTel.val() == "" || !myreg.test(userTel.val()))){
  		telError.show();
  		//sureSubmit.attr("disabled",true);
  		return false;
  	}
  	else if(userQQ.length > 0 && userQQ.val() == ""){
  		qqError.show();
  		//sureSubmit.attr("disabled",true);
  		return false;
  	}
  	else if(userEmail.length > 0 && (userEmail.val() == "" || !myreg2.test(userEmail.val()))){
  		emailError.show();
  		//sureSubmit.attr("disabled",true);
  		return false;
  	}
  	else{
  		sureSubmit.addClass('success');
  	}
  })
})