
var Wind = function (context, speed) {
	this.ts_start = (new Date()).getSeconds();
	this.ts_now = this.ts_start;
	
	this.context = context;
	this.x = config.dimensions.width/2;
	this.y = 20;
    this.setSpeed(speed);
    
    
    this.times = [];
    
    for(i=0;i<10;++i) {
    	this.times.push( Math.floor(Math.random()*99) );
    }
    
}

Wind.prototype = {
     setSpeed: function(speed) {
        this.windSpeed = speed;
        
/*
        console.log(window.location.hash && parseInt(window.location.hash.replace("#","")));
        this.windSpeed = parseInt(window.location.hash.replace("#",""));
*/
	},
	
	getSpeed: function() {
		
		return this.windSpeed;
	},
	
	update: function() {
		++this.ts_now;
		var diff = this.ts_now - this.ts_start;
		if( diff > 100 )
		{
			
			if( diff > 200 )
			{
				this.setSpeed(-this.windSpeed);
				this.ts_now = this.ts_start;
				return true;
			}
			diff -=100;

			if (this.times.indexOf(diff)) {
				this.setSpeed( this.windSpeed - 5 );
			}
			/*
			if (this.ts_now % 2 === 1) {
				this.setSpeed( this.windSpeed - 5 );
			}
			*/
		}
	},
	
	draw: function() {
		// Save the context
        this.context.save();
        
        this.context.translate( this.x, this.y);
        this.context.strokeStyle = '#666';
        
        this.context.beginPath();
        
        var direction = '<----';
        if ( this.windSpeed < 0 )
        {
        	direction = '---->';
        }
        this.context.strokeText(direction,0,0);
        
        this.context.closePath();
        this.context.stroke();
        
        // Restore the context
        this.context.restore();
	}
};

window.Wind = Wind;