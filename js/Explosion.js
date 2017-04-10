// Explosion.js: a class for an individual point explosion
var Explosion = function (game, x, y, pointValue) {

    Phaser.Sprite.call(this, game, x, y, 'in-game-ui-atlas');
    this.anchor.setTo(0.5,0.5);
    console.log("explosion constructor")
    this.explosionAnimation = this.animations.add('explosion', Phaser.Animation.generateFrameNames('explosion-', 1, 4, '.png', 0), 1, false);
	
	this.animations.play('explosion', 8, false, true);
};

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

// ----------------------------------------------------
// Core create and update functions for Disc.js
// ----------------------------------------------------

Explosion.prototype.create = function(){
	console.log("EXPLOSION!!!!")
	
};

Explosion.prototype.update = function() {
	// this.alpha -= .1;
	if (this.alpha < 0){
		this.kill();
	}
};

// ----------------------------------------------------
// Helper functions for Disc.js
// ----------------------------------------------------

Explosion.prototype.serve = function(whichSide){
	console.log("serve!")
	this.catchable = true;
	switch(whichSide){
		case 1:
			this.body.velocity.x = -400;
		break;
		case 2: 
			this.body.velocity.x = 400;
		break;
		
	}
}