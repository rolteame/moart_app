<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { AddPropertyInput } from "~/types";

const propertyImage = ref("");
const file: Ref<File | any> = ref();
const uploadLoading = ref(false);
const loading = ref(false);

const config = useRuntimeConfig();
const auth = useAuthStore();

const onFileChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target.files) {
		file.value = target.files[0];
	}
};

const uploadPropertyImage = async () => {
	uploadLoading.value = true;

	if (file.value === undefined) {
		useNuxtApp().$toast.warn("Please select an image");
		uploadLoading.value = false;
		return;
	}

	const propertyImageFormData = new FormData();
	propertyImageFormData.append("image", file.value, file.value.name);

	const { data, error } = await useFetch<any>(
		`${config.public.backendUrl}/properties/upload`,
		{
			method: "POST",
			body: propertyImageFormData,
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		useNuxtApp().$toast.error("Token expired, reftreshing token");
		await auth.resetToken();
		return;
	}

	propertyImage.value = data.value.url;
	useNuxtApp().$toast.success("Image uploaded successfully");
	uploadLoading.value = false;
};

const formSchema = toTypedSchema(
	z.object({
		propertyName: z.string(),
		propertyType: z.string(),
		propertyStatus: z.string(),
		propertyPrice: z.number(),
		buyInPrice: z.number(),
		interest: z.any().transform((value) => value * 100),
		propertyDescription: z.string(),
		address: z.string(),
		slots: z.any(),
	})
);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
	initialValues: {
		interest: 0,
		slots: 0,
	},
});

const addProperty = handleSubmit(async (values) => {
	loading.value = true;
	const { data, error } = await useFetch<any>(
		`${config.public.backendUrl}/properties`,
		{
			method: "POST",
			body: {
				...values,
				image: propertyImage.value,
			} as AddPropertyInput,
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		useNuxtApp().$toast.error("Token expired, reftreshing token");
		loading.value = false;
		await auth.resetToken();
		return;
	}

	if (error.value?.statusCode === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return;
	}

	useNuxtApp().$toast.success("Property added successfully");
	loading.value = false;
	navigateTo("/admin/properties");
});
</script>

<template>
	<!--Upload Media-->
	<div class="flex md:flex-row p-5 items-center gap-4 flex-col">
		<img
			v-show="!propertyImage"
			src="~/assets/img/property_bg.jpg"
			alt="Image of Property"
			class="border h-40 w-[100%] md:w-40 object-cover rounded-lg shadow-lg"
		/>
		<img
			v-show="propertyImage"
			:src="propertyImage"
			alt="Image of Property"
			class="border h-40 w-40 object-cover rounded-lg shadow-lg"
		/>
		<div class="flex flex-col gap-3 justify-items-start">
			<Input type="file" class="w-full" @change="onFileChange" />
			<div class="flex gap-4 items-center">
				<Button
					type="submit"
					class="bg-[#1B5DB1] text-white text-lg py-2 px-4 w-1/2"
					@click="uploadPropertyImage"
					>Upload</Button
				>
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1B5DB1]"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					v-show="uploadLoading === true"
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
			</div>
		</div>
	</div>
	<form class="w-full p-4" @submit.prevent="addProperty">
		<div class="md:flex justify-between py-3">
			<!--Property Name-->
			<FormField v-slot="{ componentField }" name="propertyName">
				<FormItem class="md:w-[30%]">
					<FormLabel>Property Name</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="text" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<!--Property Type-->
			<FormField v-slot="{ componentField }" name="propertyType">
				<FormItem class="md:w-[30%]">
					<FormLabel>Property Type</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select a property type" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="land"> Land </SelectItem>
								<SelectItem value="house"> House </SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>

			<!--Property Status-->
			<FormField v-slot="{ componentField }" name="propertyStatus">
				<FormItem class="md:w-[30%]">
					<FormLabel>Property Status</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="active"> Active </SelectItem>
								<SelectItem value="inactive"> Inactive </SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="md:flex justify-between py-3">
			<!--Property Price-->
			<FormField v-slot="{ componentField }" name="propertyPrice">
				<FormItem class="md:w-[30%]">
					<FormLabel>Property Price</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="number" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<!--Buyin Price-->
			<FormField v-slot="{ componentField }" name="buyInPrice">
				<FormItem class="md:w-[30%]">
					<FormLabel>Buy-in Price</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="number" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<!--Interest-->
			<FormField v-slot="{ componentField }" name="interest">
				<FormItem class="md:w-[30%]">
					<FormLabel for="interest">Interest</FormLabel>
					<NumberField
						id="interest"
						:default-value="0"
						:step="0.01"
						:format-options="{
							style: 'percent',
						}"
						@update:model-value="
							(v: any) => {
								if (v) {
									setFieldValue('interest', v);
								} else {
									setFieldValue('interest', undefined);
								}
							}
						"
					>
						<NumberFieldContent>
							<NumberFieldDecrement />
							<FormControl>
								<NumberFieldInput v-bind="componentField" />
							</FormControl>
							<NumberFieldIncrement />
						</NumberFieldContent>
					</NumberField>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<!--Property Description-->
		<div class="py-3">
			<FormField v-slot="{ componentField }" name="propertyDescription">
				<FormItem>
					<FormLabel>Property Description</FormLabel>
					<FormControl>
						<Textarea
							v-bind="componentField"
							class="resize-none lg:h-32"
						></Textarea>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="md:flex justify-between py-3">
			<!--Address-->
			<FormField v-slot="{ componentField }" name="address">
				<FormItem class="md:w-[45%]">
					<FormLabel>Address</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="text" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<!--Available Slots-->
			<FormField v-slot="{ componentField }" name="availableSlots">
				<FormItem class="md:w-[45%]">
					<FormLabel for="availableSlots">Available Slots</FormLabel>
					<FormControl>
						<NumberField
							id="availableSlots"
							:default-value="0"
							:step="1"
							@update:model-value="
								(v: any) => {
									if (v) {
										setFieldValue('slots', v);
									} else {
										setFieldValue('slots', undefined);
									}
								}
							"
						>
							<NumberFieldContent>
								<NumberFieldDecrement />
								<FormControl>
									<NumberFieldInput v-bind="componentField" />
								</FormControl>
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="space-x-4 flex justify-between md:justify-normal py-3">
			<Button type="submit" class="bg-[#1B5DB1] text-white text-lg py-2 px-4">
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
				<span v-show="loading === false">Add Property</span>
			</Button>
			<NuxtLink to="/admin/properties"
				><Button class="bg-[#FC464626] text-[#E11F1F] border text-lg p-2 w-32"
					>Cancel</Button
				></NuxtLink
			>
		</div>
	</form>
</template>

<style scoped></style>
