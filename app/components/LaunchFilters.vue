<template>
	<v-card class="mb-6" elevation="2">
		<v-card-title>
			<v-icon icon="mdi-filter-variant" class="me-2" />
			Filter & Sort Options
		</v-card-title>
		<v-card-text>
			<v-row>
				<v-col cols="12" md="4">
					<v-select
						:model-value="selectedYear"
						:items="yearFilterOptions"
						label="Filter by Year"
						variant="outlined"
						density="compact"
						prepend-inner-icon="mdi-calendar"
						@update:model-value="$emit('update:selectedYear', $event)"
					/>
				</v-col>
				<v-col cols="12" md="4">
					<v-text-field
						:model-value="limit"
						label="Number of launches"
						type="number"
						min="1"
						max="100"
						variant="outlined"
						density="compact"
						prepend-inner-icon="mdi-format-list-numbered"
						@update:model-value="$emit('update:limit', $event)"
					/>
				</v-col>
				<v-col cols="12" md="4">
					<v-select
						:model-value="sortOrder"
						:items="sortOptions"
						label="Sort by Date"
						variant="outlined"
						density="compact"
						prepend-inner-icon="mdi-sort"
						@update:model-value="$emit('update:sortOrder', $event)"
					/>
				</v-col>
				<v-col cols="12" md="4" class="d-flex align-center">
					<v-btn
						variant="outlined"
						color="primary"
						prepend-icon="mdi-refresh"
						@click="$emit('reset')"
					>
						Reset
					</v-btn>
					<v-spacer />
					<div class="text-body-2 text-medium-emphasis">
						Showing {{ filteredCount }} of {{ totalCount }} launches
					</div>
				</v-col>
			</v-row>
			<!-- Active filters chips section -->
			<v-row v-if="hasActiveFilters" class="mt-2">
				<v-col cols="12">
					<div class="d-flex align-center flex-wrap ga-2">
						<span class="text-body-2 text-medium-emphasis me-2">Active filters:</span>
						<v-chip
							v-if="selectedYear !== 'all'"
							size="small"
							color="primary"
							closable
							@click:close="$emit('update:selectedYear', 'all')"
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
</template>

<script setup lang="ts">
interface Props {
	selectedYear: string
	limit: number
	sortOrder: string
	yearFilterOptions: Array<{ title: string; value: string }>
	sortOptions: Array<{ title: string; value: string }>
	filteredCount: number
	totalCount: number
	hasActiveFilters: boolean
}

defineProps<Props>()

defineEmits<{
	'update:selectedYear': [value: string]
	'update:limit': [value: number]
	'update:sortOrder': [value: string]
	reset: []
}>()
</script>
