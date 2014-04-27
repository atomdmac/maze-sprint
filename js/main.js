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

    var player = new Player();
    
    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);

    var firstPerson = new FirstPerson({
        container: $( $(".first-person")[0] )
    });
    firstPerson.setPerspective(map.getTilesInArea(player.x, player.y, 1));

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
            arr = temp;
        }
        
        var playerTile = tiles[1][2], safety = 0;
        while (playerTile.x != player.x || playerTile.y != player.y) {
            rotate(tiles);
            
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
    function _checkMove (bearing) {
        var tiles  = map.getTilesInArea(player.x, player.y, 1);
        
        var tx = 1 + bearing[0],
            ty = 1 + bearing[1],
            target = tiles[tx][ty];
            
        if (target.passable) {
            return true;
        } else {
            return false;
        }
    }
    
    
    // Handle keyboard input for movement.
    $(window).keydown(function(e) {
        switch (e.which) {
            // Left arrow
            case 37:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle move left.");
                
                player.bearLeft();
                if (_checkMove(player.bearing)) {
                    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);
                    firstPerson.setPerspective(_getPlayerPerspective());
                }
                
                break;
            // Up arrow
            case 38:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle move forward.");
                
                if (_checkMove(player.bearing)) {
                    player.move();
                    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);
                    firstPerson.setPerspective(_getPlayerPerspective());
                }
                
                break;
            // Right arrow
            case 39:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle move right.");
                
                player.bearRight();
                if (_checkMove(player.bearing)) {
                    miniMap.draw(map.getTilesInArea(player.x, player.y, 5), player.bearing);
                    firstPerson.setPerspective(_getPlayerPerspective());
                }
                
                break;
            // Down arrow
            case 40:
                e.preventDefault(); // Prevent scrolling the window.
                // Not used
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
                break;
            // Scroll down
            case -1:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle undo.");
                break;
            default:
                break;
        }
    });
});