// Wall.js: a class for a barrier to the playfield. This includes both scoring and non-scoring walls.
var Wall = function (game, x, y, scoreValue, whichSide) {

    Phaser.Sprite.call(this, game, x, y, 'wall');
    this.anchor.setTo(0.5,0.5);

    // Enable physics on Wall
    game.physics.arcade.enable(this);
    this.body.immovable = true;

    // Assign point value to wall
    this.scoreValue = scoreValue;

    // Keep track of which team this wall belongs to
    this.whichSide = whichSide;
};

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

// ----------------------------------------------------
// Core create and update functions for Wall.js
// ----------------------------------------------------

Wall.prototype.create = function(){

}

Wall.prototype.update = function() {
 
};

// ----------------------------------------------------
// Helper functions for Wall.js
// ----------------------------------------------------
