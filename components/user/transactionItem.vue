<script setup lang="ts">
const props = defineProps({
  transaction: {
    type: Object,
   
  },
  index: {
    type: Number,
    default: 0
  }
})

const auth = useAuthStore();
</script>

<template>
	<TableCell class="table-content">{{  index + 1 }}</TableCell>
	<TableCell class="table-content">
		{{ transaction?.id }}
	</TableCell>
	<TableCell class="table-content">{{ transaction?.transactionId }}</TableCell>
	<TableCell
		class="table-content text-[#1B5DB1] font-semibold"
		>{{ auth.formatPrice.format(transaction?.amount) }}</TableCell
	>
	<TableCell :class="{
			'text-[#FF7B7B] capitalize': transaction?.status === 'DECLINED',
			'text-green-600 capitalize': transaction?.status === 'SUCCESS',
			'text-yellow-600': transaction?.status === 'PENDING',
		}"
		class="table-content"
		>{{ transaction?.status }}</TableCell
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
				<UserViewTransaction :transaction="transaction" />
				
			</DropdownMenuContent>
		</DropdownMenu>
	</TableCell>
</template>

<style scoped>
.table-content {
	width: fit-content !important;
}
</style>
