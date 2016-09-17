(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function(){
    var MainLoop = require("./main-loop.js");
    var popUp = require("./pop-up.js");
    var Token = require("./token.js");
    var SetPlayer = require("./player-name.js");

    /* vars */
    var p1 = {
        name : '',
        token: ''
    };
    var p2 = {
        name : '',
        token: ''
    };
    
    var popUpsControl = new popUp(p1, p2);
    popUpsControl.init();
    
    var tokenControl = new Token(p1, p2);
    tokenControl.init();
    
    var player = new SetPlayer(p1, p2);
    player.init();
    
    var loop = new MainLoop(p1, p2);
    loop.init();
    
});
},{"./main-loop.js":2,"./player-name.js":3,"./pop-up.js":4,"./token.js":6}],2:[function(require,module,exports){
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
        $fields.on('click', function(){
            _this.resolveTurn( $(this) );
        });
    };
    
    this.resolveTurn = function($targetField) {
        // if rounds.wins is still empty, add to it initial vlues of 0, else don't do nothing with it
        if ( $.isEmptyObject(rounds.wins) ) {
            rounds.init();
        };
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
                setTimeout(function(){
                    $('.player.player-2').find('.player-UI-name').addClass('active-player-box');
                    $('.player.player-1').find('.player-UI-name').removeClass('active-player-box');
                },100);
            } else {
                turns++;
                $targetField.attr('data-taken', p2.token);
                $targetField.attr('data-player', p2.name);
                setTimeout(function(){
                    $('.player.player-1').find('.player-UI-name').addClass('active-player-box');
                    $('.player.player-2').find('.player-UI-name').removeClass('active-player-box');
                },100);
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
},{"./rounds-handler.js":5}],3:[function(require,module,exports){
function SetPlayer (p1, p2) {
    var _this = this;
    
    var playerNames = $('.player-name-inputs');
    var playerOneName = $('#p_1_Name_input');
    var playerTwoName = $('#p_2_Name_input');
    var submit = $('#story-cta');

    this.init = function() {
       submit.attr('disabled', true);
        playerNames.on('change', '.p-name-input', function(){
            _this.submitBtnHandler(this);
            _this.setPlayerName( $(this) );
        });

    };
    
    // checks if both players have entered their names
    this.submitBtnHandler = function(trigger) { 
       if ( playerOneName.val() && playerTwoName.val() ) {
           // if both P1 and P2 names are entered, enable the "Continue" button
           submit.attr('disabled', false);
       }
    };
    
    // set P1 and P2 names
    this.setPlayerName = function(playerNameField){
      if (playerNameField.is(playerOneName)) {
          p1.name = playerNameField.val();
      } else {
          p2.name = playerNameField.val();
      }
    //   console.log ('p1 name '+p1.name, 'p2 name ' + p2.name);
    };
}

module.exports = SetPlayer;
},{}],4:[function(require,module,exports){
// import dependencies

function PopUp (p1, p2) {
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
        buttons['choose token'].on('click', function(e){
            e.preventDefault();
            // set player 1 and player 2 names
            windows['token'].find('[data-player-name="player-one-name"]').text(p1.name);
            windows['token'].find('[data-player-name="player-two-name"]').text(p2.name);
            windows['story'].fadeOut();
            windows['token'].fadeIn();
        });
        buttons['play'].on('click', function(e){
            e.preventDefault();
            _this.setPlayersOnScoresTable(p1,p2);
            windows['token'].fadeOut();
            popUpBg.fadeOut();
            // add active-player style to player 1
            $('.player.player-1').find('.player-UI-name').addClass('active-player-box');
            $('.player.player-2').find('.player-UI-name').removeClass('active-player-box');
            // after sometime set the tokens to their default positions
            setTimeout(function(){
               $('.token-choice').attr('style','');
               $('.token-choice').attr('data-token-p1-choice', 'false');
            }, 2000);
        });
        buttons['next round'].on('click', function(e){
            e.preventDefault();
            windows['round'].fadeOut(function(){
                windows['round'].find('#round-winner').text('');
            });
            popUpBg.fadeOut();
            // add active-player style to player 1
            $('.player.player-1').find('.player-UI-name').addClass('active-player-box');
            $('.player.player-2').find('.player-UI-name').removeClass('active-player-box');
        });
        buttons['draw round'].on('click', function(e){
            e.preventDefault();
            windows['draw'].fadeOut();
            popUpBg.fadeOut();
            // add active-player style to player 1
            $('.player.player-1').find('.player-UI-name').addClass('active-player-box');
            $('.player.player-2').find('.player-UI-name').removeClass('active-player-box');
        });
        buttons['play again'].on('click', function(e){
            e.preventDefault();
            windows['game'].fadeOut(function(){
                $('#play-game').attr('disabled', true);
                windows['game'].find('#game-winner').text(''); 
                buttons['choose token'].click();
            });
        });
        // click event when pressing Enter
        _this.addEnterKeyListener();
    };
    
    // show round winner (accepts player object)
    this.showRoundWinner = function (player) {
        windows['round'].find('#round-winner').text(player.name);
        windows['round'].fadeIn();
        popUpBg.fadeIn();
    };
    
    // show draw
    this.showDraw = function () {
        windows['draw'].fadeIn();
        popUpBg.fadeIn();
    };
    
    // show game winner (accepts player object)
    this.showGameWinner = function (player) {
        windows['game'].find('#game-winner').text(player.name);
        windows['game'].fadeIn();
        popUpBg.fadeIn();
    };
    
    // put all player data in scores section
    this.setPlayersOnScoresTable = function(p1,p2) {
        // Player representations (name and image)
        var playerRep1 = $('[data-player-name="player-one-name"]');
        var playerRep2 = $('[data-player-name="player-two-name"]');
        // score displays
        var scoresDisplayForP1 = $('.score-player-1');
        var scoresDisplayForP2 = $('.score-player-2');
        
        // set players names and token representations
        var player1Name = playerRep1.find('.player-UI-name');
        var player1Image = playerRep1.find('.player-token-image');
        var player2Name = playerRep2.find('.player-UI-name');
        var player2Image = playerRep2.find('.player-token-image');
        
        // player one attributes
        player1Name.text(p1.name);
        player1Name.attr('data-player-token', p1.token);
        player1Image.attr('data-player-token', p1.token);
        player1Image.attr('src', '/dist/assets/images/player-image-'+ p1.token +'.png');
        // player two attributes
        player2Name.text(p2.name);
        player2Name.attr('data-player-token', p2.token);
        player2Image.attr('data-player-token', p2.token);
        player2Image.attr('src', '/dist/assets/images/player-image-'+ p2.token +'.png');
        
        // associate players with scores tables
        scoresDisplayForP1.attr('data-player', p1.name);
        scoresDisplayForP1.attr('data-player-token', p1.token);
        scoresDisplayForP2.attr('data-player', p2.name);
        scoresDisplayForP2.attr('data-player-token', p2.token);
    };
    
    this.addEnterKeyListener = function() {
        $(document).on('keyup', function (e) {
            var key = e.which;
            if (key === 13) { // 13 is enter
                $('.cta-btn:visible:enabled').click();
            }
        });
    }
    
};

module.exports = PopUp;
},{}],5:[function(require,module,exports){
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
        },300);
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
},{"./pop-up.js":4}],6:[function(require,module,exports){
function Token (p1, p2) {
    var _this = this;
    var tokens = {
        'skull' : $('[data-token-choice="skull"]'),
        'bones' : $('[data-token-choice="bones"]')
    };
   
   // initialize tokens
   this.init = function () {
        // disable play button
        $('#play-game').attr('disabled', true);
        // event listener on tokens
        $('.tokens').on('click', '.token-choice' ,function(){
            _this.assignTokens(this);
            _this.playerOneChoseToken($(this));
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
        //set player one choice
        playerChoice.setAttribute('data-token-p1-choice', 'true');
        // enable play button
        $('#play-game').attr('disabled', false);
   };
   
   // show that player one chose the token
   this.playerOneChoseToken = function($p1_token){
       $('.token-choice:not([data-token-p1-choice="true"])').fadeOut();
       $p1_token.css({
          'width' : $p1_token.width(),
          'height' :  $p1_token.height()
       });
       $p1_token.animate({
          'left' : '50%',
          'margin-left': '-40px'
       });
   };
}

module.exports = Token;
},{}]},{},[1]);
