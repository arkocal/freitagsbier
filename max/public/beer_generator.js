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

function GenerateOutline(ctx, box_width, box_height, config, x_scaling = 1.0, y_scaling = 1.0)
{
	var glass_width_backup = config.width;
	var glass_height_backup = config.height;

	// config.width *= x_scaling;
	// config.height *= y_scaling;

	/* Glass generation */
	ctx.beginPath();
	ctx.moveTo(x_scaling * (config.width * 0.5 * config.opening_factor) + box_width * 0.5, y_scaling * (-config.height * 0.5) + box_height * 0.5);

	/* Right */
	ctx.bezierCurveTo(
	x_scaling * (config.width * 0.5 * config.bulge_upper_factor) + box_width * 0.5, y_scaling * (config.height * 0.5 - config.height * config.bulge_height_factor * (1.0 + config.bulge_stretch_factor)) + box_height * 0.5,
	x_scaling * (config.width * 0.5 * config.bulge_lower_factor) + box_width * 0.5, y_scaling * (config.height * 0.5 - config.height * config.bulge_height_factor * config.bulge_stretch_factor) + box_height * 0.5,
	x_scaling * (config.width * 0.5) + box_width * 0.5, y_scaling * (config.height * 0.5) + box_height * 0.5);

	/* Bottom */
	ctx.quadraticCurveTo(
	0 + box_width * 0.5, y_scaling * (config.height * 0.5 + config.width * config.depth_factor) + box_height * 0.5,
	x_scaling * (-config.width * 0.5) + box_width * 0.5, y_scaling * (config.height * 0.5) + box_height * 0.5);

	/* Left */
	ctx.bezierCurveTo(
	x_scaling * (-config.width * 0.5 * config.bulge_lower_factor) + box_width * 0.5, y_scaling * (config.height * 0.5 - config.height * config.bulge_height_factor * config.bulge_stretch_factor) + box_height * 0.5,
	x_scaling * (-config.width * 0.5 * config.bulge_upper_factor) + box_width * 0.5, y_scaling * (config.height * 0.5 - config.height * config.bulge_height_factor * (1.0 + config.bulge_stretch_factor)) + box_height * 0.5,
	x_scaling * (-config.width * 0.5 * config.opening_factor) + box_width * 0.5, y_scaling * (-config.height * 0.5) + box_height * 0.5);

	/* Top */
	ctx.quadraticCurveTo(
	0 + box_width * 0.5, y_scaling * (-config.height * 0.5 - (config.width * config.opening_factor) * config.depth_factor) + box_height * 0.5,
	x_scaling * (config.width * 0.5 * config.opening_factor) + box_width * 0.5, y_scaling * (-config.height * 0.5) + box_height * 0.5);
	ctx.quadraticCurveTo(
	0 + box_width * 0.5, y_scaling * (-config.height * 0.5 + (config.width * config.opening_factor) * config.depth_factor) + box_height * 0.5,
	x_scaling * (-config.width * 0.5 * config.opening_factor) + box_width * 0.5, y_scaling * (-config.height * 0.5) + box_height * 0.5);

	config.width = glass_width_backup;
	config.height = glass_height_backup;
}


function CreateGlassConfig(_width, _height, _bulge_upper_factor, _bulge_lower_factor, _bulge_height_factor, _bulge_stretch_factor, _opening_factor, _depth_factor, _fill_height_factor, _handle_width = 85, _handle_curve_section = 0.60, _handle_height_factor = 0.7, _handle_thickness = 45, _steel_height_factor = 0.3, _steel_base_factor = 1.4, _glass_thickness = 202)
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

	config.handle_width = _handle_width;
	config.handle_curve_section = _handle_curve_section;
	config.handle_height_factor = _handle_height_factor;
	config.handle_thickness = _handle_thickness;

	config.steel_height_factor = _steel_height_factor;
	config.steel_base_factor = _steel_base_factor;

	config.glass_thickness = _glass_thickness;

	return config;
}


