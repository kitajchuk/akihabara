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
    AkihabaraGamestate.storageKey = GameState.storageKey;
    
    window.AkihabaraGamestate = new AkihabaraGamestate();
    window.AkihabaraGamestate.storageKey = GameState.storageKey;


})( window.GameState );