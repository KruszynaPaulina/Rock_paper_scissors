// References to elements HTML

var newGameBtn = document.getElementById('js-newGameButton'),
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

// EventListener

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// Game status

pickElem.style.display = 'none';

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

function setGameElements() {

  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Play Again';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
    case 'notStarted':
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

// Set game points

function setGamePoints() {

  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;

}

// New game

function newGame() {

  player.name = prompt('Please enter your name', 'Player\'s name');

  if(player.name) {

    player.score = computer.score = 0;
    setGamePoints();

    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;

    playerResultElem.innerHTML = "Player Score";
    computerResultElem.innerHTML = "Computer Score";
    playerPickElem.innerHTML = "Player selection";
    computerPickElem.innerHTML = "Computer selection";

  }

}

// Get computer pick

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}


// Player pick

function playerPick(playerPick) {

    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

// Round

function checkRoundWinner(playerPick, computerPick) {
  
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "<span class='win'>Win !!!</span>";
        computerResultElem.innerHTML = "<span class='defeat'>Defeat !</span>";
        player.score++;
        setGamePoints();
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "<span class='win'>Win !!!</span>";
        playerResultElem.innerHTML = "<span class='defeat'>Defeat !</span>";
        computer.score++;
        setGamePoints();
    } else {
        computerResultElem.innerHTML = playerResultElem.innerHTML = "<span class='draw'>Score draw !</span>";
    }

    if (player.score == 10) {
        pickElem.style.display = 'none';
        setTimeout(winnerIsPlayer, 100);
        function winnerIsPlayer() {
            alert('The winner is the player!');
            end();
        };
        
    } else if (computer.score == 10) {
        pickElem.style.display = 'none';
        setTimeout(winnerIsComputer, 100);
        function winnerIsComputer() {
            alert('The winner is the computer!');
            end();
        };
    }

}

// End of the game

function end(){
        gameState = 'ended';
        setGameElements();
}