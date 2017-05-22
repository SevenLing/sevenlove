var UcanSlide=function(ele,config){
    this.config=config||{};
    this.wrap=document.querySelector(ele);
    this.ul_wrap=this.wrap.querySelector('div');
    this.ul_wrap1=this.ul_wrap.querySelectorAll('ul')[0];
    this.ul_wrap2=this.ul_wrap.querySelectorAll('ul')[1];    
    this.oli=this.ul_wrap.querySelectorAll('li');
    this.len=this.oli.length;                    
    this.marginBottom=this.config.marginBottom;  //设置li标签的右边距
    this.autoScroll=this.config.autoScroll;  //设置容器的滚动状态
    this.scrollStep=this.config.scrollStep||2;  //设置容器滚动的步长
    this.scrollSpeed=this.config.scrollSpeed || 20;  //设置容器滚动的速度
    this.setTime = null;
    this.warp_height=this.wrap.offsetHeight;
    this.ul_wrap_height=this.ul_wrap.offsetHeight;
    this.dirY = 0;                    
    this.init();                    
}
UcanSlide.prototype.init=function(){
    var _this=this;
    if(this.ul_wrap_height>this.warp_height){   	
    	this.ul_wrap2.innerHTML=this.ul_wrap1.innerHTML;
    	for(var i=0;i<this.len;i++){
	        this.oli[i].style.marginBottom=this.marginBottom+'px';
	        this.ul_wrap_height+=(this.oli[i].offsetHeight+this.marginBottom);
	    }
	    this.ul_wrap.style.height=this.ul_wrap_height+'px';
    	if(this.autoScroll){
		    //执行无缝滚动
		    this.setTime=setInterval(function(){
		         　　   _this.move();
	        },this.scrollSpeed);     
	    }
    }
 
    this.ul_wrap.addEventListener('touchstart',function(e){
         _this.touchStart(e);            
    },false);
    this.ul_wrap.addEventListener('touchmove',function(e){                        
         _this.touchMove(e);
    },false);
    this.ul_wrap.addEventListener('touchend',function(e){
         _this.touchEnd(e);
    },false);  
                     
}
var ul_wrap2_top='';
UcanSlide.prototype.move=function(){
    if(this.autoScroll){   //自由滚动状态（自右向左）
        this.dirY=this.dirY-this.scrollStep;
        ul_wrap2_top = this.ul_wrap2.offsetTop;
        if(ul_wrap2_top <= -this.dirY ||this.dirY>0){
            //clearInterval(this.setTime);
            this.dirY=0;           
        }
    }
    else{   //拖动状态
        if(ul_wrap2_top <= -this.dirY/*this.dirY <= -this.ul_wrap_height/2*/){           
            this.dirY=0;
        }
        else if(this.dirY>=0){
            this.dirY = -this.ul_wrap_height/2;
        }
    }

    this.ul_wrap.style.webkitTransform='translate3d('+'0px,'+this.dirY+'px,'+'0px)';
};

UcanSlide.prototype.touchStart=function(e){ 
    e.preventDefault();
    clearInterval(this.setTime);
    this.startY=e.targetTouches[0].clientY;
};

UcanSlide.prototype.touchMove=function(e){
    e.preventDefault();
    this.autoScroll=false;
    if(this.ul_wrap_height>this.warp_height){
	    this.dirY+=e.targetTouches[0].clientY-this.startY;
	    this.startY=e.targetTouches[0].clientY;//记录前一次触屏坐标
        this.move();
    }
};

UcanSlide.prototype.touchEnd=function(e){
    var _this=this;
    this.autoScroll=true;
    if(this.ul_wrap_height>this.warp_height){
	    this.setTime=setInterval(function(){
	        _this.move();
	    },this.scrollSpeed);
    }
};