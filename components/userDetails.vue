<template>
	<div class="flex items-center">
		<div class="flex flex-col pe-2 text-right">
			<p class="font-bold text-sm lg:text-lg">{{ auth.user.fullName }}</p>
			<p class="text-xs lg:text-sm">{{ auth.user.email }}</p>
		</div>
		<img :src="auth.user.image" alt="" class="w-10 h-10 rounded-full" />
	</div>
</template>

<script setup lang="ts">
const auth = useAuthStore();
</script>

<style scoped></style>
