function getUrlVars() {
	var vars = {};

	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});

	return vars;
}

var total = getUrlVars()["total"] | 5;

/**
 * @constructor
 * @extends {Oxygen}
 */
var Demo = function () {
	Oxygen.call( this );

	this.player = new Swordsman( 2, 2.0, 2 );
	this.add( this.player );

	for ( var i = 0; i < total; i++ ) {
		for ( var j = 0; j < total; j++ ) {
			var soldier = new Swordsman( i - 10, 0, j );
			this.army.push( soldier );
			this.add( soldier );
		}
	}

	document.getElementById('army').innerHTML = total * total;
}

Demo.prototype = Object.create( Oxygen.prototype );
Demo.prototype.army    = [];

/** @override */
Demo.prototype.onStart = function() {

}

/** @override */
Demo.prototype.onKeyDown = function() {
	var camera = this.getCamera();
	var world = this.getWorld();

	if ( Keyboard.isDown( KEY_R ) ) {
		world.turnRight();
		camera.rotateY( Math.PI / 2 );
	} else if ( Keyboard.isDown( KEY_L ) ) {
		world.turnLeft();
		camera.rotateY( -Math.PI / 2  );
	}

	if ( Keyboard.isDown( KEY_I ) ) {
		camera.zoom( 0.1 );
	} else if ( Keyboard.isDown( KEY_O ) ) {
		camera.zoom(-0.1 );
	}

	if ( Keyboard.isDown( KEY_Q ) ) {
		camera.scaleX( 0.01 );
	} else if ( Keyboard.isDown( KEY_E ) ) {
		camera.scaleX( -0.01 );
	}
}

/** @override */
Demo.prototype.onKeyUp = function() {
	var ptr = this.onKeyUp;
	this.onKeyUp = function(){}

	if ( Keyboard.isUp( KEY_M ) ) {
		total++;

		window.location.href="demo.html?total="+total;
	} else if ( Keyboard.isUp( KEY_N ) ) {
		total--;

		if ( total <= 0 )
			total = 0;

		window.location.href="demo.html?total="+total;
	}

	this.onKeyUp = ptr;
}

Demo.prototype.updateAllSoldiers = function() {
	var frame = Timer.now / 50;
	var speed = 0.05 * Timer.elapsed;

	var x = Math.sin( frame ) > 0 ? speed : -speed;
	var z = Math.cos( frame ) > 0 ? speed : -speed;

	for ( var i = 0, len = this.army.length; i < len; i++ )
		this.army[i].walk( x, z );
}

/** @override */
Demo.prototype.onTap = function( event ) {
	this.player.onTap( event );
}

/** @override */
Demo.prototype.onPress = function( event ) {
	Demo._x = event.getX();
	Demo._y = event.getY();
}

/** @override */
Demo.prototype.onDrag = function( event ) {
	var camera = this.getCamera();
	var x = event.getX();
	var y = event.getY();

	camera.forward( (y - Demo._y) / 50 );
	camera.left( (x - Demo._x) / 50 );

	Demo._x = x;
	Demo._y = y;
}

/** @override */
Demo.prototype.onUpdate = function() {
	var camera = this.getCamera();

	if ( Keyboard.isDown( KEY_W ) ) {
		camera.forward( 0.5 * Timer.elapsed );
	} else if ( Keyboard.isDown( KEY_S ) ) {
		camera.backward( 0.5 * Timer.elapsed );
	}

	if ( Keyboard.isDown( KEY_A ) ) {
		camera.left( 0.5 * Timer.elapsed );
	} else if ( Keyboard.isDown( KEY_D ) ) {
		camera.right( 0.5 * Timer.elapsed );
	}

	this.player.onUpdate();
	this.updateAllSoldiers();
	document.getElementById('fps').innerHTML = this.getFPS();
}

var demo = new Demo();
demo.start();
