
let input_key = {};
let input_pad = {};
let input = {};
let inputs_pressed = new Array(128).fill(0);

const KEY_SPACE = 32;
const KEY_TAB = 9;

window.addEventListener('keydown', (e) => {
	if (e.keyCode == KEY_TAB) e.preventDefault();
	input_key[e.keyCode] = true;
	console.log(e.keyCode);
});

window.addEventListener('keyup', (e) => {
	input_key[e.keyCode] = false;
});


function input_pad_connect(e) {
	pad = e.gamepad;
	input_pad[pad.index] = pad;
}

function input_pad_disconnect(e) {
	delete input_pad[e.gamepad.index];
}

//window.addEventListener('gamepadconnected', input_pad_connect);
//window.addEventListener('gamepaddisconnected', input_pad_disconnect);


function input_get() {
	input = {
		'mu': false,
		'mr': false,
		'md': false,
		'ml': false,
		'su': false,
		'sr': false,
		'sd': false,
		'sl': false,
	};
	const gamepads = navigator.getGamepads();
	const sb = document.getElementById('status_bar');
//	sb.innerHTML = '';
	for (const gp of gamepads) {
//		let gp = navigator.getGamepads()[0];
		if (gp) {
			gp.axes.forEach((v, i) => {
//				sb.innerHTML += i + ':' + v + ' ';
			});
	//		sb.innerHTML += '<br>';
			gp.buttons.forEach((v, i) => {
				v = gp.buttons[i].value;
//				sb.innerHTML += i + ':' + v + ' ';
			});
			/*
			if (gp.buttons[0].pressed) py--;
			if (gp.buttons[2].pressed) py++;
			if (gp.buttons[1].pressed) px--;
			if (gp.buttons[3].pressed) px++;
			if (gp.buttons[10].pressed) py--;
			if (gp.buttons[12].pressed) py++;
			if (gp.buttons[11].pressed) px--;
			if (gp.buttons[13].pressed) px++;
			if (gp.buttons[14].pressed) px--;
			*/
		}
	}
//	console.log(input_pad);
	for (let i = 0; i < 128; i++) {
		if (input_key[i]) inputs_pressed[i]++;
		else inputs_pressed[i] = 0;
	}

	if (inputs_pressed[KEY_TAB] == 1) {
		inputs_swapped = !inputs_swapped;
	}
	if (!inputs_swapped) {
		if (input_key[87]) input.mu = true;
		if (input_key[68]) input.mr = true;
		if (input_key[83]) input.md = true;
		if (input_key[65]) input.ml = true;
		if (input_key[38]) input.su = true;
		if (input_key[39]) input.sr = true;
		if (input_key[40]) input.sd = true;
		if (input_key[37]) input.sl = true;
	}
	else {
		if (input_key[87]) input.su = true;
		if (input_key[68]) input.sr = true;
		if (input_key[83]) input.sd = true;
		if (input_key[65]) input.sl = true;
		if (input_key[38]) input.mu = true;
		if (input_key[39]) input.mr = true;
		if (input_key[40]) input.md = true;
		if (input_key[37]) input.ml = true;
	}
}
