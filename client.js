//FUNCIONEEES
function get_posible_moves(board, column, row, playerID){
  /*
  row: 0 a 7;
  column: 0 a 7;
  */
  var i = 0;
  var j = 0;
  var otherP = 1;
  if (playerID == 1)
    otherP = 2;
  var moves = [];

  if(row < 0 || row > 7 || column < 0 || column > 7)
    return moves;

  //NORTE
  i = row - 1
    if (i >= 0 && board[i][column] == otherP){
        i = i - 1;
        while (i >= 0 && board[i][column] == otherP){
            i = i - 1;
        }
        if (i >= 0 && board[i][column] == 0){
            //moves.push([column,i]);
            moves.push(i*8 + column);
        }
    }
  //NORESTE
  i = row - 1
    j = column + 1
    if (i >= 0 && j < 8 && board[i][j] == otherP){
        i = i - 1
        j = j + 1
        while (i >= 0 && j < 8 && board[i][j] == otherP){
            i = i - 1
            j = j + 1
        }
        if (i >= 0 && j < 8 && board[i][j] == 0){
            //moves.push([j,i]);
            moves.push(i*8 + j);
        }
    }

  //ESTE
  j = column + 1;
    if (j < 8 && board[row][j] == otherP){
        j = j + 1;
        while (j < 8 && board[row][j] == otherP){
            j = j + 1;
        }
        if (j < 8 && board[row][j] == 0){
          //moves.push([j,row]);
            moves.push(row*8+j);
      }
    }
  //SURESTE
  i = row + 1;
    j = column + 1;
    if (i < 8 && j < 8 && board[i][j] == otherP){
        i = i + 1;
        j = j + 1;
        while (i < 8 && j < 8 && board[i][j] == otherP){
            i = i + 1;
            j = j + 1;
        }
        if (i < 8 && j < 8 && board[i][j] == 0){
            //moves.push([j,i]);
            moves.push(i*8 + j);
        }
    }
  //SUR
  i = row + 1;
    if (i < 8 && board[i][column] == otherP){
        i = i + 1;
        while (i < 8 && board[i][column] == otherP){
            i = i + 1;
        }
        if (i < 8 && board[i][column] == 0){
            //moves.push([column,i]);
            moves.push(i*8+column);
        }
    }
  //SUROESTE
  i = row + 1;
    j = column - 1;
    if (i < 8 && j >= 0 && board[i][j] == otherP){
        i = i + 1;
        j = j - 1;
        while (i < 8 && j >= 0 && board[i][j] == otherP){
            i = i + 1;
            j = j - 1;
        }
        if (i < 8 && j >= 0 && board[i][j] == 0){
            //moves.push([j,i]);
            moves.push(i*8 + j);
        }
    }

  //OESTE
  j = column - 1;
    if (j >= 0 && board[row][j] == otherP){
        j = j - 1;
        while (j >= 0 && board[row][j] == otherP){
            j = j - 1;
        }
        if (j >= 0 && board[row][j] == 0){
            //moves.push([j,row]);
            moves.push(row*8+j)
        }
    }

  //NOROESTE
  i = row - 1;
    j = column - 1;
    if (i >= 0 && j >= 0 && board[i][j] == otherP){
        i = i - 1;
        j = j - 1;
        while (i >= 0 && j >= 0 && board[i][j] == otherP){
            i = i - 1;
            j = j - 1;
        }
        if (i >= 0 && j >= 0 && board[i][j] == 0){
            //moves.push([j,i]);
            moves.push(i*8 + j);
        }
    }


    return moves;
}

function transform_board(data){
  var temp = [];
  var board = [];
  for(var i = 1; i<=data.length;i++){
    temp.push(data[i-1]);
    if(i%8 == 0){
      board.push(temp);
      temp = [];
    }
  }
  return board;
}

/*constantes predefinidas*/
var maxDepth = 7;
var black = 1;
var white = 2;
var n = 8;
var empty = 0;

