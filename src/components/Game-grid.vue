<script>
	import X from "./x.png";
	import O from "./o.png";

	export default {
		props: {
			game: {
				type: Object,
			},

			winningIndeces: {
				type: Array,
			},

			compact: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				images: {
					X,
					O,
				}
			};
		},
	}
</script>

<template>
	<div
		class="grid"
		:class="compact ? 'grid--compact' : ''"
	>
		<div
			v-for="(c, i) in game.grid"
			:key="i"
			class="cell"
			:class="winningIndeces && winningIndeces.indexOf(i) > -1 ? 'cell--highlight' : ''"
			@click="$emit('cell-click', i)"
		>
			<img :src="images[c]">
		</div>
	</div>
</template>

<style scoped>
	.grid {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-gap: 5px;
		aspect-ratio: 1;
		width: 60vw;
		max-width: 60vh;
		background: black;
	}

	.grid.grid--compact {
		width: 8vw;
	}

	.cell {
		background: white;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cell--highlight {
		background: gold;
	}

	.cell img {
		width: 80%;
	}
</style>
