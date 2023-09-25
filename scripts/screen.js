
const s_ctx = document.getElementById('screen').getContext('2d');
const s_width = 256;
const s_height = 224;
const s_rat = s_width / s_height;
let sw, sh;
let sprite;

window.addEventListener('load', () => {
	s_ctx.canvas.width = s_width;
	s_ctx.canvas.height = s_height;
	sprite = new Image();
	sprite.src = "graphics/sprites_enemies_hipu.png";
	sprite.onload = function() {
		s_resize();
		s_render();
	}
});

window.addEventListener('resize', () => {
	s_resize();
	s_render();
});

function s_resize() {
	let ww = window.innerWidth;
	let wh = window.innerHeight;
	const wrat = ww / wh;
	if (wrat < s_rat) {
		let p = Math.floor(ww / s_width);
		p = (p) ? p : 1;
		sw = s_width * p;
		sh = s_height * p;
	}
	else {
		let p = Math.floor(wh / s_height);
		p = (p) ? p : 1;
		sw = s_width * p;
		sh = s_height * p;
	}
	s_ctx.canvas.style.width = sw;
	s_ctx.canvas.style.height = sh;
}

function s_render() {
	s_ctx.fillStyle = '#ccc';
	s_ctx.fillRect(0, 0, sw, sh);
	s_ctx.drawImage(sprite, 64, 64);
}
