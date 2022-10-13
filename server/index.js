const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "*",
	}
});

let games = [];

app.get('/', (req, res) => {
	res.send(games)
});

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on("ping", msg => {
		console.log(msg);

		socket.emit("pong", "hello from server");
	});

	socket.on("new-game", () => {
		let game = {
			id: Math.random(),
			grid: new Array(9).fill(""),
			playerTurnIndex: 0,
			players: [{
				socketID: socket.id
			}]
		};

		games.push(game);

		io.emit("games", games);
		socket.emit("game-id", game.id);
	});

	socket.on("join-game", gameID => {
		let game = games.find(g => g.id == gameID);

		game.players.push({
			socketID: socket.id
		});

		io.emit("games", games);
		socket.emit("game-id", game.id);
	});

	socket.on("play-again", gameID => {
		let game = games.find(g => g.id == gameID);

		game.grid = new Array(9).fill("");
		game.playerTurnIndex = 0;

		io.emit("games", games);
	});

	socket.on("game:clickCell", data => {
		let game = games.find(g => g.id == data.gameID);

		if (game.players[game.playerTurnIndex].socketID != socket.id) {
			return;
		}

		let symbol = game.playerTurnIndex == 0 ? "X" : "O";

		game.grid[data.cellIndex] = symbol;
		game.playerTurnIndex = game.playerTurnIndex == 0 ? 1 : 0;

		io.emit("games", games);
	});

	socket.on("games", () => {
		socket.emit("games", games);
	});
});

server.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
