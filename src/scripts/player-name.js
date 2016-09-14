function SetPlayer (player) {
    var _this = this;
    
    var playerNames = document.querySelector('.player-name-inputs');
    var playerOneName = document.getElementById('p_1_Name_input');
    var playerTwoName = document.getElementById('p_2_Name_input');
    var submit = document.getElementById('story-cta');

    this.init = function() {
       
        $(playerNames).on('change', '.p-name-input', function(){
            _this.submitBtnHandler(this);
        });

    };
    
    this.submitBtnHandler = function(trigger) { 
       console.log( trigger.name + ': my name is changing... ' + trigger.value );
    };
    
    this.setPlayerName = function(){
      
    };
}

module.exports = SetPlayer;