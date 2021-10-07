//Global variables
let playerOne = true;
let gameOver = false;

let playerOneName = 'Player One';
let playerTwoName = 'Player Two';

let playerOneToken = 'X';
let playerTwoToken = 'O';

let winner = '';
let counter = 0;

let playerOneScore = 0;
let playerTwoScore = 0;

let playerOneArray = [];
let playerTwoArray = [];

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

//This function takes the values from the inputs and stores them in the global variable when the update button is pressed.
$( '#update-name' ).on( 'click', function() {

  if ( $( '#player-one-name' ).val() === '' ) {

    playerOneName = 'Player One';
  } else {

    playerOneName = $( '#player-one-name' ).val();
  }

  if ( $( '#player-two-name' ).val() === '' ) {

    playerTwoName = 'Player Two';
  } else {

    playerTwoName = $( '#player-two-name' ).val();
  }

  if ( $( '#player-one-token' ).val() === '' ) {

    playerOneToken = 'X';
  } else {

    playerOneToken = $( '#player-one-token' ).val();
  }

  if ( $( '#player-two-token' ).val() === '' ) {

    playerTwoToken = 'O';
  } else {

    playerTwoToken = $( '#player-two-token' ).val();
  }

  if ( playerOneToken.length > 2 || playerTwoToken.length > 2 ) {
    alert( 'Hilarious. Pick a shorter token.' );
    $( '#player-one-token' ).val( '' );
    $( '#player-one-token' ).val( '' );
  }

  updateScore();


} );

//This function updates the scoreboard
const updateScore = function() {

  $( '#player-one-score' ).text( `${playerOneName}: ${playerOneScore}` );
  $( '#player-two-score' ).text( `${playerTwoName}: ${playerTwoScore}` );
};

updateScore();

//Draw checker - checks to see if the game is not winnable
const drawChecker = function() {

  if ( counter >= 9 && gameOver === false ) {

    let drawboard = $( `<div id='winner-display'>The game is a draw!</div>` );
    $( '#board' ).prepend( drawboard )
  }
};

//This function resets the game board
const resetBoard = function() {

  $( '.winner-page' ).remove();
  playerOne = true;
  gameOver = false;
  counter = 0;

  playerOneArray = [];
  playerTwoArray = [];

  $( '#board>*' ).removeClass( [ 'playerOne', 'playerTwo', 'winning' ] ).text( '' ).css( 'background-color', '' ).addClass( 'block' );
  $( '#turns' ).text( `${playerOneName}'s turn` );
  $( '#winner-display' ).remove();
};

//This function creates a div that shows who the winner is;
const displayWinner = function() {

  let winboard = $( `<div id='winner-display' class='winner-page'>Game Over! ${winner} wins!</div>` );
  $( '#board' ).prepend( winboard );
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
        $( event.target ).text( playerOneToken );
        playerOneArray.push( $( event.target ).attr( 'id' ) );

        if ( isGameOver( playerOneArray ) ) {

          winner = `${playerOneName}`;
          displayWinningLine( playerOneArray );
          playerOneScore++;
          gameOver = true;
        };

        playerOne = false;
        $( '#turns' ).text( `${playerTwoName}'s turn` )
        drawChecker();

      } else {

        return;
      }
    } else {

      if ( $( event.target ).hasClass( 'block' ) ) {

        counter++;
        $( event.target ).removeClass( 'block' );
        $( event.target ).addClass( 'playerTwo' );
        $( event.target ).text( playerTwoToken );
        playerTwoArray.push( $( event.target ).attr( 'id' ) );

        if ( isGameOver( playerTwoArray ) ) {

          winner = `${playerTwoName}`;
          displayWinningLine( playerTwoArray );
          playerTwoScore++;
          gameOver = true;
        }

        playerOne = true;
        $( '#turns' ).text( `${playerOneName}'s turn'` )
        drawChecker();

      } else {

        return;
      }
    }
  };
  if ( gameOver ) {
    displayWinner();
    updateScore();
  }
} );

$( '#new-game' ).on( 'click', resetBoard );
