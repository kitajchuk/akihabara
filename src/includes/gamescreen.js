(function ( GameScreen ) {


    /**
     *
     * AkihabaraGamescreen augments Gamed GameScreen Class
     * https://github.com/kitajchuk/gamed/blob/master/src/GameScreen.js
     * @constructor AkihabaraGamescreen
     * @augments GameScreen
     * @see {@link GameScreen}
     * @author kitajchuk
     *
     */
    var AkihabaraGamescreen = function () {};
    
    AkihabaraGamescreen.prototype = new GameScreen();
    
    window.AkihabaraGamescreen = new AkihabaraGamescreen();


})( window.GameScreen );