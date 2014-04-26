define(
// Requirements
["lib/event-emitter", "lib/jquery", "lib/rot"],

// Module definition
function (EventEmitter, $) {
    
var Map = function (config) {
    var defaultConfig = {
        width : 50,
        height: 50,
        generator: ROT.Map.DividedMaze
    };
    
    // Merge default config with defaults.
    config = $.extend({}, defaultConfig, config);
    
    // Set up events.
    var eventer = new EventEmitter();
    self.bind      = eventer.bind;
    self.unbind    = eventer.unbind;
    self.trigger   = eventer.trigger;
    self.triggerAs = eventer.triggerAs;
    
    var _tiles,
        _playerPosition;
    
    
    /**
     * Initializes the map data structure and prepares it to be populated with
     * actual map data.
     *
     * @private
     */
    function _initMap (width, height) {
        // TODO
    }
    
    /**
     * A callback for the map generation algorithm.  Called for each tile as it
     * is created.
     *
     * @private
     */
    function _populateMap (x, y, type) {
        // TODO
    }
}
    
});