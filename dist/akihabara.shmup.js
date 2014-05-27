/*!
 *
 * Akihabara Javascript Framework
 *
 * Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/
 * Copyright (c) 2014 Brandon Lee Kitajchuk, http://blkpdx.com/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
/*!
 *
 * A base set of easing methods
 * Most of which were found here:
 * https://gist.github.com/gre/1650294
 *
 * @Easing
 * @author: kitajchuk
 *
 */
(function ( window, undefined ) {


"use strict";


/**
 *
 * Easing functions
 * @namespace Easing
 * @memberof! <global>
 *
 */
var Easing = {
    /**
     *
     * Produce a linear ease
     * @method linear
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    linear: function ( t ) { return t; },
    
    /**
     *
     * Produce a swing ease like in jQuery
     * @method swing
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    swing: function ( t ) { return (1-Math.cos( t*Math.PI ))/2; },
    
    /**
     *
     * Accelerating from zero velocity
     * @method easeInQuad
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInQuad: function ( t ) { return t*t; },
    
    /**
     *
     * Decelerating to zero velocity
     * @method easeOutQuad
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeOutQuad: function ( t ) { return t*(2-t); },
    
    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutQuad
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInOutQuad: function ( t ) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; },
    
    /**
     *
     * Accelerating from zero velocity
     * @method easeInCubic
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInCubic: function ( t ) { return t*t*t; },
    
    /**
     *
     * Decelerating to zero velocity
     * @method easeOutCubic
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeOutCubic: function ( t ) { return (--t)*t*t+1; },
    
    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutCubic
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInOutCubic: function ( t ) { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
    
    /**
     *
     * Accelerating from zero velocity
     * @method easeInQuart
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInQuart: function ( t ) { return t*t*t*t; },
    
    /**
     *
     * Decelerating to zero velocity
     * @method easeOutQuart
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeOutQuart: function ( t ) { return 1-(--t)*t*t*t; },
    
    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutQuart
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInOutQuart: function ( t ) { return t<0.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
    
    /**
     *
     * Accelerating from zero velocity
     * @method easeInQuint
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInQuint: function ( t ) { return t*t*t*t*t; },
    
    /**
     *
     * Decelerating to zero velocity
     * @method easeOutQuint
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeOutQuint: function ( t ) { return 1+(--t)*t*t*t*t; },
    
    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutQuint
     * @param {number} t Difference in time
     * @memberof Easing
     * @returns a new t value
     *
     */
    easeInOutQuint: function ( t ) { return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
};


// Expose
window.Easing = Easing;


})( window );
/*!
 *
 * A simple tween class using requestAnimationFrame
 *
 * @Tween
 * @author: kitajchuk
 *
 */
(function ( window, undefined ) {


"use strict";


/**
 *
 * Tween function
 * @constructor Tween
 * @param {number} duration How long the tween will last
 * @param {number} from Where to start the tween
 * @param {number} to When to end the tween
 * @param {function} tween The callback on each iteration
 * @param {function} ease The easing function to use
 * @memberof! <global>
 *
 */
var Tween = function ( duration, from, to, tween, ease ) {
    ease = (ease || function ( t ) {
        return t;
    });
    
    var time = (duration || 1000),
        animDiff = (to - from),
        startTime = new Date(),
        timer;
    
    function animate() {
        var diff = new Date() - startTime,
            animTo = (animDiff * ease( diff / time )) + from;
        
        if ( diff > time ) {
            tween( to );
            cancelAnimationFrame( timer );
            timer = null;
            return false;
        }
        
        tween( animTo );
        timer = requestAnimationFrame( animate );
    }
    
    // Start the tween
    animate();
};


// Expose
window.Tween = Tween;


})( window );
/*!
 *
 * And audio and video box manager
 *
 * @MediaBox
 * @author: kitajchuk
 *
 */
(function ( window, undefined ) {


"use strict";


/**
 *
 * And audio and video box manager
 * @constructor MediaBox
 * @requires Easing
 * @requires Tween
 * @memberof! <global>
 *
 */
var MediaBox = function () {
    return this.init.apply( this, arguments );
};

MediaBox.prototype = {
    constructor: MediaBox,
    
    /**
     *
     * MediaBox stopped state constant
     * @memberof MediaBox
     * @member MediaBox.STATE_STOPPED
     *
     */
    STATE_STOPPED: 0,
    
    /**
     *
     * MediaBox stopping state constant
     * @memberof MediaBox
     * @member MediaBox.STATE_STOPPING
     *
     */
    STATE_STOPPING: 1,
    
    /**
     *
     * MediaBox paused state constant
     * @memberof MediaBox
     * @member MediaBox.STATE_PAUSED
     *
     */
    STATE_PAUSED: 2,
    
    /**
     *
     * MediaBox playing state constant
     * @memberof MediaBox
     * @member MediaBox.STATE_PLAYING
     *
     */
    STATE_PLAYING: 3,
    
    /**
     *
     * Expression match hashbang/querystring
     * @memberof MediaBox
     * @member MediaBox._rHashQuery
     *
     */
    _rHashQuery: /[#|?].*$/g,
    
    /**
     *
     * MediaBox init constructor method
     * @memberof MediaBox
     * @method MediaBox.init
     *
     */
    init: function () {
        var self = this;
        
        /**
         *
         * MediaBox information for each channel
         * @memberof MediaBox
         * @member MediaBox._channels
         *
         */
        this._channels = {};
        
        /**
         *
         * MediaBox holds all audio tracks
         * @memberof MediaBox
         * @member MediaBox._audio
         *
         */
        this._audio = {};
        
        /**
         *
         * MediaBox holds all video tracks
         * @memberof MediaBox
         * @member MediaBox._video
         *
         */
        this._video = {};
        
        /**
         *
         * MediaBox boolean to stop/start all audio
         * @memberof MediaBox
         * @member MediaBox._audioPaused
         *
         */
        this._audioPaused = false;
        
        /**
         *
         * MediaBox supports
         * @memberof MediaBox
         * @member MediaBox._supported
         *
         */
        this._supported = {};
        
        /**
         *
         * MediaBox supported audio
         * @memberof MediaBox
         * @member MediaBox._supported.audio
         *
         */
        this._supported.audio = this._getAudioSupport();
        
        /**
         *
         * MediaBox supported video
         * @memberof MediaBox
         * @member MediaBox._supported.video
         *
         */
        this._supported.video = this._getVideoSupport();
    },
    
    /**
     *
     * MediaBox crossbrowser create audio context
     * @memberof MediaBox
     * @method MediaBox.createAudioContext
     * @returns instance of audio context
     *
     */
    createAudioContext: function () {
        var AudioContext;
        
        if ( window.AudioContext ) {
            AudioContext = AudioContext;
            
        } else if ( window.webkitAudioContext ) {
            AudioContext = webkitAudioContext;
        }
        
        return ( AudioContext ) ? new AudioContext() : AudioContext;
    },
    
    /**
     *
     * MediaBox crossbrowser create gain node
     * @memberof MediaBox
     * @method MediaBox.createGainNode
     * @returns audio context gain node
     *
     */
    createGainNode: function ( context ) {
        var gainNode;
        
        if ( !context.createGain ) {
            gainNode = context.createGainNode();
            
        } else {
            gainNode = context.createGain();
        }
        
        return gainNode;
    },
    
    /**
     *
     * MediaBox load media config JSON formatted in Akihabara bundle style
     * @memberof MediaBox
     * @method MediaBox.loadMedia
     * @param {string} url The url to the JSON config
     * @param {function} callback Fired when all media is loaded
     * @example
     * // Akihabara bundle format
     * "addAudio": [
     *     [
     *         "{id}",
     *         [
     *             "{file}.mp3",
     *             "{file}.ogg"
     *         ],
     *         {
     *             "channel": "bgm",
     *             "loop": true
     *         }
     *     ]
     * ]
     *
     */
    loadMedia: function ( url, callback ) {
        var xhr = new XMLHttpRequest(),
            self = this;
        
        xhr.open( "GET", url, true );
        xhr.onreadystatechange = function ( e ) {
            if ( this.readyState === 4 ) {
                if ( this.status === 200 ) {
                    var response;
                        
                    try {
                        response = JSON.parse( this.responseText );
                        
                    } catch ( error ) {}
                    
                    if ( response ) {
                        self.addMedia( response, callback );
                    }
                }
            }
        };
        xhr.send();
    },
    
    /**
     *
     * MediaBox add media from bundle json
     * @memberof MediaBox
     * @method MediaBox.addMedia
     * @param {object} json Akihabara formatted media bundle object
     * @param {function} callback function fired on XMLHttpRequest.onload
     *
     */
    addMedia: function ( json, callback ) {
        var current = 0,
            total = 0,
            func = function () {
                current++;
                
                if ( (typeof callback === "function") && (current === total) ) {
                    callback();
                }
            };
        
        for ( var m in json ) {
            total = total + json[ m ].length;
            
            for ( var i = json[ m ].length; i--; ) {
                this[ m ]( json[ m ][ i ], func );
            }
        }
    },
    
    /**
     *
     * MediaBox add a video element
     * @memberof MediaBox
     * @method MediaBox.addVideo
     * @param {array} obj Akihabara formatted media bundle
     * @param {function} callback function fired on XMLHttpRequest.onload
     *
     */
    addVideo: function ( obj, callback ) {
        var self = this,
            id = obj[ 0 ],
            xhr = new XMLHttpRequest();
        
        if ( !this._channels[ obj[ 2 ].channel ] ) {
            this._channels[ obj[ 2 ].channel ] = {};
        }
        
        // Create video object
        this._video[ id ] = {};
        this._video[ id ].channel = obj[ 2 ].channel;
        this._video[ id ].loop = (obj[ 2 ].loop || false);
        this._video[ id ].sources = obj[ 1 ];
        this._video[ id ].element = document.createElement( "video" );
        this._video[ id ].element.setAttribute( "controls", false );
        this._video[ id ]._usedSource = this._getUsedMediaSource( "video", this._video[ id ].sources );
        this._video[ id ]._events = {};
        
        xhr.open( "GET", this._video[ id ]._usedSource.source, true );
        xhr.onload = function ( e ) {
            var source = document.createElement( "source" );
                source.src = self._video[ id ]._usedSource.source;
                source.type = self._getMimeFromMedia( self._video[ id ]._usedSource.source );
        
            self._video[ id ].element.appendChild( source );
            
            if ( typeof callback === "function" ) {
                callback();
            }
        };
        xhr.send();
    },
    
    /**
     *
     * MediaBox add a video element event listener
     * @memberof MediaBox
     * @method MediaBox.addVideoEvent
     * @param {string} id Video id to add event for
     * @param {string} event Event to add
     * @param {function} callback The event handler to call
     *
     */
    addVideoEvent: function ( id, event, callback ) {
        if ( this._video[ id ] ) {
            this._video[ id ]._events[ event ] = function () {
                if ( typeof callback === "function" ) {
                    callback.apply( this, arguments );
                }
            };
            
            this._video[ id ].element.addEventListener( event, this._video[ id ]._events[ event ], false );
        }
    },
    
    /**
     *
     * MediaBox remove a video element event listener
     * @memberof MediaBox
     * @method MediaBox.addVideoEvent
     * @param {string} id Video id to remove event for
     * @param {string} event Event to remove
     *
     */
    removeVideoEvent: function ( id, event ) {
        if ( this._video[ id ] ) {
            this._video[ id ].element.removeEventListener( event, this._video[ id ]._events[ event ], false );
            
            this._video[ id ]._events[ event ] = null;
        }
    },
    
    /**
     *
     * MediaBox get video element by id
     * @memberof MediaBox
     * @method MediaBox.getVideo
     * @param {id} string reference id for video
     * @returns <video> element
     *
     */
    getVideo: function ( id ) {
        var ret;
        
        if ( this._video[ id ] ) {
            ret = this._video[ id ].element;
        }
        
        return ret;
    },
    
    /**
     *
     * MediaBox play video element by id
     * @memberof MediaBox
     * @method MediaBox.playVideo
     * @param {id} string reference id for video
     *
     */
    playVideo: function ( id ) {
        if ( this._video[ id ] ) {
            this._video[ id ].element.volume = this._channels[ this._video[ id ].channel ].volume;
            this._video[ id ].element.play();
        }
    },
    
    /**
     *
     * MediaBox stop video element by id
     * @memberof MediaBox
     * @method MediaBox.playVideo
     * @param {id} string reference id for video
     *
     */
    stopVideo: function ( id ) {
        if ( this._video[ id ] ) {
            this._video[ id ].element.pause();
        }
    },
    
    /**
     *
     * MediaBox add an audio context
     * @memberof MediaBox
     * @method MediaBox.addAudio
     * @param {array} obj Akihabara formatted media bundle
     * @param {function} callback function fired on XMLHttpRequest.onload
     *
     */
    addAudio: function ( obj, callback ) {
        var self = this,
            id = obj[ 0 ],
            xhr = new XMLHttpRequest();
        
        if ( !this._channels[ obj[ 2 ].channel ] ) {
            this._channels[ obj[ 2 ].channel ] = {};
        }
        
        // Create audio object
        this._audio[ id ] = {};
        this._audio[ id ].channel = obj[ 2 ].channel;
        this._audio[ id ].loop = (obj[ 2 ].loop || false);
        this._audio[ id ].sources = obj[ 1 ];
        this._audio[ id ].context = this.createAudioContext();
        this._audio[ id ]._usedSource = this._getUsedMediaSource( "audio", this._audio[ id ].sources );
        this._audio[ id ].state = this.STATE_STOPPED;
        
        xhr.open( "GET", this._audio[ id ]._usedSource.source, true );
        xhr.responseType = "arraybuffer";
        xhr.onload = function ( e ) {
            self._audio[ id ].context.decodeAudioData( xhr.response, function ( buffer ) {
                self._audio[ id ].startTime = 0;
                self._audio[ id ].startOffset = 0;
                self._audio[ id ].buffer = buffer;
                self._audio[ id ].gainNode = self.createGainNode( self._audio[ id ].context );
                
                if ( typeof callback === "function" ) {
                    callback();
                }
            });
        };
        xhr.send();
    },
    
    /**
     *
     * MediaBox play audio context
     * @memberof MediaBox
     * @method MediaBox.playAudio
     * @param {string} id string reference id for audio
     *
     */
    playAudio: function ( id ) {
        if ( this._audio[ id ] ) {
            this._audio[ id ].startTime = this._audio[ id ].context.currentTime;
            
            this._audio[ id ].source = this._audio[ id ].context.createBufferSource();
            this._audio[ id ].source.buffer = this._audio[ id ].buffer;
            this._audio[ id ].source.connect( this._audio[ id ].gainNode );
            this._audio[ id ].gainNode.connect( this._audio[ id ].context.destination );
            this._audio[ id ].gainNode.gain.value = (this._channels[ this._audio[ id ].channel ].volume || 1.0);
            
            if ( this._audio[ id ].loop ) {
                this._audio[ id ].source.loop = true;
            }
            
            this._sourceStart( this._audio[ id ] );
            
            this._audio[ id ].state = this.STATE_PLAYING;
        }
    },
    
    /**
     *
     * MediaBox simply a wrapper for playAudio
     * @memberof MediaBox
     * @method MediaBox.hitAudio
     * @param {string} id string reference id for audio
     *
     */
    hitAudio: function ( id ) {
        this.playAudio( id );
    },
    
    /**
     *
     * MediaBox stop playing an audio context
     * @memberof MediaBox
     * @method MediaBox.stopAudio
     * @param {string} id string reference id for audio
     *
     */
    stopAudio: function ( id ) {
        if ( this._audio[ id ] ) {
            this._audio[ id ].startTime = 0;
            this._audio[ id ].startOffset = 0;
            this._audio[ id ].state = this.STATE_STOPPED;
            
            this._sourceStop( this._audio[ id ] );
        }
    },
    
    /**
     *
     * MediaBox pause playing audio, calls _sourceStop
     * @memberof MediaBox
     * @method MediaBox.pauseAudio
     * @param {string} id id of audio to pause
     *
     */
    pauseAudio: function ( id ) {
        if ( this._audio[ id ] ) {
            this._audio[ id ].startOffset += (this._audio[ id ].context.currentTime - this._audio[ id ].startTime);
            this._audio[ id ].state = this.STATE_PAUSED;
            
            this._sourceStop( this._audio[ id ] );
        }
    },
    
    /**
     *
     * MediaBox fade in audio context volume
     * @memberof MediaBox
     * @method MediaBox.fadeAudioIn
     * @param {string} id string reference id for audio
     * @param {number} duration tween time in ms
     *
     */
    fadeAudioIn: function ( id, duration ) {
        if ( this._audio[ id ].state === this.STATE_PLAYING ) {
            //console.log( "@MediaBox:fadeAudioIn Already playing " + id );
            
            return this;
        }
        
        var self = this,
            volume = this._channels[ this._audio[ id ].channel ].volume;
        
        if ( this._audio[ id ] ) {
            // Only reset volume and play if audio is stopped
            // Audio state could be STATE_STOPPING at this point
            if ( this._audio[ id ].state === this.STATE_STOPPED ) {
                this._audio[ id ].gainNode.gain.value = 0;
            
                this.playAudio( id );
                
            } else if ( this._audio[ id ].state === this.STATE_STOPPING ) {
                this._audio[ id ].state = this.STATE_PLAYING;
            }
            
            new Tween( (duration || 1000), 0, volume, function ( v ) {
                self._audio[ id ].gainNode.gain.value = v;
            });
        }
    },
    
    /**
     *
     * MediaBox fade out audio context volume
     * @memberof MediaBox
     * @method MediaBox.fadeAudioOut
     * @param {string} id string reference id for audio
     * @param {number} duration tween time in ms
     *
     */
    fadeAudioOut: function ( id, duration ) {
        if ( this._audio[ id ].state === this.STATE_STOPPING ) {
            //console.log( "@MediaBox:fadeAudioOut Already stopping " + id );
            
            return this;
        }
        
        var self = this;
        
        if ( this._audio[ id ] ) {
            this._audio[ id ].state = this.STATE_STOPPING;
            
            new Tween( (duration || 1000), this._audio[ id ].gainNode.gain.value, 0, function ( v ) {
                // Check audio state on fadeout in case it is started again
                // before the duration of the fadeout is complete.
                if ( self._audio[ id ].state === self.STATE_STOPPING ) {
                    self._audio[ id ].gainNode.gain.value = v;
                
                    if ( self._audio[ id ].gainNode.gain.value === 0 ) {
                        self.stopAudio( id );
                    }
                }
            });
        }
    },
    
    /**
     *
     * MediaBox pause all playing audio for a given channel id
     * @memberof MediaBox
     * @method MediaBox.stopChannel
     * @param {string} channel string reference id for channel
     *
     */
    stopChannel: function ( channel ) {
        for ( var id in this._audio ) {
            if ( this._audio[ id ].channel === channel && this._audio[ id ].state === this.STATE_PLAYING ) {
                this.pauseAudio( id );
            }
        }
    },
    
    /**
     *
     * MediaBox resume all playing audio for a given channel id
     * @memberof MediaBox
     * @method MediaBox.playChannel
     * @param {string} channel string reference id for channel
     *
     */
    playChannel: function ( channel ) {
        for ( var id in this._audio ) {
            if ( this._audio[ id ].channel === channel && this._audio[ id ].state === this.STATE_PAUSED ) {
                this.playAudio( id );
            }
        }
    },
    
    /**
     *
     * MediaBox fade out all playing audio for a given channel id
     * @memberof MediaBox
     * @method MediaBox.fadeChannelOut
     * @param {string} channel string reference id for channel
     * @param {number} duration tween time in ms
     *
     */
    fadeChannelOut: function ( channel, duration ) {
        for ( var id in this._audio ) {
            if ( this._audio[ id ].channel === channel && this._audio[ id ].state === this.STATE_PLAYING ) {
                this.fadeAudioOut( id, duration );
            }
        }
    },
    
    /**
     *
     * MediaBox fade in all playing audio for a given channel id
     * @memberof MediaBox
     * @method MediaBox.fadeChannelIn
     * @param {string} channel string reference id for channel
     * @param {number} duration tween time in ms
     *
     */
    // Need to figure out how this would work
    fadeChannelIn: function ( channel, duration ) {
        for ( var id in this._audio ) {
            if ( this._audio[ id ].channel === channel && this._audio[ id ].state === this.STATE_PAUSED ) {
                this.fadeAudioIn( id, duration );
            }
        }
    },
    
    /**
     *
     * MediaBox crossfade between 2 audio contexts on a given channel
     * @memberof MediaBox
     * @method MediaBox.crossFadeChannel
     * @param {string} channel string reference id for channel
     * @param {string} id string reference id for audio to bring in
     * @param {number} duration tween time in ms
     *
     */
    crossFadeChannel: function ( channel, id, duration ) {
        for ( var i in this._audio ) {
            if ( this._audio[ i ].channel === channel && this._audio[ i ].state === this.STATE_PLAYING ) {
                this.fadeAudioOut( i, duration );
            }
        }
        
        this.fadeAudioIn( id, duration );
    },
    
    /**
     *
     * MediaBox set the master volume for a channel
     * @memberof MediaBox
     * @method MediaBox.setChannelVolume
     * @param {string} key string id reference to channel
     * @param {string} val floating point number for volume setting
     *
     */
    setChannelVolume: function ( key, val ) {
        if ( this._channels[ key ] ) {
            this._channels[ key ].volume = val;
        }
    },
    
    /**
     *
     * MediaBox pause all playing audio on a channel
     * @memberof MediaBox
     * @method MediaBox.pauseAll
     *
     */
    pauseAll: function ( channel ) {
        if ( this._audioPaused ) {
            return this;
        }
        
        this._audioPaused = true;
        
        for ( var id in this._audio ) {
            if ( this._audio[ id ].state === this.STATE_PLAYING ) {
                if ( this._audio[ id ].channel === channel ) {
                    this.pauseAudio( id );
                }
            }
        }
    },
    
    /**
     *
     * MediaBox resume all playing audio on a channel
     * @memberof MediaBox
     * @method MediaBox.resumeAll
     *
     */
    resumeAll: function ( channel ) {
        if ( !this._audioPaused ) {
            return this;
        }
        
        this._audioPaused = false;
        
        for ( var id in this._audio ) {
            if ( this._audio[ id ].state === this.STATE_PAUSED ) {
                if ( this._audio[ id ].channel === channel ) {
                    this.playAudio( id );
                }
            }
        }
    },
    
    /**
     *
     * MediaBox private play an audio context
     * @memberof MediaBox
     * @method MediaBox._sourceStart
     * @param {string} track audio object to play
     *
     */
    _sourceStart: function ( track ) {
        if ( !track.source.start ) {
            track.source.noteOn( 0, track.startOffset % track.buffer.duration );
            
        } else {
            track.source.start( 0, track.startOffset % track.buffer.duration );
        }
    },
    
    /**
     *
     * MediaBox private stop an audio context
     * @memberof MediaBox
     * @method MediaBox._sourceStop
     * @param {string} track audio object to stop
     *
     */
    _sourceStop: function ( track ) {
        if ( !track.source.stop ) {
            track.source.noteOff( 0 );
            
        } else {
            track.source.stop( 0 );
        }
    },
    
    /**
     *
     * MediaBox private get mimetype string from media source
     * @memberof MediaBox
     * @method MediaBox._getMimeFromMedia
     * @param {string} src media file source
     *
     */
    _getMimeFromMedia: function ( src ) {
        var ret;
        
        switch ( src.split( "." ).pop().toLowerCase() ) {
            // Audio mimes
            case "ogg":
                ret = "audio/ogg";
                break;
            case "mp3":
                ret = "audio/mpeg";
                break;
                
            // Video mimes
            case "webm":
                ret = "video/webm";
                break;
            case "mp4":
                ret = "video/mp4";
                break;
            case "ogv":
                ret = "video/ogg";
                break;
        }
        
        return ret;
    },
    
    /**
     *
     * Get the audio source that should be used
     * @memberof MediaBox
     * @method MediaBox._getUsedMediaSource
     * @param {string} media the media type to check
     * @param {array} sources Array of media sources
     * @returns object
     *
     */
    _getUsedMediaSource: function ( media, sources ) {
        var source, canPlay;
        
        for ( var i = sources.length; i--; ) {
            var src = sources[ i ].split( "." ).pop().toLowerCase().replace( this._rHashQuery, "" );
            
            if ( media === "video" && src === "mp4" ) {
                if ( (this._supported.video.mpeg4 === "probably" || this._supported.video.h264 === "probably") ) {
                    source = sources[ i ];
                    
                    canPlay = "probably";
                    
                } else if ( (this._supported.video.mpeg4 === "maybe" || this._supported.video.h264 === "maybe") ) {
                    source = sources[ i ];
                    
                    canPlay = "maybe";
                }
                
            } else if ( this._supported[ media ][ src ] === "probably" ) {
                source = sources[ i ];
                
                canPlay = "probably";
                
            } else if ( this._supported[ media ][ src ] === "maybe" ) {
                source = sources[ i ];
                
                canPlay = "maybe";
            }
            
            if ( source ) {
                break;
            }
        }
        
        return {
            source: source,
            canPlay: canPlay
        };
    },
    
    /**
     *
     * Borrowed(ish)
     * Modernizr v2.7.1
     * www.modernizr.com
     * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
     * Available under the BSD and MIT licenses: www.modernizr.com/license/
     *
     * @memberof MediaBox
     * @method MediaBox._getAudioSupport
     * @returns object
     *
     */
    _getAudioSupport: function () {
        var elem = document.createElement( "audio" ),
            rnos = /^no$/,
            ret = {};

        try {
            if ( elem.canPlayType ) {
                ret.ogg = elem.canPlayType( 'audio/ogg; codecs="vorbis"' ).replace( rnos, "" );
                ret.mp3 = elem.canPlayType( 'audio/mpeg;' ).replace( rnos, "" );
                ret.wav = elem.canPlayType( 'audio/wav; codecs="1"').replace( rnos, "" );
                ret.m4a = (elem.canPlayType( 'audio/x-m4a;' ) || elem.canPlayType( 'audio/aac;' )).replace( rnos, "" );
            }
            
        } catch ( e ) {}

        return ret;
    },
    
    /**
     *
     * Borrowed(ish)
     * Modernizr v2.7.1
     * www.modernizr.com
     * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
     * Available under the BSD and MIT licenses: www.modernizr.com/license/
     *
     * @memberof MediaBox
     * @method MediaBox._getVideoSupport
     * @returns object
     *
     */
    _getVideoSupport: function () {
        var elem = document.createElement( "video" ),
            rnos = /^no$/,
            ret = {};

        try {
            if ( elem.canPlayType ) {
                ret.mpeg4 = elem.canPlayType( 'video/mp4; codecs="mp4v.20.8"' ).replace( rnos, "" );
                ret.ogg = elem.canPlayType( 'video/ogg; codecs="theora"' ).replace( rnos, "" );
                ret.h264 = elem.canPlayType( 'video/mp4; codecs="avc1.42E01E"' ).replace( rnos, "" );
                ret.webm = elem.canPlayType( 'video/webm; codecs="vp8, vorbis"' ).replace( rnos, "" );
            }

        } catch ( e ) {}

        return ret;
    }
};


// Expose
window.MediaBox = MediaBox;


})( window );
/*!
 *
 * Handle keeping track of game data using localStorage.
 *
 * @GameState Class
 * @author: kitajchuk
 *
 */
(function ( window, undefined ) {


"use strict";


var localStorage = window.localStorage,
    
    /**
     *
     * Keeps track of the players state in the game.
     * Calls GameState.prototype.init as constructor.
     * @constructor GameState
     * @memberof! <global>
     *
     */
    GameState = function () {
        return this.init.apply( this, arguments );
    };

GameState.prototype = {
    constructor: GameState,
    
    /**
     *
     * GameState Storage key index
     * @memberof GameState
     * @member GameState._storageKey
     *
     */
    _storageKey: "_gamestate_",
    
    /**
     *
     * GameState Expression match dash/underscores before alpha chars
     * @memberof GameState
     * @member GameState._rDashHyphAlphas
     *
     */
    _rDashHyphAlphas: /(?:-|--|_|__)([\da-z])/gi,
    
    /**
     *
     * GameState init constructor method
     * @memberof GameState
     * @method GameState.init
     * @param {object} state The initial game state object to start with
     *
     */
    init: function ( state ) {
        state = (state || {});
        
        /**
         *
         * GameState Flag whether to save to localStorage
         * @memberof GameState
         * @member GameState._doSaveState
         *
         */
        this._doSaveState = true;
        
        /**
         *
         * GameState state object internal
         * @memberof GameState
         * @member GameState._state
         *
         */
        this._state = (this._loadState() || state);
        
        this._saveState();
    },
    
    /**
     *
     * GameState can load state from localStorage
     * @memberof GameState
     * @method GameState._loadState
     *
     */
    _loadState: function () {
        var result;
        
        try {
            if ( this._doSaveState ) {
                result = JSON.parse( localStorage.getItem( this._storageKey ) );
            }
            
        } catch ( error ) {}
        
        return result;
    },
    
    /**
     *
     * GameState can save state to localStorage
     * @memberof GameState
     * @method GameState._saveState
     *
     */
    _saveState: function () {
        /**
         *
         * Write JSON stringified state to localStorage
         * @event GameState#saveStateToLocalStorage
         *
         */
        try {
            if ( this._doSaveState ) {
                localStorage.setItem( this._storageKey, JSON.stringify( this.getState() ) );
            }
            
        } catch ( error ) {}
    },
    
    /**
     *
     * GameState camelCase a string matching -, --, _ and __
     * @memberof GameState
     * @method GameState.camelCase
     * @param {string} str The string to camelCase
     *
     */
    camelCase: function ( str ) {
        return str.replace( this._rDashHyphAlphas, function( all, letter ) {
            return letter.toUpperCase();
        });
    },
    
    /**
     *
     * GameState retrieve state
     * @memberof GameState
     * @method GameState.getState
     * @returns GameState._states
     *
     */
    getState: function () {
        return this._state;
    },
    
    /**
     *
     * GameState set the state
     * @memberof GameState
     * @method GameState.setState
     * @fires GameState#saveStateToLocalStorage
     *
     */
    setState: function () {
        this._saveState();
    },
    
    /**
     *
     * GameState merge an initial state object in
     * @memberof GameState
     * @method GameState.pushState
     * @param {object} state The initial game state object to start with
     * @param {bool} force Pass true here to force override state properties
     *
     */
    pushState: function ( state, force ) {
        for ( var i in state ) {
            if ( this._state[ i ] === undefined || force ) {
                this._state[ i ] = state[ i ];
            }
        }
        
        this._saveState();
    },
    
    /**
     *
     * GameState add a new game state key: value pair
     * @memberof GameState
     * @method GameState.setValue
     * @param {string} id The unique key
     * @param {mixed} value The value to be set for the key
     * @param {bool} format Whether to format the key first using camelCase
     * @fires GameState#saveStateToLocalStorage
     *
     */
    setValue: function ( id, value, format ) {
        this._state[ id ] = value;
        
        this._saveState();
    },
    
    /**
     *
     * GameState add a new game state prop to a key that is an object
     * @memberof GameState
     * @method GameState.setValueDeep
     * @param {string} id The unique key
     * @param {string} prop The unique property
     * @param {mixed} value The value to be set for the key
     * @fires GameState#saveStateToLocalStorage
     *
     */
    setValueDeep: function ( id, prop, value ) {
        if ( this._state[ id ] ) {
            this._state[ id ][ prop ] = value;
        
            this._saveState();
        }
    },
    
    /**
     *
     * GameState get the value for a state key
     * @memberof GameState
     * @method GameState.getValue
     * @param {string} id The unique key
     * @returns The value for the key or undefined
     *
     */
    getValue: function ( id ) {
        return this._state[ id ];
    },
    
    /**
     *
     * GameState get the value for a state key
     * @memberof GameState
     * @method GameState.getValue
     * @param {string} id The unique key
     * @param {string} prop The unique property
     * @returns The value for the key/prop or undefined
     *
     */
    getValueDeep: function ( id, prop ) {
        if ( this._state[ id ] ) {
            return this._state[ id ][ prop ];
        }
    }
};


// Expose
window.GameState = GameState;


})( window );
/*!
 *
 * Keep a log of a games quests and their statuses.
 *
 * @GameQuest Class
 * @author: kitajchuk
 *
 */
(function ( window, undefined ) {


"use strict";


var localStorage = window.localStorage,
    
    /**
     *
     * Keeps track of quest status for a player.
     * Calls GameQuest.prototype.init as constructor.
     * @constructor GameQuest
     * @memberof! <global>
     *
     */
    GameQuest = function () {
        return this.init.apply( this, arguments );
    };

GameQuest.prototype = {
    constructor: GameQuest,
    
    /**
     *
     * GameQuest Storage key index
     * @memberof GameQuest
     * @member GameQuest._storageKey
     *
     */
    _storageKey: "_gamequest_", 
    
    /**
     *
     * GameQuest init constructor method
     * @memberof GameQuest
     * @method GameQuest.init
     * @param {object} quests The default quest status to start with
     *
     */
    init: function ( quests ) {
        quests = (quests || {});
        
        /**
         *
         * GameQuest Flag whether to save to localStorage
         * @memberof GameQuest
         * @member GameQuest._doSaveQuests
         *
         */
        this._doSaveQuests = true;
        
        /**
         *
         * GameQuest quests object internal
         * @memberof GameQuest
         * @member GameQuest._quests
         *
         */
        this._quests = (this._loadQuests() || quests);
        
        this._saveQuests();
    },
    
    /**
     *
     * GameQuest can load quest status from localStorage
     * @memberof GameQuest
     * @method GameQuest._loadQuests
     *
     */
    _loadQuests: function () {
        var result;
        
        try {
            if ( this._doSaveQuests ) {
                result = JSON.parse( localStorage.getItem( this._storageKey ) );
            }
            
        } catch ( error ) {}
        
        return result;
    },
    
    /**
     *
     * GameQuest can save quest status to localStorage
     * @memberof GameQuest
     * @method GameQuest._saveQuests
     *
     */
    _saveQuests: function () {
        /**
         *
         * Write JSON stringified quest status to localStorage
         * @event GameQuest#saveQuestsToLocalStorage
         *
         */
        try {
            if ( this._doSaveQuests ) {
                localStorage.setItem( this._storageKey, JSON.stringify( this.getQuests() ) );
            }
            
        } catch ( error ) {}
    },
    
    /**
     *
     * GameQuest retrieve all quests
     * @memberof GameQuest
     * @method GameQuest.getQuests
     * @returns GameQuest._quests
     *
     */
    getQuests: function () {
        return this._quests;
    },
    
    /**
     *
     * GameQuest set all quests
     * @memberof GameQuest
     * @method GameQuest.setQuests
     * @fires GameQuest#saveQuestsToLocalStorage
     *
     */
    setQuests: function () {
        this._saveQuests();
    },
    
    /**
     *
     * GameQuest add a new quest
     * @memberof GameQuest
     * @method GameQuest.addQuest
     * @param {string} id Unique id for the quest being added
     * @fires GameQuest#saveQuestsToLocalStorage
     *
     */
    addQuest: function ( id ) {
        if ( this._quests[ id ] ) {
            //console.log( "@GameQuest:addQuest", "quest \"" + id + "\" already exists." );
            
            return this;
        }
        
        this._quests[ id ] = {
            complete: false,
            
            // Perhaps a quest can have
            // parameters that must be fulfilled
            // before it is allowed to be marked
            // as complete...
            parameters: {}
        };
        
        this._saveQuests();
    },
    
    /**
     *
     * GameQuest mark a quest as completed
     * @memberof GameQuest
     * @method GameQuest.completeQuest
     * @param {string} id Unique id for the quest
     * @fires GameQuest#saveQuestsToLocalStorage
     *
     */
    completeQuest: function ( id ) {
        if ( this._quests[ id ] ) {
            this._quests[ id ].complete = true;
            
            this._saveQuests();
        }
    },
    
    /**
     *
     * GameQuest delete a quest
     * @memberof GameQuest
     * @method GameQuest.removeQuest
     * @param {string} id Unique id for the quest
     * @fires GameQuest#saveQuestsToLocalStorage
     *
     */
    removeQuest: function ( id ) {
        if ( this._quests[ id ] ) {
            delete this._quests[ id ];
            
            this._saveQuests();
        }
    },
    
    /**
     *
     * GameQuest get a quest by its id
     * @memberof GameQuest
     * @method GameQuest.getQuest
     * @param {string} id Unique id for the quest
     *
     */
    getQuest: function ( id ) {
        return this._quests[ id ];
    },
    
    /**
     *
     * GameQuest get completed status of a quest
     * @memberof GameQuest
     * @method GameQuest.isQuestComplete
     * @param {string} id Unique id for the quest
     * @returns Boolean
     *
     */
    isQuestComplete: function ( id ) {
        return (this._quests[ id ] && this._quests[ id ].complete);
    }
};


// Expose
window.GameQuest = GameQuest;


})( window );
/*!
 *
 * Set, add and manage 2D array representations of game maps.
 *
 * @GameScreen Class
 * @author: kitajchuk
 *
 */
(function ( window, undefined ) {


"use strict";


/**
 *
 * Maintains the 2D Array of the overworld map.
 * Calls GameScreen.prototype.init as constructor.
 * @constructor GameScreen
 * @memberof! <global>
 *
 */
var GameScreen = function () {
    return this.init.apply( this, arguments );
};

GameScreen.prototype = {
    constructor: GameScreen,
    
    
    /**
     *
     * GameScreen init constructor method
     * @memberof GameScreen
     * @method GameScreen.init
     * @param {object} screens Hash of 2D array mappings for the game screens
     *
     */
    init: function ( screens ) {
        /**
         *
         * GameScreen screens object internal
         * @memberof GameQuest
         * @member GameQuest._screens
         *
         */
        this._screens = (screens || {});
    },
    
    /**
     *
     * GameScreen get screen ref
     * @memberof GameScreen
     * @method GameScreen.getScreen
     * @param {string} id The id of the screen to get
     * @returns GameScreen._screens[ id ]
     *
     */
    getScreen: function ( id ) {
        return this._screens[ id ];
    },
    
    /**
     *
     * GameScreen add a screen
     * @memberof GameScreen
     * @method GameScreen.addScreen
     * @param {string} id The id of the screen to get
     * @param {number} width The width of the 2D array
     * @param {number} height The height of the 2D array
     * @param {number} start Optional value to start at
     *
     */
    addScreen: function ( id, width, height, start ) {
        var screen = [],
            value = (start || 0);
        
        for ( var y = 0; y < height; y++ ) {
            screen[ y ] = [];
            
            for ( var x = 0; x < width; x++ ) {
                screen[ y ][ x ] = value;
                
                value++;
            }
        }
        
        this.setScreen( id, screen );
    },
    
    /**
     *
     * GameScreen set a screen
     * @memberof GameScreen
     * @method GameScreen.setScreen
     * @param {string} id The id of the screen to get
     * @param {array} screen The 2D array screen to add
     *
     */
    setScreen: function ( id, screen ) {
        this._screens[ id ] = screen;
    },
    
    /**
     *
     * GameScreen get a screen value for a screen position
     * @memberof GameScreen
     * @method GameScreen.getScreenValue
     * @param {string} id The id of the screen to get
     * @param {object} pos The current screen position (x, y)
     * @returns The indexed value at the given position or undefined
     *
     */
    getScreenValue: function ( id, pos ) {
        var screen = this.getScreen( id ),
            result;
        
        // The screen is valid if both its row and column index exist in the screen map
        if ( screen[ pos.y ] !== undefined && screen[ pos.y ][ pos.x ] !== undefined ) {
            result = screen[ pos.y ][ pos.x ];
        }
        
        return result;
    },
    
    /**
     *
     * GameScreen get a screen position for a screen value
     * @memberof GameScreen
     * @method GameScreen.getScreenPosition
     * @param {string} id The id of the screen to get
     * @param {mixed} val The value you need to look up
     * @returns The (x, y) position if value is matched
     *
     */
    getScreenPosition: function ( id, val ) {
        var screen = this.getScreen( id ),
            result;
        
        for ( var y = screen.length; y--; ) {
            for ( var x = screen[ y ].length; x--; ) {
                if ( screen[ y ][ x ] === val ) {
                    result = {
                        x: x,
                        y: y
                    };
                }
            }
        }
        
        return result;
    }
};


// Expose
window.GameScreen = GameScreen;


})( window );
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
(function ( GameQuest ) {


    /**
     *
     * AkihabaraGamequest augments Gamed GameQuest Class
     * https://github.com/kitajchuk/gamed/blob/master/src/GameQuest.js
     * @constructor AkihabaraGamequest
     * @augments GameQuest
     * @see {@link GameQuest}
     * @author kitajchuk
     *
     */
    var AkihabaraGamequest = function () {};
    
    AkihabaraGamequest.prototype = new GameQuest();
    
    window.AkihabaraGamequest = new AkihabaraGamequest();


})( window.GameQuest );
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
/**
 * The main purpose of this module is to provide functions to integrate
 * all akibahara modules easily.
 * @namespace Akihabara
 */
var Akihabara = {
    /**
    * Akihabara current version
    * @type String
    **/
    VERSION: "2.0.0",

    /**
    * Extends form a module using custom data. This function merges data to the model, and if data and model share parameters, data's values remain intact.
    * @param {Object} model An object containing a set of parameters, a.k.a the source.
    * @param {Object} data An object containing a set of parameters, to merge with the source module.
    * @returns A merged model where the values of 'data' remain untouched: only new parameters and values from 'model' make it in.
    *
    * @example
    * AkihabaraTopview = {a: 1, b: 2, c: "three"};
    * withNewFunctions = {c: 3, d: "four"};
    *
    * newTopview = Akihabara.extendsFrom(AkihabaraTopview, withNewFunctions);
    * newTopview; // => {a: 1, b: 2, c: 3, d: "four"};
    **/
    extendsFrom: function (model, data) {
        if (data == null) { data = {}; }
        if (model != null) {
            for (var i in model) {
                if (data[i] == null) { data[i] = model[i]; }
            }
        }
        return data;
    },

    /**
    * Merges two sets of parameters together overwriting any existing parameters. This merges model- > data, and if data and model share parameters, data's are overwritten by model's.
    * @param {Object} data An object containing a set of parameters, the destination of the merge.
    * @param {Object} model An object containing a set of parameters, the source of the merge.
    * @returns A merged model where the values of 'model' take precedence over those of 'data'. The 'data' object is returned and will be an exact copy of 'model', plus any parameters that 'data' had before the merge that 'model' did not.
    * @example
    * dst = {a: 1, b: 2, c: "three"};
    * src = {c: "three", d: "four"};
    * merged = AkihabaraHelpers.mergeWithModel(dst, src);
    * merged; // => {a: 1, b: 2, c: "three", d: "four"}
    */
    copyModel: function (data, model) {
        if (data == null) { data = {}; }
        if (model != null) {
            for (var i in model) { data[i] = model[i]; }
        }
        return data;
    },

    /**
    * Creates a subset of an existing set of parameters.
    * @param {Object} obj An object containing a set of parameters, the source of the data.
    * @param {Array} attrs An array of strings, containing the names of parameters you wish to copy.
    * @returns A new set of parameters based on the subset specified.
    * @example
    * data = {a: 1, b: 2, c: "three"};
    * newdata = AkihabaraHelpers.createModel(data, ["a", "c"]);
    * newdata; // => {a: 1, c: "three"}
    */
    createModel: function (obj, attrs) {
        var ret = {};
        for (var i = 0; i < attrs.length; i++) {
            ret[attrs[i]] = obj[attrs[i]];
        }
        return ret;
    },

    /**
    * Creates a duplicate of an existing set of parameters.
    * @param {Object} model An object containing a set of parameters.
    * @returns A new object, equivalent to 'model'.
    * @example
    * data = {a: 1, b: 2, c: "three"};
    * newdata = AkihabaraHelpers.cloneObject(data);
    * newdata; // => {a: 1, b: 2, c: "three"}
    */
    cloneObject: function (model) {
        if (!model) { return model; }
        var data = {};
        for (var i in model) { data[i] = model[i]; }
        return data;
    },

    /**
    * This provides a number of configurations: fps, display zoom, dynamic frameskip, force touch parameters, etc. <br/>
    * Many of these settings can be set manually by passing an object with the parameters defined.
    * This function calls AkihabaraDebug.applyURLParametersOn to apply the url parameters to the game object.
    *
    * @param {Object} data An optional object containing parameters you wish to set. Works for:
    * <ul>
    * <li>data.zoom
    * <li>data.splash
    * <li>data.width
    * <li>data.height
    * <li>data.title
    * <li>data.fps
    * <li>data.padmode
    * </ul>
    */
    createNewGame: function (data) {
        if ((typeof data).toLowerCase() === "string") { data = {title: data}; }
        var device = AkihabaraDevices.configurationFor(navigator.userAgent);
        var footnotes = ["MADE WITH AKIHABARA (C)2012 - GPL2/MIT", "Project: http://akihabara.github.com", "Sources: http://github.com/akihabara"];
        document.title = (data.title ? data.title : "Akihabara");
        if (data.splash) {
            if (data.splash.footnotes) {
                for (var i = 0; i < footnotes.length; i++) {
                    data.splash.footnotes.push(footnotes[i]);
                }
            }
            AkihabaraGamebox.setSplashSettings(data.splash);
        }
        var screenwidth = (data.width ? data.width : (data.portrait ? 240 : 320));
        var screenheight = (data.height ? data.height : (data.portrait ? 320 : 240));
        if (device.iswii) {
            AkihabaraInput._keymap = {
                left: 175,
                right: 176,
                up: 177,
                down: 178,
                a: 173,
                b: 172,
                c: 13
            };
            document.onkeypress = function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                    return false;
                }
            };
        }

        if (typeof data.basepath === 'string') {
            AkihabaraGamebox.setBasePath(data.basepath);
        }
        if (data.debugfont) { AkihabaraGamebox.setDebugFont(data.debugfont); }
        if (data.offlinecache) { AkihabaraGamebox.setOfflineCache(data.offlinecache); }
        if (!data.splash || (data.splash.minilogo == null)) { AkihabaraGamebox.setSplashSettings({minilogo: "logo"}); }
        if (!data.splash || (data.splash.background == null)) { AkihabaraGamebox.setSplashSettings({background: AkihabaraGamebox._basepath + "splash.png"}); }
        if (!data.splash || (data.splash.minimalTime == null)) { AkihabaraGamebox.setSplashSettings({minimalTime: 3000}); }
        if (!data.splash || (data.splash.footnotes == null)) { AkihabaraGamebox.setSplashSettings({footnotes: footnotes}); }
        if (!data || !data.hardwareonly) {
            document.body.style.backgroundColor = "#000000";
            AkihabaraGamebox.setScreenBorder(false);
        }
        if (data.backgroundColor) { document.body.style.backgroundColor = data.backgroundColor; }

        // Test and apply parameters passed in the URL
        if (AkihabaraDebug) { AkihabaraDebug.applyURLParametersOn(device); }

        if (data.zoom) {
            AkihabaraGamebox.setZoom(data.zoom);
        } else if (device.zoom) {
            AkihabaraGamebox.setZoom(device.zoom);
        } else if (device.width) {
            AkihabaraGamebox.setZoom(device.width / screenwidth);
        } else if (device.height) {
            AkihabaraGamebox.setZoom(device.height / screenheight);
        }

        AkihabaraGamebox.setFps((data.fps ? data.fps : 25));

        if (device.forcedidle) { AkihabaraGamebox.setForcedIdle(device.forcedidle); }

        if (!data || !data.hardwareonly) { AkihabaraGamebox.initScreen(screenwidth, screenheight); }

        return device;
    }
};

