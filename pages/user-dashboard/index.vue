<script lang="ts" setup>
useHead({
	title: "Dashboard | Moart",
});

const auth = useAuthStore();
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
		<div class="bg-white rounded-xl shadow-md py-3 px-4 mt-3 content-center text-[#414141A8] w-full">
			<UserDashboardActiveInvestments />
		</div>
		<div class="bg-white rounded-xl shadow-md py-3 px-4 mt-3 text-[#414141A8] w-full h-max">
			<UserDashboardActiveInvestments />
		</div>
	</div>
</template>
