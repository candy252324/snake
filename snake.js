var snakeObj=function(){
	this.row=[];   
	this.col=[];
	this.directionNum=0;
	this.baseSpeed=250;
}

snakeObj.prototype.num=1;  //初始状态蛇只有一节身体
snakeObj.prototype.init=function(){

	var i=0;
	while(i<1){

		this.row[0]=Math.floor(Math.random()*board.boardRow);
		this.col[0]=Math.floor(Math.random()*board.boardCol);

		// 保证生成的蛇和食物的位置不同
		if(board.boardArr[this.row[0]][this.col[0]].available){
			for(var i=0; i<this.num; i++){
			
				board.boardArr[this.row[0]][this.col[0]].className="snake-header";
				board.boardArr[this.row[0]][this.col[0]].available=false;
			}
			i++;
		}
	}

	this.direction();

	snakeSelf=this;  //move在setInterval调用，需要先保存this
}

snakeObj.prototype.direction=function(){
	var arr=[],   //[disTop,isRight,disBottom,disLeft]
		disTop=this.row,
		disRight=board.boardCol-this.col-1,
		disBottom=board.boardRow-this.row-1;
		disLeft=this.col,
	arr[0]=disTop;
	arr[1]=disRight;
	arr[2]=disBottom;
	arr[3]=disLeft;

	var i=0;
	while(i<1){
		this.directionNum=Math.floor(Math.random()*arr.length)
		if(arr[this.directionNum]!=0){
			i++;
			return this.directionNum   //0向上， 1向右， 2向下， 3向左
		}
	}
}

snakeObj.prototype.move=function(){
	var oldHeader;
	var rotateDeg;   //发生转弯时蛇头该旋转的角度
	switch (snakeSelf.directionNum ){
		case 0:  // move top

			oldHeader=board.boardArr[snakeSelf.row[0]][snakeSelf.col[0]]

			// 添加头
			snakeSelf.row.unshift(parseInt(snakeSelf.row[0])-parseInt(1))
			snakeSelf.col.unshift(snakeSelf.col[0])
			rotateDeg=180;
			break;

		case 1:   // move right
			oldHeader=board.boardArr[snakeSelf.row[0]][snakeSelf.col[0]]

			snakeSelf.col.unshift(parseInt(snakeSelf.col[0])+parseInt(1))
			snakeSelf.row.unshift(snakeSelf.row[0])
			rotateDeg=-90;
			break;

		case 2:  // move bottom
			oldHeader=board.boardArr[snakeSelf.row[0]][snakeSelf.col[0]]

			snakeSelf.row.unshift(parseInt(snakeSelf.row[0])+parseInt(1))
			snakeSelf.col.unshift(snakeSelf.col[0])
			rotateDeg=0;
			break;

		case 3:  // move left
			oldHeader=board.boardArr[snakeSelf.row[0]][snakeSelf.col[0]]

			snakeSelf.col.unshift(parseInt(snakeSelf.col[0])-parseInt(1))
			snakeSelf.row.unshift(snakeSelf.row[0])
			rotateDeg=90;
			break;
	}

	
	// 撞到棋盘边缘或撞到自己，则游戏结束
	if(collision.snakeWallCli()||collision.snakeSelfCli()){
		gameOver();
		return;
	}

	var lastRow=snakeSelf.row.pop(snakeSelf.row[snakeSelf.num])
	var lastCol=snakeSelf.col.pop(snakeSelf.col[snakeSelf.num])

	board.boardArr[snakeSelf.row[0]][snakeSelf.col[0]].available=false;
	board.boardArr[lastRow][lastCol].available=true;

	food.generateMagicFoods();
	// 如果碰到食物，则身体加长、重新产生普通果实、计算得分
	if(collision.snakeFoodCli()){
		snakeSelf.addBody(lastRow,lastCol);
		board.boardArr[lastRow][lastCol].available=false;
		
		food.generateFoods();
		score.addScore(collision.collisionType);
	}

	snakeSelf.modifyStyle(oldHeader,lastRow,lastCol);
	snakeSelf.rotateHeader(rotateDeg);

}

snakeObj.prototype.rotateHeader=function(deg){
	var header=document.getElementsByClassName("snake-header")[0];
	header.setAttribute("style","transform:rotate("+deg+"deg)")
	header.setAttribute("style","-o-transform:rotate("+deg+"deg)")
	header.setAttribute("style","-ms-transform:rotate("+deg+"deg)")
	header.setAttribute("style","-moz-transform:rotate("+deg+"deg)")
	header.setAttribute("style","-webkit-transform:rotate("+deg+"deg)")
}

snakeObj.prototype.modifyStyle=function(oldHeader,lastRow,lastCol){
	// 去除旧头的旋转角度
	oldHeader.style.transform="rotate(0deg)"
	oldHeader.style.oTransform="rotate(0deg)"
	oldHeader.style.msTransform="rotate(0deg)"
	oldHeader.style.mozTransform="rotate(0deg)"
	oldHeader.style.webkitTransform="rotate(0deg)"
	
	// 新头新尾
	board.boardArr[this.row[0]][this.col[0]].className="snake-header";
	board.boardArr[lastRow][lastCol].className="";

	if(this.num>1){
		for(var i=1; i<this.num; i++){
			board.boardArr[this.row[i]][this.col[i]].className="snake-body";
		}
	}
}

snakeObj.prototype.addBody=function(lastRow,lastCol){
	this.row.push(lastRow);
	this.col.push(lastCol);
	this.num +=1;
}

