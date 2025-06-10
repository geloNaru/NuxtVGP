<template>
	<v-app>
		<ClientOnly>
			<AppNavbar />
		</ClientOnly>
		<v-main>
			<slot />
		</v-main>
		<AppFooter />
	</v-app>
</template>

<script>
import AppFooter from '~/components/AppFooter.vue'
import AppNavbar from '~/components/AppNavbar.vue'

export default {
	name: 'DefaultLayout',
	components: {
		AppNavbar,
		AppFooter,
	},
}
</script>
