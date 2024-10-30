<script lang="ts" setup>
useHead({
	title: "Transactions - Dashboard | Moart",
});

const auth = useAuthStore();

const tableHeader = ["Refrence ID", "Transaction ID", "Amount", "Status"];
</script>

<template>
	<div>
		<div
			class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
		>
			<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
				Transactions
			</p>
			<UserDetails />
		</div>
		<div
			class="bg-white rounded-xl shadow-md py-3 mt-3 content-center text-[#414141A8]"
		>
			<div class="container py-4 overflow-auto">
				<AdminTransactionsTransactionTable :tableHeader="tableHeader" />
			</div>
		</div>
	</div>
</template>
