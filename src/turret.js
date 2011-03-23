var Turret = function (ctx, settings) {		
	this.ctx = ctx;
	this.settings = settings;
	
	this.angle = this.rotateVal = 0;
	this.angleInc = 5;
	this.incKeyDown = this.decKeyDown = false;
	
	// Power values
	this.power = 0;
	this.MAX_POWER_VALUE = 100;
	this.MIN_POWER_VALUE = 0;

	this.draw();		
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
		ctx.rotate( self.rotateVal );
		ctx.fillRect( -5, -30, 10, 30 ); 
								
		ctx.restore();
		
		// Power text
		ctx.fillText(self.power, 10, -50);	
		
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
	
window.Turret = Turret;