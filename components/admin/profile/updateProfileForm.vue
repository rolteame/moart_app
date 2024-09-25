<script setup lang="ts">
const profileImage: Ref<string> = ref("");
const file: Ref<File | any> = ref();
const uploadLoading = ref(false);
const loading = ref(false);

const config = useRuntimeConfig();
const auth = useAuthStore();
const user: Ref<Object> = ref(auth.user);

const uploadProfileImage = async () => {
	console.log("Uploaded");
};

const updateProfile = async () => {
  console.log("Updated");
}
</script>

<template>
  <div class="flex flex-col md:flex-row p-5 items-center gap-4">
			<img
				v-show="!profileImage"
				src="~/assets/img/property_bg.jpg"
				alt="Image of Property"
				class="border h-40 w-40 object-cover rounded-full shadow-xl"
			/>
			<img
				v-show="profileImage"
				:src="profileImage"
				alt="Image of Property"
				class="border h-40 w-40 object-cover rounded-full shadow-xl"
			/>
			<div class="flex flex-col gap-3">
				<Input
					type="file"
					class="w-full"
					@change="(event: any) => {
					file = event.target.files[0];
				}"
				/>
				<div class="flex gap-3 items-center">
					<Button
						type="submit"
						class="bg-[#1B5DB1] text-white text-lg py-2 px-4"
						@click="uploadProfileImage"
						>Upload Picture</Button
					>
					<svg
						class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1B5DB1]"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						v-show="uploadLoading === true"
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
				</div>
			</div>
		</div>
	<form class="w-full p-4" @submit.prevent="updateProfile">
			<div class="md:flex justify-between py-3 gap-4">
				<!--Full Name-->
				<FormField v-slot="{ componentField }" name="name">
					<FormItem class="md:w-[50%]">
						<FormLabel>Full Name</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="text" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<!--Gender-->
				<FormField v-slot="{ componentField }" name="gender">
					<FormItem class="md:w-[50%]">
						<FormLabel>Gender</FormLabel>
						<Select v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select a gender" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="male"> Male </SelectItem>
									<SelectItem value="female"> Female </SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="md:flex justify-between py-3 gap-4">
				<!--Email-->
				<FormField v-slot="{ componentField }" name="email">
					<FormItem class="md:w-[50%]">
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="email" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<!--Gender-->
				<FormField v-slot="{ componentField }" name="phoneNumber">
					<FormItem class="md:w-[50%]">
						<FormLabel>Phone Number</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="tel" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="md:flex justify-between py-3 flex-col gap-3 md:flex-row">
				<!--City-->
				<FormField v-slot="{ componentField }" name="city">
					<FormItem class="md:w-[30%]">
						<FormLabel>City</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="number" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<!--State-->
				<FormField v-slot="{ componentField }" name="state">
					<FormItem class="md:w-[30%]">
						<FormLabel>State</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="number" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<!--Country-->
				<FormField v-slot="{ componentField }" name="country">
					<FormItem class="md:w-[30%]">
						<FormLabel>Country</FormLabel>
						<FormControl>
							<Input v-bind="componentField" type="number" />
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
					<span v-show="loading === false">Update Profile</span>
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
