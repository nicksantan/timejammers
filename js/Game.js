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

        this.cameraCounter = 0;
        // Set window scale mode
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.windowConstraints.bottom = "visual";
       // was
        //game.world.resize(768, 600); 844 475
        game.world.setBounds(-38, -21, 844, 475)
        // Initialize physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create the arena depending on the chosen arena type
        this.createBackgroundElements(game.arenaType);
      


        // Create some variables to manage the state of the game
        this.gameIsOver = false;

        // Create the applicable number of players based on choices made at the main menu.
        // For now, just create a test player.
        this.testPlayer = new Player(game,this.game.width*1/4,200,1, 1);
        this.testPlayerTwo = new Player(game,this.game.width*3/4,200,2,2);

        this.players = game.add.group();
        this.players.add(this.testPlayer);
        this.players.add(this.testPlayerTwo);



        // for now, create a disc

        this.disc = new Disc(game,this.game.width/2,this.game.height/2)
        this.game.add.existing(this.disc);
        this.disc.body.velocity.x = 0;
        this.disc.body.velocity.y = 0;
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){this.disc.serve(1)}, this);

        this.createForegroundElements(game.arenaType);

        // Create a group to hold the walls
        this.walls = game.add.group();

        // Create a group to hold all deflectors
        this.deflectors = game.add.group();
        
        this.createArena(game.arenaType);

        game.stage.smoothed = false;

        this.checkingForServe = true;

        // Keep track of this game's score and set count
        this.set = 1
        this.teamOneScore = 0;
        this.teamTwoScore = 0;
        this.teamOneSet = 0;
        this.teamTwoSet = 0;

        this.scoreOverlay = new ScoreOverlay(game);

        //this.scoreOverlay.showOverlay();

        // Create UI elements such as player portraits
        // TODO this should be based on data from the previous screen
        this.playerOnePortrait = new PlayerPortrait(game, "guber", 1)
       // this.playerOnePortrait.x = 0;
        this.playerTwoPortrait = new PlayerPortrait(game, "guber", 4)
       // this.playerTwoPortrait.x = 580;

    },

    update: function () {
        //game.debug.body(this.testPlayer);
        this.camera.y = Math.sin(game.time.now / 1000) * 10;
         //console.log(Math.sin(game.time.now / 1000) * 10)
        // Manage collisions
        
        // Player vs. boundary collisions
        game.physics.arcade.collide(this.players, this.walls, null, null, this);
        game.physics.arcade.collide(this.players, this.net, null, null, this);

        // Disc vs. boundary collisions
        // Should this be in the disc class?
        if (this.disc.catchable){
            game.physics.arcade.overlap(this.disc, this.walls, this.disc.bounceOffWall, null, this.disc)
        }

        // Disc vs. deflector collisions
        game.physics.arcade.overlap(this.disc, this.deflectors, this.disc.deflect, null, this.disc)

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

    createBackgroundElements: function(whichArena){
        switch(whichArena){
            case 1:
                this.pirateBG = this.game.add.sprite(this.game.width/2,this.game.height/2,'jewel-of-rabat-BASE');
                this.pirateBG.anchor.setTo(0.5,0.5);
            break;
        }
    },

    createForegroundElements: function(whichArena){
        switch(whichArena){
            case 1:
                this.pirateDecks = this.game.add.sprite(this.game.width/2,this.game.height/2,'jewel-of-rabat-LR-DECKS');
                this.pirateFront = this.game.add.sprite(this.game.width/2,this.game.height/2,'jewel-of-rabat-FRONT');
                this.pirateMast = this.game.add.sprite(this.game.width/2,this.game.height/2,'jewel-of-rabat-MAST');
                this.pirateDecks.anchor.setTo(0.5,0.5);
                this.pirateFront.anchor.setTo(0.5,0.5);
                this.pirateMast.anchor.setTo(0.5,0.5);
            break;
        }
    
    },

    createArena: function(whichArena){

      

      

        // Create the arena features based on which arena was chosen on the previous menu.
        switch (whichArena){
            case 1:


                // Draw four walls.
                var wallWidth = 5;
                this.wallTop = new Wall(game,this.game.width/2,75, 0);
                this.wallTop.width = this.game.width;
                this.wallTop.height = wallWidth;

                this.wallBottom = new Wall(game,this.game.width/2,this.game.height-55, 0);
                this.wallBottom.width = this.game.width;
                this.wallBottom.height = wallWidth;

                this.wallRight = new Wall(game,this.game.width-65,125, 5, 2);
                this.wallRight.width = wallWidth;
                this.wallRight.height = 100;

                this.wallRightTwo = new Wall(game,this.game.width-65,237, 3, 2);
                this.wallRightTwo.width = wallWidth;
                this.wallRightTwo.height = 125;

                this.wallRightThree = new Wall(game,this.game.width-65,350, 5, 2);
                this.wallRightThree.width = wallWidth;
                this.wallRightThree.height = 100;

                this.wallLeft = new Wall(game,65,125, 3, 1);
                this.wallLeft.width = wallWidth;
                this.wallLeft.height = 100;

                this.wallLeftTwo = new Wall(game,65,237, 5, 1);
                this.wallLeftTwo.width = wallWidth;
                this.wallLeftTwo.height = 125;

                this.wallLeftThree = new Wall(game,65,350, 3, 1);
                this.wallLeftThree.width = wallWidth;
                this.wallLeftThree.height = 100;

                this.walls.add(this.wallTop);
                this.walls.add(this.wallBottom);
                this.walls.add(this.wallRight);
                this.walls.add(this.wallRightTwo);
                this.walls.add(this.wallRightThree);
                this.walls.add(this.wallLeft);
                this.walls.add(this.wallLeftTwo);
                this.walls.add(this.wallLeftThree);

                this.net = new Net(game,this.game.width/2,wallWidth)
                this.net.width = 5;
                this.net.height = this.game.height - wallWidth*2;
                this.game.add.existing(this.net);

                this.deflector = new Deflector(game,game.width/2,game.height/2, 50, 50, 2);
                this.deflectors.add(this.deflector)

            break;
        }      

        this.walls.visible = false;
        this.net.visible = false;
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
        game.world.bringToTop(this.scoreOverlay)
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

        if (this.teamTwoSet >= 3 || this.teamOneSet >= 3){
            //present win graphics.
            this.gameIsOver = true;
            game.time.events.add(Phaser.Timer.SECOND * 5, this.quitGame, this);
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
