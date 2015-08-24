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
 * Terrain is used by the render to generate tiles by demand. Every time
 * something changes, the render recalculate the scene and create tiles based
 * on the new position of the player.
 *
 * @constructor
 */
var Terrain = function() {

}

/***************************** PUBLIC SECTION ********************************/
/**
* This procedure returns the height of the floor in a specific position.
* @param {number} x: x-coordinate
* @param {number} z: z-coordinate
* @returns {number}
*/
Terrain.prototype.getHeightAt = function( x, z ) {
	return 0.0;
}

/**
* This procedure generate a new tile into a certain place.
* @param {number} x: x-coordinate
* @param {number} z: z-coordinate
* @returns {Shape}
*/
Terrain.prototype.genTileAt = function( x, z ) {
	var y = this.getHeightAt( x, z );
	var v1 = [-0.5, 0   + y - this.getHeightAt( x - 0.5, z - 0.5 )];
	var v2 = [ 0  , 0.5 + y - this.getHeightAt( x + 0.5, z - 0.5 )];
	var v3 = [ 0.5, 0   + y - this.getHeightAt( x + 0.5, z + 0.5 )];
	var v4 = [ 0  ,-0.5 + y - this.getHeightAt( x - 0.5, z + 0.5 )];

	var shape = new Shape( x, y, z );
	shape.addFace( new Face( [ v1, v2, v3, v4 ], "#333333" ) );
	shape.sy = 0;
	return shape;
}
