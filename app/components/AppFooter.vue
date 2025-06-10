<template>
	<v-footer app>
		<v-container>
			<v-row>
				<v-col class="text-center">
					<p>&copy; {{ new Date().getFullYear() }} Angelo Munar | Frontend Test Apollo Lights</p>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script>
export default {
	name: 'AppFooter',
}
</script>

<style scoped>
/* Add any specific styles for the footer here */
</style>
