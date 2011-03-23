
var Game = function (ctx) {
	var self = this;
	
	this.ctx = ctx;
	this._drawObjects = [];

	setInterval( function () {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		for (var i = 0; i < self._drawObjects.length; i++) {
			self._drawObjects[ i ].draw && self._drawObjects[ i ].draw();
		}
		
		self._onPostDrawCallback && self._onPostDrawCallback();
	}, 1000 / 75); // @TODO: Fps
}

Game.prototype = {
	
	addDrawObjects: function (objs) {
		var self = this,
			i =  0; 
			
		if (typeof objs === 'object' && objs.length === undefined) {
			this._drawObjects.push( objs );
		} else if (typeof objs === 'object' && objs.length > 0) {
			for (i; i < objs.length; i++) {
				this._drawObjects.push( objs[i] );	
			}
		}
	},
	
	onPostDraw: function (cb) {
		this._onPostDrawCallback = cb;
	}
};



window.Game = Game;