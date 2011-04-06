/**
 *	@TODO:
 *		- Min value doesn't do anything
 *		- Settings for stuff like height, width etc.
 *		- Orientation
 *		- Gradient
 *		- Relative position
 */

var StatusBar = function (ctx, x, y) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	
	this.value = 100;
	this.height = 50;
};

StatusBar.prototype = {
	setMinMaxValues: function (min, max) {
		this.min = min;
		this.max = max;
	},
	
	setOrientation: function (orientation) {
	
	},
	
	draw: function () {
		var ctx = this.ctx,
	
			percentOfMax = this.value / this.max * 100,
			height = this.height / 100 * percentOfMax;
		
		ctx.save();
		
		ctx.fillStyle = 'rgb(20, 220, 20)';			
		ctx.fillRect(this.x, this.y, 10, -height);
		
		ctx.restore();
	}
};

window.StatusBar = StatusBar;