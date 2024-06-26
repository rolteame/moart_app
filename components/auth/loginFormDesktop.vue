<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const inputType = ref("password");

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

const submit = handleSubmit((values) => {
	console.log('Form Submitted', values)
})
</script>

<template>
	<form @submit.prevent="submit">
		<FormField v-slot="{ componentField }" name="email">
			<FormItem class="mb-8">
				<FormControl>
					<div class="relative">
						<Input
							type="email"
							placeholder="Email Address"
							class="border-[#1B5DB1]"
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
							class="border-[#1B5DB1]"
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
					<NuxtLink to="#" class="text-[#1B5DB1] flex justify-end text-sm"
						>Forgot Password</NuxtLink
					>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<div class="flex justify-center mt-14 mb-32">
			<button
				class="bg-[#1B5DB1] text-white py-2 px-10 rounded text-lg uppercase"
			>
				Log in
			</button>
		</div>
	</form>
</template>
