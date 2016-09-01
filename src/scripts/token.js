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