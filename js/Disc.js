// Disc.js: a class for an individual Disc
var Disc = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'disc');

    // Enable physics on disc
    game.physics.arcade.enable(this);
    

};

Disc.prototype = Object.create(Phaser.Sprite.prototype);
Disc.prototype.constructor = Disc;

// ----------------------------------------------------
// Core create and update functions for Disc.js
// ----------------------------------------------------

Disc.prototype.create = function(){

};

Disc.prototype.update = function() {

};

// ----------------------------------------------------
// Helper functions for Disc.js
// ----------------------------------------------------

Disc.prototype.bounceOffWall = function(disc, wall){
	// console.log("it was " + this.body.velocity.y);
	if (wall.scoreValue == 0){
		this.body.velocity.y *= -1;
	} else {
		this.kill();
		game.state.states[game.state.current].scoreGoal(wall.scoreValue);
	}

	// console.log("heyyy")
	// console.log(this.body.velocity.y)
};