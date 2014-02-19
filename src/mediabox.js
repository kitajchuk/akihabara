/**
 * Akihabara wrapper for jsource MediaBox
 * https://github.com/kitajchuk/jsource/blob/master/src/MediaBox.js
 * @author: kitajchuk
 * @namespace AkihabaraMediaBox
 */
(function ( window ) {
    
    var AkihabaraMediaBox = ( window.MediaBox ) ? new window.MediaBox() : null;
    
    window.AkihabaraMediaBox = AkihabaraMediaBox;
    
})( window );