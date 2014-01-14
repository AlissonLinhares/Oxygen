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
	canvas.style.position = "absolute";
	canvas.style.border   = "1px solid";
	document.body.appendChild( canvas );

	try {
		this._gl = canvas.getContext( "webgl" );
		this._gl.width   = width;
		this._gl.height  = height;
		this._gl.program = createShaderProgram( this._gl );

		this.clear();
	} catch(e) {
		alert( "Error: could not initialise WebGL!" + e );
	}
}

Canvas.prototype.clear = function() {
	with( this._gl ) {
		clearColor( 0.0, 0.0, 0.0, 1.0 );
		enable( DEPTH_TEST );
		viewport( 0, 0, width, height );
		clear( COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT );
	}
}

Canvas.prototype.update = function() {
	with( this._gl ) {
		clear( COLOR_BUFFER_BIT | DEPTH_BUFFER_BIT );

		if ( this._camera )
			uniformMatrix4fv( program.pMatrixUniform, false, this._camera._transform );

		for( var i = 0; i < this._renderBuffer.length; i++ ) {
			var shape = this._renderBuffer[i];

			bindBuffer( ARRAY_BUFFER, shape._glVertexBuffer );
			vertexAttribPointer( program.vertexPositionAttribute, 3, FLOAT, false, 0, 0 );

			bindBuffer( ARRAY_BUFFER, shape._glColorBuffer );
			vertexAttribPointer( program.vertexColorAttribute, 4, FLOAT, false, 0, 0 );

			uniformMatrix4fv( program.mvMatrixUniform, false, shape.getTransform() );
			drawArrays( TRIANGLE_STRIP, 0, shape.getNumberOfVertices() );
		}
	}
}

Canvas.prototype.addCamera = function( camera ) {
	this._camera = camera;
}

Canvas.prototype.addShape = function( shape ) {
	with( this._gl ) {
		var vertexBuffer = createBuffer();
		bindBuffer( ARRAY_BUFFER, vertexBuffer );
		bufferData( ARRAY_BUFFER, new Float32Array( shape.getVertexBuffer() ), STATIC_DRAW );

		var colorBuffer = createBuffer();
		bindBuffer( ARRAY_BUFFER, colorBuffer );
		bufferData( ARRAY_BUFFER, new Float32Array( shape.getColorBuffer() ), STATIC_DRAW );
	}

	shape._glVertexBuffer = vertexBuffer;
	shape._glColorBuffer  = colorBuffer;

	this._renderBuffer.push( shape );
}
