<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { Login } from "~/types/authTypes";
useHead({
	title: "Forgot Password | Moart",
});

const loading: Ref<boolean> = ref(false);
const inputType = ref("password");

const config = useRuntimeConfig();
const route = useRoute();

const formSchema = toTypedSchema(
	z
		.object({
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
});

const onSubmit = handleSubmit(async (values) => {
	try {
		loading.value = true;
    const { password } = values;
		const { data, error } = await useFetch<any>(
			`${config.public.backendUrl}/auth/reset-password`,
			{
				method: "POST",
				body: { password },
        query: {
          token: route.params.id
        }
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
    
    if (error.value?.statusCode === 404) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		return;
	}

		useNuxtApp().$toast.success("Password reset successfully. Please login");
    values.password = "";
    values.confirmPassword = "";
    loading.value = false;

    setTimeout(() => {
      navigateTo("/login");
    }, 3000);

	} catch (error) {
		console.log(error);
	}
});
</script>

<template>
	<section class="container-fluid">
		<img
			src="~/assets/img/bg-full.jpg"
			alt="Background Image"
			class="object-cover h-[100vh] w-full"
		/>
		<div
			class="absolute bg-gradient-to-br from-[#064274CC] from-20% to-[#DD9933CC] h-[100vh] w-full top-0 flex justify-center items-center"
		>
			<div class="flex items-center justify-center w-[90vw] h-[90vh] bg-white">
				<div class="lg:w-[50%] mx-auto">
					<img
						src="~/assets/img/logo.png"
						alt="Moart Logo"
						class="w-30 pb-4 mx-auto"
					/>
					<div class="py-8 lg:py-4 px-5">
						<h2 class="text-3xl font-bold text-[#1B5DB1]">Reset Password</h2>
						<p>
							Please kindly enter in your new password.
						</p>
					</div>
					<form @submit.prevent="onSubmit">
						<FormField v-slot="{ componentField }" name="password">
							<FormItem class="mb-8 px-5">
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
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>
						<FormField v-slot="{ componentField }" name="confirmPassword">
							<FormItem class="mb-8 px-5">
								<FormControl class="">
									<div class="relative">
										<Input
											:type="inputType"
											placeholder="Confirm Password"
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
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>
						<div class="flex mx-5 my-3">
							<button
								class="bg-[#1B5DB1] text-white py-2 px-10 rounded text-lg flex"
								type="submit"
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
								<span v-show="loading === false">Reset Password</span>
							</button>
						</div>
					</form>
					<p class="px-5">
						Already have an account?
						<NuxtLink to="/login" class="text-[#1B5DB1]">Login</NuxtLink>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