/**
 * Keyboard and other input handling
 * @namespace AkihabaraInput
 */
var AkihabaraInput = {
    _keyboard: [],
    _keyboardpicker: 0,

    /**
    * Internal keymap to emulate old arcade buttons.
    * <br> z key for A button
    * <br> x key for B button
    * <br> c key for C button
    * <br> p key for pause
    * <br> m key for mute
    **/
    _keymap: {
        up: 38,
        down: 40,
        right: 39,
        left: 37,
        a: 90,
        b: 88,
        c: 67,
        pause: 80,
        mute: 77
    },

    /**
    * Verify a keydown event
    *
    * This function work with the _keyboard attribute and set 1 to the
    * keycode on it.
    *
    * @param {Object} e Object to test the keydown
    **/
    _keydown: function (e) {
        if (e.preventDefault) { e.preventDefault(); }
        var key = (e.fake || window.event ? e.keyCode : e.which);
        if (!AkihabaraInput._keyboard[key]) { AkihabaraInput._keyboard[key] = 1; }
    },

    /**
    * Verify a keyup event
    *
    * This function work with the _keyboard attribute and set -1 to the
    * keycode on it.
    *
    * The mute and pause keys are mapped here and call the correct function
    * for each of these actions.
    *
    * @param {Object} e Object to test the keyup
    **/
    _keyup: function (e) {
        if (e.preventDefault) { e.preventDefault(); }
        var key = (e.fake || window.event ? e.keyCode : e.which);
        AkihabaraInput._keyboard[key] = -1;
        //Check for global action keys
        if (e.keyCode === AkihabaraInput._keymap.pause) { AkihabaraGamebox.pauseGame(); }
    },

    /**
    * Resets all keys setting all of the to 1 on the onkeyup function
    **/
    _resetkeys: function () {
        for (var key in AkihabaraInput._keymap) {
            AkihabaraInput._keyup({fake: 1, keyCode: AkihabaraInput._keymap[key]});
        }
    },

    _showkeyboardpicker: function () {
        AkihabaraInput._keyboardpicker.value = "Click/Tap here to enable the keyboard";
        AkihabaraInput._keyboardpicker.style.left = (AkihabaraGamebox._screenposition.x + 5) + "px";
        AkihabaraInput._keyboardpicker.style.top = (AkihabaraGamebox._screenposition.y + 5) + "px";
        AkihabaraInput._keyboardpicker.style.width = (AkihabaraGamebox._screenposition.w - 10) + "px";
        AkihabaraInput._keyboardpicker.style.height = "30px";
        AkihabaraInput._keyboardpicker.style.border = "1px dashed white";
        AkihabaraInput._keyboardpicker.readOnly = null;
    },

    _hidekeyboardpicker: function () {
        AkihabaraInput._keyboardpicker.style.zIndex = 100;
        AkihabaraInput._keyboardpicker.readOnly = "yes";
        AkihabaraInput._keyboardpicker.style.position = "absolute";
        AkihabaraInput._keyboardpicker.style.textAlign = "center";
        AkihabaraInput._keyboardpicker.style.backgroundColor = "#000000";
        AkihabaraInput._keyboardpicker.style.color = "#fefefe";
        AkihabaraInput._keyboardpicker.style.cursor = "pointer";
        AkihabaraInput._keyboardpicker.value = "";
        AkihabaraInput._keyboardpicker.style.left = "0px";
        AkihabaraInput._keyboardpicker.style.top = "0px";
        AkihabaraInput._keyboardpicker.style.height = "0px";
        AkihabaraInput._keyboardpicker.style.width = "0px";
        AkihabaraInput._keyboardpicker.style.border = "0px";
        AkihabaraInput._keyboardpicker.style.padding = "0px";
        AkihabaraInput._keyboardpicker.style.margin = "0px";
    },

    /**
    * Returns true if a given key in this._keymap is pressed. Only returns true on the transition from unpressed to pressed.
    * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
    * @returns {Boolean} True if the given key is transitioning from unpressed to pressed in this frame.
    */
    keyIsHit: function (id) { return this._keyboard[this._keymap[id]] === 1; },

    /**
    * Returns true if a given key in this._keymap is being held down. Returns true as long as the key is held down.
    * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
    * @returns {Boolean} True if the given key is held down.
    */
    keyIsPressed: function (id) { return this._keyboard[this._keymap[id]] > 0; },

    /**
    * Returns true if a given key in this._keymap has been held down for at least one frame. Will not return true if a key
    * is quickly tapped, only once it has been held down for a frame.
    * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
    * @returns {Boolean} True if the given key has been held down for at least one frame.
    */
    keyIsHold: function (id) { return this._keyboard[this._keymap[id]] > 1; },

    /**
    * Returns true if a given key in this._keymap is released. Only returns true on the transition from pressed to unpressed.
    * @param {String} id A key in the keymap. By default, one of: "up" "down" "left" "right" "a" "b" "c"
    * @returns {Boolean} True if the given key is transitioning from pressed to unpressed in this frame.
    */
    keyIsReleased: function (id) { return this._keyboard[this._keymap[id]] === -1; },

    addKeyListernerTo: function (th) {
        th.addEventListener(window, 'keydown', AkihabaraInput._keydown);
        th.addEventListener(window, 'keyup', AkihabaraInput._keyup);
    },

    // Keyboard support on devices that needs focus (like iPad) - actually is not working for a bug on WebKit's "focus" command.
    focusDrivenKeyboardSuport: function (th) {
        AkihabaraInput._keyboardpicker = document.createElement("input");
        AkihabaraInput._keyboardpicker.onclick = function (evt) { AkihabaraInput._hidekeyboardpicker(); evt.preventDefault(); evt.stopPropagation(); };
        AkihabaraInput._hidekeyboardpicker(AkihabaraInput._keyboardpicker);
        th._box.appendChild(AkihabaraInput._keyboardpicker);
    },

    /**
    * Add touch events to an object
    * @param {Object} th The object to add touch events
    */
    addTouchEventsTo: function (th) {
        th.ontouchstart = function (evt) {
            AkihabaraGamebox._screenposition = AkihabaraGamebox._domgetabsposition(AkihabaraGamebox._screen);
            if (evt.touches[0].pageY - AkihabaraGamebox._screenposition.y < 30) {
                AkihabaraInput._showkeyboardpicker();
            } else {
                AkihabaraInput._hidekeyboardpicker();
                evt.preventDefault();
                evt.stopPropagation();
            }
        };

        th.onmousedown = function (evt) {
            AkihabaraGamebox._screenposition = AkihabaraGamebox._domgetabsposition(AkihabaraGamebox._screen);
            if (evt.pageY - AkihabaraGamebox._screenposition.y < 30) {
                AkihabaraInput._showkeyboardpicker();
            } else {
                AkihabaraInput._hidekeyboardpicker();
                evt.preventDefault();
                evt.stopPropagation();
            }
        };

        th.ontouchend = function (evt) { evt.preventDefault(); evt.stopPropagation(); };
        th.ontouchmove = function (evt) { evt.preventDefault(); evt.stopPropagation(); };
    }
};

/**
 * Debug module provides some utils for debug the Akihabara user project.
 * @namespace AkihabaraDebug
 */
