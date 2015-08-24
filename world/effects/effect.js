var Effect = function( x, y, z ) {
	Object3D.call( this, x, y, z );
}

Effect.prototype = Object.create( Object3D.prototype );
Effect.prototype.partSpeedX	    = 3;
Effect.prototype.partSpeedZ	    = 5;
Effect.prototype.qttPartFrame   = 10;
Effect.prototype.partLifeTime   = 15;
Effect.prototype.lifeTimeEffect = -1;
Effect.prototype.timeCreated    = -1;
Effect.prototype.red 			= 0;
Effect.prototype.green 			= 0;
Effect.prototype.blue 			= 0;
Effect.prototype.alpha 			= 255;

Effect.prototype.getColor = function() {
	return "rgba("+this.red+","+this.green+","+this.blue+","+this.alpha+")";
}

Effect.prototype.setColor = function( r, g, b, a ) {
	this.red = r;
	this.green = g;
	this.blue = b;
	this.alpha = a;
}

Effect.prototype.getR = function() {
	return this.red;
}

Effect.prototype.setR = function( r ) {
	this.red = r;
}

Effect.prototype.getG = function() {
	return this.green;
}

Effect.prototype.setG = function( g ) {
	this.green = g;
}

Effect.prototype.getB = function() {
	return this.B;
}

Effect.prototype.setB = function( b ) {
	this.blue = b;
}

Effect.prototype.getAlpha = function() {
	return this.alpha;
}

Effect.prototype.setAlpha = function( alpha ) {
	this.alpha = alpha;
}

Effect.prototype.getPartSpeedX = function() {
	return this.partSpeedX;
}

Effect.prototype.setPartSpeedX = function( partSpeedX ) {
	this.partSpeedX = partSpeedX;
}

Effect.prototype.getPartSpeedZ = function() {
	return this.partSpeedZ;
}

Effect.prototype.setPartSpeedZ = function( partSpeedZ ) {
	this.partSpeedZ = partSpeedZ;
}

Effect.prototype.getQttPartFrame = function() {
	return this.qttPartFrame;
}

Effect.prototype.setQttPartFrame = function( qttPartFrame ) {
	this.qttPartFrame = qttPartFrame;
}

Effect.prototype.getPartLifeTime = function() {
	return this.partLifeTime;
}

Effect.prototype.setPartLifeTime = function( partLifeTime ) {
	this.partLifeTime = partLifeTime;
}

Effect.prototype.getEffectLifeTime = function() {
	return this.effectLifeTime;
}

Effect.prototype.setEffectLifeTime = function( effectLifeTime ) {
	this.effectLifeTime = effectLifeTime;
	var d = new Date();
	this.timeCreated = d.getTime(); 
}
	
Effect.prototype.convertToRGBA = function( r, g, b, a ) {
	return "rgba("+r+","+g+","+b+","+a+")";
}

//update life time of the list of particle, removing the ones that reach 0
Effect.prototype.updateParticles = function(){
	var particles = this.getChildren();
	for(var i = 0; i < particles.length; i++){
		
		var p = particles[i];
		if(p instanceof Particle){
			p.updadeLife();
			if (p.getLife() <= 0) {
				this.remove(p);
				i--;
			}
		}
	}
}

Effect.prototype.draw = function( context ){
	//Each effect has its own update
}

Effect.prototype.update = function(){
	//Update
}

