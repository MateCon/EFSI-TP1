import { random_array, random_number } from "./math.js";

const LENGTH_CARTON = 25;
const MAX_NUMBER = 75;

const crear_carton = () => {
	return random_array(LENGTH_CARTON, 1, MAX_NUMBER).map(numero => ({
		numero,
		fueMarcado: false
	}));
};

export const crear_cartones = (cant) => {
	const resultado = [];

	for (let i = 0; i < cant; i++) {
		resultado.push(crear_carton());
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

console.log(crear_carton());
