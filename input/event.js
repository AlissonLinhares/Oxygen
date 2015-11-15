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
 * @constructor
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} id: identification code
 * @param {Oxygen} engine: engine reference
 *
 * This class is an abstraction of an touchable area on the screen.
 */
var Finger = function( x, y, id, engine ) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.engine = engine;
}

/**
 * This function returns the Y position (cartesian system).
 * @return {number}
 **/
Finger.prototype.getY = function() {
	return this.y;
}

/**
 * This function returns the X position (cartesian system).
 * @return {number}
 **/
Finger.prototype.getX = function() {
	return this.x;
}

/**
 * This procedure returns the position of the mouse in the world.
 * @return {{x:number, y:number}} cartesian coordinate.
 **/
Finger.prototype.getAxis = function() {
	var camera = this.engine.getCamera();
	var canvas = this.engine.getCanvas();
	var centerX = canvas.getWidth() / 2;
	var centerY = canvas.getHeight() / 2;
	var x = (  this.x - centerX ) / Object3D.tileWidth  + camera.getIsoX();
	var y = ( -this.y + centerY ) / Object3D.tileHeight - camera.getIsoY();

	return { "x": x - y , "y": x + y };
}

/**
 * This function returns an identification number
 * @return {number}
 **/
Finger.prototype.getID = function() {
	return this.id;
}
