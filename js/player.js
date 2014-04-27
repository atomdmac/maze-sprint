define(
// Requirements
["lib/event-emitter", "lib/undo-manager", "bearing", "lib/jquery"],

// Module definition
function (EventEmitter, UndoManager, Bearing) {

var Player = function (config) {
    
    var self = this;
    
    // Default configuration
    var defaultConfig = {
        x: 0,
        y: 0,
        bearing: Bearing.NORTH
    };
    
    config = $.extend({}, defaultConfig, config);
    
    // Set up events.
    var eventer = new EventEmitter();
    self.bind      = eventer.bind;
    self.unbind    = eventer.unbind;
    self.trigger   = eventer.trigger;
    self.triggerAs = eventer.triggerAs;
    
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
    self.move = function (newX, newY, newBearing) {
        // Move the Player and store a copy of the data that is generated.
        var stepData = _movePlayer(newX, newY, newBearing);
        
        // TODO: Check redo stack to see if the requested movement is a copy of previously recorded action.
        
        // Add the movement action to the undo/redo stack.
        undoManager.add({
            undo: function () {
                _move(stepData.from.x, stepData.from.y);
            },
            redo: function () {
                _move(stepData.to.x, stepData.to.y);
            }
        });
        
        // Alert listeners.
        eventer.triggerAs(this, "move", stepData);
    };
    
    /**
     * Private function to facilitate the actual movement logic.  Clients that
     * are external to the Player module will make use of this by calling
     * Player.move() on a Player instance.
     * @private
     */
    function _move (newX, newY, newBearing) {
        // Derive new values if necessary.
        newX = newX || config.bearing[0];
        newY = newY || config.bearing[1];
        newBearing = newBearing || config.bearing;
        
        var stepData = {
            from: {
                x: config.x,
                y: config.y,
                bearing: config.bearing
            },
            to: {
                x: newX,
                y: newY,
                bearing: newBearing
            },
        }
        
        // Update current values.
        config.x = newX;
        config.y = newY;
        self.bear(newBearing);
        
        return stepData;
    }
    
    /**
     * Causes the player to face a different direction.
     *
     * @param {Array} direction - An array representing a cardinal direction.
     * @return Void
     */
    self.bear = function (direction) {
        switch(direction) {
            case Bearing.NORTH:
            case Bearing.EAST:
            case Bearing.SOUTH:
            case Bearing.WEST:
                config.baring = direction;
                break;
            default:
                throw Error("Invalid direction given to Player.move(), '" + direction + "'");
        }
    };
}

return Player;
});