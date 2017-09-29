/* Utils */
function GetRandom(min, max)
{
  return Math.random() * (max - min) + min;
}


/* Glass config */
var beer_config = CreateGlassConfig(
	_width  = GetRandom(100, 300),
	_height = GetRandom(300, 400),
	_bulge_upper_factor = GetRandom(0.1, 0.9),
	_bulge_lower_factor = GetRandom(0.1, 0.9),
	_bulge_height_factor = GetRandom(0.1, 0.9),
	_bulge_stretch_factor = GetRandom(0.0, 2.0),
	_opening_factor = GetRandom(0.4, 1.9),
	_depth_factor = 0.2,
	_fill_height_factor = 0.8);

function GenerateOutline(ctx, box_width, box_height, config, scaling = 1.0)
{
	var glass_width_backup = config.width;
	var glass_height_backup = config.height;

	config.width *= scaling;
	config.height *= scaling;

	/* Glass generation */
	ctx.beginPath();
	ctx.moveTo(config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5);

	/* Right */
	ctx.bezierCurveTo(
	config.width * 0.5 * config.bulge_upper_factor + box_width * 0.5, config.height * 0.5 - config.height * config.bulge_height_factor * (1.0 + config.bulge_stretch_factor) + box_height * 0.5,
	config.width * 0.5 * config.bulge_lower_factor + box_width * 0.5, config.height * 0.5 - config.height * config.bulge_height_factor * config.bulge_stretch_factor + box_height * 0.5,
	config.width * 0.5 + box_width * 0.5, config.height * 0.5 + box_height * 0.5);

	/* Bottom */
	ctx.quadraticCurveTo(
	0 + box_width * 0.5, config.height * 0.5 + config.width * config.depth_factor + box_height * 0.5,
	-config.width * 0.5 + box_width * 0.5, config.height * 0.5 + box_height * 0.5);

	/* Left */
	ctx.bezierCurveTo(
	-config.width * 0.5 * config.bulge_lower_factor + box_width * 0.5, config.height * 0.5 - config.height * config.bulge_height_factor * config.bulge_stretch_factor + box_height * 0.5,
	-config.width * 0.5 * config.bulge_upper_factor + box_width * 0.5, config.height * 0.5 - config.height * config.bulge_height_factor * (1.0 + config.bulge_stretch_factor) + box_height * 0.5,
	-config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5);

	/* Top */
	ctx.quadraticCurveTo(
	0 + box_width * 0.5, -config.height * 0.5 - (config.width * config.opening_factor) * config.depth_factor + box_height * 0.5,
	config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5);
	ctx.quadraticCurveTo(
	0 + box_width * 0.5, -config.height * 0.5 + (config.width * config.opening_factor) * config.depth_factor + box_height * 0.5,
	-config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5);

	config.width = glass_width_backup;
	config.height = glass_height_backup;
}

function CreateGlassConfig(_width, _height, _bulge_upper_factor, _bulge_lower_factor, _bulge_height_factor, _bulge_stretch_factor, _opening_factor, _depth_factor, _fill_height_factor)
{
	var config = new Object();
	config.width  = _width;
	config.height = _height;
	config.bulge_upper_factor = _bulge_upper_factor;
	config.bulge_lower_factor = _bulge_lower_factor;
	config.bulge_height_factor = _bulge_height_factor;
	config.bulge_stretch_factor = _bulge_stretch_factor;
	config.opening_factor = _opening_factor;
	config.depth_factor = _depth_factor;
	config.fill_height_factor = _fill_height_factor;
	config.empty_height = _height * (1.0 - _fill_height_factor);

	return config;
}

