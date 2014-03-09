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
	var gl = Oxygen.getContext();
	this._aspectRation = gl.width / gl.height;
	Oxygen.addCamera( this );

	Object3D.call( this, x, y, z );
}

Camera.prototype = Object.create( Object3D.prototype );

Camera.prototype._fildOfView   = 45;
Camera.prototype._nearClip     = 0.1;
Camera.prototype._farClip      = 100.0;
Camera.prototype._aspectRation = 4/3;

Camera.prototype.reset = function() {
	var f = Math.tan( Math.PI * 0.5 - 0.5 * this._fildOfView );
	var r = 1.0 / ( this._nearClip - this._farClip );

	this._projection = [
		f / this._aspectRation, 0, 0, 0,
		0, f, 0, 0,
		0, 0, ( this._nearClip + this._farClip ) * r, -1,
		0, 0, 2 * ( this._nearClip * this._farClip ) * r, 0
	];

	Object3D.prototype.reset.call(this);
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

Camera.prototype.update = function() {
	var gl = Oxygen.getContext();
	gl.uniformMatrix4fv( gl.program.vMatrixUniform, false, mat4.invert( this.getTransform() ) );
	gl.uniformMatrix4fv( gl.program.pMatrixUniform, false, this.getProjectionMatrix() );
}
