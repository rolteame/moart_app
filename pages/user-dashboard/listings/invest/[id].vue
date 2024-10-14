<script setup lang="ts">
useHead({
	title: "Invest - Dashboard | Moart",
});

const config = useRuntimeConfig();
const auth = useAuthStore();
const propertyId = useRoute().params.id;

const { data: property, error } = await useFetch<any>(
	`${config.public.backendUrl}/properties/${propertyId}`,
	{
		method: "GET",
		headers: {
			Authorization: `Bearer ${auth.token}`,
		},
	}
);

if (error.value?.statusCode === 401) {
	useNuxtApp().$toast.error("Token expired, refreshing token");
	await auth.resetToken();
	location.reload();
}

if (error.value?.statusCode === 404) {
	useNuxtApp().$toast.error(error.value?.data.message);
}
</script>

<template>
	<div class="">
		<div class="">
			<img
				:src="property?.image"
				alt="Property Image"
				class="h-[200px] md:h-[400px] w-full rounded-2xl shadow-xl my-2 object-cover"
			/>
		</div>
		<div class="bg-white rounded-xl shadow-md py-3 mt-3 content-center">
			<p
				class="text-[#1B5DB1] lg:text-xl md:text-lg text-lg my-4 font-bold mx-4 space-y-2"
			>
				Property Details
			</p>
			<div class="lg:flex mx-4">
				<div class="lg:w-[50%] my-4 mr-3">
					<div class="capitalize space-y-1">
						<p>
							<span class="font-semibold">Property Name</span>:
							{{ property?.propertyName }}
						</p>
						<p>
							<span class="font-semibold">Property Type</span>:
							{{ property?.propertyType }}
						</p>
						<p>
							<span class="font-semibold">Description</span>:
							{{ property?.propertyDescription }}
						</p>
						<p class="flex">
							<span class="font-semibold">Minimum Buyin Price</span>:
							<span class="flex justify-center items-center"
								><img
									class="w-4 h-4"
									src="https://img.icons8.com/material-outlined/24/naira.png"
									alt="naira"
								/>{{ property?.buyInPrice }}</span
							>
						</p>
						<p>
							<span class="font-semibold">Interest</span>:
							{{ property?.interest }}%
						</p>
						<p>
							<span class="font-semibold">Available Investment Slots</span>:
							{{ property?.availableSlot }}
						</p>
					</div>
				</div>
				<Separator class="lg:hidden" />
				<div class="lg:w-[50%] lg:-mt-9 lg:mx-3 mt-4">
					<p class="font-semibold">
						Calculate Your ROI and Preceed to incestment here:
					</p>
					<form action="" class="my-3">
						<!--Amount to invest-->
						<FormField v-slot="{ componentField }" name="amount">
							<FormItem class="mb-8">
								<FormControl>
									<div class="relative">
										<Input
											type="currency"
											class="pl-10 border border-black"
											placeholder="Enter amount you want to invest"
											v-bind="componentField"
										/>
										<span
											class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
										>
											<img
												class="w-4 h-4 ml-1"
												src="https://img.icons8.com/material-outlined/24/naira.png"
												alt="naira"
											/>
										</span>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>
						<!--Investment Duration-->
						<FormField v-slot="{ componentField }" name="propertyType">
							<FormItem class="">
								<Select v-bind="componentField">
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="How long do would your investment last" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="6"> 6 Months </SelectItem>
											<SelectItem value="12"> 12 Months </SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						</FormField>
						<!--ROI-->
						<div class="flex justify-between items-center my-4">
							<span class="font-semibold">Return on Investment:</span>
							<span class="text-[#1B5DB1]">300</span>
						</div>

						<Button class="w-full" type="submit">Proceed</Button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
