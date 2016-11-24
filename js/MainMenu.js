
MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

MainMenu.prototype = {

	create: function () {

		this.titleScreen = game.add.sprite(-38,-21,'demo-title');
		// For convenience's sake, we will reset all global variables at the Main Menu.
		game.arenaType = 1;

		// You could draw some title screen graphics here and set up some menu logic, but for now, let's just begin the Game state.
		
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.primaryKey = game.input.keyboard.addKey(Phaser.Keyboard.Q)   
        this.secondaryKey =game.input.keyboard.addKey(Phaser.Keyboard.E);     
      
        this.leftKeyTwo = game.input.keyboard.addKey(Phaser.Keyboard.J);
        this.rightKeyTwo = game.input.keyboard.addKey(Phaser.Keyboard.L);
        this.upKeyTwo = game.input.keyboard.addKey(Phaser.Keyboard.I);
        this.downKeyTwo = game.input.keyboard.addKey(Phaser.Keyboard.K);        
        this.primaryKeyTwo = game.input.keyboard.addKey(Phaser.Keyboard.U); 
        this.secondaryKeyTwo =game.input.keyboard.addKey(Phaser.Keyboard.O);    
	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown || this.primaryKey.isDown || this.secondaryKey.isDown || this.leftKeyTwo.isDown || this.rightKeyTwo.isDown || this.upKeyTwo.isDown || this.downKeyTwo.isDown || this.primaryKeyTwo.isDown || this.secondaryKeyTwo.isDown ){
			this.state.start('Game');
		}
		//this.state.start('Game');
	},
};
