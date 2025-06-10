<template>
	<div class="d-flex justify-center align-center" :style="{ minHeight: height }">
		<div class="text-center">
			<v-progress-circular :size="size" :width="width" :color="color" indeterminate />
			<p v-if="message" class="mt-4 text-h6">{{ message }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	height?: string
	size?: number
	width?: number
	color?: string
	message?: string
}

withDefaults(defineProps<Props>(), {
	height: '400px',
	size: 70,
	width: 7,
	color: 'primary',
})
</script>
