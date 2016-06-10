// Player.js: a class for an individual player
var Player = function (game, x, y, playerIdentifier) {

    Phaser.Sprite.call(this, game, x, y, 'dude');
    this.anchor.setTo(0.5,0.5);
    // used to designate this as player 1, 2, 3, or 4
    this.playerIdentifier = playerIdentifier;
  
    // Enable physics on player
    game.physics.arcade.enable(this);
    
    // Assign correct keymappings
    this.assignControls(this.playerIdentifier); 

    // Assign variables based on character chosen. For now, there are none.
    this.SPEED = 100;

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// ----------------------------------------------------
// Core create and update functions for Player.js
// ----------------------------------------------------


Player.prototype.update = function() {
    var movingLeft;
    var movingRight;
    var movingUp;
    var movingDown;
    var diagonalFactor;

    if (this.leftKey.isDown){
        movingLeft = true;
    }
    else if (this.rightKey.isDown){
        movingRight = true;
    } 

    if (this.upKey.isDown){
        movingUp = true;
    }
    else if (this.downKey.isDown){
       movingDown = true;
    } 

    if ((movingLeft || movingRight) && (movingUp || movingDown)){
        diagonalFactor = .75;
    } else {
        diagonalFactor = 1;
    }
    
    if (movingLeft){
        this.move("x", -1, diagonalFactor)
        this.scale.x = 1;
    } else if (movingRight){
        this.move("x", 1, diagonalFactor)
        this.scale.x = -1;
    } else {
        this.body.velocity.x = 0;
    }

    if (movingUp){
        this.move("y", -1, diagonalFactor)
    } else if (movingDown){
        this.move("y", 1, diagonalFactor)
    } else {
        this.body.velocity.y = 0;
    }
};

// ----------------------------------------------------
// Helper functions for Player.js
// ----------------------------------------------------

Player.prototype.assignControls = function(whichPlayer){

    // Assign the appropriate keys to this player;
    switch (whichPlayer){
        case 1:
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);        
        break;
        case 2:
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.M);        
        break;
        case 3:
        break;
        case 4:
        break;
    }
}

Player.prototype.move = function(dimension, direction, diagonalFactor){
    switch (dimension){
        case "x":
            this.body.velocity.x = direction * this.SPEED * diagonalFactor;
        break;
        case "y":
            this.body.velocity.y = direction * this.SPEED * diagonalFactor;
        break;
    }
}
