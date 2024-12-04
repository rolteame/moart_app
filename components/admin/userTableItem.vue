<script setup lang="ts">
const { user, index } = defineProps({
	user: { type: Object, required: true },
	index: { type: Number, required: true },
});

</script>
<template>
	<TableCell>{{ index + 1 }}</TableCell>
	<TableCell class="font-medium">
		{{ user.fullName }}
	</TableCell>
	<TableCell>{{ user.email }}</TableCell>
	<TableCell
		:class="{
			'text-[#FF7B7B] capitalize': user.status === 'Inactive',
			'text-green-600 capitalize': user.status === 'ACTIVE' || user.status === 'Active',
			'text-red-600': user.status === 'DELETED',
		}"
		class="capitalize"
		>{{ user.status }}</TableCell
	>
	<TableCell class="text-right">
		<DropdownMenu>
			<DropdownMenuTrigger class="">
				<LucideEllipsisVertical
					color="#1B5DB1"
					stroke-width="2"
					class="ml-auto focus:border"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="flex flex-col test-sm space-y-1">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<AdminViewActiveInvestments :userId="user.id" />
				<AdminViewClaimedInvestment :userId="user.id" />
				<AdminViewPendingInvestments :user-id="user.id"/>
				<AdminViewAllTransactions :userId="user.id" />
				<span class="font-xs px-2 cursor-pointer text-start text-red-400 hover:text-red-600 focus:bg-red-400 focus:text-white">Suspend User</span>
				<span class="font-xs px-2 cursor-pointer text-start text-red-600 hover:text-red-800 focus:bg-red-600 focus:text-white">Delete User</span>
			</DropdownMenuContent>
		</DropdownMenu>
	</TableCell>
</template>

<style scoped></style>
