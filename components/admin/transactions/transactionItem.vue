<script setup lang="ts">
import moment from "moment";

const props = defineProps({
	transaction: {
		type: Object,
	},
	index: {
		type: Number,
		default: 0,
	},
});

const auth = useAuthStore();
</script>

<template>
	<TableCell>{{ index + 1 }}</TableCell>
	<TableCell class="">
		{{ transaction?.id }}
	</TableCell>
	<TableCell>{{ transaction?.transactionId }}</TableCell>
	<TableCell>{{ transaction?.user.fullName }}</TableCell>
	<TableCell>{{ transaction?.user.email }}</TableCell>
	<TableCell class="text-[#1B5DB1] font-semibold">{{
		auth.formatPrice.format(transaction?.amount)
	}}</TableCell>
	<TableCell
		:class="{
			'text-[#FF7B7B] capitalize': transaction?.status === 'DECLINED',
			'text-green-600 capitalize': transaction?.status === 'SUCCESS',
			'text-yellow-600': transaction?.status === 'PENDING',
		}"
		>{{ transaction?.status }}</TableCell
	>
	<TableCell
		><span class="font-semibold text-[#1B5DB1]">{{
			moment(transaction?.createdAt).format("LLL")
		}}</span></TableCell
	>
	<TableCell class="text-right">
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<LucideEllipsisVertical
					color="#1B5DB1"
					stroke-width="2"
					class="ml-auto"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<AdminTransactionsViewTransaction :transaction="transaction" />
			</DropdownMenuContent>
		</DropdownMenu>
	</TableCell>
</template>

<style scoped></style>
