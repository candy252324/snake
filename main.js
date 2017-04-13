var interval;
var gameStatus;
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
		if(gameStatus=="run"||gameStatus=="pause"){
			var msg=confirm("游戏尚未结束，是否重新开始？")
			if(msg){
				gameOver();
				score.init();
			}else{
				return
			}
		}
		gameStart();
		
	})

	// 改变棋盘大小
	selectIpt.addEventListener("change",function(){
		if(gameStatus=="run"||gameStatus=="pause"){
			var msg=confirm("游戏尚未结束，是否更换棋盘？")
			if(msg){
				gameOver();
				score.init();
			}else{
				return
			}
		}
		board.init();
	})
}


function gameStart(){
	gameStatus="run";

	food=new foodObj();
	food.init();

	snake=new snakeObj();
	snake.init();

	collision=new collisionObj();
	
	keyboard=new keyboardObj();
	interval=setInterval(snake.move,snake.speed)

	if(gameStatus=="run"){  //只有游戏进行时，keydown事件才有效
		keyboard.doKeyDown();
		// keyboard.doKeyUp();;
	}
	pause.addEventListener("click",pauseOrContinue)  
	
}

function gameOver(){
	gameStatus="end";
	board.init();
	clearInterval(interval)  // 蛇停止运动
	interval=null;
	food.pauseAllTimer();  // 魔力果实停止闪烁
	pause.removeEventListener("click", pauseOrContinue)   //解除 pause按钮的事件绑定
	
}


function pauseOrContinue(){
	if(interval){
		clearInterval(interval); 
		interval=null; 
		food.pauseAllTimer();
		gameStatus="pause";
	}else{
		interval=setInterval(snake.move, snake.speed)
		food.startAllTimer();
		gameStatus="run";
	}
}

document.body.addEventListener("click",function(e){
	console.log(e.target.available)
})

