// DiscTrail.js: a class for an individual Disc trail
var DiscTrail = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'disc-normal');
    this.anchor.setTo(0.5,0.5);

    this.animations.add('spin');
    this.animations.play('spin', 15, true);

};

DiscTrail.prototype = Object.create(Phaser.Sprite.prototype);
DiscTrail.prototype.constructor = DiscTrail;

// ----------------------------------------------------
// Core create and update functions for Disc.js
// ----------------------------------------------------

DiscTrail.prototype.create = function(){
	
};

DiscTrail.prototype.update = function() {
	this.alpha -= .1;
	if (this.alpha < 0){
		this.kill();
	}
};

// ----------------------------------------------------
// Helper functions for Disc.js
// ----------------------------------------------------

DiscTrail.prototype.serve = function(whichSide){
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