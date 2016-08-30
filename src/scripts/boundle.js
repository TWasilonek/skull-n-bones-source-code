document.addEventListener('DOMContentLoaded', function(){
    var MainLoop = require("./main-loop.js");
    
    /* vars */
    var p1 = 'Tomek';
    var p2 = 'Komputer'
    
    var loop = new MainLoop(p1, p2);
    loop.init();
    
});