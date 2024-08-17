<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const config = useRuntimeConfig();
const auth = useAuthStore();

const loading = ref(false);

const formSchema = toTypedSchema(
	z.object({
		fullName: z.string(),
		email: z.string(),
		position: z.string(),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	loading.value = true;
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/team`,
		{
			method: "POST",
			body: values,
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		useNuxtApp().$toast.error("Token expired, reftreshing token");
		loading.value = false;
		auth.resetToken();
		refresh();
		return;
	}

	if (error.value?.statusCode === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return;
	}

	useNuxtApp().$toast.success("Member added successfully");
	loading.value = false;
	navigateTo("/admin/team");
});
</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<form class="w-full" @submit.prevent="onSubmit">
			<!--fullName-->
			<FormField v-slot="{ componentField }" name="fullName">
				<FormItem class="mb-8">
					<FormControl>
						<Input
							type="text"
							placeholder="Full Name"
							v-bind="componentField"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Email-->
			<FormField v-slot="{ componentField }" name="email">
				<FormItem class="mb-8">
					<FormControl>
						<Input type="email" placeholder="Email" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Position-->
			<FormField v-slot="{ componentField }" name="position">
				<FormItem class="mb-8">
					<FormControl>
						<Input type="text" placeholder="Position" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Submit Button-->
			<div class="space-x-4 flex justify-between md:justify-normal">
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
					<span v-show="loading === false">Add Member</span>
				</Button>
				<NuxtLink to="/admin/team"
					><Button class="bg-[#FC464626] text-[#E11F1F] border text-lg p-2 w-32"
						>Cancel</Button
					></NuxtLink
				>
			</div>
		</form>
	</div>
</template>

<style scoped></style>
