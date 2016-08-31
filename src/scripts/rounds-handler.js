/*
RoundsHandler checks if someone has won, and updates the scores table.
Takes params:
    @ p1 (string) => the name of player1
    @ p1 (string) => the name of player2
    @ maxWins (integer) => the number of wins which is needed for someone to win
*/ 

// import dependencies
var popUps = require("./pop-up.js");

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
        scoresDisplayForP1.attr('data-player', p1);
        scoresDisplayForP2.attr('data-player', p2);
        // add initial wins to players
        wins[p1] = 0;
        wins[p2] = 0;
    };
    
     // update the scores
    this.updateScoresTable = function(winner) {
        wins[winner]++
        var newWin = '<li class="player-win">' + wins[winner] + '</li>'
        // show score in UI
        $('.player-score[data-player="'+ winner +'"]').append(newWin);
        _this.checkGameWinner();
    };
    
    // clear the scores
    this.clearScoresTable = function(gameWinner) {
        alert(gameWinner + ' is the winner!');
        $('.player-score').empty();
        wins[p1] = 0;
        wins[p2] = 0;
    };
    
    // check if any of the players has won the game
    this.checkGameWinner = function() {
        // if any of the players has 3 wins - end game
        for (var player in wins) {
            if (wins.hasOwnProperty(player)) {
                if (wins[player] === 3) {
                    _this.clearScoresTable(player);
                }   
            }
        }
    }
}

module.exports = RoundsHandler;