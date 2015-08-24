# java -jar compiler.jar --js_output_file=oxygen-min.js $(find * | grep .js)
# java -jar ../compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --warning_level VERBOSE --js_output_file=demo-min.js \
# 	../world/grid.js\
# 	../world/world.js\
# 	../world/objects/object3d.js\
# 	../world/objects/shapes/shape.js\
# 	../world/objects/shapes/plane.js\
# 	../world/objects/shapes/cube.js\
# 	../world/objects/shapes/pyramid.js\
# 	../world/objects/shapes/face.js\
# 	../world/objects/tile.js\
# 	../world/objects/camera.js\
# 	../world/objects/terrain.js\
# 	../world/effects/particle.js\
# 	../world/effects/effect.js\
# 	../world/effects/fire.js\
# 	../oxygen.js\
# 	../utils/avltree.js\
# 	../render/canvas.js\
# 	../render/render.js\
# 	../render/pool.js\
# 	../input/mouse.js\
# 	../input/keyboard.js\
# 	../input/touch.js\
# 	../media/animation.js\
# 	../media/sound.js\
# 	../media/texture.js\
# 	../media/resources.js\
# 	swordsman.js\
# 	demo.js

java -jar ../compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --warning_level VERBOSE --js_output_file=demo-min.js \
	../world/grid.js\
	../world/world.js\
	../world/objects/object3d.js\
	../world/objects/shapes/shape.js\
	../world/objects/shapes/plane.js\
	../world/objects/shapes/cube.js\
	../world/objects/shapes/pyramid.js\
	../world/objects/shapes/face.js\
	../world/effects/particle.js\
	../world/effects/effect.js\
	../world/effects/fire.js\
	../world/objects/tile.js\
	../world/objects/camera.js\
	../world/objects/terrain.js\
	../timer.js\
	../oxygen.js\
	../utils/avltree.js\
	../render/canvas.js\
	../render/render.js\
	../render/pool.js\
	../input/mouse.js\
	../input/keyboard.js\
	../input/touch.js\
	../media/animation.js\
	../media/sound.js\
	../media/texture.js\
	../media/resources.js\
	../media/tileset.js\
	swordsman.js\
	level.js\
	$1
