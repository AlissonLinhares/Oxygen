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
 * This class simulates a 3D camera. The Render uses this class to calculate
 * the view position.
 * 
 * @extends {Object3D}
 * @constructor
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Camera = function( x, y, z ) {
	Object3D.call( this, x, y, z );
}

Camera.prototype = Object.create( Object3D.prototype );

/*************************** VARIABLES SECTION *******************************/
/** @type {boolean} */ Camera.prototype.active = true;
/** @type {number}  */ Camera.prototype.sz     = 0.6;

/***************************** PUBLIC SECTION ********************************/

Camera.prototype.enable = function() {
	this.active = true;
}

Camera.prototype.disable = function() {
	this.active = false;
}

Camera.prototype.enabled = function() {
	return this.active;
}

Camera.prototype.zoom = function( z ) {
	this.sy += z;
	this.cacheThisOperation();
}

/**************************** PROTECTED SECTION ******************************/
/**
 * This procedure is used to notify the kernel about a new operation.
 * @override
 * @protected
 **/
Camera.prototype.cacheThisOperation = function() {
	this.cached = true;
}

/**
 * This procedure calculates the screen coordinates.
 * @param {number} sx: x position of the view.
 * @param {number} sy: y position of the view.
 **/
Camera.prototype.calcScreenCoord = function( sx, sy ) {
	this.screenX = Math.round( this.getIsoX() * Object3D.tileWidth  - sx );
	this.screenY = Math.round( this.getIsoY() * Object3D.tileHeight - sy );
}
