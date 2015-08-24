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
var TileSet = function( path ) {
	var _this = this;

	function load() {
		var xml = Resources.get( path ).responseXML;
		var img = xml.getElementsByTagName("sprite")[0].childNodes[0].nodeValue;
		var keys = xml.getElementsByTagName("tile");

		_this.sprite = Resources.load( img, Resources.IMAGE );
		_this.materials = [];
		_this.index = [];

		for ( var i = 0, len = keys.length; i < len; i++ ) {
			var tile    = {};
			tile.name   = keys[i].getAttribute("name");
			tile.x      = parseInt( keys[i].getAttribute("x"), 10 );
			tile.y      = parseInt( keys[i].getAttribute("y"), 10 );
			tile.tw     = parseInt( keys[i].getAttribute("tw"), 10 );
			tile.th     = parseInt( keys[i].getAttribute("th"), 10 );
			tile.height = parseInt( keys[i].getAttribute("height"), 10 );
			tile.sprite = _this.sprite;
			tile.draw   = function( context, x, y, w, h ) {
				h = this.th * h / (this.th-this.height)
				y -= h / 2;
				x -= w / 2;

				context.drawImage( this.sprite, this.x, this.y, this.tw, this.th, x, y, w, h );
			}

			_this.index[tile.name] = _this.materials.length;
			_this.materials.push( tile );
		}
	}

	Resources.load( path, Resources.XML, true, load );
}

TileSet.prototype.sprite = null;
TileSet.prototype.index = null;
TileSet.prototype.materials  = null;;

TileSet.prototype.isReady = function() {
	return this.sprite && this.sprite.complete;
}

TileSet.prototype.create = function( name, x, y, z ) {
	var material = this.materials[this.index[name]]

	if ( !material )
		return null;
	var tile = new Tile( material, x, y, z );
	
	// TODO create a global constant
	// 50 == tilesize
	tile.setScale( 1.0, material.height / 50, 1.0 );
	return tile;
}
