var Texture = function( src ) {
	var image = new Image();
	var textureBuffer = null;

	image.onload = function() {
		textureBuffer = Oxygen.glCreateTextureBuffer( image, 0 );
	}

	image.src = src;

	Texture.prototype.getTextureBuffer = function() {
		return textureBuffer;
	}
}

