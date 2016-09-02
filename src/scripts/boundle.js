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
        name : 'Komputer',
        token: ''
    };
    
    var player = new SetPlayer(p1);
    player.init();
    
    var loop = new MainLoop(p1, p2);
    loop.init();
    
    var popUpsControl = new popUp();
    popUpsControl.init();
    
    var tokenControl = new Token(p1, p2);
    tokenControl.init();
    
});