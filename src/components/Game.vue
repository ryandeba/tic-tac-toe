<script>
	const possibleWinningIndeces = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	export default {
		components: {
			"game-grid": require("./Game-grid").default,
		},

		props: {
			socket: {
				type: Object
			},

			game: {
				type: Object,
			},
		},

		computed: {
			winningIndeces() {
				return possibleWinningIndeces.find(indeces => {
					return Boolean(this.game.grid[indeces[0]])
						&& this.game.grid[indeces[0]] == this.game.grid[indeces[1]]
						&& this.game.grid[indeces[0]] == this.game.grid[indeces[2]];
				});
			},

			winningPlayerIndex() {
				if (!Boolean(this.winningIndeces)) {
					return;
				}

				return this.game.grid[this.winningIndeces[0]] == "X" ? 0 : 1;
			},

			isTied() {
				return this.game.grid.indexOf("") == -1 && this.winningPlayerIndex == undefined;
			},

			gameOver() {
				return this.winningPlayerIndex != undefined || this.isTied;
			},

			friendlyStatus() {
				if (this.game.players.length < 2) {
					return "Waiting for other player to join";
				}

				if (this.isTied) {
					return "Game is tied - nobody wins";
				}

				if (this.gameOver) {
					if (this.game.players[this.winningPlayerIndex].socketID == this.socket.id) {
						return "You win!";
					}

					return "You lose!";
				}

				if (this.game.players[this.game.playerTurnIndex].socketID == this.socket.id) {
					return "Your turn";
				}

				return "Opponent's turn";
			}
		},

		methods: {
			onCellClick(index) {
				if (Boolean(this.game.grid[index])) {
					return;
				}

				if (this.gameOver) {
					return;
				}

				this.socket.emit("game:clickCell", {
					gameID: this.game.id,
					cellIndex: index,
				});
			},
		}
	}
</script>

<template>
	<div>
		<div style="text-align: center; font-size: 1.5em;">
			{{ friendlyStatus }}
		</div>

		<template v-if="game.players.length == 2">
			<div style="margin-bottom: 24px;">
				<div style="display: flex; justify-content: space-around;">
					<!-- TODO: improve "waiting for other player" ui -->
					<div
						v-for="(p, i) in game.players"
						:key="i"
						class="player"
						:class="!gameOver && game.playerTurnIndex == i ? 'player--turn' : ''"
					>
						<template v-if="p.socketID == socket.id">
							You:
						</template>

						<template v-else>
							Opponent:
						</template>

						{{ i == 0 ? "X" : "O" }}
					</div>
				</div>
			</div>

			<div style="display: flex; justify-content: center;">
				<game-grid
					:game="game"
					:winningIndeces="winningIndeces"
					@cell-click="onCellClick"
				></game-grid>
			</div>
		</template>

		<button
			type="button"
			@click="$emit('exit')"
			class="exit-button"
		>
			&lt; Back to Lobby
		</button>
	</div>
</template>

<style scoped>
	.player {
		border: 1px solid #FA7F08;
		border-radius: 12px;
		background: #22BABB;
		padding: 12px;
		margin: 12px;
		text-align: center;
		min-width: 200px;
	}

	.player--turn {
		box-shadow: 0 0 12px 12px #FA7F08;
	}

	.exit-button {
		position: fixed;
		left: 4px;
		bottom: 4px;
	}
</style>
