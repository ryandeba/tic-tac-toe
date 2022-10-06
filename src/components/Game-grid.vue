<script>
	export default {
		props: {
			game: {
				type: Object,
			},

			winningIndeces: {
				type: Array,
			}
		},
	}
</script>

<template>
	<div class="grid">
		<div
			v-for="(c, i) in game.grid"
			:key="i"
			class="cell"
			:class="winningIndeces && winningIndeces.indexOf(i) > -1 ? 'cell--highlight' : ''"
			@click="$emit('cell-click', i)"
		>
			{{ c }}
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
		width: 20vw;
		max-width: 20vh;
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
