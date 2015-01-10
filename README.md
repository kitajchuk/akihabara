akihabara
=========

> A retro gaming engine using Javascript Canvas.


## Getting Started
Install via npm:
```shell
npm install akihabara
```


## What's New
I have implemented several new aspects of the framework. I have been building a game using Akihabara, hence this forked version and all the updates. 

### AkihabaraMediabox
I have included an AkihabaraMediabox instance of [MediaBox](https://github.com/ProperJS/MediaBox) from my [ProperJS](https://github.com/ProperJS) organization. AkihabaraMediabox extends MediaBox, addings some new methods more specific to the gaming engine.

### AkihabaraGamestate
I have included an AkihabaraGamestate instance of [GameState](https://github.com/ProperJS/GameState) from my [Gamed](https://github.com/ProperJS) organization.

### AkihabaraGamequest
I have included an AkihabaraGamequest instance of [GameQuest](https://github.com/ProperJS/GameQuest) from my [Gamed](https://github.com/ProperJS) organization.

### AkihabaraGamescreen
I have included an AkihabaraGamescreen instance of [GameScreen](https://github.com/ProperJS/GameScreen) from my [Gamed](https://github.com/ProperJS) organization.

### Akihabara Dist Files
You can load any of the files from the dist directory depending on what type of game you are making. The following dist files exist:
 - akihabara.topview.js
 - akihabara.topview.min.js
 - akihabara.platformer.js
 - akihabara.platformer.min.js
 - akihabara.shmup.js
 - akihabara.shmup.min.js

### Developers Notes
Right now I am overriding the AkihabaraGamebox._basepath property in the AkihabaraGamebox.onLoad callback to get around now using [akihabara as a node module](https://www.npmjs.org/package/akihabara). My ultimate goal is to get rid of all the splash and preload stuff since its not supportive of fully custom game intros. I'm currently using a fully customized game intro with no splash in my project.
```js
AkihabaraGamebox._basepath = "/node_modules/akihabara/images/";
```


...



#### Retaining original legal information
The initial akihabara code was made by [Fracesco Cottone](http://kesiev.com) as an open source project dual licensed by MIT and GPL.

#### Interested in the original Akihabara
[Check it out](https://github.com/Akihabara/akihabara)