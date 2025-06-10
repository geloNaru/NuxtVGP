<template>
	<v-container>
		<div v-if="pending" class="d-flex justify-center align-center" style="min-height: 400px">
			<div class="text-center">
				<v-progress-circular :size="70" :width="7" color="primary" indeterminate />
				<p class="mt-4 text-h6">Loading rocket details...</p>
			</div>
		</div>

		<div v-else-if="rocket">
			<v-card class="mb-6" elevation="3">
				<v-card-title class="text-h4 pa-6 bg-primary text-white">
					<v-icon icon="mdi-rocket" class="me-3" size="large" />
					{{ rocket.name }}
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
					<v-card elevation="1" class="text-center pa-4">
						<v-icon icon="mdi-arrow-up" color="success" size="large" class="mb-2" />
						<div class="text-h6">{{ rocket.height?.meters || 'N/A' }}</div>
						<div class="text-caption text-medium-emphasis">Meters Height</div>
					</v-card>
				</v-col>
				<v-col cols="6" sm="3">
					<v-card elevation="1" class="text-center pa-4">
						<v-icon icon="mdi-diameter" color="info" size="large" class="mb-2" />
						<div class="text-h6">{{ rocket.diameter?.meters || 'N/A' }}</div>
						<div class="text-caption text-medium-emphasis">Meters Diameter</div>
					</v-card>
				</v-col>
				<v-col cols="6" sm="3">
					<v-card elevation="1" class="text-center pa-4">
						<v-icon icon="mdi-weight" color="warning" size="large" class="mb-2" />
						<div class="text-h6">{{ formatWeightShort(rocket.mass?.kg) }}</div>
						<div class="text-caption text-medium-emphasis">Mass</div>
					</v-card>
				</v-col>
				<v-col cols="6" sm="3">
					<v-card elevation="1" class="text-center pa-4">
						<v-icon icon="mdi-layers" color="primary" size="large" class="mb-2" />
						<div class="text-h6">{{ rocket.stages }}</div>
						<div class="text-caption text-medium-emphasis">
							Stage{{ rocket.stages > 1 ? 's' : '' }}
						</div>
					</v-card>
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

		<v-card v-else class="text-center pa-8" elevation="2">
			<v-icon icon="mdi-alert-circle" size="64" color="error" class="mb-4" />
			<h3 class="text-h5 mb-2">Rocket Not Found</h3>
			<p class="text-body-1 text-medium-emphasis mb-4">
				The rocket you're looking for doesn't exist or couldn't be loaded.
			</p>
			<v-btn color="primary" variant="outlined" @click="$router.back()">Go Back</v-btn>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
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
