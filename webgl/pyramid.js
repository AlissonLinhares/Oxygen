/*---------------------------------------------------------------------------*
 * Copyright (C) 2014 Alisson L. Carvalho, Alandesson L. Carvalho.           *
 * All rights reserved.                                                      *
 *                                                                           *
 * This file is part of the Object3 lib.                                     *
 *                                                                           *
 * The Object3 lib is free software: you can redistribute it and/or          *
 * modify it under the terms of the GNU Lesser General Public License as     *
 * published by the Free Software Foundation, either version 3 of the        *
 * License, or (at your option) any later version.                           *
 *                                                                           *
 * The Object3 lib is distributed in the hope that it will be useful,        *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of            *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the              *
 * GNU Lesser General Public License for more details.                       *
 *                                                                           *
 * You should have received a copy of the GNU Lesser General Public License  *
 * along with the Object3 lib. If not, see <http://www.gnu.org/licenses/>.   *
 *---------------------------------------------------------------------------*/

function Pyramid( x, y, z ) {

	this.vertexBuffer = new Float32Array( [
		// Front face
		0.0,  1.0,  0.0,
		-1.0, -1.0,  1.0,
		1.0, -1.0,  1.0,

		// Right face
		0.0,  1.0,  0.0,
		1.0, -1.0,  1.0,
		1.0, -1.0, -1.0,

		// Back face
		0.0,  1.0,  0.0,
		1.0, -1.0, -1.0,
		-1.0, -1.0, -1.0,

		// Left face
		0.0,  1.0,  0.0,
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, 1.0,
		1.0, -1.0, 1.0,
		-1.0, -1.0, -1.0,
		// Bottom face
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0, 1.0
	] );

	this.colorBuffer = new Float32Array( [
		// Front face
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,

		// Right face
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0,

		// Back face
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,

		// Left face
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0,
		1.0, 1.0, 1.0, 1.0,

		// down face
		0.5, 0.5, 0.5, 1.0,
		0.5, 0.5, 0.5, 1.0,
		0.5, 0.5, 0.5, 1.0,

		0.5, 0.5, 0.5, 1.0,
		0.5, 0.5, 0.5, 1.0,
		0.5, 0.5, 0.5, 1.0
	] );
	
	Shape.call( this, x, y, z );
}

Pyramid.prototype = Object.create( Shape.prototype );