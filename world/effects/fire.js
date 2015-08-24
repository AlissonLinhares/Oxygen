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
 * @extends {Object3D}
 * @constructor
 */
var Fire = function( x, y, z ) {
	Effect.call( this, x, y, z );
	this.setPartSpeedZ(8);
	this.setPartSpeedX(2);
	this.setPartLifeTime(50);
	this.getQttPartFrame(1);
	this.setColor(150,0,10,50);
}

Fire.prototype = Object.create( Effect.prototype );

Fire.prototype.createParticles = function() {
	var speedX = this.getPartSpeedX();
	var speedZ = this.getPartSpeedZ();
	var life = this.getPartLifeTime();

	for (var i = this.getQttPartFrame() - 1; i >= 0; i--) {
		var part = new Particle(this.getScreenX(), this.getY, this.getScreenY());

		part.setXSpd((1-2*Math.random())*speedX);
		part.setZSpd(-Math.random()*speedZ);
		part.setLife(1+Math.random()*life);
		
		this.add(part);
	}
}

Fire.prototype.draw = function( context ){
	context.globalCompositeOperation = "lighter";

	var life;
	var pX,pZ;	
	var r,g,b,a;
	var part = this.getChildren();

	this.createParticles();

	for (var i = part.length - 1; i >=0 ; i--){
		var p = part[i];
		if(p instanceof Particle){
			life = p.getLife();

			pX = part[i].getX();
			pZ = part[i].getZ();

			r = Math.floor( this.red - life );
			g = Math.floor( this.green + 2*life );
			b = this.blue;
			a = Math.floor( this.alpha + life );

			//setting the color for drawing
			context.fillStyle = this.convertToRGBA( r, g, b, a );
			//separetes the last point that was draw and start in a new place
			context.beginPath();
			//create a circle center px,pz,radious
			context.arc(pX, pZ, (life > 20 ? 20:life), 0, 2*Math.PI);
			//fill the circle with the color created
			context.fill();
		}
	}

	this.update();

	context.globalCompositeOperation="source-over";
}

Fire.prototype.update = function(){
	var pX,pZ;	
	var part = this.getChildren();

	for (var i = part.length - 1; i >=0 ; i--){
		var p = part[i];
		if(p instanceof Particle){
			//Move the particle based on its horizontal and vertical speeds
			pX = p.getX() + p.getXSpd();
			pZ = p.getZ() + p.getZSpd();
			p.setX( pX );
			p.setZ( pZ );
		}
	}

	//checks if the particle life time is over
	this.updateParticles();
}
