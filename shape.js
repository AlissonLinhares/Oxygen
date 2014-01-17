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

var Shape = function( x, y, z ) {
	Object3D.call( this, x, y, z );
	this.create();
}

Shape.prototype = Object.create( Object3D.prototype );

Shape.prototype.visible           = true;
Shape.prototype.textureBuffer     = null;
Shape.prototype.normalBuffer      = null;
Shape.prototype.vertexBuffer      = null;
Shape.prototype.colorBuffer       = null;
Shape.prototype.vertexIndexBuffer = null;

Shape.prototype.create = function() {
	if ( this.vertexBuffer )
		this._glVertexBuffer      = Oxygen.glCreateArrayBuffer( this.vertexBuffer );

	if ( this.colorBuffer )
		this._glColorBuffer       = Oxygen.glCreateArrayBuffer( this.colorBuffer );

	if ( this.vertexIndexBuffer )
		this._glVertexIndexBuffer = Oxygen.glCreateElementBuffer( this.vertexIndexBuffer );

	Oxygen.addShape( this );
}

Shape.prototype.config = function() {
	var gl = Oxygen.getContext();
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

Shape.prototype.draw = function() {
	var gl = Oxygen.getContext();

	if ( this.visible && this._glVertexBuffer ) {
		this.config( gl );

		if ( this._glVertexIndexBuffer ) {
			gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this._glVertexIndexBuffer );
			gl.drawElements( gl.TRIANGLES, this.vertexIndexBuffer.length, gl.UNSIGNED_SHORT, 0 );
		} else {
			gl.drawArrays( gl.TRIANGLE_STRIP, 0, this.vertexBuffer.length / 3 );
		}
	}
}

Shape.prototype.update = function() {

}

Shape.prototype.destroy = function() {
	Oxygen.glDeleteBuffer( this._glVertexBuffer );
	Oxygen.glDeleteBuffer( this._glVertexBuffer );
	Oxygen.glDeleteBuffer( this._glVertexIndexBuffer );
	Oxygen.glDeleteBuffer( this._glTextureBuffer );
}
