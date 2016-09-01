/*
RoundsHandler checks if someone has won, and updates the scores table.
Takes params:
    @ p1 (string) => the name of player1
    @ p1 (string) => the name of player2
    @ maxWins (integer) => the number of wins which is needed for someone to win
*/ 

// import dependencies
var PopUps = require("./pop-up.js");
var popUps = new PopUps();

function RoundsHandler(p1, p2, maxWins) {
    var _this = this;
    var maxWins = maxWins || 3;
    
    // wins counter
    var wins = {}
    
    // displays
    var scoresDisplayForP1 = $('.score-player-1');
    var scoresDisplayForP2 = $('.score-player-2');
    
    this.init = function() {
        //associate players with scores tables
        scoresDisplayForP1.attr('data-player', p1.name);
        scoresDisplayForP2.attr('data-player', p2.name);
        // add initial wins to players
        wins[p1.name] = 0;
        wins[p2.name] = 0;
    };
    
     // update the scores
    this.updateScoresTable = function(winner) {
        wins[winner.name]++
        var newWin = '<li class="player-win">' + wins[winner.name] + '</li>'
        // show score in UI
        $('.player-score[data-player="'+ winner.name +'"]').append(newWin);
        _this.checkGameWinner(winner);
    };
    
    // draw handler
    this.drawHandler = function(){
        popUps.showDraw();
    };
    
    // clear the scores
    this.clearScoresTable = function() {
        $('.player-score').empty();
        wins[p1.name] = 0;
        wins[p2.name] = 0;
    };
    
    // check if any of the players has won the game
    this.checkGameWinner = function(roundWinner) {
        if (wins[roundWinner.name] === 3) {
            popUps.showGameWinner(roundWinner.name);
            _this.clearScoresTable();
        } else {
            popUps.showRoundWinner(roundWinner.name);
        }
    };
}

module.exports = RoundsHandler;