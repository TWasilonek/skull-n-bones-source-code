function MainLoop() {
    var _this = this;
    var $fields = $('.field');
    
    this.init = function() {
        $fields.on('click', function(){
            _this.resolveTurn( $(this) );
        });
    };
    
    this.resolveTurn = function($targetField) {
        $targetField.css('background', 'red');
    }
}

// export the main loop
module.exports = MainLoop;