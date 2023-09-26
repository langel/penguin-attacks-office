
const s_ctx = document.getElementById('screen').getContext('2d');
const s_width = 320;
const s_height = 224;
const s_rat = s_width / s_height;
const s_fps = 48;
const s_interval = 1000 / s_fps;
let s_frame_count = 0;
let s_frame_callback;
let s_start, s_now, s_then, s_elapsed;
let sw, sh;

window.addEventListener('load', () => {
	s_ctx.canvas.width = s_width;
	s_ctx.canvas.height = s_height;
	s_then = s_start = window.performance.now();
	s_frame();
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

function s_frame() {
	requestAnimationFrame(s_frame);
	s_now = window.performance.now();
	s_elapsed = s_now - s_then;
	if (s_elapsed > s_interval) {
		s_then = s_now - (s_elapsed % s_interval);
		s_frame_count++;
		s_resize();
		s_ctx.fillStyle = '#305182';
		s_ctx.fillRect(0, 0, sw, sh);
		if (s_frame_callback) s_frame_callback();
	}
}
