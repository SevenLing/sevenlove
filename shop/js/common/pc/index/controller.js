/*******index模版渲染*******/

$(function() {

	//banner请求
	getJson("http://cms.99live.com/ashx/Interface.ashx?type=topnewslist&ClassId=4&pagesize=3", null, function(data) {
		//banner
		banner = new Vue({
			el: "#flexslider",
			data: {
				banner: data
			}
		});
		setBanner();
	});

	//如果页面上没有跑马灯，退出。不执行跑马灯数据请求
	if(!document.getElementById("textScroll-text")) {
		return;
	}
	//跑马灯请求
	getJson("http://cms.99live.com/ashx/Interface.ashx?type=indexistopnewslist&ClassId=3&pagesize=10", null, function(data) {
		//过滤数据
		var arr = [];
		for(var index in data) {
			var newDate = new Date(parseInt(((data[index].CreateTime).split("(")[1]).split(")")[0]));
			var y =  ((newDate.getMonth()+1)<10 ? ('0'+(newDate.getMonth()+1)) : (newDate.getMonth()+1));   //月份
			var r = newDate.getDate() < 10 ? "0"+newDate.getDate() : newDate.getDate();  //日
			var m = newDate.getHours();
			var s = newDate.getMinutes();
			var dates = newDate.getFullYear()+"-"+y+"-"+r+"   "+(m<10 ? ('0'+m) : m)  + ":" + (s<10 ? ('0'+s) : s);
			arr.push({
				CreateTime: dates,
				Title: data[index].Title,
				NewsUrl:"http://www.99live.com/newsCenter.html?titleId="+data[index].Id
			});
		}
		//过滤数据end

		//跑马灯
		marquee = new Vue({
			el: "#textScroll-text",
			data: {
				marquee: arr
			}
		});
		/*
		 * 调用首页幻灯片下的文字滚动
		 */
		textScroll($("#textScroll-text"));
	});
});

/*
 * 绑定->房间热度榜，点击切换
 */
function switchRoom() {
	var btn = $("#heat-standings li.click");
	var content = $("#team-show .team-info");
	btn.on("click", function() {
		btn.find("a").removeClass("on");
		$(this).find("a").addClass("on");
		var roomId = $(this).attr("data-id");
		var index = $(this).index();
//		console.log(team.team)
//		var teamData = team.teams;
//		team.teams=changeArr(team.team,index - 1)
   
		var aaa=[];
		var num = 0;
		aaa[0] = ABC(team.team[index-1]);
		for(var i=0;i<6;i++)
		{
			if(num==(index-1))
			{
				num++;
			}
			aaa[i+1] = ABC(team.team[num]);
			num++;
			
		}
		team.teams = aaa;
		
//		content.fadeOut(0);
//		content.eq(index - 1).fadeIn(300);
		//调用课程表请求
		/*
		layer.load();
		getCourse(roomId);
		*/
		//获取房间文件下载标题
//		getRoomDownloadTitle(roomId);
	});
//	btn.eq(0).trigger("click");
}

function ABC(obj){
	return obj;
}
/*
 * 数组从新排序
 */
	function changeArr(arr,index){
		index = index || 0;
    	if( !arr || arr.length === 0 || index > arr.length ) return arr;
    	var front = arr.slice(0,index);
    	var end = arr.slice(index);
    	return end.concat(front);
	}
	
/*
 * 获取设置指定房间的文件下载title标题 
 */
function getRoomDownloadTitle(roomId) {
	team.roomDownloadTitle = "点击下载";
	$.ajax({
		url: "http://cms.99live.com/ashx/Interface.ashx?type=vipdownloadlist&Pagesize=1&Pageindex=1&RoomId=" + roomId,
		dataType: 'json',
		data: "",
		jsonp: 'callback',
		success: function(res) {
			//策划部数据
			if(res.status == "succeed") {
				if(!res.obj.length){
					//layer.msg("当前战队暂时没有会员福利");
					return;
				}
				if(res.obj[0].Title) {
					team.roomDownloadTitle = res.obj[0].Title;
				}
				return;
			}
		}
	});
}

/*
 * 课程表请求
 * roomId ------>  房间id=战队id
 */
function getCourse(roomId) {
	RequestUrl("officialWebsite/getSyllabus/roomId/" + roomId,null,"scheduleFun");
}


function scheduleFun(data){
	schedule.schedule = data.data;
	if(data.data.length){
		schedule.roomId = data.data[0].roomId;
	}
	layer.closeAll('loading');
}
/*
 * 查看回放 (传给卓超)
 */
