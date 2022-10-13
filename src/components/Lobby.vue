<script>
	export default {
		components: {
			"game-grid": require("./Game-grid").default,
		},

		props: {
			socket: {
				type: Object
			},

			games: {
				type: Array,
			}
		},

		methods: {
			newGame() {
				this.socket.emit("new-game");
			},

			joinGame(game) {
				this.socket.emit("join-game", game.id);
			},
		},
	}
</script>

<template>
	<div style="display: flex; justify-content: center;">
		<div style="display: grid; grid-gap: 12px; max-width: 600px; width: 100%;">
			<div style="text-align: center; font-size: 1.5em; margin-bottom: 24px;">
				Tic-Tac-Toe Lobby
			</div>

			<div style="text-align: center;">
				<button
					type="button"
					@click="newGame"
				>
					New Game
				</button>
			</div>

			<div
				v-for="g in games"
				:key="g.id"
				class="game"
			>
				<div>
					ID: {{ String(g.id).substr(-4) }}
				</div>

				<div>
					<game-grid
						:game="g"
						compact
					></game-grid>
				</div>

				<template v-if="g.players.find(p => p.socketID == socket.id)">
					<button
						type="button"
						@click="$emit('resume', g.id)"
					>
						Resume
					</button>
				</template>

				<template v-else-if="g.players.length == 1">
					<button
						type="button"
						@click="joinGame(g)"
					>
						Join
					</button>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.game {
		border: 1px solid #FA7F08;
		border-radius: 12px;
		background: #22BABB;
		padding: 12px;
		margin: 12px;
		text-align: center;
		display: grid;
		grid-gap: 12px;
	}
</style>
