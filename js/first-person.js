define(
// Requirements
["lib/jquery", "tile"],

// Module definition
function () {
    
var FirstPerson = function (config) {
    var self = this,
        defaultConfig = {
            container   : $("body")
        };
    
    config = $.extend({}, defaultConfig, config);
    
    // Make sure our container element is wrapped in jQuery.
    config.container = $(config.container);
    
    var _perspective;
    var _views;
    
    function _drawPerspective() {
        var inferredView = "";
        
        inferredView += _perspective[1][0].passable ? 1 : 0; // Top
        inferredView += _perspective[2][1].passable ? 1 : 0; // Right
        inferredView += _perspective[1][2].passable ? 1 : 0; // Bottom
        inferredView += _perspective[0][1].passable ? 1 : 0; // Left
        
        for(var lcv in _views){ _views[lcv].hide(); }
        _views[inferredView].show();
    }
    
    /**
     * Initializes the first-person container and populates it with images that
     * represent its different views.
     * @private
     */
    function _initContainer () {
        
        _views = {
            "0010" : $("<img class='first-person-view 0010' src='img/first-person-view/0010.png' />"),
            "0011" : $("<img class='first-person-view 0011' src='img/first-person-view/0011.png' />"),
            "0110" : $("<img class='first-person-view 0110' src='img/first-person-view/0110.png' />"),
            "0111" : $("<img class='first-person-view 0111' src='img/first-person-view/0111.png' />"),
            "1010" : $("<img class='first-person-view 1010' src='img/first-person-view/1010.png' />"),
            "1011" : $("<img class='first-person-view 1011' src='img/first-person-view/1011.png' />"),
            "1110" : $("<img class='first-person-view 1110' src='img/first-person-view/1110.png' />"),
            "1111" : $("<img class='first-person-view 0010' src='img/first-person-view/1111.png' />")
        };
        
        for(var lcv in _views){ _views[lcv].hide().appendTo(config.container); }
    }
    
    /**
     * Set the first-person perspective based on a given matrix of tile objects.
     *
     * @param {Object} tileMatrix - A 9x9 matrix of tile objects.
     */
    self.setPerspective = function (tileMatrix) {
        console.log(tileMatrix);
        _perspective = tileMatrix;
        _drawPerspective();
    };
    
    // Initialize the MiniMap instance.
    _initContainer();
};

return FirstPerson;

});