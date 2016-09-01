(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function(){
    var MainLoop = require("./main-loop.js");
    var popUp = require("./pop-up.js");
    var Token = require("./token.js");
    
    /* vars */
    var p1 = {
        name : 'Tomek',
        token: ''
    };
    var p2 = {
        name : 'Komputer',
        token: ''
    };
    
    var loop = new MainLoop(p1, p2);
    loop.init();
    
    var popUpsControl = new popUp();
    popUpsControl.init();
    
    var tokenControl = new Token(p1, p2);
    tokenControl.init();
    
});
},{"./main-loop.js":2,"./pop-up.js":3,"./token.js":5}],2:[function(require,module,exports){
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
                $targetField.attr('data-taken', p1.token);
                $targetField.attr('data-player', p1.name);
            } else {
                turns++;
                $targetField.attr('data-taken', p2.token);
                $targetField.attr('data-player', p2.name);
            }   
        }
        // check if someone has won
        _this.checkWin();
        // check if the board is full
        if (turns === 9) {
            rounds.drawHandler();
            _this.boardReset();
        }
    }
    
    this.checkWin = function(){
        var winner;
        $.each(this.players, function(i, el){
            if (_this.checkFields(el)) {
                winner = el;
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
        if (spot1.attr('data-player') === player.name && spot2.attr('data-player') === player.name && spot3.attr('data-player') === player.name ||
			spot4.attr('data-player') === player.name && spot5.attr('data-player') === player.name && spot6.attr('data-player') === player.name ||
			spot7.attr('data-player') === player.name && spot8.attr('data-player') === player.name && spot9.attr('data-player') === player.name ||
			spot1.attr('data-player') === player.name && spot4.attr('data-player') === player.name && spot7.attr('data-player') === player.name ||
			spot2.attr('data-player') === player.name && spot5.attr('data-player') === player.name && spot8.attr('data-player') === player.name ||
			spot3.attr('data-player') === player.name && spot6.attr('data-player') === player.name && spot9.attr('data-player') === player.name ||
			spot1.attr('data-player') === player.name && spot5.attr('data-player') === player.name && spot9.attr('data-player') === player.name ||
			spot3.attr('data-player') === player.name && spot5.attr('data-player') === player.name && spot7.attr('data-player') === player.name
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
},{"./rounds-handler.js":4}],3:[function(require,module,exports){
function PopUp () {
    //vars
    var _this = this;
    var popUpBg = $('.pop-up-background');
    var popUps = $('.pop-up');
    
    var windows = {
        story : $('#story-pop-up'),
        token : $('#token-pop-up'),
        round : $('#round-win-pop-up'),
        draw  : $('#round-draw-pop-up'),
        game  : $('#game-win-pop-up')
    };
    
    var buttons = {
        'choose token'  : $('#story-cta'),
        'play'          : $('#play-game'),
        'next round'    : $('#next-round'),
        'draw round'    : $('#draw-next-round'),
        'play again'    : $('#play-again')
    };
    
    // init
    this.init = function() {
        popUps.hide();
        windows['story'].show();
        
        // event listeners for buttons
        buttons['choose token'].on('click', function(){
            windows['story'].fadeOut();
            windows['token'].fadeIn();
        });
        buttons['play'].on('click', function(){
            windows['token'].fadeOut();
            popUpBg.fadeOut();
        });
        buttons['next round'].on('click', function(){
            windows['round'].fadeOut(function(){
                windows['round'].find('#round-winner').text('');
            });
            popUpBg.fadeOut();
        });
        buttons['draw round'].on('click', function(){
            windows['draw'].fadeOut();
            popUpBg.fadeOut();
        });
        buttons['play again'].on('click', function(){
            windows['game'].fadeOut(function(){
                windows['game'].find('#game-winner').text(''); 
                buttons['choose token'].click();
            });
        });
    };
    
    // show round winner
    this.showRoundWinner = function (player) {
        windows['round'].find('#round-winner').text(player);
        windows['round'].fadeIn();
        popUpBg.fadeIn();
    };
    
    // show draw
    this.showDraw = function () {
        windows['draw'].fadeIn();
        popUpBg.fadeIn();
    };
    
    // show game winner
    this.showGameWinner = function (player) {
        windows['game'].find('#game-winner').text(player);
        windows['game'].fadeIn();
        popUpBg.fadeIn();
    };
    
};

module.exports = PopUp;
},{}],4:[function(require,module,exports){
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
},{"./pop-up.js":3}],5:[function(require,module,exports){
function Token (p1, p2) {
    var _this = this;
    var tokens = {
        'skull' : $('[data-token-choice="skull"]'),
        'bones' : $('[data-token-choice="bones"]')
    };
   
   // initialize tokens
   this.init = function () {
        $('.tokens').on('click', '.token-choice' ,function(){
            _this.assignTokens(this);
        }); 
   };
   
   // assign tokens
   this.assignTokens = function (playerChoice) {
       // assign player token
       p1.token = playerChoice.getAttribute('data-token-choice');
       // assign computer toekn
       for (var token in tokens) {
           if (tokens.hasOwnProperty(token)) {
               if (token !== p1.token) {
                   p2.token = token;
               } 
           }
       }
       console.log(p1, p2);
   };
}

module.exports = Token;
},{}]},{},[1]);
