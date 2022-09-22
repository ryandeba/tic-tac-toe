<script>
	export default {
		name: 'App',

		components: {
			game: require("./components/Game").default,
		}
	}
</script>

<template>
	<div>
		<game></game>
	</div>
</template>
