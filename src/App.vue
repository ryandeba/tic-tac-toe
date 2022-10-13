<script>
	import { io } from '/node_modules/socket.io/client-dist/socket.io.js';

	export default {
		name: 'App',

		components: {
			lobby: require("./components/Lobby").default,
			game: require("./components/Game").default,
		},

		data() {
			return {
				socket: io.connect(`//${new URL(window.location).hostname}:3000`),

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
			this.socket.on("games", games => {
				games.reverse();
				this.games = games;
			});

			this.socket.on("game-id", gameID => {
				this.gameID = gameID;
			});

			this.socket.emit("games");
		}
	}
</script>

<template>
	<div>
		<template v-if="Boolean(game)">
			<game
				:socket="socket"
				:game="game"
				@exit="gameID = undefined"
			></game>
		</template>

		<template v-else>
			<lobby
				:socket="socket"
				:games="games"
				@resume="gameID = $event"
			></lobby>
		</template>
	</div>
</template>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap');

	#app {
		font-family: 'Open Sans', sans-serif;
	}

	html {
		background: #348888;
	}

	button {
		background: #9EF8EE;
		padding: 12px;
		border-radius: 12px;
		border: none;
		box-shadow: 2px 2px 2px 2px #000;
	}
</style>
