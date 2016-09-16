document.addEventListener('DOMContentLoaded', function(){
    var MainLoop = require("./main-loop.js");
    var popUp = require("./pop-up.js");
    var Token = require("./token.js");
    var SetPlayer = require("./player-name.js");

    /* vars */
    var p1 = {
        name : '',
        token: ''
    };
    var p2 = {
        name : '',
        token: ''
    };
    // var gameInitialized = false;
    // var initializeGame = function() {
    //     gameInitialized = true;  
    // };
    
    var popUpsControl = new popUp(p1, p2);
    popUpsControl.init();
    
    var tokenControl = new Token(p1, p2);
    tokenControl.init();
    
    var player = new SetPlayer(p1, p2);
    player.init();
    
    var loop = new MainLoop(p1, p2);
    loop.init();
    
});