<script setup lang="ts">
import moment from "moment";

const props = defineProps({
  userInvestment: {
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
		{{ userInvestment?.property.propertyName }}
	</TableCell>
	<TableCell class="table-content">{{ userInvestment?.property.propertyType }}</TableCell>
	<TableCell class="table-content">{{ userInvestment?.property.interest }} %</TableCell>
	<TableCell
		class="table-content text-[#1B5DB1] font-semibold"
		>{{ auth.formatPrice.format(userInvestment?.amountInvested) }}</TableCell
	>
	<TableCell
		class="table-content text-[#1B5DB1] font-semibold"
		>{{ auth.formatPrice.format(userInvestment?.payoutAmount) }}</TableCell
	>
	<TableCell
		class="table-content"
		>{{ userInvestment?.duration }} Months</TableCell
	>
	<TableCell
		class="table-content"
		>{{ moment(userInvestment?.createdAt).format("LLL") }}</TableCell
	>
	<TableCell
		class="table-content"
		>{{ moment(userInvestment?.payoutDate).format("LLL") }}</TableCell
	>
	<!-- <TableCell class="text-right">
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
				<UserViewuserInvestment :userInvestment="userInvestment" />
				
			</DropdownMenuContent>
		</DropdownMenu>
	</TableCell> -->
</template>

<style scoped>
.table-content {
	width: fit-content !important;
}
</style>
