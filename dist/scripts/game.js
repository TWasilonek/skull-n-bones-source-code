(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function(){
    var MainLoop = require("./main-loop.js");
    
    /* vars */
    var p1 = 'Tomek';
    var p2 = 'Komputer'
    
    var loop = new MainLoop(p1, p2);
    loop.init();
    
});
},{"./main-loop.js":2}],2:[function(require,module,exports){
var RoundsHandler = require("./rounds-handler.js");

function MainLoop(p1,p2) {
    var _this = this;
    var $fields = $('.field');
    var turns = 0;
    var rounds = new RoundsHandler(p1, p2);
    // Spot vars
	var spot1 = $('#field_1');
	var spot2 = $('#field_2');
	var spot3 = $('#field_3');
	var spot4 = $('#field_4');
	var spot5 = $('#field_5');
	var spot6 = $('#field_6');
	var spot7 = $('#field_7');
	var spot8 = $('#field_8');
	var spot9 = $('#field_9');
    
    this.players = [
        p1,
        p2
    ]
    
    this.init = function() {
        rounds.init();
        $fields.on('click', function(){
            _this.resolveTurn( $(this) );
        });
    };
    
    this.resolveTurn = function($targetField) {
        // check if the field is empty
        if ( $targetField.attr('data-taken')) {
            return;
        } 
        // add token
        else {
            // check which player's turn is and add its token
            if (turns%2 === 0){
                turns++;
                $targetField.attr('data-taken', 'p1');
                $targetField.attr('data-player', this.players[0]);
            } else {
                turns++;
                $targetField.attr('data-taken', 'p2');
                $targetField.attr('data-player', this.players[1]);
            }   
        }
        // check if someone has won
        _this.checkWin();
        // check if the board is full
        if (turns === 9) {
            alert('Draw!');
            _this.boardReset();
        }
    }
    
    this.checkWin = function(){
        var winner = '';
        $.each(this.players, function(i, el){
            if (_this.checkFields(el)) {
                winner = el;
                // show that player won
                alert('player ' + el + ' has won!');
                // add score to player and check if there is a game winner
                rounds.updateScoresTable(winner);
                // finish loop
                return false;
            }  
        });
        
        // if tehre is a winner, reset the board
        if (winner) {
            _this.boardReset();
            winner = false;
        }
    }
    
    this.checkFields = function(player) {
        if (spot1.attr('data-player') === player && spot2.attr('data-player') === player && spot3.attr('data-player') === player ||
			spot4.attr('data-player') === player && spot5.attr('data-player') === player && spot6.attr('data-player') === player ||
			spot7.attr('data-player') === player && spot8.attr('data-player') === player && spot9.attr('data-player') === player ||
			spot1.attr('data-player') === player && spot4.attr('data-player') === player && spot7.attr('data-player') === player ||
			spot2.attr('data-player') === player && spot5.attr('data-player') === player && spot8.attr('data-player') === player ||
			spot3.attr('data-player') === player && spot6.attr('data-player') === player && spot9.attr('data-player') === player ||
			spot1.attr('data-player') === player && spot5.attr('data-player') === player && spot9.attr('data-player') === player ||
			spot3.attr('data-player') === player && spot5.attr('data-player') === player && spot7.attr('data-player') === player
        ) {
            return true;
        } else {
            return false;
        }
    }
    
    this.boardReset = function() {
        $fields.each(function(i, el){
            el.removeAttribute('data-taken');
            el.removeAttribute('data-player');
        });
        turns = 0;
    }
}

// export the main loop
module.exports = MainLoop;
},{"./rounds-handler.js":3}],3:[function(require,module,exports){
/*
RoundsHandler checks if someone has won, and updates the scores table.
Takes params:
    @ p1 (string) => the name of player1
    @ p1 (string) => the name of player2
    @ maxWins (integer) => the number of wins which is needed for someone to win
*/ 

function RoundsHandler(p1, p2, maxWins) {
    var _this = this;
    var maxWins = maxWins || 3;
    
    // wins counter
    var wins = {}
    wins[p1] = 0;
    wins[p2] = 0;
    
    // displays
    var scoresDisplayForP1 = $('.score-player-1');
    var scoresDisplayForP2 = $('.score-player-2');
    
    this.init = function() {
        //associate players with scores tables
        scoresDisplayForP1.attr('data-player', p1);
        scoresDisplayForP2.attr('data-player', p2);
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
},{}]},{},[1]);
