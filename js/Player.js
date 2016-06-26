// Player.js: a class for an individual player
var Player = function (game, x, y, playerIdentifier, teamIdentifier) {

    Phaser.Sprite.call(this, game, x, y, 'sirknight4');
    this.anchor.setTo(0.5,0.5);
    this.smoothed = false;
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
    this.body.drag.x = 2000;
    
    // Assign correct keymappings
    this.assignControls(this.playerIdentifier); 

    // Assign variables based on character chosen. For now, there are none.
    this.SPEED = 200;
    this.POWER = 200;
    this.HOLDTHRESHOLD = 1000;

    this.animations.add('walk');
    this.animations.play('walk', 5, true);

    // Assign initial variable values
    this.canMove = true;
    this.hasDisc = false;
    this.isDashing = false;
    this.justThrown = false;
    this.primaryKeyPreviouslyHeld = false;
    this.catchTime = 0;

    // create a reticle to use later
    this.reticle = game.add.sprite(0, 0, 'reticle');
    this.reticle.anchor.setTo(0.5,0.5)
    this.reticle.animations.add('fire');

    this.reticle.kill();

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// ----------------------------------------------------
// Core create and update functions for Player.js
// ----------------------------------------------------


Player.prototype.update = function() { 
    if (game.state.states[game.state.current].disc.catchable){
        game.physics.arcade.overlap(this, game.state.states[game.state.current].disc, this.catchDisc, null, this)
    }
    this.checkInput();
    this.endDash();

   
};

// ----------------------------------------------------
// Helper functions for Player.js
// ----------------------------------------------------

Player.prototype.assignControls = function(whichPlayer){

    // Assign the appropriate keys to this player;
    switch (whichPlayer){
        case 1:
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.primaryKey = game.input.keyboard.addKey(Phaser.Keyboard.Q)   
            this.secondaryKey =game.input.keyboard.addKey(Phaser.Keyboard.E);     
        break;
        case 2:
            this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
            this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
            this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
            this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.K);        
            this.primaryKey = game.input.keyboard.addKey(Phaser.Keyboard.U); 
            this.secondaryKey =game.input.keyboard.addKey(Phaser.Keyboard.O);            
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
    
    if (this.canMove){
        if (movingLeft){
            this.move("x", -1, diagonalFactor)
            this.scale.x = -1;
        } else if (movingRight){
            this.move("x", 1, diagonalFactor)
            this.scale.x = 1;
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

    if (this.hasDisc && !this.isDashing){
        if (this.primaryKey.isDown && !this.primaryKeyPreviouslyHeld){
            this.throwDisc(movingUp, movingDown, diagonalFactor);
            this.primaryKeyPreviouslyHeld = true;
        } else if (this.secondaryKey.isDown && !this.secondaryKeyPreviouslyHeld){
            this.lobDisc(movingUp, movingDown, diagonalFactor);
            this.secondaryKeyPreviouslyHeld = true;
        }

    } 

    if (!this.hasDisc && !this.isDashing && this.canMove && !this.justThrown){
        if (this.primaryKey.isDown && !this.primaryKeyPreviouslyHeld){
            this.isDashing = true;
            this.canMove = false;
            if (movingUp){
                this.body.velocity.y = -700 * diagonalFactor;
            } else if (movingDown){
                this.body.velocity.y = 700 * diagonalFactor;
            }

            if (movingLeft){
                this.body.velocity.x= -700 * diagonalFactor;
            } else if (movingRight){
                this.body.velocity.x = 700 * diagonalFactor;
            }

            this.primaryKeyPreviouslyHeld = true;
        }

    }

    if (this.primaryKey.isUp && this.primaryKeyPreviouslyHeld){
        this.primaryKeyPreviouslyHeld = false;
    }

     if (this.secondaryKey.isUp && this.secondaryKeyPreviouslyHeld){
        this.secondaryKeyPreviouslyHeld = false;
    }
}

Player.prototype.catchDisc = function(player, disc){
    if (!this.justThrown){
        disc.kill();
        // this.body.velocity.x = 0;
        // this.body.velocity.y = 0;
        //TODO activate correct animation state
        this.canMove = false;
        this.hasDisc = true;
        // keep track of when the disc was caught
        this.catchTime = game.time.time;

    }
}

Player.prototype.endDash = function(){
    if (this.isDashing && this.body.velocity.x == 0 & this.body.velocity.y == 0){
        this.isDashing = false;
        if (!this.hasDisc){
            this.canMove = true;
        }
    }
}

Player.prototype.reviveDisc = function(){
    this.canMove = true; 
    this.hasDisc = false;
    var theDisc = game.state.states[game.state.current].disc;
    theDisc.revive();
    theDisc.position.x = this.position.x;
    theDisc.position.y = this.position.y;
    return theDisc;
}

Player.prototype.calculateHoldBonus = function(){
    // determine how long the character held the disc.
    var holdTime = game.time.time - this.catchTime;
    var holdBonus;
    if (holdTime > this.HOLDTHRESHOLD){
        holdBonus = 1;
    } else {
        // will range from ~1.9 (fast release) to ~1 (slow release)
        holdBonus = 2 + (1 - (holdTime / this.HOLDTHRESHOLD))
    }

    return holdBonus;

}

Player.prototype.lobDisc = function(movingUp, movingDown, diagonalFactor){
    var theDisc = this.reviveDisc();
    var holdBonus = this.calculateHoldBonus();
    console.log ("lobbing")
    // choose a 'landing spot' for the lob
    var destY;
    console.log("height is " + game.world.height)
    if (movingUp) {
        //TODO: Get bounds of the level here. Right now, use the hardcoded values y = 81 to y = game.world.height - 81
        destY = 81 + Math.random()*((1/3) * game.world.height-162);
    } else if (movingDown){
        destY = 81 + ((2/3) * game.world.height-162) + Math.random()*((1/3) * game.world.height-162);
    } else {
        destY = game.world.height/2 + Math.random()*100 - 50;

    }

    //TODO: Get bounds of the level here. Right now use the hardcoded value of game.world.width-89 as the far net
    var destX;
    switch(this.throwDirection){
        case 1:
            destX = (game.world.width-50) + (holdBonus * 20)
        break;
        case -1:
            destX = 139 - (holdBonus*20);
        break;
    }


    // move the reticle to the location    
    this.reticle.position.x = destX;
    this.reticle.position.y = destY;
    this.reticle.revive();
    this.reticle.animations.play('fire', 15, true);
    this.reticle.animations.currentAnim.onComplete.add(function () {  this.reticle.kill();}, this);

    // determine direction to the reticle
     distanceVec = new Phaser.Point(this.x - destX, this.y - destY);
     normalizedVec = distanceVec.normalize();

    theDisc.body.velocity.y = distanceVec.y * -300;
    theDisc.body.velocity.x = distanceVec.x * -300;
    this.justThrown = true;
    game.time.events.add(Phaser.Timer.SECOND*.5, function(){this.justThrown = false}, this);
    theDisc.catchable = false;
    theDisc.nextX = destX;
    theDisc.nextY = destY;

    theDisc.distanceToReticle = new Phaser.Point(this.x - destX, this.y - destY).getMagnitude();


}

Player.prototype.throwDisc = function(movingUp, movingDown, diagonalFactor){
    var theDisc = this.reviveDisc();

    var holdBonus = this.calculateHoldBonus();
   
    // get direction from keys pressed
    var yVel;
    if (movingUp){
        yVel = -1 * this.POWER;
    } else if (movingDown){
        yVel = 1 * this.POWER;
    } else {
        yVel = 0;
    }

    theDisc.body.velocity.y = yVel * holdBonus * diagonalFactor;
    theDisc.body.velocity.x = this.throwDirection * holdBonus * this.POWER * diagonalFactor;
    this.justThrown = true;
    game.time.events.add(Phaser.Timer.SECOND*.5, function(){this.justThrown = false}, this);



}