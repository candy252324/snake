var scoreObj=function(){
	this.normalCt=document.getElementById("normal");
	this.magicCt=document.getElementById("magic");
	this.scoreCt=document.getElementById("total-score");
}
scoreObj.prototype.init=function(){

	this.normalCt.innerText=this.normalNum=0;
	this.magicCt.innerText=this.magicNum=0;
	this.scoreCt.innerText=this.totalScore=0;
}
scoreObj.prototype.addScore=function(type){
	if(type=="normal-food"){
		this.normalNum +=1;
		this.totalScore +=10;
	}
	if(type=="magic-food"){
		this.magicNum +=1;
		this.totalScore +=50;
	}
	this.drawScore();
}
scoreObj.prototype.drawScore=function(){
	this.normalCt.innerText=this.normalNum;
	this.magicCt.innerText=this.magicNum;
	this.scoreCt.innerText=this.totalScore;
}