function GenerateHandle(ctx, box_width, box_height, config)
{
	ctx.beginPath();
	ctx.moveTo(box_width * 0.5, -config.height * config.handle_height_factor * 0.5 + box_height * 0.5);
	ctx.lineTo(box_width * 0.5 + config.width * 0.5 + config.handle_width * (1.0 - config.handle_curve_section), -config.height * config.handle_height_factor * 0.5 + box_height * 0.5);
	ctx.quadraticCurveTo(box_width * 0.5 + config.width * 0.5 + config.handle_width, -config.height * config.handle_height_factor * 0.5 + box_height * 0.5,
								box_width * 0.5 + config.width * 0.5 + config.handle_width, -config.height * (config.handle_height_factor * (1.0 - config.handle_curve_section)) * 0.5 + box_height * 0.5);
	ctx.lineTo(box_width * 0.5 + config.width * 0.5 + config.handle_width, config.height * (config.handle_height_factor * (1.0 - config.handle_curve_section)) * 0.5 + box_height * 0.5);
	ctx.quadraticCurveTo(box_width * 0.5 + config.width * 0.5 + config.handle_width, config.height * config.handle_height_factor * 0.5 + box_height * 0.5,
	                     box_width * 0.5 + config.width * 0.5 + config.handle_width * (1.0 - config.handle_curve_section), config.height * config.handle_height_factor * 0.5 + box_height * 0.5);
	ctx.lineTo(box_width * 0.5, config.height * config.handle_height_factor * 0.5 + box_height * 0.5);

	ctx.lineTo(box_width * 0.5, config.height * config.handle_height_factor * 0.5 + box_height * 0.5 - config.handle_thickness);

	ctx.lineTo(box_width * 0.5 + config.width * 0.5 + config.handle_width * (1.0 - config.handle_curve_section), config.height * config.handle_height_factor * 0.5 + box_height * 0.5 - config.handle_thickness);
	ctx.quadraticCurveTo(box_width * 0.5 + config.width * 0.5 + config.handle_width - config.handle_thickness, config.height * config.handle_height_factor * 0.5 + box_height * 0.5 - config.handle_thickness,
								box_width * 0.5 + config.width * 0.5 + config.handle_width - config.handle_thickness, config.height * (config.handle_height_factor * (1.0 - config.handle_curve_section)) * 0.5 + box_height * 0.5);
	ctx.lineTo(box_width * 0.5 + config.width * 0.5 + config.handle_width - config.handle_thickness, -config.height * (config.handle_height_factor * (1.0 - config.handle_curve_section)) * 0.5 + box_height * 0.5);
	ctx.quadraticCurveTo(box_width * 0.5 + config.width * 0.5 + config.handle_width - config.handle_thickness, -config.height * config.handle_height_factor * 0.5 + box_height * 0.5 + config.handle_thickness,
								box_width * 0.5 + config.width * 0.5 + config.handle_width * (1.0 - config.handle_curve_section), -config.height * config.handle_height_factor * 0.5 + box_height * 0.5 + config.handle_thickness);
	ctx.lineTo(box_width * 0.5, -config.height * config.handle_height_factor * 0.5 + box_height * 0.5 + config.handle_thickness);

}


function GenerateSteel(ctx, box_width, box_height, config)
{

	ctx.beginPath();
	ctx.ellipse(box_width * 0.5, config.height * 0.5 + box_height * 0.5 + config.steel_height_factor * config.height, 0.5 * config.steel_base_factor * config.width, config.depth_factor * config.width, 0, 0, 2.0 * Math.PI);
	ctx.moveTo(box_width * 0.5, config.height * 0.5 + box_height * 0.5);
	ctx.lineTo(box_width * 0.5, config.height * 0.5 + box_height * 0.5 + config.steel_height_factor * config.height);
}


function PourBeer(beer_ctx, config)
{
	var box_width = beer_ctx.canvas.clientWidth;
	var box_height = beer_ctx.canvas.clientHeight;

	/* Beer */
	var gradient = beer_ctx.createLinearGradient(0, -config.height * 0.5 + 0.5 * box_height, 0, config.height * 0.5 + 0.5 * box_height);
	gradient.addColorStop(0, "#edc100");
	gradient.addColorStop(1, "#d17525");
	beer_ctx.fillStyle = gradient;
	beer_ctx.fillRect(0.0 , 0.5 * box_height - config.height * 0.5, box_width, config.height * (1.0 + config.depth_factor));
	/* Foam */
	beer_ctx.beginPath();
	beer_ctx.moveTo(0, -config.height * 0.5 + box_height * 0.5);
	beer_ctx.lineTo(-config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5 + config.empty_height);

	beer_ctx.quadraticCurveTo(
	0 + box_width * 0.5, -config.height * 0.5 + (config.width * config.opening_factor) * config.depth_factor + box_height * 0.5 + config.empty_height,
	config.width * 0.5 * config.opening_factor + box_width * 0.5, -config.height * 0.5 + box_height * 0.5 + config.empty_height);

	beer_ctx.lineTo(box_width, -config.height * 0.5 + box_height * 0.5 + config.empty_height);
	beer_ctx.lineTo(box_width, 0);
	beer_ctx.lineTo(0, 0);
	beer_ctx.fillStyle = "#f9efc2"
	beer_ctx.fill()

	var background_canvas = document.createElement('canvas');
	background_canvas.width = canvas.width;
	background_canvas.height = canvas.height;
	var background_ctx = background_canvas.getContext('2d');
	/* Section to put stuff behind the glass */
	background_ctx.fillStyle = "#fffce5";
	background_ctx.fillRect(0, 0, box_width, box_height);

	// background_ctx.arc(box_width * 0.5, box_height * 0.5, 300, 0, 2 * Math.PI, false);
	// background_ctx.fillStyle = "green";
	// background_ctx.fill();

	if(config.type == 'M')
	{
		GenerateHandle(background_ctx, box_width, box_height, config);
		background_ctx.fillStyle = "white";
		background_ctx.fill();
		background_ctx.lineWidth = 6;
		background_ctx.lineCap = "round";
		background_ctx.stroke();
	}
	else if(config.type == 'S')
	{
		GenerateSteel(background_ctx, box_width, box_height, config);
		background_ctx.fillStyle = "white";
		background_ctx.fill();
		background_ctx.lineWidth = 6;
		background_ctx.lineCap = "round";
		background_ctx.stroke();
	}

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
	GenerateOutline(background_ctx, box_width, box_height, config, 1.0 + config.glass_thickness / config.width, 1.0 + config.glass_thickness / config.height);
	background_ctx.fill();

	/* Stapling the layers */
	beer_ctx.drawImage(glass_canvas, 0, 0);
	beer_ctx.drawImage(background_canvas, 0, 0);

	/* Outline */
	GenerateOutline(beer_ctx, box_width, box_height, config, 1.0 + config.glass_thickness / config.width, 1.0 + config.glass_thickness / config.height);
	beer_ctx.lineWidth = 6;
	beer_ctx.lineCap = "round";
	beer_ctx.stroke();
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
