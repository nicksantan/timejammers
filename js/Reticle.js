// Reticle.js: a class for a reticle. It appears under an airborne disc.
var Reticle = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'star');

  

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
 
};

// ----------------------------------------------------
// Helper functions for Reticle.js
// ----------------------------------------------------
