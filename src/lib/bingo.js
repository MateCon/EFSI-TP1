import { random_array, random_number } from "./math.js";

const MAX_NUMBER = 100;

const pseudo_random_array = (cantNumeros) => {
	const arr = [];
	const decena = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	let decenas = [...random_array(cantNumeros % 10, 0, 9)];

	for (let i = 0; i < Math.floor(cantNumeros / 10); i++) {
		decenas = [...decenas, ...decena];
	}

	for (let i = 0; i < decenas.length; i++) {
		const min = decenas[i] * 10;
		const max = decenas[i] * 10 + 9;

		if (i === 0) arr.push(random_number(min + 1, max));
		else if (i === 90) arr.push(random_number(min, max + 1));
		else arr.push(random_number(min, max));
	}

	return arr.sort(() => Math.random() - 0.5);
};

const crear_carton = (cantNumeros) => {
	return pseudo_random_array(cantNumeros).map((numero) => ({
		numero,
		fueMarcado: false,
	}));
};

export const crear_cartones = (cantCartones, cantNumeros) => {
	const resultado = [];

	for (let i = 0; i < cantCartones; i++) {
		resultado.push(crear_carton(cantNumeros));
	}

	return resultado;
};

export const crear_numeros_posibles = () => {
	const resultado = [];

	for (let i = 0; i < MAX_NUMBER; i++) {
		resultado.push(i);
	}

	return resultado;
};

export const elegir_numero = (numeros_posibles) => {
	const idx = random_number(0, numeros_posibles.length - 1);
	const resultado = numeros_posibles[idx];
	return {
		resultado,
		// devolver los numeros posibles sin el resultado elegido
		numeros_posibles: [
			...numeros_posibles.slice(0, idx),
			...numeros_posibles.slice(idx + 1),
		],
	};
};
