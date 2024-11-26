<script lang="ts" setup>
useHead({
	title: "Dashboard | Moart",
});

const auth = useAuthStore();
const config = useRuntimeConfig();

const {
	data: investmentsInfo,
	error,
	refresh,
} = await useAsyncData<any>("investmentsInfo", async () => {
	const [activeInvestments, claimedInvestments] = await Promise.all([
		$fetch(`${config.public.backendUrl}/investments`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				user: `${auth.user.id}`,
				sortBy: "createdAt:desc",
				status: "ACTIVE",
				limit: 2,
			},
		}),
		$fetch(`${config.public.backendUrl}/investments`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				user: `${auth.user.id}`,
				sortBy: "createdAt:desc",
				status: "CLAIMED",
				limit: 3,
			},
		}),
	]);
	return {
		activeInvestments,
		claimedInvestments,
	};
});

if (error.value?.statusCode === 401) {
	useNuxtApp().$toast.error(error.value?.message);
	await auth.resetToken();
	refresh();
	location.reload();
}

if (error.value?.statusCode === 400) {
	useNuxtApp().$toast.error(error.value?.message);
}

</script>

<template>
	<div>
		<div
			class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
		>
			<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
				Dashboard
			</p>
			<UserDetails />
		</div>
		<div
			class="bg-white rounded-xl shadow-md py-3 px-4 mt-3 content-center text-[#414141A8] w-full"
		>
			<UserDashboardShowUserInvestments
				:investments="investmentsInfo?.activeInvestments.results"
				header="Active Investments"
				:total-results="investmentsInfo?.activeInvestments.totalResults"
			/>
		</div>
		<div
			class="bg-white rounded-xl shadow-md py-3 px-4 mt-3 text-[#414141A8] w-full h-max"
		>
			<UserDashboardShowUserInvestments
				:investments="investmentsInfo?.claimedInvestments.results"
				header="Claimed Investments"
				:total-results="investmentsInfo?.claimedInvestments.totalResults"
			/>
		</div>
	</div>
</template>
