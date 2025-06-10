<template>
	<v-container>
		<h1 class="mb-6">Favorite Rockets</h1>
		<v-btn
			v-if="favorites.rockets.length"
			color="error"
			variant="flat"
			prepend-icon="mdi-delete-sweep"
			class="mb-6"
			@click="favorites.clear"
		>
			Clear All Favorites
		</v-btn>

		<v-row v-if="favorites.rockets.length" dense>
			<v-col v-for="rocket in favorites.rockets" :key="rocket.id" cols="12" sm="6" md="4" lg="3">
				<v-card class="h-100" elevation="2">
					<v-card-title class="d-flex align-center justify-space-between">
						<div class="d-flex align-center">
							<v-avatar color="primary" class="me-3">
								<v-icon>mdi-rocket</v-icon>
							</v-avatar>
							<span class="font-weight-bold">{{ rocket.rocket_name || rocket.name }}</span>
						</div>
						<v-btn icon color="error" @click.stop="favorites.removeRocket(rocket.id)">
							<v-icon>mdi-delete</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-subtitle>
						First Flight:
						{{ rocket.first_flight ? new Date(rocket.first_flight).toLocaleDateString() : 'N/A' }}
					</v-card-subtitle>
					<v-card-text>
						<span class="text-truncate" style="display: block; max-width: 100%">
							{{ rocket.description || 'No description available.' }}
						</span>
					</v-card-text>
					<v-card-actions>
						<NuxtLink :to="`/rocket/${rocket.id}`">
							<v-btn color="primary" variant="outlined" prepend-icon="mdi-eye">
								View Details
							</v-btn>
						</NuxtLink>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<v-alert v-else type="info" variant="outlined" icon="mdi-star-outline" class="mt-10" border="start">
			No favorites yet. Add rockets to your favorites to see them here!
		</v-alert>
	</v-container>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorite-rocket'
const favorites = useFavoritesStore()
</script>
