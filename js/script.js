let playerOne = true;
let gameOver = false;

const playerOneArray = [];
const playerTwoArray = [];
//Stores all the possible win conditions
const winningArray = [['t-l', 't-m', 't-r'], ['m-l', 'm-m', 'm-r'], ['b-l', 'b-m', 'b-r'], ['t-l', 'm-l', 'b-l'], ['t-m', 'm-m', 'b-m'], ['t-r', 'm-r', 'b-r'], ['t-l', 'm-m', 'b-r'], ['t-r', 'm-m', 'b-l']]

const isGameOver = function(playerarr) {

  let finalResult = false;

  for ( let i of winningArray ) {

    let result = i.every(element => playerarr.indexOf(element) !== -1 );

    if (result) {
      finalResult = true;
      break;
    }
  }
  return finalResult;
};


$(document).on('click', function(event) {

  if (playerOne) {

    if ($(event.target).hasClass('block')) {

      $(event.target).removeClass('block');
      $(event.target).addClass('playerOne');
      playerOneArray.push($(event.target).attr('id'))
      if (isGameOver(playerOneArray)) {
        gameOver = true;
      };
      playerOne = false;

    } else {

      return;
    }
  } else {

    if ($(event.target).hasClass('block')) {

      $(event.target).removeClass('block');
      $(event.target).addClass('playerTwo');
      playerTwoArray.push($(event.target).attr('id'))
      if (isGameOver(playerTwoArray)) {
        gameOver = true;
      }
      playerOne = true;

    } else {

      return;
    }
  }
});

//A game of tic tac toe.

//Select player

// First player selects a segment

// Second player selects a segment which hasn't previously been selected

// Check if the win condition has been met.

// if win condition has been met, game is over - display winner and winning row

// else, continue Game

// if the board is full - it is a draw - display draw
