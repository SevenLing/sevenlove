$(function(){
	lottery.init('giftSlide');  //初始化抽奖
	
	/*if(token || token != ""){
	    $.ajax({  //初始化用户抽奖提示
	    	type:'get',
			url:'http://testphp.99live.cn/pc.php?s=/Draw/Selectfrees',
			dataType:'json',
			async:false,
			success:function(result){
	            if(result.number == 4){  //显示免费抽奖次数
	            	$tips.html('您今日有 <i id="count" class="count">1</i>次免费抽奖机会!');
	            }
	        	
	        	else if(result.number == 0){  //显示抽奖次数已用完
	            	$tips.html('您今日还有 <i id="count" class="count">'+result.number+'</i>次抽奖机会!');
	            	$plateBtn.removeClass('plateBtn2');
	            }
	        	else{
	        		$tips.html('您今日还有 <i id="count" class="count">'+result.number+'</i>次积分抽奖机会!');
	        		$plateBtn.addClass('plateBtn2');
	        	}
	            $time = result.number;
	            $clickTime = result.number;
			},
			error:function(){
				$tips.html('您今日有 <i id="count" class="count">0</i>次抽奖机会!');
			}
		})
    }
	else{
		$tips.html('您今日有 <i id="count" class="count">1</i>次免费抽奖机会!');
	}*/
	
	$tips.html('您今日有 <i id="count" class="count">1</i>次免费抽奖机会!');    
    $time = 4;
	$clickTime = 4;
    function showPrize(){  //返回抽奖结果
    	$clickTime--;  //次数自减1传给后台
    	$.ajax({
	    	type:'get',
			url:'test.txt',
			dataType:'json',
			data:{number:$clickTime,activityname:$activityname},
			success:function(result){
				if(result.status == "succeed"){
					if($time > 0){
						$time--;  //成功返回后前端次数自减1
			            if($time == 0){  //显示抽奖次数已用完
			            	$tips.html('您今日还有 <i id="count" class="count">'+$time+'</i>次抽奖机会!');
			            	//$plateBtn.removeClass('plateBtn2');
							$prizeImg.attr('src','');
			            }
		            	else{
		            		$tips.html('您今日还有 <i id="count" class="count">'+$time+'</i>次积分抽奖机会!');
		            		//$plateBtn.addClass('plateBtn2');
							$prizeImg.attr('src','');
		            	}        
			            //$time = result.number;
			            lottery.speed=130;
						rotateFunc();
					}
				}
			},
			error:function(result){
				isActive = true;
				console.log(result.status);
			}
		})
    }
    
    //抽奖结束弹出相应结果
    function rotateFunc(){
		lottery.times += 1;	
		lottery.roll();	
		if (lottery.times > lottery.cycle+8 && lottery.prize==lottery.index) {
			clearTimeout(lottery.timer);
			$rotateBg.removeClass('active');
		    setTimeout(function(){
		    	if(lottery.prize == 1 || lottery.prize == 3 || lottery.prize == 5 || lottery.prize == 7){
					showInit($notsuccessResult);
					$stopTimer = setTimeout(function(){
						resetInit();
						changeTip();
					},1500)
				}
				else{
					showInit($lotteryResult);			
				}				
				lottery.prize=0;	
				lottery.times=0;			
				isActive = true;
		    },500)				
		}
		else{
			if (lottery.times<lottery.cycle){
				lottery.speed -= 10;
			}
			else if(lottery.times==lottery.cycle) {
				var index = "";//Math.random()*(lottery.count)|0;
	            $.ajax({  //若可以进行抽奖则继续操作
					type:'get',
					url:'http://testphp.99live.cn/pc.php?s=/Draw/getReward',
                    dataType:"json",                   
                    success:function(result){
                    	if(result.status == 0){		
                            //$activityname = result.data[0].Activityname;  //保存活动名称
							$type = result.data[0].Type;  //保存奖品类型									
							$status = result.data[0].Status;  //保存抽中的奖品种类
							$prizenumber = result.data[0].Prizenumber;  //保存奖品数量
							$Prizename = result.data[0].Prizename;  //保存奖品名称
							$prizeUrl = result.data[0].Prizeimgurl;
							if($Prizename == '谢谢参与'){
								var random = Math.random()*10;
								if(random <= 2.5){
									index = 1;
								}
								else if(random > 2.5 && random <= 5){
									index = 3;
								}
								else if(random > 5 && random <= 7.5){
									index = 5;
								}
								else{
									index = 7;
								}								
							}
							else{
								$('#prizeName').html($Prizename);
								$prizeImg.attr('src',$prizeUrl);
								switch($Prizename){															
									case '999积分*3': 
										index = 4;
										break;	
	
									case '999金币*1': 
										index = 2;
										break;
	
									case '999金币*8': 
										index = 6;
										break;
	
									default:
										index = 0;
								}
							}																
						}
                    	lottery.prize = index;
                    },
                    error:function(){
                    	isActive = true;
                    }
				})	            
			}
			else{
				if (lottery.times > lottery.cycle+8 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {	
					lottery.speed += 80;	
				}else{
					lottery.speed += 30;
				}	
			}
	
			if (lottery.speed<60) {	
				lottery.speed=60;	
			};	
			//console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
			lottery.timer = setTimeout(rotateFunc,lottery.speed);	
		}	
		return false;	
	}   
   
	$plateBtn.click(function(){ //点击抽奖
		_this = $(this);
		if(token || token != ""){			
			if(isActive){
				isActive = false;
			    if($time > 0){
			    	if(_this.hasClass('plateBtn2') || $time != 4){  //弹出询问扣除积分弹窗		
			    		showInit($jifenTip);
			    		isActive = true;					
					}
			    	else if(_this.hasClass('plateBtn3') || $activityname == ""){ //暂无活动，按钮为不可点击状态
			    		return false;
			    	}
			    	else{
			    		$drawtype = 0;  //免费抽奖
			    		showPrize();
			    		$rotateBg.addClass('active');
			    	}
				}
				else{  //抽奖机会用完
					if(_this.hasClass('plateBtn3') || $activityname == ""){  //暂无活动，按钮为不可点击状态
			    		return false;
			    	}
					showInit($notChance);
					$stopTimer = setTimeout(autoClose,1500);
				}
			}
		}
		else{  //没有登录弹出登录窗口
			showInit($notLogin);
			/*setTimeout(function(){
				$('#notLogin').fadeOut(100);
			},1500)*/
			//windowRequest('','openLogin');
		}
	});
		
    $deductButt.click(function(){  //确定扣除积分抽奖
    	$drawtype = 1;  //积分抽奖
    	$.ajax({  //查询积分是否足够
			type:'get',
            url:'test.txt',
            dataType:"json",
            data:{activityname:$activityname},
            success:function(result){
            	if(result.message == "可以进行抽奖"){
            		resetInit();
					//changeTip();
					showPrize();
					$rotateBg.addClass('active');					
            	}
            	else{
            		$jifenTip.fadeOut($inSpeed);
            		$notPoints.fadeIn($inSpeed);
            		$stopTimer = setTimeout(autoClose,1500);
            	}
            	isActive = false;
            },
            error:function(){
            	$jifenTip.fadeOut($inSpeed);
            	$notPoints.fadeIn($inSpeed);
        		$stopTimer = setTimeout(autoClose,1500);
            }
        })    	
    })
	
	//弹出登录框
	$('#winlistCont').on('click','#login',function(){
		windowRequest('','openLogin');
	})
	
    //弹出规则窗口
    $activeRule.click(function(){
    	showInit($alertRule);
    })
    
    $initClose.click(function(){  //仅关闭弹窗
    	resetInit();
    });
    
    $deClose.click(function(){  //关闭弹窗并减少抽奖次数以及改变抽奖按钮的状态
    	changeTip()
    	resetInit();
    })
    
    $cancelButt.click(function(){  //取消扣除积分
    	//changeTip();
    	resetInit();
    })
});

//抽奖提示的更换
function changeTip(){
	if($time == 0){
		$plateBtn.removeClass('plateBtn2');
		$prizeImg.attr('src','');
	}
	else{
		if(!$plateBtn.hasClass('plateBtn3')){  //暂无活动的时候不做操作
			$plateBtn.addClass('plateBtn2');
			$prizeImg.attr('src','');
		}
	}
}

function showInit(obj){  //弹出弹窗
	//$alertIndex++;
	$alertTip.hide();
	obj.fadeIn($inSpeed);
}

function resetInit(){  //关闭弹窗
	clearTimeout($stopTimer);
	$alertTip.hide();	
	isActive = true;	
	if(telError.length > 0){
		telError.hide();
	}
	if(telError2.length > 0){
		telError2.hide();
	}
	if(nameError.length > 0){
		nameError.hide();
	}
	
	if($('#writeMobile .input-txt').length > 0){
		$('#writeMobile .input-txt').each(function(){
			$(this).val('');
			$(this).siblings('span').show();
		})
	}
}

function autoClose(){  //自动关闭弹窗
	resetInit();
	//isActive = true;
}

//初始化日期时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;         
    return currentdate;
}

function getNowFormatTime() {
    var date = new Date();
    var seperator2 = ":";
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (hours >= 1 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    var currentdate = hours + seperator2 + minutes;
    return currentdate;
}