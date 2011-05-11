
function Bullet( context, x, y, wind ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.wind = wind;
}

Bullet.prototype = {
    
    // Draw the bullet
    draw: function() {
        // Save the context
        this.context.save();
        
        this.context.translate( this.x, this.context.canvas.height - this.y );
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
    	this.velocityX -= this.wind.getSpeed() * dt;
        this.velocityY += (config.game.gravity * dt);
        
        
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