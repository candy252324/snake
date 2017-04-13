var foodObj=function(){
	this.row=[];
	this.col=[];
	this.num=0;   //普通果实数量

	this.magicRow=[];
	this.magicCol=[];
	this.magicNum=0;    //魔力果实数量

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
				var tr=document.getElementsByTagName("tr")[this.row[i]];
				th=tr.getElementsByTagName("th")[this.col[i]];

				th.className="normal-food";
				board.boardArr[this.row[i]][this.col[i]].available=false;

				i++;
			}
		}
	}
	
}

foodObj.prototype.generateMagicFoods=function(){

	if(Math.random()<0.1 && this.magicNum<1){
		this.magicNum=Math.random()<0.8?1:2;   
		var i=0;
		while(i<this.magicNum){
			this.magicRow[i]=Math.floor(Math.random()*board.boardRow);
			this.magicCol[i]=Math.floor(Math.random()*board.boardCol);

			if(board.boardArr[this.magicRow[i]][this.magicCol[i]].available){
				var tr=document.getElementsByTagName("tr")[this.magicRow[i]];
				th=tr.getElementsByTagName("th")[this.magicCol[i]];

				th.className="magic-food";
				board.boardArr[this.magicRow[i]][this.magicCol[i]].available=false;

				i++;
			}
		}
	}
	
}
