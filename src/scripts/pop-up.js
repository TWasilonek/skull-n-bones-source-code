function PopUp () {
    //vars
    var _this = this;
    var popUpBg = $('.pop-up-background');
    var popUps = $('.pop-up');
    
    var windows = {
        story : $('#story-pop-up'),
        token : $('#token-pop-up'),
        round : $('#round-win-pop-up'),
        game  : $('#game-win-pop-up')
    };
    
    var buttons = {
        'choose token'  : $('#story-cta'),
        'play'          : $('#play-game'),
        'next round'    : $('#next-round'),
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
            popUpBg.hide();
        });
        buttons['next round'].on('click', function(){
            windows['round'].fadeOut();
            popUpBg.hide();
        });
        buttons['play again'].on('click', function(){
            windows['game'].fadeOut();
            popUpBg.hide();
        });
    }
    
}

module.exports = PopUp;