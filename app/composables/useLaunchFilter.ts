export const useLaunchFilter = () => {
	const selectedYear = ref<string>('all')

	const filterLaunchesByYear = (launches: any[]) => {
		if (selectedYear.value === 'all') return launches

		return launches.filter((launch) => {
			if (!launch.launch_date_local) return false
			const launchYear = new Date(launch.launch_date_local).getFullYear().toString()
			return launchYear === selectedYear.value
		})
	}

	const getAvailableYears = (launches: any[]) => {
		const years = launches
			.filter((launch) => launch.launch_date_local)
			.map((launch) => new Date(launch.launch_date_local).getFullYear())
			.filter((year, index, arr) => arr.indexOf(year) === index)
			.sort((a, b) => b - a)

		return years
	}

	const resetFilters = () => {
		selectedYear.value = 'all'
	}

	return {
		selectedYear,
		filterLaunchesByYear,
		getAvailableYears,
		resetFilters,
	}
}
