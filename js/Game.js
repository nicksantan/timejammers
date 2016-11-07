Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Game.prototype = {

    // ----------------------------------------------------
    // Core create and update functions for Game.js
    // ----------------------------------------------------

    create: function () {

        // Set window scale mode
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.windowConstraints.bottom = "visual";
       
        // Initialize physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create the arena depending on the chosen arena type
        this.createArena(game.arenaType);

        // Create the applicable number of players based on choices made at the main menu.
        // For now, just create a test player.
        this.testPlayer = new Player(game,200,200,1, 1);
        this.testPlayerTwo = new Player(game,500,200,2,2);
        


        this.players = game.add.group();
        this.players.add(this.testPlayer);
        this.players.add(this.testPlayerTwo);

        // for now, create a disc

        this.disc = new Disc(game,300,100)
        this.game.add.existing(this.disc);
        this.disc.body.velocity.x = 50;
        this.disc.body.velocity.y = 50;

        game.stage.smoothed = false;

        this.checkingForServe = true;

        // Keep track of this game's score and set count
        this.set = 1
        this.teamOneScore = 0;
        this.teamTwoScore = 0;
        this.teamOneSet = 0;
        this.teamTwoSet = 0;

        this.scoreOverlay = new ScoreOverlay(game);

        this.scoreOverlay.showOverlay();
    },

    update: function () {
       

        // Manage collisions
        
        // Player vs. boundary collisions
        game.physics.arcade.collide(this.players, this.walls, null, null, this);
        game.physics.arcade.collide(this.players, this.net, null, null, this);

        // Disc vs. boundary collisions
        // console.log(this.disc.catchable);
        if (this.disc.catchable){
            game.physics.arcade.overlap(this.disc, this.walls, this.disc.bounceOffWall, null, this.disc)
        }

        // Doesn't work right now

        // if (this.checkingForServe){
        //     console.log("Checking for serve")
        //     if (this.checkForServe()){
        //         this.checkingForServe = false;
        //         this.disc.serve();
        //     }
            
        // }


    },


    // ----------------------------------------------------
    // Helper functions for Game.js
    // ----------------------------------------------------

    checkForServe: function(){
        console.log("wooo")
        var readyToServe = false;
        this.players.forEach(function(plyr) {
            console.log("at start? " + plyr.atStartPosition);
            if(!plyr.atStartPosition){
               return false;
            } 
        }, this);
       return true;
    },

    createArena: function(whichArena){

        this.pirateBG = this.game.add.sprite(0,0,'pirate-ship-bg');

        // Create a group to hold the walls
        this.walls = game.add.group();

        // Create the arena features based on which arena was chosen on the previous menu.
        switch (whichArena){
            case 1:


                // Draw four walls.
                var wallWidth = 5;
                this.wallTop = new Wall(game,this.world.width/2,75, 0);
                this.wallTop.width = this.world.width;
                this.wallTop.height = wallWidth;

                this.wallBottom = new Wall(game,this.world.width/2,this.world.height-55, 0);
                this.wallBottom.width = this.world.width;
                this.wallBottom.height = wallWidth;

                this.wallRight = new Wall(game,this.world.width-65,this.world.height/2, 5, 2);
                this.wallRight.width = wallWidth;
                this.wallRight.height = this.world.height - wallWidth*2;

                this.wallLeft = new Wall(game,65,this.world.height/2, 5, 1);
                this.wallLeft.width = wallWidth;
                this.wallLeft.height = this.world.height - wallWidth*2;

                this.walls.add(this.wallTop);
                this.walls.add(this.wallBottom);
                this.walls.add(this.wallRight);
                this.walls.add(this.wallLeft);

                this.net = new Net(game,this.world.width/2,wallWidth)
                this.net.width = 5;
                this.net.height = this.world.height - wallWidth*2;
                this.game.add.existing(this.net);



            break;
        }      
    },
    scoreGoal: function(scoreValue, whichTeamGotScoredOn){
        console.log(scoreValue + " points were scored against team " + whichTeamGotScoredOn);
        switch(whichTeamGotScoredOn){
            case 1:
                this.teamTwoScore += scoreValue;
                this.scoreOverlay.updateScore(2,this.teamTwoScore);
            break;
            case 2:
                this.teamOneScore += scoreValue;
                this.scoreOverlay.updateScore(1,this.teamOneScore);
            break;
        }
        this.scoreOverlay.showOverlay();
        console.log("Team 1: " + this.teamOneScore + " Team 2: " + this.teamTwoScore);
        this.players.forEach(function(plyr) {
            plyr.returningToStartPosition = true;  
        }, this);

        this.checkingForServe = true;

        // Check for set win
        if (this.teamOneScore >= 12){
            this.teamOneSet += 1;
            this.scoreOverlay.updateSet(1,this.teamOneSet);
            game.time.events.add(Phaser.Timer.SECOND * 2, this.resetScoreOverlay, this);

        }
        if (this.teamTwoScore >= 12){
            this.teamTwoSet += 1;
            this.scoreOverlay.updateSet(2,this.teamTwoSet);
            game.time.events.add(Phaser.Timer.SECOND * 2, this.resetScoreOverlay, this);
           
        }
    },

    resetScoreOverlay: function(){
        this.teamTwoScore = 0;
        this.teamOneScore = 0;
        this.scoreOverlay.updateScore(1,0);
        this.scoreOverlay.updateScore(2,0);
    },

    serveDisc: function(){
        // A sample helper function, to say, serve the disc at the beginning of a point.
    },

    scoreMiss: function(){
        // Manage what happens when a player misses a lobbed disc.

    },
    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
