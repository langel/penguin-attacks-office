
function game_init() {
	stuff.decor = [];
	for (let i = 0; i < 8; i++) {
		stuff.decor.push({x: 64, y: 64 + 52 * i, t: 'palm'});
		stuff.decor.push({x: 204, y: 64 + 56 * i, t: 'desk'});
	}
	let dado = new_ent();
	dado.x = 150;
	stuff.dado = dado;
}

function game_frame() {
	// city view
	if (s_frame_count % 3 == 0) bgvy++;
	if (bgvy > bgvh) bgvy -= bgvh;
	s_ctx.drawImage(gfx['bg_view'], 0, bgvy);
	s_ctx.drawImage(gfx['bg_view'], 0, bgvy - bgvh);
	// background
	if (s_frame_count % 2 == 0) bgy++;
	if (bgy > bgh) bgy -= bgh;
	s_ctx.drawImage(gfx['bg_offices'], 0, bgy);
	s_ctx.drawImage(gfx['bg_offices'], 0, bgy - bgh);
	// doorways
	s_ctx.drawImage(gfx['bg_doorway'], 0, 0, 96, 64, 112, bgy - 320, 96, 64);
	s_ctx.drawImage(gfx['bg_doorway'], 0, 0, 96, 64, 112, bgy - 576, 96, 64);
	s_ctx.drawImage(gfx['bg_doorway'], 96, 0, 96, 64, 112, bgy - 1088, 96, 64);
	// objects
	stuff.decor.forEach((ent, i) => {
		if (s_frame_count % 2 == 0) {
			ent.y++;
			if (ent.y > s_height) ent.y -= s_height * 2;
		}
		if (ent.t == 'palm') s_ctx.drawImage(gfx['tree_palm'], 0, 0, 32, 64, ent.x, ent.y, 32, 64);
		if (ent.t == 'desk') s_ctx.drawImage(gfx['desk'], 0, 0, 48, 32, ent.x, ent.y, 48, 32);
	});
	// enemy
	// dado
	if (s_frame_count % 300 < 120) {
		let frame = Math.floor(((s_frame_count % 300)) / 10);
		let x = (frame % 5) * 32;
		let y = Math.floor(frame / 5) * 32;
		s_ctx.drawImage(gfx['dado'], x, y, 32, 32, stuff.dado.x, 100, 32, 32);

	}
	// hipu
	sy++;
	if (sy > 200) {
		sy = 0;
		sx = Math.floor(Math.random() * 256) + 32;
	}
	s_ctx.drawImage(gfx['hipu_shadow'], sx, sy + 8);
	if ((s_frame_count >> 4) % 2) {
		s_ctx.drawImage(gfx['hipu'], 
			0, 0, 32, 32, sx, sy, 32, 32);
	}
	else {
		s_ctx.drawImage(gfx['hipu'], 
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
			s_ctx.drawImage(gfx['player_bullet'], b.x, b.y);
		}
	}
};


