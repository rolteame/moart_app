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
	<Table class="border-collapse overflow-x-auto">
		<TableHeader>
			<TableRow class="bg-[#1B5DB1] hover:bg-[#1B5DB1]">
				<TableHead class="text-[#D0F4FF]">No.</TableHead>
				<TableHead
					class="text-[#D0F4FF] header w-[500px]"
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
				<TableCell>{{ index + 1 }}</TableCell>
				<TableCell class="font-medium">
					{{ user.name }}
				</TableCell>
				<TableCell>{{ user.email }}</TableCell>
				<TableCell
					:class="{
						'text-[#FF7B7B] capitalize': user.status === 'failed',
						'text-green-600 capitalize': user.status === 'success',
						'text-yellow-600': user.status === 'pending',
					}"
					>{{ user.status }}</TableCell
				>
				<TableCell class="text-right">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<LucideEllipsisVertical
								color="#1B5DB1"
								stroke-width="2"
								class="ml-auto"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Billing</DropdownMenuItem>
							<DropdownMenuItem>Team</DropdownMenuItem>
							<DropdownMenuItem>Subscription</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
			</TableRow>
			<TableRow v-else>
				<TableCell :colspan="tableHeader?.length + 1" class="text-center py-10"
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
