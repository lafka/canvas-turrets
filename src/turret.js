var Turret = function (ctx, settings) {
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

Turret.prototype = {
	draw: function () {
		var ctx = this.ctx;		
		
		ctx.save();
		
		ctx.translate( this.x, ctx.canvas.height - this.y - config.turret.size );	
		
		// Canon
		ctx.save();
		
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(0, config.turret.size, config.turret.size, 2 * Math.PI , Math.PI, true);
		ctx.fill();
		
		ctx.restore();
		
		// Body
		ctx.save();
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.translate( 0, config.turret.size / 2 );
		ctx.rotate( this.rotateVal );
		ctx.fillRect( -5, -config.turret.size, 10, config.turret.size); 
								
		ctx.restore();
		
		// Power text
		ctx.fillText( this.power, 10, -50 );	
		
		ctx.restore();
	},
	
	update: function (dt) {
		// Power
		if (this.actions.powerInc && this.power < config.turret.maxPower) {
			this.power = this.power + config.turret.powerInc;
		} else if (this.actions.powerDec && this.power > config.turret.minPower) {
			this.power = this.power - config.turret.powerInc;
		}
		
		// Rotation
		if (this.actions.angleInc && this.angle < 90) {
			this.angle += config.turret.angleInc;
			this.rotateVal = Math.PI / 180 * ( this.angle );
		} else if (this.actions.angleDec && this.angle > -90) {
			this.angle -= config.turret.angleInc;
			this.rotateVal = Math.PI / 180 * ( this.angle );
		}
	}
};
	
window.Turret = Turret;