/**
 * Config values
 * 
 * @author Olav Frengstad <olav.frengstad@07.no>
 * @version 0.1
 */
 
config = {
    // General game settings
    game : {
        fps     : 75,
        wind    : -3,
        gravity : 980,
    },
    
    //  Map values
    map : {
        iteration   : 25,       // x-axis iteration
        range       : 50,       // randomization range
        stroke      : '#666',
        color       : '#999',
        padding     : { right : 100, left :  100 }
    },
    
    // Turret settings
    turret : {
        size     : 30,
        angleInc : 1,
        powerInc : 5,
        minPower : 0,
        maxPower : 1000,
    },
    
    // Turret colors
    turrets : [ '#d00', '#0d0', '#00d' ],
    
    // Keyboard codes
    keycodes : {
        space : 32,
        left  : 37,
        up    : 38,
        right : 39,
        down  : 40,
    },
};