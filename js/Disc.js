// Disc.js: a class for an individual Disc
var Disc = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'Disc');

    // Enable physics on disc
    game.physics.arcade.enable(this);
    

};

Disc.prototype = Object.create(Phaser.Sprite.prototype);
Disc.prototype.constructor = Disc;

// ----------------------------------------------------
// Core create and update functions for Disc.js
// ----------------------------------------------------

Disc.prototype.create = function(){

}

Disc.prototype.update = function() {
 
};

// ----------------------------------------------------
// Helper functions for Disc.js
// ----------------------------------------------------
