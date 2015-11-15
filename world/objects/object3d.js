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
 * Object3D implements all basics spatial transformations. This class uses
 * a three dimensional cartesian coordinate system, with origin at 0,0,0 and
 * axis lines X, Y and Z. The 3D system orientation is organized as follows:
 *
 *   Y     Z          +Z - FRONT      |         NW  N  NE
 *   |    /           -Z - BACK       |           \ | /
 *   |   /            +X - RIGHT      |       W _ _\|/_ _ E
 *   |  /   NORTH     -X - LEFT       |            /|\
 *   | / ORIENTATION  +Y - UP         |           / | \
 *   |/_ _ _ _ _ X    -Y - DOWN       |         SW  S  SE
 * (0,0)
 *
 * OBS.: The object coordinate depends on the current orientation. The
 * default orientation is NORTHEAST.
 *
 * @constructor
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Object3D = function( x, y, z ) {
	var sx = this.sx / 2;
	var sz = this.sz / 2;

	this.maxX = x + sx;
	this.minX = x - sx;
	this.maxZ = z + sz;
	this.minZ = z - sz;
	this.maxY = y + this.sy;
	this.minY = y;

	this.x = x;
	this.y = y;
	this.z = z;

	this.children = [];
}

/**************************** CONSTS SECTION *********************************/
/** @const */ Object3D.TOP       = 0;
/** @const */ Object3D.NORTH     = 1;
/** @const */ Object3D.NORTHEAST = 2;
/** @const */ Object3D.EAST      = 3;
/** @const */ Object3D.SOUTHEAST = 4;
/** @const */ Object3D.SOUTH     = 5;
/** @const */ Object3D.SOUTHWEST = 6;
/** @const */ Object3D.WEST      = 7;
/** @const */ Object3D.NORTHWEST = 8;
/** @const */ Object3D.sinTable = [0, 0, 0.707106781, 1,  0.707106781,  0, -0.707106781, -1, -0.707106781];
/** @const */ Object3D.cosTable = [1, 1, 0.707106781, 0, -0.707106781, -1, -0.707106781,  0,  0.707106781];

/*************************** VARIABLES SECTION *******************************/
/** @type {number} */ Object3D.tileWidth  = 50;
/** @type {number} */ Object3D.tileHeight = 50;

/** @type {number} */ Object3D.prototype.x  = 0.0;
/** @type {number} */ Object3D.prototype.y  = 0.0;
/** @type {number} */ Object3D.prototype.z  = 0.0;
/** @type {number} */ Object3D.prototype.sx = 1.0;
/** @type {number} */ Object3D.prototype.sy = 1.0;
/** @type {number} */ Object3D.prototype.sz = 1.0;

/** @type {number} */ Object3D.prototype.maxX = 0.0;
/** @type {number} */ Object3D.prototype.maxY = 0.0;
/** @type {number} */ Object3D.prototype.maxZ = 0.0;
/** @type {number} */ Object3D.prototype.minX = 0.0;
/** @type {number} */ Object3D.prototype.minY = 0.0;
/** @type {number} */ Object3D.prototype.minZ = 0.0;
/** @type {boolean} */ Object3D.prototype.physics     = false;
/** @type {Array<number>} */ Object3D.prototype.force = [0.0, 0.0, 0.0];

/** @type {number} */ Object3D.prototype.depth       = 0;
/** @type {number} */ Object3D.prototype.screenX     = 0.0;
/** @type {number} */ Object3D.prototype.screenY     = 0.0;
/** @type {number} */ Object3D.prototype.orientation = Object3D.NORTHEAST;

/** @type {number} */           Object3D.prototype.key      = 0;
/** @type {boolean} */          Object3D.prototype.visible  = true;
/** @type {boolean} */          Object3D.prototype.cached   = false;
/** @type {?Array<Object3D>} */ Object3D.prototype.cache    = null;
/** @type {Array<Object3D>} */  Object3D.prototype.children = null;
/** @type {?Object3D} */        Object3D.prototype.parent   = null;

/***************************** PUBLIC SECTION ********************************/
Object3D.prototype.setPhysics = function( physics ) {
	this.physics = physics;
}

Object3D.prototype.addForce = function( force ) {
	this.force[0] += force[0];
	this.force[1] += force[1];
	this.force[2] += force[3];
}

