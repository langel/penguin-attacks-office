
let sx = 64;
let sy = 10;

let px = s_width / 2 - 28;
let py = 150;

let pb = [];

let bgvy = 0;
let bgvh = 272;
let bgy = 224;
let bgw = 320;
let bgh = 1344;

let stuff = {};

let ent_obj = { x: 0, y: 0, w: 0, h: 0 };

let new_ent = () => { return JSON.parse(JSON.stringify(ent_obj)); };