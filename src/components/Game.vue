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
		props: {
			socket: {
				type: Object
			},

			game: {
				type: Object,
			},

			playerTurnIndex: {
				type: Number,
			}
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
		<div style="margin-bottom: 12px;">
			<strong>Players:</strong>

			<div
				v-for="(p, i) in game.players"
				style="padding: 2px;"
			>
				<template v-if="p.socketID == socket.id">
					You:
				</template>

				<template v-else>
					Opponent:
				</template>

				{{ i == 0 ? "X" : "O" }}

				<span>
					<template v-if="winningPlayerIndex == i">
						🥇
					</template>

					<template v-if="!gameOver && game.playerTurnIndex == i">
						👈
					</template>
				</span>
			</div>
		</div>

		<div
			class="grid"
		>
			<div
				v-for="(c, i) in game.grid"
				:key="i"
				class="cell"
				:class="winningIndeces && winningIndeces.indexOf(i) > -1 ? 'cell--highlight' : ''"
				@click="onCellClick(i)"
			>
				{{ c }}
			</div>
		</div>
	</div>
</template>

<style scoped>
	.grid {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 5px;
		background: black;
	}

	.cell {
		height: 20vh;
		aspect-ratio: 1;
		background: white;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cell--highlight {
		background: gold;
	}
</style>
