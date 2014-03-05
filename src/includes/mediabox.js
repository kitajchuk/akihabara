(function ( MediaBox ) {


    /**
     *
     * AkihabaraMediabox augments JSource MediaBox Class
     * https://github.com/kitajchuk/jsource/blob/master/src/MediaBox.js
     * @constructor AkihabaraMediabox
     * @augments MediaBox
     * @see {@link MediaBox}
     * @author kitajchuk
     *
     */
    var AkihabaraMediabox = function () {};
    
    AkihabaraMediabox.prototype = new MediaBox();
    
    
    /**
     *
     * Renders a video to a canvas context
     * @memberof AkihabaraMediabox
     * @method AkihabaraMediabox.blitVideo
     * @param {string} id The id of the video
     * @param {object} cx The canvas context
     * @param {number} x The x position to render at
     * @param {number} y The y position to render at
     * @param {number} w The width to render
     * @param {number} h The height to render
     * @param {function} cb Optional callback fired when video is paused or ended
     *
     */
    AkihabaraMediabox.prototype.blitVideo = function ( id, cx, x, y, w, h, cb ) {
        if ( !this._video[ id ] ) {
            return this;
        }
        
        var timeout = null,
            self = this;
        
        function blit() {
            try {
                clearTimeout( timeout );
                
            } catch ( error ) {}
            
            if ( !self._video[ id ].element.paused && !self._video[ id ].element.ended ) {
                cx.drawImage(
                    self._video[ id ].element,
                    x,
                    y,
                    w,
                    h
                );
                
                timeout = setTimeout( blit, 0 );
                
            } else {
                timeout = null;
                
                if ( typeof cb === "function" ) {
                    cb();
                }
            }
        }
        
        blit();
    };
    
    
    window.AkihabaraMediabox = new AkihabaraMediabox();


})( window.MediaBox );