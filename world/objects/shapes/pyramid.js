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
 * A simple isometric 3D pyramid.
 *
 * @constructor
 * @extends {Shape}
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Pyramid = function( x, y, z ) {
	Shape.call( this, x, y, z );

	this.faces = [
		new Face(
			[
				[-0.5, 0.0],
				[ 0.0,-1.0],
				[ 0.0, 0.5]
			],
			"#333333"
		),
		new Face(
			[
				[ 0.5, 0.0],
				[ 0.0,-1.0],
				[ 0.0, 0.5]
			],
			"#222222"
		)
	];
}

Pyramid.prototype = Object.create( Shape.prototype );

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure changes the current orientation.
 * @param {number} orientation: a number between 0 and 8.
 * @override
 */
// Pyramid.prototype.setOrientation = function( orientation ) {
	// TODO
// }

/**
 * This procedure is used by the engine to recalculate the faces coordinates
 * and size.
 * @override
 */
Pyramid.prototype.build = function() {
	var face0;
	var face1;

	if ( this.orientation == Object3D.SOUTHWEST ||
		 this.orientation == Object3D.SOUTHEAST ||
		 this.orientation == Object3D.NORTHWEST ||
		 this.orientation == Object3D.NORTHEAST ) {

		var a = -0.25 * ( this.sx + this.sz );
		var b = -0.25 * ( this.sx - this.sz );
		var c = -b;
		var d = -a;

		face0 = [[ a, b ], [ 0.0, -this.sy ], [ c, d ]];
		face1 = [[ d, c ], [ 0.0, -this.sy ], [ c, d ]];
	} else {
		var a = -0.25 * this.sx;
		var b =  0.25 * this.sz;
		var c = -a;

		face0 = [[ a, b ], [ 0, -this.sy], [ c, b ]];
		face1 = [];
	}

	this.faces[0].setVertex( face0 );
	this.faces[1].setVertex( face1 );
}
