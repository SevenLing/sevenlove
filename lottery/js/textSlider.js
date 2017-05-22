(function($){
    $.fn.textSlider = function(options){
    //默认配置
    var defaults = {
        speed:40,      //滚动速度,值越大速度越慢
        line:1,       //滚动的行数,
        rowHeight:24 //每行的高度
    };
    
    var opts = $.extend({}, defaults, options);
    var autoScroll= true;  //设置容器的滚动状态
    var speed = opts["speed"], line = opts["line"], sh = opts["rowHeight"], _this = null;
    var $timer;
    var dirY = 0;
    /*if(autoScroll){
        $timer = setInterval(function(){           
            //move();                 
        }, speed);
    }*/
    
    function move(obj, _step){
    	if(autoScroll){
    		dirY = dirY-1;   		
	        var s = Math.abs(parseInt(obj.find("ul").css("margin-top")));                                
            if(s >= _step){
            	obj.find("ul").find("li").slice(0, 1).appendTo(obj.find("ul")); 
                dirY = 0;   //确保每次都是从0开始，避免抖动                
                //clearInterval($timer);
            }
        }
    	obj.find("ul").css("margin-top", dirY+'px');
    }
      
    this.each(function(){
    	_this = $(this);
        var $ul =_this.find("ul");
        if($ul.height() > _this.height()){            
            $timer = setInterval(function(){           
	            move(_this, sh);                 
	        }, speed);
        }
        
        //触摸开始
        _this.on('touchstart', function(ev){
            ev.preventDefault();
            clearInterval($timer);
            //startX = e.originalEvent.changedTouches[0].pageX,
        	startY = ev.originalEvent.changedTouches[0].pageY;
        });
        
        _this.on('touchmove',function(ev){
        	ev.preventDefault();
        	autoScroll = false;
        	//moveEndX = e.originalEvent.changedTouches[0].pageX,       	
		    dirY += ev.originalEvent.changedTouches[0].pageY - startY;
		    /*if(dirY >= sh){
		    	$ul.find("li").slice(0, 1).appendTo($ul);
		    	dirY = 0;
		    }*/
		    //X = moveEndX - startX,
		    //Y = moveEndY - startY;
		    startY = ev.originalEvent.changedTouches[0].pageY;//记录前一次触屏坐标
		    move(_this, sh);
        })
        
        /*//向上滑动
        _this.on('swipeUp', function(ev){
            ev.preventDefault();
            clearInterval($timer);
            if($ul.height() > _this.height()){    
                for(i=0;i<opts.line;i++){
                    $ul.find("li").first().appendTo($ul);
                }
                //$ul.css("margin-top",0);
            }
        });
        
        //向下滑动
        _this.on('swipeDown', function(ev){
            ev.preventDefault();
            clearInterval($timer);
            if($ul.height() > _this.height()){
                for(i=0;i<opts.line;i++){
                  $ul.find("li").first().before($ul.find("li").last());    
                  }                                             
                //$ul.css("margin-top",0);
            }
        });*/
        
        //触摸结束
        _this.on('touchend',function(ev){
            ev.preventDefault();
            autoScroll=true;
            if($ul.height() > _this.height()){
                //marquee(_this, speed, sh);
                $timer = setInterval(function(){           
		            move(_this, sh);               
		        }, speed);
            }
        });        
    });
  }
})(window.jQuery || window.Zepto);