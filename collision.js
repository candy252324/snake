var collisionObj=function(){
	this.collisionType=""
}

// 蛇是否与食物发生了碰撞
collisionObj.prototype.snakeFoodCli=function(){
	for(var i=0;i<food.num;i++){
		if(snake.row[0]==food.row[i]&&snake.col[0]==food.col[i]){

			// this.collisionType=board.boardArr[food.row[i]][food.col[i]].className; //吃到的食物的class
			this.collisionType="normal-food";   //确定类型，用于计算分数

			food.row.splice(i,1)   //删除与蛇发生了碰撞的食物的坐标
			food.col.splice(i,1)
			food.num -=1;
			return true;   
		}
		
	}
	for(var i=0;i<food.magicNum;i++){
		if(snake.row[0]==food.magicRow[i]&&snake.col[0]==food.magicCol[i]){

			// 清除对应定时器
			var timerName="timer"+food.magicRow[i]+"-"+food.magicCol[i];
			food.timer[timerName].flag=true;
			food.clearTimer(timerName);
            
			// this.collisionType= board.boardArr[food.magicRow[i]][food.magicCol[i]].className;  //吃到的食物的class
			this.collisionType="magic-food";

			//删除与蛇发生了碰撞的食物的坐标
			food.magicRow.splice(i,1)   
			food.magicCol.splice(i,1)
			food.magicNum -=1;
			return true;
		}
	}
	return false;
}

// 蛇是否与自身发生了碰撞
collisionObj.prototype.snakeSelfCli=function(){
	for(var i=1;i<snake.num;i++){
		if(snake.row[0]==snake.row[i]&&snake.col[0]==snake.col[i]){
			return true;
		}
	}
	return false;
}
// 蛇是否与棋盘边缘发生了碰撞
collisionObj.prototype.snakeWallCli=function(){
	if((snake.row[0]<0)||(snake.col[0]>board.boardCol-1)||(snake.row[0]>board.boardRow-1)||(snake.col[0]<0)){
		return true;
	}
	return false;
}