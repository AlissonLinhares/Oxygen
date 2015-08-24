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
 * @final
 * @constructor
 * */
var Timer = {};

/*************************** VARIABLES SECTION *******************************/
/** @type {number} */ Timer.speed   = 1000 / 30;
/** @type {number} */ Timer.elapsed = 0.0;
/** @type {number} */ Timer.now     = 0.0;

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure configures the browser and map the Timer event to the
 * game engine.
 * @param {Oxygen} engine: engine reference.
 **/
Timer.init = function( engine ) {
	var now;
	var timeout;
	var abort;
	var request = null;

	if ( Date.now ) {
		now = Date.now;
	} else {
		now = function() {
			return new Date().getTime();
		}
	}

	if ( window.requestAnimationFrame && window.cancelAnimationFrame ) {
		timeout = window.requestAnimationFrame;
		abort   = window.cancelAnimationFrame;
	} else if ( window.webkitRequestAnimationFrame && window.webkitCancelRequestAnimationFrame ) {
		timeout = window.webkitRequestAnimationFrame;
		abort   = window.webkitCancelRequestAnimationFrame;
	} else if ( window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame ) {
		timeout = window.mozRequestAnimationFrame;
		abort   = window.mozCancelRequestAnimationFrame;
	} else if ( window.msRequestAnimationFrame && window.msCancelRequestAnimationFrame ) {
		timeout = window.msRequestAnimationFrame;
		abort   = window.msCancelRequestAnimationFrame;
	} else {
		timeout = function( callback ) {
			window.setTimeout( callback, Timer.speed );
		}

		abort  = window.clearTimeout;
	}

	Timer.stop = function() {
		if ( request )
			abort( request );
	}

	Timer.start = function() {
		Timer.stop();

		var ltime = now();
		var rtime = 0.0;

		function onTimeout() {
			var ctime = now();
			var delta = ((ctime - ltime) / Timer.speed ) + rtime;

			if ( delta > 1 ) {
				Timer.elapsed = delta;
				Timer.now    += delta;

				engine.onTimeout();
				engine.onUpdate();

				rtime = delta - Math.floor( delta );
				ltime = ctime;
			}

			request = timeout( onTimeout );
		}

		timeout( onTimeout );
	}

	window.onblur = function() {
		Timer.stop();
		engine.onBlur();
	}

	window.onfocus = function() {
		Timer.start();
		engine.onFocus();
	}

	Timer.start();
}
