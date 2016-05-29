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
        testPlayer = new Player(game,0,0,1);
        game.add.existing(testPlayer);
    },

    update: function () {
       // console.log("running?")
    },

    // ----------------------------------------------------
    // Helper functions for Game.js
    // ----------------------------------------------------

    createArena: function(whichArena){

     

        // Create a group to hold the walls
        this.walls = game.add.group();

        // Create the arena features based on which arena was chosen on the previous menu.
        switch (whichArena){
            case 1:
                // Draw four walls.
                this.wallOne = new Wall(game,0,0);
                this.wallOne.width = this.world.width;
                this.wallOne.height = 50;

                this.wallTwo = new Wall(game,0,this.world.height-50);
                this.wallTwo.width = this.world.width;
                this.wallTwo.height = 50;

                this.wallThree = new Wall(game,this.world.width-50,50);
                this.wallThree.width = 50;
                this.wallThree.height = this.world.height - 100;

                this.wallFour = new Wall(game,0,50);
                this.wallFour.width = 50;
                this.wallFour.height = this.world.height - 100;

                this.walls.add(this.wallOne);
                this.walls.add(this.wallTwo);
                this.walls.add(this.wallThree);
                this.walls.add(this.wallFour);

            break;
        }      
    },

    serveDisc: function(){
        // A sample helper function, to say, serve the disc at the beginning of a point.
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
