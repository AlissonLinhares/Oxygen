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

Shape.prototype = Object.create( Object3D.prototype );

function Shape( x, y, z ) {
	Object3D.call( this, x, y, z );
}

Shape.prototype.visible           = true;
Shape.prototype.textureBuffer     = null;
Shape.prototype.normalBuffer      = null;
Shape.prototype.vertexBuffer      = null;
Shape.prototype.colorBuffer       = null;
Shape.prototype.vertexIndexBuffer = null;

Shape.prototype._glCreate = function( gl ) {
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, this.vertexBuffer, gl.STATIC_DRAW );

	var colorBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, this.colorBuffer, gl.STATIC_DRAW );

	var vertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer, gl.STATIC_DRAW );

	this._glVertexBuffer = vertexBuffer;
	this._glColorBuffer  = colorBuffer;
	this._glVertexIndexBuffer = vertexIndexBuffer;
	this._glTextureBuffer = vertexIndexBuffer;
}

Shape.prototype._glConfig = function( gl ) {
	gl.uniformMatrix4fv( gl.program.mvMatrixUniform, false, this.getTransform() );

	gl.bindBuffer( gl.ARRAY_BUFFER, this._glVertexBuffer );
	gl.vertexAttribPointer( gl.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0 );

	// if ( this._glTextureBuffer ) {
	// 	gl.bindBuffer( gl.ARRAY_BUFFER, this._glTextureBuffer );
	// 	gl.vertexAttribPointer( gl.program.vertexTextureAttribute, 4, gl.FLOAT, false, 0, 0 );
	// } if ( this._glColorBuffer ) {
		gl.bindBuffer( gl.ARRAY_BUFFER, this._glColorBuffer );
		gl.vertexAttribPointer( gl.program.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0 );
	// }
}

Shape.prototype._glDraw = function( gl ) {
	if ( this.visible && this._glVertexBuffer ) {
		this._glConfig( gl );

		if ( this._glVertexIndexBuffer ) {
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this._glVertexIndexBuffer );
			gl.drawElements( gl.TRIANGLES, this.vertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0 );
		} else {
			gl.drawArrays( gl.TRIANGLE_STRIP, 0, this.vertexBuffer.length / 3 );
		}
	}
}

Shape.prototype._glUpdate = function( gl ) {

}

Shape.prototype._glDestroy = function( gl ) {
	gl.deleteBuffer( this._glVertexBuffer );
	gl.deleteBuffer( this._glColorBuffer );
	gl.deleteBuffer( this._glVertexIndexBuffer );
	gl.deleteBuffer( this._glTextureBuffer );
}
