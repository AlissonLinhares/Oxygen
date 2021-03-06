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

/**
 * @constructor
 **/
var Face = function( vertex, texture ) {
	this.vertex  = vertex;
	this.texture = texture;
}

Face.prototype.visible = true;
Face.prototype.texture = null;
Face.prototype.vertex  = null;

Face.prototype.setVertex = function( vertex ) {
	this.vertex = vertex;
}

Face.prototype.getVertex = function() {
	return this.vertex;
}

Face.prototype.setTexture = function( texture ) {
	this.texture = texture;
}

Face.prototype.getTexture = function() {
	return this.texture;
}

Face.prototype.isVisible = function() {
	return this.isVisible && this.vertex.length;
}
