var Turret = function (ctx, settings) {		
	this.ctx = ctx;
	
	this.x = (settings.x ? settings.x : 0);
	this.y = (settings.y ? settings.y : 0);
	this.color = (settings.color ? settings.color : '#666');
	this.angle = this.rotateVal = 0;
	this.angleInc = 5;
	this.incKeyDown = this.decKeyDown = false;
	this.keys = {
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
	
	update: function(dt) {
	   
	   // Power
	   if (this.keys.powerInc && this.power < config.turret.maxPower) {
			this.power = this.power + config.turret.powerInc;
		}
		else if (this.keys.powerDec && this.power > config.turret.minPower) {
			this.power = this.power - config.turret.powerInc;
		}
	   
	   // Rotation
	   if (this.keys.angleInc && self.angle < 90) {
			self.angle += config.turret.angleInc;
			self.rotateVal = Math.PI / 180 * ( self.angle );
		} else if (this.keys.angleDec && self.angle >= -85) {
			self.angle -= config.turret.angleInc;
			self.rotateVal = Math.PI / 180 * ( self.angle );
		}
	},
	
	// Key was pressed
    keyDown: function(code) {
        
        // Power
        if ( code == config.keycodes.up ) {
            this.keys.powerInc = true;
        } else if ( code == config.keycodes.down ) {
            this.keys.powerDec = true;
        }
        
        // Rotation
        else if ( code == config.keycodes.left ) {
            this.keys.angleDec = true;
        } else if ( code == config.keycodes.right ) {
            this.keys.angleInc = true;
        }
        
    },
    
    // Key was released
    keyUp: function(code) {
        
        // Power
        if ( code == config.keycodes.up ) {
            this.keys.powerInc = false;
        } else if ( code == config.keycodes.down ) {
            this.keys.powerDec = false;
        }
        
        // Rotation
        else if ( code == config.keycodes.left ) {
            this.keys.angleDec = false;
        } else if ( code == config.keycodes.right ) {
            this.keys.angleInc = false;
        }
        
    },
};
	
window.Turret = Turret;