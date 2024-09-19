<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

useHead({
	title: "Notifications - Admin | Moart",
});

const auth = useAuthStore();
const loading = ref(false);

const formSchema = toTypedSchema(
  z.object({
    subject: z.string(),
    message: z.string(),
  })
)

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	loading.value = true;
	const { data, error, refresh } = await useFetch<any>(
		`${useRuntimeConfig().public.backendUrl}/notification`, {
			method: "POST",
			body: values,
			headers: {
				"Authorization": `Bearer ${auth.token}`
			}
		}
	)

	if (error.value?.statusCode === 401) {
		loading.value = false;
		useNuxtApp().$toast.error("Token expired, reftreshing token");
		await auth.resetToken();
		setTimeout(() => {
			refresh();
		}, 3000);
		return;
	}

	if (error.value?.statusCode === 404) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return;
	}

	useNuxtApp().$toast.success(data.value.message);
	values.subject = "";
	values.message = "";
	setTimeout(() => {
		loading.value = false;
	}, 1000)
})

</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
			Notifications
		</p>
	</div>
	<div
		class="bg-white rounded-xl shadow-md px-4 py-3 mt-3 content-center text-[#4F4F4FA8]"
	>
		<p class="font-semibold text-lg">Send Email To All User’s</p>
		<form class="p-4 space-y-5" @submit="onSubmit">
			<!--Subject-->
			<FormField v-slot="{ componentField }" name="subject">
				<FormItem class="">
					<FormLabel>Subject</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="text" placeholder="Enter Your Subject" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Message-->
			<div>
				<FormField v-slot="{ componentField }" name="message">
					<FormItem>
						<FormLabel>Message</FormLabel>
						<FormControl>
							<Textarea
								v-bind="componentField"
								class="resize-none lg:h-40"
                placeholder="Enter Your Message"
							></Textarea>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="space-x-4 flex justify-between md:justify-normal">
				<Button
				class="bg-[#1B5DB1] text-white py-2 px-10 rounded text-lg flex "
				:disabled="loading === true"
			>
				<span v-show="loading === true" class="flex items-center">
					<svg
						class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
				<span v-show="loading === false">Send Notification</span>
			</Button>
			</div>
		</form>
	</div>
</template>
