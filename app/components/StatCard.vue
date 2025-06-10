<template>
	<v-card elevation="1" class="text-center pa-4">
		<v-icon :icon="icon" :color="color" size="large" class="mb-2" />
		<div class="text-h6">{{ value }}</div>
		<div class="text-caption text-medium-emphasis">{{ label }}</div>
	</v-card>
</template>

<script setup lang="ts">
interface Props {
	icon: string
	color?: string
	value: string | number
	label: string
}

withDefaults(defineProps<Props>(), {
	color: 'primary',
})
</script>
