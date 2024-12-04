<script setup lang="ts">
import moment from "moment";

const auth = useAuthStore();
const config = useRuntimeConfig();
const userInvestments = ref();
const loading = ref(false);

const props = defineProps({
	userId: {
		type: String,
	},
});

try {
	const { data, error } = await useFetch<any>(
		`${config.public.backendUrl}/investments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				user: `${props.userId}`,
				sortBy: "createdAt:desc",
				status: "ACTIVE",
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

	userInvestments.value = data.value;
} catch (error) {
	console.log(error);
}

const loadMore = async () => {
	try {
		loading.value = true;
		const { data, error } = await useFetch<any>(
			`${config.public.backendUrl}/investments`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
				query: {
					user: `${props.userId}`,
					sortBy: "createdAt:desc",
					status: "ACTIVE",
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

		userInvestments.value.page = data.value?.page;
		userInvestments.value.results = [
			...userInvestments.value?.results,
			...data.value?.results,
		];
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
			<span class="font-lg px-2 text-start">View Active Investments</span>
		</AlertDialogTrigger>
		<AlertDialogContent class="py-2 text-xl">
			<AlertDialogCancel class="border-none flex justify-self-end"
				><LucideX color="red"
			/></AlertDialogCancel>
			<AlertDialogHeader>
				<AlertDialogTitle class="text-sm px-2"
					>Active Investment Details</AlertDialogTitle
				>
				<Separator />
				<AlertDialogDescription>
					<div class="overflow-y-auto h-[70vh]">
						<div class="" v-if="userInvestments?.results?.length > 0">
							<div
								class="flex border rounded my-1.5 p-2 justify-between"
								v-for="userInvestment in userInvestments?.results"
								:key="userInvestment.id"
							>
								<div>
									<p>
										Property Name:
										<span class="font-semibold">{{
											userInvestment?.property?.propertyName
										}}</span>
									</p>
									<p>
										Property Type:
										<span class="font-semibold">{{
											userInvestment?.property?.propertyType
										}}</span>
									</p>
									<p>
										Interest:
										<span class="font-semibold"
											>{{ userInvestment?.property?.interest }}%</span
										>
									</p>
									<p>
										Amount Invested:
										<span class="font-semibold text-[#1B5DB1]">{{
											auth.formatPrice.format(userInvestment?.amountInvested)
										}}</span>
									</p>
									<p>
										Expected Return:
										<span class="font-semibold text-[#1B5DB1]">{{
											auth.formatPrice.format(userInvestment?.payoutAmount)
										}}</span>
									</p>
									<p>
										Duration:
										<span class="font-semibold"
											>{{ userInvestment?.duration }} Months</span
										>
									</p>
									<p>
										Payment Status:
										<span
											class="font-semibold"
											:class="{
												'text-[#FF7B7B] capitalize':
													userInvestment.paymentStatus === 'DECLINED',
												'text-green-600 capitalize':
													userInvestment.paymentStatus === 'SUCCESS',
												'text-yellow-600':
													userInvestment.paymentStatus === 'PENDING',
											}"
											>{{ userInvestment?.paymentStatus }}</span
										>
									</p>
									<p>
										Investment Status:
										<span
											class="font-semibold"
											:class="{
												'text-green-500 capitalize':
													userInvestment.status === 'CLAIMED',
												'text-green-600 capitalize':
													userInvestment.status === 'ACTIVE',
												'text-yellow-600': userInvestment.status === 'PENDING',
											}"
											>{{ userInvestment?.status }}</span
										>
									</p>
									<p>
										Date/Time Created:
										<span class="font-semibold">{{
											moment(userInvestment?.createdAt).format("LLL")
										}}</span>
									</p>
								</div>
								<!--Update Investment TO ADD Check Number-->
								<div class="flex flex-col gap-2 px-2">
									<AlertDialog>
										<AlertDialogTrigger class="active:outline-none" as-child>
											<LucideSquarePen color="#1B5DB1" class="cursor-pointer" />
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle class="text-sm"
													>Update Investment</AlertDialogTitle
												>
												<Separator />
												<AlertDialogDescription class="py-2">
													<Label class="py-2 text-black"
														>Enter Check Number :</Label
													>
													<Input type="text" class="my-2" />
												</AlertDialogDescription>
												<AlertDialogFooter>
													<AlertDialogAction class="bg-[#1B5DB1] text-white"
														>Add Check Number</AlertDialogAction
													>
													<AlertDialogCancel class="bg-[#E11F1F] text-white"
														>Cancel</AlertDialogCancel
													>
												</AlertDialogFooter>
											</AlertDialogHeader>
										</AlertDialogContent>
									</AlertDialog>
									<AlertDialog>
										<AlertDialogTrigger class="active:outline-none" as-child>
											<LucideCheckCircle color="green" class="cursor-pointer" />
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle class="text-sm"
													>Update Investment</AlertDialogTitle
												>
												<Separator />
												<AlertDialogDescription class="py-2">
													<form>
														<FormField
															v-slot="{ componentField }"
															name="InvestmentStatus"
														>
															<FormItem>
																<FormLabel class="text-black"
																	>Change Investment Status :</FormLabel
																>

																<Select v-bind="componentField">
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue
																				placeholder="Select Status"
																			/>
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectGroup>
																			<SelectItem
																				value="CLAIMED"
																				class="text-green-600 hover:text-text-green-600"
																			>
																				Claimed
																			</SelectItem>
																		</SelectGroup>
																	</SelectContent>
																</Select>
															</FormItem>
														</FormField>
													</form>
												</AlertDialogDescription>
												<AlertDialogFooter>
													<AlertDialogAction class="bg-[#1B5DB1] text-white"
														>Change Status</AlertDialogAction
													>
													<AlertDialogCancel class="bg-[#E11F1F] text-white"
														>Cancel</AlertDialogCancel
													>
												</AlertDialogFooter>
											</AlertDialogHeader>
										</AlertDialogContent>
									</AlertDialog>
								</div>
							</div>
						</div>
						<div
							class="h-[70vh] w-full flex items-center justify-center"
							v-else
						>
							<p class="text-lg font-semibold">No Active Investments</p>
						</div>
					</div>
					<div class="flex justify-center">
						<Button
							class="bg-[#1B5DB1] font-light w-[40%] mx-auto"
							:disabled="
								userInvestments?.page === userInvestments?.totalPages ||
								userInvestments?.totalPages === 0
							"
							@click="loadMore"
						>
							<span v-show="loading === true" class="w-34 flex">
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
								<span>Loading</span>
							</span>
							<span v-show="loading === false">Load More</span>
						</Button>
					</div>
				</AlertDialogDescription>
			</AlertDialogHeader>
		</AlertDialogContent>
	</AlertDialog>
</template>

<style scoped></style>
