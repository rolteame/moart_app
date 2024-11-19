<script lang="ts" setup>
useHead({
	title: "Transactions - Admin | Moart",
});

const tableHeader = ["Refrence ID", "Transaction ID", "Name", "Email", "Amount", "Status", "Date"];

const auth = useAuthStore();
const config = useRuntimeConfig();
const transactions = ref([]);


try {
	const {data, error, refresh} = await useFetch<any>(
	`${config.public.backendUrl}/payments`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${auth.token}`,
		},
		query: {
			sortBy: "createdAt:desc",
		}
	}
)

if (error.value?.statusCode === 401) {
	useNuxtApp().$toast.error(error.value?.data.message);
	await auth.resetToken();
	refresh();
	location.reload()
}

if (error.value?.statusCode === 400) {
	useNuxtApp().$toast.error(error.value?.data.message);
}

transactions.value = data.value.results;
} catch (error) {
	console.log(error)
}

</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
			Transactions
		</p>
	</div>
	<div
		class="bg-white rounded-xl shadow-md py-3 mt-3 content-center text-[#414141A8]"
	>
		<div class="container py-4 overflow-auto">
			<AdminTransactionsTransactionTable :tableHeader="tableHeader" :transactions="transactions" :userType="auth.user.role"/>
		</div>
	</div>
</template>
