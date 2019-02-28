var board = new Array();
var score = 0;
var highScore=0;
var hasConflicted = new Array();
var documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth
cellSpace=0.04*documentWidth

var startx=0;
var starty=0;
var endx=0;
var endy=0;
//~~~~~~~~~~~~~~~~~~~~~~main部分~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$(document).ready(function(){
	
	prepareForMobile();
	newgame();
	$(".new-game").click(newgame)
})

function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$(".gameover").css("top","45%")

	$("#box").css("width",gridContainerWidth-2*cellSpace);
	$("#box").css("height",gridContainerWidth-2*cellSpace);
	$("#box").css("padding",cellSpace);
	$("#box").css("border-radius","6px");

	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.1*cellSideLength)

	// $(".headerHeight").css("height",cellSideLength*1.4)
}

$(document).keydown(function(e){
	switch(e.keyCode){
		case 37://left
			e.preventDefault()
			if(moveLeft()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}
		break;

		case 38://up
			e.preventDefault()
			if(moveUp()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}
		break;

		case 39://right
			e.preventDefault()
			if(moveRight()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}
		break;

		case 40://down
			e.preventDefault()
			if(moveDown()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}
		break;
	}
})

document.addEventListener("touchstart", function(e){
	startx=e.touches[0].pageX;
	starty=e.touches[0].pageY;
});

document.addEventListener("touchmove",function(e){
	e.preventDefault();
})

document.addEventListener("touchend",function(e){
	endx=e.changedTouches[0].pageX;
	endy=e.changedTouches[0].pageY;

	var deltax=endx-startx;
	var deltay=endy-starty;

	if(Math.abs(deltax)<0.1*documentWidth && Math.abs(deltay)<0.1*documentWidth){
		return;
	}

	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
			//left
			if(moveRight()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}

		}else{
			//right
			if(moveLeft()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}
		}		
	}else{
		if(deltay>0){
			//down
			if(moveDown()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}
		}else{
			//up
			if(moveUp()){
				setTimeout("generateOneNumber()",210)
				setTimeout("isGameOver()",300)
			}
		}
	}
})

function newgame(){
	//初始化棋盘格
	init();
	//随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}



//~~~~~~~~~~~~~~~~~~support部分~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function getPosTop(i,j){
	return cellSpace+(cellSpace+cellSideLength)*i
}
function getPosLeft(i,j){
	return cellSpace+(cellSpace+cellSideLength)*j
}

function init(){
	score=0;
	updateScore(score);
	$(".gameover").css("display","none")
	$("#box").css("opacity","1")

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){

			var gridCell = $("#grid-cell-"+i+"-"+j)
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
	}

	for(var i=0;i<4;i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}

	updateBoardView();

}

function isGameOver(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	if(score>highScore){
		highScore=score;
		$("#highScore").text(highScore)
	}
	$(".gameover").css("display","block")
	$("#box").css("opacity","0.5")
	

}

function nomove(board){
	if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
		return false
	}
	return true
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#box").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>")
			var theNumberCell = $("#number-cell-"+i+"-"+j)

			if(board[i][j]==0){
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px")
				theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2)
				theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2)
			}else{
				theNumberCell.css("width",cellSideLength);
				theNumberCell.css("height",cellSideLength)
				theNumberCell.css("top",getPosTop(i,j))
				theNumberCell.css("left",getPosLeft(i,j))
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]))
				theNumberCell.css("color",getNumberColor(board[i][j]))
				theNumberCell.text(board[i][j])
			}

			hasConflicted[i][j]=false;
		}
	}
	$(".number-cell").css("line-height",cellSideLength+"px")
	$(".number-cell").css("font-size",0.4*cellSideLength+"px")
	$(".number-cell").css("border-radius",0.1*cellSideLength)
}

function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4de";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#FD8371";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}

	return "black";
}

function getNumberColor(number){
	if(number<=4){
		return "#776e65"
	}
	return "white"
}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	var times=0;
	while(times<50){
		if(board[randx][randy]==0){
			break;
		}

		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
		times++;
		if(times==50){
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					if(board[i][j]==0){
						randx=i;
						randy=j;
					}
				}
			}
		}
	}
	//随机一个数字
	var randNumber = Math.random()<0.7?2:4;

	//随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber)
	return true;
}

