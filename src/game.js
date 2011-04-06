/**
 * Game - Framework for the game.
 */


var Game = function (context) {
	
	// Set variables
	this.context = context;
	this.timer = null;
	this.players = [];
	this.currentPlayer = -1;
	this.bullet = null;
	
	config.dimensions.width = context.canvas.width -200;
	config.dimensions.height = context.canvas.height * 0.5;
    
	// Create the mountain
    this.mountain = new Mountain( context, {
		x: config.map.padding.right,
		y: 0,
		width: context.canvas.width - (config.map.padding.right+config.map.padding.left),		// @todo: use the config for the "padding"
		height: context.canvas.height * 0.5
	});
    
	this.collision = collision;
	this.collision.addMap(this.mountain.generate());
	
	//Create Wind
	this.wind = new Wind(this.context, config.game.wind);
	
	// Add two players
	this.addPlayer(100, 0);
	this.addPlayer(context.canvas.width - 100, 0);
	
	this.currentPlayer = 0;
}

Game.prototype = {
	
	// Adds a player to the game
	addPlayer: function (x, y) {
		// @todo: randomize the x/y positions
		
		// Add a new turret
		var turret = new Turret( this.context, {
			x: x,
			y: y,
			color: config.turrets[ this.players.length ]
		});
		this.players.push(turret);
				
		// Set the current player
		if (this.currentPlayer === -1) {
			this.currentPlayer = 0;
		}
	},
	
	// Draw the objects
	draw: function () {
		var i;

		// Clear
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		
		// Background
		// @todo: what should go here?
		
		// Mountain
		this.mountain.draw();
		
		// Wind
		this.wind.draw();
		
		// Bullet
		// we draw the bullet before the turret so that it looks like the bullet is coming out of the turret ^^
		this.bullet && this.bullet.draw();
		if (this.bullet)
		{
			bumpTheCloud(this);	
		}
		
		// Turrets
		for (i = 0; i < this.players.length; i++) {
			this.players[i].draw();
		}
	},
	
	// Key was pressed
	keyDown: function (code) {
		if (this.currentPlayer === -1) return; // nobody is playing :(
		
		var player = this.players[ this.currentPlayer ];
		
		// Fire
		if (code === config.keycodes.space) {
			
			// Test shooting
			this.bullet = new Bullet( this.context, player.x, player.y + (config.turret.size / 2), this.wind );
			
			var angle = player.angle + 270; // @todo: this is not good; we need to standardise how we handle angles so we don't have to do a lot of math to compensate
			var rad = angle * Math.PI / 180;
			var power = player.power;
			
			this.bullet.fire(rad, power);
			this.firedBy = this.currentPlayer;
            if (this.currentPlayer === 0 ) {
            	this.currentPlayer = 1;
            }
            else {
            	this.currentPlayer = 0;
            }
		} else {		
			 // Power
			 player.actions.powerInc = (code === config.keycodes.up);
			 player.actions.powerDec = (code === config.keycodes.down);
			 
			 // Rotation
			 player.actions.angleDec = (code === config.keycodes.left);
			 player.actions.angleInc = (code === config.keycodes.right);
		}
	},
	
	// Key was released
	keyUp: function (code) {
		if (this.currentPlayer === -1) return; // nobody is playing :(
		
		// Just pass it on
		var player = this.players[ this.currentPlayer ];
				
		player.actions.powerInc = (code === config.keycodes.up) && false;
		player.actions.powerDec = (code === config.keycodes.down) && false;
			   
		// Rotation
		player.actions.angleDec = (code === config.keycodes.left) && false;
		player.actions.angleInc = (code === config.keycodes.right) && false;
	},
	
	// Start the game
	start: function () {
		var game = this,
			timeInterval = 1000 / config.game.fps;
			
		this.timer = setInterval(function () {
			game.draw();
			game.update( timeInterval / 1000 );
		}, timeInterval);
		
		// Capture keyboard events
		window.addEventListener('keydown', function (event) {
			game.keyDown(event.keyCode);
		}, true);
		
		window.addEventListener('keyup', function (event) {
			game.keyUp(event.keyCode);
		}, true);
	},
	
	// Update the game entities
	update: function (dt) {
		var i;
		
		// Wind
		this.wind.update();
		
		// Turrets
		for (i = 0; i < this.players.length; i++) {
			this.players[i].update(dt);
		}
		
		if ( !!(this.bullet && this.collision.hit(this.bullet.x-config.map.padding.left, this.bullet.y)) )
    	{
			return;
		}
		
		this.bullet && this.bullet.update(dt);
	},
};
