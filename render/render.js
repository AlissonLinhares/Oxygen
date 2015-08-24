/*---------------------------------------------------------------------------*
 * Copyright (C) 2014 Alisson L. Carvalho, Alandesson L. Carvalho.           *
 * All rights reserved.                                                      *
 *                                                                           *
 * This file is part of the Oxygen lib.                                      *
 *                                                                           *
 * The Oxygen lib is free software: you can redistribute it and/or           *
 * modify it under the terms of the GNU Lesser General Public License as     *
 * published by the Free Software Foundation, either version 3 of the        *
 * License, or (at your option) any later version.                           *
 *                                                                           *
 * The Oxygen lib is distributed in the hope that it will be useful,         *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of            *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the              *
 * GNU Lesser General Public License for more details.                       *
 *                                                                           *
 * You should have received a copy of the GNU Lesser General Public License  *
 * along with the Oxygen lib. If not, see <http://www.gnu.org/licenses/>.    *
 *---------------------------------------------------------------------------*/

/****************************** CONSTRUCTOR **********************************
 * This class controls all the renderization process. We use a isometric
 * renderization approach to improve the performance.
 * @constructor
 * @param {Canvas} canvas: reference to a Canvas.
 * @param {World} world: reference to the World.
 **/
var Render = function( canvas, world ) {
	/** @type {Pool} */
	var pool = [];

	/** @type {?Camera} */
	var camera   = null;
	/** @type {number} */
	var tileSize = 50;
	/** @type {number} */
	var action   = Render.RESET;

	/**
	 * This procedure changes the current tile size.
	 * @param {number} size: the size of one side of a square.
	 **/
	this.setTileSize = function( size ) {
		tileSize = size;
		this.request( Render.RESET );
	}

	/**
	 * This procedure returns the current tile size.
	 * @return
	 **/
	this.getTileSize = function() {
		return tileSize;
	}

	/**
	 * This procedure returns the current canvas in use.
	 * @return {Canvas}
	 **/
	this.getCanvas = function() {
		return canvas;
	}

	this.setCamera = function( cam ) {
		camera = cam;
		this.request( Render.RESET );
	}

	this.getCamera = function() {
		return camera;
	}

	this.refresh = function( obj ) {
		obj.update( camera );

		var x   = obj.getScreenX();
		var y   = obj.getScreenY();
		var min = -tileSize;
		var depth = obj.depth;

		if ( x >= min && x <= canvas.getWidth() &&  y >= min && y <= canvas.getHeight() ) {
			if ( pool[depth] !== obj )
				pool.push( obj );
		} else if ( pool[depth] === obj ) {
			var obj = pool.pop();
			obj.depth = depth;
			pool[depth] = obj
		}
	}

	this.request = function( request ) {
		if ( action >= request )
			return;

		action = request;
	}

	this.getStatus = function() {
		return action;
	}

	this.update = function() {
		switch( action ) {
			case Render.SKIP:
				return;
			case Render.RESET:
				reset();
			case Render.FLUSH:
				flush();
		}

		action = Render.SKIP;
	}

	function flush() {
		canvas.clear();

		// drawing the farthest element first
		for ( var i = pool.length - 1; i >= 0; i-- ) {
			var a = pool[i];

			for ( var j = i - 1; j >= 0; j-- ) {
				var b = pool[j];

				if ( b.isBehind( a ) ) {
					pool[i] = b;
					pool[j] = a;
					a = b;
				}
			}

			a.depth = i;
			a.draw( canvas.getContext() );
		}
	}

	function reset() {
		pool = [];

		var tileScale      = tileSize  * camera.getScaleY();
		var tileWidth      = tileScale * camera.getScaleX();
		var tileHeight     = tileScale * camera.getScaleZ();
		var tilesPerColumn = canvas.getHeight() / tileHeight;
		var tilesPerLine   = canvas.getWidth() / tileWidth;

		Object3D.mainCamera = camera;
		Object3D.tileWidth  = tileWidth;
		Object3D.tileHeight = tileHeight;

		var terrain = world.getTerrain();
		var centerX = tilesPerLine / 2;
		var centerZ = tilesPerColumn / 2;

		camera.calcScreenCoord( centerX * tileWidth, centerZ * tileHeight );
		var cx = Math.round( camera.getX() - centerX - centerZ ) - 2;
		var cz = Math.round( camera.getZ() - centerX + centerZ );

		var maxX = Math.round( tilesPerColumn * 2 + 4 );
		var maxY = Math.round( tilesPerLine + 2 );

		for ( var i = 0; i <= maxX; i++ ) {
			var tx = cx;
			var tz = cz;

			for ( var j = 0; j <= maxY; j++ ) {
				var objects = world.getObjectsAt( tx, tz );

				if ( terrain ) {
					var tile = terrain.genTileAt( tx, tz );
					tile.update( camera );
					pool.push( tile );
				}

				for( var s = 0; s < objects.length; s++ ) {
					var obj = objects[s];
					obj.update( camera );
					pool.push( obj );
				}

				tx++;
				tz++;
			}

			i % 2 != 0 ? cz-- : cx++;
		}
	}
}

/** @const */ Render.SKIP  = 0;
/** @const */ Render.FLUSH = 1;
/** @const */ Render.RESET = 2;
