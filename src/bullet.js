
function Bullet( context, x, y ) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
}

Bullet.prototype = {
    
    draw: function() {
        // Save the context
        this.context.save();
        
//        this.context.translate( this.x, this.y );
        this.context.strokeStyle = '#666';
        this.context.fillStyle = '#f09';
        
        this.context.beginPath();
        
        this.context.arc( this.x, this.y, 2, 0, Math.PI*2, true);

        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        
        // Restore the context
        this.context.restore();
    },
    
    update: function( dt ) {
        
        // Modify velocity based on gravity
        this.velocityY += (980 * dt);
        
        // Move based on velocity
        this.x += (this.velocityX * dt);
        this.y += (this.velocityY * dt);
        
    },
    
    fire: function( angle, power ) {
        this.velocityX = power * Math.cos(angle);
        this.velocityY = power * Math.sin(angle);
    }
    
};