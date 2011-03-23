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
        
        // The key doesent exists
        if ( map[x] === undefined ) {
            // Little hack to search for nearest based on map.iteration valu
        }
            
    }
};