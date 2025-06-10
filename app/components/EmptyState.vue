<template>
	<v-card class="mt-6 text-center pa-8" :elevation="elevation">
		<v-icon :icon="icon" :size="iconSize" :color="iconColor" class="mb-4" />
		<h3 class="text-h6 mb-2">{{ title }}</h3>
		<p class="text-body-2 text-medium-emphasis mb-4">{{ description }}</p>
		<v-btn v-if="actionText" :color="actionColor" :variant="actionVariant" @click="$emit('action')">
			{{ actionText }}
		</v-btn>
	</v-card>
</template>

<script setup lang="ts">
interface Props {
	icon: string
	iconSize?: string | number
	iconColor?: string
	title: string
	description: string
	actionText?: string
	actionColor?: string
	actionVariant?: string
	elevation?: number
}

withDefaults(defineProps<Props>(), {
	iconSize: 64,
	iconColor: 'text-medium-emphasis',
	actionColor: 'primary',
	actionVariant: 'outlined',
	elevation: 2,
})

defineEmits<{
	action: []
}>()
</script>
