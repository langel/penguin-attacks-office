
let input_key = {};
let input_pad = {};


window.addEventListener('keydown', (e) => {
	input_key[e.key] = 1;
});

window.addEventListener('keyup', (e) => {
	input_key[e.key] = 0;
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
	let input = {
		'up': 0,
		'right': 0,
		'down': 0,
		'left': 0,
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
			if (gp.buttons[0].pressed) py--;
			if (gp.buttons[2].pressed) py++;
			if (gp.buttons[1].pressed) px--;
			if (gp.buttons[3].pressed) px++;
			if (gp.buttons[10].pressed) py--;
			if (gp.buttons[12].pressed) py++;
			if (gp.buttons[11].pressed) px--;
			if (gp.buttons[13].pressed) px++;
			if (gp.buttons[14].pressed) px--;
		}
	}
//	console.log(input_pad);

	if (input_key['ArrowUp']) py-=2;
	if (input_key['ArrowDown']) py+=2;
	if (input_key['ArrowLeft']) px-=2;
	if (input_key['ArrowRight']) px+=2;
}
