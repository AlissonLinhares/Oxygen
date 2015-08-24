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

function Sphere( x, y, z, radius ) {
	
	this._latitude = 30;
	this._longitude = 30;
	this._radius = radius;

	this._calcBufferData(this._latitude, this._longitude, this._radius);

	Shape.call( this, x, y, z);
}

Sphere.prototype = Object.create( Shape.prototype );

Sphere.prototype.setLatitude = function(latitude){
	this._latitude = latitude;
}

Sphere.prototype.getLatitude = function(){
	return this._latitude;
}

Sphere.prototype.setLongitude = function(longitude){
	this._longitude = longitude;
}

Sphere.prototype.getLongitude = function(){
	return this._longitude;
}

Sphere.prototype.setRadius = function(radius){
	this._radius = radius;
}

Sphere.prototype.getRadius = function(){
	return this._radius;
}

Sphere.prototype._calcBufferData = function(latitude, longitude, radius){
	var vertexIndexBuffer = [];
	var vertexBuffer = [];
	var normalBuffer = [];
	var textureCoordData = [];
	var colorBuffer = []
	
	for ( var latNumber=0; latNumber <= latitude; latNumber++ ) {
		var theta = latNumber * Math.PI / latitude;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);


		for ( var longNumber=0; longNumber <= longitude; longNumber++ ) {
			var phi = longNumber * 2 * Math.PI / longitude;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);

			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u = 1 - (longNumber / longitude);
			var v = 1 - (latNumber / latitude);

			normalBuffer.push(x);
			normalBuffer.push(y);
			normalBuffer.push(z);

			textureCoordData.push(u);
			textureCoordData.push(v);

			vertexBuffer.push(radius * x);
			vertexBuffer.push(radius * y);
			vertexBuffer.push(radius * z);

			colorBuffer.push(0.5);
			colorBuffer.push(0.5);
			colorBuffer.push(0.5);
			colorBuffer.push(1.0);
		}
	}

	for (var latNumber=0; latNumber < latitude; latNumber++) {
		for (var longNumber=0; longNumber < longitude; longNumber++) {
			var first = (latNumber * (longitude + 1)) + longNumber;
			var second = first + longitude + 1;
			
			vertexIndexBuffer.push(first);
			vertexIndexBuffer.push(second);
			vertexIndexBuffer.push(first + 1);
			vertexIndexBuffer.push(second);
			vertexIndexBuffer.push(second + 1);
			vertexIndexBuffer.push(first + 1);
		}
	}
	
	this.vertexBuffer      = new Float32Array( vertexBuffer );
	this.vertexIndexBuffer = new Uint16Array( vertexIndexBuffer );
	this.colorBuffer       = new Float32Array(  colorBuffer  );
}


