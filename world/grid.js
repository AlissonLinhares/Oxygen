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
/**
 * Grid is a spatial map. We use auto-index to improve the performance.
 * @constructor
 **/
var Grid = function() {
	this.cache = [];
}

/*************************** VARIABLES SECTION *******************************/
/**
 * @private
 * @type {Array<Array<Array<Object3D>>>|Array<Array<Array<undefined>>>}
 */
Grid.prototype.cache = null;

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure removes a specific object from this grid.
 * @param {Object3D} obj: a specific object.
 */
Grid.prototype.remove = function( obj ) {
	var x   = obj._grid_x;
	var z   = obj._grid_z;
	var key = obj._grid_key;

	if ( this.cache[x] !== undefined && this.cache[x][z] !== undefined ) {
		var vector = this.cache[x][z];

		if ( vector[key] !== obj )
			return;

		if ( vector.length > 1 ) {
			var last = vector.pop();

			if( last._grid_key != key ) {
				last._grid_key = key;
				vector[key] = last;
			}
		} else {
			this.cache[x][z] = undefined;
		}
	}

	obj._grid_x   = undefined;
	obj._grid_z   = undefined;
	obj._grid_key = undefined;
}

/**
 * This procedure inserts a Object3D into this grid.
 * @param {Object3D} obj: a specific object.
 */
Grid.prototype.insert = function( obj ) {
	var x = Math.round( obj.getX() );
	var z = Math.round( obj.getZ() );

	if ( this.cache[x] === undefined ) {
		this.cache[x] = [];
		this.cache[x][z] = [];
	} else if ( this.cache[x][z] === undefined ) {
		this.cache[x][z] = [];
	}

	obj._grid_x = x;
	obj._grid_z = z;
	obj._grid_key = this.cache[x][z].length;
	this.cache[x][z].push( obj );
}

/** This procedure removes all objects references. */
Grid.prototype.clear = function() {
	this.cache = [];
}

/**
 * This procedure returns all objects at a certain position.
 * @param {number} x: x-coordinate.
 * @param {number} z: z-coordinate.
 */
Grid.prototype.getObjectsAt = function( x, z ) {
	if ( this.cache[x] !== undefined && this.cache[x][z] !== undefined )
		return this.cache[x][z];

	return [];
}
