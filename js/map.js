define(
// Requirements
["lib/event-emitter", "tile", "lib/jquery", "lib/rot"],

// Module definition
function (EventEmitter, Tile) {
    
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
    
    var _tiles;
    
    /**
     * Initializes the map data structure and prepares it to be populated with
     * actual map data.
     *
     * @private
     */
    function _initMap (width, height) {
        _tiles = [];
        var xi = 0;
        for(;xi<width; xi++) {
            _tiles[xi] = new Array(height);
        }
    }
    
    /**
     * A callback for the map generation algorithm.  Called for each tile as it
     * is created.
     *
     * @private
     */
    function _populateMap (x, y, type) {
        _tiles[x][y] = new Tile({
            x: x,
            y: y,
            passable  : type ? true : false,
            seen      : false,
            discovered: false
        });
    }
    
    /**
     * Generate the endpoints (i.e. spawn and goal nodes).
     *
     * @private
     */
    function _generateEndPoints (tiles) {
        // TODO
    }
    
    /**
     * Return a 2D array of tiles with the specifiyed x/y as the center and with
     * the given radius.
     *
     * @param {Number} centerx - The X position of the center tile.
     * @param {Number} centery - The Y position of the cneter tile.
     * @param {Number} radius  - The radius of the area to return.
     */
    self.getTileArea = function (centerx, centery, radius) {
        // TODO
    };
    
    /**
     * Returns a Number representing what the player would see from the given
     * perspective.
     *
     * @param {Number} x       - X position.
     * @param {Number} y       - Y position.
     * @param {Array}  bearing - An Array of Numbers that represents which
     *                           direction the observer is facing.
     */
    self.getView = function (x, y, bearing) {
        // TODO
    };
    
    /**
     * Return a list of possible moves (as bearings) available from the tile in
     * front of the given position.
     *
     * @param {Number} x       - X position.
     * @param {Number} y       - Y position.
     * @param {Array}  bearing - An Array of Numbers that represents which
     *                           direction the observer is facing.
     */
    self.getPossibleMoves = function (x, y, bearing) {
        // TODO
    };
    
    // Initialize and generate the map data.
    _initMap(config.width, config.height);
    new config.generator(config.width, config.height).create(_populateMap);
    console.log(_tiles);
    
}
    
return Map;

});