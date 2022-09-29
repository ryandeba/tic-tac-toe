<script>
	import { io } from '/node_modules/socket.io/client-dist/socket.io.js';

	const socket = io.connect("//localhost:3000");

	export default {
		name: 'App',

		components: {
			lobby: require("./components/Lobby").default,
			game: require("./components/Game").default,
		},

		data() {
			return {
				socket: socket,

				games: [],

				gameID: undefined,
			};
		},

		computed: {
			game() {
				return this.games.find(g => g.id == this.gameID);
			}
		},

		mounted() {
			socket.on("games", games => {
				this.games = games;
			});

			socket.on("game-id", gameID => {
				this.gameID = gameID;
			});

			socket.emit("games");
		}
	}
</script>

<template>
	<div>
		<template v-if="Boolean(game)">
			<game
				:socket="socket"
				:game="game"
			></game>
		</template>

		<template v-else>
			<lobby
				:socket="socket"
				:games="games"
			></lobby>
		</template>
	</div>
</template>
