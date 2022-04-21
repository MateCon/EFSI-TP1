const express = require("express");
const app = express();
const PORT = 3000;

const process_data = () => {
	let x = 100;

	return {
		resultado: x,
	};
};

app.use(express.json());

app.get("/", function (req, res) {
	res.send("Hello World!");
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
