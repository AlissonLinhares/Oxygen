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

var FPSCamera = function( x, y, z ) {
	Camera.call( this, 0, 0, 0 );

	var cam = new Object3D( x, y, z );
	cam.add( this );

	FPSCamera.prototype.getX       = cam.getX;
	FPSCamera.prototype.getY       = cam.getY;
	FPSCamera.prototype.getZ       = cam.getZ;

	FPSCamera.prototype.setX       = cam.setX;
	FPSCamera.prototype.setY       = cam.setY;
	FPSCamera.prototype.setZ       = cam.setZ;

	FPSCamera.prototype.translateX = cam.translateX;
	FPSCamera.prototype.translateY = cam.translateY;
	FPSCamera.prototype.translateZ = cam.translateZ;
	FPSCamera.prototype.translate  = cam.translate;
	FPSCamera.prototype.position   = cam.position;

	FPSCamera.prototype.rotateZ    = cam.rotateZ;
	FPSCamera.prototype.rotateY    = cam.rotateY;
	FPSCamera.prototype.setCenter  = cam.setCenter;
	FPSCamera.prototype.getTransform  = cam.getTransform;

	this._key = new Keyboard();

	this._normalSpeed  = 4.0;
	this._maxSpeed     = 2.0;
	this._rotateSpeed  = 7.0;
	this._acceleration = 0.1;
	this._currentSpeed = 0.1;
}

FPSCamera.prototype = Object.create( Camera.prototype );

FPSCamera.prototype.update = function() {
	if ( this._key.isDown( "up" ) )
		this.rotateX( 0.1 );
	else if ( this._key.isDown( "down" ) )
		this.rotateX( -0.1 );

	if ( this._key.isDown( "left" ) )
		this.rotateY( 0.1 );
	else if( this._key.isDown( "right" ) )
		this.rotateY( -0.1 );

	if ( this._key.isDown( "a" ) )
		this.translateX( -0.3 );
	else if ( this._key.isDown( "d" ) )
		this.translateX( 0.3 );

	if ( this._key.isDown( "w" ) ) )
		this._currentSpeed -= this._acceleration;
	else if ( this._key.isDown( "s" ) )
		this._currentSpeed += this._acceleration;
	else if ( this._currentSpeed > 0.1 )
		this._currentSpeed /= 2.0;
	else
		this._currentSpeed = 0.0;

	var forwardSpeed = 0.0;
	if (( forwardSpeed < this._maxSpeed ) && ( forwardSpeed > this._maxSpeed )) {
		this.translateZ( this._currentSpeed );
	}

	Camera.prototype.update.call( this );
}

FPSCamera.prototype.getCurrentSpeed = function() {
	return this._currentSpeed;
}

FPSCamera.prototype.setNormalSpeed = function( normalSpeed ) {
	this._normalSpeed = normalSpeed;
}

FPSCamera.prototype.setMaxSpeed = function( maxSpeed ) {
	this._maxSpeed = maxSpeed;
}

FPSCamera.prototype.rotateSpeed = function( rotateSpeed ) {
	this._rotateSpeed = rotateSpeed;
}

FPSCamera.prototype.setAcceleration = function( acceleration ) {
	this._acceleration = acceleration;
}
