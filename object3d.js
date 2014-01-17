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
 
function Object3D( x, y, z ){
	this._alpha = 0.0;
	this._beta  = 0.0;
	this._gama  = 0.0;

	this._scaleX = 1.0;
	this._scaleY = 1.0;
	this._scaleZ = 1.0;

	// Create a transform matrix;
	this._transform = new Float32Array( 16 );

	// Inicialize the transform matrix;
	this.reset();

	if ( arguments.length == 3 )
		this.translate( x, y, z );
}

/**
 * @remarks This function was based in roateX from glMatrix.js. We didn't use
 * the original version, because we believe that it would be easier to changes
 * this source file in the future.
 */
Object3D.prototype.rotateX = function( alpha ) {
	this._alpha += alpha;

	var s = Math.sin( alpha );
	var c = Math.cos( alpha );

	var a10 = this._transform[4], a11 = this._transform[5], a12 = this._transform[6], a13 = this._transform[7];
	var a20 = this._transform[8], a21 = this._transform[9], a22 = this._transform[10], a23 = this._transform[11];

	this._transform[4]  =  a10 * c + a20 * s;
	this._transform[5]  =  a11 * c + a21 * s;
	this._transform[6]  =  a12 * c + a22 * s;
	this._transform[7]  =  a13 * c + a23 * s;
	this._transform[8]  =  a10 * -s + a20 * c;
	this._transform[9]  =  a11 * -s + a21 * c;
	this._transform[10] =  a12 * -s + a22 * c;
	this._transform[11] =  a13 * -s + a23 * c;
}

/**
 * @remarks This function was based in roateY from glMatrix.js. We didn't use
 * the original version, because we believe that it would be easier to changes
 * this source file in the future.
 */
Object3D.prototype.rotateY = function( beta ) {
	this._beta += beta;

	var s = Math.sin( beta );
	var c = Math.cos( beta );

	var a00 = this._transform[0], a01 = this._transform[1], a02 = this._transform[2], a03 = this._transform[3];
	var a20 = this._transform[8], a21 = this._transform[9], a22 = this._transform[10], a23 = this._transform[11];

	this._transform[0]  = a00 * c + a20 * -s;
	this._transform[1]  = a01 * c + a21 * -s;
	this._transform[2]  = a02 * c + a22 * -s;
	this._transform[3]  = a03 * c + a23 * -s;

	this._transform[8]  = a00 * s + a20 * c;
	this._transform[9]  = a01 * s + a21 * c;
	this._transform[10] = a02 * s + a22 * c;
	this._transform[11] = a03 * s + a23 * c;
}

/**
 * @remarks This function was based in roateZ from glMatrix.js. We didn't use
 * the original version, because we believe that it would be easier to changes
 * this source file in the future.
 */
Object3D.prototype.rotateZ = function( gama ) {
	this._gama += gama;

	var s = Math.sin( gama );
	var c = Math.cos( gama );

	var a00 = this._transform[0], a01 = this._transform[1], a02 = this._transform[2], a03 = this._transform[3];
	var a10 = this._transform[4], a11 = this._transform[5], a12 = this._transform[6], a13 = this._transform[7];

	this._transform[0] = a00 * c + a10 * s;
	this._transform[1] = a01 * c + a11 * s;
	this._transform[2] = a02 * c + a12 * s;
	this._transform[3] = a03 * c + a13 * s;

	this._transform[4] = a00 * -s + a10 * c;
	this._transform[5] = a01 * -s + a11 * c;
	this._transform[6] = a02 * -s + a12 * c;
	this._transform[7] = a03 * -s + a13 * c;
}

Object3D.prototype.lookAt = function( object3d ) {

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
	this._transform[3] *= scaleX;
}

Object3D.prototype.scaleY = function( scaleY ) {
	this._scaleY *= scaleY;
	this._transform[4] *= scaleY;
	this._transform[5] *= scaleY;
	this._transform[6] *= scaleY;
	this._transform[7] *= scaleY;
}

Object3D.prototype.scaleZ = function( scaleZ ) {
	this._scaleZ *= scaleZ;
	this._transform[8 ] *= scaleZ;
	this._transform[9 ] *= scaleZ;
	this._transform[10] *= scaleZ;
	this._transform[11] *= scaleZ;
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
	this._transform[15] += this._transform[3] * x;
}

Object3D.prototype.translateY = function( y ) {
	this._transform[12] += this._transform[4] * y;
	this._transform[13] += this._transform[5] * y;
	this._transform[14] += this._transform[6] * y;
	this._transform[15] += this._transform[7] * y;
}

Object3D.prototype.translateZ = function( z ) {
	this._transform[12] += this._transform[8 ] * z;
	this._transform[13] += this._transform[9 ] * z;
	this._transform[14] += this._transform[10] * z;
	this._transform[15] += this._transform[11] * z;
}

Object3D.prototype.translate = function( x, y, z ) {
	this.translateX( x );
	this.translateY( y );
	this.translateZ( z );
}

Object3D.prototype.setPosition = function( x, y, z ) {
	this._transform[12] = x;
	this._transform[13] = y;
	this._transform[14] = z;
}

Object3D.prototype.getTransform = function() {
	return this._transform;
}

	// var str = " ";
	// for ( var i = 0; i < 16; i++ ) {
	// 	// for ( var j = 0; j < 4; j++ ) {
	// 		str += this._transform[i] + "[" + i + "]" + ", ";
	// 	// }
	// 	str += "\n";
	// }
	// alert( str );
