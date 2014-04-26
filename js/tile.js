define(
// Requirements
["lib/jquery"],

// Module definition
function () {

var Tile = function (config) {
    var defaultConfig = {
        // Position of the tile in the map.
        x: 0,
        y: 0,
        // Whether or not the tile can be passed through.
        passable  : false,
        // Whether or not the player has seen the given tile.
        seen      : false,
        // Whether or not the player is aware of this tile.
        discovered: false
    },
    self = this;
    
    config = $.extend(self, defaultConfig, config);
}

return Tile;

});