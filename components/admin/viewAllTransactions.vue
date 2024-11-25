<script setup lang="ts">
import moment from "moment";

const auth = useAuthStore();
const config = useRuntimeConfig();
const loading = ref(false);
const transactions = ref();

const props = defineProps({
	userId: {
		type: String,
	},
});

try {
	const { data, error } = await useFetch<any>(
		`${config.public.backendUrl}/payments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				user: `${props.userId}`,
				sortBy: "createdAt:desc",
			},
		}
	);

	if (error.value?.data.code === 401) {
		useNuxtApp().$toast.error(error.value?.data.message);
		await auth.resetToken();
		location.reload();
	}

	if (error.value?.data.code === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
	}

	transactions.value = data.value?.results;
} catch (error) {
	console.log(error);
}

const filter = async (value: string) => {
	const queryParams: any = {
		user: `${props.userId}`,
		sortBy: "createdAt:desc"
	}

	if (value !== "ALL") queryParams.status = value
	try {
		loading.value = true;
		const { data, error } = await useFetch<any>(
			`${config.public.backendUrl}/payments`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
				query: queryParams,
			}
		);

		if (error.value?.data.code === 401) {
			useNuxtApp().$toast.error(error.value?.data.message);
			await auth.resetToken();
			loading.value = false;
			location.reload();
		}

		if (error.value?.data.code === 400) {
			useNuxtApp().$toast.error(error.value?.data.message);
			loading.value = false;
		}

		transactions.value = data.value?.results;
		loading.value = false;
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger
			class="text-start hover:text-[#1B5DB1] focus:bg-[#1B5DB1] focus:text-white"
		>
			<span class="font-lg px-2">View All Transactions</span>
		</AlertDialogTrigger>
		<AlertDialogContent class="py-1 text-xl">
			<AlertDialogCancel class="border-none flex justify-self-end"
				><LucideX color="red"
			/></AlertDialogCancel>
			<AlertDialogHeader>
				<AlertDialogTitle class="text-sm px-1">
					<p class="flex justify-between items-end">
						<span>All Transactions</span>
						<span>
							<form class="flex items-center">
								<FormField name="filter">
									<FormItem class="flex items-center me-1">
										<!-- <FormLabel>Filter</FormLabel> -->

										<Select @update:model-value="filter">
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Choose a Filter" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="ALL" class=""> ALL </SelectItem>
													<SelectItem value="SUCCESS" class="text-green-600">
														Success
													</SelectItem>
													<SelectItem value="PENDING" class="text-yellow-600">
														Pending
													</SelectItem>
													<SelectItem value="DECLINED" class="text-red-600">
														Declined
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormItem>
								</FormField>
							</form>
						</span>
					</p>
				</AlertDialogTitle>
				<Separator />
				<AlertDialogDescription>
					<div v-show="loading === true" class="text-center h-[70vh] flex items-center"><span>Loading</span></div>
					<div class="overflow-y-auto h-[70vh]" v-show="loading === false">
						<div
							class="border rounded my-1.5 p-2"
							v-for="transaction in transactions"
							:key="transaction.id"
							v-if="transactions?.length > 0"
						>
							<p>
								Reference ID:
								<span class="font-semibold">{{ transaction?.id }}</span>
							</p>
							<p>
								Transaction ID:
								<span class="font-semibold">{{
									transaction?.transactionId
								}}</span>
							</p>
							<p>
								Amount:
								<span class="font-semibold text-[#1B5DB1]">{{
									auth.formatPrice.format(transaction?.amount)
								}}</span>
							</p>
							<p>
								Property:
								<span class="font-semibold">{{ transaction.property }}</span>
							</p>
							<p>
								Payment Status:
								<span
									class="font-semibold"
									:class="{
										'text-[#FF7B7B] capitalize':
											transaction?.status === 'DECLINED',
										'text-green-600 capitalize':
											transaction?.status === 'SUCCESS',
										'text-yellow-600': transaction?.status === 'PENDING',
									}"
									>{{ transaction?.status }}</span
								>
							</p>
							<p>
								Date:
								<span class="font-semibold text-[#1B5DB1]">{{
									moment(transaction.createdAt).format("LLL")
								}}</span>
							</p>
						</div>
						<div
							class="h-[70vh] w-full flex items-center justify-center"
							v-else
						>
							<p class="text-lg font-semibold">No Transactions to Show</p>
						</div>
					</div>
				</AlertDialogDescription>
			</AlertDialogHeader>
		</AlertDialogContent>
	</AlertDialog>
</template>