var AkihabaraDebug = {

    /**
    * Writes the contents of an object to a string.
    * @param {Object} Any object.
    * @returns A string containing all the contents of an object. If the object contains functions, the string will contain the code for those functions.
    */
    objToStr: function (o) {
        var ret = "";
        for (var n in o) { ret += n + ":[" + o[n] + "] "; }
        return ret;
    },

    /**
    * Converts a quantity of frames into a timestamp formatted "mm: ss: cs" (minutes, seconds, centiseconds). Calculated using the current frames per second.
    * @param {Integer} frames A quantity of frames.
    * @returns A string containing a timestamp formatted "mm: ss: cs", representing the length of time it would take to render that many frames.
    * @example
    * // Assuming 25 frames per second, Akihabara's default.
    * timestamp = AkihabaraHelpers.framestotime(25);
    * timestamp; // => '00:01:00';
    * timestamp = AkihabaraHelpers.framestotime(25 * 60);
    * timestamp; // => '01:00:00';
    */
    framesToTime: function (frames) {
        var csec = Math.ceil(frames / AkihabaraGamebox.getFps() * 100);
        return AkihabaraHelpers.prepad((Math.floor(csec / 6000) % 60), 2, "0") +
            ":" + AkihabaraHelpers.prepad((Math.floor(csec / 100) % 60), 2, "0") +
            ":" + AkihabaraHelpers.prepad(csec % 100, 2, "0")
        ;
    },

    fpsCounterInit: function (data) {

        // Default options
        if (!data) { data = {}; }
        if (!data.x) { data.x = 0; }
        if (!data.y) { data.y = 0; }
        if (!data.font) { data.font = 'lighter 10px sans-serif'; }
        if (!data.color) { data.color = "#FFF"; }

        // Own fpsCounter vars
        data.frameCount = 0;
        data.currentFps = 0;
        data.lastFps = new Date().getTime();

        // Setting data to main object game
        this.addDebugAction('fpsCounter', data);
    },

    statusBar: function (data) {
        // Default options
        if (!data) { data = {}; }
        if (!data.backgroundColor) { data.backgroundColor = "#FFF"; }
        if (!data.color) { data.color = "#000"; }
        if (!data.font) { data.font = 'lighter 10px sans-serif'; }

        this.addDebugAction('statusBar', data);
    },

    setStatBar: function (txt) {
        function createStatBar() {
            if (!AkihabaraGamebox._debugTool.statusBar) { return false; }

            var statbar = document.createElement("div");
            if (AkihabaraGamebox._border) { statbar.style.border = "1px solid black"; }
            statbar.style.margin = "auto";
            statbar.style.backgroundColor = AkihabaraGamebox._debugTool.statusBar.backgroundColor;
            statbar.style.font = AkihabaraGamebox._debugTool.statusBar.font;
            statbar.style.color = AkihabaraGamebox._debugTool.statusBar.color;
            statbar.style.width = (AkihabaraGamebox._camera.w * AkihabaraGamebox._zoom) + "px";
            AkihabaraGamebox._container.appendChild(statbar);
            AkihabaraGamebox._statbar = statbar;
        }

        if (!AkihabaraGamebox._statbar) { createStatBar(); }
        AkihabaraGamebox._statbar.innerHTML = (txt || "&nbsp");
    },

    // Add a new debug utility and its data
    addDebugAction: function  (name, data) {
        AkihabaraGamebox._debugTool[name] = data;
    },

    run: function (data) {

        if (data.fpsCounter) {
            var fps = data.fpsCounter,
            thisFrame = new Date().getTime(),
            diffTime = Math.ceil((thisFrame - fps.lastFps)),
            ctx = AkihabaraGamebox._screenCtx;

            if (diffTime >= 1000) {
                fps.currentFps = fps.frameCount;
                fps.frameCount = 0.0;
                fps.lastFps = thisFrame;
            }

            fps.frameCount++;

            // Print the result on the main CTX
            ctx.fillStyle = fps.color;
            ctx.font = fps.font;
            ctx.fillText('FPS: ' + fps.currentFps + '/' + AkihabaraGamebox._fps, fps.x, fps.y);

        }

        if (data.statusBar) {
            var statline = "Idle: " + AkihabaraGamebox._framestart + "/" + AkihabaraGamebox._mspf + (AkihabaraGamebox._frameskip > 0 ? " (" + AkihabaraGamebox._frameskip + "skip)" : "") + " | ";
            var cnt = 0, g = 0;
            for (g = 0; g < AkihabaraGamebox._groups.length; g++) {
                if (AkihabaraGamebox._groupplay[AkihabaraGamebox._groups[g]]) {
                    cnt = 0;
                    for (var obj in AkihabaraGamebox._objects[AkihabaraGamebox._groups[g]]) { cnt++; }
                    if (cnt) { statline += AkihabaraGamebox._groups[g] + "[" + cnt + "] "; }
                }
            }
            if (AkihabaraGamebox._pauseGame) { statline += ' | PAUSE ON'; }

            this.setStatBar(statline);
        }
    },

    /**
    * Get the current URL
    * @returns {String} url http://thecurrent.url
    **/
    getURL: function () {
        return window.location.href;
    },

    /**
    * Reads the value of a query parameter from the URL of the web page.
    * @param {String} name The name of the URL parameter.
    * @returns The value of the URL parameter, as a string.
    * @example
    * // If the URL is http://example.com/game.html?lives=3
    * player.lives = AkihabaraHelpers.getUrlValueFor("lives");
    * player.lives; // => "3"
    */
    getURLValueFor: function (name) {
        name = name.replace(/[\[]/, "[").replace(/[\]]/, "]");
        var regex = new RegExp("[?&]" + name + "=([^&#]*)");
        var results = regex.exec(AkihabaraDebug.getURL());
        if (results == null) {
            return "";
        } else {
            return results[1];
        }
    },

    /**
    * Test all URL parameters and apply them on the given object
    * @param {Object} device The object that will receive some params based on url settings
    **/
    applyURLParametersOn: function (device) {
        if (AkihabaraDebug.getURLValueFor("statusbar")) {
            AkihabaraDebug.statusBar();
        }

        if (AkihabaraDebug.getURLValueFor("db") || device.doublebuffering) {
            AkihabaraGamebox.setDoubleBuffering(true);
        }

        if (AkihabaraDebug.getURLValueFor("noautoskip")) {
            AkihabaraGamebox.setAutoskip(null);
        }

        if (AkihabaraDebug.getURLValueFor("zoom")) {
            AkihabaraGamebox.setZoom(AkihabaraDebug.getURLValueFor("zoom"));
        }

        if (AkihabaraDebug.getURLValueFor("fps")) {
            AkihabaraGamebox.setFps(AkihabaraDebug.getURLValueFor("fps") * 1);
        }

        if (AkihabaraDebug.getURLValueFor("fskip")) {
            AkihabaraGamebox.setFrameskip(AkihabaraDebug.getURLValueFor("fskip"));
        }

        if (AkihabaraDebug.getURLValueFor("forcedidle")) {
            AkihabaraGamebox.setForcedIdle(AkihabaraDebug.getURLValueFor("forcedidle") * 1);
        }

        if (AkihabaraDebug.getURLValueFor("canlog")) {
            AkihabaraGamebox.setCanLog(true);
        }

        if (AkihabaraDebug.getURLValueFor("showplayers")) {
            AkihabaraGamebox.setShowPlayers(AkihabaraDebug.getURLValueFor("showplayers") === "yes");
        }
    }
};

/**
 * Trigo module provides some math stuff for moving objects in a
 * direction or following a round path.
 * @namespace AkihabaraTrigo
 */
var AkihabaraTrigo = {

    ANGLE_RIGHT: 0,
    ANGLE_DOWN: Math.PI * 0.5,
    ANGLE_LEFT: Math.PI,
    ANGLE_UP: Math.PI * 1.5555555,

    /**
    * Adds two angles together (radians).
    * @param {Float} a Base angle.
    * @param {Float} add The angle you're adding to the base angle.
    * @returns The resultant angle, always between 0 and 2*pi.
    */
    addAngle: function (a, add) {
        a = (a + add) % (Math.PI * 2);
        if (a < 0) {
            return (Math.PI * 2) + a;
        } else {
            return a;
        }
    },

    /**
    * Gets the distance between two points.
    * @param {Object} p1 This is an object containing x and y params for the first point.
    * @param {Object} p2 This is an object containing x and y params for the second point.
    * @returns The distance between p1 and p2.
    */
    getDistance: function (p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    },

    /**
    * Calculates the angle between two points.
    * @param {Object} p1 This is an object containing x and y params for the first point.
    * @param {Object} p2 This is an object containing x and y params for the second point.
    * @param {Float} transl (Optional) Adds an angle (in radians) to the result. Defaults to 0.
    * @returns The angle between points p1 and p2, plus transl.
    */
    getAngle: function (p1, p2, transl) {
        return AkihabaraTrigo.addAngle(Math.atan2(p2.y - p1.y, p2.x - p1.x), (transl ? transl : 0));
    },

    /**
    * Translates a point by a vector defined by angle and distance. This does not return a value but rather modifies the x and y values of p1.
    * @param {Object} p1 This is an object containing x and y params for the point.
    * @param {Float} a The angle of translation (rad).
    * @param {Float} d The distance of translation.
    */
    translate: function (p1, a, d) {
        p1.x = p1.x + Math.cos(a) * d;
        p1.y = p1.y + Math.sin(a) * d;
    },

    /**
    * Translates an x component of a coordinate by a vector defined by angle and distance. This returns its component translation.
    * @param {Float} x1 This is an x coordinate.
    * @param {Float} a The angle of translation (rad).
    * @param {Float} d The distance of translation.
    */
    translateX: function (x1, a, d) {
        return x1 + Math.cos(a) * d;
    },

    /**
    * Translates a y component of a coordinate by a vector defined by angle and distance. This returns its component translation.
    * @param {Float} y1 This is a y coordinate.
    * @param {Float} a The angle of translation (rad).
    * @param {Float} d The distance of translation.
    */
    translateY: function (y1, a, d) {
        return y1 + Math.sin(a) * d;
    }
};

var AkihabaraDynalist = {

    create: function () {
        return {
            test: null,
            first: null,
            last: null,
            data: [],
            dl: 0,
            gar: [],
            disconnect: function (obd) {
                if (this.data[obd].__first != null) {
                    this.data[this.data[obd].__first].__next = this.data[obd].__next;
                } else {
                    this.first = this.data[obd].__next;
                }
                if (this.data[obd].__next != null) {
                    this.data[this.data[obd].__next].__first = this.data[obd].__first;
                } else {
                    this.last = this.data[obd].__first;
                }
            },
            addObject: function (obj, prio) {
                var nid = this.gar.pop();
                if (nid == null) {
                    nid = this.dl;
                    this.dl++;
                }
                if (this.first == null) { // First element
                    obj.__next = null;
                    obj.__first = null;
                    this.first = nid;
                    this.last = nid;
                } else { // Chain next
                    var i = this.first;
                    while (i != null) {
                        if (this.data[i].__prio > prio) {
                            break;
                        } else {
                            i = this.data[i].__next;
                        }
                    }
                    if (i == null) { // if last, chain in queue
                        obj.__next = null;
                        obj.__first = this.last;
                        this.data[this.last].__next = nid;
                        this.last = nid;
                    } else { // else reconnect objects
                        obj.__first = this.data[i].__first;
                        obj.__next = i;
                        this.data[i].__first = nid;
                        if (obj.__first != null) {
                            this.data[obj.__first].__next = nid;
                        } else {
                            this.first = nid;
                        }
                    }

                }
                obj.__prio = prio;
                obj.__id = nid;
                this.data[nid] = obj;
                return nid;
            },
            setPrio: function (obd, prio) {
                var i;
                if (this.data[obd].__prio === prio) { return; }
                if (this.first !== this.last) {
                    if (this.data[obd].__prio < prio) {
                        if (this.data[obd].__id !== this.last) {
                            i = this.data[obd].__next;
                            while (i != null) {
                                if (this.data[i].__prio >= prio) {
                                    break;
                                } else {
                                    i = this.data[i].__next;
                                }
                            }
                            if ((i == null) || (this.data[i].__first !== this.data[obd].__id)) {
                                // disconnect
                                this.disconnect(obd);
                                // Reconnect
                                if (i == null) {
                                    this.data[this.last].__next = this.data[obd].__id;
                                    this.data[obd].__first = this.last;
                                    this.data[obd].__next = null;
                                    this.last = this.data[obd].__id;
                                } else {
                                    this.data[obd].__first = this.data[i].__first;
                                    this.data[obd].__next = i;
                                    this.data[i].__first = this.data[obd].__id;
                                    if (this.data[obd].__first != null) {
                                        this.data[this.data[obd].__first].__next = this.data[obd].__id;
                                    } else {
                                        this.first = this.data[obd].__id;
                                    }
                                }
                            }
                        }
                    } else {
                        if (this.data[obd].__id !== this.first) {
                            i = this.data[obd].__first;
                            while (i != null) {
                                if (this.data[i].__prio <= prio) {
                                    break;
                                } else {
                                    i = this.data[i].__first;
                                }
                            }
                            if ((i == null) || (this.data[i].__next !== this.data[obd].__id)) {
                                // disconnect
                                this.disconnect(obd);
                                if (i == null) {
                                    this.data[this.first].__first = this.data[obd].__id;
                                    this.data[obd].__first = null;
                                    this.data[obd].__next = this.first;
                                    this.first = this.data[obd].__id;
                                } else {
                                    this.data[obd].__first = i;
                                    this.data[obd].__next = this.data[i].__next;
                                    this.data[i].__next = this.data[obd].__id;
                                    if (this.data[obd].__next != null) {
                                        this.data[this.data[obd].__next].__first = this.data[obd].__id;
                                    } else {
                                        this.last = this.data[obd].__id;
                                    }
                                }
                            }
                        }
                    }
                }
                this.data[obd].__prio = prio;
            },
            remove: function (obd) {
                this.disconnect(obd);
                this.gar.push(this.data[obd].__id);
                delete this.data[this.data[obd].__id];
            }
        };
    }
};

// A special circular queue with some features useful for the resource loader
var AkihabaraCyclelist = {

    create: function (size) {
        return {
            _head: 0,
            _tail: 0,
            _data: [],
            _size: (size ? size :  10),
            _total: 0,
            _done: 0,
            _current: null,
            getTotal: function () { return this._total; }, // Number of elements to be "poped"
            getDone: function () { return this._done; }, // Number of popped elements since the last empty
            getSize: function () { return this._size; }, // The maximum number of elements in the queue
            isProcessing: function () { return this._current != null; }, // The last pop was not a null (i.e. the queue returned a valid object)
            isEnded: function () { return (this._head === this._tail); }, // There are other elements in the queue
            isBusy: function () { return (this.isProcessing() || !this.isEnded()); }, // There are elements in the queue/the last one pop returned an object that is being processed
            getCurrent: function () { return this._current; }, // Return the last popped element
            push: function (d) {
                this._data[this._head] = d;
                this._head = (this._head + 1) % this._size;
                this._total++;
            },
            pop: function () {
                if (this.isEnded()) {
                    this._total = 0;
                    this._done = 0;
                    this._current = null;
                } else {
                    this._current = this._data[this._tail];
                    this._tail = (this._tail + 1) % this._size;
                    this._done++;
                }
                return this._current;
            },
            dump: function () {
                var r = "";
                for (var i = 0; i < this._size; i++) {
                    r += i + ") " + this._data[i] + " | " + (i === this._head ? "HEAD " : "") + (i === this._tail ? "TAIL " : "") + "\n";
                }
                r += "\n\n" + this._done + "/" + this._total;
                return r;
            }
        };
    }
};

// A simple circular cache handler
var AkihabaraCachelist = {

    create: function (size) {
        return {
            _cache: {},
            _queue: [],
            _head: 0,
            _size: (size ? size : 10),
            add: function (k, v) {
                if (!this._cache[k]) {
                    if (this._queue[this._head]) {
                        delete this._cache[this._queue[this._head]];
                    }
                    this._queue[this._head] = k;
                    this._cache[k] = {pos: this._head, value: v};
                    this._head = (this._head + 1) % this._size;
                } else { this._cache[k].value = v; }
            },
            read: function (k) {
                return (this._cache[k] ? this._cache[k].value : null);
            },
            clear: function () {
                this._cache = {};
                this._queue = [];
                this._head = 0;
            }
        };
    }
};

/**
 * Gamebox module allows multiple grouped objects to move simultaneously, it helps with collisions, #
 * rendering and moving objects. It also provides monospaced pixel-font rendering, keyboard handling,
 * audio, double buffering and FSEs. Gamebox can also store and load data from cookies!
 * @namespace AkihabaraGamebox
 */
