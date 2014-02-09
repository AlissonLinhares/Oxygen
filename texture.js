var Texture = function( src, definition ) {
	this.image = new Image();
	this.image.buffer = null;

	this.image.onload = function() {
		this.buffer = Oxygen.glCreateTextureBuffer( this, definition );
	}

	this.image.src = src;
}

Texture.prototype.getTextureBuffer = function() {
	return this.image.buffer;
}

Texture.HIGH_DEFINITION   = 2;
Texture.MEDIUM_DEFINITION = 1;
Texture.LOW_DEFINITION    = 0;
