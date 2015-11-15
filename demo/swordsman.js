/****************************** CONSTRUCTOR **********************************
 * @constructor
 * @extends {Tile}
 * @param {number} x: x-coordinate
 * @param {number} y: y-coordinate
 * @param {number} z: z-coordinate
 */
var Swordsman = function( x, y, z ) {
	this.animation = new Animation( "animations/swordsman.xml" );
	this.animation.setSpeed( 0.5 );
	Tile.call( this, this.animation, x, y, z );
	this.setScale( 0.6, 1, 0.6 );
}

Swordsman.prototype = Object.create( Tile.prototype );
/** @type {?Animation} */ Swordsman.prototype.animation = null;
Swordsman.prototype.speed = 0.05;
Swordsman.prototype.target = null;
Swordsman.prototype.sy = 1.0;
Swordsman.prototype.jump = 0;
Swordsman.prototype.isFlying = false;

Swordsman.prototype.onTap = function( event ) {
	this.target = event.getAxis();
}

Swordsman.prototype.onUpdate = function() {
	var speedX = 0;
	var speedZ = 0;

	if ( this.jump > 0 ) {
		this.up( 0.05 * this.jump * Timer.elapsed  );
		this.jump--;
	}

	if ( this.target !== null ) {
		if ( !this.moveTo( this.target.x, 0, this.target.y, this.speed * Timer.elapsed ) )
			this.target = null;
	} else {
		if ( Keyboard.isDown( KEY_B ) && !this.isFlying )
			this.jump = 5;

		if ( Keyboard.isDown( KEY_UP ) ) {
			speedZ = this.speed * Timer.elapsed;
		} else if ( Keyboard.isDown( KEY_DOWN ) ) {
			speedZ = -this.speed * Timer.elapsed;
		}

		if ( Keyboard.isDown( KEY_LEFT ) ) {
			speedX = this.speed * Timer.elapsed;
		} else if ( Keyboard.isDown( KEY_RIGHT ) ) {
			speedX = -this.speed * Timer.elapsed;
		}
	}

	this.walk( speedX, speedZ );
}

Swordsman.prototype.walk = function( speedX, speedZ ) {
	if ( speedX > 0 ) {
		if ( speedZ > 0 )
			this.animation.play( "nw_walk" );
		else if( speedZ < 0 )
			this.animation.play( "sw_walk" );
		else
			this.animation.play( "w_walk" );
	} else if ( speedX < 0 ) {
		if ( speedZ > 0 )
			this.animation.play( "ne_walk" );
		else if( speedZ < 0 )
			this.animation.play( "se_walk" );
		else
			this.animation.play( "e_walk" );
	} else if ( speedZ > 0 ) {
		this.animation.play( "n_walk" );
	} else if ( speedZ < 0 ) {
		this.animation.play( "s_walk" );
	} else {
		this.animation.pause();
		return;
	}

	if ( speedZ )
		this.forward( speedZ );

	if ( speedX )
		this.left( speedX );
}
