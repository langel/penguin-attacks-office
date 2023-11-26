
p_card = 2.3;
p_diag = p_card * 0.70710678; // 1/sqrt(2)

polo_sprites = [
	[32,0],[64,0],[64,32],[64,64],
	[32,64],[0,64],[0,32],[0,0],
];
polo_bo = [ // bullet origins offset from sprite x,y
	[6,0],[17,1],[24,17],[18,17],
	[16,20],[8,20],[0,17],[-1,8],
];

let player = {
	hp: 0,
	lives: 0,
	x: 0,
	y: 0,
	dir_move: 0,
	dir_shoot: 0,
	turret: [0,0],
	draw: () => {
		let x = Math.round(player.x);
		let y = Math.round(player.y);
		let tempx, tempy;
		// shadow
		tempx = x - 15;
		tempy = y - 32;
		s_ctx.drawImage(gfx['player_shadow'], 0, 0, 56, 48, tempx, tempy, 56, 48);
		// steed
		tempx = x - 31;
		tempy = y - 42;
		if (input.ml) s_ctx.drawImage(gfx['player_roro'], 64, 0, 56, 48, tempx, tempy, 56, 48);
		else if (input.mr) s_ctx.drawImage(gfx['player_roro'], 128, 0, 56, 48, tempx, tempy, 56, 48);
		else s_ctx.drawImage(gfx['player_roro'], 0, 0, 56, 48, tempx, tempy, 56, 48);
		// character
		let dir = player.dir_shoot;
		tempx = x - 15;
		if (input.ml) tempx -= 5;
		if (input.mr) tempx += 5;
		tempy = y - 36;
		s_ctx.drawImage(gfx['player_polo'],	polo_sprites[dir][0], polo_sprites[dir][1], 32, 32, tempx, tempy, 32, 32);
		player.turret[0] = tempx + polo_bo[player.dir_shoot][0];
		player.turret[1] = tempy + polo_bo[player.dir_shoot][1];
		if (show_origin_point) {
			s_ctx.fillStyle = '#00ff00';
			s_ctx.fillRect(x, y, 2, 2);
		}
	},
	new_game: () => {
		player.lives = 3;
		player.new_life();
		player.x = s_width / 2;
		player.y = s_height - 16;
	},
	new_life: () => {
		player.hp = 3;
	},
	update: () => {
		// MOVEMENT
		if (input.mu && input.mr) {
			player.y -= p_diag;
			player.x += p_diag;
		}
		else if (input.mr && input.md) {
			player.y += p_diag;
			player.x += p_diag;
		}
		else if (input.md && input.ml) {
			player.y += p_diag;
			player.x -= p_diag;
		}
		else if (input.ml && input.mu) {
			player.y -= p_diag;
			player.x -= p_diag;
		}
		else if (input.mu) player.y -= p_card;
		else if (input.mr) player.x += p_card;
		else if (input.md) player.y += p_card;
		else if (input.ml) player.x -= p_card;
		// SHOOTING
		if (frames % 8 == 0) player.dir_shoot = (player.dir_shoot + 1) % 8;
//		player.dir_shoot = (frames >> 3) % 8;
		let temp = player.dir_shoot;
		player.dir_shoot = 99;
		if (input.su && input.sr) player.dir_shoot = 1;
		else if (input.sr && input.sd) player.dir_shoot = 3;
		else if (input.sd && input.sl) player.dir_shoot = 5;
		else if (input.sl && input.su) player.dir_shoot = 7;
		else if (input.su) player.dir_shoot = 0;
		else if (input.sr) player.dir_shoot = 2;
		else if (input.sd) player.dir_shoot = 4;
		else if (input.sl) player.dir_shoot = 6;
		if (player.dir_shoot <= 7) {
			if (s_frame_count % 6 == 0) {
				let b = new_ent();
				b.x = player.turret[0];
				b.y = player.turret[1];
				b.w = b.h = 8;
				b.d = player.dir_shoot;
				stuff.p_bullets.push(b);
			}
		}
		else player.dir_shoot = temp;
	},
};