function countPieces(board){
    //cada posicion es una ficha del tablero
    var pieces = [];
    pieces[empty] = 0;
    pieces[black] = 0;
    pieces[white] = 0;

    for (var i = 0; i < board.length; i++)
        pieces[board[i]]++;

    return pieces;
}

function hasEmptySpaces(board){
    return countPieces(board)[empty] > 0;
}

function getFlippedPositions(board, currentPlayer, position){
    var otherColor = currentPlayer === black ? white : black;
    var deltaDir = {
        left: (-1) * n + (0),
        right: 1*n + 0,
        down: 0*n + 1,
        up: 0*n + (-1),
        leftDown: (-1)*n + 1,
        rightDown: 1*n + 1,
        leftUp: (-1) * n + (-1),
        rightUp: 1*n + (-1)
    };

    var lefts = [deltaDir.left, deltaDir.leftDown, deltaDir.leftUp];

    var rights = [deltaDir.right, deltaDir.rightDown, deltaDir.rightUp];

    var tilePositionsToFlip = [];

    for(var movementKey in deltaDir){

        var movementDelta = deltaDir[movementKey],
            cPosition = position,
            flippedPositions = [],
            foundCurrentColor = false;

        while(cPosition >= 0 && cPosition < (n*n)){
            if(cPosition !== position){

                //si en esta nueva posicion hay una ficha del oponente
                if(board[cPosition] === otherColor){
                    flippedPositions.push(cPosition);
                }else{
                    foundCurrentColor = board[cPosition] !== empty;
                    break;
                }
            }

            if((cPosition % n === 0 && lefts.indexOf(movementDelta)>-1) || ((cPosition % n === n-1) && rights.indexOf(movementDelta) > -1))
                break;

            //moverse
            cPosition += movementDelta;
        }

        if(foundCurrentColor){
            for(var i = 0; i< flippedPositions.length; i++){
                tilePositionsToFlip.push(flippedPositions[i]);
            }
        }
    }
    return tilePositionsToFlip;
}

function getNewBoards(board, currentPlayer, movement){
    var boardCopy = board.slice();
    var flippedPositions = getFlippedPositions(boardCopy, currentPlayer, movement);
    for(var i= 0; i<flippedPositions.length; i++){
        boardCopy[flippedPositions[i]] = currentPlayer;
    }

    boardCopy[movement] = currentPlayer;

    return boardCopy;
}

function maxValue(newBoards, evaluatedPlayer, currentPlayer, depth, max, min,totalMoves){
    var v = -Infinity;

    for (var i = 0; i< newBoards.length; i++){
        var board = newBoards[i];

        v = Math.max(v, minimax(board.next, evaluatedPlayer, currentPlayer, depth+1, max, min,totalMoves).value);
        max = Math.max(max,v);
        if(min <= max){
            return { value: v, movement: board.movement };
        }
    }
    
    var x = 0;
    var index = 0;
    for (var j = 0; j < newBoards.length; j++) {
      var temp = countPieces(newBoards[j].next)[currentPlayer];
      if (temp > x) {
          index = j;
          x = temp;
      }
    }

    return { value: v, movement: newBoards[index].movement }; 
}

function minValue(newBoards, evaluatedPlayer, currentPlayer, depth, max, min,totalMoves){
    var v = Infinity;

    for (var i = 0; i< newBoards.length; i++){
        var board = newBoards[i];

        v = Math.min(v, minimax(board.next, evaluatedPlayer, currentPlayer, depth+1, max, min,totalMoves).value);
        min = Math.min(min,v);
        if(min <= max){
            return { value: v, movement: board.movement };
        }
    }
    
    var x = 0;
    var index = 0;
    for (var j = 0; j < newBoards.length; j++) {
      var temp = countPieces(newBoards[j].next)[currentPlayer];
      if (temp < x) {
          index = j;
          x = temp;
      }
    }

    return { value: v, movement: newBoards[index].movement }; 
}