Object3D.prototype.setForce = function( force ) {
	this.force[0] = force[0];
	this.force[1] = force[1];
	this.force[2] = force[3];
}

Object3D.prototype.getForce = function( force ) {
	return this.force;
}

Object3D.prototype.clearForce = function( force ) {
	this.force[0] = 0;
	this.force[1] = 0;
	this.force[2] = 0;
}

/**
 * This procedure removes a child node from this object.
 * Complexity: O(1)
 * @param {Object3D} child: a specific Object3D.
 */
Object3D.prototype.remove = function( child ) {
	// Check if "child" belongs to this object.
	if ( child.parent == this ) {
		var last = this.children.pop();

		if ( child.key != last.key ) {
			// move the last element to child position.
			last.key = child.key;
			this.children[child.key] = last;
		}

		child.parent = null;
	}
}

/** This procedure removes all child nodes from this object. */
Object3D.prototype.removeAll = function() {
	for ( var i = 0, len = this.children; i < len; i++ )
		this.remove( this.children[i] );
}

/**
 * Check if this object is visible.
 * @return {boolean}
 **/
Object3D.prototype.isVisible = function() {
	return this.visible;
}

/** This procedure is used to discard all cached information. */
Object3D.prototype.flush = function() {
	this.cached = false;
}

/**
 * This procedure updates all informations related to the generation of an image.
 * Every time something changes into the coordinate system, the game engine calls
 * the update procedure to recalculate the result image. This process is
 * automatic, therefore you should let the engine do this action for you.
 * @param {Camera} cam: main camera
 **/
Object3D.prototype.update = function( cam ) {
	this.screenX = Math.round( this.getIsoX() * Object3D.tileWidth  - cam.getScreenX() );
	this.screenY = Math.round( this.getIsoY() * Object3D.tileHeight - cam.getScreenY() );
}

/**
 * This procedure checks if this object are colliding to another.
 * @param {Object3D} obj: a specific object.
 */
Object3D.prototype.intersects = function( obj ) {
	return ( this.maxZ >= obj.minZ ) && ( this.minZ <= obj.maxZ ) && ( this.maxX >= obj.minX )
		&& ( this.minX <= obj.maxX ) && ( this.maxY >= obj.minY ) && ( this.minY <= obj.maxY );
}

/**
 * This procedure checks if this object is behind another based on the
 * renderization order.
 * @param {Object3D} obj: a specific object.
 */
Object3D.prototype.isBehind = function( obj ) {
	return ( obj.maxX > this.minX + 0.01 ) && ( obj.minZ < this.maxZ - 0.01 ) && ( obj.maxY > this.minY );
}

/**
 * This procedure checks if this object is below another based on the
 * renderization order.
 * @param {Object3D} obj: a specific object.
 */
Object3D.prototype.isBelow = function( obj ) {
	return ( obj.minY >= this.maxY ) && ( this.maxZ >= obj.minZ ) && ( this.minZ <= obj.maxZ ) && ( this.maxX >= obj.minX ) && ( this.minX <= obj.maxX );
}

/**
 * This procedure checks if this object overlaps another based on the screen
 * projection.
 * @param {Object3D} obj: a specific object.
 */
Object3D.prototype.overlap = function( obj ) {
	function intervalOverlap( a, b, c, d ) {
		return (( a >= c ) && ( a < d )) || (( c >= a ) && ( c < b ));
	}

	// Checking if two hexagons are colliding.
	// bannalia.blogspot.com/2008/02/filmation-math.html
	return intervalOverlap( this.minX + this.minZ, this.maxX + this.maxZ, obj.minX + obj.minZ, obj.maxX + obj.maxZ ) &&
	       intervalOverlap( this.minX - this.maxY, this.maxX - this.minY, obj.minX - obj.maxY, obj.maxX - obj.minY ) &&
	       intervalOverlap( this.minZ + this.minY, this.maxZ + this.maxY, obj.minZ + obj.minY, obj.maxZ + obj.maxY );
}

/**
 * This procedure checks if a point (x,y) is inside this object.
 * @param {number} x: screen coordinate;
 * @param {number} y: screen coordinate;
 */
Object3D.prototype.contains = function( x, y ) {
	function intervalOverlap( a, b, c ) {
		return ( c >= a ) && ( c < b );
	}

	return intervalOverlap( this.minX + this.minZ, this.maxX + this.maxZ, x + y ) &&
	       intervalOverlap( this.minX - this.maxY, this.maxX - this.minY, x     ) &&
	       intervalOverlap( this.minZ + this.minY, this.maxZ + this.maxY, y     );
}

