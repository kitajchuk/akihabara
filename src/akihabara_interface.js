/**
* A simple namespace to provide a better code interface
*
* This is just an experiment for now
* @namespace
**/
var AkihabaraInterface = {
    Media: AkihabaraMediaBox,
    Gamecycle: AkihabaraGamecycle,
    Helpers: AkihabaraHelpers,
    Input: AkihabaraInput,
    Tools: AkihabaraTools,
    Toys: AkihabaraToys,
    Tile: AkihabaraTile,

    plugins: {
        "Topview": AkihabaraTopview,
        "Platformer": AkihabaraPlatformer,
        "Shmup": AkihabaraShmup
    }
};
