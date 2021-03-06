// Disc.js: a class for an individual Disc
var Disc = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'disc-normal');
    this.anchor.setTo(0.5,0.5);

    // Enable physics on disc
    game.physics.arcade.enable(this);
    this.animations.add('spin');
    this.animations.play('spin', 15, true);


    this.GROUND_TIME_BEFORE_MISS = .5;

    this.catchable = true;
    this.mayBeMissed = false;
    this.missed = false;
    this.nextX = 0;
    this.nextY = 0;
    this.distanceToReticle = 0;
    this.specialActive = false;
    this.justScored = false;
    this.pendingServe = true;

    this.spark = game.add.sprite(0, 0, 'spark');
    this.spark.anchor.setTo(0.5,0.5)
    this.spark.animations.add('fire');

    this.spark.kill();
    
    // Create a pool for the disc trails
    this.trailPool = [];
    for (i = 0; i < 20; i++) {
    var trail = new DiscTrail(game,0,0);
    this.game.add.existing(trail);
    trail.kill();
    this.trailPool.push(trail);

     // create a reticle to use later
    this.reticle = new Reticle(game,this.game.width/2,this.game.height/2)

    this.reticle.anchor.setTo(0.5,0.5)
    this.reticle.animations.add('fire');
    this.game.add.existing(this.reticle);
    this.reticle.kill();

  }


};

Disc.prototype = Object.create(Phaser.Sprite.prototype);
Disc.prototype.constructor = Disc;

// ----------------------------------------------------
// Core create and update functions for Disc.js
// ----------------------------------------------------

Disc.prototype.create = function(){
	
};

Disc.prototype.update = function() {
	
	if (this.alive && this.specialActive){
		this.addTrail();
	}

	if (!this.catchable && !this.missed && !this.mayBeMissed && (this.isBeingLobbed || this.isPoppedUp)){
		var growRate;
		if (this.isBeingLobbed){
			growRate = .06;
		} else if (this.isPoppedUp){
			growRate = .06;
		}

		var currentDistanceToReticle = new Phaser.Point(this.x - this.nextX, this.y - this.nextY);
	//	console.log(currentDistanceToReticle.getMagnitude() +" + " + this.distanceToReticle/2)
		if (currentDistanceToReticle.getMagnitude() <= this.distanceToReticle/2){
			this.scale.x -= growRate;
			this.scale.y -= growRate;

			if ((this.scale.x) <= 1){
				this.scale.x = 1;
				this.scale.y = 1;
				this.catchable = true;
				this.mayBeMissed = true;
				this.isBeingLobbed = false;
				this.isPoppedUp = false;
				console.log("may be missed set to true")
				this.body.velocity.x = 0;
				this.body.velocity.y = 0;
					console.log("scalex is shrinking " + this.scale.x)
				this.animations.stop();
				//check if this is caught in X seconds. If not, make it uncatchable and send a message to score a point for a player.
				//TODO: FIX FIRST!
				//game.time.events.add(Phaser.Timer.SECOND * this.GROUND_TIME_BEFORE_MISS, this.scoreMiss, this);
			}
		} else {
			
			console.log("current distance to reticle magnitude is: " + currentDistanceToReticle.getMagnitude());
			console.log("it needs to be less than the distance to reticle/2 which is " +this.distanceToReticle/2);
			console.log("scalex is growing " + this.scale.x)
			this.scale.x += growRate;
			this.scale.y += growRate;
		}
	}

	if (this.mayBeMissed){
		
		this.mayBeMissedTimer += 1;
	//	console.log(this.mayBeMissed);
		//console.log(this.mayBeMissedTimer)
		if (this.mayBeMissedTimer > 30){ // Find a better way to do this magic number
			
			this.mayBeMissed = false;
			this.missed = true;
			this.catchable = false;
			this.scoreMiss();
		}
	}

	//TODO: Find a better way to do this
    if (this.catchable){
        this.reticle.kill();
    }

};

// ----------------------------------------------------
// Helper functions for Disc.js
// ----------------------------------------------------


