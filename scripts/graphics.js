
const bg_list = [
	'officecity',
	'officecityview',
];
const sprite_list = [
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

function graphics_load(key, file) {
	graphics_count++;
	gfx[key] = new Image();
	gfx[key].src = file;
	gfx[key].onload = () => {
		graphics_loaded++;
	};
}

function graphics_init() {
	bg_list.forEach((key) => {
		graphics_load(key, 'graphics/backgrounds_' + key + '.png');
	});
	sprite_list.forEach((key) => {
		graphics_load(key, 'graphics/sprites_' + key + '.png');
	});
}
