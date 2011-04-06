var Turret = function (ctx, identifier, settings) {
	Turret.turrets.push( this );
	Turret._turretRef[ identifier ] = this;
	
	this.ctx = ctx;
	
	this.x = settings.x || 0;
	this.y = settings.y || 0;
	this.color = settings.color || '#666';
	this.angle = this.rotateVal = 0;
	this.angleInc = 5;
	this.incKeyDown = this.decKeyDown = false;
	this.actions = {
	   powerInc: false,
	   powerDec: false,
	   angleInc: false,
	   angleDec: false,
	};
	
	// Power values
	this.power = config.turret.minPower;

	this.draw();
};

// Static properties
Turret.activeTurret = undefined;
Turret.turrets = [];

Turret._turretRef = {};

Turret.getTurret = function (turret) {
	return Turret._turretRef[ turret ] || false;
}

Turret.prototype = {
	draw: function () {
		var ctx = this.ctx;				
			self = this;		
		
		ctx.save();
		
		ctx.translate( this.x, ctx.canvas.height - this.y - config.turret.size );	
		
		// Canon
		ctx.save();
		
		//ctx.fillStyle = 'rgb(0, 0, 0)';	
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(0, config.turret.size, config.turret.size, 2 * Math.PI , Math.PI, true);
		ctx.fill();
		
		ctx.restore();
		
		// Body
		ctx.save();
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.translate( 0, config.turret.size / 2 );
		ctx.rotate( self.rotateVal );
		ctx.fillRect( -5, -config.turret.size, 10, config.turret.size); 
								
		ctx.restore();
		
		// Power text
		ctx.fillText(self.power, 10, -50);	
		
		ctx.restore();
	},
	
	update: function (dt) {
	   
	   // Power
	   if (this.actions.powerInc && this.power < config.turret.maxPower) {
			this.power = this.power + config.turret.powerInc;
		}
		else if (this.actions.powerDec && this.power > config.turret.minPower) {
			this.power = this.power - config.turret.powerInc;
		}
	   
	   // Rotation
	   if (this.actions.angleInc && self.angle < 90) {
			self.angle += config.turret.angleInc;
			self.rotateVal = Math.PI / 180 * ( self.angle );
		} else if (this.actions.angleDec && self.angle > -90) {
			self.angle -= config.turret.angleInc;
			self.rotateVal = Math.PI / 180 * ( self.angle );
		}
	}
};
	
window.Turret = Turret;