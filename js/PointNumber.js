// PointNumber.js: a class for an individual point number to appear next to an explosion
var PointNumber = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'in-game-ui-atlas');
    this.anchor.setTo(0.5,0.5);
    console.log("point number constructor")
    this.explosionAnimation = this.animations.add('left-num', Phaser.Animation.generateFrameNames('left-03-', 1, 10, '.png', 2), 8, false);
	// this.explosionAnimation.play();
	this.explosionAnimation.onComplete.add(this.killPointNumber, this);
	this.kill();
	// this.animations.play('explosion', 8, false, true);
	
	
};

PointNumber.prototype = Object.create(Phaser.Sprite.prototype);
PointNumber.prototype.constructor = PointNumber;

// ----------------------------------------------------
// Core create and update functions for PointNumber.js
// ----------------------------------------------------

PointNumber.prototype.update = function() {
};

// ----------------------------------------------------
// Helper functions for PointNumber.js
// ----------------------------------------------------

PointNumber.prototype.killPointNumber = function(){
	this.kill();
}

PointNumber.prototype.firePointNumber = function(xVal, yVal, scoreValue){
	console.log("happening")
	// score value will determine which animation to play
	this.x = xVal;
	this.y = yVal;
	this.revive();
	if (this.x > game.width/2){
		this.scale.x = -1;
	} else {
		this.scale.x = 1;
	}
	this.explosionAnimation.play();
}