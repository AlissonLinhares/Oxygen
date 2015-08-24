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
 * Oxygen is an oriented object isometric HTML5 game engine created by Alisson and
 * Alandesson, just for fun, in our free time. This engine is very portable and
 * relatively fast, for a Javascript application.
 *
 * The main advantage of this project is the compatibility. This engine is able to
 * run in almost all current browsers and input devices. Moreover, this engine was
 * optimized to strategy and old RPG action games.
 *
 * The Oxygen class is the core of your application, it contains everything you
 * need to create an isometric game. You should extend this class to maintain an
 * oriented object organization. See the demo folder to more information about
 * how to use this game engine.
 ****************************************************************************
 * @constructor
 * */
var Oxygen = function() {
	/** @private {Array<Object3D>} */
	var cache  = [];
	/** @private {World} */
	var world  = new World();
	/** @private {Canvas} */
	var canvas = new Canvas();
	/** @private {Render} */
	var render = new Render( canvas, world );
	/** @private {Camera} */
	var camera = null;
	/** @private {Oxygen} */
	var _this  = this;
	/** @private {Image} */
	var logo   = Resources.load( "../logo/logo.gif", Resources.IMAGE );

	/** This procedure configures the browser and initialize the engine. */
	function init() {
		_this.onStart();

		window.onerror = function( msg, url, line ) {
			alert( msg + "[url: " + url + "," + line + "]" );
			_this.onError();
		}

		window.onresize = function() {
			canvas.resize();
			render.request( Render.RESET );
			_this.onResize();
		}

		Timer.init( _this );
		Mouse.init( _this );
		Keyboard.init( _this );
		TouchScreen.init( _this );
	}

	/**
	 * Main loop: this function is called by default 30 times per second.
	 **/
	this.onTimeout = function() {
		var length = cache.length;

		if ( camera.isCached() || render.getStatus() == Render.RESET ) {
			camera.flush();

			for ( var i = 0; i < length; i++ ) {
				var obj = cache.pop(); // TODO: move cache to Object3D.

				// check if object has a valid cache (Sync remove problem).
				// TODO: improve this algorithm.
				if ( obj.getCache() )
					world.refresh( obj );
			}

			render.request( Render.RESET );
		} else if ( length > 0 ) {
			for ( var i = 0; i < length; i++ ) {
				var obj = cache.pop();
				render.refresh( obj );
				world.refresh( obj );
			}

			render.request( Render.FLUSH );
		}

		render.update();
	}

	this.setCamera = function( cam ) {
		if ( !cam )
			return;

		camera = cam;
		render.setCamera( cam );
	}

	this.setTileSize = function( size ) {
		render.setTileSize( size );
	}

	this.getTileSize = function() {
		return render.getTileSize();
	}

	this.getWorld = function() {
		return world;
	}

	this.getCamera = function() {
		return camera;
	}

	this.getRender = function() {
		return render;
	}

	this.getCanvas = function() {
		return canvas;
	}

	this.getFPS = function() {
		return ( 1000 / Timer.speed ) - Timer.elapsed + 1;
	}

	this.start = function() {
		var x       = canvas.getWidth() / 2;
		var y       = canvas.getHeight() / 2;
		var context = canvas.getContext();
		canvas.clear();

		if ( !camera )
			this.setCamera( new Camera( 0, 0, 0 ) );

		function loading() {
			if ( logo.complete ) {
				var w = logo.width;
				var h = logo.height;
				var c = ( Resources.ready / Resources.total )* 100 ;
				
				canvas.clear();
				context.drawImage( logo, x - w / 2, y - h / 2, w, h );
				context.strokeStyle = "#FFFFFF";
				context.fillStyle   = "#FFFFFF";
				context.fillText( c + "%", x - 20, y + 30 );
			}

			if ( Resources.waiting == 0 ) {
				init();
			} else {
				window.setTimeout( loading, 200 );
			}
		}

		loading();
	}

	/**
	 * This procedure inserts a element node into the engine.
	 * Remarks: we use add to abstract the configuration process that ocorres behind the scene.
	 * @param {Object3D|Terrain} obj: a specific object.
	 */
	this.add = function( obj ) {
		if ( obj instanceof Object3D ) {
			obj.setCache( cache );
			world.add( obj );
		} else if ( obj instanceof Terrain ) {
			world.setTerrain( obj );
		}
		
		render.request( Render.RESET );
	}

	this.remove = function( obj ) {
		if ( obj instanceof Object3D ) {
			obj.setCache( null );
			world.remove( obj );
			render.request( Render.RESET );
		} else if ( obj instanceof Terrain ) {
			world.setTerrain( null );
		}
	}
}

/********************************** EVENTS ***********************************/
Oxygen.prototype.onError      = function() {}
Oxygen.prototype.onStart      = function() {}
Oxygen.prototype.onUpdate     = function() {}
Oxygen.prototype.onKeyDown    = function() {}
Oxygen.prototype.onKeyUp      = function() {}
Oxygen.prototype.onMouseDown  = function() {}
Oxygen.prototype.onMouseUp    = function() {}
Oxygen.prototype.onMouseMove  = function() {}
Oxygen.prototype.onClick      = function() {}
Oxygen.prototype.onTouchStart = function( event ) {}
Oxygen.prototype.onTouchMove  = function( event ) {}
Oxygen.prototype.onResize     = function() {}
Oxygen.prototype.onBlur       = function() {}
Oxygen.prototype.onFocus      = function() {}
