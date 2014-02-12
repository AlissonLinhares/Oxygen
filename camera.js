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

var Camera = function( x, y, z ) {
	this._projection = new Float32Array( 16 );

	Object3D.call( this, x, y, z );
	Oxygen.addCamera( this );
}

Camera.prototype = Object.create( Object3D.prototype );

Camera.prototype._fildOfView   = 45;
Camera.prototype._nearClip     = 0.1;
Camera.prototype._farClip      = 100.0;
Camera.prototype._aspectRation = 4/3;

// Overrider método
Camera.prototype.reset = function() {
	Object3D.prototype.reset.call(this);
	mat4.perspective( this._fildOfView, this._aspectRation, this._nearClip, this._farClip, this._projection );
}

Camera.prototype.setFildOfView = function( fildOfView ) {
	this._fildOfView = fildOfView;
}

Camera.prototype.setNearClip = function( nearClip ) {
	this._nearClip = nearClip;
}

Camera.prototype.setFarClip = function( farClip ) {
	this._farClip = farClip;
}

Camera.prototype.setAspectRation = function( aspectRation ) {
	this._aspectRation = aspectRation;
}

Camera.prototype.setViewPosition = function( x, y ) {
	this._projection[12] = x;
	this._projection[13] = y;
}

Camera.prototype.setZoom = function( z ) {
	this._projection[14] = -( this._farClip * this._nearClip * 2 ) / ( this._farClip - this._nearClip );
	this._projection[14] += this._projection[10] * z;
	this._projection[15] = this._projection[11] * z;
}

Camera.prototype.getProjectionMatrix = function() {
	return this._projection;
}

// Camera.prototype.rotateX = function( alpha ) {
// 	Object3D.prototype.rotateX.call( this, -alpha );
// }
// 
// Camera.prototype.rotateY = function( beta ) {
// 	Object3D.prototype.rotateX.call( this, -beta );
// }
// 
// Camera.prototype.rotateZ = function( gama ) {
// 	Object3D.prototype.rotateX.call( this, -gama );
// }
// 
// Camera.prototype.scaleX = function( scaleX ) {
// 	Object3D.prototype.scaleX.call( this, 1 / scaleX );
// }
// 
// Camera.prototype.scaleY = function( scaleY ) {
// 	Object3D.prototype.scaleY.call( this, 1 / scaleY );
// }
// 
// Camera.prototype.scaleZ = function( scaleZ ) {
// 	Object3D.prototype.scaleZ.call( this, 1 / scaleZ );
// }
// 
// Camera.prototype.setScale = function( scaleX, scaleY, scaleZ ) {
// 	Object3D.prototype.setScale.call( this, 1 / scaleX, 1 / scaleY, 1 / scaleZ );
// }
// 
// Camera.prototype.setX = function( x ) {
// 	Object3D.prototype.setX.call( this, -x );
// }
// 
// Camera.prototype.getX = function() {
// 	return -this._transform[12];
// }
// 
// Camera.prototype.setY = function( y ) {
// 	Object3D.prototype.setY.call( this, -y );
// }
// 
// Camera.prototype.getY = function() {
// 	return -this._transform[13];
// }
// 
// Camera.prototype.setZ = function( z ) {
// 	Object3D.prototype.setZ.call( this, -z );
// }
// 
// Camera.prototype.getZ = function() {
// 	return -this._transform[14];
// }
// 
// Camera.prototype.translateX = function( x ) {
// 	Object3D.prototype.translateX.call( this, -x );
// }
// 
// Camera.prototype.translateY = function( y ) {
// 	Object3D.prototype.translateY.call( this, -y );
// }
// 
// Camera.prototype.translateZ = function( z ) {
// 	Object3D.prototype.translateZ.call( this, -z );
// }
// 
// Camera.prototype.setPosition = function( x, y, z ) {
// 	Object3D.prototype.setPosition.call( this, -x, -y, -z );
// }
// 
// Camera.prototype.translateX = function( x ) {
// 	this._transform[12] -= Math.cos( -this._beta  ) * x;
// 	this._transform[13] -= Math.sin(  this._gama  ) * x;
// 	this._transform[14] -= Math.sin(  this._beta  ) * x;
// }
// 
// Camera.prototype.translateY = function( y ) {
// 	this._transform[12] -= Math.sin( -this._beta  ) * y;
// 	this._transform[13] -= Math.cos( -this._beta  ) * y;
// 	this._transform[14] -= Math.sin(  this._gama  ) * y;
// }
// 
// Camera.prototype.translateZ = function( z ) {
// 	this._transform[12] -= Math.sin( -this._beta  ) * z;
// 	this._transform[13] += Math.sin( -this._alpha ) * z;
// 	this._transform[14] -= Math.cos( -this._beta  ) * z;
// }
