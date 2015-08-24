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
 * @final
 * @constructor
 */
var Mouse = {};

/**************************** CONSTS SECTION *********************************/
/** @const */ var MOUSE_LEFT   = 1;
/** @const */ var MOUSE_CENTER = 2;
/** @const */ var MOUSE_RIGHT  = 3;

/*************************** VARIABLES SECTION *******************************/
/** @private {Array<boolean>} */ Mouse.btmap = [];
/** @private {number}         */ Mouse.x     = 0;
/** @private {number}         */ Mouse.y     = 0;

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure configures the browser and map all Mouse's events to the
 * game engine.
 * @param {Oxygen} engine: engine reference.
 **/
Mouse.init = function( engine ) {
	document.onclick = function( event ) {
		engine.onClick();
	}

	document.onmousedown = function( event ) {
		Mouse.btmap[event.which] = true;
		engine.onMouseDown();
	}

	document.onmouseup = function( event ) {
		Mouse.btmap[event.which] = false;
		engine.onMouseUp();
	}

	document.onmousemove = function( event ) {
		Mouse.x = event.pageX;
		Mouse.y = event.pageY;
		engine.onMouseMove();
	}

	/**
	 * This procedure returns the position of the mouse in the world.
	 * @return {{x:number, y:number}} cartesian coordinate.
	 **/
	Mouse.getViewAxes = function() {
		var camera = engine.getCamera();
		var canvas = engine.getCanvas();
		var centerX = canvas.getWidth() / 2;
		var centerY = canvas.getHeight() / 2;
		var x = (  Mouse.x - centerX ) / Object3D.tileWidth  + camera.getIsoX();
		var y = ( -Mouse.y + centerY ) / Object3D.tileHeight - camera.getIsoY();

		return { "x": x - y , "y": x + y};
	}
}

/**
 * This procedure returns the Y position of the mouse cursor.
 * @return {number}
 **/
Mouse.getScreenY = function() {
	return Mouse.y;
}

/**
 * This procedure returns the X position of the mouse cursor.
 * @return {number}
 **/
Mouse.getScreenX = function() {
	return Mouse.x;
}

/**
 * This procedure verifies if some specific button is down.
 * @param {number} bt: button code.
 **/
Mouse.isDown = function( bt ) {
	return Mouse.btmap[ bt ];
}
