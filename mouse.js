var mouseObj=function(){
	this.timeout=[];
	this.lastkeyCode=-1;
}

mouseObj.prototype.doClick=function(){
	var me=this;
	var directionBtn=document.getElementsByClassName("direction-btn")[0];
	directionBtn.addEventListener("click",function(e){
		switch(e.target.parentNode.className){
			case "left":  //left
				// 蛇身体长于一节时，禁止通过方向键使其向 与原本运动方向相反的方向 运动
				if(snake.num>1){
					if(snake.directionNum==1){
						return;
					}
				}
				snake.directionNum=3;
				break;

			case "top":  //top
				if(snake.num>1){
					if(snake.directionNum==2){
						return;
					}
				}
				snake.directionNum=0;
				break;

			case "right":  //right
				if(snake.num>1){
					if(snake.directionNum==3){
						return;
					}
				}
				snake.directionNum=1;
				break;

			case "bottom":  //bottom
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
