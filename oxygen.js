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

function Oxygen( width, height ) {
	var shapes  = [];
	var cameras = [];

	var canvas            = document.createElement( 'canvas' );
	canvas.id             = "OxygenView";
	canvas.width          = width;
	canvas.height         = height;
	canvas.style.zIndex   = 1;
	canvas.style.position = "relative";
	canvas.style.border   = "1px solid";
	document.body.appendChild( canvas );

	try {
		var gl     = canvas.getContext( "webgl" );
		gl.width   = width;
		gl.height  = height;
		gl.program = createShaderProgram( gl );

		gl.enable( gl.DEPTH_TEST );
		gl.viewport( 0, 0, width, height );
		gl.clearColor( 0.2, 0.2, 0.2, 1.0 );
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	} catch(e) {
		alert( "Error: could not initialise WebGL!" + e );
	}

	Oxygen.glClear = function( r, g, b ) {
		if ( arguments.length != 3 )
			gl.clearColor( r, g, b, 1.0 );
		else
			gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	}

	Oxygen.glCreateArrayBuffer = function( buffer ) {
		var result = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, result );
		gl.bufferData( gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW );
		return result;
	}

	Oxygen.glCreateElementBuffer = function( buffer ) {
		var result = gl.createBuffer();
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, result );
		gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, buffer, gl.STATIC_DRAW );
		return result;
	}

	Oxygen.glCreateTextureBuffer = function( image, interpolation ) {
		var result = gl.createTexture();

		gl.bindTexture( gl.TEXTURE_2D, result );
		gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );

		gl.bindTexture( gl.TEXTURE_2D, null );
		return result;
	}

	Oxygen.glDeleteBuffer = function( buffer ) {
		gl.deleteBuffer( buffer );
	}

	Oxygen.getContext = function() {
 		return gl;
	}

	Oxygen.addCamera = function( camera ) {
		cameras.push( camera );
	}

	Oxygen.addShape = function( shape ) {
		shapes.push( shape );
	}

	Oxygen.prototype.update = function( obj ) {
		this.onUpdate();

		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		if ( cameras.length > 0 )
			gl.uniformMatrix4fv( gl.program.pMatrixUniform, false, cameras[0]._transform );

		for( var i = 0; i < shapes.length; i++ )
			shapes[i].draw();

		setTimeout( function() { obj.update( obj ); }, 100 );
	}

	Oxygen.prototype.start = function() {
		this.onStart();
		this.update( this );
	}
}

/******************************** Object List ********************************/
Oxygen.prototype.Object3D   = Object3D;
Oxygen.prototype.Shape      = Shape;
Oxygen.prototype.Cube       = Cube;
Oxygen.prototype.Sphere     = Sphere;
Oxygen.prototype.Pyramid    = Pyramid;
Oxygen.prototype.Camera     = Camera;
Oxygen.prototype.Texture    = Texture;

/********************************* Event List ********************************/
Oxygen.prototype.onUpdate   = function() {};
Oxygen.prototype.onStart    = function() {};
