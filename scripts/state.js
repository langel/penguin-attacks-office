
const instructions = 'WASD + Arrows: Controls | Tab: Swap Controls | Space: Start/Pause';

const state_init = () => {
	if (graphics_count == 0) graphics_init();
	if (graphics_loaded == graphics_count) {
		state_current = game_frame;
		console.log(graphics_loaded + ' graphics loaded');
		document.getElementById('status_bar').innerHTML = instructions;
	}
	game_init();
}

function state_handler() {
	input_get();
	state_current();
}

let state_current = state_init;
s_frame_callback = state_handler;
