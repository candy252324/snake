var boardObj=function(){
	this.boardArr=new Array();
	this.boardCol=0;
	this.boardRow=0
}

boardObj.prototype.init=function(){
	
	this.drawBoard();
	//棋盘初始时，每个格子都是可用的
	for(var i=0; i<this.boardArr.length; i++){
		for(var j=0; j<this.boardArr[i].length; j++){
			this.boardArr[i][j].available=true;
		}
	}
}

boardObj.prototype.drawBoard=function(){
	var table=document.getElementsByTagName("table")[0];
	table.innerHTML = '';
	this.boardArr=[];

	this.boardCol=selectIpt.value.substr(0,selectIpt.value.indexOf("*"));  //棋盘列数
	this.boardRow=selectIpt.value.substr(selectIpt.value.indexOf("*")+1);  //棋盘行数

	for(var i=0; i<this.boardRow; i++){
		tr=document.createElement("tr")
		table.appendChild(tr);
		this.boardArr[i]=new Array();

		for(var j=0; j<this.boardCol; j++){
			var th=document.createElement("th");
			tr.appendChild(th);
			this.boardArr[i][j]=th;   //第i行 j列
		}
	}
}
