<script lang="ts" setup>
useHead({
	title: "Dashboard - Admin | Moart",
});

const auth = useAuthStore();
const config = useRuntimeConfig();

const year: number = new Date().getFullYear();
const metrics: Ref<Object> = ref({});

try {
	const { data, error } = await useFetch<any>(
	`${config.public.backendUrl}/investments/metrics`,
	{
		method: "GET",
		headers: {
			Authorization: `Bearer ${auth.token}`,
		},
		query: {
			year: year,
		},
	}
);

if (error.value?.data.code === 401) {
	useNuxtApp().$toast.error(error.value?.data.message);
	await auth.resetToken();
	location.reload();
}

if (error.value?.data.code === 400) {
	useNuxtApp().$toast.error(error.value?.data.message);
}

metrics.value = data.value;
} catch (error) {
	console.log(error);
}
</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">Dashboard</p>
	</div>
	<div
		class="bg-white rounded-xl shadow-md p-3 mt-3 content-center text-[#414141A8]"
	>
		<p class="font-semibold text-xl mx-3">Investment Metrics</p>
		<AdminDashboardInvestmentMetrics :metrics="metrics" />
	</div>
	<div
		class="bg-white rounded-xl shadow-md p-3 mt-3 content-center text-[#414141A8]"
	>
		<p class="font-semibold text-xl mx-3">Users Metrics</p>
		<AdminDashboardUsersMetrics :metrics="metrics" />
	</div>
	<div
		class="bg-white rounded-xl shadow-md p-3 mt-3 content-center text-[#414141A8]"
	>
		<p class="font-semibold text-xl mx-3">Monthly Revenue</p>
		<AdminDashboardRevenueChart :metrics="metrics" />
	</div>
</template>
