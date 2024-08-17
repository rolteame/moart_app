<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const termsError = ref("");
const config = useRuntimeConfig();
const auth = useAuthStore();

const loading = ref(false);

const formSchema = toTypedSchema(
	z
		.object({
			fullName: z.string(),
			terms: z.boolean(),
			email: z
				.string()
				.email({ message: "Please enter a valid email address" }),
			password: z
				.string()
				.min(8, { message: "Password must be at least 8 characters" })
				.regex(new RegExp(".*[A-Z].*"), "One uppercase character")
				.regex(new RegExp(".*[a-z].*"), "One lowercase character")
				.regex(new RegExp(".*\\d.*"), "One number")
				.regex(
					new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
					"One special character"
				),
			confirmPassword: z.string().min(8),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ["confirmPassword"],
		})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
	initialValues: {
		terms: false,
	},
});

const submit = handleSubmit(async (values) => {
	if (values.terms === false) {
		console.log(values.terms);
		termsError.value = "You must accept the terms and conditions";
		return;
	}
	termsError.value = "";

	const { fullName, email, password } = values;

	const { data, error }: any = await useFetch(
		`${config.public.backendUrl}/auth/register`,
		{
			method: "POST",
			body: { fullName, email, password },
		}
	);

	if (error.value?.data.code === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return;
	}

	if (error.value?.statusCode === 429) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return
	}

	useNuxtApp().$toast.success("Registration successful");
	loading.value = false;
	navigateTo(`/verify-email/${data.value.user.email}`);
});
</script>

<template>
	<!--Register Form-->
	<form class="w-full space-y-4" @submit.prevent="submit">
		<!--Full Name-->
		<FormField v-slot="{ componentField }" name="name">
			<FormItem>
				<FormLabel>Your Name:</FormLabel>
				<FormControl>
					<Input type="text" placeholder="Full Name" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<!--Email-->
		<FormField v-slot="{ componentField }" name="email">
			<FormItem>
				<FormLabel>Your Email:</FormLabel>
				<FormControl>
					<Input
						type="text"
						placeholder="Enter your Email"
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>

		<!--Password-->
		<FormField v-slot="{ componentField }" name="password">
			<FormItem>
				<FormLabel>Password:</FormLabel>
				<FormControl>
					<Input
						type="password"
						placeholder="Password"
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<!--Confirm Password-->
		<FormField v-slot="{ componentField }" name="confirmPassword">
			<FormItem>
				<FormLabel>Confirm Password:</FormLabel>
				<FormControl>
					<Input
						type="password"
						placeholder="Confirm Password"
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>

		<div class="flex items-center">
			<FormField v-slot="{ value, handleChange }" type="checkbox" name="terms">
				<FormItem class="space-x-5">
					<FormControl>
						<Checkbox
							:checked="value"
							@update:checked="handleChange"
							id="terms"
              class="border-white"
						/>
					</FormControl>
					<label
						for="terms"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I agree to the
						<span class="font-bold">agreement user policy</span> and
						<span class="font-bold">cookie policy</span>.
					</label>
					<p class="text-red-500 text-sm">{{ termsError }}</p>
				</FormItem>
			</FormField>
		</div>
		<button
				class="bg-[#1B5DB1] text-white py-2 px-10 rounded text-lg uppercase flex "
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
				<span v-show="loading === false">Log in</span>
			</button>
	</form>
</template>
