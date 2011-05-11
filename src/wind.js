
var Wind = function (context) {
	this.ts_start = (new Date()).getSeconds();
	this.ts_now = this.ts_start;
	
	this.context = context;
	this.x = config.dimensions.width/2;
	this.y = 20;
    
    this.minMaxSpeed = 75;
    
    this.times = [];
    
    for(i=0;i<10;++i) {
    	this.times.push( Math.floor(Math.random()*99) );
    }
    
    this.windSpeed = 0;
    
    this.updateWind();
}

Wind.prototype = {
     setSpeed: function(speed) {
      //  this.windSpeed = speed;
        
/*
        console.log(window.location.hash && parseInt(window.location.hash.replace("#","")));
        this.windSpeed = parseInt(window.location.hash.replace("#",""));
*/
	},
	
	getSpeed: function() {
		return this.windSpeed;
	},
	
	updateWind: function() {
		var direction = Math.round(Math.random()),
			offset = Math.floor( Math.random() * this.minMaxSpeed );

		if (direction === 0) {
			this.windSpeed -= offset;
			
			if (this.windSpeed < -1 * this.minMaxSpeed) {
				this.windSpeed = -1 * this.minMaxSpeed;
			}
		} else {
			this.windSpeed += offset;
			
			if (this.windSpeed > this.minMaxSpeed) {
				this.windSpeed = this.minMaxSpeed;
			}
		}
	},
	
	draw: function() {
		var text = this.windSpeed > 0 ? ' ' + this.windSpeed + '»' : '«' + Math.abs(this.windSpeed) + ' ';
		
		// Save the context
        this.context.save();
        this.context.translate(0, 30);

        this.context.font = '30px Courier';
        this.context.textAlign = 'center';        
        this.context.beginPath();

        this.context.fillText(text, this.context.canvas.width / 2, 0);
        
        this.context.closePath();
        this.context.stroke();
        
        // Restore the context
        this.context.restore();
	}
};

window.Wind = Wind;