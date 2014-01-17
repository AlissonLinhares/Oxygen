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

function Canvas( width, height ) {
	this._renderBuffer = [];

	var canvas            = document.createElement( 'canvas' );
	canvas.id             = "view";
	canvas.width          = width;
	canvas.height         = height;
	canvas.style.zIndex   = 1;
	canvas.style.position = "relative";
	canvas.style.border   = "1px solid";
	document.body.appendChild( canvas );

	try {
		this._gl = canvas.getContext( "webgl" );
		this._gl.width   = width;
		this._gl.height  = height;
		this._gl.program = createShaderProgram( this._gl );

		this._gl.enable( this._gl.DEPTH_TEST );
		this._gl.viewport( 0, 0, width, height );

		this.clear();
	} catch(e) {
		alert( "Error: could not initialise WebGL!" + e );
	}
}

Canvas.prototype.clear = function( r, g, b ) {
	this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT );

	if ( arguments.length != 3 )
		this._gl.clearColor( r, g, b, 1.0 );
	else
		this._gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
}

Canvas.prototype.update = function() {
	this._gl.clear( this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT );

	if ( this._camera )
		this._gl.uniformMatrix4fv( this._gl.program.pMatrixUniform, false, this._camera._transform );

	for( var i = 0; i < this._renderBuffer.length; i++ ) {
		var shape = this._renderBuffer[i];
		shape._glDraw( this._gl );
	}
}

Canvas.prototype.addCamera = function( camera ) {
	this._camera = camera;
}

Canvas.prototype.addShape = function( shape ) {
	// Prepare the shape for rendering;
	shape._glCreate( this._gl );
	this._renderBuffer.push( shape );
}

Canvas.prototype.removeShape = function( shape ) {
		
}