Disc.prototype.popUp = function(){
	this.isBeingLobbed = true;
	 // // move the reticle to the location    
  //   this.reticle.position.x = destX;
  //   this.reticle.position.y = destY;
  //   this.reticle.revive();
  //   this.reticle.animations.play('fire', 15, true);
    //this.reticle.animations.currentAnim.onComplete.add(function () {  this.reticle.kill();}, this);
    var destY;
    var destX;
    if (this.y < this.game.height/2){ 
    	destY = this.y + 25 + Math.random()*25;
    } else {
    	destY = this.y - 25 - Math.random()*25;
    }

    if (this.x < this.game.width/2){ 
    	destX = this.x + 25 + Math.random()*25;
    } else {
    	destX = this.x - 25 - Math.random()*25;
    }
   
    // determine direction to the reticle
    distanceVec = new Phaser.Point(this.x - destX, this.y - destY);
    normalizedVec = distanceVec.normalize();

    this.body.velocity.y = distanceVec.y * -25;
    this.body.velocity.x = distanceVec.x * -25;
   
    this.catchable = false;
    this.nextX = destX;
    this.nextY = destY;

    this.reticle.position.x = destX;
    this.reticle.position.y = destY;
    this.reticle.revive();
    this.reticle.animations.play('fire', 15, true);

    this.distanceToReticle = new Phaser.Point(this.x - destX, this.y - destY).getMagnitude();
}

Disc.prototype.addTrail = function (){
	var trail;
	for (i = 0; i < this.trailPool.length; i++) {
      if (!this.trailPool[i].alive) {
         trail = this.trailPool[i];
         console.log("found a dead trail, reactivating at " +this.x + " and " + this.y)
         trail.reset(this.x, this.y);
         trail.alpha = 1.0;
         return trail;
      }
    }
}

Disc.prototype.bounceOffWall = function(disc, wall){
	

	if (wall.scoreValue == 0){
		this.body.velocity.y *= -1;
		// fire a spark
		if(wall.y < game.world.height/2){
			this.spark.scale.y = 1;
			this.spark.y = this.y - 5;
		} else {
			this.spark.scale.y = -1;
			this.spark.y = this.y + 5;	
		}

		if (this.body.velocity.x > 0){
			this.spark.x = this.x - 5;
			this.spark.scale.x = -1;
		} else {
			this.spark.x = this.x + 5;
			this.spark.scale.x = 1;
		}
	
		this.spark.revive();
		this.spark.animations.play('fire', 15, false);
		this.spark.animations.currentAnim.onComplete.add(function () {	this.spark.kill();}, this);
	} else {
		if (!this.justScored){
			game.state.states[game.state.current].scoreGoal(wall.scoreValue, wall.whichSide);
			this.resetDisc(wall.whichSide);
			this.justScored = true;
		}
	}

	// console.log("heyyy")
	// console.log(this.body.velocity.y)
};

Disc.prototype.resetDisc = function(whichSide){
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	this.kill();
	this.x = this.game.width/2;
	this.y = this.game.height/2;
	this.animations.play('spin', 15, true);
	this.revive();
	this.pendingServe = true;
	this.missed = false;
	if (!game.state.states[game.state.current].gameIsOver){
		game.time.events.add(Phaser.Timer.SECOND * 2, function(){this.serve(whichSide)}, this);
	}
};

Disc.prototype.pickUp = function(){
	this.mayBeMissed = false;
    this.mayBeMissedTimer = 0;
}
Disc.prototype.scoreMiss = function(){
	this.catchable = false; 
	
	
	var sideScoredOn;
	if (this.x >= this.game.width/2){
		sideScoredOn = 2;
	} else {
		sideScoredOn = 1;
	}
	game.time.events.add(Phaser.Timer.SECOND * 2, function(){game.state.states[game.state.current].scoreGoal(2, sideScoredOn); this.resetDisc(sideScoredOn)}, this);
	

};


Disc.prototype.serve = function(whichSide){
	console.log("serve!")
	this.catchable = true;
	this.justScored = false;
	this.pendingServe = false;
	switch(whichSide){
		case 1:
			this.body.velocity.x = -400;
		break;
		case 2: 
			this.body.velocity.x = 400;
		break;
		
	}
}