function PourBeer(ctx)
{
	var box_width = ctx.canvas.clientWidth;
	var box_height = ctx.canvas.clientHeight;

	/* Beer */
	var gradient = ctx.createLinearGradient(0, -config.height * 0.5 + 0.5 * box_height, 0, config.height * 0.5 + 0.5 * box_height);
	gradient.addColorStop(0, "#edc100");
	gradient.addColorStop(1, "#d17525");
	ctx.fillStyle = gradient;
	ctx.fillRect(0.0 , 0.5 * box_height - config.height * 0.5, box_width, config.height * (1.0 + config.depth_factor));
	/* Foam */
	ctx.beginPath();
	ctx.moveTo(0, -config.height * 0.5 + box_height * 0.5);
	ctx.lineTo(-config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5 + config.empty_height);

	ctx.quadraticCurveTo(
	0 + box_width * 0.5, -config.height * 0.5 + (config.width * config.opening_factor) * config.depth_factor + box_height * 0.5 + config.empty_height,
	config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5 + config.empty_height);

	ctx.lineTo(box_width, -config.height * 0.5 + box_height * 0.5 + config.empty_height);
	ctx.lineTo(box_width, 0);
	ctx.lineTo(0, 0);
	ctx.fillStyle = "#f9efc2"
	ctx.fill()

	var background_canvas = document.createElement('canvas');
	background_canvas.width = canvas.width;
	background_canvas.height = canvas.height;
	var background_ctx = background_canvas.getContext('2d');
	background_ctx.fillStyle = "#fffce5";
	background_ctx.fillRect(0, 0, box_width, box_height);
	background_ctx.globalCompositeOperation = 'xor';

	var glass_canvas = document.createElement('canvas');
	glass_canvas.width = canvas.width;
	glass_canvas.height = canvas.height;
	var glass_ctx = glass_canvas.getContext('2d');
	glass_ctx.fillStyle = "white";
	glass_ctx.fillRect(0, 0, box_width, box_height);
	glass_ctx.globalCompositeOperation = 'xor';

	/* Drawing */

	/* Beer layer */
	GenerateOutline(glass_ctx, box_width, box_height, config);
	glass_ctx.fill();

	/* Glass layer */
	GenerateOutline(background_ctx, box_width, box_height, config, 1.07);
	background_ctx.fill();

	/* Stapling the layers */
	ctx.drawImage(glass_canvas, 0, 0);
	ctx.drawImage(background_canvas, 0, 0);

	/* Outline */
	GenerateOutline(ctx, box_width, box_height, config, 1.07);
	ctx.lineWidth = 6;
	ctx.lineCap = "round";
	ctx.stroke();
}

/* Main */
/* Glass config */
// beer_config = CreateGlassConfig(
// 	_width  = 200,
// 	_height = 350,
// 	_bulge_upper_factor = 1.5,
// 	_bulge_lower_factor = 1.0,
// 	_bulge_height_factor = 0.4,
// 	_bulge_stretch_factor = 0.5,
// 	_opening_factor = 1.3,
// 	_depth_factor = 0.2,
// 	_fill_height_factor = 0.8);

function GenerateGrid(canvas, line_count, column_count)
{
	var section_width = canvas.width / line_count;
	var section_height = canvas.height / column_count;
	var ctx = canvas.getContext('2d');
	PourBeer(ctx, beer_config);

	// for(var i = 0; i < line_count; i++)
	// {
	// 	var section_canvas = document.createElement('canvas');
	// 	section_canvas.width = section_width;
	// 	section_canvas.height = section_height;
	// 	var section_ctx = section_canvas.getContext('2d');


	// 	ctx.drawImage(section_canvas, 0, 0);
	// }
}

function NextRound()
{
	beer_config = CreateGlassConfig(
		_width  = GetRandom(100, 300),
		_height = GetRandom(300, 400),
		_bulge_upper_factor = GetRandom(0.0, 4.0),
		_bulge_lower_factor = GetRandom(0.0, 4.0),
		_bulge_height_factor = GetRandom(0, 1.0),
		_bulge_stretch_factor = GetRandom(0.0, 2.0),
		_opening_factor = GetRandom(0.4, 2.0),
		_depth_factor = 0.2,
		_fill_height_factor = 0.8);

	var ctx = canvas.getContext('2d');
	PourBeer(ctx, beer_config);
}

function DecideRegular()
{
	beer_config.type = 'R';
	PrintConfig();
}

function DecideMug()
{
	beer_config.type = 'M';
	PrintConfig();
}

function DecideSniffer()
{
	beer_config.type = 'S';
	PrintConfig();
}

function PrintConfig()
{
	console.log(JSON.stringify(beer_config));
	NextRound();
}


var canvas = document.getElementById('canvas');
GenerateGrid(canvas, 1, 1);
