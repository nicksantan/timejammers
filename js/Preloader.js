
Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Preloader.prototype = {

	preload: function () {

		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// You could display a preloading bar here (or other assets loaded in the boot phase), and then proceed to load your main game assets:
		this.load.image('sky', 'assets/sky.png');
		this.load.image('ground', 'assets/platform.png');
		this.load.image('star', 'assets/star.png');
		this.load.image('wall', 'assets/wall.jpg');
		this.load.image('disc', 'assets/disc_sm.png');
		this.load.image('player', 'assets/player.png');
		this.load.image('guber', 'assets/guber.png');
		this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
		this.load.spritesheet('dude', 'assets/dude.png', 32, 48);	

	},

	create: function () {

		// For now, let's just jump to the main menu state.
		this.state.start('MainMenu');
	},

	update: function () {

	}

};
