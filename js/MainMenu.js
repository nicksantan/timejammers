
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		// You could draw some title screen graphics here and set up some menu logic, but for now, let's just begin the Game state.
		this.state.start('Game');
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},
};
