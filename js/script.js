let playerOne = true;

$(document).on('click', function(event) {

  if (playerOne) {

    if ($(event.target).hasClass('block')) {

      $(event.target).removeClass('block');
      $(event.target).addClass('playerOne');
      playerOne = false;
    } else {
      return;
    }
  } else {

    if ($(event.target).hasClass('block')) {

      $(event.target).removeClass('block');
      $(event.target).addClass('playerTwo');
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
