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

var defaultShaderVsSrc =
"attribute vec2 aTextureCoord;" +
"attribute vec3 aVertexPosition;" +
"attribute vec4 aVertexColor;" +

"uniform mat4 uMVMatrix;" +
"uniform mat4 uVMatrix;" +
"uniform mat4 uPMatrix;" +

"varying vec2 vTextureCoord;" +
"varying vec4 vColor;" +

"void main() {" +
"	gl_Position = uPMatrix * ( uVMatrix * uMVMatrix ) * vec4( aVertexPosition, 1.0 );" +
"	vColor = aVertexColor;" +
"	vTextureCoord = aTextureCoord;" +
"}";

var defaultShaderFsSrc =
"precision mediump float;" +

"varying vec4 vColor;" +
"varying vec2 vTextureCoord;" +

"uniform sampler2D uSampler;" +
"uniform bool enableTexture;" +

"void main() {" +
"	if ( enableTexture ) {" +
"		gl_FragColor = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ) );" +
"	} else {" +
"		gl_FragColor = vColor;" +
"	}" +
"}";


function compileShader ( gl, source, type ) {
	var shader = gl.createShader( type );
	gl.shaderSource( shader, source );
	gl.compileShader( shader );

	if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
		gl.deleteShader(shader);
		throw new Error( "Error compiling shader" + gl.getShaderInfoLog(shader) );
	}

	return shader;
}

function createShaderProgram( gl, shaderVs, shaderFs ) {
	if( !shaderVs || !shaderFs ) {
		shaderVs = defaultShaderVsSrc;
		shaderFs = defaultShaderFsSrc;
	}

	var program = gl.createProgram();
	gl.attachShader( program, compileShader( gl, shaderVs, gl.VERTEX_SHADER ) );
	gl.attachShader( program, compileShader( gl, shaderFs, gl.FRAGMENT_SHADER ) );
	gl.linkProgram( program );

	if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) )
		throw new Error("Error: link not found!");

	gl.useProgram( program );
	program.vertexPositionAttribute = gl.getAttribLocation( program, "aVertexPosition" );
	gl.enableVertexAttribArray( program.vertexPositionAttribute );

	program.vertexColorAttribute = gl.getAttribLocation( program, "aVertexColor" );
	gl.enableVertexAttribArray( program.vertexColorAttribute );

	program.textureCoordAttribute = gl.getAttribLocation( program, "aTextureCoord" );
	gl.enableVertexAttribArray( program.textureCoordAttribute );

	program.enableTexture = gl.getUniformLocation( program, "enableTexture" );

	program.pMatrixUniform = gl.getUniformLocation( program, "uPMatrix" );
	program.vMatrixUniform = gl.getUniformLocation( program, "uVMatrix" );
	program.mvMatrixUniform = gl.getUniformLocation( program, "uMVMatrix" );
	program.samplerUniform = gl.getUniformLocation( program, "uSampler");

	return program;
}
