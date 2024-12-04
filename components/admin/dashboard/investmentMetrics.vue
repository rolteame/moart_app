<script setup lang="ts">
defineProps({
	metrics: Object,
});

const auth = useAuthStore();
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mx-3">
		<p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
			<span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Total Active Investments</span>
			<span class="font-semibold text-2xl md:text-3l px-2 text-[#1B5DB1]">{{ metrics?.activeInvestments?.count }}</span>
		</p>
    <p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
      <span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Total Matured Investments</span>
      <span class="font-semibold text-2xl md:text-3l px-2 text-yellow-600">20</span>
    </p>
		<p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
			<span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Total Claimed Investments</span>
			<span class="font-semibold text-2xl md:text-3l px-2 text-green-600">{{ metrics?.claimedInvestments?.count }}</span>
		</p>
		<p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
			<span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Total Active Investments Revenue</span>
			<span class="font-semibold text-2xl md:text-3l text-[#1B5DB1]">{{ auth.formatPrice.format(metrics?.activeInvestments?.amount) }}</span>
		</p>
    <p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
      <span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Total Unclaimed Amount</span>
      <span class="font-semibold text-2xl md:text-3l text-yellow-600">{{ auth.formatPrice.format(20000000) }}</span>
    </p>
		<p class="flex flex-col justify-between border rounded-md my-3 px-3 py-4 items-center">
			<span class="text-[#4F4F4F] text-lg font-semibold text-center lg:text-left">Total Payouts</span>
			<span class="font-semibold text-2xl md:text-3l text-green-600">{{ auth.formatPrice.format(metrics?.claimedInvestments?.payout) }}</span>
		</p>
	</div>
</template>

<style scoped></style>
