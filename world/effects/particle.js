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
 * @extends {Object3D}
 * @constructor
 */
var Particle = function(x, y, z) {
  var d = new Date();

  this.xSpd=5;
  this.ySpd=5;
  this.zSpd=5;
  this.life = 5;
  this.timeCreated = d.getTime()/1000;
  this.size = 20;
  Object3D.call( this, x, y, z );
}

Particle.prototype = Object.create( Object3D.prototype );

Particle.prototype.getXSpd = function() {
	return this.xSpd;
}

Particle.prototype.setXSpd = function( xSpd ) {
	this.xSpd = xSpd;
}

Particle.prototype.getYSpd = function() {
	return this.ySpd;
}

Particle.prototype.setYSpd = function( ySpd ) {
	this.ySpd = ySpd;
}

Particle.prototype.getZSpd = function() {
	return this.zSpd;
}

Particle.prototype.setZSpd = function( zSpd ) {
	this.zSpd = zSpd;
}

Particle.prototype.getLife = function() {
	return this.life;
}

Particle.prototype.setLife = function( life ) {
	this.life = life;
}

Particle.prototype.updadeLife = function() {
   	var d = new Date();
	this.life -= (d.getTime()/1000) -this.timeCreated;
}

Particle.prototype.getSize = function() {
	return this.size;
}

Particle.prototype.setSize = function( size ) {
	this.size = size;
}
