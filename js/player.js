define(
// Requirements
["lib/undo-manager", "lib/jquery"],

// Module definition
function (UndoManager) {

var Player = function (config) {
    
    var self = this;
    
    // Default configuration
    var defaultConfig = {
        x: 0,
        y: 1,
        bearing: [0, -1, 0, 1]
    };
    
    config = $.extend({}, defaultConfig, config);
    
    // Set up undo/redo
    var undoManager = new UndoManager();
    self.hasUndo = undoManager.hasUndo;
    self.hasRedo = undoManager.hasRedo;
    
    /**
     * Redo a previously undone action.
     */
    self.redo = function () {
        // TODO
    }
    
    /**
     * Undo a previously recorded action.
     */
    self.undo = function () {
        // TODO
    }
    
    // Define getters for x/y coords to make 'em easier to access.
    self.__defineGetter__("x", function () {
        return config.x;
    });
    self.__defineGetter__("y", function () {
        return config.y;
    });
    
    /**
     * Move the Player.  If no arguments are given, the player will be moved by
     * one tile in the direction of their current bearing.
     *
     * @param {Number} [x] - X position to move the Player to.
     * @param {Number} [y] - Y position to move the player to.
     * @param {Number} [bearing] - The new bearing for the user to face.
     * 
     * @return Void
     */
    self.move = function () {
        config.x += config.bearing[0];
        config.y += config.bearing[1];
    };
    
    /**
     * Return the player's current bearing as an Array where the indices
     * represent the x and y offset, respectively.
     */
    self.__defineGetter__("bearing", function () {
        return [config.bearing[0], config.bearing[1]];
    });
    
    /**
     * Cause the player's bearing to shift 90 deg to the right.
     */
    self.bearRight = function () {
        var n = config.bearing.pop();
        config.bearing.unshift(n);
    };
    
    /**
     * Cause the player's bearing to shift 90 deg to the left.
     */
    self.bearLeft = function () {
        var n = config.bearing.shift();
        config.bearing.push(n);
    };
}

return Player;
});