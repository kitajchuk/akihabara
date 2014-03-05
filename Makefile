##########################################
#   Akihabara Game Engine
#   Forked Version
#   https://github.com/kitajchuk/akihabara
##########################################

# JSDoc Files
DOCDIR = docs
SRCDIR = src
ALLFILES = node_modules/jsource/dist/MediaBox.js \
node_modules/gamed/dist/GameState.js \
node_modules/gamed/dist/GameQuest.js \
node_modules/gamed/dist/GameScreen.js \
src/includes/mediabox.js \
src/includes/gamestate.js \
src/includes/gamequest.js \
src/includes/gamescreen.js \
src/akihabara.js \
src/input.js \
src/debug.js \
src/trigo.js \
src/gbox.js \
src/iphopad.js \
src/toys.js \
src/tile.js \
src/helpers.js \
src/tools.js \
src/gamecycle.js \
src/devices.js \
src/plugins/topview.js \
src/plugins/platformer.js \
src/plugins/shmup.js \

jsdocs:
	mkdir -p $(DOCDIR)
	rm -rf $(DOCDIR)/*
	node_modules/jsdoc/jsdoc -r $(ALLFILES) -d $(DOCDIR)
