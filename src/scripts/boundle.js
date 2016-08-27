document.addEventListener('DOMContentLoaded', function(){
    var MainLoop = require("./main-loop.js");
    
    loop = new MainLoop();
    loop.init();
    
});