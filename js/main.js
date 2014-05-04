require.config({
    baseUrl: "js",
});

define(
// Requirements
["map", "mini-map", "player", "first-person", "lib/undo-manager", "lib/jquery"],

// Module definition
function (Map, MiniMap, Player, FirstPerson, UndoManager) {
    
    // START MAP + MINI-MAP DEBUG CODE
    var map = new Map();
    var miniMap = new MiniMap({
        container: $( $(".mini-map")[0] ),
        viewRadius: 5,
        cellSize: 10
    });

    var endPoints = map.getEndPoints(),
        initBearing = map.getInitialBearing(endPoints.spawn, endPoints.goal);

    map.markEndPoints();

    var player = new Player();
    player.relocate(endPoints.spawn.x, endPoints.spawn.y);
    player.bear(initBearing);
    
    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);

    var firstPerson = new FirstPerson({
        container: $( $(".first-person")[0] )
    });
    firstPerson.setPerspective(_getPlayerPerspective());


    // END MAP + MINI-MAP DEBUG CODE
    
    /**
     * Return a 2D Array of tiles that represents the player's current
     * perspective.
     */
    function _getPlayerPerspective () {
        var tiles = map.getTilesInArea(player.x + player.bearing[0],
                                       player.y + player.bearing[1],
                                       1);
        
        // Rotate array to the right.
        function rotate (arr){
            var temp = new Array(arr.length);
            var i, j;
            for(i = 0; i < temp.length; ++i){
            temp[i] = new Array(temp.length);
            for (j = 0; j < temp.length; ++j){
            temp[i][j] = arr[temp.length - j - 1][i];
            }
            }
            return temp;
        }
        
        var playerTile = tiles[1][2], safety = 0;
        while (playerTile.x != player.x || playerTile.y != player.y) {
            tiles = rotate(tiles);
            playerTile = tiles[1][2], safety = 0;
            // A safety clause to make sure that my hastily written code doesn't
            // break FireFox.  I know, I know... I'm worse than Hitler.
        
            safety++;
            if (safety > 3) break;
        }
        
        return tiles;
    }
    
    /**
     * Check to see if the player can move in the given direction and return
     * a Boolean representing success.
     */
    function _checkMove (direction) {
        var tiles  = _getPlayerPerspective();
        var target;
        
        switch (direction) {
            case "left":
                target = tiles[0][1];
                break;
            case "forward":
                target = tiles[1][0];
                break;
            case "right":
                target = tiles[2][1];
                break;
            default:
                break;
        }
        
        if (target.passable) {
            return true;
        } else {
            return false;
        }
    }
    
    var _undoManager = new UndoManager();
    function _recordAction (from, to) {
        _undoManager.add({
            undo: function () {
                player.relocate(from.position.x, from.position.y);
                player.bear(from.bearing);
                miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);
                firstPerson.setPerspective(_getPlayerPerspective());
            },
            redo: function () {
                player.relocate(to.position.x, to.position.y);
                player.bear(to.bearing);
                miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);
                firstPerson.setPerspective(_getPlayerPerspective());
            }
        });
    }
    
    
    // Handle keyboard input for movement.
    $(window).keydown(function(e) {
        switch (e.which) {
            // Left arrow
            case 37:
                e.preventDefault(); // Prevent scrolling the window.
                
                if (_checkMove("left")) {
                    var from = {
                        position: {x: player.x, y: player.y},
                        bearing : [player.bearing[0], player.bearing[1]]
                    };
                        
                    player.move();
                    player.bearLeft();
                    
                    var to =  {
                        position: {x: player.x, y: player.y},
                        bearing : [player.bearing[0], player.bearing[1]]
                    };
                    _recordAction(from, to);
                    
                    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing, endPoints);
                    firstPerson.setPerspective(_getPlayerPerspective());
                }
                
                break;
            // Up arrow
            case 38:
                e.preventDefault(); // Prevent scrolling the window.
                
                if (_checkMove("forward")) {
                    var from = {
                        position: {x: player.x, y: player.y},
                        bearing : [player.bearing[0], player.bearing[1]]
                    };
                        
                    player.move();
                    
                    var to =  {
                        position: {x: player.x, y: player.y},
                        bearing : [player.bearing[0], player.bearing[1]]
                    };
                    _recordAction(from, to);
                    
                    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);
                    firstPerson.setPerspective(_getPlayerPerspective());
                }
                
                break;
            // Right arrow
            case 39:
                e.preventDefault(); // Prevent scrolling the window.
                
                if (_checkMove("right")) {
                    var from = {
                        position: {x: player.x, y: player.y},
                        bearing : [player.bearing[0], player.bearing[1]]
                    };
                        
                    player.move();
                    player.bearRight();
                    
                    var to =  {
                        position: {x: player.x, y: player.y},
                        bearing : [player.bearing[0], player.bearing[1]]
                    };
                    _recordAction(from, to);
                    
                    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);
                    firstPerson.setPerspective(_getPlayerPerspective());
                }
                
                break;
            // Down arrow
            case 40:
                e.preventDefault(); // Prevent scrolling the window.
                if (_undoManager.hasUndo())_undoManager.undo();
                break;
            default:
                break;
        }
    });
    
    // Handle mousewheel input for traversing movement history.
    $(window).on('mousewheel DOMMouseScroll',function(e){
        // To catch up or down scroll:
        e = e.originalEvent;
        // delta == 1 = down, delta == -1 = up;
        var delta = e.wheelDelta > 0 || e.detail < 0 ? 1 : -1;
        
        switch (delta) {
            // Scroll up
            case 1:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle redo.");
                if (_undoManager.hasRedo()) {
                    _undoManager.redo();
                }
                break;
            // Scroll down
            case -1:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle undo.");
                if (_undoManager.hasUndo()) {
                    _undoManager.undo();
                }
                break;
            default:
                break;
        }
    });
});