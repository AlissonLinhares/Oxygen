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

Shape.prototype = Object.create( Object3D.prototype );

function Shape( x, y, z ) {
	Object3D.call( this, x, y, z );
}

Shape.prototype._vertices = [];
Shape.prototype._colors = [];

Shape.prototype.getVertexBuffer = function() {
	return this._vertices;
}

Shape.prototype.getColorBuffer = function() {
	return this._colors;
}

Shape.prototype.getNumberOfVertices = function() {
	return this._vertices.length / 3;
}

Shape.prototype.setVertices = function( listVertices ) {
	this._vertices = listVertices;
}
