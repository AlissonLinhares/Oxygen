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
var Resources = function() {
	
}

/**************************** CONSTS SECTION *********************************/
/** @const */ Resources.IMAGE  = 0;
/** @const */ Resources.AUDIO  = 1;
/** @const */ Resources.XML    = 2;
/** @const */ Resources.VIDEO  = 3;
/** @const */ Resources.SCRIPT = 4;

/*************************** VARIABLES SECTION *******************************/
/** @type {number} */ Resources.ready   = 0;
/** @type {number} */ Resources.waiting = 0;
/** @type {number} */ Resources.total   = 0;
/** @type {Array}  */ Resources.cache   = [];
/** @type {Array}  */ Resources.callback = [];
/** @type {Array}  */ Resources.loader  = [
	function ( src, onload ) {
		var image = new Image();
		image.onload = onload;
		image.src = src;
		return image;
	},

	function ( src, onload ) {
		var audio = document.createElement('audio');
		audio.oncanplaythrough = onload;
		audio.onerror = onload;
		audio.src = src;
		return audio;
	},

	function ( src, onload ) {
		var xml;

		if ( window.XMLHttpRequest )
			xml = new XMLHttpRequest();
		else
			xml = new ActiveXObject("Microsoft.XMLHTTP");

		xml.onload = onload;
		xml.open( "GET", src, true );
		xml.send();
		return xml;
	}
];

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure loads a resource from the server. If the resource is cached
 * and the 'cache' variable is false/undefined, this procedure returns the cached
 * version.
 *
 * @param {string} src: path of the resource.
 * @param {number} type: filter for objects returned.
 * @param {boolean=} cache: enable/disable cache.
 * @param {function()=} callback: callback function.
 */
Resources.load = function( src, type, cache, callback ) {
	if ( type >= Resources.loader.length || type < 0 )
		return;

	if ( callback )
		Resources.callback.push( callback );

	if ( ( Resources.cache[src] === undefined ) || ( cache === false ) ) {
		var onload = function() {
			Resources.waiting--;
			Resources.ready++;

			if ( Resources.waiting == 0 )
				Resources.notify();
		}

		Resources.waiting++;
		Resources.total++;
		Resources.cache[src] = Resources.loader[type]( src, onload );
	} else if ( Resources.waiting == 0 && callback ) {
		Resources.notify();
	}

	return Resources.cache[src];
}

Resources.notify = function() {
	var events = Resources.callback;

	for ( var i = 0, len = events.length; i < len; i++ )
		events[i]();

	Resources.callback = [];
}

Resources.get = function( src ) {
	return Resources.cache[src];
}
