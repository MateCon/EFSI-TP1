import express from "express";
import { random_number } from "./lib/math.js";
const app = express();
const PORT = 8080;

app.use(express.json());

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

app.listen(PORT, () => {
	console.log(random_number(1, 10));
	console.log("Server listening on PORT", PORT);
});
