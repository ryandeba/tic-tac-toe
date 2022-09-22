<script>
	const winningIndeces = [
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
		data() {
			return {
				playerTurnIndex: 0,
				grid: new Array(9).fill(""),
			};
		},

		computed: {
			winningPlayerIndex() {
				let winner = winningIndeces.find(indeces => {
					return Boolean(this.grid[indeces[0]])
						&& this.grid[indeces[0]] == this.grid[indeces[1]]
						&& this.grid[indeces[0]] == this.grid[indeces[2]];
				});

				if (!Boolean(winner)) {
					return;
				}

				return this.grid[winner[0]] == "X" ? 0 : 1;
			}
		},

		methods: {
			onCellClick(index) {
				if (Boolean(this.grid[index])) {
					return;
				}

				// TODO: if the game is over, return early

				let symbol = this.playerTurnIndex == 0 ? "X" : "O";

				this.grid[index] = symbol;
				this.playerTurnIndex = this.playerTurnIndex == 0 ? 1 : 0;
			}
		}
	}
</script>

<template>
	<div>
		<div
			class="grid"
		>
			<div
				v-for="(c, i) in grid"
				:key="i"
				class="cell"
				@click="onCellClick(i)"
			>
				{{ c }}
			</div>
		</div>

		<pre>Winning Player Index: {{ winningPlayerIndex }}</pre>
	</div>
</template>

<style scoped>
	.grid {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 5px;
	}

	.cell {
		height: 20vh;
		aspect-ratio: 1;
		background: rgba(0, 255, 0, 1);

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
