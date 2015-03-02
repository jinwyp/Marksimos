/**
 * Created by jinwyp on 2/19/15.
 */
function moveLeft(){
    if (!canMoveLeft(board))
        return false;

    //move left
    flag = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++){
            if (board[i][j]!=0){

                for (var k = j - 1; k >= 0 ; k--){
                    if (k == 0){
                        if(board[i][k] == 0){
                            moveAnimation(i,j,i,k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                        }else if (board[i][k] == board[i][j] && flag[i][k]!=1){

                            moveAnimation(i,j,i,k);
                            board[i][k] = board[i][k]*2;

                            score = score + board[i][j]*2;
                            updateScore(score);

                            board[i][j] = 0;
                            flag[i][k] = 1;


                        }else if (k!=j-1){
                            board[i][k+1] = board[i][j];
                            board[i][j] = 0;
                        }
                    }else{
                        if (board[i][k]!=0){
                            if (board[i][k] == board[i][j] && flag[i][k]!=1){

                                moveAnimation(i,j,i,k);
                                board[i][k] = board[i][k]*2;

                                score = score + board[i][j]*2;
                                updateScore(score);

                                board[i][j] = 0;
                                flag[i][k] = 1;
                            }else if (k!=j-1){

                                moveAnimation(i,j,i,k);
                                board[i][k+1] = board[i][j];
                                board[i][j] = 0;
                            }
                            break;
                        }
                    }
                }

            }


        }

    setTimeout("updateBoardView()",200);
    checkNum(2048);
    return true;

}

function moveUp(){
    if (!canMoveUp(board))
        return false;

    //move Up
    flag = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++){
            if (board[i][j]!=0){

                for (var k = i - 1; k >= 0 ; k--){
                    if (k == 0){
                        if(board[k][j] == 0){

                            moveAnimation(i,j,k,j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                        }else if (board[k][j] == board[i][j] && flag[k][j]!=1){

                            moveAnimation(i,j,k,j);
                            board[k][j] = board[k][j]*2;

                            score = score + board[i][j]*2;
                            updateScore(score);

                            board[i][j] = 0;
                            flag[i][k] = 1;
                        }else if (k!=i-1){

                            moveAnimation(i,j,k,j);
                            board[k+1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                    }else{
                        if (board[k][j]!=0){
                            if (board[k][j] == board[i][j] && flag[k][j]!=1){

                                moveAnimation(i,j,k,j);
                                board[k][j] = board[k][j]*2;

                                score = score + board[i][j]*2;
                                updateScore(score);

                                board[i][j] = 0;
                                flag[k][j] = 1;
                            }else if (k!=i-1){

                                moveAnimation(i,j,k,j);
                                board[k+1][j] = board[i][j];
                                board[i][j] = 0;
                            }
                            break;
                        }
                    }
                }

            }


        }

    setTimeout("updateBoardView()",200);
    checkNum(2048);
    return true;
}

////////////////

function moveRight(){
    if (!canMoveRight(board))
        return false;

    //move right
    flag = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--){
            if (board[i][j]!=0){

                for (var k = j + 1; k <=3; k++){
                    if (k == 3){
                        if(board[i][k] == 0){
                            moveAnimation(i,j,i,k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                        }else if (board[i][k] == board[i][j] && flag[i][k]!=1){

                            moveAnimation(i,j,i,k);

                            board[i][k] = board[i][k]*2;

                            score = score + board[i][j]*2;
                            updateScore(score);

                            board[i][j] = 0;
                            flag[i][k] = 1;
                        }else if (k!=j+1){

                            moveAnimation(i,j,i,k);
                            board[i][k-1] = board[i][j];
                            board[i][j] = 0;
                        }
                    }else{
                        if (board[i][k]!=0){
                            if (board[i][k] == board[i][j] && flag[i][k]!=1){

                                moveAnimation(i,j,i,k);
                                board[i][k] = board[i][k]*2;

                                score = score + board[i][j]*2;
                                updateScore(score);

                                board[i][j] = 0;
                                flag[i][k] = 1;
                            }else if (k!=j+1){

                                moveAnimation(i,j,i,k);
                                board[i][k-1] = board[i][j];
                                board[i][j] = 0;
                            }
                            break;
                        }
                    }
                }

            }


        }

    setTimeout("updateBoardView()",200);
    checkNum(2048);
    return true;
}


function moveDown(){
    if (!canMoveDown(board))
        return false;

    //move down
    flag = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--){
            if (board[i][j]!=0){

                for (var k = i + 1; k <=3; k++){
                    if (k == 3){
                        if(board[k][j] == 0){

                            moveAnimation(i,j,k,j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                        }else if (board[k][j] == board[i][j] && flag[k][j]!=1){

                            moveAnimation(i,j,k,j);
                            board[k][j] = board[k][j]*2;

                            score = score + board[i][j]*2;
                            updateScore(score);

                            board[i][j] = 0;
                            flag[k][j] = 1;
                        }else if (k!=i+1){

                            moveAnimation(i,j,k,j);
                            board[k-1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                    }else{
                        if (board[k][j]!=0){
                            if (board[k][j] == board[i][j] && flag[k][j]!=1){

                                moveAnimation(i,j,k,j);
                                board[k][j] = board[k][j]*2;

                                score = score + board[i][j]*2;
                                updateScore(score);

                                board[i][j] = 0;
                                flag[k][j] = 1;
                            }else if (k!=i+1){

                                moveAnimation(i,j,k,j);
                                board[k-1][j] = board[i][j];
                                board[i][j] = 0;
                            }
                            break;
                        }
                    }
                }

            }


        }

    setTimeout("updateBoardView()",200);
    checkNum(2048);
    return true;
}

function canMoveLeft( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;

    return false;
}

function canMoveUp( board ){

    for( var i = 1 ; i < 4 ; i ++ )
        for( var j = 0; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

function canMoveRight( board ){

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0; j < 3 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;

    return false;
}

function canMoveDown( board ){

    for( var i = 0 ; i < 3 ; i ++ )
        for( var j = 0; j < 4 ; j ++ )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}