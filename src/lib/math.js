export const random_number = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const random_array = (length, min, max) => {
	const valores = [];

	for (let i = 0; i < length; i++) {
		let rnd = random_number(min, max);
		while (valores.includes(rnd)) {
			rnd = random_number(min, max);
		}
		valores.push(rnd);
	}

	return valores;
};
