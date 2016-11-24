

var Boot = function (game) {

};

Boot.prototype = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        Phaser.Canvas.setImageRenderingCrisp(game.canvas);
        game.renderer.renderSession.roundPixels = true;
        game.world.setBounds(-38, -21, 844, 475)

    },

    preload: function () {

        //  Here we load the assets required for our preloader (e.g. loading gifs, etc.)
        //  this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        //  this.load.image('preloaderBar', 'images/preloadr_bar.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};
