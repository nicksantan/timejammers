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
// Helper functions for Deflector.js
// ----------------------------------------------------

// Deflector.js: a class for a barrier to the playfield. This includes both scoring and non-scoring Deflectors.
var Deflector = function (game, x, y, width, height, whichDirection) {

    Phaser.Sprite.call(this, game, x, y, 'wall');
    this.anchor.setTo(0.5,0.5);

    // Create Deflector at location and at designated location
    this.width = width;
    this.height = height;

    // Assign the direction this deflector should send the disc flying!
    this.whichDirection = whichDirection;

    // Enable physics on Deflector
    game.physics.arcade.enable(this);
    this.body.immovable = true;
};

Deflector.prototype = Object.create(Phaser.Sprite.prototype);
Deflector.prototype.constructor = Deflector;

// ----------------------------------------------------
// Core create and update functions for Deflector.js
// ----------------------------------------------------

Deflector.prototype.create = function(){

}

Deflector.prototype.update = function() {
 
};

// ----------------------------------------------------
// Helper functions for Wall.js
// ----------------------------------------------------
