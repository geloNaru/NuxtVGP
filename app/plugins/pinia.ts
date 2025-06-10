import { defineNuxtPlugin } from '#app'
import localForage from 'localforage'
import { createStatePersistence } from 'pinia-plugin-state-persistence'

export default defineNuxtPlugin((nuxtApp) => {
	;(nuxtApp.$pinia as any).use(
		createStatePersistence({
			key: 'vgp_',
			debug: true,
			clientOnly: true,
			storage: {
				getItem: (key) => localForage.getItem(key),
				setItem: (key, value) => localForage.setItem(key, value),
				removeItem: (key) => localForage.removeItem(key),
			},
		}),
	)
})
