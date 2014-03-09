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

var Keyboard = function(){
	document.onkeydown = function( event ) {
		Keyboard.keyMap[event.keyCode] = true;
	}

	document.onkeyup = function( event ) {
		Keyboard.keyMap[event.keyCode] = false;
	}
}

Keyboard.keyMap       = {};
Keyboard.backspace    = 8;
Keyboard.tab          = 9;
Keyboard.enter        = 13;
Keyboard.shift        = 16;
Keyboard.ctrl         = 17;
Keyboard.alt          = 18;
Keyboard.pause        = 19;
Keyboard.capsLock     = 20;
Keyboard.escape       = 27;
Keyboard.pageUp       = 33;
Keyboard.pageDown     = 34;
Keyboard.end          = 35;
Keyboard.home         = 36;
Keyboard.left         = 37;
Keyboard.up           = 38;
Keyboard.right        = 39;
Keyboard.down         = 40;
Keyboard.insert       = 45;
Keyboard.delete       = 46;
Keyboard.zero         = 48;
Keyboard.one          = 49;
Keyboard.two          = 50;
Keyboard.three        = 51;
Keyboard.four         = 52;
Keyboard.five         = 53;
Keyboard.six          = 54;
Keyboard.seven        = 55;
Keyboard.eight        = 56;
Keyboard.nine         = 57;
Keyboard.a            = 65;
Keyboard.b            = 66;
Keyboard.c            = 67;
Keyboard.d            = 68;
Keyboard.e            = 69;
Keyboard.f            = 70;
Keyboard.g            = 71;
Keyboard.h            = 72;
Keyboard.i            = 73;
Keyboard.j            = 74;
Keyboard.k            = 75;
Keyboard.l            = 76;
Keyboard.m            = 77;
Keyboard.n            = 78;
Keyboard.o            = 79;
Keyboard.p            = 80;
Keyboard.q            = 81;
Keyboard.r            = 82;
Keyboard.s            = 83;
Keyboard.t            = 84;
Keyboard.u            = 85;
Keyboard.v            = 86;
Keyboard.w            = 87;
Keyboard.x            = 88;
Keyboard.y            = 89;
Keyboard.z            = 90;
Keyboard.lwindow      = 91;
Keyboard.rwindow      = 92;
Keyboard.selectKey    = 93;
Keyboard.numpad0      = 96;
Keyboard.numpad1      = 97;
Keyboard.numpad2      = 98;
Keyboard.numpad3      = 99;
Keyboard.numpad4      = 100;
Keyboard.numpad5      = 101;
Keyboard.numpad6      = 102;
Keyboard.numpad7      = 103;
Keyboard.numpad8      = 104;
Keyboard.numpad9      = 105;
Keyboard.multiply     = 106;
Keyboard.add          = 107;
Keyboard.subtract     = 109;
Keyboard.point        = 110;
Keyboard.divide       = 111;
Keyboard.f1           = 112;
Keyboard.f2           = 113;
Keyboard.f3           = 114;
Keyboard.f4           = 115;
Keyboard.f5           = 116;
Keyboard.f6           = 117;
Keyboard.f7           = 118;
Keyboard.f8           = 119;
Keyboard.f9           = 120;
Keyboard.f10          = 121;
Keyboard.f11          = 122;
Keyboard.f12          = 123;
Keyboard.numLock      = 144;
Keyboard.scrollLock   = 145;
Keyboard.semicolon    = 186;
Keyboard.equal        = 187;
Keyboard.comma        = 188;
Keyboard.dash         = 189;
Keyboard.period       = 190;
Keyboard.forwardSlash = 191;
Keyboard.graveAccent  = 192;
Keyboard.openBracket  = 219;
Keyboard.backSlash    = 220;
Keyboard.closeBraket  = 221;
Keyboard.singleQuote  = 222;

Keyboard.prototype.isDown = function( key ) {
	return Keyboard.keyMap[ Keyboard[key] ];
}

