<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

function checkFileType(file: File) {
	if (file?.name) {
		const fileType = file.name.split(".").pop();
		if (fileType === "jpg" || fileType === "jpeg" || fileType === "png")
			return true;
	}
	return false;
}

const formSchema = toTypedSchema(
	z.object({
		propertyName: z.string(),
		propertyType: z.string(),
		propertyStatus: z.string(),
		propertyPrice: z.number(),
		buyinPrice: z.number(),
		interest: z.any(),
		propertyDescription: z.string(),
		address: z.string(),
		availableSlots: z.any(),
		media: z.any()
			.refine((files) => files?.length > 0, {
				message: "Please upload at least one image",
			})
			.refine((files) => files?.size <= MAX_FILE_SIZE, {
				message: `Maximum file size is ${MAX_FILE_SIZE / 1000000} MB`,
			})
			.refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), {
				message: "Only .jpg, .jpeg and .png files are allowed",
			})
	})
);

const { handleSubmit, setFieldValue } = useForm({
	validationSchema: formSchema,
	initialValues: {
		interest: 0,
		availableSlots: 0,
	},
});

const submit = handleSubmit((values) => {
	console.log("Form Submitted", values.media);
});
</script>

<template>
	<form class="p-4 space-y-5" @submit.prevent="submit">
		<div class="md:flex justify-between">
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
								<SelectItem value="land"> Active </SelectItem>
								<SelectItem value="house"> Inactive </SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="md:flex justify-between">
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
			<FormField v-slot="{ componentField }" name="buyinPrice">
				<FormItem class="md:w-[30%]">
					<FormLabel>Buyin Price</FormLabel>
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
							(v) => {
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
		<div>
			<FormField v-slot="{ componentField }" name="propertyDescription">
				<FormItem>
					<FormLabel>Property Description</FormLabel>
					<FormControl>
						<Textarea v-bind="componentField" class="resize-none lg:h-32" ></Textarea>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="md:flex justify-between">
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
								(v) => {
									if (v) {
										setFieldValue('availableSlots', v);
									} else {
										setFieldValue('availableSlots', undefined);
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
		<!--Upload Media-->
		<div class="grid md:w-[45%] w-full items-center gap-1.5">
			<FormField v-slot="{ componentField }" name="media">
				<FormItem class="">
					<FormLabel for="media">Media</FormLabel>
					<FormControl>
						<Input id="media" type="file" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>
		<div class="space-x-4 flex justify-between md:justify-normal">
			<Button type="submit" class="bg-[#1B5DB1] text-white text-lg p-2 w-32"
				>Add Property</Button
			>
			<NuxtLink to="/admin/properties"
				><Button class="bg-[#FC464626] text-[#E11F1F] border text-lg p-2 w-32"
					>Cancel</Button
				></NuxtLink
			>
		</div>
	</form>
</template>