var AkihabaraGamebox = {

    // CONSTANTS
    ALIGN_CENTER: 0,
    ALIGN_MIDDLE: 0,
    ALIGN_RIGHT: 1,
    ALIGN_BOTTOM: 1,
    COLOR_BLACK: 'rgb(0, 0, 0)',
    COLOR_WHITE: 'rgb(255, 255, 255)',
    ZINDEX_LAYER: -1,
    PALETTES: { // I think that some retrogamers will find these useful and/or inspiring
        c64: { // C64 palette, picked from http: //pepto.de/projects/colorvic/
            order: ["black", "white", "red", "cyan", "purple", "green", "blue", "yellow", "orange", "brown", "lightred", "darkgray", "gray", "lightgreen", "lightblue", "lightgray"],
            colors: { black: "#000000", white: "#FFFFFF", red: "#68372B", cyan: "#70A4B2", purple: "#6F3D86", green: "#588D43", blue: "#352879", yellow: "#B8C76F", orange: "#6F4F25", brown: "#433900", lightred: "#9A6759", darkgray: "#444444", gray: "#6C6C6C", lightgreen: "#9AD284", lightblue: "#6C5EB5", lightgray: "#959595"}
        }
    },

    // VARS
    _pauseGame: false,
    _debugTool : {},
    _basepath : "akihabara/images/",
    _autoid: 0,
    _cb: null, // callback for loadAll()
    _flagstype: {
        experimental: "check",
        fse: "list",
        offlinecache: "check",
        loadscreen: "list",
        noaudio: "check"
    },
    _flags: {
        experimental: false,
        fse: "none",
        offlinecache: false,
        loadscreen: "normal",
        noaudio: false
    },
    _localflags: {},
    _fonts: {},
    _tiles: {},
    _images: {},
    _camera: {},
    _debugfont: "debugfont.png",
    getDebugFont: function () { return AkihabaraGamebox._basepath + AkihabaraGamebox._debugfont; },
    _container: '',
    _screen: 0,
    _screenCtx: null,
    _screenposition: 0,
    _screenh: 0,
    _screenw: 0,
    _screenhh: 0,
    _screenhw: 0,
    _zoom: 1,
    _canvas: {},
    _objects: {},
    _groups: [],
    _renderorder: [],
    _groupplay: {},
    _actionqueue: ["first", "then", "blit", "after"], // initialize is executed once
    _mspf: 0,
    _fps: 0,
    _gametimer: 0,
    _frameskip: 0,
    _autoskip: {min: 0, max: 5, lowidle: 0, hiidle: 5}, // minimum frameskip, maximum frameskip, minimum idle time allowed for increasing frameskip, maximum idle time allowed for decreasing frameskip
    _fskid: 0,
    _statbar: '',
    _border: 0,
    _garbage: [],
    _zindexch: [],
    _framestart: 0,
    _zindex: AkihabaraDynalist.create(),
    _db: false,
    _sessioncache: "",
    _breakcacheurl: function (a) {return (this._flags.offlinecache ? a : a + (a.indexOf("?") === -1 ? "?" : "&") + "_brc=" + AkihabaraGamebox._sessioncache); },
    _forcedidle: 0,
    _gamewaiting: 0,
    _canlog: false,
    _splash: {
        gaugeLittleColor: "rgb(255, 240, 0)",
        gaugeLittleBackColor: "rgb(255, 255, 255)",
        gaugeBorderColor: "rgb(0, 0, 0)",
        gaugeBackColor: "rgb(100, 100, 100)",
        gaugeColor: "rgb(255, 240, 0)",
        gaugeHeight: 10,
        background: null,
        minimalTime: 0,
        footnotes: null,
        footnotesSpacing: 1
    },
    _minimalexpired: 0, // 0: not triggered, 1: triggered, 2: done
    setCanLog: function (c) { this._canlog = c && window.console; },
    canLog: function () { return this._canlog; },
    log: function () {}, // Overridden if console is really available
    _safedrawimage: function (tox, img, sx, sy, sw, sh, dx, dy, dw, dh) {
        if (!img || !tox) { return; }
        if (sx < 0) { dx -= (dw / sw) * sx; sw += sx; sx = 0; }
        if (sy < 0) { dy -= (dh / sh) * sy; sh += sy; sy = 0; }
        if (sx + sw > img.width) { dw = (dw / sw) * (img.width - sx); sw = img.width - sx; }
        if (sy + sh > img.height) { dh = (dh / sh) * (img.height - sy); sh = img.height - sy; }
        try { if ((sh > 0) && (sw > 0) && (sx < img.width) && (sy < img.height)) { tox.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh); } } catch (e) { }
    },
    pauseGame: function () {
        if (!AkihabaraGamebox._pauseGame) {
            AkihabaraGamebox._pauseGame = true;
        } else {
            AkihabaraGamebox._pauseGame = false;
            AkihabaraGamebox._nextframe();
        }
    },
    showPauseMessage: function () {
        AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 0.5});
        var ctx = AkihabaraGamebox._screenCtx;
        ctx.fillStyle = '#FFF';
        ctx.font = '12px sans-serif';
        ctx.fillText('PAUSE', 141, 125);
    },
    _domgetabsposition: function (oElement) {
        var sizes = {x: 0, y: 0, h: 0, w: 0};
        sizes.h = oElement.offsetHeight;
        sizes.w = oElement.offsetWidth;
        while (oElement != null) {
            sizes.y += oElement.offsetTop;
            sizes.x += oElement.offsetLeft;
            oElement = oElement.offsetParent;
        }
        return sizes;
    },

    /**
    * Sets the AkihabaraGamebox._forcedidle property.
    * @param {Boolean} f The value to write to AkihabaraGamebox._forcedidle.
    */
    setForcedIdle: function (f) { this._forcedidle = f; },

    /**
    * Returns a AkihabaraGamebox flag at index f.
    * @param {Object} f The index of the flag you want returned.
    */
    getFlag: function (f) { return this._flags[f]; },

    setScreenBorder: function (a) { this._border = a; },

    /**
    * Initializes the screen to a certain width and height, applies zoom attributes, populates the
    * body of the HTML document including the canvas element, sets an initial camera, creates a '_buffer'
    * canvas, sets keyboard event listeners, and many other initialization functions.
    * @param {Integer} w The width of the main canvas.
    * @param {Integer} h The height of the main canvas.
    */
    initScreen: function (w, h) {
        document.body.style.textAlign = "center";
        document.body.style.height = "100%";
        document.body.style.margin = "0px";
        document.body.style.padding = "0px";
        document.getElementsByTagName("html")[0].style.height = "100%";

        var container = document.createElement("div");
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.display = "table";
        this._box = document.createElement("div");
        this._box.style.display = "table-cell";
        this._box.style.width = "100%";
        this._box.style.textAlign = "center";
        this._box.style.verticalAlign = "middle";

        this._screen = document.createElement("canvas");
        this._screenCtx = this._screen.getContext('2d');
        if (this._border) { this._screen.style.border = "1px solid black"; }
        this._screen.setAttribute('height', h);
        this._screen.setAttribute('width', w);
        this._screen.style.width = (w * this._zoom) + "px";
        this._screen.style.height = (h * this._zoom) + "px";
        this._screenh = h;
        this._screenw = w;
        this._screenhh = Math.floor(h / 2);
        this._screenhw = Math.floor(w / 2);

        this._camera.x = 0;
        this._camera.y = 0;
        this._camera.h = h;
        this._camera.w = w;
        AkihabaraGamebox._container = this._box;
        this._box.appendChild(this._screen);
        container.appendChild(this._box);
        document.body.appendChild(container);

        this.createCanvas("_buffer");
        AkihabaraInput.addKeyListernerTo(AkihabaraGamebox);
        AkihabaraInput.focusDrivenKeyboardSuport(AkihabaraGamebox);

        AkihabaraInput.addTouchEventsTo(AkihabaraGamebox._screen);

        var d = new Date();
        AkihabaraGamebox._sessioncache = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + "-" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();

        switch (AkihabaraGamebox._flags.fse) { // Initialize FSEs
        case "scanlines":
            AkihabaraGamebox.createCanvas("-gbox-fse", {w: w, h: h});
            AkihabaraGamebox.getCanvasContext("-gbox-fse").save();
            AkihabaraGamebox.getCanvasContext("-gbox-fse").globalAlpha = 0.2;
            AkihabaraGamebox.getCanvasContext("-gbox-fse").fillStyle = AkihabaraGamebox.COLOR_BLACK;
            for (var j = 0; j < h; j += 2) {
                AkihabaraGamebox.getCanvasContext("-gbox-fse").fillRect(0, j, w, 1);
            }
            AkihabaraGamebox.getCanvasContext("-gbox-fse").restore();
            AkihabaraGamebox._localflags.fse = true;
            break;
        case "lcd":
            AkihabaraGamebox.createCanvas("-gbox-fse-old", {w: w, h: h});
            AkihabaraGamebox.createCanvas("-gbox-fse-new", {w: w, h: h});
            AkihabaraGamebox._localflags.fse = true;
            break;
        }
    },

    /**
    * Sets the AkihabaraGamebox._db property. Turns on an off double buffering.
    * @param {Boolean} db The value to write to AkihabaraGamebox._db. True enables double buffering, false disables.
    */
    setDoubleBuffering: function (db) { this._db = db; },

    /**
    * Set the frames per second rate.
    * @param {Integer} f Total frames per second for the game to run at.
    */
    setFps: function (f) {
        this._fps = f;
        this._mspf = Math.floor(1000 / f);
    },

    /**
    * Determines which frame of a given animation to display. Will loop an animation.
    * @param {Integer} cnt A global frame counter.
    * @param {Object} anim An object with parameters speed (the animation speed) and frames (the array representing the animation sequence).
    * @returns The particular animation frame to display during this step.
    */
    decideFrame: function (cnt, anim) {
        return anim.frames[Math.floor(cnt / anim.speed) % anim.frames.length];
    },

    /**
    * Determines which frame of a given animation to display. Will remain on the last frame when the animation has played once.
    * @param {Integer} cnt A global frame counter.
    * @param {Object} anim An object with parameters speed (the animation speed) and frames (the array representing the animation sequence).
    * @returns The particular animation frame to display during this step.
    */
    decideFrameOnce: function (cnt, anim) {
        return anim.frames[(cnt >= anim.frames.length * anim.speed ? anim.frames.length - 1 : Math.floor(cnt / anim.speed))];
    },

    /**
    * Returns whether the animation was fully played at least once with decideFrame or fully with decideFrameOnce.
    * @param {Integer} cnt A global frame counter.
    * @param {Object} anim An object with parameters speed (the animation speed) and frames (the array representing the animation sequence).
    * @returns A boolean, true if the animation has been played at least once.
    */
    isLastFrameOnce: function (cnt, anim) {
        return (cnt >= anim.frames.length * anim.speed);
    },

    /**
    * Get the frames per second rate (default is 25).
    * @returns {Integer} Returns the frames per second.
    */
    getFps: function () { return this._fps; },
    setAutoskip: function (f) { this._autoskip = f; },
    setFrameskip: function (f) { this._frameskip = f; },

    /**
    * Get the screen height.
    * @returns {Integer} Screen height in pixels.
    */
    getScreenH: function () { return this._screenh; },

    /**
    * Get the screen width.
    * @returns {Integer} Screen width in pixels.
    */
    getScreenW: function () { return this._screenw; },

    /**
    * Get the screen half-height.
    * @returns {Integer} Screen half-height in pixels.
    */
    getScreenHH: function () { return this._screenhh; },

    /**
    * Get the screen half-width.
    * @returns {Integer} Screen half-width in pixels.
    */
    getScreenHW: function () { return this._screenhw; },

    /**
    * Sets the AkihabaraGamebox._zoom parameter, only works before AkihabaraGamebox.initScreen is called.
    * @param {Integer} z Zoom factor.
    */
    setZoom: function (z) { this._zoom = z; },

    /**
    * Deprecated: AkihabaraGamebox._cb is now set by passing it directly into AkihabaraGamebox.loadAll(). Left in for backwards compatibility.
    * @param {String} cb The name of the function to be called once AkihabaraGamebox.loadAll is completed.
    */
    setCallback: function (cb) { this._cb = cb; },

    _playobject: function (g, obj, a) {
        if (AkihabaraGamebox._objects[g][obj].initialize) {
            AkihabaraGamebox._objects[g][obj].initialize(obj);
            delete AkihabaraGamebox._objects[g][obj].initialize;
        }
        if (AkihabaraGamebox._objects[g][obj][a]) { AkihabaraGamebox._objects[g][obj][a](obj, a); }
    },

    _nextframe: function () {
        AkihabaraGamebox._framestart = AkihabaraGamebox._mspf - (new Date().getTime() - AkihabaraGamebox._framestart);
        if (AkihabaraGamebox._autoskip) {
            if ((AkihabaraGamebox._framestart < AkihabaraGamebox._autoskip.lowidle) && (AkihabaraGamebox._frameskip < AkihabaraGamebox._autoskip.max)) {
                AkihabaraGamebox.setFrameskip(AkihabaraGamebox._frameskip + 1);
            } else {
                if ((AkihabaraGamebox._framestart > AkihabaraGamebox._autoskip.hiidle) && (AkihabaraGamebox._frameskip > AkihabaraGamebox._autoskip.min)) {
                    AkihabaraGamebox.setFrameskip(AkihabaraGamebox._frameskip - 1);
                }
            }
        }

        if (!AkihabaraGamebox._pauseGame) {
            this._gametimer = setTimeout(AkihabaraGamebox.go, (AkihabaraGamebox._framestart <= 0 ? 1 : AkihabaraGamebox._framestart));
        } else {
            AkihabaraGamebox.showPauseMessage();
        }

        if (typeof AkihabaraDebug !== "undefined") { AkihabaraDebug.run(AkihabaraGamebox._debugTool); }
    },

    /**
    * Apply FSEs to the screen. Is called each frame.
    */
    _applyfse: function () {
        switch (AkihabaraGamebox._flags.fse) {
        case "scanlines":
            AkihabaraGamebox.getBufferContext().drawImage(AkihabaraGamebox.getCanvas("-gbox-fse"), 0, 0);
            break;
        case "lcd":
            if (AkihabaraGamebox._localflags.fselcdget && AkihabaraGamebox.getBuffer()) {
                AkihabaraGamebox.getCanvasContext("-gbox-fse-new").drawImage(AkihabaraGamebox.getBuffer(), 0, 0);
            }
            var AkihabaraGameboxBufferContext = AkihabaraGamebox.getBufferContext();
            AkihabaraGameboxBufferContext.save();
            AkihabaraGameboxBufferContext.globalAlpha = 0.5;
            AkihabaraGameboxBufferContext.drawImage(AkihabaraGamebox.getCanvas("-gbox-fse-old"), 0, 0);
            AkihabaraGameboxBufferContext.restore();
            if (AkihabaraGamebox._localflags.fselcdget) {
                AkihabaraGamebox.swapCanvas("-gbox-fse-new", "-gbox-fse-old");
            }
            AkihabaraGamebox._localflags.fselcdget = !AkihabaraGamebox._localflags.fselcdget;
            break;
        }
    },

    /**
    * Register the code that have to be executed once the page is loaded. Usually contains game initialization, resources loading etc.
    */
    onLoad: function (code) {
        this.addEventListener(window, 'load', code);
    },

    /**
    * This function is called once per frame. This is where the basic rendering and processing of groups occurs.
    */
    go: function () {

        if (AkihabaraGamebox._loaderqueue.isBusy()) {
            if (AkihabaraGamebox._gamewaiting === 1) {
                AkihabaraGamebox.blitFade(AkihabaraGamebox._screenCtx, {alpha: 0.5});
                AkihabaraGamebox.blitText(AkihabaraGamebox._screenCtx, {font: "_dbf", dx: 2, dy: 2, text: "LOADING..."});
                AkihabaraGamebox._gamewaiting = true;
            }
            if (AkihabaraGamebox._gamewaiting <= 1) {
                var bw = Math.floor(((AkihabaraGamebox.getScreenW() - 4) * AkihabaraGamebox._loaderqueue.getDone()) / AkihabaraGamebox._loaderqueue.getSize());
                AkihabaraGamebox._screenCtx.globalAlpha = 1;
                AkihabaraGamebox._screenCtx.fillStyle = AkihabaraGamebox._splash.gaugeLittleBackColor;
                AkihabaraGamebox._screenCtx.fillRect(0, 4 + AkihabaraGamebox.getFont("_dbf").tileh, AkihabaraGamebox.getScreenW(), 1);
                AkihabaraGamebox._screenCtx.fillStyle = AkihabaraGamebox._splash.gaugeLittleColor;
                AkihabaraGamebox._screenCtx.fillRect(0, 4 + AkihabaraGamebox.getFont("_dbf").tileh, (bw > 0 ? bw : 0), 1);
                AkihabaraGamebox._screenCtx.restore();
                AkihabaraDebug.setStatBar("Loading... (" + AkihabaraGamebox._loaderqueue.getDone() + "/" + AkihabaraGamebox._loaderqueue.getTotal() + ")");
            }
            if (AkihabaraGamebox._gamewaiting) { AkihabaraGamebox._gamewaiting--; }
            setTimeout(AkihabaraGamebox.go, 1000);
        } else {
            AkihabaraGamebox._gamewaiting = 3;
            AkihabaraGamebox._framestart = new Date().getTime();
            var i, gr = "";
            for (var g = 0; g < AkihabaraGamebox._renderorder.length; g++) {
                if (AkihabaraGamebox._groupplay[AkihabaraGamebox._renderorder[g]]) {
                    if (AkihabaraGamebox._renderorder[g] === AkihabaraGamebox.ZINDEX_LAYER) {
                        var id;
                        for (i = 0; i < AkihabaraGamebox._actionqueue.length; i++) {
                            id = AkihabaraGamebox._zindex.first;
                            while (id != null) {
                                if (AkihabaraGamebox._groupplay[AkihabaraGamebox._zindex.data[id].g]) {
                                    AkihabaraGamebox._playobject(AkihabaraGamebox._zindex.data[id].g, AkihabaraGamebox._zindex.data[id].o, AkihabaraGamebox._actionqueue[i]);
                                }
                                id = AkihabaraGamebox._zindex.data[id].__next;
                            }
                        }
                    } else {
                        for (i = 0; i < AkihabaraGamebox._actionqueue.length; i++) {
                            for (var obj in AkihabaraGamebox._objects[AkihabaraGamebox._renderorder[g]]) {
                                AkihabaraGamebox._playobject(AkihabaraGamebox._renderorder[g], obj, AkihabaraGamebox._actionqueue[i]);
                            }
                        }
                    }
                }
            }
            if (AkihabaraGamebox._fskid >= AkihabaraGamebox._frameskip) {
                if (AkihabaraGamebox._localflags.fse) { AkihabaraGamebox._applyfse(); }
                if (AkihabaraGamebox._db) { AkihabaraGamebox.blitImageToScreen(AkihabaraGamebox.getBuffer()); }
                AkihabaraGamebox._fskid = 0;
            } else { AkihabaraGamebox._fskid++; }

            AkihabaraGamebox.purgeGarbage();

            if (AkihabaraGamebox._zindexch.length) {

                for (i = 0; i < AkihabaraGamebox._zindexch.length; i++) {
                    if (AkihabaraGamebox._objects[AkihabaraGamebox._zindexch[i].o.g][AkihabaraGamebox._zindexch[i].o.o]) {
                        if (AkihabaraGamebox._objects[AkihabaraGamebox._zindexch[i].o.g][AkihabaraGamebox._zindexch[i].o.o].__zt == null) {
                            AkihabaraGamebox._objects[AkihabaraGamebox._zindexch[i].o.g][AkihabaraGamebox._zindexch[i].o.o].__zt = AkihabaraGamebox._zindex.addObject(AkihabaraGamebox._zindexch[i].o, AkihabaraGamebox._zindexch[i].z);
                        } else {
                            AkihabaraGamebox._zindex.setPrio(AkihabaraGamebox._objects[AkihabaraGamebox._zindexch[i].o.g][AkihabaraGamebox._zindexch[i].o.o].__zt, AkihabaraGamebox._zindexch[i].z);
                        }
                    }
                }
                AkihabaraGamebox._zindexch = [];
            }


            // Handle holding
            for (var key in AkihabaraInput._keymap) {
                if (AkihabaraInput._keyboard[AkihabaraInput._keymap[key]] === -1) {
                    AkihabaraInput._keyboard[AkihabaraInput._keymap[key]] = 0;
                } else {
                    if (AkihabaraInput._keyboard[AkihabaraInput._keymap[key]] && (AkihabaraInput._keyboard[AkihabaraInput._keymap[key]] < 100)) {
                        AkihabaraInput._keyboard[AkihabaraInput._keymap[key]]++;
                    }
                }
            }
            if (AkihabaraGamebox._forcedidle) {
                this._gametimer = setTimeout(AkihabaraGamebox._nextframe, AkihabaraGamebox._forcedidle); // Wait for the browser
            } else {
                AkihabaraGamebox._nextframe();
            }
        }
    },

    setZindex: function (th, z) {
        if ((th.__zt == null) || (th.zindex !== z)) {
            th.zindex = z;
            this._zindexch.push({o: {g: th.group, o: th.id}, z: z});
        }
    },

    /**
    * Gets the current camera object.
    * @returns {Object} The camera object.
    */
    getCamera: function () { return this._camera; },

    /**
    * Sets the y value of the current camera object.
    * @param {Integer} y The camera object's new y value.
    * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
    * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
    */
    setCameraY: function (y, viewdata) {
        this._camera.y = y;
        if (this._camera.y + this._camera.h > viewdata.h) { this._camera.y = viewdata.h - this._screenh; }
        if (this._camera.y < 0) { this._camera.y = 0; }
    },

    /**
    * Sets the x value of the current camera object.
    * @param {Integer} x The camera object's new x value.
    * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
    * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
    */
    setCameraX: function (x, viewdata) {
        this._camera.x = x;
        if (this._camera.x + this._camera.w > viewdata.w) { this._camera.x = viewdata.w - this._screenw; }
        if (this._camera.x < 0) { this._camera.x = 0; }
    },

    /**
    * Centers the camera.
    * @param {Object} data An object containing x and y parameters -- typically the object you wish to center the camera on.
    * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
    * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
    * @example
    * // Center the camera on the player object
    * AkihabaraGamebox.centerCamera(AkihabaraGamebox.getObject('player', 'player_id'), {w: map.w, h: map.h});
    */
    centerCamera: function (data, viewdata) {
        this.setCameraX(data.x - this._screenhw, viewdata);
        this.setCameraY(data.y - this._screenhh, viewdata);
    },

    /**
    * Get an array containing the names of each group in the game, in order of rendering.
    * @returns {Array} An array of group names.
    * @example
    * grouplist = AkihabaraGamebox.getGroups();
    * grouplist; // => ["background", "player", "enemy", "game"]
    */
    getGroups: function () { return this._groups; },

    /**
    * Defines the names of each group in the game along with their rendering order.
    * @param {Array} g An array of strings of group names, in the order in which the groups should be rendered. So
    * g[0] will contain the first group to render, g[1] the second group to render, etc.
    */
    setGroups: function (g) {
        this._groups = g;
        this._groupplay[AkihabaraGamebox.ZINDEX_LAYER] = true;
        for (var i = 0; i < g.length; i++) {
            if (!this._objects[g[i]]) {
                this._objects[g[i]] = {};
                this._groupplay[g[i]] = true;
                this._renderorder[i] = g[i];
            }
        }
    },

    /**
    * A method of setting the render order of groups independently of AkihabaraGamebox.setGroups. Sets AkihabaraGamebox._renderorder,
    * which by default is equivalent to AkihabaraGamebox._groups. However, AkihabaraGamebox._renderorder is what ultimately determines
    * the rendering order of groups. If you need to change your rendering order on the fly, use this function
    * by passing it a reordered array of group names.
    * @param {Array} g An array of strings of group names, in the order in which the groups should be rendered. So
    * g[0] will contain the first group to render, g[1] the second group to render, etc.
    */
    setRenderOrder: function (g) { this._renderorder = g; },

    /**
    * If a group is disabled, this will enable the group.
    * @param {String} gid The id of the group.
    */
    playGroup: function (gid) { this._groupplay[gid] = true; },

    /**
    * If a group is enabled, this will disable the group.
    * @param {String} gid The id of the group.
    */
    stopGroup: function (gid) { this._groupplay[gid] = false; },

    /**
    * Toggles a group between enabled and disabled status.
    * @param {String} gid The id of the group.
    */
    toggleGroup: function (gid) { this._groupplay[gid] = !this._groupplay[gid]; },

    /**
    * Turns off all groups except for the one specified.
    * @param {String} gid The id of the group.
    */
    soloGroup: function (gid) {
        for (var i = 0; i < this._groups.length; i++) {
            if (this._groups[i] === gid) {
                this.playGroup(this._groups[i]);
            } else {
                this.stopGroup(this._groups[i]);
            }
        }
    },

    /**
    * Enables all groups, toggling any groups that are currently disabled.
    */
    playAllGroups: function () {
        for (var i = 0; i < this._groups.length; i++) {
            this.playGroup(this._groups[i]);
        }
    },

    /**
    * Destroys all objects in a given group.
    * @param {String} gid The id of the group.
    */
    clearGroup: function (group) {
        for (var obj in this._objects[group]) {
            if (this._objects[group][obj].__zt != null) {
                this._zindex.remove(this._objects[group][obj].__zt);
            }
            delete this._objects[group][obj];
        }
    },
    playGroups: function (gid) { for (var i = 0; i < gid.length; i++) { this.playGroup(gid[i]); }},
    stopGroups: function (gid) { for (var i = 0; i < gid.length; i++) { this.stopGroup(gid[i]); }},
    toggleGroups: function (gid) { for (var i = 0; i < gid.length; i++) { this.toggleGroup(gid[i]); }},

    /**
    * Given a group and an id for a particular object instance, this returns the instance requested.
    * <b > NOTE: < /b> this does not return a copy of the object you've requested! Any modifications you make
    * to the object returned are directly modifying the object you requested.
    * @param {String} group The id of the group that contains the object.
    * @param {String} id The id of the instance of the object.
    * @returns {Object} The object requested.
    * @example
    * // Find the player and reduce health by half.
    * playertemp = AkihabaraGamebox.getObject('player','player_id');
    * player.health = player.health/2;
    */
    getObject: function (group, id) {return this._objects[group][id]; },

    /**
    * Creates a <font> < /font > .
    * @param {Object} data An object containing: <ul> <li> id: the id of the font </li>
    * <li> image: reference to the font image loaded (must contain font character tiles in ASCII order) </li>
    * <li> firstletter: the ASCII character that the font image's first character corresponds to </li>
    * <li> tileh: height in pixels of the character tiles </li>
    * <li> tilew: width in pixels of the character tiles </li>
    * <li> tilerow: width in pixels of each row in the font image </li>
    * <li> gapx: x-coord gap between tile columns, in pixels </li>
    * <li> gapy: y-coord gap between tile rows, in pixels </li> </ul>
    * @example
    * AkihabaraGamebox.('font', 'font.png');
    * AkihabaraGamebox.addFont({ id: 'small', image: 'font', firstletter: ' ', tileh: 8, tilew: 8, tilerow: 255, gapx: 0, gapy: 0 });
    */
    addFont: function (data) {
        data.tilehh = Math.floor(data.tileh / 2);
        data.tilehw = Math.floor(data.tilew / 2);
        this._fonts[data.id] = data;
        this._fonts[data.id].firstascii = data.firstletter.charCodeAt(0);
    },

    /**
    * Returns a font object containing data about the font.
    * @param {String} id The id of the font, as set in AkihabaraGamebox.addFont.
    */
    getFont: function (id) {
        return this._fonts[id];
    },

    /**
    * Deletes an object, keeping a record of its group and id in AkihabaraGamebox._garbage.
    * @param {Object} obj The object you wish to delete.
    */
    trashObject: function (obj) {
        if (!this._garbage[obj.group]) {
            this._garbage[obj.group] = {};
        }
        this._garbage[obj.group][obj.id] = 1;
        obj.__trashing = true;
    },

    /**
    * Clears the record held in AkihabaraGamebox._garbage of what has been deleted. The "onpurge" method is called on the object before being deleted (for canvas deallocation etc.)
    */
    purgeGarbage: function () {
        for (var group in this._garbage) {
            for (var id in this._garbage[group]) {
                if (this._objects[group][id].onpurge) { this._objects[group][id].onpurge(); }
                if (this._objects[group][id].__zt != null) { this._zindex.remove(this._objects[group][id].__zt); }
                delete this._objects[group][id];
            }
        }
        AkihabaraGamebox._garbage = {};
    },

    /**
    * Deletes every object in a given group.
    * @param {String} group The group id.
    */
    trashGroup: function (group) {
        if (!this._garbage[group]) { this._garbage[group] = {}; }
        for (var obj in this._objects[group]) {
            this._garbage[group][obj] = 1;
        }
    },

    /**
    * Returns whether an object is due to be trashed. Useful in cases you want to check if
    * an object is marked as trash before it is actually deleted.
    * @param {Object} o The object you're checking.
    * @returns {Boolean} True if the object is marked as trash.
    */
    objectIsTrash: function (o) { return o.__trashing; },

    /**
    * Creates a new game object. Generally speaking you pass a fully-defined object as the parameter (including a group, id, tileset, and so on).
    * A group must be specified, or the program will crash. If no id is specified, then it will automatically provide
    * an id of 'obj-XXXX' where 'XXXX' is an automatically incrementing integer. This is where the <i > initialize < /i > , <i > first < /i > , and <i > blit < /i>
    * functions are defined, as well.
    * @param {Object} data The object you wish to create.
    * @returns {Object} The object you created.
    * @example
    * data = {
    *   group: 'player',
    *   id: 'player_id',
    *   tileset: 'player_tiles',
    *   x: 0,
    *   y: 0,
    *   initialize: function () {
    *     this.x = 10;
    *     this.y = 10;
    *   },
    * };
    * AkihabaraGamebox.addObject(data);
    */
    addObject: function (data) {
        // Extras
        if (!data.id) {
            data.id = "obj-" + this._autoid;
            this._autoid = (this._autoid + 1) % 1000;
        }
        if (data.tileset) {
            if (data.h == null) { data.h = this._tiles[data.tileset].tileh; }
            if (data.w == null) { data.w = this._tiles[data.tileset].tilew; }
            if (data.hw == null) { data.hw = this._tiles[data.tileset].tilehw; }
            if (data.hh == null) { data.hh = this._tiles[data.tileset].tilehh; }
        }
        this._objects[data.group][data.id] = data;
        if (data.zindex != null) {
            this.setZindex(this._objects[data.group][data.id], data.zindex);
        }
        return this._objects[data.group][data.id];
    },

    /**
    * Returns whether a given group contains no objets.
    * @param {String} gid The group you're checking.
    * @returns {Boolean} True if the group contains no objects.
    */
    groupIsEmpty: function (gid) {
        for (var i in this._objects[gid]) {
            return false;
        }
        return true;
    },

    /**
    * Creates a new canvas. By default, the width and height is the current AkihabaraGamebox._screenw and AkihabaraGamebox._screenh,
    * but it can also be set by passing in a data object with the appropriate parameters.
    * @param {String} id The id of the new canvas.
    * @param {Object} data (Optional) The height and width of the new canvas, contained in data.h and data.w parameters.
    * @example
    * AkihabaraGamebox.createCanvas('newCanvas', {w: 640, h: 480});
    */
    createCanvas: function (id, data) {
        this.deleteCanvas(id);
        var w = (data && data.w ? data.w : this._screenw);
        var h = (data && data.h ? data.h : this._screenh);
        this._canvas[id] = document.createElement("canvas");
        this._canvas[id].setAttribute('height', h);
        this._canvas[id].setAttribute('width', w);
        var canvasCtx = this._canvas[id].getContext("2d");
        canvasCtx.save();
        canvasCtx.globalAlpha = 0;
        canvasCtx.fillStyle = AkihabaraGamebox.COLOR_BLACK;
        canvasCtx.fillRect(0, 0, w, h);
        canvasCtx.restore();
    },

    /**
    * Swap two canvas using their ID.
    * @param {String} id The id of the first canvas.
    * @param {String} id The id of the second canvas.
    * @example
    * AkihabaraGamebox.swapCanvas('canvas1','canvas2');
    */
    swapCanvas: function (a, b) {
        var swp = this._canvas[a];
        this._canvas[a] = this._canvas[b];
        this._canvas[b] = swp;
    },

    /**
    * Deletes a given canvas.
    * @param {String} id The id of the canvas to be deleted.
    */
    deleteCanvas: function (id) {
        if (this._canvas[id]) { delete this._canvas[id]; }
    },

    /**
    * Checks to see if an image was successfully loaded.
    * @param {String} id The id of the image.
    * @returns {Boolean} True if the image has been loaded.
    */
    imageIsLoaded: function (id) { return this._images[id] && (this._images[id].getAttribute("wasloaded")) && this._images[id].width; },

    /**
    * Gets information about a loaded image.
    * @param {String} id The id of the image.
    * @returns {Object} A DOM Image element, including the URL and last modified date of the image, its ID, and whether it was loaded successfully.
    * @example
    * image = AkihabaraGamebox.getImage('logo');
    * image; // => <img src = ?"logo.png?_brc=5-7-2010-15-48-42" src_org = ?"logo.png" id = ?"logo" wasloaded = ?"true" > ?
    */
    getImage: function (id) { return this._images[id]; },

    /**
    * Gets the buffer canvas (automatically created by AkihabaraGamebox.initScreen).
    * @returns {Object} A DOM Canvas element, including the width and height of the canvas.
    */
    getBuffer: function () { return (AkihabaraGamebox._fskid >= AkihabaraGamebox._frameskip ? (this._db ? this.getCanvas("_buffer") : this._screen) : null); },

    /**
    * Gets the buffer canvas context.
    * @returns {Object} A DOM Canvas context object.
    */
    getBufferContext: function () { return (AkihabaraGamebox._fskid >= AkihabaraGamebox._frameskip ? (this._db ? this.getCanvasContext("_buffer") : this._screenCtx) : null); },

    /**
    * Gets a given canvas.
    * @param {Object} id The identifier of the canvas.
    * @returns {Object} A DOM Canvas element, including the width and height of the canvas.
    */
    getCanvas: function (id) { return this._canvas[id]; },

    /**
    * Gets the two-dimensional canvas context of a given canvas. The object it returns contains all the drawing functions for the canvas.
    * See <a href="http://dev.w3.org/html5/spec/Overview.html#the-canvas-element">W3C</a> and
    * <a href="https://developer.mozilla.org/en/canvas_tutorial/basic_usage">Mozilla Developer Center</a> for details.
    * @param {Object} id The identifier of the canvas.
    * @returns {Object} A DOM Canvas context object.
    */
    getCanvasContext: function (id) { return this.getCanvas(id).getContext("2d"); },

    /**
    * Adds an image file to the loader, assigning it to an ID. If adding an image to an existing ID, it checks to see if the file you're
    * adding is different than the one currently assigned to the ID. If it's different, it overwrites the old image. If it's the same, then
    * no action is taken.
    * @param {String} id The identifier of the image.
    * @param {String} filename The file name of the image.
    */
    addImage: function (id, filename) {
        if (this._images[id]) {
            if (this._images[id].getAttribute("src_org") === filename) {
                return;
            } else {
                delete this._images[id];
            }
        }
        this._addtoloader({type: "image", id: id, filename: filename});
    },

    /**
    * Deletes an image currently in use. Does not delete the image file, but removes it from Akihabara's image list.
    * @param {String} id The identifier of the image.
    */
    deleteImage: function (id) {
        delete this._images[id];
    },

    /**
    * Creates a new Akihabara tileset, adding it to the engine.
    * @param {Object} t An object containing: <ul> <li> id {String}: the new id of the tileset </li>
    * <li> image {String}: reference to the tileset image loaded </li>
    * <li> tileh {Integer}: height in pixels of the tiles </li>
    * <li> tilew {Integer}: width in pixels of the tiles </li>
    * <li> tilerow {Integer}: width in pixels of each row in the font image </li>
    * <li> gapx {Integer}: x-coord gap between tile columns, in pixels </li>
    * <li> gapy {Integer}: y-coord gap between tile rows, in pixels </li> </ul>
    */
    addTiles: function (t) {
        t.tilehh = Math.floor(t.tileh / 2);
        t.tilehw = Math.floor(t.tilew / 2);
        this._tiles[t.id] = t;
    },

    /**
    * Gets an Akihabara tileset, adding it to the engine.
    * @param {String} t The ID of a tileset.
    * @returns An object containing: <ul> <li> id {String}: the new id of the tileset </li>
    * <li> image {String}: reference to the tileset image loaded </li>
    * <li> tileh {Integer}: height in pixels of the tiles </li>
    * <li> tilew {Integer}: width in pixels of the tiles </li>
    * <li> tilerow {Integer}: width in pixels of each row in the font image </li>
    * <li> gapx {Integer}: x-coord gap between tile columns, in pixels </li>
    * <li> gapy {Integer}: y-coord gap between tile rows, in pixels </li> </ul>
    */
    getTiles: function (t) { return this._tiles[t]; },

    /**
    * Loads the initial splash screen and debugging font, then calls AkihabaraGamebox._waitforloaded which adds to the game all the previously
    * defined resources. Once AkihabaraGamebox._waitforloaded is done, it calls the callback function cb.
    * @params {String} cb The name of the function to be called when all assets are done loading.
    */
    loadAll: function (cb) {
        // Setup logger
        if (this._canlog) { this.log = window.console.log; }
        // Set the callback function, which is called after the resources are loaded.
        if (!this._cb) { this._cb = cb; }
        // Default stuff
        this.addImage("_dbf", this.getDebugFont());
        if (this._splash.background) { this.addImage("_splash", this._splash.background); }
        AkihabaraGamebox.addFont({id: "_dbf", image: "_dbf", firstletter: " ", tileh: 5, tilew: 4, tilerow: 16, gapx: 0, gapy: 0});
        if (!AkihabaraGamebox._splash.minimalTime) { AkihabaraGamebox._minimalexpired = 2; }
        this._waitforloaded();
    },

    _implicitsargs: function (data) {
        if (data.camera) {
            data.dx -= this._camera.x;
            data.dy -= this._camera.y;
        }
        if (data.sourcecamera) {
            data.x = this._camera.x * (data.parallaxx ? data.parallaxx : 1);
            data.y = this._camera.y * (data.parallaxy ? data.parallaxy : 1);
        }
    },

    /**
    * Draws a tile to a canvas context
    * @param {Object} tox The canvas context to be drawn on.
    * @param {Object} data An object containing data about the tile to be drawn, including:
    * <ul> <li> tileset {String}: the id of the tileset </li>
    * <li> tile {Integer}: the index of the tile within the tileset to be drawn </li>
    * <li> dx {Integer}: x coordinate to draw the tile at </li>
    * <li> dy {Integer}: y coordinate to draw the tile at </li>
    * <li> fliph {Integer}: horizontal flip, either 1 or -1 </li>
    * <li> flipv {Integer}: vertical flip, either 1 or -1 </li>
    * <li> alpha {Float}: alpha value (0 is transparent, 1 is opaque) </li> </ul>
    * @example
    * // from capman, draws an current object's tile, called from inside its blit function
    * AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {tileset: this.tileset, tile: this.frame, dx: this.x, dy: this.y, fliph: this.fliph, flipv: this.flipv, camera: this.camera, alpha: 1});
    */
    blitTile: function (tox, data) {
        if (tox == null) { return; }
        var ts = this._tiles[data.tileset];
        var img = this.getImage(ts.image);
        this._implicitsargs(data);
        tox.save();
        tox.globalAlpha = (data.alpha ? data.alpha : 1);
        tox.translate((data.fliph ? ts.tilew : 0), (data.flipv ? ts.tileh : 0));
        tox.scale((data.fliph ? -1 : 1), (data.flipv ? -1 : 1));
        this._safedrawimage(tox, img, ts.gapx + (ts.tilew * (data.tile % ts.tilerow)), ts.gapy + (ts.tileh * Math.floor(data.tile / ts.tilerow)), (data.w == null ? ts.tilew : data.w), (data.h == null ? ts.tileh : data.h), data.dx * (data.fliph ? -1 : 1), data.dy * (data.flipv ? -1 : 1), (data.w ? data.w : ts.tilew), (data.h ? data.h : ts.tileh));
        tox.restore();
    },

    /**
    * Draws an image to a canvas context
    * @param {Object} tox The canvas context to be drawn on.
    * @param {Object} image The image to draw. Must be a DOM Image element, typicallly accessed via AkihabaraGamebox.getImage
    * @param {Object} data An object containing data about the tile to be drawn, including:
    * <ul> <li> dx {Integer}: (required) x coordinate to draw the image at </li>
    * <li> dy {Integer}: (required) y coordinate to draw the image at </li>
    * <li> fliph {Integer}: horizontal flip, either 1 or -1 </li>
    * <li> flipv {Integer}: vertical flip, either 1 or -1 </li>
    * <li> alpha {Float}: alpha value (0 is transparent, 1 is opaque) </li> </ul>
    * @example
    * // draw an image at (100, 100)
    * AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage("image_id"), {dx: 100, dy: 100});
    */
    blitAll: function (tox, image, data) {
        if (tox == null) { return; }
        this._implicitsargs(data);
        tox.save();
        tox.globalAlpha = (data.alpha ? data.alpha : 1);
        tox.translate((data.fliph ? image.width : 0), (data.flipv ? image.height : 0));
        tox.scale((data.fliph ? -1 : 1), (data.flipv ? -1 : 1));
        this._safedrawimage(tox, image, 0, 0, image.width, image.height, data.dx * (data.fliph ? -1 : 1), data.dy * (data.flipv ? -1 : 1), image.width, image.height);
        tox.restore();
    },

    blit: function (tox, image, data) {
        if (tox == null) { return; }
        this._implicitsargs(data);
        tox.save();
        tox.globalAlpha = (data.alpha ? data.alpha : 1);
        tox.translate((data.fliph ? data.dw : 0), (data.flipv ? data.dh : 0));
        tox.scale((data.fliph ? -1 : 1), (data.flipv ? -1 : 1));
        this._safedrawimage(tox, image, (data.x ? data.x : 0), (data.y ? data.y : 0), (data.w ? data.w : data.dw), (data.h ? data.h : data.dh), data.dx * (data.fliph ? -1 : 1), data.dy * (data.flipv ? -1 : 1), data.dw, data.dh);
        tox.restore();
    },


    /**
    * Draws a tilemap to a canvas context
    * @param {Object} tox The canvas context to be drawn on.
    * @param {Object} data An object containing a set of tilemap data, including:
    * <ul> <li> tileset {String}: (required) the id of the tileset the tilemap is based on </li>
    * <li> map {Array}: an array whose x and y coord represent the tilemap coordinates, containing integers that correspond to the index of a given tile (or null for no tile) </li> </ul>
    */
    blitTilemap: function (tox, data) {
        if (tox == null) { return; }
        var ts = this._tiles[data.tileset];
        for (var y = 0; y < data.map.length; y++) {
            for (var x = 0; x < data.map[y].length; x++) {
                if (data.map[y][x] != null) {
                    this.blitTile(tox, {tileset: data.tileset, tile: data.map[y][x], dx: x * ts.tilew, dy: y * ts.tilew});
                }
            }
        }
    },

    /**
    * Draws text to a canvas context
    * @param {Object} tox The canvas context to be drawn on.
    * @param {Object} data An object containing a set of data, including:
    * <ul> <li> font {String}: (required) the id of font to draw the text with </li>
    * <li> text {String}: (required) the text to display </li>
    * <li> dx {Integer}: (required) the x coordinate to draw the text at </li>
    * <li> dy {Integer}: (required) the y coordinate to draw the text at </li>
    * <li> dw {Integer}: the width of the text area -- required if you define data.halign </li>
    * <li> dh {Integer}: the height of the text area -- required if you define data.valign </li>
    * <li> valign {Integer}: either AkihabaraGamebox.ALIGN_BOTTOM (aligns from the bottom of the text area) or AkihabaraGamebox.ALIGN_MIDDLE (vertically centers text in text area) </li>
    * <li> halign {Integer}: either AkihabaraGamebox.ALIGN_RIGHT (aligns to the right hand side of text area) or AkihabaraGamebox.ALIGN_CENTER (horizontallly centers text in text area) </li>
    * <li> alpha {Float}: alpha value (0 is transparent, 1 is opaque) </li> </ul>
    */
    blitText: function (tox, data) {
        if (tox == null) { return; }
        data.text += ""; // Convert to string.
        var fn = this._fonts[data.font];
        var tile = 0;
        this._implicitsargs(data);
        var dx = data.dx;
        var dy = data.dy;
        if (data.valign === AkihabaraGamebox.ALIGN_BOTTOM) {
            dy = dy + data.dh - fn.tileh;
        } else {
            if (data.valign === AkihabaraGamebox.ALIGN_MIDDLE) { dy = dy + Math.floor(data.dh / 2) - fn.tileh; }
        }
        if (data.halign === AkihabaraGamebox.ALIGN_RIGHT) {
            dx = dx + data.dw - (data.text.length * fn.tilew);
        } else {
            if (data.halign === AkihabaraGamebox.ALIGN_CENTER) { dx = dx + Math.floor((data.dw - (data.text.length * fn.tilew)) / 2); }
        }
        tox.save();
        tox.globalAlpha = (data.alpha ? data.alpha : 1);
        for (var y = 0; y < data.text.length; y++) {
            tile = data.text.charCodeAt(y) - fn.firstascii;
            if (tile >= 0) {
                if (data.clear) { tox.clearRect(dx + (y * fn.tilew), dy, (data.w ? data.w : fn.tilew), (data.h ? data.h : fn.tileh)); }
                this._safedrawimage(
                    tox,
                    this.getImage(fn.image),
                    fn.gapx + (fn.tilew * (tile % fn.tilerow)),
                    fn.gapy + (fn.tileh * Math.floor(tile / fn.tilerow)),
                    fn.tilew,
                    fn.tileh,
                    dx + (y * fn.tilew),
                    dy,
                    (data.w ? data.w : fn.tilew),
                    (data.h ? data.h : fn.tileh)
                );
            }
        }
        tox.restore();
    },

    /**
    * Clears a rectangular area of a canvas context.
    * @param {Object} image The canvas context to be drawn on.
    * @param {Object} data An object containing a set of data, including:
    * <ul> <li> x {Integer}: (required) the x coordinate of the top-left corner of the rectangle </li>
    * <li> y {Integer}: (required) the y coordinate of the top-left corner of the rectangle </li>
    * <li> w {Integer}: the width of the box; defaults to canvas width </li>
    * <li> h {Integer}: the height the box; defaults to canvas height </li> </ul>
    */
    blitClear: function (image, data) {
        if (image == null) { return; }
        if (data == null) { data = {x: 0, y: 0}; }
        this._implicitsargs(data);
        image.clearRect(data.x, data.y, (data.w == null ? image.canvas.width : data.w), (data.h == null ? image.canvas.height : data.h));
    },

    /**
    * Draws an image directly to the screen's current canvas context. Used internally in AkihabaraGamebox.go(). Probably shouldn't be used otherwise.
    */
    blitImageToScreen: function (image) {
        this._screenCtx.drawImage(image, 0, 0);
    },

    /**
    * Draws a filled rectangle over an entire canvas context.
    * @param {Object} tox The canvas context to be filled.
    * @param {Object} data An object containing a set of data, including:
    * <ul> <li> alpha {Float}: the alpha value of the rectangle; defaults to 1 </li>
    * <li> color {Object}: the color of the box, formatted rgb(rValue, gValue, bValue); default black </li> </ul>
    */
    blitFade: function (tox, data) {
        if (tox) { this.blitRect(tox, {x: 0, y: 0, w: tox.canvas.width, h: tox.canvas.height, alpha: data.alpha, color: data.color}); }
    },

    /**
    * Draws a filled rectangle to a canvas context.
    * @param {Object} tox The canvas context to be drawn on.
    * @param {Object} data An object containing a set of data, including:
    * <ul> <li> x {Integer}: (required) the x coordinate of the top-left corner of the rectangle </li>
    * <li> y {Integer}: (required) the y coordinate of the top-left corner of the rectangle </li>
    * <li> w {Integer}: (required) the width of the box </li>
    * <li> h {Integer}: (required) the height the box </li>
    * <li> alpha {Float}: the alpha value of the rectangle; defaults to 1 </li>
    * <li> color {Object}: the color of the box, formatted rgb(rValue, gValue, bValue); default black </li> </ul>
    */
    blitRect: function (tox, data) {
        if (tox == null) { return; }
        tox.save();
        tox.globalAlpha = (data.alpha ? data.alpha : 1);
        tox.fillStyle = (data.color ? data.color: AkihabaraGamebox.COLOR_BLACK);
        tox.fillRect(data.x, data.y, data.w, data.h);
        tox.restore();
    },

    /**
    * Calculates a box collision between two collision boxes within a given tolerance. A higher tolerance means less precise collision.
    * @param {Object} o1 A collision box you're testing for collision. Must contain:
    * <ul> <li> x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> w {Integer}: (required) the width of the box </li>
    * <li> h {Integer}: (required) the height the box </li> </ul>
    * @param {Object} o2 A collision box you're testing for collision. Must contain:
    * <ul> <li> x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> w {Integer}: (required) the width of the box </li>
    * <li> h {Integer}: (required) the height the box </li> </ul>
    * @param {Integer} t The tolerance for the collision, in pixels. A value of 0 means pixel-perfect box collision. A value of 2 would mean that the
    * boxes could overlap by up to 2 pixels without being considered a collision.
    * @returns True if the two collision boxes are colliding within the given tolerance.
    */
    collides: function (o1, o2, t) {
        if (!t) { t = 0; }
        return !((o1.y + o1.h - 1 - t < o2.y + t) || (o1.y + t > o2.y + o2.h - 1 - t) || (o1.x + o1.w - 1 - t < o2.x + t) || (o1.x + t > o2.x + o2.w - 1 - t));
    },

    /**
    * Calculates a point-box collision between a point and a collision box within a given tolerance. A higher tolerance means less precise collision.
    * @param {Object} o1 A point you're testing for collision. Must contain:
    * <ul> <li> x {Integer}: (required) the x coordinate of the point </li>
    * <li> y {Integer}: (required) the y coordinate of the point </li> </ul>
    * @param {Object} o2 A collision box you're testing for collision. Must contain:
    * <ul> <li> x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> w {Integer}: (required) the width of the box </li>
    * <li> h {Integer}: (required) the height the box </li> </ul>
    * @param {Integer} t The tolerance for the collision, in pixels. A value of 0 means pixel-perfect collision. A value of 2 would mean that the
    * point could exist within the outermost 2 pixels of the box without being considered a collision.
    * @returns True if the point is colliding with the box within the given tolerance.
    */
    pixelcollides: function (o1, o2, t) {
        if (!t) { t = 0; }
        return !((o1.y < o2.y + t) || (o1.y > o2.y + o2.h - 1 - t) || (o1.x < o2.x + t) || (o1.x > o2.x + o2.w - 1 - t));
    },

    /**
    * Determines whether an object is visible by seeing if it collides with the camera's viewport.
    * @param {Object} obj The object you're testing to see if it's visible. Must contain:
    * <ul> <li> x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin </li>
    * <li> w {Integer}: (required) the width of the object's collision box </li>
    * <li> h {Integer}: (required) the height the object's box </li> </ul>
    * @returns True if the object's collision box is within the camera's viewport.
    */
    objectIsVisible: function (obj) { return this.collides(obj, this._camera, 0); },

    _minimaltimeexpired: function () { AkihabaraGamebox._minimalexpired = 2; },
    _splashscreeniscompleted: function () { return (AkihabaraGamebox._splash.background ? AkihabaraGamebox.imageIsLoaded("_splash") : true) && (AkihabaraGamebox._splash.minilogo ? AkihabaraGamebox.imageIsLoaded("logo") : true) && (AkihabaraGamebox._splash.footnotes ? AkihabaraGamebox.imageIsLoaded("_dbf") : true); },

    setBasePath: function (a) { this._basepath = a; },
    setSplashSettings: function (a) { for (var n in a) { this._splash[n] = a[n]; } },
    setOfflineCache: function (a) { this._flags.offlinecache = a; },
    setDebugFont: function (a) { this._debugfont = a; },

    // ---
    // ---
    // ---  DYNAMIC SCRIPT INCLUSION
    // ---
    // ---

    addScript: function (call) {
        AkihabaraGamebox._addtoloader({type: "script", call: call});
    },

    // ---
    // ---
    // ---  BUNDLES
    // ---
    // ---

    addBundle: function (call) {
        AkihabaraGamebox._addtoloader({type: "bundle", call: call});
    },

    readBundleData: function (pack, call) {
        var i = 0;

        // Local resources first
        if (pack.setObject) {
            for (i = 0; i < pack.setObject.length; i++) {
                eval("(" + pack.setObject[i].object + ")")[pack.setObject[i].property] = pack.setObject[i].value;
            }
        }
        if (pack.addFont) {
            for (i = 0; i < pack.addFont.length; i++) { AkihabaraGamebox.addFont(pack.addFont[i]); }
        }
        if (pack.addTiles) {
            for (i = 0; i < pack.addTiles.length; i++) { AkihabaraGamebox.addTiles(pack.addTiles[i]); }
        }
        // Remote resources for last
        if (pack.addImage) {
            for (i = 0; i < pack.addImage.length; i++) { AkihabaraGamebox.addImage(pack.addImage[i][0], pack.addImage[i][1]); }
        }
        if (pack.addBundle) {
            for (i = 0; i < pack.addBundle.length; i++) { AkihabaraGamebox.addBundle(pack.addBundle[i]); }
        }
        if (pack.addScript) {
            for (i = 0; i < pack.addScript.length; i++) { AkihabaraGamebox.addScript(pack.addScript[i]); }
        }
        // Trigger the onLoad events in resource and loader
        if (pack.onLoad) {
            AkihabaraGamebox._addtoloader({type: "exec-onl", func: pack.onLoad, call: call, pack: pack});
        }
        if (call.onLoad) {
            AkihabaraGamebox._addtoloader({type: "exec-onl", func: call.onLoad, call: call, pack: pack});
        }
    },

    // ---
    // ---
    // ---  DATA LOADER
    // ---
    // ---

    _xmlhttp: null,
    _loaderqueue: AkihabaraCyclelist.create(200),
    _loadercache: AkihabaraCachelist.create(30),

    // Callback for loaded image
    _loaderimageloaded: function () {
        this.setAttribute('wasloaded', true);
        this.hheight = Math.floor(this.height / 2);
        this.hwidth = Math.floor(this.width / 2);
        AkihabaraGamebox._loaderloaded();
    },
    // Callback for loaded bundle
    _loaderhmlhttploading: function () {
        var rs = (typeof this.readyState !== "undefined" ? this.readyState : AkihabaraGamebox._xmlhttp.readyState);
        var st = (typeof this.status !== "undefined" ? this.status : AkihabaraGamebox._xmlhttp.status);
        var rt = (typeof this.responseText !== "undefined" ? this.responseText : AkihabaraGamebox._xmlhttp.responseText);
        if (rs === 4 && (!st || st === 200)) {
            if (rt) {
                if (!AkihabaraGamebox._loaderqueue.getCurrent().call.skipCacheSave) {
                    AkihabaraGamebox._loadercache.add(AkihabaraGamebox._loaderqueue.getCurrent().call.file, rt);
                }
                var pack = eval("(" + rt + ")");
                AkihabaraGamebox.readBundleData(pack, AkihabaraGamebox._loaderqueue.getCurrent().call);
                // Keep loading the other resources.
                AkihabaraGamebox._loaderloaded();
            }
        }
    },

    // Loader code
    _addtoloader: function (d) { // type: xx, data: yy
        AkihabaraGamebox._loaderqueue.push(d);
        if (!AkihabaraGamebox._loaderqueue.isProcessing()) { AkihabaraGamebox._loadnext(); }
    },
    _loaderloaded: function () {
        setTimeout(AkihabaraGamebox._loadnext, 10);
    },
    _loaderscript: function () {
        if (AkihabaraGamebox._loaderqueue.getCurrent().call.onLoad) {
            AkihabaraGamebox._addtoloader({type: "exec-onl", func: AkihabaraGamebox._loaderqueue.getCurrent().call.onLoad, call: AkihabaraGamebox._loaderqueue.getCurrent().call});
        }
        AkihabaraGamebox._loadnext();
    },
    _loadnext: function () {
        var current = AkihabaraGamebox._loaderqueue.pop();
        if (AkihabaraGamebox._loaderqueue.isProcessing()) {
            switch (AkihabaraGamebox._loaderqueue.getCurrent().type) {
            case "image":
                AkihabaraGamebox._images[current.id] = new Image();
                AkihabaraGamebox.addEventListener(AkihabaraGamebox._images[current.id], 'load', AkihabaraGamebox._loaderimageloaded);
                AkihabaraGamebox._images[current.id].src = AkihabaraGamebox._breakcacheurl(current.filename);
                AkihabaraGamebox._images[current.id].setAttribute('src_org', current.filename);
                AkihabaraGamebox._images[current.id].setAttribute('id', current.id);
                AkihabaraGamebox._images[current.id].setAttribute('wasloaded', false);
                break;
            case "bundle":
                var done = false;
                if (!current.call.skipCacheLoad) {
                    var data = AkihabaraGamebox._loadercache.read(current.call.file);
                    if (data) {
                        var pack = eval("(" + data + ")");
                        AkihabaraGamebox.readBundleData(pack, current.call);
                        // Keep loading the other resources.
                        AkihabaraGamebox._loaderloaded();
                        done = true;
                    }
                }
                if (!done) {
                    AkihabaraGamebox._xmlhttp = AkihabaraGamebox.createXmlHttpRequest();
                    AkihabaraGamebox._xmlhttp.open((current.call.data ? "POST" : "GET"), AkihabaraGamebox._breakcacheurl(current.call.file), true);
                    AkihabaraGamebox._xmlhttp.onreadystatechange = AkihabaraGamebox._loaderhmlhttploading;
                    if (current.call.data) {
                        AkihabaraGamebox._xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        AkihabaraGamebox._xmlhttp.send(current.call.data);
                    } else { AkihabaraGamebox._xmlhttp.send(); }
                }
                break;
            case "exec-onl":
                current.func(current.call, current.pack);
                AkihabaraGamebox._loaderloaded();
                break;
            case "script":
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.onload = AkihabaraGamebox._loaderscript;
                script.src = current.call.file;
                document.getElementsByTagName('body')[0].appendChild(script);
                break;
            }
        }
    },
    _waitforloaded: function () {
        var aul;
        var dw = 0, dh = 0;
        if (AkihabaraGamebox._loaderqueue.isBusy() || (AkihabaraGamebox._minimalexpired !== 2)) {
            AkihabaraGamebox._screenCtx.save();
            //AkihabaraGamebox.blitFade(AkihabaraGamebox._screenCtx, {alpha: 1});
            if (!AkihabaraGamebox._minimalexpired && AkihabaraGamebox._splashscreeniscompleted()) {
                AkihabaraGamebox._minimalexpired = 1;
                setTimeout(AkihabaraGamebox._minimaltimeexpired, AkihabaraGamebox._splash.minimalTime);
            }
            if (AkihabaraGamebox._splash.loading) { AkihabaraGamebox._splash.loading(AkihabaraGamebox._screenCtx, AkihabaraGamebox._loaderqueue.getDone(), AkihabaraGamebox._loaderqueue.getTotal()); }
            if (AkihabaraGamebox._flags.loadscreen === "c64") {
                var p = 0, l = 0;
                while (p !== AkihabaraGamebox.getScreenH()) {
                    l = 10 + Math.floor(Math.random() * AkihabaraGamebox.getScreenH() / 4);
                    if (p + l > AkihabaraGamebox.getScreenH()) { l = AkihabaraGamebox.getScreenH() - p; }
                    //AkihabaraGamebox._screenCtx.fillStyle = AkihabaraGamebox.PALETTES.c64.colors[AkihabaraGamebox.PALETTES.c64.order[Math.floor(Math.random() * AkihabaraGamebox.PALETTES.c64.order.length)]];
                    //AkihabaraGamebox._screenCtx.fillRect(0, p, AkihabaraGamebox.getScreenW(), l);
                    p += l;
                }
                AkihabaraGamebox._screenCtx.fillStyle = AkihabaraGamebox.PALETTES.c64.colors.lightblue;
                AkihabaraGamebox._screenCtx.fillRect(Math.floor(AkihabaraGamebox.getScreenW() / 10), Math.floor(AkihabaraGamebox.getScreenH() / 10), AkihabaraGamebox.getScreenW() - Math.floor(AkihabaraGamebox.getScreenW() / 5), AkihabaraGamebox.getScreenH() - Math.floor(AkihabaraGamebox.getScreenH() / 5));
                if (AkihabaraGamebox._splash.minilogo && AkihabaraGamebox.imageIsLoaded("logo")) {
                    dw = AkihabaraGamebox.getScreenW() / 4;
                    dh = (AkihabaraGamebox.getImage("logo").height * dw) / AkihabaraGamebox.getImage("logo").width;
                    //AkihabaraGamebox.blit(AkihabaraGamebox._screenCtx, AkihabaraGamebox.getImage(AkihabaraGamebox._splash.minilogo), {w: AkihabaraGamebox.getImage("logo").width, h: AkihabaraGamebox.getImage("logo").height, dx: (AkihabaraGamebox.getScreenW() - dw) / 2, dy: (AkihabaraGamebox.getScreenH() - dh) / 2, dw: dw, dh: dh});
                }
            } else {
                //if (AkihabaraGamebox._splash.background && AkihabaraGamebox.imageIsLoaded("_splash")) {
                    //AkihabaraGamebox.blit(AkihabaraGamebox._screenCtx, AkihabaraGamebox.getImage("_splash"), {w: AkihabaraGamebox.getImage("_splash").width, h: AkihabaraGamebox.getImage("_splash").height, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH()});
                //}
                if (AkihabaraGamebox._splash.minilogo && AkihabaraGamebox.imageIsLoaded("logo")) {
                    dw = AkihabaraGamebox.getScreenW() / 4;
                    dh = (AkihabaraGamebox.getImage("logo").height * dw) / AkihabaraGamebox.getImage("logo").width;
                    //AkihabaraGamebox.blit(AkihabaraGamebox._screenCtx, AkihabaraGamebox.getImage(AkihabaraGamebox._splash.minilogo), {w: AkihabaraGamebox.getImage("logo").width, h: AkihabaraGamebox.getImage("logo").height, dx: AkihabaraGamebox.getScreenW() - dw - 5, dy: AkihabaraGamebox.getScreenH() - dh - 5, dw: dw, dh: dh});
                }
                if (AkihabaraGamebox._splash.footnotes && AkihabaraGamebox.imageIsLoaded("_dbf")) {
                    if (!AkihabaraGamebox.getCanvas("_footnotes")) {
                        var fd = AkihabaraGamebox.getFont("_dbf");
                        AkihabaraGamebox.createCanvas("_footnotes", {w: AkihabaraGamebox.getScreenW() - 5, h: (AkihabaraGamebox._splash.footnotes.length) * (fd.tileh + AkihabaraGamebox._splash.footnotesSpacing)});
                        //for (var i = 0; i < AkihabaraGamebox._splash.footnotes.length; i++) {
                            //AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext("_footnotes"), {
                            //    font: "_dbf",
                            //    dx: 0,
                            //    dy: i * (fd.tileh + AkihabaraGamebox._splash.footnotesSpacing),
                            //    text: AkihabaraGamebox._splash.footnotes[i]
                            //});
                        //}
                    }
                    AkihabaraGamebox.blitAll(AkihabaraGamebox._screenCtx, AkihabaraGamebox.getCanvas("_footnotes"), {dx: 5, dy: AkihabaraGamebox.getScreenH() - AkihabaraGamebox.getCanvas("_footnotes").height - 5});
                }
                if (AkihabaraGamebox._loaderqueue.isBusy()) {
                    var bw = Math.floor(((AkihabaraGamebox.getScreenW() - 4) * AkihabaraGamebox._loaderqueue.getDone()) / AkihabaraGamebox._loaderqueue.getTotal());
                    //AkihabaraGamebox._screenCtx.globalAlpha = 1;
                    //AkihabaraGamebox._screenCtx.fillStyle = AkihabaraGamebox._splash.gaugeBorderColor;
                    //AkihabaraGamebox._screenCtx.fillRect(0, Math.floor((AkihabaraGamebox.getScreenH() - AkihabaraGamebox._splash.gaugeHeight) / 2), AkihabaraGamebox.getScreenW(), AkihabaraGamebox._splash.gaugeHeight);
                    //AkihabaraGamebox._screenCtx.fillStyle = AkihabaraGamebox._splash.gaugeBackColor;
                    //AkihabaraGamebox._screenCtx.fillRect(1, Math.floor(((AkihabaraGamebox.getScreenH() - AkihabaraGamebox._splash.gaugeHeight) / 2) + 1), AkihabaraGamebox.getScreenW() - 4, AkihabaraGamebox._splash.gaugeHeight - 2);
                    //AkihabaraGamebox._screenCtx.fillStyle = AkihabaraGamebox._splash.gaugeColor;
                    //AkihabaraGamebox._screenCtx.fillRect(1, Math.floor(((AkihabaraGamebox.getScreenH() - AkihabaraGamebox._splash.gaugeHeight) / 2) + 1), (bw > 0 ? bw : 0), AkihabaraGamebox._splash.gaugeHeight - 2);
                }
            }
            AkihabaraGamebox._screenCtx.restore();
            if (typeof AkihabaraDebug !== "undefined") { AkihabaraDebug.setStatBar("Loading... (" + AkihabaraGamebox._loaderqueue.getDone() + "/" + AkihabaraGamebox._loaderqueue.getTotal() + ")"); }
            setTimeout(AkihabaraGamebox._waitforloaded, 50);
        } else {
            AkihabaraGamebox.deleteImage("_splash");
            if (typeof AkihabaraDebug !== "undefined") { AkihabaraDebug.setStatBar(); }
            AkihabaraGamebox._cb();
        }
    },
    clearCache: function () { this._loadercache.clear(); },

    // ---
    // ---
    // ---  BROWSER QUIRKS
    // ---
    // ---

    checkCanvasSupport: function () {
        return !!document.createElement('canvas').getContext;
    },
    addEventListener: function (to, event, code) {
        if (to.addEventListener) {
            to.addEventListener(event, code, false);
        } else {
            to.attachEvent('on' + event, code);
        }
    },
    removeEventListener: function (to, event, code) {
        if (to.removeEventListener) {
            to.removeEventListener(event, code, false);
        } else {
            to.detachEvent('on' + event, code);
        }
    },
    createXmlHttpRequest: function () {
        var xmlhttp = false;

        /* IE7, Firefox, Safari, Opera...  */
        if (!xmlhttp) { try { xmlhttp = new XMLHttpRequest(); } catch (e) { xmlhttp = false; } }

        return xmlhttp;
    }
};

