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