/**
 * Checks for collision
 * 
 * @author Olav Frengstad <olav.frengstad@07.no>
 * @version 0.1
 */
 
var collision = {
   
    /**
     * Storage for the map
     * 
     * @var map
     */
    map      : null,
    update   : 0,
   
    /**
     * Add the map
     * 
     * @param array map the map values
     * @return void
     */
    addMap   : function ( map ) {
        
        if ( 'object' !== typeof(map) && ( map instanceof Array ) ) {
            throw "WrongVariableType";
        } else if ( map.count === 0 ) {
            throw "EmptyVariable";
        }
        
        this.map = map;
    },
   
    /**
     * Returns the map
     *
     * @return array the map
     */
    getMap   : function () {
        if ( null === this.map )
        {
            throw "MapNotLoaded";
        }
       
        return this.map;
    },
   
    /**
     * Checks if the co-ordinates will hit
     *   
     * @param integer x the x-axis position
     * @param integer y the y-axis position
     * @return boolean 
     */
    hit      : function ( x, y ) {
        var map = this.getMap();
        x = Math.floor(x);
        
        if ( map[x] < 0 || x < 0 || x > game.context.canvas.width )
        {
            return true;
        }
        
        // The key doesent exists, that means an indirect match
        if ( map[x] === undefined ) {
            
            // Little hack to search for nearest based on map.iteration value
            var next        = ( config.map.iteration*Math.ceil(x/config.map.iteration) );
            var prev        = ( config.map.iteration*Math.floor(x/config.map.iteration) );
            var match       = config.map.iteration*Math.round(x/config.map.iteration);
        
            // If the closes iteration point is comming up
            if ( (next-x) < (x-prev) ) {
                // Calculate the value of each point on path
                var diff    = (map[next]-map[prev])/config.map.iteration;
                var value   = diff*(next-x);
                
                if ( (map[next]-value) >= y ) {
                    return true;
                }
            } else if ( (next-x) > (x-prev) ) {
                var diff    = (map[prev]-map[next])/config.map.iteration;
                var value   = diff*(x-prev);
                
                if ( (map[prev]-value) >= y ) {
                    return true;
                }
            } else {
                return true;
            }
            
        } else {
            if ( map[x] > y ) {
                return true;    
            }
        }
        
        return false;
    }
};

window.collision = collision;
