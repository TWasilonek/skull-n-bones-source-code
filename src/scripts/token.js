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