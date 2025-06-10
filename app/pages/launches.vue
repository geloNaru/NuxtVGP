<template>
	<v-container>
		<h1 class="my-5">
			Example Vuetify
			<v-chip color="blue">Launches</v-chip>
			<v-chip color="orange">Data from SpaceX GraphQL</v-chip>
		</h1>
		<p>There are {{ launches?.length || 0 }} launches.</p>
		<v-table>
			<thead>
				<tr>
					<th class="text-left">Mission Name</th>
					<th class="text-left">Launch Date</th>
					<th class="text-left">Launch Site</th>
					<th class="text-left">Rocket Name</th>
					<th class="text-left">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in launches" :key="launch.id">
					<td>{{ launch.mission_name }}</td>
					<td>{{ formatDate(launch.launch_date_local) }}</td>
					<td>
						{{
							launch.launch_site?.site_name_long ||
							launch.launch_site?.site_name ||
							launch.launch_site?.site_id ||
							'N/A'
						}}
					</td>
					<td>{{ launch.rocket?.rocket_name }}</td>
					<td>{{ launch.details || 'No details' }}</td>
				</tr>
			</tbody>
		</v-table>
	</v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const query = gql`
	query getLaunches {
		launchesPast(limit: 10, sort: "launch_date_local", order: "desc") {
			id
			mission_name
			launch_date_local
			launch_site {
				site_id
				site_name
				site_name_long
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`
const { data } = useAsyncQuery(query)
const launches = computed(() => data.value?.launchesPast ?? [])
function formatDate(dateStr: string) {
	if (!dateStr) return 'N/A'
	return new Date(dateStr).toLocaleString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})
}
watchEffect(() => {
	console.log(launches.value)
})
</script>
