import { random_number } from "./math.js";

const LENGTH_CARTON = 10;
const MAX_NUMBER = 100;

const crear_carton = () => {
	const valores = [];

	for (let i = 0; i < LENGTH_CARTON; i++) {
		let rnd = random_number(1, MAX_NUMBER);
		while (!valores.includes(rnd)) {
			rnd = random_number(1, MAX_NUMBER);
		}
		valores.push(rnd);
	}

	return valores;
};

export const crear_cartones = (cant) => {
	const resultado = [];

	for (let i = 0; i < cant; i++) {
		resultado.push(crear_carton());
	}

	return resultado;
};
