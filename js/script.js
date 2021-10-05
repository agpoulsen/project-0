let playerOne = true;
let gameOver = false;
let counter = 1;

const playerOneArray = [];
const playerTwoArray = [];
//Stores all the possible win conditions
const winningArray = [
  [ 't-l', 't-m', 't-r' ],
  [ 'm-l', 'm-m', 'm-r' ],
  [ 'b-l', 'b-m', 'b-r' ],
  [ 't-l', 'm-l', 'b-l' ],
  [ 't-m', 'm-m', 'b-m' ],
  [ 't-r', 'm-r', 'b-r' ],
  [ 't-l', 'm-m', 'b-r' ],
  [ 't-r', 'm-m', 'b-l' ]
]

//Function which checks players moves against winning conditions. If player has all of the winning selections - the game is over
const isGameOver = function( playerarr ) {

  let finalResult = false;

  for ( let i of winningArray ) {

    let result = i.every( element => playerarr.indexOf( element ) !== -1 );

    if ( result ) {
      finalResult = true;
      gameOver = true;
      break;
    }
  }
  return finalResult;
};

//Function to highlight the winning row:
const displayWinningLine = function ( playerArr ) {

  for ( let i of winningArray ) {

    let result = i.every( element => playerArr.indexOf( element ) !== -1 );

    if ( result ) {

      for (let idx = 0; idx < i.length; idx++) {

        console.log(i[idx])

        $(`#${i[idx]}`).css('background-color', 'yellow');
      }
    };
  }
};


$( document ).on( 'click', function( event ) {

  if ( gameOver === false ) {

    if ( playerOne ) {

      if ( $( event.target ).hasClass( 'block' ) ) {

        $( event.target ).removeClass( 'block' );
        $( event.target ).addClass( 'playerOne' );
        $( event.target ).text( 'X' );
        playerOneArray.push( $( event.target ).attr( 'id' ) )
        counter++;

        if ( isGameOver( playerOneArray ) ) {
          displayWinningLine( playerOneArray );
          gameOver = true;
        };
        playerOne = false;

      } else {

        return;
      }
    } else {

      if ( $( event.target ).hasClass( 'block' ) ) {

        $( event.target ).removeClass( 'block' );
        $( event.target ).addClass( 'playerTwo' );
        $( event.target ).text( 'O' );
        playerTwoArray.push( $( event.target ).attr( 'id' ) )
        counter++;

        if ( isGameOver( playerTwoArray ) ) {
          displayWinningLine( playerTwoArray );
          gameOver = true;
        }
        playerOne = true;

      } else {

        return;
      }
    }
  };
  //Display winner goes here
} );

//A game of tic tac toe.

//Select player

// First player selects a segment

// Second player selects a segment which hasn't previously been selected

// Check if the win condition has been met.

// if win condition has been met, game is over - display winner and winning row

// else, continue Game

// if the board is full - it is a draw - display draw
