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

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure configures the browser and map all Mouse's events to the
 * game engine.
 * @param {Oxygen} engine: engine reference.
 **/
Mouse.init = function( engine ) {
	/** @private {Array<boolean>} */
	var btmap = [];
	/** @private {Finger} */
	var mouse = new Finger( 0, 0, 0, engine );
	/** @private {number} */
	var delta = 0;

	document.onmousedown = function( event ) {
		mouse.x = event.pageX;
		mouse.y = event.pageY;
		btmap[event.which] = true;

		delta = 10;
		engine.onPress( mouse );
	}

	document.onmouseup = function( event ) {
		if ( delta > 0 )
			engine.onTap( mouse );

		btmap[event.which] = false;
		engine.onLeave( mouse );
	}

	document.onmousemove = function( event ) {
		mouse.x = event.pageX;
		mouse.y = event.pageY;
		delta--;

		if ( Mouse.isDown( MOUSE_LEFT ) )
			engine.onDrag( mouse );
	}

	/**
	* This procedure returns the Y position of the mouse cursor.
	* @return {number}
	**/
	Mouse.getScreenY = function() {
		return mouse.y;
	}

	/**
	* This procedure returns the X position of the mouse cursor.
	* @return {number}
	**/
	Mouse.getScreenX = function() {
		return mouse.x;
	}

	/**
	* This procedure verifies if some specific button is down.
	* @param {number} bt: button code.
	**/
	Mouse.isDown = function( bt ) {
		return btmap[ bt ];
	}
}
