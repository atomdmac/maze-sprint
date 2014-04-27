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
    
    var _tileSprites;
    
    /**
     * Draw the map centering around the given position.
     *
     * @param {Array} tiles         - A list of tiles in the current view.
     * @param {Array} playerBearing - The direction that the player is facing.
     */
    self.draw = function (tiles, playerBearing) {
        // Draw map tiles.
        var xi, yi, xlen, ylen;
        for(xi=0, xlen=_tileSprites.length; xi<xlen; xi++) {
            for(yi=0, ylen=_tileSprites[xi].length; yi<ylen; yi++) {
                self.drawTile(_tileSprites[xi][yi], tiles[xi][yi]);
            }
        }
        
        // Update player display.
        // NORTH
        if (playerBearing[0] == 0 && playerBearing[1] == -1) {
            config.container.css({
                "-moz-transform"   : "rotate(0deg)",
                "-webkit-transform": "rotate(0deg)"
            });
            _player.css({
                "-moz-transform"   : "rotate(0deg)",
                "-webkit-transform": "rotate(0deg)"
            });
        }
        // EAST
        if (playerBearing[0] == 1 && playerBearing[1] == 0) {
            config.container.css({
                "-moz-transform"   : "rotate(-90deg)",
                "-webkit-transform": "rotate(-90deg)"
            });
            _player.css({
                "-moz-transform"   : "rotate(90deg)",
                "-webkit-transform": "rotate(90deg)"
            });
        }
        // SOUTH
        if (playerBearing[0] == 0 && playerBearing[1] == 1) {
            config.container.css({
                "-moz-transform"   : "rotate(-180deg)",
                "-webkit-transform": "rotate(-180deg)"
            });
            _player.css({
                "-moz-transform"   : "rotate(180deg)",
                "-webkit-transform": "rotate(180deg)"
            });
        }
        // WEST
        if (playerBearing[0] == -1 && playerBearing[1] == 0) {
            config.container.css({
                "-moz-transform"   : "rotate(-270deg)",
                "-webkit-transform": "rotate(-270deg)"
            });
            _player.css({
                "-moz-transform"   : "rotate(270deg)",
                "-webkit-transform": "rotate(270deg)"
            });
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
            
        _tileSprites = [];
        
        for(; xi<xlen; xi++) {
            _tileSprites[xi] = [];
            for(yi=0; yi<ylen; yi++) {
                var t = tileEl.clone();
                t.css({
                    "top" : (yi * config.cellSize) + "px",
                    "left": (xi * config.cellSize) + "px",
                    "width" : config.cellSize + "px",
                    "height": config.cellSize + "px"
                });
                config.container.append(t);
                _tileSprites[xi][yi] = t;
            }
        }
        
        // Draw player.
        _player = tileEl.clone()
            .addClass("player")
            .css({
                "top"   : (config.viewRadius * config.cellSize) + "px",
                "left"  : (config.viewRadius * config.cellSize) + "px",
                "width" : config.cellSize,
                "height": config.cellSize
            });
        
        config.container.append(_player);
    }
    
    // Initialize the MiniMap instance.
    _initContainer();
}

return MiniMap;

});