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
 * A simple isometric 3D cube.
 *
 * @constructor
 * @extends {Shape}
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Cube = function( x, y, z ) {
	Shape.call( this, x, y, z );

	this.faces = [
		new Face([[-0.5, -1.0], [0.0, -0.5], [0.5,-1.0], [ 0.0,-1.5]], "#333333" ),
		new Face([[-0.5, -1.0], [0.0, -0.5], [0.0, 0.5], [-0.5, 0.0]], "#222222" ),
		new Face([[ 0.0, -0.5], [0.5, -1.0], [0.5, 0.0], [ 0.0, 0.5]], "#111111" )
	];
}

Cube.prototype = Object.create( Shape.prototype );
Cube.prototype.texture = ["#333333", "#222222", "#111111","#444444","#555555"];

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure changes the current orientation.
 * @param {number} orientation: a number between 0 and 8.
 * @override
 */
Cube.prototype.setOrientation = function( orientation ) {
	var t0;
	var t1;

	switch ( orientation ) {
		case Object3D.NORTHEAST:
			t0 = this.texture[1];
			t1 = this.texture[2];
			break;
		case Object3D.SOUTHEAST:
			t0 = this.texture[2];
			t1 = this.texture[3];
			break;
		case Object3D.SOUTHWEST:
			t0 = this.texture[3];
			t1 = this.texture[4];
			break;
		case Object3D.NORTHWEST:
			t0 = this.texture[4];
			t1 = this.texture[1];
			break;
		case Object3D.WEST:
			t0 = this.texture[3];
			break;
		case Object3D.NORTH:
			t0 = this.texture[1];
			break;
		case Object3D.EAST:
			t0 = this.texture[2];
			break;
		case Object3D.SOUTH:
			t0 = this.texture[4];
	}

	this.orientation = orientation;
	this.faces[1].setTexture( t0 );
	this.faces[2].setTexture( t1 );
}

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure is used by the engine to recalculate the faces coordinates
 * and size.
 * @override
 */
Cube.prototype.build = function() {
	var face0;
	var face1;
	var face2;

	if ( this.orientation == Object3D.SOUTHWEST ||
		 this.orientation == Object3D.SOUTHEAST ||
		 this.orientation == Object3D.NORTHWEST ||
		 this.orientation == Object3D.NORTHEAST ) {

		var d0 = ( this.sx + this.sz ) / 2;
		var d1 = ( this.sx - this.sz ) / 2;

		var a = -0.5 * d0;
		var b = -0.5 * d1;
		var c = -b;
		var d = -a;

		var y0 =  b - this.sy;
		var y1 =  d - this.sy;
		var y2 =  c - this.sy;
		var y3 =  a - this.sy;
		
		face0 = [[ a, y0 ], [ c, y1 ], [ d, y2 ], [ b, y3]];
		face1 = [[ a, y0 ], [ c, y1 ], [ c, d  ], [ a, b ]];
		face2 = [[ c, y1 ], [ d, y2 ], [ d, c  ], [ c, d ]];
	} else {
		var a = -0.5 * this.sx;
		var b =  0.5 * this.sz;
		var c = -a;
		var d = -b;

		var y0 =  b - this.sy;
		var y1 =  d - this.sy;

		face0 = [[ a, y0 ], [ c, y0 ], [ c, y1 ], [ a, y1 ]];
		face1 = [[ a, b ], [ c, b ], [ c, d ], [ a, d ]];
		face2 = [];
	}

	this.faces[0].setVertex( face0 );
	this.faces[1].setVertex( face1 );
	this.faces[2].setVertex( face2 );
}
