/**
 * Created by jinwyp on 2/19/15.
 */
// JavaScript Document
// 面向过程设计

var board = new Array();
var flag = new Array();
var score = 0;

//支持触碰
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){

    prepareForMobile();
    newGame();
});


function prepareForMobile(){
    //移动端初始化

    if (documentWidth >500){
        containerWidth = 500;
        cellLength = 100;
        cellSpace = 20;
    }

    $('#container').css({'width':containerWidth - 2*cellSpace,
        'height':containerWidth - 2*cellSpace,
        'padding':cellSpace,
        'border-radius':0.02 * containerWidth
    });
    $('.cell').css({'width':cellLength,
        'height':cellLength,
        'border-radius' : 0.1 * cellLength
    });

}


function newGame(){
    //初始化棋盘
    $(".alert").css('display','none');
    init();

    //在两个格子随机产生数字
    initNum();
    initNum();
}

function init(){

    //初始化
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++){
            //初始化网格

            var gridCell = $("#cell-" + i + j);
            gridCell.css({'top':getPos(i),'left':getPos(j)});
            //gridCell.css('left',getPos(j));
        }
    board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

    updateBoardView();
    score = 0;
    updateScore(score);
}

function updateBoardView(){
    $(".cellNumber").remove();

    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++){
            $("#container").append('<div class="cellNumber" id="cellNumber-' + i + j +'"></div>');
            var temp = $('#cellNumber-' + i + j);
            var num = board[i][j]

            if (num==0){
                temp.css({'width':'0px',
                    'height':'0px',
                    'top':getPos(i) + cellLength/2,
                    'left':getPos(j) + cellLength/2
                });
            }else{
                temp.css({'width':cellLength,
                    'height':cellLength,
                    'top':getPos(i),
                    'left':getPos(j),
                    'border-radius':0.1*cellLength,
                    'background-color':getColor(num)[0],
                    'color':getColor(num)[1],
                    'z-index':50
                });
                temp.text(board[i][j]);
            }
        }
    $(".cellNumber").css({
        'line-height':cellLength+'px',
        'font-size':0.4*cellLength+'px'
    });
}

function initNum(){
    if (noSpace(board))
        return false;

    //产生随机位置
    var randi = parseInt(Math.floor(Math.random()*4));
    var randj = parseInt(Math.floor(Math.random()*4));

    var loop=0;
    while(board[randi][randj]!=0 && loop<50){
        randi = parseInt(Math.floor(Math.random()*4));
        randj = parseInt(Math.floor(Math.random()*4));
        loop = loop + 1;
    }

    //产生随机数
    var randNum = Math.random()<0.5?2:4;
    //随机位置产生随机数
    if (board[randi][randj]==0){
        board[randi][randj] = randNum;
    }else{
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (board[i][j]==0)
                    board[i][j] = randNum;
    }



    showNum(randi,randj,randNum);



}

$(document).keydown(function(event){

    switch(event.keyCode){
        case 37: //left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",400);
            }
            break;
        case 38: //up
            event.preventDefault();
            if(moveUp()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",400);
            }
            break;
        case 39: //right
            event.preventDefault();
            if(moveRight()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",400);
            }
            break;
        case 40://down
            event.preventDefault();
            if(moveDown()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",400);
            }
            break;
        default:
            break;
    }
});

/*
 监听触碰事件
 */
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
    event.preventDefault();
});
document.addEventListener('touchend',function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    //判断左右移动还是上下移动
    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax)<0.3 * documentWidth && Math.abs(deltay)<0.3 * documentWidth){
        return ; //不移动
    }

    if (Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            //右移动
            if(moveRight()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",300);
            }
        }else{
            //左移动
            if(moveLeft()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",300);
            }
        }
    }else{
        if(deltay > 0){
            //下移动
            if(moveDown()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",300);
            }
        }else{
            //上移动
            if(moveUp()){
                setTimeout("initNum()",250);
                setTimeout("isGameOver()",300);
            }
        }
    }

});


function updateScore(score){
    $('#score').text(score);
}

