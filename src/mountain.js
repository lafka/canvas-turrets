/**
 * Mountain
 */

function Mountain( context, settings ) {
    // Variables
    this.hash = ''; // @todo
    this.context = context;
    this.x = ( settings.x ? settings.x : 0 );
    this.y = ( settings.y ? settings.y : 0 );
    this.width = ( settings.width ? settings.width : context.canvas.width );
    this.height = ( settings.height ? settings.height : context.canvas.height );
    this.mountain = [];
}

Mountain.prototype = {
    
    // Draw the mountain
    draw: function() {
        var m = this.mountain.length > 0 ? this.mountain : this.generate();
        
        // Save the context
        this.context.save();
        
        // Move to the starting location
        this.context.translate( this.x, this.context.canvas.height - this.y );
        
        // Set colors
        this.context.strokeStyle = '#666';
        this.context.fillStyle = '#999';
        
        // Create the path
        this.context.beginPath();
        for ( x in m ) {
            this.context.lineTo( x, -m[x] );
        }
        this.context.closePath();
        
        // Color it in
        this.context.stroke();
        this.context.fill();
        
        // Restore the context
        this.context.restore();
    },
    
    // Builds the mountain
    generate: function( hash ) {
        
        // if ( this.mountain.length != 0 ) return this.mountain;
        
        // Middle index
        var mid = Math.round( this.width / config.map.iteration / 2 );
        
        // Generate the mountain
        this.mountain = [];
        this.mountain[0] = 0;
        for ( var x = config.map.iteration; x < this.width; x += config.map.iteration ) {
            
            // Determine random height
            var y = Math.floor( Math.random() * config.map.range );
            y = this.height - Math.round( this.height * ( Math.abs( (x/config.map.iteration) - mid ) / mid ) + y );
            
            //var y = Math.floor( Math.random() * this.height ); // use this to ignore the range
            
            this.mountain[x] = ( y > 0 ? y : 0 );
        }
        this.mountain[this.width] = 0;
        
        return this.mountain;
    }
};