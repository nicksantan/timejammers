// Disc.js: a class for an individual Disc
var Disc = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'disc');
    this.anchor.setTo(0.5,0.5);

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
	

	if (wall.scoreValue == 0){
		this.body.velocity.y *= -1;
	} else {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.kill();
		game.state.states[game.state.current].scoreGoal(wall.scoreValue);
		this.x = this.game.width/2;
		this.y = this.game.height/2;
		this.revive();
		game.time.events.add(Phaser.Timer.SECOND, this.serve, this);
	}

	// console.log("heyyy")
	// console.log(this.body.velocity.y)
};

Disc.prototype.serve = function(){
	console.log("serve!")
	this.body.velocity.x = Math.random()*500 - 250;
}