jQuery( function ($) {
	var Turrets = {
		turrets: [],
		
		createTurret: function (ctx, options) {
			this.turrets.push( new Turret( ctx, options ) );
		},
		
		setActiveTurret: function (turret) {
			
		}
	};
	
	Turrets.prototype = {
		
	};
	
	var Turret = function (ctx, settings) {
		var self = this;
		
		this.angle = this.rotateVal = 0;
		this.ctx = ctx;
		this.settings = settings;
		
		this.angleInc = 5;
		this.incKeyDown = this.decKeyDown = false;
		
		this.power = 0;
		this.MAX_POWER_VALUE = 100;
		this.MIN_POWER_VALUE = 0;
	
		self.draw();		
	};
	
	Turret.prototype = {
		draw: function () {
			var ctx = this.ctx;				
				self = this;		
			
			ctx.translate( this.settings.x, this.settings.y );	
			
			// Canon
			ctx.save();
			
			ctx.fillStyle = 'rgb(0, 0, 0)';	
			ctx.beginPath();
			ctx.arc(0, 30, 40, 2 * Math.PI , Math.PI, true);
			ctx.fill();
			
			ctx.restore();
			
			// Body
			ctx.save();
			ctx.fillStyle = 'rgb(100, 100, 30)';
			
			if (self.incKeyDown && self.angle < 90) {
				self.angle += self.angleInc;
				self.rotateVal = Math.PI / 180 * ( self.angle );
			} else if (self.decKeyDown && self.angle >= -85) {
				self.angle -= self.angleInc;
				self.rotateVal = Math.PI / 180 * ( self.angle );
			}
			ctx.rotate(self.rotateVal);
			ctx.fillRect( -5, -30, 10, 30 ); 
						
			ctx.restore();
			
			ctx.fillText(self.power, 10, 50);
			
			
			ctx.translate( -this.settings.x, -this.settings.y );
		},
		
		incPower: function (n) {
			if ( this.power < this.MAX_POWER_VALUE ) {
				this.power = this.power + ( n || 10 );
			}
		},
		
		decPower: function (n) {
			if ( this.power > this.MIN_POWER_VALUE ) {
				this.power = this.power - ( n || 10 );
			}
		}
	};
		
/*
	setInterval( function () {
		ctx.clearRect(0,0,500,500);
		turret.draw();
		turret1.draw();
	}, 100);
*/
	
	$( window ).bind('keydown keyup', function (e) {
		if (e.keyCode === 39) {
			turret.incKeyDown = e.type === 'keydown';
			e.preventDefault();
		} else if (e.keyCode === 37) {
			turret.decKeyDown = e.type === 'keydown';
			e.preventDefault();
		}
		
		if (e.keyCode === 38 && e.type === 'keyup') {
			turret.incPower();
			e.preventDefault();
		} else if (e.keyCode === 40 && e.type === 'keyup') {
			turret.decPower();
			e.preventDefault();
		}		
		
		if (e.keyCode === 68) {
			turret1.incKeyDown = e.type === 'keydown';
			e.preventDefault();
		} else if (e.keyCode === 65) {
			turret1.decKeyDown = e.type === 'keydown';
			e.preventDefault();
		}
	
		if (e.keyCode === 87 && e.type === 'keyup') {
			turret1.incPower();
			e.preventDefault();
		} else if (e.keyCode === 83 && e.type === 'keyup') {
			turret1.decPower();
			e.preventDefault();
		}
	});
	
	window.Turret = Turret;
});