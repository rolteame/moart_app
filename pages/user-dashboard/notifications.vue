<script lang="ts" setup>

useHead({
	title: "Notifications - Dashboard | Moart",
});

const auth = useAuthStore();
</script>

<template>
  <div>
    <div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">Notifications</p>
		<div class="flex items-center">
			<div class="flex flex-col pe-2 text-right">
				<p class="font-bold text-sm lg:text-lg">{{ auth.user.fullName }}</p>
				<p class="text-xs lg:text-sm">{{ auth.user.email }}</p>
			</div>
			<img src="" alt="" class="w-10 h-10 rounded-full">
		</div>
	</div>
  </div>
</template>