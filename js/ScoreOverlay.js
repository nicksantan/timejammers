// ScoreOverlay.js: a class for a Score Overlay. It appears above the action temporarily after a point is scored
var ScoreOverlay = function (game) {

   Phaser.Group.call(this, game);	

   this.scoreOverlayBG = this.create(game.width/2,game.height/2-30,'score-bg');
   this.setOverlayBG = this.create(game.width/2,276,'set-count-bg');
   this.setOverlayBG.anchor.setTo(0.5,0.5)

   this.teamOneScore = this.create(game.width*.40, 185, 'number-atlas');
   this.teamTwoScore = this.create(game.width*.60, 185, 'number-atlas');

   this.teamOneSets = this.create(game.width*.45, 280, 'number-atlas');
   this.teamTwoSets = this.create(game.width*.55, 280, 'number-atlas');
   
   this.teamOneSets.frameName = "set-count-0.png";
   this.teamTwoSets.frameName = "set-count-0.png";	

   this.setAll('anchor.x', 0.5);
   this.setAll('anchor.y', 0.5);

   this.visible = false;
};

ScoreOverlay.prototype = Object.create(Phaser.Group.prototype);
ScoreOverlay.prototype.constructor = ScoreOverlay;

// ----------------------------------------------------
// Core create and update functions for ScoreOverlay.js
// ----------------------------------------------------

// ScoreOverlay.prototype.create = function(){
// console.log("ScoreOverlay created");
// // this.credfdate(50,276,'set-count-bg');


// }

ScoreOverlay.prototype.update = function() {
 
};


// ----------------------------------------------------
// Helper functions for ScoreOverlay.js
// ----------------------------------------------------

ScoreOverlay.prototype.updateScore = function(whichTeam, newScore){
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

ScoreOverlay.prototype.updateSet = function(whichTeam, newScore){
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

ScoreOverlay.prototype.showOverlay = function(){
	this.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 2, this.hideOverlay, this);
}

ScoreOverlay.prototype.hideOverlay = function(){
	this.visible = false;
}