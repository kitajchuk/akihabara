(function ( MediaBox ) {


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
    MediaBox.prototype.blitVideo = function ( id, cx, x, y, w, h, cb ) {
        var videoEl = this.getVideo( id ).element,
            timeout = null,
            self = this;

        if ( !videoEl ) {
            return this;
        }

        function blit() {
            try {
                clearTimeout( timeout );
                
            } catch ( error ) {}

            if ( !videoEl.paused && !videoEl.ended ) {
                cx.drawImage(
                    videoEl,
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
    window.AkihabaraMediabox = new MediaBox();


})( window.MediaBox );