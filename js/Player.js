// Player.js: a class for an individual player
var Player = function (game, x, y, playerIdentifier) {

    Phaser.Sprite.call(this, game, 50, 50, 'dude');

    // used to designate this as player 1, 2, 3, or 4
    this.playerIdentifier = playerIdentifier;
  
    // Enable physics on player
    game.physics.arcade.enable(this);
  
    // Assign correct keymappings
    this.assignControls(this.playerIdentifier); 
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// ----------------------------------------------------
// Core create and update functions for Player.js
// ----------------------------------------------------


Player.prototype.update = function() {
 
};

// ----------------------------------------------------
// Helper functions for Player.js
// ----------------------------------------------------

Player.prototype.assignControls = function(whichPlayer){

    // Assign the appropriate keys to this player;
    switch (whichPlayer){
        case 1:
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.leftKey.onDown.add(this.moveLeft, this);

            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.rightKey.onDown.add(this.moveRight, this);

            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.upKey.onDown.add(this.moveUp, this);

            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
            this.downKey.onDown.add(this.moveDown, this);
        break;
        case 2:
        break;
        case 3:
        break;
        case 4:
        break;
    }
}

Player.prototype.moveLeft = function(){
console.log("left!")
}

