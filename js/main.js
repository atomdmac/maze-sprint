require.config({
    baseUrl: "js"
});
define(
// Requirements
["map", "mini-map", "first-person", "lib/jquery", "lib/undo-manager"],

// Module definition
function (Map, MiniMap, FirstPerson) {
    // TODO
    
    
    
    // Handle keyboard input for movement.
    $(window).keydown(function(e) {
        switch (e.which) {
            // Left arrow
            case 37:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle move left.");
                break;
            // Up arrow
            case 38:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle move forward.");
                break;
            // Right arrow
            case 39:
                e.preventDefault(); // Prevent scrolling the window.
                console.log("TODO: Handle move right.");
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