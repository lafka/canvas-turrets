
function Mountain( context, width, height ) {
    // Variables
    this.hash = ''; // @todo
    this.context = context;
    this.width = width;
    this.height = height;
    this.iter = 25; // x-axis iteration
    this.range = 50; // range for randomization
    this.mountain = [];
}

Mountain.prototype = {
    
    // Draw the mountain
    draw: function() {    	
        var m = this.generate();
        
        this.context.translate( 0, this.context.canvas.height );
                
        // Save the context
        this.context.save();
        
        this.context.strokeStyle = '#666';
        this.context.fillStyle = '#999';
        
        this.context.beginPath();
        
        for ( x in m ) {
            this.context.lineTo( x, -m[x] );
        }

        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        
        // Restore the context
        this.context.restore();
        
        this.context.translate( 0, -this.context.canvas.height );
    },
    
    // Builds the mountain
    generate: function( hash ) {
        
        if ( this.mountain.length != 0 ) return this.mountain;
        
        var mid = Math.round( this.width / this.iter / 2 ); // middle index
        
        // Generate the mountain
        
        this.mountain = [];
        this.mountain[0] = 0;
        for ( var x = this.iter; x < this.width; x += this.iter ) {
            // Determine random height
            var y = Math.floor( Math.random() * this.range );
            y = this.height - Math.round( this.height * ( Math.abs( (x/this.iter) - mid ) / mid ) + y );
            //var y = Math.floor( Math.random() * this.height ); // avoid the range
            
            this.mountain[x] = ( y > 0 ? y : 0 );
        }
        this.mountain[this.width] = 0;
        
        return this.mountain;
    }
};