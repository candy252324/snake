var interval;
document.body.onload=init;


function init(){
	board=new boardObj();
	board.init();

	score=new scoreObj();
	score.init();



	var start=document.getElementById("start");
	var pause=document.getElementById("pause");
	var selectIpt=document.getElementById("selectIpt");

	//开始游戏
	start.addEventListener("click",function(){
		if(interval){
			var msg=confirm("游戏尚未结束，是否重新开始？")
			if(msg){
				clearInterval(interval)
			}else{
				return
			}
		}
		gameStart();
	})

	// 改变棋盘大小
	selectIpt.addEventListener("change",function(){
		if(interval){
			var msg=confirm("游戏尚未结束，是否更换棋盘？")
			if(msg){
				clearInterval(interval)
				interval=null;
			}else{
				return
			}
		}
		board.init();
	})
}


function gameStart(){
	food=new foodObj();
	food.init();

	snake=new snakeObj();
	snake.init();



	collision=new collisionObj();
	
	keyboard=new keyboardObj();
	interval=setInterval(snake.move,snake.speed)

	if(interval){  //只有在interval存在，即游戏进行时，keydown事件才有效
		keyboard.doKeyDown();
		// keyboard.doKeyUp();;
	}

	pause.addEventListener("click",pauseOrContinue)  //游戏开始后，添加 pause按钮的事件绑定
}

function gameOver(){
	var msg=alert("游戏结束！")
	if(!msg){
		board.init();
	}
	clearInterval(interval)
	interval=null;

	pause.removeEventListener("click", pauseOrContinue)   //游戏结束后，解除 pause按钮的事件绑定
}


function pauseOrContinue(){
	if(interval){
		clearInterval(interval);  //只是停止，并未清除
		interval=null;  //必须清除，否则暂停后无法重新开启
	}else{
		interval=setInterval(snake.move, snake.speed)
	}
}