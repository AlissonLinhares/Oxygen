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
 * @param {Oxygen}
 **/
var Selection = function( oxygen ) {
	this.oxygen = oxygen;
	this.list = [];
}

Selection.prototype.add = function( object ) {
	object.setVisible( false );

	var node = new Cube( object.getX(), object.getY(), object.getZ() );
	node.showWireframe( true );
	node.getFaces()[0].setTexture( "#FF0000" );
	node.getFaces()[1].setTexture( "#FF0000" );
	node.getFaces()[2].setTexture( "#FF0000" );
	node.setScale( object.getScaleX(), object.getScaleY(), object.getScaleZ() );

	node._selection_key = this.list.length;
	node._selection_obj = object;

	this.list.push( node );
	this.oxygen.add( node );
}

Selection.prototype.remove = function( node ) {
	var key = node._selection_key;

	if ( this.list[key] == node ) {
		var last = this.list.pop();

		if ( key != last._selection_key ) {
			last._selection_key = key;
			this.list[key] = last;
		}

		var obj = node._selection_obj;
		obj.setVisible( true );
		obj.setPosition( node.getX(), node.getY(), node.getZ() );
		obj.setScale( node.getScaleX(), node.getScaleY(), node.getScaleZ() );

		node._selection_obj = undefined;
		node._selection_key = undefined;
		this.oxygen.remove( node );
	}
}

Selection.prototype.pick = function( object ) {
	// Checks if object is a selection
	if ( object._selection_key !== undefined ) {
		this.remove( object );
	} else {
		this.add( object );
	}
}

Selection.prototype.clear = function() {
	for ( var i = 0, len = this.list.length; i < len; i++ ) {
		var node = this.list[i];
		var obj = node._selection_obj;
		obj.setVisible( true );
		obj.setPosition( node.getX(), node.getY(), node.getZ() );
		obj.setScale( node.getScaleX(), node.getScaleY(), node.getScaleZ() );

		node._selection_obj = undefined;
		node._selection_key = undefined;
		this.oxygen.remove( node );
	}

	this.list = [];
}

Selection.prototype.onTap = function( event ) {
	if ( !Keyboard.isDown( KEY_CTRL ) )
		this.clear();

	var render = this.oxygen.getRender();
	var obj = render.getObjectAt( event.getX(), event.getY() );

	if ( obj === null )
		return;

	this.pick( obj );
}

Selection.prototype.onKeyDown = function() {
	if ( Keyboard.isDown( KEY_ESC ) )
		this.clear();
}

Selection.prototype.onPress = function( event ) {
	this.axis = event.getAxis();
}

Selection.prototype.onDrag = function( event ) {
	var axis = event.getAxis();
	var x = axis.x - this.axis.x;
	var z = axis.y - this.axis.y;
	this.axis = axis;

	for ( var i = 0, len = this.list.length; i < len; i++ )
		this.list[i].translate( x, 0, z );
}
