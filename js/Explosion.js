// Explosion.js: a class for an individual point explosion
var Explosion = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'in-game-ui-atlas');
    this.anchor.setTo(0.5,0.5);
    console.log("explosion constructor")
    this.explosionAnimation = this.animations.add('explosion', Phaser.Animation.generateFrameNames('explosion-', 1, 4, '.png', 0), 8, false);
	// this.explosionAnimation.play();
	this.explosionAnimation.onComplete.add(this.killExplosion, this);
	this.kill();
	// this.animations.play('explosion', 8, false, true);
	this.pointNumber = new PointNumber(game,0,0);
	game.add.existing(this.pointNumber);
	
};

Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.prototype.constructor = Explosion;

// ----------------------------------------------------
// Core create and update functions for Explosion.js
// ----------------------------------------------------

Explosion.prototype.update = function() {
};

// ----------------------------------------------------
// Helper functions for Explosion.js
// ----------------------------------------------------

Explosion.prototype.killExplosion = function(){
	this.kill();
}

Explosion.prototype.fireExplosion = function(xVal, yVal, scoreValue){
	console.log("happening")
	this.x = xVal;
	this.y = yVal;
	this.revive();
	if (this.x > game.width/2){
		this.scale.x = -1;
	} else {
		this.scale.x = 1;
	}
	this.explosionAnimation.play();

	this.pointNumber.revive();
	this.pointNumber.firePointNumber(xVal,yVal,scoreValue);
}