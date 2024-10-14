<script setup lang="ts">
defineProps({
	users: {
		type: Array as () => any[],
	},
	tableHeader: {
		type: Array as () => string[],
	},
});
</script>

<template>
	<Table class="border-collapse">
		<TableHeader>
			<TableRow class="bg-[#1B5DB1] hover:bg-[#1B5DB1]">
				<TableHead class="text-[#D0F4FF]">No.</TableHead>
				<TableHead
					class="text-[#D0F4FF] header"
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
				v-for="(user, index) in users"
				:key="user.id"
				v-if="users"
				class="table-content"
			>
				<AdminUserTableItem :user="user" :index="index" />
			</TableRow>
			<TableRow v-else>
				<TableCell :colspan="tableHeader?.length" class="text-center py-10"
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
