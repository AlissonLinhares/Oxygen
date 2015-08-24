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
 * Pool is a map implementation. The pool is used by the render to maintains
 * the depth order.
 *
 * @extends {AvlTree}
 * @constructor
 * @param {?} context: 2d canvas context.
 */
var Pool = function( context ) {
	AvlTree.call( this, null );

	function traverse( objects ) {
		for( var i = objects.length - 1; i >= 0; i-- )
			objects[i].draw( context );
	}

	this.flush = function() {
		this.reverseOrderTraverse( traverse );
	}

	/**
	 * This procedure inserts a child node into this pool.
	 * @override
	 * @param {Object3D} object: a specific Object3D.
	 */
	this.add = function( object ) {
		var depth = object.depth;

		if ( this.root_ == null ) {
			this.root_    = new Pool.Node( object );
			this.minNode_ = this.root_;
			this.maxNode_ = this.root_;
			return;
		}

		var newNode = null;

		this.traverse_( function( node ) {
			var retNode = null;

			var cmp = node.depth - depth;

			if ( cmp > 0 ) {
				retNode = node.left;

				if ( retNode == null ) {
					newNode = new Pool.Node( object, node );
					node.left = newNode;

					if ( node == this.minNode_ )
						this.minNode_ = newNode;
				}
			} else if ( cmp < 0 ) {
				retNode = node.right;

				if ( retNode == null ) {
					newNode = new Pool.Node( object, node );
					node.right = newNode;

					if ( node == this.maxNode_ )
						this.maxNode_ = newNode;
				}
			} else {
				node.add( object );
				return null;
			}

			return retNode;
		});

		if ( newNode ) {
			this.traverse_(
				function(node) {
					node.count++;
					return node.parent;
				},
				newNode.parent);

			this.balance_(newNode.parent);
		}
	}

	/**
	 * This procedure removes a child node from the pool.
	 * @override
	 * @param {Object3D} object: a specific Object3D.
	 */
	this.remove = function( object ) {
		var depth = object.depth;

		this.traverse_( function( node ) {
			var cmp = node.depth - depth;

			if ( cmp > 0 ) {
				return node.left;
			} else if ( cmp < 0 ) {
				return node.right;
			} else if ( cmp == 0 ) {
				if ( node.value.length > 1 )
					node.remove( object );
				else
					this.removeNode_( node );
			}

			return null;
		});
	}
}

Pool.prototype = Object.create( AvlTree.prototype );

/****************************** CONSTRUCTOR **********************************
/**
 * Constructs an AVL-Tree node with the specified value. If no parent is
 * specified, the node's parent is assumed to be null.
 *
 * @extends {AvlTree.Node}
 * @constructor
 * @param {Object3D} object: a specific object.
 * @param {Pool.Node=} opt_parent: optional parent node.
 */
Pool.Node = function( object, opt_parent ) {
	AvlTree.Node.call( this, [object], opt_parent );
	this.depth = object.depth;

	object._pool_key = 0;
}

Pool.Node.prototype = Object.create( AvlTree.Node.prototype );

Pool.Node.prototype.add = function( object ) {
	object._pool_key = this.value.length;
	this.value.push( object );
}

Pool.Node.prototype.remove = function( object ) {
	var key = object._pool_key;

	if ( this.value[key] === object ) {
		var last = this.value.pop();

		if ( key != last._pool_key ) {
			last._pool_key = key;
			this.value[key] = last;
		}

		object._pool_key = undefined;
	}
}
