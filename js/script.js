let playerOne = true;
let gameOver = false;
let isWinner = false;
let counter = 0;

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
];
//Draw checker - checks to see if the game is not winnable
const drawChecker = function() {

  if ( counter >= 9 && gameOver === false) {

    window.alert( 'The game is a draw!' );
  }
};

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
const displayWinningLine = function( playerArr ) {

  for ( let i of winningArray ) {

    let result = i.every( element => playerArr.indexOf( element ) !== -1 );

    if ( result ) {

      for ( let idx = 0; idx < i.length; idx++ ) {

        $( `#${i[idx]}` ).css( 'background-color', 'yellow' );
      }
    };
  }
};

//Game starts on first player clicking on the grid
$( document ).on( 'click', function( event ) {

  if ( gameOver === false ) {

    if ( playerOne ) { //checks to see if it's player one's turn - if so use 'x'

      if ( $( event.target ).hasClass( 'block' ) ) {

        counter++;
        $( event.target ).removeClass( 'block' );
        $( event.target ).addClass( 'playerOne' );
        $( event.target ).text( 'X' );
        playerOneArray.push( $( event.target ).attr( 'id' ) )

        if ( isGameOver( playerOneArray ) ) {

          displayWinningLine( playerOneArray );
          gameOver = true;
        };
        playerOne = false;
        drawChecker();

      } else {

        return;
      }
    } else {

      if ( $( event.target ).hasClass( 'block' ) ) {

        counter++;
        $( event.target ).removeClass( 'block' );
        $( event.target ).addClass( 'playerTwo' );
        $( event.target ).text( 'O' );
        playerTwoArray.push( $( event.target ).attr( 'id' ) )

        if ( isGameOver( playerTwoArray ) ) {

          displayWinningLine( playerTwoArray );
          gameOver = true;
        }
        playerOne = true;
        drawChecker();

      } else {

        return;
      }
    }
  };
  //Display winner goes here
} );
