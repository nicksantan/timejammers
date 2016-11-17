// Reticle.js: a class for a reticle. It appears under an airborne disc.
var Reticle = function (game, x, y) {

	Phaser.Sprite.call(this, game, x, y, 'reticle');
	game.physics.arcade.enable(this);
  

};

Reticle.prototype = Object.create(Phaser.Sprite.prototype);
Reticle.prototype.constructor = Reticle;

// ----------------------------------------------------
// Core create and update functions for Reticle.js
// ----------------------------------------------------

Reticle.prototype.create = function(){
console.log("Reticle created");

}

Reticle.prototype.update = function() {
game.physics.arcade.overlap(this, game.state.states[game.state.current].testPlayer, this.playerOneEligible, null, this)
game.physics.arcade.overlap(this, game.state.states[game.state.current].testPlayerTwo, this.playerTwoEligible, null, this)

};

// ----------------------------------------------------
// Helper functions for Reticle.js
// ----------------------------------------------------

// This is a dumb way of doing this, but since the reticles belong to the player, I'm not sure how to test against the 'other player's' reticle. If anyone ever reads this, know I just did it to get the demo working in time.
Reticle.prototype.playerOneEligible = function(reticle,player){
	console.log("player one eleigible")
	game.state.states[game.state.current].testPlayer.specialEligible = true;

}

Reticle.prototype.playerTwoEligible = function(reticle,player){
	console.log("player two eleigible")
	game.state.states[game.state.current].testPlayerTwo.specialEligible = true;
}