function playVideo(video, id, isCheck) {
	
	//视频不存在
	if(!video) {
		layer.msg('暂无体验课程，敬请期待！');
		return false;
	}
	var url = domain + '/pc.php?s=/Video/index&url=' + encodeURIComponent(video);
	//设置播放次数加一
	function setNum() {
		RequestUrl("Syllabus/syllabus_look/id/" + id,null,"setNumFun");
	}
	//没有密码直接播放视频
	if(typeof windowRequest == 'function') {
		//添加播放次数
		setNum();
		window.windowRequest(url, 'playVipVideo', '550', '312');
		return;
	}

	alert("请在PC端中查看回放");
}
/*
 * 设置回复视频播放次数加1回调函数 (传给卓超)
 */
function setNumFun(data){
	var id = data.data.id;
	//视频播放次数加1(前端加1，假数据);
	if(getWonderfulVideo.getWonderfulVideo) {
		if(getWonderfulVideo.getWonderfulVideo.list) {
			for(var i = 0; i < getWonderfulVideo.getWonderfulVideo.list.length; i++) {
				if(getWonderfulVideo.getWonderfulVideo.list[i].syllabusId == id) {
					getWonderfulVideo.getWonderfulVideo.list[i].num++;
					break;
				}
			}
		} else {
			for(var i = 0; i < getWonderfulVideo.getWonderfulVideo.length; i++) {
				if(getWonderfulVideo.getWonderfulVideo[i].syllabusId == id) {
					getWonderfulVideo.getWonderfulVideo[i].num++;
					break;
				}
			}
		}
	}
}



/*
 * 查看回放 (传给老王)
 */
function playVideoW(video, id) {
	
	//视频不存在
	if(!video) {
		layer.msg('暂无体验课程，敬请期待！');
		return false;
	}
	var url = domain + '/pc.php?s=/Video/index&url=' + encodeURIComponent(video);
	//设置播放次数加一
	function setNum() {
		RequestUrl("Live/addWatchNum/id/" + id,null,"setNumFunW");
	}
	//没有密码直接播放视频
	if(typeof windowRequest == 'function') {
		//添加播放次数
		setNum();
		window.windowRequest(url, 'playVipVideo', '550', '312');
		return;
	}

	alert("请在PC端中查看回放");
}
/*
 * 设置回复视频播放次数加1回调函数 (传给老王)
 */
function setNumFunW(data){
	if(data.status != 0){
		return;
	}
	var id = data.data.id;
	alert(getWonderfulVideo.getWonderfulVideo[0].id);
	//视频播放次数加1(前端加1，假数据);
	if(getWonderfulVideo.getWonderfulVideo) {
		for(var i = 0; i < getWonderfulVideo.getWonderfulVideo.length; i++) {
			if(getWonderfulVideo.getWonderfulVideo[i].id == id) {
				alert(getWonderfulVideo.getWonderfulVideo[i]);
				getWonderfulVideo.getWonderfulVideo[i].watchnum++;
				break;
			}
		}
	}
}





/*
 * 下载
 */
function downloadQuotes(url) {
	//如果链接不存在
	if(!url) {
		layer.msg('暂无链接，敬请期待！');
		return false;
	}
	if(typeof windowRequest == 'function') {
		window.windowRequest(url, 'DownloadFile');
		return;
	}
	alert("请在PC端中下载");
}
/*
 * ajax获取下载链接和密码
 */
function getDownloadUrl(roomid) {
	layer.load();
	$.ajax({
		url: "http://cms.99live.com/ashx/Interface.ashx?type=vipdownloadlist&Pagesize=1&Pageindex=1&RoomId=" + roomid,
		dataType: 'json',
		data: "",
		jsonp: 'callback',
		success: function(res) {
			layer.closeAll('loading');
			//策划部数据
			if(res.status == "succeed") {
			
				if(!res.obj.length){
					layer.msg("当前战队暂时没有会员福利");
					return;
				}
				var ajaxPsw = res.data.VipPassWord;
				var ajaxUrl = "http://cms.99live.com/upload/" + res.obj[0].FileUrl;
				//如果没有密码
				if(!ajaxPsw) {
					downloadQuotes(ajaxUrl);
					return;
				}
				layer.prompt({
					formType: 1,
					title:"请输入密码"
				}, function(val, index) {
					var pwd = val;
					//关闭输入框
					layer.close(index);
					//ajax验证密码
					
					//如果密码正确
					if(pwd) {
						if(ajaxPsw == pwd) {
							downloadQuotes(ajaxUrl);
							return;
						} else {
							layer.msg('密码错误！');
							return;
						}
					}
				});
				return;
			}
		},
		error: function() {
			layer.closeAll('loading');
			layer.msg('暂时没有文件，或者网络连接失败，请联系客服');
		}
	});
}