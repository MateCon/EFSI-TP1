import express from "express";
import {
	crear_cartones,
	crear_numeros_posibles,
	elegir_numero,
} from "./lib/bingo.js";
import { random_number } from "./lib/math.js";
const app = express();
const PORT = 8080;

app.use(express.json());

let cartones = [];
let asignaciones = [];
let carton_actual; // para asignar los cartones antes de comenzar el juego
let numeros_posibles; // para ir sacando numeros al azar durante el juego
let juego_terminado;
/*
Esta es la forma que utilizamos para guardar
los cartones y la forma de asignarle un
carton a un jugador:

Carton       : { numero, fueMarcado }[],
Cartones     : Carton[]
Asignacion   : { nombre, indexCarton }
Asignaciones : Asignacion[]
*/

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.post("/numero_aleatorio", (req, res) => {
	const max = parseInt(req.body.valor);

	if (isNaN(max)) {
		res.status(400).send("Valor incorrecto");
		return;
	}

	res.status(200).json({ resultado: random_number(1, max) });
});

app.post("/iniciar_juego", (req, res) => {
	const cantCartones = parseInt(req.body.value);

	if (isNaN(cantCartones)) {
		res.status(400).send("Valor incorrecto");
		return;
	}

	cartones = crear_cartones(cantCartones);
	asignaciones = [];
	carton_actual = 0;
	numeros_posibles = crear_numeros_posibles();
	juego_terminado = false;
	res.status(200).send("Juego iniciado");
});

app.get("/obtener_carton", (req, res) => {
	const nombre = req.body.nombre;

	if (!nombre) {
		res.status(400).send("Nombre no encontrado");
		return;
	}

	if (carton_actual >= cartones.length - 1) {
		res.status(200).send("No mas cartones");
		return;
	}

	asignaciones.push({
		nombre,
		indexCarton: carton_actual,
	});

	carton_actual++;

	res.status(200).send(cartones[carton_actual - 1]);
});

app.get("/cartones", (req, res) => {
	res.status(200).json(cartones);
});

app.get("/cartones/:nombre", (req, res) => {
	const nombre = req.params.nombre;

	const cartones_de_persona = asignaciones
		// filtrar las asignaciones que no son del usuario
		.filter((asignacion) => asignacion.nombre === nombre)
		// convertir las asignaciones a los cartones que apuntan
		.map((asignacion) => cartones[asignacion.indexCarton]);

	if (cartones_de_persona.length === 0) {
		res.status(404).send("Persona no encontrada");
		return;
	}

	res.status(200).json(cartones_de_persona);
});

/*
Posible mejora: guardar dentro del carton un contador de
cuantos numeros se marcaron para evitar el every que
se usa dentro del primer
*/
app.get("/sacar_numero", (req, res) => {
	if (juego_terminado) {
		res.status(200).send("el juego ya ha terminado");
		return;
	}
	const data = elegir_numero(numeros_posibles);
	numeros_posibles = data.numeros_posibles;

	for (let i = 0; i < cartones.length; i++) {
		cartones[i].forEach((cuadrado) => {
			if (cuadrado.numero === data.resultado) {
				cuadrado.fueMarcado = true;
			}
		});

		if (cartones[i].every((cuadrado) => cuadrado.fueMarcado)) {
			// persona ha ganado
			const persona = asignaciones.filter((a) => a.indexCarton === i)[0].nombre || "Nadie";
			juego_terminado = true;
			res.status(200).send(`${persona} ha ganado!`);
			return;
		}
	}

	res.status(200).send(`Numero eliminado: ${data.resultado}`);
});

app.listen(PORT, () => {
	console.log("Server listening on PORT", PORT);
});
