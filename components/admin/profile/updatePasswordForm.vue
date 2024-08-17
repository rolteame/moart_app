<script setup lang="ts">
const loading = ref(false);

const config = useRuntimeConfig();
const auth = useAuthStore();

const updatePassword = async () => {
  console.log("Updated");
}
</script>

<template>
	<p class="lg:text-lg text:md my-auto font-bold pt-3">Reset Password</p>
		<form class="w-full pt-3" @submit.prevent="updatePassword">
			<div class="md:flex justify-between py-3 gap-4">
				<!--Full Name-->
				<FormField v-slot="{ componentField }" name="password">
					<FormItem class="md:w-[50%]">
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="password" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<!--Gender-->
				<FormField v-slot="{ componentField }" name="confirmPassword">
					<FormItem class="md:w-[50%]">
						<FormLabel>Confirm Password</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="password" />
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
					<span v-show="loading === false">Update Password</span>
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
