import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		rockets: [] as any[],
	}),
	actions: {
		addRocket(rocket: any) {
			if (!this.rockets.find((r) => r.id === rocket.id)) {
				this.rockets.push(rocket)
			}
		},
		removeRocket(id: string) {
			this.rockets = this.rockets.filter((r) => r.id !== id)
		},
		clear() {
			this.rockets = []
		},
	},
	persist: true,
})
