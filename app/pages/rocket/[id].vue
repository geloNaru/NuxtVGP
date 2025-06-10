<template>
	<v-container>
		<v-card v-if="rocket">
			<v-card-title>{{ rocket.name }}</v-card-title>
			<v-card-text>
				<p>
					<strong>Description:</strong>
					{{ rocket.description }}
				</p>
				<p>
					<strong>First Flight:</strong>
					{{ rocket.first_flight }}
				</p>
				<p>
					<strong>Height:</strong>
					{{ rocket.height?.meters }} m
				</p>
				<p>
					<strong>Diameter:</strong>
					{{ rocket.diameter?.meters }} m
				</p>
				<p>
					<strong>Mass:</strong>
					{{ rocket.mass?.kg }} kg
				</p>
				<p>
					<strong>Stages:</strong>
					{{ rocket.stages }}
				</p>
			</v-card-text>
		</v-card>
		<v-alert v-else type="error">Rocket not found.</v-alert>
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
const { data } = useAsyncQuery(query, { id: rocketId })
const rocket = computed(() => data.value?.rocket)
</script>
