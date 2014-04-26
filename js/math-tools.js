define(
[],
function () {
    
    /**
     * Generate an integer between the given min and max values.
     */
    var randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    /**
     * Generate an Object with x and y properties that fall between the given min
     * and max values.
     */
    var randomPosition = function (min, max) {
        return {
            x: randomInt(min, max),
            y: randomInt(min, max)
        };
    }
    
    // Return the interface to our Object.
    return {
        randomInt     : randomInt,
        randomPosition: randomPosition
    };
});