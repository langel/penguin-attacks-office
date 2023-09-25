
const graphics_files = [
	'enemies_hipu',
	'enemies_hipushadow',
	'enemies_kanirobody',
	'enemies_kanirohands',
	'enemies_kaniroshadow',
	'objects_pottedpalmtree',
	'objects_pottedpalmtreeshadow',
	'player',
	'player_shadow',
	'projectiles_kaniro',
	'projectiles_player',
];

let gfx = {};
let graphics_count = 0;
let graphics_loaded = 0;

function graphics_load() {
	graphics_files.forEach((file) => {
		graphics_count++;
		gfx[file] = new Image();
		gfx[file].src = 'graphics/sprites_' + file + '.png';
		gfx[file].onload = () => {
			graphics_loaded++;
		};
	});
}