/**
 * This procedure inserts a child node into this object.
 * Complexity: O(1)
 * @param {Object3D} child: a specific object.
 */
Object3D.prototype.add = function( child ) {
	// More than one parent per child is not allowed!
	if ( child.parent != null )
		child.parent.remove( child );

	child.parent = this;
	child.key = this.children.length;
	this.children.push( child );
}

/**
 * This procedure returns the children's list.
 * @return {Array<Object3D>}
 **/
Object3D.prototype.getChildren = function() {
	return this.children;
}

/**
 * This procedure returns the parent reference.
 * @return {Object3D}
 **/
Object3D.prototype.getParent = function() {
	return this.parent;
}

/**
 * This procedure changes the current orientation.
 * @param {number} orientation: a number between 0 and 8.
 **/
Object3D.prototype.setOrientation = function( orientation ) {
	if( orientation < 0 || orientation > 8 )
		return;

	this.orientation = orientation;
}

/**
 * This procedure returns the current orientation.
 * @return {number}
 **/
Object3D.prototype.getOrientation = function() {
	return this.orientation;
}

/**
 * Check if this object has been cached.
 * @return {boolean}
 **/
Object3D.prototype.isCached = function() {
	return this.cached;
}

/**
 * Set a cache reference.
 * @param {?Array<Object3D>} cache: a cache's reference.
 **/
Object3D.prototype.setCache = function( cache ) {
	this.cache = cache;
}

/**
 * This function returns the cache reference.
 * @return {?Array<Object3D>}
 **/
Object3D.prototype.getCache = function() {
	return this.cache;
}

/**
 * This procedure changes the X position.
 * @param {number} x: a position.
 **/
Object3D.prototype.setX = function( x ) {
	var diff = x - this.x;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].translateX( diff );

	this.maxX += diff;
	this.minX += diff;
	this.x     = x;

	this.cacheThisOperation();
}

/**
 * This function returns the X position (cartesian system).
 * @return {number}
 **/
Object3D.prototype.getX = function() {
	return this.x;
}

/**
 * This procedure changes the Y position.
 * @param {number} y: a position.
 **/
Object3D.prototype.setY = function( y ) {
	var diff = y - this.y;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].translateY( diff );

	this.maxY += diff;
	this.minY  = y;
	this.y     = y;
	this.cacheThisOperation();
}

/**
 * This function returns the Y position (cartesian system).
 * @return {number}
 **/
Object3D.prototype.getY = function() {
	return this.y;
}

/**
 * This procedure changes the Z position.
 * @param {number} z: a position.
 **/
Object3D.prototype.setZ = function( z ) {
	var diff = z - this.z;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].translateZ( diff );
	
	this.maxZ += diff;
	this.minZ += diff;
	this.z     = z;
	this.cacheThisOperation();
}

/**
 * This function returns the Y position (cartesian system).
 * @return {number}
 **/
Object3D.prototype.getZ = function() {
	return this.z;
}

/**
 * This procedure changes the position.
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 **/
Object3D.prototype.setPosition = function( x, y, z ) {
	var diffX = x - this.x;
	var diffY = y - this.y;
	var diffZ = z - this.z;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].translate( diffX, diffY, diffZ );

	this.x = x;
	this.y = y;
	this.z = z;

	this.maxX += diffX;
	this.minX += diffX;
	this.maxY += diffY;
	this.minY  = y;
	this.maxZ += diffZ;
	this.minZ += diffZ;

	this.cacheThisOperation();
}

/**
 * This function increments the X position by a certain value.
 * @param {number} x: distance.
 **/
Object3D.prototype.translateX = function( x ) {
	this.x    += x;
	this.maxX += x;
	this.minX += x;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[0].translateX( x );

	this.cacheThisOperation();
}

/**
 * This function increments the Y position by a certain value.
 * @param {number} y: distance.
 **/
Object3D.prototype.translateY = function( y ) {
	this.y    += y;
	this.maxY += y;
	this.minY += y;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].translateY( y );

	this.cacheThisOperation();
}

/**
 * This function increments the Z position by a certain value.
 * @param {number} z: distance.
 **/
