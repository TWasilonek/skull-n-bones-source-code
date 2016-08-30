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