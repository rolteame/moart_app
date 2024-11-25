<script setup lang="ts">
const props = defineProps({
	// users: {
	// 	type: Array as () => any[],
	// },
	tableHeader: {
		type: Array as () => string[],
	},
	transactions: {
		type: Array as () => any[],
	},
	userType: {
		type: String
	}
});
</script>

<template>
	<Table class="border-collapse overflow-x-auto">
		<TableHeader>
			<TableRow class="bg-[#1B5DB1] hover:bg-[#1B5DB1]">
				<TableHead class="text-[#D0F4FF]">No.</TableHead>
				<TableHead
					class="text-[#D0F4FF] header whitespace-nowrap"
					v-for="header in tableHeader"
					:key="header"
				>
					{{ header }}
				</TableHead>
        <TableHead></TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow
				v-for="(transaction, index) in transactions"
				:key="index"
				v-if="transactions"
				v-show="userType ==='superadmin' || userType ==='admin'"
				class="table-content whitespace-nowrap"
			>
				<AdminTransactionsTransactionItem :transaction="transaction" :index="index" v-show="userType ==='superadmin'"/>
			</TableRow>
			<TableRow
				v-for="(transaction, index) in transactions"
				:key="index"
				v-if="transactions"
				v-show="userType ==='user'"
				class="table-content whitespace-nowrap"
			>
				<UserTransactionItem :transaction="transaction" :index="index" v-show="userType ==='user'" />
			</TableRow>
			<TableRow v-else>
				<TableCell colspan="5"  class="text-center py-10"
					>No Data</TableCell
				>
			</TableRow>
		</TableBody>
	</Table>
</template>

<style scoped>
.header:last-child {
	text-align: right;
}

.table-content:nth-child(odd) {
	background-color: #1b5db11a;
}
</style>
