<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { ResetPasswordInput } from "~/types";
useHead({
	title: "Forgot Password | Moart",
});


const loading: Ref<boolean> = ref(false);

const auth = useAuthStore();
const config = useRuntimeConfig();


const formSchema = toTypedSchema(
	z.object({
		email: z.string().email({ message: "Please enter a valid email address" }),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: ResetPasswordInput) => {
  try {
    loading.value = true;
    const { data, error} = await useFetch<any>(`${config.public.backendUrl}/auth/forgot-password`, {
      method: "POST",
      body: values,
    })
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

	useNuxtApp().$toast.success("Reset link sent.\nCheck your email.");

	loading.value = false;
  } catch (error) {
    console.log(error)
  }
})
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
			<div
				class="flex items-center justify-center w-[90vw] h-[90vh] bg-white"
			>
				<div class="lg:w-[50%] mx-auto">
					<img
						src="~/assets/img/logo.png"
						alt="Moart Logo"
						class="w-30 pb-4 mx-auto"
					/>
					<div class="py-8 lg:py-4 px-5">
						<h2 class="text-3xl font-bold text-[#1B5DB1]">Forgot Password</h2>
						<p>
							Please type the email address of the account you want to retrieve.
						</p>
					</div>
					<form @submit.prevent="onSubmit">
						<FormField v-slot="{ componentField }" name="email">
							<FormItem class="px-5">
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
          <p class="px-5">Already have an account? <NuxtLink to="/login" class="text-[#1B5DB1]">Login</NuxtLink></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