/**
 * Iphopad module provides a touchpad for touch-based device (for now, Android and iDevices).
 * @namespace AkihabaraIphopad
 */
var AkihabaraIphopad = {

    _buttonsize: 50,
    _buttonsize2: 100,
    _buttonsize3: 150,
    _gapx: 0,
    _gapy: 0,
    _width: 0,
    _height: 0,
    _center: {},
    _cross: {up: false, down: false, left: false, right: false},
    _buttons: {a: false, b: false, c: false},
    _transl: (Math.PI * 0.125),
    _brad: (Math.PI * 0.25),
    _swap: false,
    _positions: [
        {up: false, down: false, left: false, right: true},
        {up: false, down: true, left: false, right: true},
        {up: false, down: true, left: false, right: false},
        {up: false, down: true, left: true, right: false},
        {up: false, down: false, left: true, right: false},
        {up: true, down: false, left: true, right: false},
        {up: true, down: false, left: false, right: false},
        {up: true, down: false, left: false, right: true}
    ],

    _listen: function (e) {
        var i;
        var nc = {up: false, down: false, left: false, right: false};
        var nb = {a: false, b: false, c: false};
        for (i = 0; i < e.touches.length; i++) {
            var rp = {x: e.touches[i].pageX - AkihabaraIphopad._gapx, y: e.touches[i].pageY - AkihabaraIphopad._gapy};
            if (rp.x < AkihabaraIphopad._height) {
                nc = AkihabaraIphopad._positions[Math.floor(AkihabaraTrigo.getAngle(AkihabaraIphopad._center, rp, AkihabaraIphopad._transl) / AkihabaraIphopad._brad)];
            } else {
                if (rp.x > AkihabaraIphopad._width - AkihabaraIphopad._buttonsize) {
                    nb.a = true;
                } else {
                    if (rp.x > AkihabaraIphopad._width - AkihabaraIphopad._buttonsize2) {
                        nb.b = true;
                    } else {
                        if (rp.x > AkihabaraIphopad._width - AkihabaraIphopad._buttonsize3) { nb.c = true; }
                    }
                }
            }
        }

        this._swap = !this._swap;
        for (i in this._cross) {
            // Using true or 1? Using triple equals for now. Need to check.
            if (nc[i] !== AkihabaraIphopad._cross[i]) {
                if (nc[i]) {
                    AkihabaraInput._keydown({fake: true, keyCode: AkihabaraInput._keymap[i]});
                } else {
                    AkihabaraInput._keyup({fake: true, keyCode: AkihabaraInput._keymap[i]});
                }
            }
        }
        for (i in this._buttons) {
            // Using true or 1? Using triple equals for now. Need to check.
            if (nb[i] !== AkihabaraIphopad._buttons[i]) {
                if (nb[i]) {
                    AkihabaraInput._keydown({fake: true, keyCode: AkihabaraInput._keymap[i]});
                } else {
                    AkihabaraInput._keyup({fake: true, keyCode: AkihabaraInput._keymap[i]});
                }
            }
        }

        AkihabaraIphopad._cross = nc;
        AkihabaraIphopad._buttons = nb;
    },

    _fakelisten: function (e) {
        AkihabaraIphopad._listen({
            touches: [
                {
                    pageX: e.clientX,
                    pageY: e.clientY
                }
            ]
        });
    },

    /**
    * Initializes the game controls for use with an I-product or Android device.
    * @param {Object} data passes in information about the screen and its traits such as size.
    */
    initialize: function (data) {
        var oElement = document.createElement("div");
        oElement.style.margin = "auto";
        oElement.style.padding = "0px";
        oElement.style.height = data.h + "px";
        oElement.style.width = "100%";
        oElement.style.backgroundImage = "url(" + data.bg + ")";
        oElement.style.backgroundRepeat = "repeat-x";

        var tpad = document.createElement("div");
        tpad.style.cssFloat = "left";
        tpad.style.padding = "0px";
        tpad.style.margin = "0px";
        tpad.style.height = data.h + "px";
        tpad.style.width = data.h + "px";
        tpad.style.backgroundImage = "url(" + data.dpad + ")";
        tpad.style.backgroundRepeat = "no-repeat";

        var bpad = document.createElement("div");
        bpad.style.cssFloat = "right";
        bpad.style.padding = "0px";
        bpad.style.margin = "0px";
        bpad.style.height = data.h + "px";
        bpad.style.width = AkihabaraIphopad._buttonsize3 + "px";
        bpad.style.backgroundImage = "url(" + data.buttons + ")";
        bpad.style.backgroundRepeat = "no-repeat";

        oElement.appendChild(tpad);
        oElement.appendChild(bpad);
        AkihabaraGamebox._box.appendChild(oElement);

        oElement.ontouchstart = function (evt) { evt.preventDefault(); evt.stopPropagation(); AkihabaraIphopad._listen(evt); };
        oElement.ontouchend = function (evt) { evt.preventDefault(); evt.stopPropagation(); AkihabaraIphopad._listen(evt); };
        oElement.ontouchmove = function (evt) { evt.preventDefault(); evt.stopPropagation(); AkihabaraIphopad._listen(evt); };
        var sizes = AkihabaraGamebox._domgetabsposition(oElement);
        this._gapx = sizes.x;
        this._gapy = sizes.y;
        this._width = sizes.w;
        this._height = sizes.h;
        this._center = {x: Math.floor(this._height / 2), y: Math.floor(this._height / 2)};
    }
};

/**
 * Toys module provides lots of common routines during the game developing:
 * from effects for screen titles to HUD handling to platform/SHMUP/RPG oriented routines,
 * like jumping characters, Z-Indexed objects, bullets, sparks, staff rolls, bonus screens, dialogues etc.
 * @namespace AkihabaraToys
 */
