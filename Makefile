##########################################
#   Akihabara Game Engine
#   Forked Version
#   https://github.com/kitajchuk/akihabara
##########################################

# JSDoc Files
DOCDIR = docs
SRCDIR = src
ALLFILES = node_modules/jsource/dist/MediaBox.js \
src/mediabox.js \
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
