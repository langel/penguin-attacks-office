
p_card = 2.3;
p_diag = p_card * 0.70710678; // 1/sqrt(2)

let player = {
	hp: 0,
	lives: 0,
	x: 0,
	y: 0,
	dir_move: 0,
	dir_shoot: 0,
	draw: () => {
		let x = Math.round(player.x);
		let y = Math.round(player.y);
		s_ctx.drawImage(gfx['player_shadow'],
			0, 0, 56, 48, x-15, y-32, 56, 48);
		s_ctx.drawImage(gfx['player_roro'],
			0, 0, 56, 48, x, y, 56, 48);
		s_ctx.drawImage(gfx['player_polo'],
			0, 0, 56, 48, x, y, 56, 48);
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
	},
};
