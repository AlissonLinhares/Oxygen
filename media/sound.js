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
 * This class is used to play audio files.
 * @constructor
 * @param {string} path: file src
 **/
var Sound = function( path ) {
	var audio = Resources.load( path, Resources.AUDIO );
	var fadeTime = 0;
	var isFading = false;
	var volNotFaded = 0;

	this.isReady = function() {
		// There is enough data available to start playing?
		return audio && (audio.readyState == 4);
	}

	this.IsSupported = function() {
		return audio.canPlayType() === "probably";
	}

	this.play = function() {
		audio.play();
	}

	this.pause = function() {
		audio.pause();
	}

	this.stop = function() {
		audio.pause();
		audio.currentTime = 0;
	}

	this.replay = function() {
		audio.currentTime = 0;
		audio.play();
	}

	this.loop = function() {
		audio.loop = true;
	}

	this.stopReplay = function() {
		audio.loop = false;
	}

	this.isMuted = function() {
		return audio.muted;
	}

	this.mute = function() {
		audio.muted = true;
	}

	this.unmute = function() {
		audio.muted = false;
	}

	this.getVolume = function() {
		return audio.volume*100;
	}

	this.setVolume = function( vol ) {
		audio.volume = vol / 100;
	}

	this.getTime = function() {
		return audio.currentTime;
	}

	this.setTime = function( time ) {
		audio.currentTime = time;
	}

	this.isFading = function() {
		return isFading;
	}

	// this.fadeIn = function( rate ) {
	// 	if(!isFading){
	// 		isFading = true;
	// 		fadeTime = this.getTime();
	// 		volNotFaded = this.getVolume();
	// 		this.setVolume( 0 );

	// 		if(!this.isPlaying())
	// 			this.play();
	// 	}

	// 	var vol = (this.getTime() - fadeTime)*rate;

	// 	if(vol < volNotFaded)
	// 		this.setVolume( vol );
	// 	else{
	// 		this.setVolume( volNotFaded );
	// 		isFading = false;
	// 	}
	// }

	// this.fadeOut = function( rate ) {
	// 	var vol = this.getVolume();

	// 	if(!isFading){
	// 		isFading = true;
	// 		fadeTime = this.getTime();
	// 		volNotFaded = vol;
	// 	}

	// 	if(vol > 0){
	// 		vol = volNotFaded - (this.getTime() - fadeTime)*rate;
	// 		if(vol >= 0)
	// 			this.setVolume( vol );
	// 		else
	// 			this.setVolume( 0 );
	// 	} else {
	// 		this.pause();
	// 		this.setVolume( volNotFaded );
	// 		isFading = false;
	// 	}
	// }
}
