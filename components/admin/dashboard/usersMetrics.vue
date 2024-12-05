<script setup lang="ts">
defineProps({
	metrics: Object,
});

</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mx-3">
		<p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
			<span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Total Users</span>
			<span class="font-semibold text-2xl md:text-3l px-2">{{ metrics?.userMetrics?.userCount }}</span>
		</p>
    <p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
      <span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Users with Active Investments</span>
      <span class="font-semibold text-2xl md:text-3l px-2 text-[#1B5DB1]">{{ metrics?.userMetrics?.userWithActiveInvestments }}</span>
    </p>
		<p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
			<span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Users with Claimed Investments</span>
			<span class="font-semibold text-2xl md:text-3l px-2 text-green-600">{{ metrics?.userMetrics?.userWithClaimedInvestments  }}</span>
		</p>
	</div>
</template>

<style scoped></style>
