##########################################
#   Akihabara Game Engine
#   Forked Version
#   https://github.com/kitajchuk/akihabara
##########################################

# JSDoc Files
DOCDIR = docs
SRCDIR = src
ALLFILES = $(SRCDIR)

jsdocs:
	mkdir -p $(DOCDIR)
	rm -rf $(DOCDIR)/*
	dependencies/jsdoc/jsdoc -r $(ALLFILES) -d $(DOCDIR)
