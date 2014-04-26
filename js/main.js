require.config({
    baseUrl: "js",
});

define(
// Requirements
["map", "mini-map", "first-person", "lib/undo-manager", "lib/jquery"],

// Module definition
function (Map, MiniMap, FirstPerson, UndoManager) {
    // TODO
    
    var map = new Map();
    var miniMap = new MiniMap({
        container: $( $(".mini-map")[0] ),
        viewRadius: 5,
        cellSize: 10
    });
    
    miniMap.draw(25, 25, map);
});