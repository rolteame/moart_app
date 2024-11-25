<script setup lang="ts">
import moment from "moment";

defineProps({
	transaction: {
		type: Object,
	},
});
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger
			><span class="px-2 text-sm"
				>View Transaction Details</span
			></AlertDialogTrigger
		>
		<AlertDialogContent class="py-2 text-xl">
			<AlertDialogCancel class="border-none flex justify-self-end"><LucideX color="red" /></AlertDialogCancel>
			<AlertDialogHeader>
				<AlertDialogTitle>Transaction Details</AlertDialogTitle>
				<Separator />
				<AlertDialogDescription class="text-lg">
					<p>Transaction ID: {{ transaction?.id }}</p>
					<p>Refrence ID: {{ transaction?.transactionId }}</p>
					<p>User: {{ transaction?.user.fullName }}</p>
					<p>User Email: {{ transaction?.user.email }}</p>
					<p>
						Amount:
						<span class="font-semibold text-[#1B5DB1]">{{
							transaction?.amount
						}}</span>
					</p>
					<p>
						Transaction Status:
						<span
							:class="{
								'text-[#FF7B7B] capitalize': transaction?.status === 'DECLINED',
								'text-green-600 capitalize': transaction?.status === 'SUCCESS',
								'text-yellow-600': transaction?.status === 'PENDING',
							}"
						>
							{{ transaction?.status }}</span
						>
					</p>
					<p>
						Date/Time:
						<span class="font-semibold text-[#1B5DB1]">{{
							moment(transaction?.createdAt).format("DD/MM/YYYY - hh:mm:ss A")
						}}</span>
					</p>
				</AlertDialogDescription>
			</AlertDialogHeader>
		</AlertDialogContent>
	</AlertDialog>
</template>

<style scoped></style>
