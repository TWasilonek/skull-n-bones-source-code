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
        buttons['choose token'].on('click', function(){
            // set player 1 and player 2 names
            windows['token'].find('[data-player-name="player-one-name"]').text(p1.name);
            windows['token'].find('[data-player-name="player-two-name"]').text(p2.name);
            windows['story'].fadeOut();
            windows['token'].fadeIn();
        });
        buttons['play'].on('click', function(){
            _this.setPlayersOnScoresTable(p1,p2);
            windows['token'].fadeOut();
            popUpBg.fadeOut();
            // after sometime set the tokens to their default positions
            setTimeout(function(){
               $('.token-choice').attr('style','');
               $('.token-choice').attr('data-token-p1-choice', 'false');
            }, 2000);
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
    
};

module.exports = PopUp;