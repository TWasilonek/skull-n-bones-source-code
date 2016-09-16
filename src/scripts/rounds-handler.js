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
    var winImage = '<span class="score-img"></span>';
    
    // wins counter
    this.wins = {}
    
    this.init = function() {
        // add initial wins to players
        _this.wins[p1.name] = 0;
        _this.wins[p2.name] = 0;
    };
    
     // update the scores
    this.updateScoresTable = function(winner) {
        _this.wins[winner.name]++;
        var newWin = '<li class="player-win">' + winImage.repeat(_this.wins[winner.name]) + '</li>';
        // show score in UI
        $('.player-score[data-player="'+ winner.name +'"]').append(newWin);
        setTimeout(function(){
            _this.checkGameWinner(winner);
        },500);
    };
    
    // draw handler
    this.drawHandler = function(){
        popUps.showDraw();
    };
    
    // clear the scores
    this.clearScoresTable = function() {
        $('.player-score').empty();
        _this.wins[p1.name] = 0;
        _this.wins[p2.name] = 0;
    };
    
    // check if any of the players has won the game
    this.checkGameWinner = function(roundWinner) {
        if (_this.wins[roundWinner.name] === 3) {
            popUps.showGameWinner(roundWinner);
            _this.clearScoresTable();
        } else {
            popUps.showRoundWinner(roundWinner);
        }
    };
};

module.exports = RoundsHandler;