Object3D.prototype.translateZ = function( z ) {
	this.z    += z;
	this.maxZ += z;
	this.minZ += z;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].translateZ( z );

	this.cacheThisOperation();
}

/**
 * This function increments the position by a certain value.
 * @param {number} x: distance.
 * @param {number} y: distance.
 * @param {number} z: distance.
 **/
Object3D.prototype.translate = function( x, y, z ) {
	this.x += x;
	this.y += y;
	this.z += z;
	this.maxX += x;
	this.minX += x;
	this.maxY += y;
	this.minY += y;
	this.maxZ += z;
	this.minZ += z;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].translate( x, y, z );

	this.cacheThisOperation();
}

/**
 * This function moves this object forward at a certain speed.
 * @param {number} speed
 **/
Object3D.prototype.forward = function( speed ) {
	var x = -speed * Object3D.sinTable[this.orientation];
	var z =  speed * Object3D.cosTable[this.orientation];
	this.translate( x, 0, z );
}

/**
 * This function moves this object backward at a certain speed.
 * @param {number} speed
 **/
Object3D.prototype.backward = function( speed ) {
	var x =  speed * Object3D.sinTable[this.orientation];
	var z = -speed * Object3D.cosTable[this.orientation];
	this.translate( x, 0, z );
}

/**
 * This function moves this object to the left at a certain speed.
 * @param {number} speed
 **/
Object3D.prototype.left = function( speed ) {
	var x = -speed * Object3D.cosTable[this.orientation];
	var z = -speed * Object3D.sinTable[this.orientation];
	this.translate( x, 0, z );
}

/**
 * This function moves this object to the right at a certain speed.
 * @param {number} speed
 **/
Object3D.prototype.right = function( speed ) {
	var x = speed * Object3D.cosTable[this.orientation];
	var z = speed * Object3D.sinTable[this.orientation];
	this.translate( x, 0, z );
}

/**
 * This function moves this object up at a certain speed.
 * @param {number} speed
 **/
Object3D.prototype.up = function( speed ) {
	this.translateY( speed );
}

/**
 * This function moves this object down at a certain speed.
 * @param {number} speed
 **/
Object3D.prototype.down = function( speed ) {
	this.translateY( -speed );
}

/**
 * This function moves this object to a specific location at a certain speed.
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 * @param {number} speed
 * @return {boolean} true if we arrive at the target destination, false otherwise.
 **/
Object3D.prototype.moveTo = function( x, y, z, speed ) {
	var dx = this.x - x;
	var dy = this.y - y;
	var dz = this.z - z;
	var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

	if( dist <= speed )
		return false;

	var delta = -speed / dist;
	this.translate( dx * delta, dy * delta, dz * delta );
	return true;
}

/**
 * This function rotates this object by alpha around the x-axis.
 * @param {number} alpha
 **/
Object3D.prototype.rotateX = function( alpha ) {
	var y = this.y;
	var z = this.z;
	var cos = Math.cos( alpha );
	var sin = Math.sin( alpha );

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].rotateX( alpha );

	this.setPosition( this.x, cos * y + sin * z, -sin * y + cos * z );
}

/**
 * This function rotates this object by beta around the y-axis.
 * @param {number} beta
 **/
Object3D.prototype.rotateY = function( beta ) {
	var x = this.x;
	var z = this.z;
	var cos = Math.cos( beta );
	var sin = Math.sin( beta );

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].rotateY( beta );

	this.setPosition( cos * x + sin * z, this.y, -sin * x + cos * z );
}

/**
 * This function rotates this object by gama around the z-axis.
 * @param {number} gama
 **/
Object3D.prototype.rotateZ = function( gama ) {
	var x = this.x;
	var y = this.y;
	var cos = Math.cos( gama );
	var sin = Math.sin( gama );

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].rotateZ( gama);

	this.setPosition( cos * x + sin * y, -sin * x + cos * y, this.z );
}

/**
 * This function returns the X position (isometric system).
 * @return {number}
 **/
Object3D.prototype.getIsoX = function() {
	return ( this.x + this.z ) / 2;
}

/**
 * This function returns the Y position (isometric system).
 * @return {number}
 **/
Object3D.prototype.getIsoY = function() {
	return ( this.x - this.z ) / 2 - this.y;
}

/**
 * This function returns the X position (2D screen).
 * @return {number}
 **/
Object3D.prototype.getScreenX = function() {
	return this.screenX;
}

