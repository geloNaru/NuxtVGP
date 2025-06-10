export const useLaunchSort = () => {
	const sortOrder = ref<'asc' | 'desc'>('desc')

	const sortLaunchesByDate = (launches: any[]) => {
		return [...launches].sort((a, b) => {
			const dateA = new Date(a.launch_date_local).getTime()
			const dateB = new Date(b.launch_date_local).getTime()

			return sortOrder.value === 'desc' ? dateB - dateA : dateA - dateB
		})
	}

	const resetSort = () => {
		sortOrder.value = 'desc'
	}

	return {
		sortOrder,
		sortLaunchesByDate,
		resetSort,
	}
}
