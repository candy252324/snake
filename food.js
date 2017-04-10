var foodObj=function(){
	this.row=[];
	this.col=[];
	this.num=0;   //普通果实数量

	this.magicRow=[];
	this.magicCol=[];
	this.magicNum=0;    //魔力果实数量

	this.timeout=[];
	this.clock=[];
	this.disTime=[];
	this.timer=[];

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

	if(this.num<1 && this.magicNum<1){
		var i=0;
		this.num=Math.random()<0.6?1:2; 
		while(i<this.num){

			this.row[i]=Math.floor(Math.random()*board.boardRow);
			this.col[i]=Math.floor(Math.random()*board.boardCol);

			// 保证生成的食物不在同一位置
			if(board.boardArr[this.row[i]][this.col[i]].available){
				
				board.boardArr[this.row[i]][this.col[i]].className="normal-food"
				board.boardArr[this.row[i]][this.col[i]].available=false;

				i++;
			}
		}
	}
	
}

foodObj.prototype.generateMagicFoods=function(){
	var me=this;
	if(Math.random()<0.1 && this.magicNum<1){
		this.magicNum=Math.random()<0.1?1:2;   
		var i=0;
		while(i<this.magicNum){
			var n=i;

			this.magicRow[i]=Math.floor(Math.random()*board.boardRow);
			this.magicCol[i]=Math.floor(Math.random()*board.boardCol);

			if(board.boardArr[this.magicRow[i]][this.magicCol[i]].available){
			
				board.boardArr[this.magicRow[i]][this.magicCol[i]].className="magic-food";
				board.boardArr[this.magicRow[i]][this.magicCol[i]].available=false;

				// 果实产生 3s后，将执行magicFoodDispear()函数
				(function(n){
					me.timeout[n]=setTimeout(function(){
						me.magicFoodDispear(n)
					},3000)
				})(n)
			
				i++;
			}
		}
	}

}

foodObj.prototype.magicFoodDispear=function(n){
	var me=this;
	me.disTime[n]=2000;

	(function(n){
		me.clock[n]=function(){
			
			while(me.disTime[n]>50){
				me.timer[n]=setTimeout(me.clock[n], me.disTime[n]);
				board.boardArr[me.magicRow[n]][me.magicCol[n]].className="red";
				me.disTime[n] *=.8;
				console.log(me.disTime[n])
			}
		}
	})(n)

	this.timer[n]=setTimeout(me.clock[n], me.disTime)
	
}


