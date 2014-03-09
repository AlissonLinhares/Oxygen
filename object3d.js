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
 *---------------------------------------------------------------------------*
 *----------------------------------------------------------------------------
 * @remarks: This file was based in glMatrix.js v0.9.5, which is a high      *
 * performance webgl lib for operation with matrix and vectors.              *
 * -- Original source file:                                                  *
 *           http://code.google.com/p/glmatrix/source/browse/glMatrix.js     *
 *                                                                           *
 * -- Modifications:                                                         *
 *           rotateX method                                                  *
 *           rotateY method                                                  *
 *           rotateZ method                                                  *
 *           setRotation method                                              *
 *                                                                           *
 * @remarks: Special thanks to Brandon Jones for his excellent work on       *
 * glMatrix lib.                                                             *
 *---------------------------------------------------------------------------*/

var Object3D = function( x, y, z ){
	this._alpha = 0.0;
	this._beta  = 0.0;
	this._gama  = 0.0;

	this._scaleX = 1.0;
	this._scaleY = 1.0;
	this._scaleZ = 1.0;

	this._centerX = 0.0;
	this._centerY = 0.0;
	this._centerZ = 0.0;

	this._parent    = null;
	this._children  = {};
	this._nChildren = 0;
	this._id        = Object3D._numberOfObject++;

	// Create a transform matrix;
	this._transform = new Float32Array( 16 );

	// Inicialize the transform matrix;
	this.reset();

	if ( arguments.length == 3 )
		this.setPosition( x, y, z );
}

Object3D._numberOfObject = 0;

Object3D.prototype.remove = function( child ) {
	if ( child._parent == this ) {
		delete this._children[child._id];
		this._nChildren--;
		child._parent = null;
	}
}

Object3D.prototype.add = function( child ) {
	// More than one parent per child is not allowed!
	if ( child._parent )
		child._parent.remove( child );

	child._parent = this;
	this._children[child._id] = child;
	this._nChildren++;
}

Object3D.prototype._calcTransf = function ( a, b ) {
	var transform = [];

	var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[4],
		a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8],
		a21 = a[9], a22 = a[10];

	// Cache only the current line of the second matrix
	var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	transform[0] = b0*a00 + b1*a10 + b2*a20;
	transform[1] = b0*a01 + b1*a11 + b2*a21;
	transform[2] = b0*a02 + b1*a12 + b2*a22;
	transform[3] = 0;

	b0 = b[4]; b1 = b[5]; b2 = b[6];
	transform[4] = b0*a00 + b1*a10 + b2*a20;
	transform[5] = b0*a01 + b1*a11 + b2*a21;
	transform[6] = b0*a02 + b1*a12 + b2*a22;
	transform[7] = 0;

	b0 = b[8]; b1 = b[9]; b2 = b[10];
	transform[8] = b0*a00 + b1*a10 + b2*a20;
	transform[9] = b0*a01 + b1*a11 + b2*a21;
	transform[10] = b0*a02 + b1*a12 + b2*a22;
	transform[11] = 0;

	b0 = b[12]; b1 = b[13]; b2 = b[14];
	transform[12] = b0*a00 + b1*a10 + b2*a20 + a[12];
	transform[13] = b0*a01 + b1*a11 + b2*a21 + a[13];
	transform[14] = b0*a02 + b1*a12 + b2*a22 + a[14];
	transform[15] = 1;
	return transform;
};

Object3D.prototype.getTransform = function() {
	if ( this._parent )
		return this._calcTransf( this._parent.getTransform(), this._transform );

	return this._transform;
}

Object3D.prototype.rotateX = function( alpha ) {
	this._alpha += alpha;

	var s = Math.sin( alpha );
	var c = Math.cos( alpha );

	var a10 = this._transform[1];
	var a11 = this._transform[5];
	var a12 = this._transform[9];
	var a20 = this._transform[2];
	var a21 = this._transform[6];
	var a22 = this._transform[10];

	this._transform[1]  =  c * a10 + s * a20;
	this._transform[2]  = -s * a10 + c * a20;
	this._transform[5]  =  c * a11 + s * a21;
	this._transform[6]  = -s * a11 + c * a21;
	this._transform[9]  =  c * a12 + s * a22; this._transform[10] = -s * a12 + c * a22;
}

Object3D.prototype.rotateY = function( beta ) {
	this._beta += beta;

	var s = Math.sin( beta );
	var c = Math.cos( beta );
	
	var a00 = this._transform[0];
	var a01 = this._transform[4];
	var a02 = this._transform[8];
	var a20 = this._transform[2];
	var a21 = this._transform[6];
	var a22 = this._transform[10];

	this._transform[0]  =  c * a00 + s * a20;
	this._transform[2]  = -s * a00 + c * a20;
	this._transform[4]  =  c * a01 + s * a21;
	this._transform[6]  = -s * a01 + c * a21;
	this._transform[8]  =  c * a02 + s * a22;
	this._transform[10] = -s * a02 + c * a22;
}

Object3D.prototype.rotateZ = function( gama ) {
	this._gama += gama;

	var s = Math.sin( gama );
	var c = Math.cos( gama );

	var a00 = this._transform[0];
	var a01 = this._transform[4];
	var a02 = this._transform[8];
	var a10 = this._transform[1];
	var a11 = this._transform[5];
	var a12 = this._transform[9];

	this._transform[0] =  c * a00 + s * a10;
	this._transform[1] = -s * a00 + c * a10;
	this._transform[4] =  c * a01 + s * a11;
	this._transform[5] = -s * a01 + c * a11;
	this._transform[8] =  c * a02 + s * a12;
	this._transform[9] = -s * a02 + c * a12;
}

