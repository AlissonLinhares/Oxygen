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
 * @constructor
 */
var Canvas = function() {
	document.documentElement.style.webkitTouchCallout = "none";
	document.documentElement.style.webkitUserSelect   = "none";

	var width    = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
	var height   = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var canvas   = document.createElement('canvas');
	var context  = canvas.getContext('2d');
	var style    = canvas.style;
	var bgColor  = "#000000";

	canvas.width   = width;
	canvas.height  = height;
	style.width    = width;
	style.height   = height;
	style.position = "absolute";
	style.zIndex   = -1;
	style.margin   = 0;
	style.padding  = 0;
	style.top      = 0;
	style.left     = 0;
	document.body.appendChild( canvas );

	this.getWidth = function() {
		return width;
	}

	this.getHeight = function() {
		return height;
	}

	this.resize = function() {
		width          = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
		height         = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		canvas.width   = width;
		canvas.height  = height;
		style.width    = width;
		style.height   = height;
	}

	this.getContext = function() {
		return context;
	}

	this.setBGColor = function( color ) {
		bgColor = color;
	}

	this.getBGColor = function() {
		return bgColor;
	}

	this.clear = function() {
		context.fillStyle = bgColor;
		context.fillRect( 0, 0, width, height );
	}
}
