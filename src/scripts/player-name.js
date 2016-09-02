function SetPlayer (player) {
    var _this = this;
    
    var playerName = document.getElementById('pName_input');
    var submit = document.getElementById('story-cta');

    this.init = function() {
       
        playerName.addEventListener('change', function(){
            _this.submitBtnHandler();
        });

    };
    
    this.submitBtnHandler = function() { 
       
    };
    
    this.setPlayerName = function(){
      
    };
}

module.exports = SetPlayer;