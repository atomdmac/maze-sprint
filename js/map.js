define(
// Requirements
["tile", "math-tools", "lib/jquery", "lib/rot"],

// Module definition
function (Tile, MathTools) {
    
var Map = function (config) {
    var self = this,
        defaultConfig = {
            width : 50,
            height: 50,
            generator: ROT.Map.DividedMaze
        };
    
    // Merge default config with defaults.
    config = $.extend({}, defaultConfig, config);
    
    var _tiles, _passableTiles, _solvedPath, endPoints;
    
    /**
     * Initializes the map data structure and prepares it to be populated with
     * actual map data.
     *
     * @private
     */
    function _initMap (width, height) {
        _tiles = [];
        _passableTiles = [];
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
        var tile = new Tile({
            x: x,
            y: y,
            passable  : type ? true : false,
            seen      : false,
            discovered: false,
            isGoal    : false,
            isSpawn   : false
        });
        
        _tiles[x][y] = tile;
        
        // If tile is passable, make a note of it.  This makes it easier to
        // determine what our spawn/goal end points are later.
        if (tile.passable) _passableTiles.push(tile);
    }
    
    self.getEndPoints = function () {
        if (endPoints) return endPoints;
        
        // TODO: Make sure spawn and goal end points are never the same.
        var spawnIdx = MathTools.randomInt(0, _passableTiles.length),
            goalIdx  = MathTools.randomInt(0, _passableTiles.length);
        
        endPoints = {
            spawn: _passableTiles[spawnIdx],
            goal : _passableTiles[goalIdx]
        };
        
        return endPoints;
    };

    self.markEndPoints = function () {
        if (!endPoints) return;
        _tiles[endPoints.spawn.x][endPoints.spawn.y].isSpawn = true;
        _tiles[endPoints.goal.x][endPoints.goal.y].isGoal = true;
    };
    
    /**
     * Solves the path between the given points.
     *
     * @private
     */
    self.getInitialBearing = function (start, end) {
        var path = [];
        function __checkPassable(x, y) {
            try {
                if (_tiles[x][y].passable) return true;
            } catch (e) {}

            return false;
        }

        var solver = new ROT.Path.Dijkstra(start.x, start.y, __checkPassable);
            solver.compute(end.x, end.y, function (x, y) {
                path.push({x:x,y:y});
            });

        var firstInPath = path[path.length - 2];

        return [firstInPath.x - start.x, firstInPath.y - start.y];
    };
    
    /**
     * Return a 2D array of tiles with the specifiyed x/y as the center and with
     * the given radius.
     *
     * @param {Number} centerx - The X position of the center tile.
     * @param {Number} centery - The Y position of the center tile.
     * @param {Number} radius  - The radius of the area to return.
     */
    self.getTilesInArea = function (centerx, centery, radius) {
        var xs = centerx - radius,
            ys = centery - radius,
            xe = centerx + radius,
            ye = centery + radius,
            x, y, tiles = [];
        for(x=xs; x<=xe; x++) {
            tiles.push([]);
            for (y=ys; y<=ye; y++) {
                var td;
                if (_tiles[x] && _tiles[x][y]) {
                    td = _tiles[x][y];
                }
                
                // The given position is outside the bounds of the map.  Let's
                // create a new tile to represent it.
                else {
                    td = new Tile({
                        passable: false,
                        discovered: false,
                        seen: false,
                        x: x,
                        y: y
                    });
                }
                
                tiles[tiles.length-1].push(td);
            }
        }
        return tiles;
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
    self.getPerspective = function (x, y, bearing) {
        // TODO
    };
    
    /**
     * Return a list of possible moves (as bearings) available from the tile in
     * front of the given position.  If no bearing is given, a list of passable
     * tiles that are adjacent to the given position are returned.
     *
     * @param {Number}  x       - X position.
     * @param {Number}  y       - Y position.
     * @param {Array}  [bearing] - An Array of Numbers that represents which
     *                             direction the observer is facing.
     */
    self.getPossibleMoves = function (x, y, bearing) {
        // TODO
    };
    
    // Initialize and generate the map data.
    _initMap(config.width, config.height);
    var generator = new config.generator(config.width, config.height);
        generator.create(_populateMap);
};
    
return Map;

});