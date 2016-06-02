window.onload = window.onresize = function(){
	var win_hig = $(window).width();
	var wrap_hig = $(".wrap").width();
	var proportion = win_hig/wrap_hig;
	if(proportion <= 1){
		$(".wrap").css("-webkit-transform","scale("+proportion+")");
		$(".wrap").css("-o-transform","scale("+proportion+")");
		$(".wrap").css("-moz-transform","scale("+proportion+")");
		//$(".wrap").css("height",$(window).height());
	}
	//$(".wrap").css("transform","scale(0.4,0.4)");
}

$(".pro-open").click(function(){
	$(".wrap-pro").eq($(".pro-open").index(this)).show();
})

/*$(".pro1-open").click(function(){
	$(".wrap-pro1").show();
})
$(".pro2-open").click(function(){
	$(".wrap-pro2").show();
})
$(".pro3-open").click(function(){
	$(".wrap-pro3").show();
})
$(".pro4-open").click(function(){
	$(".wrap-pro4").show();
})
*/
$(".close").click(function(){
	$(".wrap-pro").hide();
})

$(document).ready(function(){
	$("#loader").hide();
})