var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;


document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. Generating random numbers while rolling the dice
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'; //changing the image in an <img> element

        //3. Update the round score If the rolled number is not a 1
        if(dice1 !== 1 && dice2 !== 1){
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {

            nextPlayer();

        }
        lastDice = dice
    }


});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add current score to a global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'You are a Winner';

            display();

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});
function nextPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    display();

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

// //Changing the score in zero while starting a game
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    display();

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function display(){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}