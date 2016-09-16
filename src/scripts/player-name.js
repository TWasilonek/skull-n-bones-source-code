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