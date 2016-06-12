// Player.js: a class for an individual player
var Player = function (game, x, y, playerIdentifier, teamIdentifier) {

    Phaser.Sprite.call(this, game, x, y, 'dude');
    this.anchor.setTo(0.5,0.5);
    // used to designate this as player 1, 2, 3, or 4
    this.playerIdentifier = playerIdentifier;
    
    // used to designate which team the player is on
    this.teamIdentifier = teamIdentifier;

    switch (this.teamIdentifier){
        case 1:
            this.throwDirection = 1;
        break;
        case 2:
            this.throwDirection = -1;
        break;
    }

    // Enable physics on player
    game.physics.arcade.enable(this);
    
    // Assign correct keymappings
    this.assignControls(this.playerIdentifier); 

    // Assign variables based on character chosen. For now, there are none.
    this.SPEED = 100;
    this.POWER = 200;

    // Assign initial variable values
    this.canMove = true;
    this.hasDisc = false;
    this.justThrown = false;

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// ----------------------------------------------------
// Core create and update functions for Player.js
// ----------------------------------------------------


Player.prototype.update = function() {
    game.physics.arcade.overlap(this, game.state.states[game.state.current].disc, this.catchDisc, null, this)

    this.checkInput();
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
            this.throwKey = game.input.keyboard.addKey(Phaser.Keyboard.Q)        
        break;
        case 2:
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.K);
            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.M);        
            this.throwKey = game.input.keyboard.addKey(Phaser.Keyboard.U);        
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

Player.prototype.checkInput = function(){
    var movingLeft;
    var movingRight;
    var movingUp;
    var movingDown;
    var diagonalFactor;

    if (this.canMove){
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
    }

    if (this.hasDisc){
        if (this.throwKey.isDown){
            // for now, just throw the damn disc.
            this.throwDisc();
        }

    }
}

Player.prototype.catchDisc = function(player, disc){
    if (!this.justThrown){
        disc.kill();
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        //TODO activate correct animation state
        this.canMove = false;
        this.hasDisc = true;
    }
}

Player.prototype.throwDisc = function(){
    this.canMove = true; 
    this.hasDisc = false;
    var theDisc = game.state.states[game.state.current].disc;
    theDisc.revive();
    theDisc.position.x = this.position.x;
    theDisc.position.y = this.position.y;
    theDisc.body.velocity.y = 0;
    theDisc.body.velocity.x = this.throwDirection * this.POWER;
    this.justThrown = true;
    game.time.events.add(Phaser.Timer.SECOND, function(){this.justThrown = false}, this);



}