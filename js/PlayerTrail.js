// PlayerTrail.js: a class for an individual Player trail
var PlayerTrail = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'guber-atlas');
    this.anchor.setTo(0.5,0.5);

    this.runningAnimation = this.animations.add('running-right-left', Phaser.Animation.generateFrameNames('running-right-left-', 1, 6, '.png', 0), 15, false);
    this.animations.play('running-right-left', 20, true);
    this.alpha = 0.7;

};

PlayerTrail.prototype = Object.create(Phaser.Sprite.prototype);
PlayerTrail.prototype.constructor = PlayerTrail;

// ----------------------------------------------------
// Core create and update functions for PlayerTrail.js
// ----------------------------------------------------

PlayerTrail.prototype.create = function(){
	
};

PlayerTrail.prototype.update = function() {
	this.alpha -= .1;
	if (this.alpha < 0){
		this.kill();
	}
};

// ----------------------------------------------------
// Helper functions for PlayerTrail.js
// ----------------------------------------------------

PlayerTrail.prototype.serve = function(whichSide){
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