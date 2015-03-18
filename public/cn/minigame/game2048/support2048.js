/**
 * Created by jinwyp on 2/19/15.
 */
// JavaScript Document


//定义长宽，以便在移动端中自适应

documentWidth = window.screen.availWidth;
containerWidth = 0.92 * documentWidth;
cellLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPos(i){
    //初始化行和列，输入i为top，输入j为left
    //return i * 120 + 20;
    return i * (cellSpace + cellLength) + cellSpace;
}


function getColor(num){
    //设置cell的颜色
    var color = new Array;
    var bg = "";
    var textcolor = "";

    if ((Math.log(num)/Math.log(2))%2==1){
        bg = "orange";
        textcolor="#ffffff";
    }else{
        bg = "#eee4da";
        textcolor="orange";
    }
    /* 每个格子不同颜色
     switch(num){
     case 2: bg = "orange";
     textcolor="#ffffff";
     break;
     case 4: bg = "#eee4da";
     textcolor="orange";
     break;
     case 8: bg = "orange";
     textcolor="#ffffff";
     break;
     case 16: bg = "#eee4da";
     textcolor="orange";
     break;
     case 32: bg = "orange";
     textcolor="#ffffff";
     break;
     case 64: bg = "#eee4da";
     textcolor="orange";
     break;
     case 128: bg = "orange";
     textcolor="#ffffff";
     break;
     case 256: bg = "#eee4da";
     textcolor="orange";
     break;
     case 512: bg = "orange";
     textcolor="#ffffff";
     break;
     case 1024: bg = "#eee4da";
     textcolor="orange";
     break;
     case 2048: bg = "orange";
     textcolor="#ffffff";
     break;
     case 4096: bg = "#eee4da";
     textcolor="orange";
     break;
     case 8192: bg = "orange";
     textcolor="#ffffff";
     break;
     }
     */
    color[0] = bg;
    color[1] = textcolor;
    return color;

}

function checkNum(num){
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j]==num){
                $("#gameWin").show(500);
            }

}

function noSpace(board){
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j]==0)
                return false;

    return true;
}

function showNum(i,j,num){
    //数字产生动画
    var cell = $('#cellNumber-'+i+j);
    cell.css({'background-color':getColor(num)[0],
        'color':getColor(num)[1]
    });
    cell.text(num);
    cell.animate({'width':cellLength,
        'height':cellLength,
        'border-radius':0.1*cellLength,
        'top':getPos(i),
        'left':getPos(j)
    },80);
}

function moveAnimation(fromx,fromy,tox,toy){

    var numCell = $('#cellNumber-' + fromx + fromy);
    numCell.animate({
        top:getPos( tox ),
        left:getPos( toy )
    },200);



}


function noMove(board){
    if (canMoveUp( board ) || canMoveDown( board )
        || canMoveLeft( board ) || canMoveRight( board ))
        return false;

    return true;

}

function isGameOver(){

    if (noSpace(board) && noMove(board)){
        //if (score>15){ //测试用
        //$("#gameOver").css('display','block');
        $("#gameOver").show(500);
    }

}

function continuePlay(){
    $("#gameWin").remove();

}