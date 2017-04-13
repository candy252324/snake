var keyboardObj=function(){
	this.timeout=[];
}

keyboardObj.prototype.doKeyDown=function(){
	var me=this;
	document.body.addEventListener("keydown",function(e){

		me.longPress(e);
		
		switch(e.keyCode){
			case 37:  //left
				// 蛇身体长于一节时，禁止通过方向键使其向 与原本运动方向相反的方向 运动
				if(snake.num>1){
					if(snake.directionNum==1){
						return;
					}
				}
				snake.directionNum=3;
				break;

			case 38:  //top
				if(snake.num>1){
					if(snake.directionNum==2){
						return;
					}
				}
				snake.directionNum=0;
				break;

			case 39:  //right
				if(snake.num>1){
					if(snake.directionNum==3){
						return;
					}
				}
				snake.directionNum=1;
				break;

			case 40:  //bottom
				if(snake.num>1){
					if(snake.directionNum==0){
						return;
					}
				}
				snake.directionNum=2;
				break;

		}
	})
}
keyboardObj.prototype.longPress=function(e){
	if(e.keyCode==37||e.keyCode==38||e.keyCode==39||e.keyCode==40){
		this.timeout.push(setTimeout(function(){
			// snake.speed=100;
			clearInterval(interval)
			interval=setInterval(snake.move,100)
		},500))
	}
}

keyboardObj.prototype.doKeyUp=function(){
	var me=this;
	document.body.addEventListener("keyup",function(e){
		if(e.keyCode==37||e.keyCode==38||e.keyCode==39||e.keyCode==40){
			for(var i=0; i<me.timeout.length; i++){
				clearTimeout(me.timeout[i]);
			}
			me.timeout.length=0;
			snake.speed=300;
		}
		clearInterval(interval)
		interval=setInterval(snake.move,300)
	})
}