/**
 * Checks for collision
 * 
 * @author Olav Frengstad <olav.frengstad@07.no>
 * @version 0.1
 */
 
 collision = {
   
    /**
     * Storage for the map
     * 
     * @var map
     */
    map      : null,
   
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
        
        // The key doesent exists, that means an indirect match
        if ( map[x] === undefined ) {
            
            // Little hack to search for nearest based on map.iteration value
            var match = config.map.iteration*Math.ceil(x/config.map.iteration);
            var divider, result, pos;
            
            //  Draw the line here....
            if ( match < config.map.iteration ) {
                pos     = x;
            } else {
                pos    = match-x;
            }
            
            divider = x/config.map.iteration;
            result  = divider*(match-pos);
            console.log( '_pos: ' + pos + ' match: ' + match + " results in: " + result + " (divider = " + divider + ")");
            if ( map[match] > result ) {
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