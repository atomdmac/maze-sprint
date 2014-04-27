define(
// Requirements
[],

// Module definition
function () {

// Return an Object with a list of bearing definitions in the following form:
// ex: [xDelta, yDelta]
return {
    NORTH : [ 0  -1],
    EAST  : [ 1,  0],
    SOUTH : [ 0,  1],
    WEST  : [-1,  0]
};

});