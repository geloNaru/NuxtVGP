<template>
	<v-container>
		<h1 class="my-5">SpaceX Launches Apollo System</h1>

		<!-- Filter and Sort Controls -->
		<v-card class="mb-6" elevation="2">
			<v-card-title>
				<v-icon icon="mdi-filter-variant" class="me-2" />
				Filter & Sort Options
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col cols="12" md="4">
						<v-select
							v-model="selectedYear"
							:items="yearFilterOptions"
							label="Filter by Year"
							variant="outlined"
							density="compact"
							prepend-inner-icon="mdi-calendar"
						/>
					</v-col>
					<v-col cols="12" md="4">
						<v-select
							v-model="sortOrder"
							:items="sortOptions"
							label="Sort by Date"
							variant="outlined"
							density="compact"
							prepend-inner-icon="mdi-sort"
						/>
					</v-col>
					<v-col cols="12" md="4" class="d-flex align-top">
						<v-btn
							variant="outlined"
							color="primary"
							prepend-icon="mdi-refresh"
							@click="resetAll"
						>
							Reset
						</v-btn>
						<v-spacer />
						<div class="text-body-2 text-medium-emphasis align-self-end">
							Showing {{ processedLaunches.length }} of {{ allLaunches.length }} launches
						</div>
					</v-col>
				</v-row>
				<!-- Active Filters Display -->
				<v-row v-if="hasActiveFilters" class="mt-2">
					<v-col cols="12">
						<div class="d-flex align-center flex-wrap ga-2">
							<span class="text-body-2 text-medium-emphasis me-2">Active filters:</span>
							<v-chip
								v-if="selectedYear !== 'all'"
								size="small"
								color="primary"
								closable
								@click:close="selectedYear = 'all'"
							>
								Year: {{ selectedYear }}
							</v-chip>
							<v-chip
								size="small"
								color="secondary"
								:prepend-icon="
									sortOrder === 'desc'
										? 'mdi-sort-calendar-descending'
										: 'mdi-sort-calendar-ascending'
								"
							>
								{{ sortOrder === 'desc' ? 'Newest First' : 'Oldest First' }}
							</v-chip>
						</div>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<p>
			There are {{ processedLaunches?.length || 0 }} launches{{
				selectedYear !== 'all' ? ` in ${selectedYear}` : ''
			}}.
		</p>
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
					<td>{{ launch.rocket?.rocket_name }}</td>
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

		<!-- Empty State -->
		<v-card v-if="processedLaunches.length === 0 && allLaunches.length > 0" class="mt-6 text-center pa-8">
			<v-icon icon="mdi-rocket" size="64" class="text-medium-emphasis mb-4" />
			<h3 class="text-h6 mb-2">No launches found</h3>
			<p class="text-body-2 text-medium-emphasis mb-4">
				No launches found for the selected filters. Try adjusting your criteria.
			</p>
			<v-btn color="primary" variant="outlined" @click="resetAll">Clear Filters</v-btn>
		</v-card>

		<!-- Statistics Summary -->
		<v-card class="mt-6" elevation="1">
			<v-card-title>
				<v-icon icon="mdi-chart-bar" class="me-2" />
				Summary Statistics
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col cols="6" md="3">
						<div class="text-center">
							<div class="text-h4 text-primary font-weight-bold">{{ allLaunches.length }}</div>
							<div class="text-body-2 text-medium-emphasis">Total Launches</div>
						</div>
					</v-col>
					<v-col cols="6" md="3">
						<div class="text-center">
							<div class="text-h4 text-success font-weight-bold">
								{{ processedLaunches.length }}
							</div>
							<div class="text-body-2 text-medium-emphasis">Filtered Results</div>
						</div>
					</v-col>
					<v-col cols="6" md="3">
						<div class="text-center">
							<div class="text-h4 text-info font-weight-bold">{{ availableYears.length }}</div>
							<div class="text-body-2 text-medium-emphasis">Years Available</div>
						</div>
					</v-col>
					<v-col cols="6" md="3">
						<div class="text-center">
							<div class="text-h4 text-warning font-weight-bold">
								{{ sortOrder === 'desc' ? 'DESC' : 'ASC' }}
							</div>
							<div class="text-body-2 text-medium-emphasis">Sort Order</div>
						</div>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script setup lang="ts">
const query = gql`
	query getLaunches {
		launchesPast(limit: 50, sort: "launch_date_local", order: "desc") {
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
const allLaunches = computed(() => data.value?.launchesPast ?? [])

// Use both composables separately
const { selectedYear, filterLaunchesByYear, getAvailableYears, resetFilters } = useLaunchFilter()
const { sortOrder, sortLaunchesByDate, resetSort } = useLaunchSort()

// Process launches by combining filter and sort
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

// Methods
function resetAll() {
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
