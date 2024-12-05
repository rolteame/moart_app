<script setup lang="ts">
defineProps({
	metrics: Object,
});

const auth = useAuthStore();
</script>

<template>
	<div class="py-3 mx-3">
		<BarChart
    :data="metrics?.monthlydata"
    index="name"
    :rounded-corners=4
    :categories="['totalInvested', 'totalMatured']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'NGN',
          trailingZeroDisplay: 'stripIfInteger',
        }).format(tick).toString()}`
        : ''
    }"
  />
	</div>
</template>

<style scoped></style>
