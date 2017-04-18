var keyboardObj=function(){
	this.timeout=[];
	this.lastkeyCode=-1;
}

keyboardObj.prototype.doKeyDown=function(){
	var me=this;
	document.body.addEventListener("keydown",function(e){
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
		beta=0.3;
	})

	document.body.addEventListener("keyup",function(e){
		beta=0;
	})
}
