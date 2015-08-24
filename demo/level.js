var Level = function () {
	// this.sound = new Sound( "sounds/BlankCanvas.ogg" )
	this.tileset = new TileSet( "tiles/terrain.xml" );
};

Level.prototype.objects = [];
Level.prototype.sound   = null;
Level.prototype.map     = [
		[24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
		[24, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23],
		[24, 23, 23, 23, 23, 23, 23, 23,  0, 23,  0, 23,  0, 23,  0, 23,  0, 23,  0, 23,  0 ],
		[24, 23, 25, 25, 25, 23, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
		[24, 23, 25, 26, 25, 23, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
		[24, 23, 25, 25, 25, 23, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
		[24, 23, 23, 23, 23, 23, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
		[24, 23, 23, 23, 23, 23, 23, 23,  0,  0,  0,  0,  0, 22,  0,  0,  0,  0,  0,  0, 10 ],
		[24, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  2,  2,  7 ],
		[24, 23, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  2,  2,  2,  7, 13, 13, 13 ],
		[24, 23,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  2,  7, 13, 13, 13, 13, 13, 13, 13 ],
		[24, 23, 23,  0,  0,  0,  0,  0, 10,  2,  2,  7, 13, 13, 13, 13, 13, 13, 13, 13, 13 ],
		[24, 23,  0,  0,  0,  0,  0,  0,  4, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13 ],
		[24, 23, 23,  0,  0,  0,  0,  0,  4, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13 ],
		[24, 23,  0,  0,  0,  0,  0, 10,  7, 13, 13, 13, 13, 13, 13,  8,  3,  3,  6, 13, 13 ],
		[24, 23, 23,  0, 22,  0,  0,  4, 13, 13, 13, 13, 13, 13,  8,  9,  0,  0,  4, 13, 13 ],
		[24, 23,  0,  0,  0,  0, 10,  7, 13, 13, 13, 13, 13,  8,  9,  0,  0,  0,  4, 13, 13 ],
		[24, 23, 23,  0,  0,  0,  4, 13, 13, 13, 13, 13, 13,  1,  0,  0,  0, 10,  7, 13, 13 ],
		[24, 23,  0,  0,  0, 10,  7, 13, 13, 13, 13, 13, 13,  1,  0,  0, 22,  4, 13, 13, 13 ],
		[24, 23, 23,  0,  0,  4, 13, 13, 13, 13, 13, 13, 13,  5,  2, 11,  0,  4, 13, 13, 13 ],
		[24, 23,  0,  0,  0,  4, 13, 13, 13, 13, 13, 13, 13, 13, 13,  5,  2,  7, 13, 13, 13 ],
		[24, 23, 23,  0,  0,  4, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13 ]
	];

Level.prototype.init = function( ctx ) {
	var grass = new Texture( "images/tiles/wall01.gif" );

	for ( var i = 0; i < this.map.length; i++ ) {
		for ( var j = 0; j < this.map[i].length; j++ ) {
			var id = this.map[i][j];
			var obj;

			switch (id) {
				case 0:  obj = this.tileset.create( "beach0" , i,-0.5, j ); break;
				case 1:  obj = this.tileset.create( "beach1" , i,-0.7, j ); break;
				case 2:  obj = this.tileset.create( "beach2" , i,-0.7, j ); break;
				case 3:  obj = this.tileset.create( "beach3" , i,-0.7, j ); break;
				case 4:  obj = this.tileset.create( "beach4" , i,-0.7, j ); break;
				case 5:  obj = this.tileset.create( "beach5" , i,-0.7, j ); break;
				case 6:  obj = this.tileset.create( "beach6" , i,-0.7, j ); break;
				case 7:  obj = this.tileset.create( "beach7" , i,-0.7, j ); break;
				case 8:  obj = this.tileset.create( "beach8" , i,-0.7, j ); break;
				case 9:  obj = this.tileset.create( "beach9" , i,-0.7, j ); break;
				case 10: obj = this.tileset.create( "beach10", i,-0.7, j ); break;
				case 11: obj = this.tileset.create( "beach11", i,-0.7, j ); break;
				case 12: obj = this.tileset.create( "beach12", i,-0.7, j ); break;
				case 13: obj = this.tileset.create( "water0" , i,-0.9, j ); break;
				case 14: obj = this.tileset.create( "water1" , i,-0.9, j ); break;
				case 15: obj = this.tileset.create( "water2" , i,-0.9, j ); break;
				case 16: obj = this.tileset.create( "water3" , i,-0.9, j ); break;
				case 17: obj = this.tileset.create( "water4" , i,-0.9, j ); break;
				case 18: obj = this.tileset.create( "water5" , i,-0.9, j ); break;
				case 19: obj = this.tileset.create( "water6" , i,-0.9, j ); break;
				case 20: obj = this.tileset.create( "water7" , i,-0.9, j ); break;
				case 21: obj = this.tileset.create( "water8" , i,-0.9, j ); break;
				case 22: ctx.add( this.tileset.create( "beach0", i, -0.3, j ) ); obj = this.tileset.create( "tree1", i, 0.8, j ); break;
				case 23: obj = this.tileset.create( "i11j00", i, 0.0, j ); break;
				case 24: obj = this.tileset.create( "i0j05", i, 0.0, j ); break;
				case 25: obj = this.tileset.create( "i0j05", i, 0.3, j ); break;
				case 26: ctx.add( this.tileset.create( "i0j05", i, 0.0, j ) ); obj = this.tileset.create( "tree0", i, 1.4, j ); break;
				default:
					continue;

			}

			ctx.add( obj );
			this.objects.push( obj );
		}
	}

	// this.sound.play();
}

Level.prototype.intersect = function( obj ) {
	for ( var i = 0; i < this.objects.length; i++ ) {
		if ( obj.intersects( this.objects[i] ) )
			return true;
	}

	return false;
}

Level.prototype.addGravity = function( obj ) {
	var y = obj.getY();
	obj.down( 0.05 * Timer.elapsed  ); // 0.1 tiles per second

	for ( var i = 0; i < this.objects.length; i++ ) {
		var tile = this.objects[i];
		if ( obj.intersects(tile) && (obj.minY < obj.maxY) ) {
			obj.isFlying = false;
			obj.setY( y );
			return;
		}
	}

	obj.isFlying = true;
}


Level.prototype.update = function() {
		
}
