var mainTimeout=[];
var gameStatus;
var beta;
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
	beta=1;
	mainClock()  // 控制蛇运动的主要函数

	if(gameStatus=="run"){  //只有游戏进行时，keydown事件才有效
		keyboard.doKeyDown();
		// keyboard.doKeyUp();;
	}
	pause.addEventListener("click",pauseOrContinue)  
	
}

function gameOver(){
	alert("游戏结束！")
	clearMainClock()   //蛇停止运动
	food.pauseAllTimer();  // 魔力果实停止闪烁
	pause.removeEventListener("click", pauseOrContinue);  //解除 pause按钮的事件绑定
	board.init();
	score.init();
	gameStatus="end";
}

function pauseOrContinue(){
	if(gameStatus=="run"){
		gameStatus="pause";
		clearMainClock()
		food.pauseAllTimer();
		
	}else if(gameStatus=="pause"){
		gameStatus="run";
		mainClock()
		food.startAllTimer();
		
	}
}

// 控制蛇运动的主要函数
var beta;
function mainClock(){
	if(gameStatus!="end"&&gameStatus!="pause"){
		clearMainClock()
		var alpha=1;
		if(score.totalScore>200&&score.totalScore<=500){
			alpha=0.8;
		}else if(score.totalScore>500&&score.totalScore<=800){
			alpha=0.6;
		}else if(score.totalScore>800){
			alpha=0.5;
		}
		if(!beta){
			snake.speed=alpha*snake.baseSpeed;
		}else{
			snake.speed=beta*snake.baseSpeed;
		}
		console.log(snake.speed)
		snake.move();
		mainTimeout.push(setTimeout(mainClock,snake.speed))
	}
}

function clearMainClock(){
	for(var i=0; i<mainTimeout.length; i++){
		clearTimeout(mainTimeout[i]);
		mainTimeout[i]=null;
	}
}

















var setBtn=document.getElementsByClassName("set")[0],
	setCt=document.getElementsByClassName("set-container")[0],

	boardSizeCt=document.getElementsByClassName("board-size")[0],
	select=document.getElementsByClassName("select")[0],

	ruleCt=document.getElementsByClassName("rule-ct")[0],
	rule=document.getElementsByClassName("rule")[0];

var setCtH=setCt.offsetHeight;
slideUp(setCt);

setBtn.addEventListener("mouseenter",function(){
	slideDown(setCt,setCtH,200)
})
boardSizeCt.addEventListener("mouseenter",function(){
	select.style.display="block"
})
boardSizeCt.addEventListener("mouseleave",function(){
	select.style.display="none"
})

ruleCt.addEventListener("mouseenter",function(){
	rule.style.display="block"
})
ruleCt.addEventListener("mouseleave",function(){
	rule.style.display="none"
})

setBtn.addEventListener("mouseleave",function(){
	slideUp(setCt,200)
})
setCt.addEventListener("mouseleave",function(){
	slideUp(setCt,200)
})
