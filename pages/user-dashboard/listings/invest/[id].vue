<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

useHead({
	title: "Invest - Dashboard | Moart",
});

const loading: Ref<boolean> = ref(false);

const config = useRuntimeConfig();
const auth = useAuthStore();
const propertyId = useRoute().params.id;
const property: Ref<any> = ref();
const roi: Ref<number> = ref(0);

try {
	const { data, error } = await useFetch<any>(
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

	property.value = data.value;
} catch (error) {
	console.log(error);
}

const formSchema = toTypedSchema(
	z.object({
		slotAmount: z.number(),
		duration: z.string().transform((value) => Number(value)),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const calculateReturn = handleSubmit((values) => {
	const principal = ref(property.value?.buyInPrice * values.slotAmount);

	roi.value =
		(principal.value * values.duration * property.value?.interest) /
			(12 * 100) +
		principal.value;
});

const proceedToPayment = handleSubmit(async (values) => {
	if(auth.user.status === "SUSPENDED") {
		useNuxtApp().$toast.error("Your account has been suspended, contact support");
		return;
	}

	loading.value = true;

	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/investments`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			body: {
				property: property.value?.id,
				units: values.slotAmount,
				duration: values.duration,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		useNuxtApp().$toast.error("Token expired, refreshing token");
		await auth.resetToken();
		refresh();
		// location.reload();
	}

	if (error.value?.statusCode === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		
	}

	if (error.value?.statusCode === 404) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;

	}

	if (error.value?.statusCode === 500) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
	}

	loading.value = false;
	navigateTo(`${data.value?.data?.authorization_url}`, {
		external: true,
	});
});
</script>

<template>
	<div class="">
		<div
			class="lg:h-[400px] h-[200px] rounded-2xl bg-no-repeat bg-cover bg-center"
			:style="{ backgroundImage: `url(${property?.image})` }"
		>
			<div
				class="relative w-full h-full rounded-2xl p-4 flex justify-between items-end text-white bg-gradient-to-br from-[#064274CC]/30 from-20% to-[#DD9933CC]/30"
			>
				<p class="2xl:text-5xl lg:text-3xl text-2xl font-semibold w-[50%]">
					{{ property?.propertyName }}
				</p>
				<p class="w-[50%] text-end flex flex-col lg:text-lg 2xl:text-2xl">
					<span>Slot Price</span
					><span class="text-xl lg:text-3xl font-semibold 2xl:text-4xl">{{
						auth.formatPrice.format(property?.buyInPrice)
					}}</span>
				</p>
			</div>
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
						<!-- <p>
							<span class="font-semibold">Property Name</span>:
							{{ property?.propertyName }}
						</p> -->
						<p>
							<span class="font-semibold">Property Type</span>:
							{{ property?.propertyType }}
						</p>
						<p>
							<span class="font-semibold">Description</span>: <br />
							{{ property?.propertyDescription }}
						</p>
						<p>
							<span class="font-semibold">Interest</span>:
							{{ property?.interest }}%
						</p>
						<p class="flex">
							<span class="font-semibold">Total Investment Slots</span>:
							<span class="flex justify-center items-center">{{
								property?.slots
							}}</span>
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
						<!--Amount of slots to invest-->
						<FormField v-slot="{ componentField }" name="slotAmount">
							<FormItem class="mb-4">
								<Select v-bind="componentField">
									<FormControl>
										<SelectTrigger>
											<SelectValue
												placeholder="How many slots do you want to invest"
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup
											v-for="slot in property?.slots"
											:key="slot"
											@change="calculateReturn"
										>
											<SelectItem :value="slot"> {{ slot }} </SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						</FormField>
						<!--Investment Duration-->
						<FormField v-slot="{ componentField }" name="duration">
							<FormItem class="">
								<Select v-bind="componentField">
									<FormControl>
										<SelectTrigger>
											<SelectValue
												placeholder="How long do would your investment last"
											/>
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
							<span class="font-semibold">Estimated ROI:</span>
							<span class="text-[#1B5DB1] font-bold text-xl">{{
								auth.formatPrice.format(roi)
							}}</span>
						</div>

						<div class="flex flex-col lg:flex-row lg:justify-between gap-4">
							<Button
								class="w-full lg:w-[40%]"
								type="button"
								@click="calculateReturn"
								>Calculate ROI</Button
							>
							<Button
								type="submit"
								class="bg-[#1B5DB1] w-full lg:w-[40%]"
								@click="proceedToPayment"
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
								<span v-show="loading === false">Proceed to Payment</span>
							</Button>
							
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
