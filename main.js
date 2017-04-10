var interval;
var continueFlag=1;   // 暂停/继续
document.body.onload=init;


function init(){
	board=new boardObj();
	board.init();

	score=new scoreObj();
	score.init();

	//开始游戏
	var start=document.getElementById("start");
	start.addEventListener("click",function(){
		// if(interval){
		// 	clearInterval(interval)
		// }
		gameStart();
	})

	// 游戏暂停
	var pause=document.getElementById("pause");
	pause.addEventListener("click",function(){
		if(interval){
			clearInterval(interval);  //只是停止，并未清除
			interval=null;  //清除
		}else{
			interval=setInterval(snake.move, snake.speed)
		}

	})

	// 选择棋盘大小
	var selectIpt=document.getElementById("selectIpt");
	selectIpt.addEventListener("change",function(){
		clearInterval(interval)
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

	if(interval){  //只有在int存在，即游戏进行时，keydown事件才有效
		keyboard.doKeyDown();
		// keyboard.doKeyUp();;
	}
}

function gameOver(){
	alert("游戏结束！")
	clearInterval(interval)
}

// var int=setInterval(clock,100)
// function clock(){
// 	console.log(1)
// }

// var int=setInterval(clock,500)
// function clock(){
// 	console.log(2)
// }

// var int=setInterval(clock,500)
// function clock(){
// 	console.log(2)
// }

// console.log(int)
