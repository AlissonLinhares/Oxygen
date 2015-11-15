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
 * @final
 * @constructor
 */
var Keyboard = {};

/**************************** CONSTS SECTION *********************************/
/** @const */ var KEY_BACK_SPACE    = 8;
/** @const */ var KEY_TAB           = 9;
/** @const */ var KEY_ENTER         = 13;
/** @const */ var KEY_SHIFT         = 16;
/** @const */ var KEY_CTRL          = 17;
/** @const */ var KEY_ALT           = 18;
/** @const */ var KEY_PAUSE         = 19;
/** @const */ var KEY_CAPS_LOCK     = 20;
/** @const */ var KEY_ESC           = 27;
/** @const */ var KEY_SPACE         = 32;
/** @const */ var KEY_PAGE_UP       = 33;
/** @const */ var KEY_PAGE_DOWN     = 34;
/** @const */ var KEY_END           = 35;
/** @const */ var KEY_HOME          = 36;
/** @const */ var KEY_LEFT          = 37;
/** @const */ var KEY_UP            = 38;
/** @const */ var KEY_RIGHT         = 39;
/** @const */ var KEY_DOWN          = 40;
/** @const */ var KEY_INSERT        = 45;
/** @const */ var KEY_DELETE        = 46;
/** @const */ var KEY_ZERO          = 48;
/** @const */ var KEY_ONE           = 49;
/** @const */ var KEY_TWO           = 50;
/** @const */ var KEY_THREE         = 51;
/** @const */ var KEY_FOUR          = 52;
/** @const */ var KEY_FIVE          = 53;
/** @const */ var KEY_SIX           = 54;
/** @const */ var KEY_SEVEN         = 55;
/** @const */ var KEY_EIGHT         = 56;
/** @const */ var KEY_NINE          = 57;
/** @const */ var KEY_A             = 65;
/** @const */ var KEY_B             = 66;
/** @const */ var KEY_C             = 67;
/** @const */ var KEY_D             = 68;
/** @const */ var KEY_E             = 69;
/** @const */ var KEY_F             = 70;
/** @const */ var KEY_G             = 71;
/** @const */ var KEY_H             = 72;
/** @const */ var KEY_I             = 73;
/** @const */ var KEY_J             = 74;
/** @const */ var KEY_K             = 75;
/** @const */ var KEY_L             = 76;
/** @const */ var KEY_M             = 77;
/** @const */ var KEY_N             = 78;
/** @const */ var KEY_O             = 79;
/** @const */ var KEY_P             = 80;
/** @const */ var KEY_Q             = 81;
/** @const */ var KEY_R             = 82;
/** @const */ var KEY_S             = 83;
/** @const */ var KEY_T             = 84;
/** @const */ var KEY_U             = 85;
/** @const */ var KEY_V             = 86;
/** @const */ var KEY_W             = 87;
/** @const */ var KEY_X             = 88;
/** @const */ var KEY_Y             = 89;
/** @const */ var KEY_Z             = 90;
/** @const */ var KEY_LEFT_WINDOW   = 91;
/** @const */ var KEY_RIGHT_WINDOW  = 92;
/** @const */ var KEY_SELECT        = 93;
/** @const */ var KEY_NUMPAD_0      = 96;
/** @const */ var KEY_NUMPAD_1      = 97;
/** @const */ var KEY_NUMPAD_2      = 98;
/** @const */ var KEY_NUMPAD_3      = 99;
/** @const */ var KEY_NUMPAD_4      = 100;
/** @const */ var KEY_NUMPAD_5      = 101;
/** @const */ var KEY_NUMPAD_6      = 102;
/** @const */ var KEY_NUMPAD_7      = 103;
/** @const */ var KEY_NUMPAD_8      = 104;
/** @const */ var KEY_NUMPAD_9      = 105;
/** @const */ var KEY_MULTIPLY      = 106;
/** @const */ var KEY_ADD           = 107;
/** @const */ var KEY_SUB           = 109;
/** @const */ var KEY_POINT         = 110;
/** @const */ var KEY_DIVIDE        = 111;
/** @const */ var KEY_F1            = 112;
/** @const */ var KEY_F2            = 113;
/** @const */ var KEY_F3            = 114;
/** @const */ var KEY_F4            = 115;
/** @const */ var KEY_F5            = 116;
/** @const */ var KEY_F6            = 117;
/** @const */ var KEY_F7            = 118;
/** @const */ var KEY_F8            = 119;
/** @const */ var KEY_F9            = 120;
/** @const */ var KEY_F10           = 121;
/** @const */ var KEY_F11           = 122;
/** @const */ var KEY_F12           = 123;
/** @const */ var KEY_NUM_LOCK      = 144;
/** @const */ var KEY_SCROLL_LOCK   = 145;
/** @const */ var KEY_SEMICOLON     = 186;
/** @const */ var KEY_EQUAL         = 187;
/** @const */ var KEY_COMMA         = 188;
/** @const */ var KEY_DASH          = 189;
/** @const */ var KEY_PERIOD        = 190;
/** @const */ var KEY_FORWARD_SLASH = 191;
/** @const */ var KEY_GRAVE_ACCENT  = 192;
/** @const */ var KEY_OPEN_BRACKET  = 219;
/** @const */ var KEY_BACK_SLASH    = 220;
/** @const */ var KEY_CLOSE_BRAKET  = 221;
/** @const */ var KEY_SINGLE_QUOTE  = 222;

/*************************** VARIABLES SECTION *******************************/
/** @private {Array<number>} */ Keyboard.keyMap = [];

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure configures the browser and map all keyboard's events to the
 * game engine.
 * @param {Oxygen} engine: engine reference.
 **/
Keyboard.init = function( engine ) {
	document.onkeydown = function( event ) {
		Keyboard.keyMap[event.keyCode] = 1;
		engine.onKeyDown();
	}

	document.onkeyup = function ( event ) {
		Keyboard.keyMap[event.keyCode] = 2;
		engine.onKeyUp();
		Keyboard.keyMap[event.keyCode] = 0;
	}
}

/**
 * This procedure verifies if some specific key is down.
 * @param {number} key: keycode.
 **/
Keyboard.isDown = function( key ) {
	return Keyboard.keyMap[ key ] == 1;
}

/**
 * This procedure verifies if some specific key is up.
 * @param {number} key: keycode.
 **/
Keyboard.isUp = function( key ) {
	return Keyboard.keyMap[ key ] == 2;
}