var AkihabaraToys = {
    // State-based toys
    // CONSTANTS
    TOY_BUSY: 0,
    TOY_DONE: 1,
    TOY_IDLE: 2,

    // PRIVATE

    // Generical toys method

    resetToy: function (th, id) { if (th.toys) { delete th.toys[id]; } },
    getToyValue: function (th, id, v, def) { return ((th.toys == null) || (th.toys[id] == null) ? def : th.toys[id][v]); },
    getToyStatus: function (th, id) { return ((th.toys == null) || (th.toys[id] == null) ? AkihabaraToys.TOY_BUSY : th.toys[id].__status); },

    _toydone: function (th, id) {
        if (th.toys[id].__status < AkihabaraToys.TOY_IDLE) { th.toys[id].__status++; }
        return th.toys[id].__status;
    },

    _toybusy: function (th, id) {
        th.toys[id].__status = AkihabaraToys.TOY_BUSY;
        return th.toys[id].__status;
    },

    _toyfrombool: function (th, id, b) { return (b ? AkihabaraToys._toydone(th, id) : AkihabaraToys._toybusy(th, id)); },

    _maketoy: function (th, id) {
        if (!th.toys) { th.toys = {}; }
        if (!th.toys[id]) {
            th.toys[id] = {__status: AkihabaraToys.TOY_BUSY};
            return true;
        } else { return false; }
    },

    /**
    * Timer functionality based methods
    * @namespace AkihabaraTimer
    */
    // Pure timers
    timer: {

        randomly: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].time = AkihabaraHelpers.random(data.base, data.range);
            }
            if (th.toys[id].time) {
                th.toys[id].time--;
                return AkihabaraToys._toybusy(th, id);
            } else {
                th.toys[id].time = AkihabaraHelpers.random(data.base, data.range);
                return AkihabaraToys._toydone(th, id);
            }
        },

        real: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].subtimer = AkihabaraGamebox.getFps();
                th.toys[id].done = false;
                if (data.countdown) {
                    th.toys[id].time = data.countdown;
                } else {
                    th.toys[id].time = 0;
                }
            }
            th.toys[id].subtimer--;
            if (!th.toys[id].subtimer) {
                th.toys[id].subtimer = AkihabaraGamebox.getFps();
                if (data.countdown) {
                    if (th.toys[id].time) {
                        th.toys[id].time--;
                        if (data.audiocritical && (th.toys[id].time <= data.critical)) {
                            AkihabaraMediaBox.hitAudio(data.audiocritical);
                        }
                    } else {
                        th.toys[id].done = true;
                    }
                } else {
                    th.toys[id].time++;
                }
            }
            return AkihabaraToys._toyfrombool(th, id, th.toys[id].done);

        },

        every: function (th, id, frames) {
            if (AkihabaraToys._maketoy(th, id)) { th.toys[id].timer = 0; }
            th.toys[id].timer++;
            if (th.toys[id].timer === frames) {
                th.toys[id].timer = 0;
                return AkihabaraToys._toydone(th, id);
            } else {
                return AkihabaraToys._toybusy(th, id);
            }
        },

        after: function (th, id, frames) {
            if (AkihabaraToys._maketoy(th, id)) { th.toys[id].timer = 0; }
            if (th.toys[id].timer === frames) {
                return AkihabaraToys._toydone(th, id);
            } else {
                th.toys[id].timer++;
                return AkihabaraToys._toybusy(th, id);
            }
        }
    },

    // Logical helpers
    logic: {
        once: function (th, id, cond) {
            if (AkihabaraToys._maketoy(th, id)) { th.toys[id].done = false; }
            if (th.toys[id].done) {
                return false;
            } else {
                if (cond) {
                    th.toys[id].done = true;
                }
            }
            return cond;
        }
    },

    // UI
    ui: {

        menu: function (th, id, opt) {
            if (AkihabaraToys._maketoy(th, id) || opt.resetmenu) {
                var fd = AkihabaraGamebox.getFont(opt.font);
                th.toys[id].selected = (opt.selected ? opt.selected : 0);
                th.toys[id].ok = 0;
                var w = 0, i;
                for (i = 0; i < opt.items.length; i++) {
                    if (opt.items[i].length > w) { w = opt.items[i].length; }
                }
                AkihabaraGamebox.createCanvas("menu-" + id, {w: w * fd.tilew, h: opt.items.length * fd.tileh});
                for (i = 0; i < opt.items.length; i++) {
                    AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext("menu-" + id), {font: opt.font, text: opt.items[i], dx: 0, dy: fd.tileh * i});
                }
                th.toys[id].fh = fd.tileh;
                th.toys[id].fw = fd.tilew;
            }
            if (!th.toys[id].ok) {
                if (AkihabaraInput.keyIsHit(opt.keys.up) && (th.toys[id].selected > 0)) {
                    if (opt.audiooption) { AkihabaraMediaBox.hitAudio(opt.audiooption); }
                    th.toys[id].selected--;
                } else {
                    if (AkihabaraInput.keyIsHit(opt.keys.down) && (th.toys[id].selected < opt.items.length - 1)) {
                        if (opt.audiooption) { AkihabaraMediaBox.hitAudio(opt.audiooption); }
                        th.toys[id].selected++;
                    } else {
                        if (AkihabaraInput.keyIsHit(opt.keys.ok)) {
                            if (opt.audioconfirm) { AkihabaraMediaBox.hitAudio(opt.audioconfirm); }
                            th.toys[id].ok = 1;
                        } else {
                            if (AkihabaraInput.keyIsHit(opt.keys.cancel)) { th.toys[id].ok = -1; }
                        }
                    }
                }
            }
            AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getCanvas("menu-" + id), {dx: opt.x + th.toys[id].fw, dy: opt.y, camera: opt.camera});
            if (th.toys[id].ok % 2 === 0) {
                AkihabaraGamebox.blitText(AkihabaraGamebox.getBufferContext(), {font: opt.font, text: opt.selector, dx: opt.x, dy: opt.y + th.toys[id].selected * th.toys[id].fh, camera: opt.camera});
            }
            if (th.toys[id].ok) {
                if (th.toys[id].ok > 0) {
                    if (th.toys[id].ok < 10) {
                        th.toys[id].ok++;
                        AkihabaraToys._toybusy(th, id);
                    } else {
                        return AkihabaraToys._toydone(th, id); // selected > 0
                    }
                } else {
                    return AkihabaraToys._toydone(th, id); // selected == -1
                }
            } else {
                return AkihabaraToys._toybusy(th, id);
            }
        },

        // Returns a full customizable object for optimized huds
        hud: function (id) {
            AkihabaraGamebox.createCanvas(id);
            return {
                w: {},
                surfaceid: id,

                updateWidget: function (i) {
                    if (!this.w[i].__hidden) {
                        var ts;

                        if (this.w[i].widget === "label") {
                            if (this.w[i].prepad != null) {
                                this.w[i].text = AkihabaraHelpers.prepad(this.w[i].value, this.w[i].prepad, this.w[i].padwith);
                            } else {
                                if (this.w[i].postpad != null) {
                                    this.w[i].text = AkihabaraHelpers.postpad(this.w[i].value, this.w[i].postpad, this.w[i].padwith);
                                } else {
                                    this.w[i].text = this.w[i].value + "";
                                }
                            }
                            AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext(this.surfaceid), this.w[i]);
                        }

                        if (this.w[i].widget === "symbols") {
                            ts = AkihabaraGamebox.getTiles(this.w[i].tileset);
                            AkihabaraGamebox.blitClear(AkihabaraGamebox.getCanvasContext(this.surfaceid), {x: this.w[i].dx, y: this.w[i].dy, w: ((this.w[i].maxshown - 1) * this.w[i].gapx) + ts.tilew, h: ((this.w[i].maxshown - 1) * this.w[i].gapy) + ts.tileh});
                            var cnt = this.w[i].value;
                            for (var x = 0; x < this.w[i].maxshown; x++) {
                                if (cnt > 0) {
                                    AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: this.w[i].tiles[(cnt > this.w[i].tiles.length ? this.w[i].tiles.length - 1:cnt - 1)], dx: this.w[i].dx + (x * this.w[i].gapx), dy: this.w[i].dy + (x * this.w[i].gapy), fliph: this.w[i].fliph, flipv: this.w[i].flipv});
                                } else {
                                    if (this.w[i].emptytile != null) {
                                        AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: this.w[i].emptytile, dx: this.w[i].dx + (x * this.w[i].gapx), dy: this.w[i].dy + (x * this.w[i].gapy), fliph: this.w[i].fliph, flipv: this.w[i].flipv});
                                    }
                                }
                                cnt -= this.w[i].tiles.length;
                            }
                        }

                        if (this.w[i].widget === "stack") {
                            ts = AkihabaraGamebox.getTiles(this.w[i].tileset);
                            var bw = ((this.w[i].maxshown - 1) * this.w[i].gapx) + ts.tilew;
                            AkihabaraGamebox.blitClear(AkihabaraGamebox.getCanvasContext(this.surfaceid), {x: this.w[i].dx - (this.w[i].rightalign ? bw : 0), y: this.w[i].dy, w: bw, h: ((this.w[i].maxshown - 1) * this.w[i].gapy) + ts.tileh});
                            for (var ii = 0; ii < this.w[i].maxshown; ii++) {
                                if (ii < this.w[i].value.length) {
                                    AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: this.w[i].value[ii], dx: (this.w[i].rightalign ? this.w[i].dx - ts.tileh - (this.w[i].gapx * ii) : this.w[i].dx + (ii * this.w[i].gapx)), dy: this.w[i].dy + (ii * this.w[i].gapy), fliph: this.w[i].fliph, flipv: this.w[i].flipv});
                                }
                            }
                        }

                        if (this.w[i].widget === "radio") {
                            ts = AkihabaraGamebox.getTiles(this.w[i].tileset);
                            AkihabaraGamebox.blitClear(AkihabaraGamebox.getCanvasContext(this.surfaceid), {x: this.w[i].dx, y: this.w[i].dy, w: ts.tilew, h: ts.tileh});
                            AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: this.w[i].frames[this.w[i].value], dx: this.w[i].dx, dy: this.w[i].dy, fliph: this.w[i].fliph, flipv: this.w[i].flipv});

                        }

                        if (this.w[i].widget === "blit") {
                            ts = AkihabaraGamebox.getTiles(this.w[i].tileset);
                            AkihabaraGamebox.blitClear(AkihabaraGamebox.getCanvasContext(this.surfaceid), {x: this.w[i].dx, y: this.w[i].dy, w: ts.tilew, h: ts.tileh});
                            AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: this.w[i].value, dx: this.w[i].dx, dy: this.w[i].dy, fliph: this.w[i].fliph, flipv: this.w[i].flipv});
                        }

                        if (this.w[i].widget === "bool") {
                            ts = AkihabaraGamebox.getTiles(this.w[i].tileset);
                            AkihabaraGamebox.blitClear(AkihabaraGamebox.getCanvasContext(this.surfaceid), {x: this.w[i].dx, y: this.w[i].dy, w: ts.tilew, h: ts.tileh});
                            if (this.w[i].value) {
                                AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: this.w[i].frame, dx: this.w[i].dx, dy: this.w[i].dy, fliph: this.w[i].fliph, flipv: this.w[i].flipv});
                            }
                        }

                        if (this.w[i].widget === "gauge") {
                            ts = AkihabaraGamebox.getTiles(this.w[i].tileset);
                            AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: 0, dx: this.w[i].dx, dy: this.w[i].dy});
                            AkihabaraGamebox.blitTile(AkihabaraGamebox.getCanvasContext(this.surfaceid), {tileset: this.w[i].tileset, tile: 1, dx: this.w[i].dx, dy: this.w[i].dy, w: (this.w[i].value * ts.tilew) / this.w[i].maxvalue});
                        }
                    }
                },

                hideWidgets: function (l) {
                    for (var i = 0; i < l.length; i++) { this.w[l[i]].__hidden = true; }
                    this.redraw();
                },

                showWidgets: function (l) {
                    for (var i = 0; i < l.length; i++) { this.w[l[i]].__hidden = false; }
                    this.redraw();
                },

                getValue: function (w, k) {
                    return this.w[w][k];
                },

                getNumberValue: function (w, k) {
                    return this.w[w][k] * 1;
                },

                setValue: function (w, k, v) {
                    if (this.w[w][k] !== v) {
                        if (k === "value") {
                            if ((this.w[w].maxvalue != null) && (v > this.w[w].maxvalue)) { v = this.w[w].maxvalue; }
                            if ((this.w[w].minvalue != null) && (v < this.w[w].minvalue)) { v = this.w[w].minvalue; }
                            if (this.w[w].widget === "radio") { v = (v % this.w[w].frames.length); }
                        }
                        this.w[w][k] = v;
                        this.updateWidget(w);
                    }
                },

                pushValue: function (w, k, v) {
                    this.w[w][k].push(v);
                    this.updateWidget(w);
                },

                addValue: function (w, k, v) {
                    if (v) { this.setValue(w, k, this.w[w][k] + v); }
                },

                setWidget: function (id, w) {
                    this.w[id] = w;
                    this.updateWidget(id);
                },

                redraw: function () {
                    AkihabaraGamebox.blitClear(AkihabaraGamebox.getCanvasContext(this.surfaceid));
                    for (var i in this.w) { this.updateWidget(i); }
                },

                blit: function () {
                    AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getCanvas(this.surfaceid), {dx: 0, dy: 0});
                }
            };
        }
    },

    fullscreen: {

        fadeout: function (th, id, tox, data) {
            if (AkihabaraToys._maketoy(th, id) || data.resetfade) {
                th.toys[id].fade = 0;
                //if (data.audiofade) { th.toys[id].stv = AkihabaraAudio.getAudioVolume(data.audiofade); }
                //if (data.audiochannelfade) { th.toys[id].chv = AkihabaraAudio.getChannelVolume(data.audiochannelfade); }
            }
            th.toys[id].fade += data.fadespeed;
            if (th.toys[id].fade > 1) { th.toys[id].fade = 1; }
            data.alpha = th.toys[id].fade;
            AkihabaraGamebox.blitFade(tox, data);
            //if (data.audiofade) { AkihabaraAudio.setAudioVolume(data.audiofade, th.toys[id].stv * (1 - data.alpha)); }
            //if (data.audiochannelfade) {
            //    if (data.alpha === 1) {
            //        AkihabaraAudio.stopChannel(data.audiochannelfade);
            //    } else {
            //        AkihabaraAudio.setChannelVolume(data.audiochannelfade, th.toys[id].chv * (1 - data.alpha));
            //    }
            //}
            return AkihabaraToys._toyfrombool(th, id, th.toys[id].fade === 1);
        },

        fadein: function (th, id, tox, data) {
            if (AkihabaraToys._maketoy(th, id) || data.resetfade) {
                th.toys[id].fade = 1;
                //if (data.audiofade) { th.toys[id].stv = AkihabaraAudio.getAudioVolume(data.audiofade); }
                //if (data.audiochannelfade) { th.toys[id].chv = AkihabaraAudio.getChannelDefaultVolume(data.audiochannelfade); }
            }
            th.toys[id].fade -= data.fadespeed;
            if (th.toys[id].fade < 0) { th.toys[id].fade = 0; }
            if (th.toys[id].fade) {
                data.alpha = th.toys[id].fade;
                //if (data.audiofade) { AkihabaraAudio.setAudioVolume(data.audiofade, th.toys[id].stv * (1 - data.alpha)); }
                //if (data.audiochannelfade) { AkihabaraAudio.setChannelVolume(data.audiochannelfade, th.toys[id].chv * (1 - data.alpha)); }
                AkihabaraGamebox.blitFade(tox, data);
            }
            return AkihabaraToys._toyfrombool(th, id, th.toys[id].fade === 0);
        }
    },

    text: {

        blink: function (th, id, tox, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].texttimer = 0;
                th.toys[id].visible = false;
                th.toys[id].times = 0;
            }
            if (th.toys[id].texttimer >= data.blinkspeed) {
                th.toys[id].texttimer = 0;
                th.toys[id].visible = !th.toys[id].visible;
                if (data.times) { th.toys[id].times++; }
            } else {
                th.toys[id].texttimer++;
            }
            if (th.toys[id].visible) {
                AkihabaraGamebox.blitText(tox, data);
            }
            return AkihabaraToys._toyfrombool(th, id, (data.times ? data.times < th.toys[id].times : false));
        },

        fixed: function (th, id, tox, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].texttimer = 0;
            } else {
                th.toys[id].texttimer++;
            }
            AkihabaraGamebox.blitText(tox, data);
            return AkihabaraToys._toyfrombool(th, id, data.time < th.toys[id].texttimer);
        }
    },

    logos: {

        linear: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].x = data.sx;
                th.toys[id].y = data.sy;
                th.toys[id].every = data.every;
                th.toys[id].played = false;
            }
            if (!th.toys[id].every) {
                if ((data.x !== th.toys[id].x) || (data.y !== th.toys[id].y)) {
                    if ((Math.abs(data.x - th.toys[id].x) <= data.speed) && (Math.abs(data.y - th.toys[id].y) <= data.speed)) {
                        th.toys[id].x = data.x;
                        th.toys[id].y = data.y;
                    } else {
                        AkihabaraTrigo.translate(th.toys[id], AkihabaraTrigo.getAngle(th.toys[id], data), data.speed);
                    }
                } else {
                    if (!th.toys[id].played) {
                        if (data.audioreach) { AkihabaraMediaBox.hitAudio(data.audioreach); }
                        th.toys[id].played = true;
                    }
                }
                th.toys[id].every = data.every;
            } else {
                th.toys[id].every--;
            }

            if (data.text) {
                AkihabaraGamebox.blitText(AkihabaraGamebox.getBufferContext(), {
                    font: data.font,
                    dx: th.toys[id].x,
                    dy: th.toys[id].y,
                    text: data.text
                });
            } else {
                if (data.tileset) {
                    AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {tileset: data.tileset, tile: data.tile, dx: th.toys[id].x, dy: th.toys[id].y, camera: data.camera, fliph: data.fliph, flipv: data.flipv, alpha: data.alpha});
                } else {
                    AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: th.toys[id].x, dy: th.toys[id].y, alpha: data.alpha});
                }
            }
            return AkihabaraToys._toyfrombool(th, id, (data.x === th.toys[id].x) && (data.y === th.toys[id].y));
        },

        crossed: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].gapx = data.gapx;
                th.toys[id].lw = AkihabaraGamebox.getImage(data.image).height;
                th.toys[id].done = false;
            }
            if (th.toys[id].gapx) {
                th.toys[id].gapx -= data.speed;
                if (th.toys[id].gapx < 0) { th.toys[id].gapx = 0; }
                AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: data.x - th.toys[id].gapx, dy: data.y, alpha: data.alpha});
                AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: data.x + th.toys[id].gapx, dy: data.y, alpha: data.alpha});
                return AkihabaraToys._toybusy(th, id);
            } else {
                if (!th.toys[id].done) {
                    th.toys[id].done = true;
                    if (data.audioreach) { AkihabaraMediaBox.hitAudio(data.audioreach); }
                }
                AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: data.x, dy: data.y});
                return AkihabaraToys._toydone(th, id);
            }
        },

        zoomout: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].zoom = data.zoom;
                th.toys[id].done = false;
                th.toys[id].img = AkihabaraGamebox.getImage(data.image);
            }
            if (th.toys[id].zoom !== 1) {
                th.toys[id].zoom -= data.speed;
                if (th.toys[id].zoom <= 1) {
                    th.toys[id].zoom = 1;
                    if (data.audioreach) { AkihabaraMediaBox.hitAudio(data.audioreach); }
                }
                AkihabaraGamebox.blit(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {h: th.toys[id].img.height, w: th.toys[id].img.width, dx: data.x - Math.floor(th.toys[id].img.width * (th.toys[id].zoom - 1) / 2), dy: data.y - Math.floor(th.toys[id].img.height * (th.toys[id].zoom - 1) / 2), dh: Math.floor(th.toys[id].img.height * th.toys[id].zoom), dw: Math.floor(th.toys[id].img.width * th.toys[id].zoom), alpha: 1 / th.toys[id].zoom});
                return AkihabaraToys._toybusy(th, id);
            } else {
                AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: data.x, dy: data.y});
                return AkihabaraToys._toydone(th, id);
            }
        },

        rising: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].cnt = 0;
                th.toys[id].lh = AkihabaraGamebox.getImage(data.image).height;
                th.toys[id].lw = AkihabaraGamebox.getImage(data.image).width;
                th.toys[id].done = false;
            }
            if (th.toys[id].cnt < th.toys[id].lh) {
                th.toys[id].cnt += data.speed;
                if (th.toys[id].cnt > th.toys[id].lh) { th.toys[id].gapx = th.toys[id].lh; }
                AkihabaraGamebox.blit(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dh: th.toys[id].cnt, dw: th.toys[id].lw, dx: data.x, dy: data.y + th.toys[id].lh - th.toys[id].cnt, alpha: data.alpha});
                if (data.reflex) {
                    AkihabaraGamebox.blit(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dh: th.toys[id].cnt, dw: th.toys[id].lw, dx: data.x, dy: data.y + th.toys[id].lh, alpha: data.reflex, flipv: true});
                }
                if (th.toys[id].cnt >= th.toys[id].lh) {
                    if (data.audioreach) { AkihabaraMediaBox.hitAudio(data.audioreach); }
                }
                return AkihabaraToys._toybusy(th, id);
            } else {
                AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: data.x, dy: data.y});
                if (data.reflex) {
                    AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: data.x, dy: data.y + th.toys[id].lh, alpha: data.reflex, flipv: true});
                }

                return AkihabaraToys._toydone(th, id);
            }
        },

        bounce: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].accy = data.accy;
                th.toys[id].y = data.y;
                th.toys[id].h = AkihabaraGamebox.getImage(data.image).height;
                th.toys[id].done = false;
            }
            if (!th.toys[id].done) {
                if (th.toys[id].y + th.toys[id].h >= data.floory) {
                    if (data.audiobounce) { AkihabaraMediaBox.hitAudio(data.audiobounce); }
                    th.toys[id].y = data.floory - th.toys[id].h;
                    th.toys[id].accy = -Math.ceil(th.toys[id].accy / (data.heavy ? data.heavy : 2));
                    th.toys[id].done = (th.toys[id].accy === 0);
                } else {
                    th.toys[id].accy--;
                }
                th.toys[id].y -= th.toys[id].accy;
            }
            AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(data.image), {dx: data.x, dy: th.toys[id].y});

            return AkihabaraToys._toyfrombool(th, id, th.toys[id].done);
        }
    },

    dialogue: {

        render: function (th, id, data) {
            if (AkihabaraToys._maketoy(th, id)) {
                th.toys[id].newscene = true;
                th.toys[id].sceneid = -1;
                th.toys[id].ended = false;
                th.toys[id].timer = 0;
                th.toys[id].counter = 0;
                th.toys[id].anim = 0;
                AkihabaraGamebox.createCanvas("dialogue-" + id);
            }

            if (!data.hideonend || (data.hideonend && !th.toys[id].ended)) {
                if (th.toys[id].newscene && !th.toys[id].ended) {
                    th.toys[id].anim = 0;
                    th.toys[id].timer = 0;
                    th.toys[id].newscene = false;
                    th.toys[id].sceneid++;
                    th.toys[id].ended = (th.toys[id].sceneid === data.scenes.length);
                    if (!th.toys[id].ended) {
                        th.toys[id].letter = 0;
                        th.toys[id].wait = false;
                        th.toys[id].scene = data.scenes[th.toys[id].sceneid];
                        th.toys[id].fd = AkihabaraGamebox.getFont((th.toys[id].scene.font ? th.toys[id].scene.font : data.font));
                        th.toys[id].sceneH = (th.toys[id].scene.dh ? th.toys[id].scene.dh : AkihabaraGamebox.getScreenH());
                        th.toys[id].sceneW = (th.toys[id].scene.dw ? th.toys[id].scene.dw : AkihabaraGamebox.getScreenW());
                        th.toys[id].sceneX = (th.toys[id].scene.dx ? th.toys[id].scene.dx : 0);
                        th.toys[id].sceneY = (th.toys[id].scene.dy ? th.toys[id].scene.dy : 0);
                        AkihabaraGamebox.blitClear(AkihabaraGamebox.getCanvasContext("dialogue-" + id));
                        if (th.toys[id].scene.slide) {
                            AkihabaraGamebox.blitAll(AkihabaraGamebox.getCanvasContext("dialogue-" + id), AkihabaraGamebox.getImage(th.toys[id].scene.slide.image), {dx: th.toys[id].scene.slide.x, dy: th.toys[id].scene.slide.y});
                        }
                        if (th.toys[id].scene.scroller) {
                            AkihabaraGamebox.createCanvas("scroller-" + id, {w: th.toys[id].sceneW, h: (th.toys[id].scene.scroller.length) * (th.toys[id].fd.tileh + th.toys[id].scene.spacing)});
                            for (var i = 0; i < th.toys[id].scene.scroller.length; i++) {
                                AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext("scroller-" + id), {
                                    font: th.toys[id].fd.id,
                                    dx: 0,
                                    dy: i * (th.toys[id].fd.tileh + th.toys[id].scene.spacing),
                                    dw: th.toys[id].sceneW,
                                    halign: AkihabaraGamebox.ALIGN_CENTER,
                                    text: th.toys[id].scene.scroller[i]
                                });
                            }
                        }
                        if (th.toys[id].scene.bonus) {
                            AkihabaraGamebox.createCanvas("bonus-" + id, {w: th.toys[id].sceneW, h: (th.toys[id].scene.bonus.length) * (th.toys[id].fd.tileh + th.toys[id].scene.spacing)});
                        }
                        if (th.toys[id].scene.audiomusic) { AkihabaraMediaBox.hitAudio(th.toys[id].scene.audiomusic); }
                    }
                }
                if (!th.toys[id].ended) {
                    if (th.toys[id].wait) {
                        if (AkihabaraInput.keyIsHit(data.esckey)) {
                            th.toys[id].ended = true;
                        } else {
                            if (AkihabaraInput.keyIsHit(data.skipkey)) {
                                th.toys[id].newscene = true;
                            }
                        }
                    } else {
                        // SKIP KEYS

                        if (AkihabaraInput.keyIsHit(data.esckey)) {
                            th.toys[id].ended = true;
                        } else {
                            if (AkihabaraInput.keyIsHold(data.skipkey)) {
                                th.toys[id].counter = th.toys[id].scene.speed;
                            } else {
                                th.toys[id].counter++;
                            }
                        }

                        // MOVING

                        if (th.toys[id].scene.talk) { // DIALOGUES
                            if (th.toys[id].counter === th.toys[id].scene.speed) {
                                th.toys[id].letter++;
                                th.toys[id].counter = 0;
                                if (th.toys[id].scene.audio && (th.toys[id].letter % 3 === 0)) { AkihabaraMediaBox.hitAudio(th.toys[id].scene.audio); }
                                var tmp = th.toys[id].letter;
                                var row = 0;
                                while (tmp > th.toys[id].scene.talk[row].length) {
                                    tmp -= th.toys[id].scene.talk[row].length;
                                    row++;
                                    if (row === th.toys[id].scene.talk.length) {
                                        row = -1;
                                        break;
                                    }
                                }
                                if (row >= 0) {
                                    AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext("dialogue-" + id), {
                                        font: data.font,
                                        dx: data.who[th.toys[id].scene.who].x,
                                        dy: (data.who[th.toys[id].scene.who].y) + (row * th.toys[id].fd.tileh),
                                        text: th.toys[id].scene.talk[row].substr(0, tmp)
                                    });
                                } else {
                                    th.toys[id].wait = true;
                                }
                            }
                        } else if (th.toys[id].scene.scroller) { // SCROLLER (i.e. credits)

                            if (th.toys[id].counter === th.toys[id].scene.speed) {
                                th.toys[id].letter++;
                                th.toys[id].counter = 0;
                                if (th.toys[id].letter === (AkihabaraGamebox.getCanvas("scroller-" + id).height + th.toys[id].scene.push)) {
                                    th.toys[id].wait = true;
                                }
                            }

                        } else if (th.toys[id].scene.bonus) { // BONUS (classic bonus award screen)
                            for (var roww = 0; roww <= th.toys[id].letter; roww++) {
                                if (th.toys[id].scene.bonus[roww].text) {
                                    AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext("bonus-" + id), {
                                        font: data.font,
                                        dx: 0,
                                        dy: (roww * (th.toys[id].fd.tileh + th.toys[id].scene.spacing)),
                                        text: th.toys[id].scene.bonus[roww].text
                                    });
                                } else if (th.toys[id].scene.bonus[roww].mul) {
                                    // Mask is %VAL%e%MUL% = %TOT%
                                    th.toys[id].scene.bonus[roww].tmptext = th.toys[id].scene.bonus[roww].mask.replace(/%VAL%/, th.toys[id].timer).replace(/%MUL%/, th.toys[id].scene.bonus[roww].mul).replace(/%TOT%/, (th.toys[id].timer * th.toys[id].scene.bonus[roww].mul));
                                    AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext("bonus-" + id), {
                                        clear: true,
                                        font: data.font,
                                        dx: 0,
                                        dy: (roww * (th.toys[id].fd.tileh + th.toys[id].scene.spacing)),
                                        text: th.toys[id].scene.bonus[roww].tmptext
                                    });
                                }
                            }

                            if (!th.toys[id].wait) {
                                var next = false;
                                if (th.toys[id].scene.bonus[th.toys[id].letter].mul && !th.toys[id].scene.bonus[th.toys[id].letter].text) {
                                    if (th.toys[id].counter >= th.toys[id].scene.bonus[th.toys[id].letter].speed) {
                                        th.toys[id].counter = 0;
                                        th.toys[id].timer++;
                                        if (th.toys[id].timer > th.toys[id].scene.bonus[th.toys[id].letter].mulvalue) {
                                            th.toys[id].scene.bonus[th.toys[id].letter].text = th.toys[id].scene.bonus[th.toys[id].letter].tmptext;
                                            next = true;
                                        } else {
                                            if (th.toys[id].scene.bonus[th.toys[id].letter].callback) {
                                                th.toys[id].scene.bonus[th.toys[id].letter].callback(th.toys[id].scene.bonus[th.toys[id].letter], th.toys[id].scene.bonus[th.toys[id].letter].arg);
                                            }
                                        }
                                    }

                                } else if (th.toys[id].counter >= th.toys[id].scene.speed) { next = true; }

                                if (next) {
                                    if (th.toys[id].letter === th.toys[id].scene.bonus.length - 1) {
                                        th.toys[id].wait = true;
                                    } else {
                                        th.toys[id].letter++;
                                        if (th.toys[id].scene.bonus[th.toys[id].letter].mul) {
                                            th.toys[id].scene.bonus[th.toys[id].letter].text = null;
                                            th.toys[id].scene.bonus[th.toys[id].letter].tmptext = null;
                                            th.toys[id].timer = 0;
                                        }
                                        th.toys[id].counter = 0;
                                    }
                                }
                            }
                        }
                    }
                }

                // RENDERING

                if (th.toys[id].scene.talk) { // DIALOGUES
                    if (data.who[th.toys[id].scene.who].box) {
                        AkihabaraGamebox.blitRect(AkihabaraGamebox.getBufferContext(), data.who[th.toys[id].scene.who].box);
                    }
                    if (data.who[th.toys[id].scene.who].tileset) {
                        th.toys[id].anim = (th.toys[id].anim + 1) % 20;
                        AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {tileset: data.who[th.toys[id].scene.who].tileset, tile: AkihabaraGamebox.decideFrame(th.toys[id].anim, data.who[th.toys[id].scene.who].frames), dx: data.who[th.toys[id].scene.who].portraitx, dy: data.who[th.toys[id].scene.who].portraity, camera: false, fliph: data.who[th.toys[id].scene.who].fliph, flipv: data.who[th.toys[id].scene.who].flipv});
                    }
                    AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getCanvas("dialogue-" + id), {dx: 0, dy: 0});
                } else if (th.toys[id].scene.scroller) { // SCROLLER (i.e. credits)
                    AkihabaraGamebox.blit(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getCanvas("scroller-" + id), {dx: th.toys[id].sceneX, dy: th.toys[id].sceneY + (th.toys[id].letter < th.toys[id].sceneH ? th.toys[id].sceneH - th.toys[id].letter : 0), dw: th.toys[id].sceneW, y: (th.toys[id].letter < th.toys[id].sceneH ? 0:th.toys[id].letter - th.toys[id].sceneH), dh: (th.toys[id].letter < th.toys[id].sceneH ? th.toys[id].letter : th.toys[id].sceneH)});
                } else if (th.toys[id].scene.bonus) { // BONUS (i.e. credits)
                    AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getCanvas("bonus-" + id), {dx: th.toys[id].sceneX, dy: th.toys[id].sceneY});
                }
            }
            return AkihabaraToys._toyfrombool(th, id, th.toys[id].ended);
        }
    },

    // GENERATORS


    generate: {

        sparks: {
            simple: function (th, group, id, data) {
                var ts = AkihabaraGamebox.getTiles(data.tileset);
                if (data.frames == null) {
                    data.frames = { speed: (data.animspeed == null ? 1 : data.animspeed), frames: []};
                    for (var i = 0; i < ts.tilerow; i++) { data.frames.frames[i] = i; }
                }

                var obj = AkihabaraGamebox.addObject(
                    Akihabara.extendsFrom({
                        id: id,
                        group: group,
                        x: th.x + th.hw - ts.tilehw + (data.gapx == null ? 0 : data.gapx),
                        y: (data.valign === "top" ? th.y: th.y + th.hh - ts.tilehh + (data.gapy == null ? 0 : data.gapy)),
                        tileset: data.tileset,
                        alpha: null,
                        accx: 0,
                        accy: 0,
                        frame: 0,
                        timer: (data.delay ? -data.delay : -1),
                        frames: data.frames,
                        toptimer: ((data.frames.frames.length) * data.frames.speed) - 1,
                        camera: th.camera,
                        gravity: false,
                        trashoffscreen: true,
                        fliph: (data.fliph == null ? th.fliph : data.fliph),
                        flipv: (data.flipv == null ? th.flipv : data.flipv),
                        blinkspeed: 0
                    }, data)
                );

                obj[(data.logicon == null ? "first":data.logicon)] = function () {
                    this.timer++;
                    if (this.timer >= 0) {
                        this.x += this.accx;
                        this.y += this.accy;
                        if (this.gravity) { this.accy++; }
                        if ((this.timer === this.toptimer) || (this.trashoffscreen && (!AkihabaraGamebox.objectIsVisible(this)))) {
                            AkihabaraGamebox.trashObject(this);
                        }
                    }
                };

                obj[(data.bliton == null ? "blit":data.bliton)] = function () {
                    if ((this.timer >= 0) && (!this.blinkspeed || (Math.floor(this.timer / this.blinkspeed) % 2))) {
                        AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {tileset: this.tileset, tile: AkihabaraGamebox.decideFrame(this.timer, this.frames), dx: this.x, dy: this.y, camera: this.camera, fliph: this.fliph, flipv: this.flipv, alpha: this.alpha});
                    }
                };

                return obj;
            },

            popupText: function (th, group, id, data) {
                data.text += "";
                var fd = AkihabaraGamebox.getFont(data.font);

                var obj = AkihabaraGamebox.addObject(
                    Akihabara.extendsFrom({
                        id: id,
                        group: group,
                        x: Math.floor(th.x + th.hw - (fd.tilehw * data.text.length)),
                        y: th.y - fd.tilehh,
                        vaccy: -data.jump,
                        font: "small",
                        keep: 0,
                        text: data.text + "",
                        cnt: 0,
                        camera: th.camera
                    }, data)
                );

                obj.initialize = function () {
                    var fd = AkihabaraGamebox.getFont(this.font);
                    AkihabaraGamebox.createCanvas("poptext-" + this.id, {w: this.text.length * fd.tilew, h: fd.tileh});
                    AkihabaraGamebox.blitText(AkihabaraGamebox.getCanvasContext("poptext-" + this.id), {font: this.font, text: this.text, dx: 0, dy: 0});
                };

                obj.onpurge = function () {
                    AkihabaraGamebox.deleteCanvas("poptext-" + this.id);
                };

                obj[(data.logicon == null ? "first":data.logicon)] = function () {
                    if (AkihabaraGamebox.objectIsVisible(this)) {
                        if (this.vaccy) {
                            this.vaccy++;
                        } else {
                            this.cnt++;
                        }
                        this.y += this.vaccy;
                        if (this.cnt >= this.keep) { AkihabaraGamebox.trashObject(this); }
                    } else {
                        AkihabaraGamebox.trashObject(this);
                    }
                };

                obj[(data.bliton == null ? "blit":data.bliton)] = function () {
                    AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getCanvas("poptext-" + this.id), {dx: this.x, dy: this.y, camera: this.camera});
                };

                return obj;
            },

            bounceDie: function (th, group, id, data) {
                var obj = AkihabaraGamebox.addObject(
                    Akihabara.extendsFrom({
                        id: id,
                        group: group,
                        tileset: th.tileset,
                        frame: th.frame,
                        side: th.side,
                        frames: th.frames.die,
                        x: th.x,
                        y: th.y,
                        vaccy: -data.jump,
                        accx: 0,
                        flipv: data.flipv,
                        cnt: 0,
                        blinkspeed: 0,
                        camera: th.camera
                    }, data)
                );

                obj[(data.logicon == null ? "first":data.logicon)] = function () {
                    if (AkihabaraGamebox.objectIsVisible(this)) {
                        this.vaccy++;
                        this.y += this.vaccy;
                        this.x += this.accx;
                        this.cnt++;
                    } else {
                        AkihabaraGamebox.trashObject(this);
                    }
                };

                obj[(data.bliton == null ? "blit":data.bliton)] = function () {
                    if (!this.blinkspeed || (Math.floor(this.cnt / this.blinkspeed) % 2)) {
                        AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {tileset: this.tileset, tile: AkihabaraGamebox.decideFrame(this.cnt, this.frames), dx: this.x, dy: this.y, camera: this.camera, fliph: this.side, flipv: this.flipv});
                    }
                };

                return obj;
            }
        }
    }
};