function minimax(board, evaluatedPlayer, currentPlayer, depth, max,min,totalMoves){
    //console.log("depth: ",maxDepth);
    if(depth >= maxDepth || !hasEmptySpaces(board)){
        //retorno un diccionario con dos elementos:
        //1. value es el valor resultante de la euristica (cant fichas)
        //2. movimiento, que en este caso esta indefinido
        return {value: (countPieces(board)[currentPlayer]), movement: undefined};
    }

    var newBoards = [];

    if(totalMoves === null || totalMoves.length === 0){
        return {value: (countPieces(board)[currentPlayer]), movement: undefined};
    }
    //get all posible boards from legal moves
    for(var i =0; i<totalMoves.length; i++){
        var move = totalMoves[i];
        var next =getNewBoards(board, currentPlayer, move);
        newBoards.push({next: next, movement: move});
    }

    var nextPlayer = currentPlayer === black ? white: black;

    //maximizar
    if(evaluatedPlayer === currentPlayer)
        return maxValue(newBoards, evaluatedPlayer, nextPlayer, depth, max,min,totalMoves);
    else //minimizar
        return minValue(newBoards, evaluatedPlayer, nextPlayer, depth, max, min,totalMoves);
}


/*PROYECTO DE INTELIGENCIA LOGICA CON SOCKETS*/
var socket = require('socket.io-client')('http://192.168.1.112:3000');  // for example: http://127.0.0.1:3000
//var socket = require('socket.io-client')('http://localhost:3000');  // for example: http://127.0.0.1:3000
console.log("enter");
var tournamentID = 142857;
socket.on('connect', function(){});

//readline for username, ttid, role

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//connecting
socket.on('connect', function(){
  console.log("loging in");
  rl.question("Enter your username: ",(username) => { 
    socket.emit('signin', {
      user_name: username,
      tournament_id: tournamentID,
      user_role: 'player'
  });
  })
});
//check if its signed in
socket.on('ok_signin', function(){
  console.log("Successfully signed in!");
});


socket.on('ready', function(data){
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var databoard = data.board;

  //logica
  var totalMoves = [];
  var board = transform_board(databoard);
  for(var i = 0; i<board[0].length;i++){
      for (var j = 0; j < board[0].length; j++) {
          if(board[i][j] == playerTurnID){
              var moves = get_posible_moves(board,j,i,playerTurnID);
              for (var k = 0; k<moves.length;k++){
                  if(!totalMoves.includes(moves[k]))
                      totalMoves.push(moves[k]);
                  //databoard[moves[k]] = 8;
              }
          }
      }
  }
  //board = transform_board(databoard);
  var play = minimax(databoard, playerTurnID, playerTurnID, 0, -Infinity, Infinity,totalMoves);
  console.log(board);
  console.log("Move: ", play);      
  console.log("tira: " + playerTurnID);
  console.log("posibles: ",totalMoves);
  var len = Math.floor((Math.random() * totalMoves.len) + 0);



  socket.emit('play', {
      tournament_id: tournamentID,
      player_turn_id: playerTurnID,
      game_id: gameID,
      movement: play.movement
    });
});

//reset availability of a player
socket.on('finish', function(data){
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var winnerTurnID = data.winner_turn_id;
  var board = data.board;
  
  // TODO: Your cleaning board logic here
  //PLAYERID = 1 o 2, black or white
  console.log("Game Over!");
  if(playerTurnID == winnerTurnID){
    console.log("Player "+winnerTurnID + " WINS!!!!!!!!!!!!!!!!!!!!!wiiiiiiiins");
  }
  else{
    console.log("Player "+playerTurnID+ " LOSE!!!!!!!!!!!!!!!!!!!!!looooooseeeeee")
  }
  
  socket.emit('player_ready', {
    tournament_id: tournamentID,
    player_turn_id: playerTurnID,
    game_id: gameID
  });
});


