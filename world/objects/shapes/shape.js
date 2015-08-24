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

/****************************** CONSTRUCTOR **********************************
 *
 * @constructor
 * @extends {Object3D}
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Shape = function( x, y, z ) {
	this.faces = [];
	Object3D.call( this, x, y, z );
}

Shape.prototype = Object.create( Object3D.prototype );

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure inserts a face into this shape.
 * @param {Face} face: list of vertex.
 **/
Shape.prototype.addFace = function( face ) {
	this.faces.push(face);
}

/**
 * This procedure returns an array that contains all faces.
 * @return {?Array<Face>}
 **/
Shape.prototype.getFaces = function() {
	return this.faces;
}

/**
 * This procedure updates all informations related to the generation of an image.
 * Every time something changes into the coordinate system, the game engine calls
 * the update procedure to recalculate the result image. This process is
 * automatic, therefore you should let the engine do this action for you.
 * @override
 * @param {Camera} cam: main camera
 **/
Shape.prototype.update = function( cam ) {
	Object3D.prototype.update.call( this, cam );

	// Creating a new image.
	this.build();

	// Updating the image with the screen coordinates.
	var w = Object3D.tileWidth;
	var h = Object3D.tileHeight;
	var x = this.screenX;
	var y = this.screenY;

	for ( var i = 0, flen = this.faces.length; i < flen; i++ ) {
		var face = this.faces[i];
		var vertex = face.getVertex();

		for ( var j = 0, vlen = vertex.length; j < vlen; j++ ) {
			vertex[j][0] = x + vertex[j][0] * w;
			vertex[j][1] = y + vertex[j][1] * h;
		}
	}
}

/**
 * This procedure is used by the engine to recalculate the faces coordinates
 * and size.
 */
Shape.prototype.build = function() {

}

/**
 * This procedure is used by the Render to draw this shape on the screen.
 * @param {?} context
 */
Shape.prototype.draw = function( context ) {
	for ( var i = 0, len = this.faces.length; i < len; i++ ) {
		var face = this.faces[i];

		if ( face.isVisible() ) {
			var vertex = face.getVertex();
			var vlength = vertex.length;

			context.beginPath();
			context.moveTo( vertex[0][0], vertex[0][1] );

			for ( var j = 1; j < vlength; j++ )
				context.lineTo( vertex[j][0], vertex[j][1] );

			context.lineTo( vertex[0][0], vertex[0][1] );
			context.fillStyle = face.getTexture();
			context.fill();

// 			context.strokeStyle = "#000000";
// 			context.stroke();
		}
// 
// 		context.beginPath();
// 		context.fillStyle = "#FF0000";
// 		context.fillText( this.depth, this.screenX, this.screenY, Object3D.tileWidth, Object3D.tileHeight );
// 		context.fill();
	}
}
