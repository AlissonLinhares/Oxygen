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

var Cube = function( x, y, z ) {
	this.vertexBuffer = new Float32Array( [
		// Front face
		-1.0, -1.0,  1.0,
		 1.0, -1.0,  1.0,
		 1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0, -1.0, -1.0,

		// Top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		 1.0,  1.0,  1.0,
		 1.0,  1.0, -1.0,

		// Bottom face
		-1.0, -1.0, -1.0,
		 1.0, -1.0, -1.0,
		 1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Right face
		 1.0, -1.0, -1.0,
		 1.0,  1.0, -1.0,
		 1.0,  1.0,  1.0,
		 1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0
	] );

	this.vertexIndexBuffer = new Uint16Array( [
		// Front face
		0, 1, 2, 0, 2, 3,

		// Back face
		4, 5, 6, 4, 6, 7,

		// Top face
		8, 9, 10, 8, 10, 11,

		// Bottom face
		12, 13, 14, 12, 14, 15,

		// Right face
		16, 17, 18, 16, 18, 19,

		// Left face
		20, 21, 22, 20, 22, 23
	] );

	this.colorBuffer = new Float32Array( [
		// Front face
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,

		// Back face
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,
		1.0, 1.0, 0.0, 1.0,

		// Top face
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,

		// Bottom face
		1.0, 0.5, 0.5, 1.0,
		1.0, 0.5, 0.5, 1.0,
		1.0, 0.5, 0.5, 1.0,
		1.0, 0.5, 0.5, 1.0,

		// Right face
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,
		1.0, 0.0, 1.0, 1.0,

		// Left face
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0
	] );

	this.uvBuffer = new Float32Array( [
		// Front face
		0.0  , 0.0,
		0.166, 0.0,
		0.166, 1.0,
		0.0  , 1.0,

		// Back face
		0.333, 0.0,
		0.333, 1.0,
		0.166, 1.0,
		0.166, 0.0,
		
		// Top face
		0.333, 1.0,
		0.333, 0.0,
		0.5  , 0.0,
		0.5  , 1.0,

		// Bottom face
		0.5  , 0.0,
		0.666, 0.0,
		0.666, 1.0,
		0.5  , 1.0,

		// Left face
		0.833, 0.0,
		0.833, 1.0,
		0.666, 1.0,
		0.666, 0.0,

		// Right face
		0.833, 0.0,
		1.0  , 0.0,
		1.0  , 1.0,
		0.833, 1.0
	] );

	Shape.call( this, x, y, z );
}

Cube.prototype = Object.create( Shape.prototype );
