// Net.js: a class for the net. It collides with players but not with the disc.
var Net = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'wall');

    // Enable physics on Net
    game.physics.arcade.enable(this);
    this.body.immovable = true;

};

Net.prototype = Object.create(Phaser.Sprite.prototype);
Net.prototype.constructor = Net;

// ----------------------------------------------------
// Core create and update functions for Net.js
// ----------------------------------------------------

Net.prototype.create = function(){

}

Net.prototype.update = function() {
 
};

// ----------------------------------------------------
// Helper functions for Wall.js
// ----------------------------------------------------
