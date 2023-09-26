
let sx = 64;
let sy = 10;

let px = s_width / 2 - 28;
let py = 150;

let pb = [];

let bgvy = 0;
let bgvh = 272;
let bgy = 0;
let bgw = 320;
let bgh = 1344;

let state = {
	'init' : {
		'frame': function() {
			if (graphics_count == 0) graphics_init();
			if (graphics_loaded == graphics_count) {
				state_current = 'game';
				console.log(graphics_loaded + ' graphics loaded');
				document.getElementById('status_bar').innerHTML = 'Penguin Attacks Office';
			}
		},
	},
	'game' : {
		'frame': function() {
			// city view
			if (s_frame_count % 3 == 0) bgvy++;
			if (bgvy > bgvh) bgvy -= bgvh;
			s_ctx.drawImage(gfx['officecityview'], 0, bgvy);
			s_ctx.drawImage(gfx['officecityview'], 0, bgvy - bgvh);
			// background
			if (s_frame_count % 2 == 0) bgy++;
			if (bgy > bgh) bgy -= bgh;
			s_ctx.drawImage(gfx['officecity'], 0, bgy);
			s_ctx.drawImage(gfx['officecity'], 0, bgy - bgh);
			// enemy
			sy++;
			if (sy > 200) {
				sy = 0;
				sx = Math.floor(Math.random() * 256) + 32;
			}
			s_ctx.drawImage(gfx['enemies_hipushadow'], sx, sy + 8);
			if ((s_frame_count >> 4) % 2) {
				s_ctx.drawImage(gfx['enemies_hipu'], 
					0, 0, 32, 32, sx, sy, 32, 32);
			}
			else {
				s_ctx.drawImage(gfx['enemies_hipu'], 
					32, 0, 32, 32, sx, sy, 32, 32);
			}
			// player
			s_ctx.drawImage(gfx['player_shadow'],
				0, 0, 56, 48, px+16, py+16, 56, 48);
			s_ctx.drawImage(gfx['player'],
				0, 0, 56, 48, px, py, 56, 48);
			// bullets
			if (s_frame_count % 3 == 0) {
				pb.push({
					x: Math.floor(Math.random() * 16) * 16 + 32,
					y: s_height,
					f: 0,
				});
			}
			for (let i = pb.length - 1; i >= 0; i--) {
				const b = pb[i];
				b.y -= 5;
				b.f++;
				if (b.y < -16) {
					pb.splice(i, 1);
				}
				else {
					s_ctx.drawImage(gfx['projectiles_player'], b.x, b.y);
				}
			}
		},
	},
};

let state_current = 'init';


function game_frame() {
	state[state_current].frame();
	input_get();
}

s_frame_callback = game_frame;