/**
 * This function returns the Y position (2D screen).
 * @return {number}
 **/
Object3D.prototype.getScreenY = function() {
	return this.screenY;
}

/**
 * This function returns the X scale.
 * @return {number}
 **/
Object3D.prototype.getScaleX = function() {
	return this.sx;
}

/**
 * This function returns the Y scale.
 * @return {number}
 **/
Object3D.prototype.getScaleY = function() {
	return this.sy;
}

/**
 * This function returns the Z scale.
 * @return {number}
 **/
Object3D.prototype.getScaleZ = function() {
	return this.sz;
}

/**
 * This function changes the X scale.
 * @param {number} sx: scale.
 **/
Object3D.prototype.scaleX = function( sx ) {
	this.sx += sx;

	sx = sx / 2;
	this.maxX += sx;
	this.minX -= sx;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].scaleX( sx );

	this.cacheThisOperation();
}

/**
 * This function changes the Y scale.
 * @param {number} sy: scale.
 **/
Object3D.prototype.scaleY = function( sy ) {
	this.sy   += sy;
	this.maxY += sy;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].scaleX( sy );

	this.cacheThisOperation();
}

/**
 * This function changes the Z scale.
 * @param {number} sz: scale.
 **/
Object3D.prototype.scaleZ = function( sz ) {
	this.sz += sz;

	sz = sz / 2;
	this.maxZ += sz;
	this.minZ -= sz;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].scaleX( sz );

	this.cacheThisOperation();
}

/**
 * This function changes the object scale.
 * @param {number} sx: scale.
 * @param {number} sy: scale.
 * @param {number} sz: scale.
 **/
Object3D.prototype.scale = function( sx, sy, sz ) {
	this.sx += sx;
	this.sy += sy;
	this.sz += sz;

	sx = sx / 2;
	sz = sz / 2;

	this.maxX += sx;
	this.minX -= sx;
	this.maxZ += sz;
	this.minZ -= sz;
	this.maxY += sy;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].scale( sx, sy, sz );

	this.cacheThisOperation();
}

/**
 * This function configures the object scale.
 * @param {number} sx: new scale.
 * @param {number} sy: new scale.
 * @param {number} sz: new scale.
 **/
Object3D.prototype.setScale = function( sx, sy, sz ) {
	this.sx = sx;
	this.sy = sy;
	this.sz = sz;

	sx = sx / 2;
	sz = sz / 2;

	this.maxX = this.x + sx;
	this.minX = this.x - sx;
	this.maxZ = this.z + sz;
	this.minZ = this.z - sz;
	this.maxY = this.y + sy;
	this.minY = this.y;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].setScale( sx, sy, sz );

	this.cacheThisOperation();
}

/**
 * This function configures the object X scale.
 * @param {number} sx: new scale.
 **/
Object3D.prototype.setScaleX = function( sx ) {
	this.sx = sx;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].setScaleX( sx );

	sx = sx / 2;
	this.maxX = this.x + sx;
	this.minX = this.x - sx;

	this.cacheThisOperation();
}

/**
 * This function configures the object Y scale.
 * @param {number} sy: new scale.
 **/
Object3D.prototype.setScaleY = function( sy ) {
	this.sy = sy;

	this.maxY = this.y + sy;
	this.minY = this.y;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].setScaleY( sy );

	this.cacheThisOperation();
}

/**
 * This function configures the object Z scale.
 * @param {number} sz: new scale.
 **/
Object3D.prototype.setScaleZ = function( sz ) {
	this.sz = sz;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].setScale( sz );

	sz = sz / 2;
	this.maxZ = this.z + sz;
	this.minZ = this.z - sz;

	this.cacheThisOperation();
}

/**
 * This procedure sets this object visibility.
 * @param {boolean} visible: true/false
 **/
Object3D.prototype.setVisible = function( visible ) {
	this.visible = visible;

	for ( var i = this.children.length - 1; i >= 0; i-- )
		this.children[i].setVisible( visible );

	this.cacheThisOperation();
}

/**************************** PROTECTED SECTION ******************************/
/**
 * This procedure is used to notify the kernel about a new operation.
 * @protected
 **/
Object3D.prototype.cacheThisOperation = function() {
	if ( this.cached || ( this.cache == null ) )
		return;

	this.cached = true;
	this.cache.push( this );
}

/**************************** PRIVATE SECTION ********************************/
