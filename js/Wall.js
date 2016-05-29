// Wall.js: a class for a barrier to the playfield. This includes both scoring and non-scoring walls.
var Wall = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'wall');

    // Enable physics on Wall
    game.physics.arcade.enable(this);
    

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
