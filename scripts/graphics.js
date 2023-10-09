
const graphics_list = [
	'bg_doorway',
	'bg_offices',
	'bg_view',
	'dado',
	'desk',
	'door_debris',
	'hipu',
	'hipu_shadow',
	'kaniro_body',
	'kaniro_bullet',
	'kaniro_hands',
	'kaniro_shadow',
	'kaogutsu',
	'kaogutsu_propellor',
	'kaogutsu_shadow',
	'player',
	'player_bullet',
	'player_shadow',
	'tree_palm',
	'tree_palm_shadow',
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
	graphics_list.forEach((key) => {
		graphics_load(key, 'graphics/' + key + '.png');
	});
}
