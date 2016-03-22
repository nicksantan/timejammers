// Baddie.js: a class for a player-seeking bad dude.
var Baddie = function (game, x, y, playerRef) {

    this.playerRef = playerRef;
    Phaser.Sprite.call(this, game, x, y, 'baddie');
    game.physics.arcade.enable(this);
    this.body.maxVelocity.x= 100;
    this.body.maxVelocity.y= 100;
    this.body.bounce.x = 2.8;
    this.body.bounce.y = 2.8;
};

Baddie.prototype = Object.create(Phaser.Sprite.prototype);
Baddie.prototype.constructor = Baddie;

// Baddie.prototype.create = function(){
//     this.Baddie_sfx.play();
// }
/**
 * Automatically called by World.update
 */
Baddie.prototype.update = function() {
 
    if (this.playerRef.x > this.x){
        this.body.acceleration.x = 100;
        this.frame = 3;
    } else {
        this.body.acceleration.x = -100;
        this.frame = 0;
    }

    if (this.playerRef.y > this.y){
        this.body.acceleration.y = 100;
    } else {
        this.body.acceleration.y = -100;
    }

};
