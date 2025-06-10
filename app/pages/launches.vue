<template>
	<v-container>
		<h1 class="my-5">SpaceX Apollo System</h1>

		<LaunchFilters
			:selected-year="selectedYear"
			:limit="limit"
			:sort-order="sortOrder"
			:year-filter-options="yearFilterOptions"
			:sort-options="sortOptions"
			:filtered-count="processedLaunches.length"
			:total-count="allLaunches.length"
			:has-active-filters="hasActiveFilters"
			@update:selected-year="selectedYear = $event"
			@update:limit="limit = $event"
			@update:sort-order="sortOrder = $event"
			@reset="resetAll"
		/>

		<v-table>
			<thead>
				<tr>
					<th class="text-left">Mission Name</th>
					<th class="text-left">
						<div class="d-flex align-center">Launch Date</div>
					</th>
					<th class="text-left">Launch Site</th>
					<th class="text-left">Rocket Name</th>
					<th class="text-left">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(launch, index) in processedLaunches" :key="launch.id">
					<td>
						<div class="d-flex align-center">
							<v-chip size="x-small" color="primary" class="me-2">
								{{ index + 1 }}
							</v-chip>
							{{ launch.mission_name }}
						</div>
					</td>
					<td>{{ formatDate(launch.launch_date_local) }}</td>
					<td>
						{{
							launch.launch_site?.site_name_long ||
							launch.launch_site?.site_name ||
							launch.launch_site?.site_id ||
							'N/A'
						}}
					</td>
					<td>
						<NuxtLink
							v-if="launch.rocket?.rocket?.id"
							:to="`/rocket/${launch.rocket.rocket.id}`"
							class="text-primary"
						>
							{{ launch.rocket?.rocket_name }}
						</NuxtLink>
						<span v-else>
							{{ launch.rocket?.rocket_name || 'N/A' }}
						</span>
					</td>

					<td>
						<span
							class="text-truncate d-inline-block"
							style="max-width: 200px"
							:title="launch.details || 'No details'"
						>
							{{ launch.details || 'No details' }}
						</span>
					</td>
				</tr>
			</tbody>
		</v-table>

		<EmptyState
			v-if="processedLaunches.length === 0 && allLaunches.length > 0"
			icon="mdi-rocket"
			title="No launches found"
			description="No launches found for the selected filters. Try adjusting your criteria."
			action-text="Clear Filters"
			@action="resetAll"
		/>
	</v-container>
</template>

<script setup lang="ts">
const limit = ref(10)

const launchesQuery = gql`
	query getLaunches($limit: Int!) {
		launchesPast(limit: $limit, sort: "launch_date_local", order: "desc") {
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
				rocket {
					id
				}
			}
			details
		}
	}
`

const variables = computed(() => ({ limit: limit.value }))
const { data, refresh } = await useAsyncQuery(launchesQuery, variables)

watch(limit, () => {
	refresh()
})

const allLaunches = computed(() => data.value?.launchesPast ?? [])

const { selectedYear, filterLaunchesByYear, getAvailableYears, resetFilters } = useLaunchFilter()
const { sortOrder, sortLaunchesByDate, resetSort } = useLaunchSort()

const processedLaunches = computed(() => {
	const filtered = filterLaunchesByYear(allLaunches.value)
	return sortLaunchesByDate(filtered)
})

const availableYears = computed(() => {
	return getAvailableYears(allLaunches.value)
})

const yearFilterOptions = computed(() => {
	return [
		{ title: 'All Years', value: 'all' },
		...availableYears.value.map((year) => ({
			title: year.toString(),
			value: year.toString(),
		})),
	]
})

const sortOptions = [
	{ title: 'Newest First', value: 'desc' },
	{ title: 'Oldest First', value: 'asc' },
]

const hasActiveFilters = computed(() => {
	return selectedYear.value !== 'all' || sortOrder.value !== 'desc'
})

function resetAll() {
	limit.value = 10
	resetFilters()
	resetSort()
}

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
</script>
