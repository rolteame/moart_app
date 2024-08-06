<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const termsError = ref("");
const config = useRuntimeConfig();
const auth = useAuthStore();

const loading = ref(false);
const signupSuccess = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const toastTitle = ref("");

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
		errorMessage.value = error.value.data.message;
		loading.value = false;
		toastTitle.value = errorMessage.value;
		setTimeout(() => {
			errorMessage.value = "";
		}, 3000);
		return;
	}
	signupSuccess.value = true;
	toastTitle.value = "Account Created Successfully";
	auth.user = data.value.user;
	auth.token = data.value.tokens.access.token;
	loading.value = false;
	navigateTo(`/verify-email/${data.value.user.email}`);
});
</script>

<template>
	<!--Toast-->
	<div
		class="absolute top-0 right-0 animate__animated animate__fadeInDown"
		v-show="errorMessage || signupSuccess"
	>
		<Toast
			:title="toastTitle"
			:variant="errorMessage ? 'bg-destructive' : 'bg-success'"
		>
			<LucideCircleAlert v-show="errorMessage" />
			<LucideCircleCheckBig v-show="signupSuccess" />
		</Toast>
	</div>
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
		<Button type="submit" class="w-full bg-[#1B5DB1] text-white text-lg py-2">
			Register
		</Button>
	</form>
</template>
