var element = document.getElementById('canvas');
var ctx = element.getContext('2d');
 
// var element = document.getElementById('canvas');
// 
// console.log("AAAAAAAAAA");
// var two = new Two({ width: box_width, height: box_height }).appendTo(element);
// 
// /* Constants */
// var glass_opening_height = 25;

var box_width = 500;
var box_height = 500;
// 
/* Glass specific */
var glass_width  = 200;
var glass_height = 350;
var glass_bulge_upper_factor = 1.5;
var glass_bulge_lower_factor = 1.0;
var glass_bulge_height_factor = 0.4;
var glass_bulge_stretch_factor = 0.5;
var glass_opening_factor = 1.3;
var glass_depth_factor = 0.2;
var glass_fill_height_factor = 0.5;

/* Beer */
var glass_empty_height = glass_height * (1.0 - glass_fill_height_factor)
var gradient = ctx.createLinearGradient(0, -glass_height * 0.5 + 0.5 * box_height, 0, glass_height * 0.5 + 0.5 * box_height);
gradient.addColorStop(0, "#edc100");
gradient.addColorStop(1, "#d17525");
ctx.fillStyle = gradient;
ctx.fillRect(0.0 , 0.5 * box_height - glass_height * 0.5, box_width, glass_height * (1.0 + glass_depth_factor));
/* Foam */
ctx.beginPath();
ctx.moveTo(0, -glass_height * 0.5 + box_height * 0.5);
ctx.lineTo(-glass_width * 0.5 * glass_opening_factor + box_width * 0.5, -glass_height * 0.5 + box_height * 0.5 + glass_empty_height);

ctx.quadraticCurveTo(
0 + box_width * 0.5, -glass_height * 0.5 + (glass_width * glass_opening_factor) * glass_depth_factor + box_height * 0.5 + glass_empty_height,
glass_width * 0.5 * glass_opening_factor + box_width * 0.5, -glass_height * 0.5 + box_height * 0.5 + glass_empty_height);

ctx.lineTo(box_width, -glass_height * 0.5 + box_height * 0.5 + glass_empty_height);
ctx.lineTo(box_width, 0);
ctx.lineTo(0, 0);
ctx.fillStyle = "#f9efc2"
ctx.fill()


var mask_canvas = document.createElement('canvas');
mask_canvas.width = canvas.width;
mask_canvas.height = canvas.height;
var mask_ctx = mask_canvas.getContext('2d');
/* Fill the mask */
mask_ctx.fillStyle = "white"
mask_ctx.fillRect(0, 0, mask_canvas.width, mask_canvas.height);
mask_ctx.globalCompositeOperation = 'xor';

/* Glass generation */
mask_ctx.beginPath();
mask_ctx.moveTo(glass_width * 0.5 * glass_opening_factor + box_width * 0.5, -glass_height * 0.5 + box_height * 0.5);

/* Right */
mask_ctx.bezierCurveTo(
glass_width * 0.5 * glass_bulge_upper_factor + box_width * 0.5, glass_height * 0.5 - glass_height * glass_bulge_height_factor * (1.0 + glass_bulge_stretch_factor) + box_height * 0.5,
glass_width * 0.5 * glass_bulge_lower_factor + box_width * 0.5, glass_height * 0.5 - glass_height * glass_bulge_height_factor * glass_bulge_stretch_factor + box_height * 0.5,
glass_width * 0.5 + box_width * 0.5, glass_height * 0.5 + box_height * 0.5);

/* Bottom */
mask_ctx.quadraticCurveTo(
0 + box_width * 0.5, glass_height * 0.5 + glass_width * glass_depth_factor + box_height * 0.5,
-glass_width * 0.5 + box_width * 0.5, glass_height * 0.5 + box_height * 0.5);

/* Left */
mask_ctx.bezierCurveTo(
-glass_width * 0.5 * glass_bulge_lower_factor + box_width * 0.5, glass_height * 0.5 - glass_height * glass_bulge_height_factor * glass_bulge_stretch_factor + box_height * 0.5,
-glass_width * 0.5 * glass_bulge_upper_factor + box_width * 0.5, glass_height * 0.5 - glass_height * glass_bulge_height_factor * (1.0 + glass_bulge_stretch_factor) + box_height * 0.5,
-glass_width * 0.5 * glass_opening_factor + box_width * 0.5, -glass_height * 0.5 + box_height * 0.5);

/* Top */
mask_ctx.quadraticCurveTo(
0 + box_width * 0.5, -glass_height * 0.5 + (glass_width * glass_opening_factor) * glass_depth_factor + box_height * 0.5,
glass_width * 0.5 * glass_opening_factor + box_width * 0.5, -glass_height * 0.5 + box_height * 0.5);
// mask_ctx.quadraticCurveTo(
// 0 + box_width * 0.5, -glass_height * 0.5 + glass_width * glass_depth_factor + box_height * 0.5,
// -glass_width * 0.5 * glass_opening_factor + box_width * 0.5, -glass_height * 0.5 + box_height * 0.5);

mask_ctx.fill();
ctx.drawImage(mask_canvas, 0, 0);

//mask_ctx.stroke()
// var right = two.makeCurve(
// 	-glass_width * 0.5, glass_height * 0.5,
// 	-glass_width * 0.5 * glass_bulge_factor, glass_height * 0.5 - glass_height * glass_bulge_height_factor,
// 	-glass_width * 0.5 * glass_opening_factor, -glass_height * 0.5,
// 	true);
// var bottom = two.makeLine(
// 	-glass_width * 0.5, glass_height * 0.5,
// 	glass_width * 0.5, glass_height * 0.5)

// var opening = two.makeEllipse(0, -glass_height * 0.5, glass_width * 0.5 * glass_opening_factor, glass_opening_height);
// var background = two.makeRectangle(0, 0, 1000, 1000);
// // var left = two.makeCurve(0, 500, 100, 0, 0, -500, true)
// left.noFill();
// 
// // Groups can take an array of shapes and/or groups.
// var group = two.makeGroup(left, right, opening, bottom);
// group.fill = '#FF0000';
// 
// // And have translation, rotation, scale like all shapes.
// group.translation.set(two.width / 2, two.height / 2);
// // group.rotation = 0;
// // group.scale = 0.75;
// 
// // You can also set the same properties a shape have.
// group.linewidth = 7;
// 
// two.update();
