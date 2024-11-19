<script setup lang="ts">
import moment from "moment";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";

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

const formSchema = toTypedSchema(
	z.object({
		filter: z.string(),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const filter = handleSubmit(async (values) => {
	try {
		loading.value = true;
		const { data, error } = await useFetch<any>(
			`${config.public.backendUrl}/payments`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
				query: {
					user: `${props.userId}`,
					status: `${values.filter}`,
				},
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
});
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger
			class="text-start hover:text-[#1B5DB1] focus:bg-[#1B5DB1] focus:text-white"
		>
			<span class="font-lg px-2">View All Transactions</span>
		</AlertDialogTrigger>
		<AlertDialogContent class="py-2 text-xl">
			<AlertDialogHeader>
				<AlertDialogTitle class="text-sm px-2">
					<p class="flex justify-between items-end">
						<span>All Transactions</span>
						<span>
							<form class="w-2/3 flex items-center" @submit.prevent="filter">
								<FormField v-slot="{ componentField }" name="filter">
									<FormItem class="flex items-center me-2 w-full">
										<!-- <FormLabel>Filter</FormLabel> -->

										<Select v-bind="componentField">
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Choose a Filter" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
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

								<Button
									type="submit"
									class="bg-[#1B5DB1] text-white text-sm py-2 px-4"
								>
									<span v-show="loading === true" class="w-34">
										<svg
											class="animate-spin -ml-1 mr-3 h-5 w-5 text-white w-34"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											></circle>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
									</span>
									<span v-show="loading === false">Filter</span>
								</Button>
							</form>
						</span>
					</p>
				</AlertDialogTitle>
				<Separator />
				<AlertDialogDescription>
					<div class="overflow-y-auto h-[70vh]">
						<div
							class="border rounded my-1.5 p-2"
							v-for="transaction in transactions"
							:key="transaction.id"
							v-if="transactions"
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
									moment(transaction.createdAt).format(
										"LLL"
									)
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
			<AlertDialogFooter>
				<AlertDialogCancel class="bg-red-500 text-white"
					>Cancel</AlertDialogCancel
				>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>

<style scoped></style>
