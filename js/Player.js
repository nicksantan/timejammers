// Player.js: a class for an individual player
var Player = function (game, x, y, playerIdentifier) {

    Phaser.Sprite.call(this, game, x, y, 'Player');

    // used to designate this as player 1, 2, 3, or 4
    this.playerIdentifier = playerIdentifier;
    
    // Enable physics on player
    game.physics.arcade.enable(this);
    

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// ----------------------------------------------------
// Core create and update functions for Player.js
// ----------------------------------------------------

Player.prototype.create = function(){

    // Assign this player the appropriate keyboard keys based on which player they are
    assignControls(this.playerIdentifier);
}

Player.prototype.update = function() {
 
   // acceptInput();

};

// ----------------------------------------------------
// Helper functions for Player.js
// ----------------------------------------------------

Player.prototype.assignControls = function(whichPlayer){

    // Assign the appropriate keys to this player;
    switch (whichPlayer){
        case 1:
        break;
        case 2:
        break;
        case 3:
        break;
        case 4:
        break;
    }
}
