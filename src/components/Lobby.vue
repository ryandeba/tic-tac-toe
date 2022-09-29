<script>
	export default {
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
	<div>
		<button
			type="button"
			@click="newGame"
		>
			New Game
		</button>

		<hr>

		<div v-for="g in games" :key="g.id">
			<button
				type="button"
				@click="joinGame(g)"
				v-if="g.players.length == 1"
			>
				Join
			</button>

			{{ g }}
		</div>
	</div>
</template>
