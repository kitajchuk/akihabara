(function ( GameState ) {


    /**
     *
     * AkihabaraGamestate augments Gamed GameState Class
     * https://github.com/kitajchuk/gamed/blob/master/src/GameState.js
     * @constructor AkihabaraGamestate
     * @augments GameState
     * @see {@link GameState}
     * @author kitajchuk
     *
     */
    var AkihabaraGamestate = function () {};
    
    AkihabaraGamestate.prototype = new GameState();
    
    window.AkihabaraGamestate = new AkihabaraGamestate();


})( window.GameState );