function nospace(board){
	for (var i = 0; i < 4; i++) {
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

function updateScore(score){
	$("#score").text(score)
}

function moveLeft(){
	if(!canMoveLeft(board)){
		return false

	}else{
		for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0;k<j;k++){
						if(board[i][k]==0 && noLeftBlockHorizontal(i,k,j,board)){
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[i][k]==board[i][j] && noLeftBlockHorizontal(i,k,j,board) && hasConflicted[i][k]==false){
							//move
							showMoveAnimation(i,j,i,k);
							//add
							board[i][k]+=board[i][j];
							board[i][j]=0;
							hasConflicted[i][k]=true;
							//add score
							score += board[i][k]
							updateScore(score);

							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200)
		return true
	}
}

function moveRight(){
	if(!canMoveRight(board)){
		return false
	}else{
		for(var i=0;i<4;i++){
			for(var j=2;j>=0;j--){
				if(board[i][j]!=0){
					for(var k=3;k>=j+1;k--){
						if(board[i][k]==0 &&  noLeftBlockHorizontal(i,j,k,board)){
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[i][k]==board[i][j] && noLeftBlockHorizontal(i,j,k,board) && hasConflicted[i][k]==false){
							//move
							showMoveAnimation(i,j,i,k);
							//add
							board[i][k]+=board[i][j];
							board[i][j]=0;
							hasConflicted[i][k]=true;
							//add score
							score += board[i][k]
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200)
		return true
	}
}

function moveUp(){
	if(!canMoveUp(board)){
		return false
	}else{			
		//	move
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=0;k<i;k++){
						if(board[k][j]==0 && noUpBlockHorizontal(j,k,i,board)){
							//move
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j]
							board[i][j]=0
							continue;
						}else if(board[k][j]==board[i][j] && noUpBlockHorizontal(j,k,i,board) && hasConflicted[k][j]==false){
							//move
							showMoveAnimation(i,j,k,j);
							//add
							board[k][j]+=board[i][j]
							board[i][j]=0
							hasConflicted[k][j]=true
							//add score
							score += board[k][j]
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200)
		return true
	}
}

function moveDown(){
	if(!canMoveDown(board)){
		return false
	}else{			
		//	move
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){				
				if(board[i][j]!=0){
					for(var k=3;k>=i+1;k--){
						if(board[k][j]==0 && noDownBlockHorizontal(j,i,k,board) ){
							//move
							showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j]
							board[i][j]=0
							continue;
						}else if(board[k][j]==board[i][j] && noDownBlockHorizontal(j,i,k,board) && hasConflicted[k][j]==false){
							//move
							showMoveAnimation(i,j,k,j);
							//add
							board[k][j]+=board[i][j]
							board[i][j]=0
							hasConflicted[k][j]=true
							//add scroe
							score += board[k][j]
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
		setTimeout("updateBoardView()",200)
		return true
	}
}




function noLeftBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}

function noRightBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false
		}
	}
	return true
}

function noUpBlockHorizontal(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}

function noDownBlockHorizontal(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}

function canMoveLeft(board){
	for (var i = 0; i < 4; i++) {
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0 || board[i][j]==board[i][j-1]){
					return true
				}
			}
		}
	}
	return false
}

function canMoveRight(board){
	for (var i = 0; i < 4; i++) {
		for(var j=0;j<3;j++){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 || board[i][j]==board[i][j+1]){
					return true
				}
			}
		}
	}
	return false
}

function canMoveUp(board){
	for (var i = 1; i < 4; i++) {
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i][j]==board[i-1][j]){
					return true
				}
			}
		}
	}
	return false
}

function canMoveDown(board){
	for (var i = 0; i < 3; i++) {
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0 || board[i][j]==board[i+1][j]){
					return true
				}
			}
		}
	}
	return false
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~animation部分~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $("#number-cell-"+i+"-"+j);

	numberCell.css("background-color",getNumberBackgroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber))
	numberCell.text(randNumber)

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50)
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200)
}