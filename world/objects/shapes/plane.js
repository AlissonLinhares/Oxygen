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
 * A simple isometric plane.
 *
 * @constructor
 * @extends {Shape}
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Plane = function( x, y, z ) {
	Shape.call( this, x, y, z );

	this.faces = [
		new Face(
			[
				[-0.5, 0  ],
				[ 0  , 0.5],
				[ 0.5, 0  ],
				[ 0  ,-0.5]
			],
			"#333333"
		)
	];
}

Plane.prototype = Object.create( Shape.prototype );
Plane.prototype.sy = 0;

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure is used by the engine to recalculate the faces coordinates
 * and size.
 * @override
 */
Plane.prototype.build = function() {
	var face0;

	if ( this.orientation == Object3D.SOUTHWEST ||
		 this.orientation == Object3D.SOUTHEAST ||
		 this.orientation == Object3D.NORTHWEST ||
		 this.orientation == Object3D.NORTHEAST ) {

		// x' = x * ( dx + dy ) + y * ( dx - dy )
		// y' = x * ( dx - dy ) + y * ( dx + dy )

		var d0 = ( this.sx + this.sz ) / 2;
		var d1 = ( this.sx - this.sz ) / 2;

		var a = -0.5 * d0;
		var b = -0.5 * d1;
		var c = -b;
		var d = -a;
		
		face0 = [[ a, b ], [ c, d ], [ d, c ], [ b, a ]];
	} else {
		var a = -0.5 * this.sx;
		var b =  0.5 * this.sz;
		var c = -a;
		var d = -b;

		face0 = [[ a, b ], [ c, b ], [ c, d ], [ a, d ]];
	}

	this.faces[0].setVertex( face0 );
}
