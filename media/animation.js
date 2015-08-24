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
var Animation = function( path ) {
	var _this = this;

	function load() {
		var xml = Resources.get( path ).responseXML;
		var img = xml.getElementsByTagName("sprite")[0].childNodes[0].nodeValue;
		var keys = xml.getElementsByTagName("animation");

		_this.sprite = Resources.load( img, Resources.IMAGE );
		_this.animations = [];
		_this.index = [];

		for ( var i = 0, len = keys.length; i < len; i++ ) {
			var anim    = {};
			anim.name   = keys[i].getAttribute("name");
			anim.x      = parseInt( keys[i].getAttribute("x"), 10 );
			anim.y      = parseInt( keys[i].getAttribute("y"), 10 );
			anim.tw     = parseInt( keys[i].getAttribute("tw"), 10 );
			anim.th     = parseInt( keys[i].getAttribute("th"), 10 );
			anim.length = parseInt( keys[i].getAttribute("length"), 10 );

			_this.index[anim.name] = _this.animations.length;
			_this.animations.push( anim );
		}

		_this.current = anim;
	}

	Resources.load( path, Resources.XML, true, load );
}

Animation.prototype.index = null;
Animation.prototype.animations = null;
Animation.prototype.sprite = null;
Animation.prototype.current = 0;
Animation.prototype.speed  = 1;
Animation.prototype.time = 0;
Animation.prototype.key  = 0;
Animation.prototype.paused = false;

Animation.prototype.isReady = function() {
	return this.sprite && this.sprite.complete;
}

Animation.prototype.isPlaying = function() {
	this.paused = true;
}

Animation.prototype.play = function( animation ) {
	if ( animation ) {
		var index = this.index[animation];
		var anim  = this.animations[index];

		if ( anim && (this.current !== anim) ) {
			this.current = anim;
			this.key     = 0;
		}
	}

	this.paused = false;
}

Animation.prototype.pause = function() {
	this.paused = true;
}

Animation.prototype.stop = function() {
	this.paused = true;
	this.time = 0;
	this.key  = 0;
}

Animation.prototype.setSpeed = function( speed ) {
	this.speed = speed;
}

Animation.prototype.getSpeed = function() {
	return this.speed;
}

Animation.prototype.draw = function( context, x, y, w, h ) {
	if ( !this.isReady() )
		return;

	if ( !this.paused ) {
		this.time += Timer.elapsed * this.speed;
		this.key   = Math.floor( this.time % this.current.length );
	}

	var anim = this.current;
	var scaleX = w * anim.tw / 50;
	var scaleY = h * anim.th / 30;
	context.drawImage( this.sprite, anim.x + anim.tw * this.key, anim.y, anim.tw, anim.th, x - scaleX/2, y - scaleY/2, scaleX, scaleY );
}
