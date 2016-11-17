// PlayerPortrait.js: a class for the player portraits that appear atop the gameplay screen
var PlayerPortrait = function (game, whichCharacter, whichSlot) {

   Phaser.Group.call(this, game);	

   //TODO enter switchers here based on which player is chosen. For now, just use Trey Guber.
  
 //   	this.nameBg = this.create(game.width*.155,40, 'guber-name-bg');
 //   	this.portrait = this.create(game.width*.063,32, 'guber-portrait-v2');
	// this.nameText = this.create(game.width*.145,35, 'guber-name');




   	 	switch (whichSlot){
   		case 1:
   			this.nameBg = this.create(119,40, 'guber-name-bg');
   			this.portrait = this.create(48,32, 'guber-portrait-v2');
			this.nameText = this.create(111,35, 'guber-name');
			this.portrait.scale.x = 1;
   			this.x = 0;
   		break;
   		case 2:
   		break;
   		case 3:
   		break;
   		case 4:
			this.nameBg = this.create(game.width-119,40, 'guber-name-bg');
		   	this.portrait = this.create(game.width-48,32, 'guber-portrait-v2');
			this.nameText = this.create(game.width-111,35, 'guber-name');
   			this.portrait.scale.x = -1;
   			this.nameBg.scale.x = -1;
   			this.x = 0;

   		break;
   	}


   	this.setAll('anchor.x', 0.5);
   	this.setAll('anchor.y', 0.5);
   	this.fixedToCamera = true;

   	this.visible = true;
};

PlayerPortrait.prototype = Object.create(Phaser.Group.prototype);
PlayerPortrait.prototype.constructor = PlayerPortrait;

// ----------------------------------------------------
// Core create and update functions for PlayerPortrait.js
// ----------------------------------------------------

// PlayerPortrait.prototype.create = function(){
// console.log("PlayerPortrait created");
// // this.credfdate(50,276,'set-count-bg');


// }

PlayerPortrait.prototype.update = function() {
 
};


// ----------------------------------------------------
// Helper functions for PlayerPortrait.js
// ----------------------------------------------------

PlayerPortrait.prototype.updateScore = function(whichTeam, newScore){
	var frame = "score-"+newScore+".png";
	switch (whichTeam){
		case 1:
			this.teamOneScore.frameName = frame;
		break;
		case 2:
			this.teamTwoScore.frameName = frame;
		break;
	}
}

PlayerPortrait.prototype.updateSet = function(whichTeam, newScore){
	var frame = "set-count-"+newScore+".png";
	switch (whichTeam){
		case 1:
			this.teamOneSets.frameName = frame;
		break;
		case 2:
			this.teamTwoSets.frameName = frame;
		break;
	}
}

PlayerPortrait.prototype.showOverlay = function(){
	this.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 2, this.hideOverlay, this);
}

PlayerPortrait.prototype.hideOverlay = function(){
	this.visible = false;
}