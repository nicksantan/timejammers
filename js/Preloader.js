
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
		this.load.image('player', 'assets/player.png');
		this.load.image('guber', 'assets/guber.png');
		this.load.image('pirate-ship-bg', 'assets/pirate-ship-beta.png');
		this.load.image('set-count-bg', 'assets/set-count-flat.png');
		this.load.image('score-bg', 'assets/score-bg.png');
		this.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
		this.load.spritesheet('dude', 'assets/dude.png', 32, 48);	
		this.load.spritesheet('disc-normal', 'assets/disc-normal.png', 28, 28);	
		this.load.spritesheet('guber-standing', 'assets/guber-standing.png', 72, 74)
		this.load.spritesheet('guber-throwing', 'assets/guber-throwing.png', 160, 160)

		this.load.spritesheet('spark', 'assets/sparksheet.png', 66, 33)
		this.load.spritesheet('reticle', 'assets/reticlesheet.png', 30, 30)

		// load texture atlases
		this.game.load.atlas('number-atlas', 'assets/number-atlas.png', 'assets/number-atlas.json');

	},

	create: function () {

		// For now, let's just jump to the main menu state.
		this.state.start('MainMenu');
	},

	update: function () {

	}

};
