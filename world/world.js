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
 * This class represents a digital world.
 * @constructor
 **/
var World = function() {
	/** @private {Array<Object3D>} */
	var objects = [];
	/** @private {Grid} */
	var grid = new Grid();
	/** @private {?Terrain} */
	var terrain = null;
	/** @private {number} */
	var orientation = Object3D.NORTHEAST;

	/**
	 * This function rotates the world by alpha around the y-axis.
	 * @private
	 * @param {number} alpha
	 **/
	function rotate( alpha ) {
		for ( var i = objects.length - 1; i >= 0; i-- )
			if( !objects[i].getParent() )
				objects[i].rotateY( alpha );
	}

	/**
	 * This procedure changes the current terrain.
	 * @param {Terrain} t: a Terrain object.
	 **/
	this.setTerrain = function( t ) {
		terrain = t;
	}

	/**
	 * This procedure returns the current terrain.
	 * @return {Terrain}
	 **/
	this.getTerrain = function() {
		return terrain;
	}

	/**
	 * This procedure updates the object position and refresh the world.
	 * @param {Object3D} obj: a specific object.
	 **/
	this.refresh = function( obj ) {
		obj.flush();
		grid.remove( obj );
		grid.insert( obj );
	}

	/**
	 * This procedure removes a specific object from the world.
	 * @param {Object3D} obj: a specific object.
	 **/
	this.remove = function( obj ) {
		grid.remove( obj );
	}

	/**
	 * This procedure inserts a object node into the world.
	 * @param {Object3D} obj: a specific object.
	 */
	this.add = function( obj ) {
		grid.insert( obj );
		objects.push( obj );
	}

	/** This procedure removes all objects references from this world. */
	this.clear = function() {
		grid.clear();
		objects = [];
	}

	/**
	 * This procedure returns all objects at a certain position.
	 * @param {number} x: x-coordinate.
	 * @param {number} z: z-coordinate.
	 */
	this.getObjectsAt = function( x, z ) {
		return grid.getObjectsAt( x, z );
	}

	/** This procedure rotates the world 90º to the right. */
	this.turnRight = function() {
		switch ( orientation ) {
			case Object3D.NORTHEAST:
				orientation = Object3D.SOUTHEAST;
				break;
			case Object3D.SOUTHEAST:
				orientation = Object3D.SOUTHWEST;
				break;
			case Object3D.SOUTHWEST:
				orientation = Object3D.NORTHWEST;
				break;
			case Object3D.NORTHWEST:
				orientation = Object3D.NORTHEAST;
		}

		rotate( Math.PI / 2 );
	}

	/** This procedure rotates the world 90º to the left. */
	this.turnLeft = function() {
		switch( orientation ) {
			case Object3D.NORTHEAST:
				orientation = Object3D.NORTHWEST;
				break;
			case Object3D.NORTHWEST:
				orientation = Object3D.SOUTHWEST;
				break;
			case Object3D.SOUTHWEST:
				orientation = Object3D.SOUTHEAST;
				break;
			case Object3D.SOUTHEAST:
				orientation = Object3D.NORTHEAST;
		}

		rotate( -Math.PI / 2 );
	}

	/** This procedure updates all informations related to the world. */
	this.update = function() {

	}
}
