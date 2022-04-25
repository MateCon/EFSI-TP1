import express, { response } from "express";
import { crear_cartones } from "./lib/bingo.js";
import { random_number } from "./lib/math.js";
const app = express();
const PORT = 8080;

app.use(express.json());

let cartones = [];
let asignaciones = [];
let carton_actual = 0;

app.get("/", (_, res) => {
	res.send("Hello World!");
});

app.post("/numero_aleatorio", (req, res) => {
	const max = parseInt(req.body.valor);

	if (isNaN(max)) {
		res.status(400).send("Valor incorrecto");
		return;
	}

	res.status(200).json({ resultado: random_number(1, req.body.valor) });
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
		index_carton: carton_actual,
	});

	carton_actual++;

	res.status(200).send(cartones[carton_actual - 1]);
});

app.get("/cartones", (req, res) => {
	res.status(200).json(cartones);
});

app.get("/cartones/:nombre", (req, res) => {
	const nombre = req.params.nombre;

	const asignaciones_de_persona = asignaciones.filter(
		(asignacion) => asignacion.nombre === nombre
	);

	res.status(200).json(asignaciones_de_persona);
});

app.listen(PORT, () => {
	console.log("Server listening on PORT", PORT);
});
