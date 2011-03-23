
function Bullet( context, x, y ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
}

Bullet.prototype = {
    
    // Draw the bullet
    draw: function() {
        // Save the context
        this.context.save();
        
        this.context.translate( this.x, 600 -this.y ); // @todo: change this 600 to be the height of our canvas
        this.context.strokeStyle = '#666';
        this.context.fillStyle = '#f09';
        
        this.context.beginPath();
        
        this.context.arc( 0, 0, 2, 0, Math.PI*2, true);

        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        
        // Restore the context
        this.context.restore();
	},
    
    // Update the bullet
    update: function( dt ) {
        
        console.log( 'pos: ' + this.x + 'x' + this.y);
        
        // Modify velocity based on gravity
        this.velocityY += (980 * dt);
        
        // Move based on velocity
        this.x += (this.velocityX * dt);
        this.y -= (this.velocityY * dt);
        
    },
    
    // Fire the bullet (set initial velocities)
    fire: function( angle, power ) {
        this.velocityX = power * Math.cos(angle);
        this.velocityY = power * Math.sin(angle);
    }
    
};