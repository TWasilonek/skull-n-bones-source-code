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