var foodObj=function(){
	this.row=[];   //果实所在行
	this.col=[];
	this.num=0;   //每次产生普通果实数量
	this.normalFoodName=["apple","banana","strawberry"];  //普通果实的名称

	this.magicRow=[];
	this.magicCol=[];
	this.magicNum=0;    //魔力果实数量
	this.timer={};   //所有魔力果实的定时器都放在this.timer里， { "timer17-1":[定时器,], "timer5-20":[定时器,] }


}

foodObj.prototype.init=function(){

	var ths=document.getElementsByTagName("th");
	for(var i=0; i<ths.length; i++){
		ths[i].className="";
	}
	this.generateFoods()
	this.generateMagicFoods()
}

foodObj.prototype.generateFoods=function(){
	if(this.num<1){
		var i=0;
		this.num=Math.random()<0.8?1:2; 
		while(i<this.num){

			var row=this.row[i]=Math.floor(Math.random()*board.boardRow);
			var col=this.col[i]=Math.floor(Math.random()*board.boardCol);

			// 保证生成的食物不在同一位置
			if(board.boardArr[row][col].available){
				
				var rand=Math.floor(Math.random()*this.normalFoodName.length)   //1 2 3 
				board.boardArr[row][col].className=this.normalFoodName[rand]
				board.boardArr[row][col].available=false;

				i++;
			}
		}
	}
	
}

foodObj.prototype.generateMagicFoods=function(){
	var me=this;
	if(Math.random()<0.008 && this.magicNum<1){
		this.magicNum=Math.random()<0.01?2:1;   
		var i=0;
		while(i<this.magicNum){

			var row=this.magicRow[i]=Math.floor(Math.random()*board.boardRow);
			var col=this.magicCol[i]=Math.floor(Math.random()*board.boardCol);

			if(board.boardArr[row][col].available){
			
				board.boardArr[row][col].className="magic-food";
				board.boardArr[row][col].available=false;

				// 果实产生 若干秒（大于3秒） 后，将执行magicFoodDispear()函数
				// 因为定时器延迟执行后，i,row,col值会被覆盖，立即执行函数是为了将每个i,row,col值保存下来
				(function(i,row,col){
					me.magicFoodDispear(i,row,col)
				})(i,row,col)
			
				i++;
			}
		}
	}

}


//{ "timerName":[定时器,], "timerName":[定时器,] }
foodObj.prototype.magicFoodDispear=function(i,row,col){
	
	var me=this;

	var timerName="timer"+row+"-"+col;  //以魔力果实坐标的位置 命名对应定时器
	var TimerArr=me.timer[timerName]=[];   //将me.timer[timerName]定义成数组对象，便可以在上面绑定clock属性（需要重复调用的函数），disTime属性（调用的延迟时间）
	TimerArr.disTime=2000;
	TimerArr.clock=function(){

		if(TimerArr.disTime<80){  //时间间隔是否 < 自定义时间了
			food.clearTimer(timerName);
			board.boardArr[row][col].className="";
			board.boardArr[row][col].available=true;
			food.magicNum -=1;
			return
		}
		if(me.timer[timerName].flag) {  //果实被吃掉了
			return
		}else{   //果实没被吃掉
			board.boardArr[row][col].className="";
			me.timer[timerName].push(setTimeout(function(){

				if(me.timer[timerName].flag) {   //80ms延时后需要再次做判断，果实是否被吃掉了
					return
				}else{  
					me.timer[timerName].push(setTimeout(TimerArr.clock, TimerArr.disTime));

					board.boardArr[row][col].className="magic-food";
					TimerArr.disTime *=.6;

				}
			},80))
		}
	}

	TimerArr.push(setTimeout(TimerArr.clock, TimerArr.disTime+2000));
}



//{ "timerName":[定时器,], "timerName":[定时器,] }

// 清除某个魔力果实的定时器
foodObj.prototype.clearTimer=function(timerName){
	for(var i=0; i<this.timer[timerName].length; i++){
		clearTimeout(this.timer[timerName][i]);
		this.timer[timerName][i]=null;
	}
	delete(this.timer[timerName])  //以免 this.timer 越来越长
}


//暂停页面上所有魔力果实的定时器
foodObj.prototype.pauseAllTimer=function(){
	for(v in this.timer){
		for(var i=0; i<this.timer[v].length; i++){
			clearTimeout(this.timer[v][i]);
			this.timer[v][i]=null;
		}
	}
}

//重启页面上所有魔力果实的定时器
foodObj.prototype.startAllTimer=function(){
	for(v in this.timer){
		this.timer[v].push(setTimeout(this.timer[v].clock, this.timer[v].disTime));
	}
}


