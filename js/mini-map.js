define(
// Requirements
["lib/jquery"],

// Module definition
function () {

var MiniMap = function (config) {
    var self = this
        defaultConfig = {
            container : $("body"),
            cellSize  : 10,
            viewRadius: 5
        };
    
    config = $.extend({}, defaultConfig, config);
    
    // Make sure our container element is wrapped in jQuery.
    config.container = $(config.container);
    
    var _tiles;
    
    /**
     * Draw the map centering around the given position.
     *
     * @param {Number} x - X position.
     * @param {Number} y - Y position.
     * @param {Object} map - The Map Object to draw.
     */
    self.draw = function (x, y, map) {
        var tiles = map.getTilesInArea(x, y, config.viewRadius);
        var xi, yi, xlen, ylen;
        for(xi=0, xlen=_tiles.length; xi<xlen; xi++) {
            for(yi=0, ylen=_tiles[xi].length; yi<ylen; yi++) {
                self.drawTile(_tiles[xi][yi], tiles[xi][yi]);
            }
        }
    };
    
    /**
     * Draw an individual tile.
     *
     * @param {Object} tile - A Tile object.
     */
    self.drawTile = function (tileSprite, tileData) {
        if (tileData.passable) {
            tileSprite.css({
                "background": "white"
            });
        } else {
            tileSprite.css({
                "background": "black"
            });
        }
    }
    
    /**
     * Initializes the mini-map container and gets it ready to display a cross-
     * section of a map.
     * @private
     */
    function _initContainer () {
        // Set size of the view.
        config.container.css({
            width : ((config.viewRadius * 2) * config.cellSize) + "px",
            height: ((config.viewRadius * 2) * config.cellSize) + "px"
        });
        
        var xi = 0, xlen = (config.viewRadius * 2),
            yi = 0, ylen = (config.viewRadius * 2),
            tileEl = $("<div class='tile'></div>");
            
        _tiles = [];
        
        for(; xi<xlen; xi++) {
            _tiles[xi] = [];
            for(yi=0; yi<ylen; yi++) {
                var t = tileEl.clone();
                t.css({
                    "top" : (yi * config.cellSize) + "px",
                    "left": (xi * config.cellSize) + "px",
                    "width" : config.cellSize + "px",
                    "height": config.cellSize + "px"
                });
                config.container.append(t);
                _tiles[xi][yi] = t;
            }
        }
    }
    
    // Initialize the MiniMap instance.
    _initContainer();
}

return MiniMap;

});