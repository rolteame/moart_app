<script setup lang="ts">
const props = defineProps({
	// users: {
	// 	type: Array as () => any[],
	// },
	tableHeader: {
		type: Array as () => string[],
	},
	userInvestments: {
		type: Array as () => any[],
	},
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
        <!-- <TableHead></TableHead> -->
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow
				v-for="(userInvestment, index) in userInvestments"
				:key="index"
				v-if="userInvestments"
				class="table-content whitespace-nowrap text-center"
			>
				<UserInvestmentItem :userInvestment="userInvestment" :index="index"/>
			</TableRow>
			<TableRow v-else>
				<TableCell colspan="5"  class="text-center py-10"
					>No Data</TableCell
				>
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
.table-content:nth-child(odd) {
	background-color: #1b5db11a;
}
</style>