/**
 * AkihabaraTile module was made to deal with tile functions
 * such as get the current image on a tile map.
 * @namespace AkihabaraTile
 */
var AkihabaraTile = {
    /**
    * Given x, y coordinates and map information, this returns the tile at a given point.
    * @param {Integer} x An x-coordinate.
    * @param {Integer} y A y-coordinate.
    * @param {Object} map The map object.
    * @param {Object} ifout An object or value to be returned if the x, y coordinate pair is outside the map.
    * @param {String} mapid The id for the map array within the map object. Default is 'map'.
    * @returns An integer representing the value of the tile in the map array at that x, y coordinate. If there is no tile, null is returned.
    */
    getTileInMap: function (x, y, map, ifout, mapid) {
        if (!mapid) { mapid = "map"; }
        var ts = AkihabaraGamebox._tiles[map.tileset];
        var tx = Math.floor(x / ts.tilew);
        var ty = Math.floor(y / ts.tileh);
        if ((ty < 0) || (ty >= map[mapid].length)) {
            return ifout;
        } else {
            if ((tx < 0) || (tx >= map[mapid][ty].length)) {
                return ifout;
            } else {
                return map[mapid][ty][tx];
            }
        }
    },

    /**
    * Takes an ascii-art-style array of characters and converts it to an Akihabara-compatible map format.
    * @param {Array} map An array of characters representing a map.
    * @param {Array} tra A translation array. This is an array of arrays, formatted like [ [null, char1], [0, char2], [1, char3] ] or an object, formatted like { "char1":null, "char2":0, "char3":1 }. There must at least be a null entry, followed by one numerical entry for each tile type you want to render, corresponding to the unique characters in the map array. The null entry maps a character to empty space.
    * @returns A map array formatted such that it can be attached to a map object.
    */
    asciiArtToMap: function (map, tra) {
        if (tra instanceof Array) { //backwards compatibility
            var otra = {};
            for (var i in tra) { otra[tra[i][1]] = tra[i][0]; }
            tra = otra;
        }
        var sz, ret = [];
        for (var key in tra) { sz = key.length; break; }
        for (var y = 0; y < map.length; y++) {
            var row = [], mapy = map[y];
            for (var c = 0; c < mapy.length; c += sz) {
                row.push(tra[mapy.substr(c, sz)]);
            }
            ret.push(row);
        }
        return ret;
    },

    /**
    * Calculates and sets the width and height (map.h, map.w) and half-width and half-height (map.hh, map.hw) of a map object.
    * @param {Object} map A map object, containing a map array and a tileset array.
    * @returns A map object with map.w, map.h, map.hh, and map.hw set correctly.
    */
    finalizeTilemap: function (map) {
        var ts = AkihabaraGamebox._tiles[map.tileset];
        map.h = map.map.length * ts.tileh;
        map.w = map.map[0].length * ts.tilew;
        map.hw = Math.floor(map.w / 2);
        map.hh = Math.floor(map.h / 2);
        return map;
    },

    /**
    * Converts an x-coordinate of a pixel to its corresponding tile x-coordinate.
    * @param {Object} map A map object, containing a map array and a tileset array.
    * @param {Integer} x An x-coordinate.
    * @param {Integer} gap (Not used.)
    * @returns A map object with map.w, map.h, map.hh, and map.hw set correctly.
    */
    xPixelToTileX: function (map, x, gap) {
        var ts = AkihabaraGamebox._tiles[map.tileset];
        return Math.floor(x / ts.tilew);
    },

    /**
    * Converts a y-coordinate of a pixel to its corresponding tile y-coordinate.
    * @param {Object} map A map object, containing a map array and a tileset array.
    * @param {Integer} y A y-coordinate.
    * @param {Integer} gap (Not used.)
    * @returns A map object with map.w, map.h, map.hh, and map.hw set correctly.
    */
    yPixelToTileY: function (map, y, gap) {
        var ts = AkihabaraGamebox._tiles[map.tileset];
        return Math.floor(y / ts.tileh);
    },

    /**
    * Converts an x-coordinate of a pixel to the x-coordinate of the tile column it's in. This effectively "snaps" an x coordinate to a tile edge.
    * @param {Object} map A map object, containing a map array and a tileset array.
    * @param {Integer} x An x-coordinate.
    * @param {Integer} gap Number of pixels gap in tilemap. Default is 0.
    * @returns The x-coordinate in pixels of the tile column.
    */
    xPixelToTile: function (map, x, gap) {
        var ts = AkihabaraGamebox._tiles[map.tileset];
        return (Math.floor(x / ts.tilew) + (gap ? gap : 0)) * ts.tilew;
    },

    /**
    * Converts a y-coordinate of a pixel to the y-coordinate of the tile row it's in. This effectively "snaps" a y coordinate to a tile edge.
    * @param {Object} map A map object, containing a map array and a tileset array.
    * @param {Integer} y A y-coordinate.
    * @param {Integer} gap Number of pixels gap in tilemap. Default is 0.
    * @returns The y-coordinate in pixels of the tile row.
    */
    yPixelToTile: function (map, y, gap) {
        var ts = AkihabaraGamebox._tiles[map.tileset];
        return (Math.floor(y / ts.tileh) + (gap ? gap : 0)) * ts.tileh;
    },

    /**
    * Sets a tile in the map and draws it. Does not return anything.
    * @param {Object} ctx The canvas context for the map. Accessed via AkihabaraGamebox.getCanvasContext("canvasname")
    * @param {Object} map The game map object.
    * @param {Integer} x The index of the tile column within the map array -- so a 1 would mean the second column of tiles.
    * @param {Integer} y The index of the tile row within the map array -- so a 1 would mean the second row of tiles.
    * @param {Integer} tile The integer representing the new tile you wish to draw. This is its index within the tileset; a null value will erase whatever tile is present.
    * @param {String} The ID of the map. Defaults to 'map'.
    * @example
    * // Remove the second tile to the right and down from the upper left corner of the tile map. Assumes our map canvas is called 'map_canvas'.
    * AkihabaraTile.setTileInMap(AkihabaraGamebox.getCanvasContext("map_canvas"), map, 1, 1, null, "map");
    */
    setTileInMap: function (ctx, tilemap, x, y, tile, map) {
        var ts = AkihabaraGamebox.getTiles(tilemap.tileset);
        tilemap[(map == null ? "map" : map)][y][x] = tile;
        if (tile == null) {
            AkihabaraGamebox.blitClear(ctx, {x: x * ts.tilew, y: y * ts.tilew, h: ts.tileh, w: ts.tilew});
        } else {
            AkihabaraGamebox.blitTile(ctx, {tileset: tilemap.tileset, tile: tile, dx: x * ts.tilew, dy: y * ts.tilew});
        }
    },
    /**
    * Sets a tile in the map and draws it using pixels as coords. Does not return anything.
    * @param {Object} ctx The canvas context for the map. Accessed via AkihabaraGamebox.getCanvasContext("canvasname")
    * @param {Object} map The game map object.
    * @param {Integer} x The index of the pixel column within the map array -- so a 1 would mean the second column of tiles.
    * @param {Integer} y The index of the pixel row within the map array -- so a 1 would mean the second row of tiles.
    * @param {Integer} tile The integer representing the new tile you wish to draw. This is its index within the tileset; a null value will erase whatever tile is present.
    * @param {String} The ID of the map. Defaults to 'map'.
    */
    setTileInMapAtPixel: function (ctx, tilemap, x, y, tile, map) {
        var ts = AkihabaraGamebox.getTiles(tilemap.tileset);
        x = Math.floor(x / ts.tilew);
        y = Math.floor(y / ts.tileh);
        AkihabaraTile.setTileInMap(ctx, tilemap, x, y, tile, map);
    }
};

/**
 * AkihabaraHelpersers module provides some Javascript-specific functions, such
 * randomizing functions, string/array handlers and so on.
 * @namespace AkihabaraHelpersers
 */
var AkihabaraHelpers = {
    /**
    * Searches an object in an array filtering for one of their properties.
    * @param {Array} a The array.
    * @param {String} field The searched field.
    * @param {String} value The searched value.
    * @returns The found object, otherwise null.
    */
    searchObject: function (a, field, value) {
        if (!a) {
            return null;
        } else {
            for (var i = 0; i < a.length; a++) {
                if (a[i][field] === value) { return a[i]; }
            }
        }
        return null;
    },

    /**
    * Generates numbers from st to ed, along with a skip value.
    * @param {Integer} st Starting number.
    * @param {Integer} ed Ending number.
    * @param {Integer} skip Number to increment by.
    * @returns An array containing the set of numbers from st to ed, incrementing by skip.
    */
    seq: function (st, ed, skip) {
        var ret = [];
        for (var i = st; i < ed; i += (skip == null ? 1 : skip)) { ret.push(i); }
        return ret;
    },

    /**
    * Multiplies two numbers together, returning the result, unless the first parameter is less than 2, in which case it returns 1.
    * @param {Float} v First value.
    * @param {Float} mul Second value.
    * @returns An integer, v*mul, unless v < 2 in which case it returns 1.
    */
    multiplier: function (v, mul) { // Handle a multiplier like counter. that means, 0=1 / 1=1 / 2=2*mul etc...
        return (!v || (v < 2) ? 1 : v * (!mul ? 1 : mul));
    },

    /**
    * Prepends a string with repeated instances of another string until it the result is greater than or equal to a desired length.
    * @param {String} str The string you wish to modify.
    * @param {Integer} len The desired length of your resultant string.
    * @param {String} pad The string you wish to prepend to str.
    * @returns A string whose length is no greater than len + pad.length, with pad prepending str repeatedly.
    */
    prepad: function (str, len, pad) {
        str += "";
        while (str.length < len) {
            str = pad + str;
        }
        return str;
    },

    /**
    * Postpends a string with repeated instances of another string until it the result is greater than or equal to a desired length.
    * @param {String} str The string you wish to modify.
    * @param {Integer} len The desired length of your resultant string.
    * @param {String} pad The string you wish to postpend to str.
    * @returns A string whose length is no greater than len + pad.length, with pad postpending str repeatedly.
    */
    postpad: function (str, len, pad) {
        str += "";
        while (str.length < len) {
            str += pad;
        }
        return str;
    },

    /**
    * Generates uniformly distributed random integers between min and min + range, non-inclusive. So AkihabaraHelpersers.random(0, 2) will only return 0 and 1, etc.
    * @param {Integer} min The minimum random value to be returned by the function.
    * @param {Integer} range The number of different values returned by the function.
    * @returns An integer between min (includive) and min + range (noninclusive).
    */
    random: function (min, range) {
        return min + Math.floor(Math.random() * range);
    },

    /**
    * Given an incrementing value each step, this will return a value increasing from 0 until max/2,
    * at which point it will decrement to 0, then go back up to max/2, in an endless cycle.
    * @param {Integer} counter A counter.
    * @param {Integer} max This determines the period of the function -- assuming counter is incrementing by one, a complete back-and-forth will take 'max' steps.
    * @returns An integer.
    */
    upAndDown: function (counter, max) {
        if ((counter % max) > (max / 2)) {
            return max - (counter % max);
        } else {
            return (counter % max);
        }
    },

    /**
    * Limits a number to a certain range. If the number is below the minimum, the minimum is returned. If the number is above the maximum, the maximum is returned.
    * @param {Float} v A value.
    * @param {Float} min The minimum limit.
    * @param {Float} max The maximum limit.
    * @returns A value equal to v if min < v < max. Returns min if v < min, max if v > max.
    */
    limit: function (v, min, max) {
        if (v < min) {
            return min;
        } else {
            if (v > max) {
                return max;
            } else {
                return v;
            }
        }
    },

    /**
    * Subtracts or adds 1 to a value, always converging to zero. For example, passing -3 yields -2, 5 yields 4, etc. Works best with integers.
    * @param {Integer} v A value.
    * @returns A value that is one closer to 0 on the number line than v.
    */
    goToZero: function (v) { return (v ? v - (v / Math.abs(v)) : 0); },

    /**
    * Returns the Nth element in an array. If the array is shorter than N, it returns the last element of the array.
    * @param {Array} a An array.
    * @param {Integer} id An index to the array.
    * @returns If id > a.length, it returns a[a.length-1]. Otherwise returns a[id].
    */
    getArrayCapped: function (a, id) {
        if (id >= a.length) {
            return a[a.length - 1];
        } else {
            return a[id];
        }
    },

    /**
    * Returns the element of a sorted array that have the highest value of one of the properties.
    * @param {Array} a An array.
    * @param {Integer} value The target value.
    * @param {String} field The property used to filter the array.
    * @returns The object with the highest target value, otherwise the first element of the array.
    */
    getArrayIndexed: function (a, value, field) {
        if (a[0][field] == null) { return a[0]; }
        var i = 0;
        while ((value > a[i][field]) && (i !== a.length - 1)) { i++; }
        return a[i];
    }
};

/**
 * Tool module provides simple developing tools. Currently, this file only has a cel-composer:
 * it can compose an image stacking a set of frames for animating objects, applying a
 * number of filters to each frame.
 * @namespace AkihabaraTools
 */
var AkihabaraTools = {

    _images: [],
    _loadedflag: [],
    _data: {},
    _count: 0,
    _countloaded: 0,

    /**
    * This function documents that an image in an animation sequence is loaded and checks if the other images are loaded or not
    * @param {Object} id This is the object which is used as an id for keeping track of things related to this object in this function
    */
    _loaded: function (id) {
        this._loadedflag[id] = true;
        AkihabaraTools._countloaded++;
        document.title = AkihabaraTools._countloaded + "/" + AkihabaraTools._count;
        for (var i = 0; i < this._images.length; i++) {
            if (!this._loadedflag[i]) { document.title += this._images[i].src + ", "; }
        }
    },

    /**
    * This checks that everything being kept track of with _count is loaded and depending on the result calls
    */
    _loadall: function () {
        if (AkihabaraTools._count !== AkihabaraTools._countloaded) {
            setTimeout(AkihabaraTools._loadall, 1000);
        } else {
            AkihabaraTools._allloaded();
        }
    },

    /**
    * This makes the image cells for an animation and adds the load event listeners that the other stuff work to them. Calls loadall at the end.
    * @param {Object} data This is the created animation data being passed in to be used by the function.
    */
    makecels: function (data) {
        this._data = data;
        var loaded = function () { AkihabaraTools._loaded(this.id); };
        var id = 0;
        for (var r = 0; r < data.rows.length; r++) {
            for (var i = 0; i < data.rows[r].length; i++) {
                this._images[id] = new Image();
                AkihabaraGamebox.addEventListener(this._images[id], 'load', loaded);
                this._images[id].setAttribute("id", id);
                this._images[id].src = data.rows[r][i].img;
                this._count++;
                id++;
            }
        }
        this._loadall();
    },

    /**
    * @function
    * Creates and initializes the Canvas element. Is called from makecels. This function requires that this._data have been instantiated prior to function call.
    */
    _allloaded: function () {
        var data = this._data;
        var wid = 0;
        var hei = 0;
        var curwid = 0;
        var id = 0;
        var r, i;

        for (r = 0; r < data.rows.length; r++) {
            hei += this._images[id].height * 1;
            curwid = 0;
            for (i = 0; i < data.rows[r].length; i++) { curwid += this._images[id].width * 1; id++; }
            if (wid < curwid) { wid = curwid; }
        }

        var cels = document.createElement("canvas");
        cels.style.border = "1px solid red";
        cels.setAttribute('height', hei);
        cels.setAttribute('width', wid);
        document.body.appendChild(cels);
        var ctx = cels.getContext("2d");

        var curx = 0;
        var cury = 0;
        id = 0;
        for (r = 0; r < data.rows.length; r++) {
            curx = 0;
            for (i = 0; i < data.rows[r].length; i++) {
                ctx.drawImage(this._images[id], curx, cury);
                if (data.rows[r][i].filter) {
                    if (data.rows[r][i].filter) {
                        var imgd = ctx.getImageData(curx, cury, this._images[id].width, this._images[id].height);
                        var pix = imgd.data;

                        // Loop over each pixel and invert the color.
                        for (var z = 0, n = pix.length; z < n; z += 4) {
                            if (data.rows[r][i].filter.replace) {
                                for (var w = 0; w < data.rows[r][i].filter.replace.length; w++) {
                                    var repl = data.rows[r][i].filter.replace[w].from;
                                    var to = data.rows[r][i].filter.replace[w].to;
                                    if ((pix[z] === repl.r) && (pix[z + 1] === repl.g) && (pix[z + 2] === repl.b) && (pix[z + 3] === repl.a)) {
                                        pix[z] = to.r;
                                        pix[z + 1] = to.g;
                                        pix[z + 2] = to.b;
                                        pix[z + 3] = to.a;
                                    }
                                }
                            }
                            if (data.rows[r][i].filter.color && (pix[z + 3] !== 0)) {
                                pix[z] = data.rows[r][i].filter.color.r;
                                pix[z + 1] = data.rows[r][i].filter.color.g;
                                pix[z + 2] = data.rows[r][i].filter.color.b;
                                pix[z + 3] = data.rows[r][i].filter.color.a;
                            }

                            // i + 3 is alpha (the fourth element)
                        }
                        ctx.putImageData(imgd, curx, cury);
                    }
                }
                curx += this._images[id].width * 1;
                id++;
            }
            cury += this._images[id - 1].height * 1;
        }
    }
};

/**
 * AkihabaraGamecycle contains your basic game loop: intro, menus,
 * crossfading between stages/lifes, gameover and ending.
 * @namespace AkihabaraGamecycle
 */