Object3D.prototype.lookAt = function( object3d ) {

	var x  = this.getX() - object3d.getX();
	var y  = this.getY() - object3d.getY();
	var z  = this.getZ() - object3d.getZ();

	if( x == 0.0 && y == 0.0 && z == 0.0 )
		return;

	var distance = Math.sqrt( x*x + y*y + z*z );

	x = x/distance;
	y = y/distance;
	z = z/distance;

	this._transform[0 ] = z * this.getScaleX();
	this._transform[1 ] = 0.0;
	this._transform[2 ] = -x * this.getScaleX();
	this._transform[3 ] = 0.0;

	this._transform[4 ] = -x * y * this.getScaleY();
	this._transform[5 ] = (z * z + x * x) * this.getScaleY();
	this._transform[6 ] = -y * z * this.getScaleY();
	this._transform[7 ] = 0.0;

	this._transform[8 ] = x * this.getScaleZ();
	this._transform[9 ] = y * this.getScaleZ();
	this._transform[10] = z * this.getScaleZ();
	this._transform[11] = 0.0;

	this._transform[15] = 1.0;
}

Object3D.prototype.setRotation = function( alpha, beta, gama ) {
	this.rotateX( alpha - this._alpha );
	this.rotateY( beta  - this._beta  );
	this.rotateZ( gama  - this._gama  );
}

Object3D.prototype.getScaleX = function() {
	return this._scaleX;
}

Object3D.prototype.getScaleY = function() {
	return this._scaleY;
}

Object3D.prototype.getScaleZ = function() {
	return this._scaleZ;
}

Object3D.prototype.scaleX = function( scaleX ) {
	this._scaleX *= scaleX;
	this._transform[0] *= scaleX;
	this._transform[1] *= scaleX;
	this._transform[2] *= scaleX;
}

Object3D.prototype.scaleY = function( scaleY ) {
	this._scaleY *= scaleY;
	this._transform[4] *= scaleY;
	this._transform[5] *= scaleY;
	this._transform[6] *= scaleY;
}

Object3D.prototype.scaleZ = function( scaleZ ) {
	this._scaleZ *= scaleZ;
	this._transform[8 ] *= scaleZ;
	this._transform[9 ] *= scaleZ;
	this._transform[10] *= scaleZ;
}

Object3D.prototype.scale = function( scaleX, scaleY, scaleZ ) {
	this.scaleX( scaleX );
	this.scaleY( scaleY );
	this.scaleZ( scaleZ );
}

Object3D.prototype.setScale = function( scaleX, scaleY, scaleZ ) {
	this.scaleX( scaleX / this._scaleX );
	this.scaleY( scaleY / this._scaleY );
	this.scaleZ( scaleZ / this._scaleZ );
}

Object3D.prototype.setX = function( x ) {
	this._transform[12] = x;
}

Object3D.prototype.getX = function() {
	return this._transform[12];
}

Object3D.prototype.setY = function( y ) {
	this._transform[13] = y;
}

Object3D.prototype.getY = function() {
	return this._transform[13];
}

Object3D.prototype.setZ = function( z ) {
	this._transform[14] = z;
}

Object3D.prototype.getZ = function() {
	return this._transform[14];
}

Object3D.prototype.reset = function() {
	this._transform[0]  = 1.0;
	this._transform[1]  = 0.0;
	this._transform[2]  = 0.0;
	this._transform[3]  = 0.0;
	this._transform[4]  = 0.0;
	this._transform[5]  = 1.0;
	this._transform[6]  = 0.0;
	this._transform[7]  = 0.0;
	this._transform[8]  = 0.0;
	this._transform[9]  = 0.0;
	this._transform[10] = 1.0;
	this._transform[11] = 0.0;
	this._transform[12] = 0.0;
	this._transform[13] = 0.0;
	this._transform[14] = 0.0;
	this._transform[15] = 1.0;

	this._scaleX = 1.0;
	this._scaleY = 1.0;
	this._scaleZ = 1.0;

	this._alpha = 0.0;
	this._beta  = 0.0;
	this._gama  = 0.0;
}

Object3D.prototype.translateX = function( x ) {
	this._transform[12] += this._transform[0] * x;
	this._transform[13] += this._transform[1] * x;
	this._transform[14] += this._transform[2] * x;
}

Object3D.prototype.translateY = function( y ) {
	this._transform[12] += this._transform[4] * y;
	this._transform[13] += this._transform[5] * y;
	this._transform[14] += this._transform[6] * y;
}

Object3D.prototype.translateZ = function( z ) {
	this._transform[12] += this._transform[8 ] * z;
	this._transform[13] += this._transform[9 ] * z;
	this._transform[14] += this._transform[10] * z;
}

Object3D.prototype.translate = function( x, y, z ) {
	this.translateX( x );
	this.translateY( y );
	this.translateZ( z );
}

Object3D.prototype.setCenter = function( x, y, z ) {
	this._centerX = x;
	this._centerY = y;
	this._centerZ = z;
}

Object3D.prototype.setPosition = function( x, y, z ) {
	this._transform[12] = x;
	this._transform[13] = y;
	this._transform[14] = z;
}
