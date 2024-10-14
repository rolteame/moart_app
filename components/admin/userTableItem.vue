<script setup lang="ts">
const { user, index } = defineProps({
  user: { type: Object, required: true },
  index: { type: Number, required: true },
})

</script>
<template>
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
				<DropdownMenuItem>View User Profile</DropdownMenuItem>
				<DropdownMenuItem>View Active Investments</DropdownMenuItem>
        <DropdownMenuItem class="text-red-600">Suspend User</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</TableCell>
</template>

<style scoped></style>
