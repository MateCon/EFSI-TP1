/*
[
    { "valores": [24, 53, 24, 32, ...], "owner": "Fausto" }
    { "valores": [24, 53, 24, 32, ...], "owner": "Mateo" }
    { "valores": [24, 53, 24, 32, ...], "owner": "Colo" }
]
*/

import { random_number } from "./math";

const LENGTH_CARTON = 10;
const MAX_NUMBER = 100;

const crear_carton = () => {
	// const valores = new Array(length)
	// 	.fill(0)
	// 	.map(() => random_number(1, length));
	const valores = [];

	for (let i = 0; i < LENGTH_CARTON; i++) {
		valores.push(random_number(1, MAX_NUMBER));
	}

	return valores;
};

export const crear_cartones = () => {};
