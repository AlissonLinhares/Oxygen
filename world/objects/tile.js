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
 * A tile consists of small rectangular graphic image. The image can be
 * an animation or just a texture.
 *
 * @constructor
 * @extends {Shape}
 * @param {(Animation|Texture)} material: can be a Texture or an Animation.
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Tile = function( material, x, y, z ) {
	this.material = material;
	Object3D.call( this, x, y, z );
}

Tile.prototype = Object.create( Object3D.prototype );
Tile.prototype.sy = 0;

/*************************** VARIABLES SECTION *******************************/
/** @type {(Animation|Texture)} */ Tile.prototype.material = null;

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure is used by the Render to draw this tile on the screen.
 * @param {?} context
 */
Tile.prototype.draw = function( context ) {
	this.material.draw( context, this.screenX, this.screenY, Object3D.tileWidth, Object3D.tileHeight );
}
