<script setup lang="ts">
  type Data = {
    name: string;
    "Total Invested": number;
    "Total Claimed": number;
  };
const props = defineProps({
	metrics: Object,
});

const auth = useAuthStore();

</script>

<template>
	<div class="py-3 mx-3">
		<BarChart
    :data="metrics?.monthlydata as Data[]"
    index="name"
    :rounded-corners=4
    :categories="['Total Invested', 'Total Claimed']"
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