var AkihabaraGamecycle = {

    /**
    * AkihabaraGamecycle constructor - initializes a new game object
    *
    * @param    id        unique id of object
    * @param    group    name of group to store the object in
    */
    createMaingame: function (id, group) {
        return AkihabaraGamebox.addObject({
            id: id,
            group: group,
            counter: 0,
            difficulty: 0,

            // state transition
            state: 50,
            stateFirstIteration: true,

            hud: {},

            /**
            * This method is called whenever you load a new map. It's meant to be
            * overridden when you create your game.
            */
            changeLevel: function () { },

            /**
            * This method is called every time a player is "reborn". This method is
            * meant to be overridden since you have to do garbage collection.
            */
            newLife: function () { },

            // game disclaimer animation (if needed)
            gameDisclaimerAnimation: function (reset) {
                return true;
            },

            // game intro animation
            gameIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "LETS BEGIN!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 6});
                }
            },

            // level intro animation
            levelIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "GET READY!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 6});
                }
            },

            // Life intro animation
            newlifeIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.fixed(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "GET READY!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), time: 30});
                }
            },

            // gameover animation
            gameoverIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.fixed(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "GAME OVER", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), time: 50});
                }
            },

            // game title animation
            gameTitleIntroAnimation: function (reset) {
                if (!reset) {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    AkihabaraGamebox.blitText(AkihabaraGamebox.getBufferContext(), {font: "small", text: "GAME TITLE", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH() - 100});
                }
            },

            // End level animation
            endlevelIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "WELL DONE!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 10});
                }
            },

            // Game ending
            gameEndingIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 1});
                    return AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "CONGRATULATIONS!", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: 0, dw: AkihabaraGamebox.getScreenW(), dh: AkihabaraGamebox.getScreenH(), blinkspeed: 5, times: 10});
                }
            },

            // PRESS START
            pressStartIntroAnimation: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "default-blinker");
                } else {
                    AkihabaraToys.text.blink(this, "default-blinker", AkihabaraGamebox.getBufferContext(), {font: "small", text: "PRESS A TO START", valign: AkihabaraGamebox.ALIGN_MIDDLE, halign: AkihabaraGamebox.ALIGN_CENTER, dx: 0, dy: Math.floor(AkihabaraGamebox.getScreenH() / 3), dw: AkihabaraGamebox.getScreenW(), dh: Math.floor(AkihabaraGamebox.getScreenH() / 3) * 2, blinkspeed: 10});
                    return AkihabaraInput.keyIsHit("a");
                }
            },

            /**
            * This method is called when the player dies.
            */
            gameIsOver: function () { return true; },

            /**
            * Actions done during the game (i.e. stage is clear or other ending conditions)
            */
            gameEvents: function () { },

            gameMenu: function (reset) {
                if (reset) {
                    AkihabaraToys.resetToy(this, "difficulty");
                } else {
                    AkihabaraGamebox.blitFade(AkihabaraGamebox.getBufferContext(), {alpha: 0.5});
                    if (AkihabaraToys.ui.menu(this, "difficulty", {audiooption: "default-menu-option", audioconfirm: "default-menu-confirm", font: "small", keys: {up: "up", down: "down", ok: "a", cancel: "b"}, selector: " > ", items: ["EASY", "NORMAL", "HARD"], x: 10, y: 10})) {
                        if (AkihabaraToys.getToyValue(this, "difficulty", "ok") === -1) {
                            return -1;
                        } else {
                            this.difficulty = AkihabaraToys.getToyValue(this, "difficulty", "selected");
                            return true;
                        }
                    }
                    return false;
                }
            },

            // CHECK

            gameIsHold: function () { // Use this clause to check collision and kill player: if true the level is changing
                return (this.state === 400) || (this.state === 401);
            },

            isCompleted: function () {
                return (this.state === 800);
            },

            // GAME CYCLE

            getNextLevel: function () {
                return this._nextlevel;
            },

            gotoLevel: function (level) {
                this._nextlevel = level;
                this.setState(400);
            },

            playerDied: function (data) {
                this._loselife = data;
                this.setState(500);
            },

            gameIsCompleted: function () {
                this.setState(800);
            },

            // private methods

            /**
            * Changes the current game state
            *
            * @param st state number
            */
            setState: function (st) {
                this.state = st;
                this.stateFirstIteration = true;
            },

            /*
            * Removes all objects in each group except the game
            * cycle group. Used for garbage collection when resetting the game.
            */
            _resetGroups: function () {
                var g = AkihabaraGamebox.getGroups();
                for (var i = 0; i < g.length; i++) {
                    if (g[i] !== this.group) { AkihabaraGamebox.clearGroup(g[i]); }
                }
                AkihabaraGamebox.soloGroup(this.group);
            },

            stateIsReady: function () { this.stateFirstIteration = false; },

            blit: function () {
                switch (this.state) {
                case 50: // Disclaimer
                    if (this.stateFirstIteration) {
                        this._resetGroups();
                        this.gameDisclaimerAnimation(true);
                        this.stateIsReady();
                    }
                    if (this.gameDisclaimerAnimation(false)) {
                        this.setState(100);
                    }
                    break;
                // main menu
                case 100:
                case 101:
                case 102: // Press Start / Menu
                    if (this.stateFirstIteration && (this.state === 100)) {
                        this._resetGroups();
                        this.gameTitleIntroAnimation(true);
                    }
                    this.gameTitleIntroAnimation(false);
                    switch (this.state) {
                    case 100: // Press to start
                        if (this.stateFirstIteration) {
                            this.pressStartIntroAnimation(true);
                            this.stateIsReady();
                        }
                        if (this.pressStartIntroAnimation(false)) { this.setState(101); }
                        break;
                    case 101: // Game menu
                        if (this.stateFirstIteration) {
                            this.gameMenu(true);
                            this.stateIsReady();
                        }

                        var menu = this.gameMenu(false);
                        if (menu) {
                            if (menu === -1) {
                                this.setState(100);
                            } else {
                                this.setState(102);
                            }
                        }
                        break;
                    case 102: // Fader
                        if (this.stateFirstIteration) {
                            this._resetGroups();
                            AkihabaraToys.resetToy(this, "fadeout");
                            this.stateIsReady();
                        }
                        if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) {
                            this.setState(200);
                        }
                        break;
                    }
                    break;

                case 200:// Game intro animation

                case 300:// Start game
                case 301:// Game is going

                case 400:// Fade out to change level
                case 401:// Level animation (levelIntroAnimation)
                case 402:// Fade in to next level

                case 500:// Wait after dead
                case 501:// Dead fadeout

                case 600:// Next life intro
                case 601:// New life fadein

                case 700:// Gameover animation

                case 800:// Fade out game ending
                case 801:// Game ending

                    // Game playing
                    if (this.stateFirstIteration) {
                        switch (this.state) {
                        case 200: // Game intro
                            AkihabaraToys.resetToy(this, "fadein");
                            this.level = null;
                            this._nextlevel = null;
                            this.hud = AkihabaraToys.ui.hud("maingamehud");
                            this.initializeGame();
                            this.gameIntroAnimation(true);
                            break;
                        case 300:
                            // Game start
                            this.level = this._nextlevel;
                            AkihabaraGamebox.playAllGroups();
                            this.changeLevel(this._nextlevel);
                            break;
                        case 800:
                        case 400:
                            this.endlevelIntroAnimation(true);
                            AkihabaraToys.resetToy(this, "fadeout");
                            break;
                        case 501:
                            AkihabaraToys.resetToy(this, "fadeout");
                            break;
                        case 401:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.levelIntroAnimation(true);
                            break;
                        case 402:
                            AkihabaraToys.resetToy(this, "fadein");
                            this.level = this._nextlevel;
                            AkihabaraGamebox.playAllGroups();
                            this.changeLevel(this._nextlevel);
                            break;
                        case 600:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.newlifeIntroAnimation(true);
                            break;
                        case 500:
                            this._loselife.counter = 0;
                            break;
                        case 601:
                            AkihabaraToys.resetToy(this, "fadein");
                            this.newLife();
                            AkihabaraGamebox.playAllGroups();
                            break;
                        case 700:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.gameoverIntroAnimation(true);
                            break;
                        case 801:
                            AkihabaraGamebox.soloGroup(this.group);
                            this.gameEndingIntroAnimation(true);
                            break;
                        }
                        this.stateIsReady();
                    }

                    switch (this.state) {
                    case 200: // Game intro
                        if (this.gameIntroAnimation(false)) { this.setState(300); }
                        break;
                    case 601: // Fade in with new life
                    case 402: // Fade in after level change
                    case 300: // Fade in at the beginning of the game
                        if (AkihabaraToys.fullscreen.fadein(this, "fadein", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) { this.setState(301); }
                        break;
                    case 301: // Ingame stuff
                        this.gameEvents();
                        break;
                    case 400: // Fade out before changing the level
                        if (this.endlevelIntroAnimation(false)) {
                            if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) { this.setState(401); }
                        }
                        break;
                    case 800: // Fade out before game ending
                        if (this.endlevelIntroAnimation(false)) {
                            if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) { this.setState(801); }
                        }
                        break;
                    case 501: // Fade out after dead
                        if (AkihabaraToys.fullscreen.fadeout(this, "fadeout", AkihabaraGamebox.getBufferContext(), {fadespeed: 0.05, audiochannelfade: "bgmusic"})) {
                            if (this.gameIsOver()) {
                                this.setState(700); // GAME OVER
                            } else {
                                this.setState(600);
                            }
                        }
                        break;
                    case 401: // Level intro animation
                        if (this.levelIntroAnimation(false)) { this.setState(402); }
                        break;
                    case 500: // Wait after dead
                        this._loselife.counter++;
                        if (this._loselife.counter === this._loselife.wait) { this.setState(501); }
                        break;
                    case 600: // New life intro
                        if (this.newlifeIntroAnimation(false)) { this.setState(601); }
                        break;
                    case 700: // gameover
                        if (this.gameoverIntroAnimation(false)) { this.setState(100); } // Restart game
                        break;
                    case 801: // Game ending
                        if (this.gameEndingIntroAnimation(false)) {
                            this._loselife = {ending: true};
                            this.setState(700); // Game over
                        }
                        break;
                    }

                    this.hud.blit();
                    break;
                }
            }
        });
    }
};

/**
 * Configure Akihabara based on the current device browser
 * @namespace AkihabaraDevices
 */
var AkihabaraDevices = {
    /**
    * Apply desktop capabilities to a given object
    * @param {Object} cap The object containing the capabilities
    **/
    applyDefaultDesktopCapabilityOn: function (cap) {
        cap.zoom = 2;
    },

    /**
    * Apply mobile capabilities to a given object
    * @param {Object} cap The object containing the capabilities
    **/
    applyDefaultMobileCapabilityOn: function (cap) {
        cap.touch = true;
        cap.width = 320;
    },

    /**
    * Verify if a given device is mobile.
    * This function was made to be used with configurationFor() and
    * the names are defined using the same styles.
    * @param {String} name The name of the device. The same used on ConfigurationFor()
    * @returns {Boolean} True if the device is mobile and false otherwise
    **/
    isMobile: function (name) {
        return !!{"Android": true, "iPhone": true, "iPad": true, "iPod": true}[name];
    },

    /**
    * Apply the configurations for a given browser
    * @param {Object} agent The browser userAgent
    * @returns {Object} cap The capabilities for the current browser
    **/
    configurationFor: function (agent) {
        var cap = {};
        var filteredagent = agent.match(/Android|Chrome|Firefox|iPhone|iPad|konqueror|Minefield|nintendo wii|Opera|MSIE 9\.0|MSIE 7\.0/i)[0];

        switch (filteredagent) {
        case "Android":
            AkihabaraDevices.android(cap);
            break;
        case "Chrome":
            AkihabaraDevices.chrome(cap);
            break;
        case "iPhone":
            AkihabaraDevices.iphone(cap);
            break;
        case "iPad":
            AkihabaraDevices.ipad(cap);
            break;
        case "iPod":
            AkihabaraDevices.ipod(cap);
            break;
        case "konqueror":
            AkihabaraDevices.konqueror(cap);
            break;
        case "Minefield":
            // Using firefox configurations for Minefield
            AkihabaraDevices.firefox(cap);
            break;
        case "nintendo wii":
            AkihabaraDevices.nintendo_wii(cap);
            break;
        default:
            cap.zoom = 2;
            cap.audioisexperimental = true; // Audio is just experimental on all other devices.
        }

        // This flag says if the audio can be played for the current device
        cap.canaudio = !!(document.createElement('audio').canPlayType);

        if (AkihabaraDevices.isMobile(filteredagent)) {
            AkihabaraDevices.applyDefaultMobileCapabilityOn(cap);
        } else {
            AkihabaraDevices.applyDefaultDesktopCapabilityOn(cap);
        }

        return cap;
    },

    /**
    * Get the capabilities for Konqueror
    * @param {Object} cap Default capabilities to work with
    **/
    konqueror: function (cap) {
        cap.audioteam = 1;
        cap.audioissinglechannel = true; // Single channeled.  Plays only the "bgmusic" channel.
        cap.audiocompatmode = 2; // Sorry. Single channel mode. Audio events are not triggered properly and audio properties are missing so many audio features are not available. :(
        cap.forcedmimeaudio = "audio/ogg"; // Usually OGG audio playback is supported by default in KDE env.
        cap.audioisexperimental = true; // Audio is experimental, since limited.
    },

    /**
    * Get the capabilities for Safari
    * @param {Object} cap Default capabilities to work with
    **/
    safari: function (cap) {
        cap.audioteam = 1; // Testing smaller audioteam
    },

    /**
    * Get the capabilities for Opera
    * @param {Object} cap Default capabilities to work with
    **/
    opera: function (cap) {
        cap.audioteam = 1; // Testing smaller audioteam
        cap.audiocreatemode = 1; // Do not like audio object cloning very much
    },

    /**
    * Get the capabilities for IE9
    * @param {Object} cap Default capabilities to work with
    **/
    ie9: function (cap) {
        cap.audioteam = 2;
        cap.audiocompatmode = 1; // Audio loading mode.
    },

    /**
    * Get the capabilities for IE7
    * @param {Object} cap Default capabilities to work with
    **/
    ie7: function (cap) {
        cap.audioteam = 2;
        cap.audiocompatmode = 1; // Audio loading mode.
        cap.audioisexperimental = true;
    },

    /**
    * Get the capabilities for Firefox
    * @param {Object} cap Default capabilities to work with
    **/
    firefox: function (cap) {
        cap.audioteam = 1; // Testing smaller audioteam
    },

    /**
    * Get the capabilities for Chrome
    * @param {Object} cap Default capabilities to work with
    **/
    chrome: function (cap) {
        cap.audioteam = 3; // Quite low performance on playback responsiveness.
    },

    /**
    * Get the capabilities for Android
    * @param {Object} cap Default capabilities to work with
    **/
    android: function (cap) {
        cap.audiocompatmode = 2; // Audio loading mode.
        cap.audioteam = 1; // Only a member is required in the audioteam.
        cap.audioisexperimental = true; // Audio is experimental, since limited.
        cap.audioissinglechannel = true; // Single channeled.  Plays only the "bgmusic" channel.
    },

    /**
    * Get the capabilities for iPhone
    * @param {Object} cap Default capabilities to work with
    **/
    iphone: function (cap) {
        cap.audiocompatmode = 2; // Audio loading mode.
        cap.audioteam = 1; // Only a member is required in the audioteam.
        cap.audioisexperimental = true; // Audio is experimental, since limited.
        cap.audioissinglechannel = true; // Single channeled.  Plays only the "bgmusic" channel.
    },

    /**
    * Get the capabilities for iPod
    * @param {Object} cap Default capabilities to work with
    **/
    ipod: function (cap) {
        cap.audiocompatmode = 2; // Audio loading mode.
        cap.audioteam = 1; // Only a member is required in the audioteam.
        cap.audioisexperimental = true; // Audio is experimental, since limited.
        cap.audioissinglechannel = true; // Single channeled.  Plays only the "bgmusic" channel.
    },

    /**
    * Get the capabilities for iPad
    * @param {Object} cap Default capabilities to work with
    **/
    ipad: function (cap) {
        cap.audiocompatmode = 2; // Audio loading mode.
        cap.audioteam = 1; // Only a member is required in the audioteam.
        cap.audioisexperimental = true; // Audio is experimental, since limited.
        cap.audioissinglechannel = true; // Single channeled.  Plays only the "bgmusic" channel.
    },

    /**
    * Get the capabilities for Nintendo wii
    * @param {Object} cap Default capabilities to work with
    **/
    nintendo_wii: function (cap) {
        /**
        * Simulated double buffering has been resumed.
        *  Canvas on Opera for Wii has a strange sprite blinking effect
        * usually browsers render frames once ended and this is an exception.
        **/
        cap.iswii = true;
        cap.height = window.innerHeight;
        cap.doublebuffering = true;
    }
};

/**
 * The libraries for a 2D top-down Shmup game.
 * @namespace AkihabaraShmup
 */
var AkihabaraShmup = {

    NOOP: function () {},
    PUSH_NONE: 0,
    PUSH_LEFT: 1,
    PUSH_RIGHT: 2,
    PUSH_UP: 3,
    PUSH_DOWN: 4,

    initialize: function (th, data) {
        Akihabara.extendsFrom(
            Akihabara.extendsFrom({
                x: 0,
                y: 0,
                accx: 0,
                accy: 0,
                frames: {},
                maxacc: 5,
                controlmaxacc: 5,
                responsive: 0, // Responsiveness
                bounds: {x: 0, y: 0, w: AkihabaraGamebox.getScreenW(), h: AkihabaraGamebox.getScreenH()}, // Bounds box (ship cannot exit from there)
                weapon: 0, // Weapon
                hittime: 5,
                camera: false,
                flipv: false,
                fliph: false,
                health: 1,
                tolerance: 4
            }, data), th
        );
        AkihabaraShmup.spawn(th);
    },

    spawn: function (th, data) {
        th.xpushing = AkihabaraShmup.PUSH_NONE; // user is moving side
        th.vpushing = AkihabaraShmup.PUSH_NONE; // user is moving side
        th.counter = 0; // self counter
        th.hittimer = 0;
        th.killed = false;
        Akihabara.copyModel(th, data);
    },

    getNextX: function (th) { return th.x + AkihabaraHelpers.limit(th.accx, -th.maxacc, th.maxacc); },
    getNextY: function (th) { return th.y + AkihabaraHelpers.limit(th.accy, -th.maxacc, th.maxacc); },
    controlKeys: function (th, keys) {

        if (AkihabaraGamebox.keyIsPressed(keys.left)) {
            th.xpushing = AkihabaraShmup.PUSH_LEFT;
            if (th.accx > th.responsive) { th.accx = th.responsive; }
            th.accx = AkihabaraHelpers.limit(th.accx - 1, -th.controlmaxacc, th.controlmaxacc);
        } else if (AkihabaraGamebox.keyIsPressed(keys.right)) {
            th.xpushing = AkihabaraShmup.PUSH_RIGHT;
            if (th.accx < -th.responsive) { th.accx = -th.responsive; }
            th.accx = AkihabaraHelpers.limit(th.accx + 1, -th.controlmaxacc, th.controlmaxacc);
        } else {
            th.xpushing = AkihabaraShmup.PUSH_NONE;
        }
        if (AkihabaraGamebox.keyIsPressed(keys.up)) {
            th.ypushing = AkihabaraShmup.PUSH_UP;
            if (th.accy > th.responsive) { th.accy = th.responsive; }
            th.accy = AkihabaraHelpers.limit(th.accy - 1, -th.controlmaxacc, th.controlmaxacc);
        } else if (AkihabaraGamebox.keyIsPressed(keys.down)) {
            th.ypushing = AkihabaraShmup.PUSH_DOWN;
            if (th.accy < -th.responsive) { th.accy = -th.responsive; }
            th.accy = AkihabaraHelpers.limit(th.accy + 1, -th.controlmaxacc, th.controlmaxacc);
        } else {
            th.ypushing = AkihabaraShmup.PUSH_NONE;
        }
    },

    applyForces: function (th) {
        th.x = AkihabaraShmup.getNextX(th);
        th.y = AkihabaraShmup.getNextY(th);
    },

    handleAccellerations: function (th) {
        if (!th.xpushing) { th.accx = AkihabaraHelpers.goToZero(th.accx); }
        if (!th.ypushing) { th.accy = AkihabaraHelpers.goToZero(th.accy); }
    },

    keepInBounds: function (th) {
        if (th.x < th.bounds.x) {
            th.x = th.bounds.x;
            th.accx = 0;
        } else if (th.x + th.w > th.bounds.x + th.bounds.w) {
            th.x = th.bounds.x + th.bounds.w - th.w;
            th.accx = 0;
        }
        if (th.y < th.bounds.y) {
            th.y = th.bounds.y;
            th.accy = 0;
        } else if (th.y + th.h > th.bounds.y + th.bounds.h) {
            th.y = th.bounds.y + th.bounds.h - th.h;
            th.accy = 0;
        }
    },

    setFrame: function (th) {
        if (th.hittimer) { th.hittimer--; }
        th.frame = AkihabaraGamebox.decideFrame(th.counter, (th.hittimer ? th.frames.hit : th.frames.still));
    },

    fireBullet: function (gr, id, data) {
        var ts = AkihabaraGamebox.getTiles(data.tileset);
        var obj = AkihabaraGamebox.addObject(
            Akihabara.extendsFrom({
                _bullet: true,
                fliph: false,
                flipv: false,
                id: id,
                group: gr,
                cnt: 0,
                tileset: "",
                frames: {},
                acc: 0,
                angle: 0,
                camera: false,
                accx: (data.accx == null ? Math.floor(AkihabaraTrigo.translateX(0, data.angle, data.acc)) : 0),
                accy: (data.accy == null ? Math.floor(AkihabaraTrigo.translateY(0, data.angle, data.acc)) : 0),
                x: data.from.x + data.from.hw - ts.tilehw + (data.gapx ? data.gapx : 0),
                y: (data.upper ? data.from.y - ts.tilehh + (data.gapy ? data.gapy : 0) : data.from.y + data.from.h - ts.tilehh - (data.gapy ? data.gapy : 0)),
                collidegroup: "",
                spark: AkihabaraShmup.NOOP,
                power: 1
            }, data)
        );

        obj[(data.logicon == null ? "first" : data.logicon)] = function () {
            this.x += this.accx;
            this.y += this.accy;
            this.cnt = (this.cnt + 1) % 10;
            if (!AkihabaraGamebox.objectIsVisible(this)) {
                AkihabaraGamebox.trashObject(this);
            } else if (this.collidegroup != null) {
                for (var i in AkihabaraGamebox._objects[this.collidegroup]) {
                    if ((!AkihabaraGamebox._objects[this.collidegroup][i].initialize) && AkihabaraGamebox.collides(this, AkihabaraGamebox._objects[this.collidegroup][i], AkihabaraGamebox._objects[this.collidegroup][i].tolerance)) {
                        if (AkihabaraGamebox._objects[this.collidegroup][i].hitByBullet != null) {
                            if (!AkihabaraGamebox._objects[this.collidegroup][i].hitByBullet(this)) {
                                this.spark(this);
                                AkihabaraGamebox.trashObject(this);
                            }
                        }
                    }
                }
            }
        };

        obj[(data.bliton == null ? "blit" : data.bliton)] = function () {
            AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {tileset: this.tileset, tile: AkihabaraGamebox.decideFrame(this.cnt, this.frames), dx: this.x, dy: this.y, camera: this.camera, fliph: this.side, flipv: this.flipv});
        };

        return obj;

    },

    hitByBullet: function (th, by) {
        if (by.power) {
            th.health -= by.power;
            if (th.health <= 0) {
                th.kill(by);
            } else {
                th.hittimer = th.hittime;
            }
        }
    },

    generateEnemy: function (gr, id, data, model) {
        Akihabara.extendsFrom(model, data);
        var obj = AkihabaraGamebox.addObject(
            Akihabara.extendsFrom({
                id: id,
                group: gr,
                cnt: 0,
                tileset: "",
                frames: {},
                acc: 0,
                angle: 0,
                camera: false,
                fliph: false,
                flipv: false,
                accx: (data.accx == null ? Math.floor(AkihabaraTrigo.translateX(0, data.angle, data.acc)) : 0),
                accy: (data.accy == null ? Math.floor(AkihabaraTrigo.translateY(0, data.angle, data.acc)) : 0),
                x: data.x,
                y: data.y,
                // -- spec
                animationset: "still",
                defaultanimationset: "still",
                hitanimationset: "still",
                hittime: 5,
                script: AkihabaraShmup.NOOP,
                handler: AkihabaraShmup.NOOP,
                scriptline: (data.scriptline == null ? -1 : data.scriptline - 1),
                newline: true,
                waitframes: 0,
                doframes: 0,
                mode: 0,
                line: {},
                dohandler: null,
                ended: false,
                health: 1,
                hittimer: 0,
                kill: AkihabaraShmup.NOOP,
                tolerance: 0,
                initialize: null,
                invulnerable: false,
                hitAnimation: function (time) {
                    this.hittimer = (time == null ? this.hittime : time);
                    this.animationset = this.hitanimationset;
                },
                goTo: function (nl) { // Jump to a line
                    this.waitframes = 0;
                    this.doframes = 0;
                    this.line = {};
                    this.scriptline = nl - 1;
                },
                hitByBullet: function (by) {
                    if (!this.invulnerable && by.power) {
                        this.health -= by.power;
                        if (this.health <= 0) {
                            this.kill(this, by);
                        } else {
                            this.hitAnimation();
                        }
                    }
                }
            }, data)
        );


        obj[(data.logicon == null ? "first" : data.logicon)] = function () {
            if (this.initialize != null)  {
                this.initialize(this);
                this.initialize = null;
            }
            if (!this.ended) {
                if (!this.waitframes && !this.doframes && ((this.line.waitfor == null) || this.line.waitfor(this))) {
                    this.scriptline++;
                    this.everycnt = -1;
                    if (this.script[this.scriptline] == null) {
                        this.ended = true;
                    } else {
                        if (this.script[this.scriptline]["goto"] != null) { this.scriptline = this.script[this.scriptline]["goto"]; }
                        this.line = this.script[this.scriptline];
                        if (this.line.afterframes != null) { this.waitframes = this.line.afterframes; }
                        if (this.line.forframes != null) {
                            this.doframes = this.line.forframes;
                        } else {
                            this.doframes = 1;
                        }
                        if (this.line.cleardo) {
                            this.dohandler = null;
                        } else if (this.line.doit != null) {
                            this.dohandler = {
                                actiontimes: 0,
                                timer: (this.line.doit.every === "keep" ? this.dohandler.every : this.line.doit.every),
                                every: (this.line.doit.every === "keep" ? this.dohandler.every : this.line.doit.every),
                                once: (this.line.doit.once === "keep" ? this.dohandler.once : this.line.doit.once),
                                action: (this.line.doit.action === "keep" ? this.dohandler.action : this.line.doit.action),
                                render: (this.line.doit.render === "keep" ? this.dohandler.render : this.line.doit.render)
                            };
                        }
                    }
                }
                if (!this.waitframes && this.doframes && !this.ended) {
                    this.doframes--;
                    if (this.line.setinvulnerable != null) { this.invulnerable = this.line.setinvulnerable; }
                    if (this.line.setx != null) { this.x = this.line.setx; }
                    if (this.line.sety != null) { this.y = this.line.sety; }
                    if (this.line.addx != null) { this.x += this.line.addx; }
                    if (this.line.addy != null) { this.y += this.line.addy; }
                    if (this.line.setaccx != null) { this.accx = this.line.setaccx; }
                    if (this.line.setaccy != null) { this.accy = this.line.setaccy; }
                    if (this.line.setacc != null) {
                        this.acc = this.line.setacc;
                        this.accx = Math.floor(AkihabaraTrigo.translateX(0, this.angle, this.acc));
                        this.accy = Math.floor(AkihabaraTrigo.translateY(0, this.angle, this.acc));
                    }
                    if (this.line.addaccx != null) { this.accx += this.line.addaccx; }
                    if (this.line.addaccy != null) { this.accy += this.line.addaccy; }
                    if (this.line.addacc != null) {
                        this.acc += this.line.addacc;
                        this.accx = Math.floor(AkihabaraTrigo.translateX(0, this.angle, this.acc));
                        this.accy = Math.floor(AkihabaraTrigo.translateY(0, this.angle, this.acc));
                    }

                    if (this.line.setangle != null) {
                        this.angle = this.line.setangle;
                        this.accx = Math.floor(AkihabaraTrigo.translateX(0, this.angle, this.acc));
                        this.accy = Math.floor(AkihabaraTrigo.translateY(0, this.angle, this.acc));
                    }
                    if (this.line.addangle != null) {
                        this.angle += this.line.addangle;
                        this.accx = Math.floor(AkihabaraTrigo.translateX(0, this.angle, this.acc));
                        this.accy = Math.floor(AkihabaraTrigo.translateY(0, this.angle, this.acc));
                    }
                    if (this.line.everyframe) { this.waitframes = this.line.everyframe; }

                }
                if (this.waitframes > 0) { this.waitframes--; }
            }
            if (this.dohandler && (this.dohandler.action != null)) {
                if (this.dohandler.timer === this.dohandler.every) {
                    this.dohandler.action(this, this.dohandler.actiontimes);
                    this.dohandler.timer = 0;
                    this.dohandler.actiontimes++;
                } else if (!this.dohandler.once) {
                    this.dohandler.timer++;
                }
            }
            if (this.handler != null) { this.handler(this); }

            if (this.hittimer) {
                this.hittimer--;
                if (!this.hittimer) { this.animationset = this.defaultanimationset; }
            }

            this.x += this.accx;
            this.y += this.accy;
            this.cnt = (this.cnt + 1) % 10;

        };

        obj[(data.bliton == null ? "blit" : data.bliton)] = function () {
            AkihabaraGamebox.blitTile(AkihabaraGamebox.getBufferContext(), {tileset: this.tileset, tile: AkihabaraGamebox.decideFrame(this.cnt, this.frames[this.animationset]), dx: this.x, dy: this.y, camera: this.camera, fliph: this.side, flipv: this.flipv});
            if (this.dohandler && (this.dohandler.render != null)) { this.dohandler.render(this); }
        };

        return obj;

    },

    generateScroller: function (gr, id, data) {
        var scroller_model = {
            id: id,
            group: gr,
            y: 0,
            x: 0,
            stage: {},
            speed: 0,
            stop: null, // Remember to set the last stop ever! or the last loop!
            block: -1,
            bly: 0,
            lblock: -1,
            lbly: 0,
            lget: 0,
            tbly: 0,
            trb: 0,
            maxwidth: 0,
            loopstart: null,
            loopend: null,
            looprounds: 0,
            panspeed: 1,
            panstimer: 0,
            destspeed: 0,

            setLoop: function (st, en) {
                this.loopstart = st;
                this.loopend = en;
                this.lget = 1;
                this.looprounds = 1;
            },

            quitLoop: function () {
                this.setLoop(null, null);
                this.looprounds = 0;
            },

            setSpeed: function (s) {
                this.speed = s;
                this.destspeed = s;
            },

            panToSpeed: function (s, pans) {
                this.destspeed = s;
                this.panspeed = pans;
            },

            quitStop: function () {
                this.stop = null;
            },

            setStop: function (s) {
                this.stop = s;
            },

            setX: function (x) {
                if (x < 0) {
                    this.x = 0;
                } else if (x + AkihabaraGamebox.getScreenW() > this.maxwidth) {
                    this.x = this.maxwidth - AkihabaraGamebox.getScreenW();
                } else {
                    this.x = x;
                }
            }
        };

        var obj = AkihabaraGamebox.addObject(
            Akihabara.extendsFrom(AkihabaraHelpers.cloneObject(data), scroller_model)
        );

        obj[(data.logicon == null ? "first" : data.logicon)] = function () {
            if ((this.stop == null) || (this.y < this.stop)) {
                if (this.speed !== this.destspeed) {
                    if (this.panstimer) {
                        this.panstimer--;
                    } else {
                        if (this.speed < this.destspeed) {
                            this.speed++;
                        } else if (this.speed > this.destspeed) {
                            this.speed--;
                        }
                        this.panstimer = this.panspeed;
                    }
                }
                this.y += this.speed;
                if ((this.stop != null) && (this.y >= this.stop)) { this.y = this.stop; }
                if ((this.loopend != null) && (this.y > this.loopend)) {
                    this.y = this.loopstart + (this.y - this.loopend);
                    this.looprounds++;
                    if (this.lget === 1) {
                        this.block = 0;
                        this.bly = 0;
                        this.lget = 2;
                    } else {
                        this.block = this.lblock;
                        this.bly = this.lbly;
                    }

                }
            }

            this.trb = this.block;
            this.tbly = this.bly;
            do {
                this.trb++;
                this.tbly += AkihabaraGamebox.getImage(this.stage[this.trb].image).height;
            } while (this.tbly < this.y);

            this.block = this.trb - 1;
            this.bly = this.tbly - AkihabaraGamebox.getImage(this.stage[this.trb].image).height;

            if (this.lget === 2) {
                this.lblock = this.block;
                this.lbly = this.bly;
                this.lget = 3;
            }
        };

        obj[(data.bliton == null ? "blit" : data.bliton)] = function () {
            var dy = this.tbly - this.y;
            var done = false;
            do {
                if (dy > AkihabaraGamebox.getScreenH()) { done = true; }
                AkihabaraGamebox.blitAll(AkihabaraGamebox.getBufferContext(), AkihabaraGamebox.getImage(this.stage[this.trb].image), {dx: -this.x, dy: AkihabaraGamebox.getScreenH() - dy});
                this.trb++;
                dy += AkihabaraGamebox.getImage(this.stage[this.trb].image).height;
            } while (!done);
        };

        return obj;
    }
};
