<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { Login } from "~/types/authTypes";

const inputType = ref("password");
const auth = useAuthStore();
const config = useRuntimeConfig();

const loading = ref(false);

const formSchema = toTypedSchema(
	z.object({
		email: z.string().email({ message: "Please enter a valid email address" }),
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
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: Login) => {
	loading.value = true;
	const { data, error }: any = await useFetch(
		`${config.public.backendUrl}/auth/login`,
		{
			method: "POST",
			body: values,
		}
	);

	if (error.value?.data.code === 401) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return;
	}

	if (error.value?.statusCode === 429) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return;
	}

	useNuxtApp().$toast.success("Login successful");
	auth.isLoggedin = true;
	auth.user = data.value.user;
	auth.token = data.value.tokens.access.token;
	auth.refreshToken = data.value.tokens.refresh.token;

	loading.value = false;
	setTimeout(() => {
		if (auth.user.role === "admin" || auth.user.role === "superadmin") {
			return navigateTo("/admin");
		}

		if (auth.user.role === "user") {
			return navigateTo("/user-dashboard");
		}
	}, 2000);
});
</script>

<template>
	<form @submit.prevent="onSubmit">
		<FormField v-slot="{ componentField }" name="email">
			<FormItem class="mb-8">
				<FormControl>
					<div class="relative">
						<Input
							type="email"
							placeholder="Email Address"
							class="border-[#1B5DB1] py-2"
							v-bind="componentField"
						/>
						<span
							class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
						>
							<LucideMail
								class="size-6 text-muted-foreground"
								color="#1B5DB1"
								stroke-width="1"
							/>
						</span>
					</div>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="password">
			<FormItem class="mb-8">
				<FormControl class="">
					<div class="relative">
						<Input
							:type="inputType"
							placeholder="Password"
							class="border-[#1B5DB1] py-2"
							v-bind="componentField"
						/>
						<span
							class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
						>
							<LucideEyeOff
								class="size-6 text-muted-foreground"
								color="#1B5DB1"
								@click="inputType = 'text'"
								v-show="inputType === 'password'"
								stroke-width="1"
							/>
							<LucideEye
								class="size-6 text-muted-foreground"
								color="#1B5DB1"
								@click="inputType = 'password'"
								v-show="inputType === 'text'"
								stroke-width="1"
							/>
						</span>
					</div>
					<NuxtLink to="/forgot-password" class="text-white flex justify-end text-sm"
						>Forgot Password</NuxtLink
					>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<div class="flex justify-center mt-14 mb-32">
			<button
				class="bg-[#1B5DB1] text-white py-2 px-10 rounded text-lg uppercase flex"
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
		</div>
	</form>
</template>
