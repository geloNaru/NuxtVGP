<template>
	<v-container>
		<LoadingState v-if="pending" message="Loading rocket details..." />

		<div v-else-if="rocket">
			<v-card class="mb-6" elevation="3">
				<v-card-title class="text-h4 pa-6 bg-primary text-white">
					<v-icon icon="mdi-rocket" class="me-3" size="large" />
					{{ rocket.name }}
					<v-btn
						:color="isFavorite ? 'warning' : 'secondary'"
						variant="flat"
						:prepend-icon="isFavorite ? 'mdi-star' : 'mdi-star-outline'"
						@click="toggleFavorite"
					>
						{{ isFavorite ? 'Remove Favorite' : 'Add to Favorites' }}
					</v-btn>
				</v-card-title>
				<v-card-text class="pa-6">
					<p class="text-body-1 text-medium-emphasis">
						{{ rocket.description }}
					</p>
				</v-card-text>
			</v-card>

			<v-row>
				<v-col cols="12" md="6">
					<v-card elevation="2" class="h-100">
						<v-card-title class="bg-grey-lighten-4">
							<v-icon icon="mdi-information" class="me-2" />
							Basic Information
						</v-card-title>
						<v-card-text class="pa-0">
							<v-list>
								<v-list-item>
									<template #prepend>
										<v-icon icon="mdi-calendar" color="primary" />
									</template>
									<v-list-item-title>First Flight</v-list-item-title>
									<v-list-item-subtitle>
										{{ formatDate(rocket.first_flight) }}
									</v-list-item-subtitle>
								</v-list-item>
								<v-divider />
								<v-list-item>
									<template #prepend>
										<v-icon icon="mdi-layers" color="primary" />
									</template>
									<v-list-item-title>Stages</v-list-item-title>
									<v-list-item-subtitle>
										{{ rocket.stages }} stage{{ rocket.stages > 1 ? 's' : '' }}
									</v-list-item-subtitle>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="12" md="6">
					<v-card elevation="2" class="h-100">
						<v-card-title class="bg-grey-lighten-4">
							<v-icon icon="mdi-ruler" class="me-2" />
							Physical Specifications
						</v-card-title>
						<v-card-text class="pa-0">
							<v-list>
								<v-list-item>
									<template #prepend>
										<v-icon icon="mdi-arrow-up" color="success" />
									</template>
									<v-list-item-title>Height</v-list-item-title>
									<v-list-item-subtitle>
										{{ rocket.height?.meters || 'N/A' }} meters
									</v-list-item-subtitle>
								</v-list-item>
								<v-divider />
								<v-list-item>
									<template #prepend>
										<v-icon icon="mdi-diameter" color="info" />
									</template>
									<v-list-item-title>Diameter</v-list-item-title>
									<v-list-item-subtitle>
										{{ rocket.diameter?.meters || 'N/A' }} meters
									</v-list-item-subtitle>
								</v-list-item>
								<v-divider />
								<v-list-item>
									<template #prepend>
										<v-icon icon="mdi-weight" color="warning" />
									</template>
									<v-list-item-title>Mass</v-list-item-title>
									<v-list-item-subtitle>
										{{ formatWeight(rocket.mass?.kg) }}
									</v-list-item-subtitle>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-4">
				<v-col cols="6" sm="3">
					<StatCard
						icon="mdi-arrow-up"
						color="success"
						:value="rocket.height?.meters || 'N/A'"
						label="Meters Height"
					/>
				</v-col>
				<v-col cols="6" sm="3">
					<StatCard
						icon="mdi-diameter"
						color="info"
						:value="rocket.diameter?.meters || 'N/A'"
						label="Meters Diameter"
					/>
				</v-col>
				<v-col cols="6" sm="3">
					<StatCard
						icon="mdi-weight"
						color="warning"
						:value="formatWeightShort(rocket.mass?.kg)"
						label="Mass"
					/>
				</v-col>
				<v-col cols="6" sm="3">
					<StatCard
						icon="mdi-layers"
						color="primary"
						:value="rocket.stages"
						:label="`Stage${rocket.stages > 1 ? 's' : ''}`"
					/>
				</v-col>
			</v-row>

			<div class="mt-6">
				<v-btn
					color="primary"
					variant="outlined"
					prepend-icon="mdi-arrow-left"
					@click="$router.back()"
				>
					Back to Launches
				</v-btn>
			</div>
		</div>

		<EmptyState
			v-else
			icon="mdi-alert-circle"
			icon-color="error"
			title="Rocket Not Found"
			description="The rocket you're looking for doesn't exist or couldn't be loaded."
			action-text="Go Back"
			@action="$router.back()"
		/>
	</v-container>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFavoritesStore } from '@/stores/favorite-rocket'
const favoritesStore = useFavoritesStore()
const route = useRoute()
const rocketId = route.params.id

const query = gql`
	query getRocket($id: ID!) {
		rocket(id: $id) {
			name
			description
			first_flight
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
		}
	}
`

const { data, pending } = await useAsyncQuery(query, { id: rocketId })
const rocket = computed(() => data.value?.rocket)

const isFavorite = computed(() => favoritesStore.rockets.some((r) => r.id === rocketId))

function toggleFavorite() {
	if (!rocket.value) return
	if (isFavorite.value) {
		favoritesStore.removeRocket(rocketId)
		snackbarMsg.value = 'Removed from favorites'
	} else {
		favoritesStore.addRocket({
			id: rocketId,
			name: rocket.value.name,
			description: rocket.value.description,
			first_flight: rocket.value.first_flight,
			height: rocket.value.height,
			diameter: rocket.value.diameter,
			mass: rocket.value.mass,
			stages: rocket.value.stages,
		})
	}
}

function formatDate(dateStr: string) {
	if (!dateStr) return 'N/A'
	return new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

function formatWeight(kg: number) {
	if (!kg) return 'N/A'
	return `${kg.toLocaleString()} kg (${(kg / 1000).toLocaleString()} tons)`
}

function formatWeightShort(kg: number) {
	if (!kg) return 'N/A'
	if (kg >= 1000) {
		return `${(kg / 1000).toLocaleString()}t`
	}
	return `${kg.toLocaleString()}kg`
}
</script>
