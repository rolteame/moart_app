<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import type { User } from "~/types";

useHead({
	title: "Users - Admin | Moart",
});
const tableHeader = ["Name", "Email", "Status"];
const users = ref<User[]>([]);

const auth = useAuthStore();
const config = useRuntimeConfig();

try {
	const { data, error, refresh} = await useFetch<any>(
		`${config.public.backendUrl}/users`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				role: "user",
			}
		}
	)

	if (error.value?.data.code === 401) {
		useNuxtApp().$toast.error(error.value?.data.message);
		await auth.resetToken();
		refresh();
	}

	if (error.value?.data.code === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
	}

	if (error.value?.data.code === 500) {
		useNuxtApp().$toast.error(error.value?.data.message);
	}

	users.value = data.value?.results;
} catch (error) {
	console.log(error);
}
</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">Users</p>
	</div>
	<div
		class="bg-white rounded-xl shadow-md px-4 py-3 mt-3 content-center text-[#414141A8]"
	>
		<form action="" class="md:grid md:grid-cols-2 justify-items-center">
			<!--Search by Users-->
			<FormField v-slot="{ componentField }" name="search">
				<FormItem class="w-full md:w-[90%] my-2">
					<FormLabel class="text-lg">Search By Name or Email</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="text" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Status-->
			<FormField v-slot="{ componentField }" name="status">
				<FormItem class="w-full md:w-[90%] my-2">
					<FormLabel class="text-lg">Status</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="All"> All </SelectItem>
								<SelectItem value="active"> Active </SelectItem>
								<SelectItem value="inactive"> In-active </SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Submit Button-->
			<div class="w-full md:col-span-4 md:flex md:justify-center mt-10 mb-5">
				<Button class="bg-[#1B5DB1] w-full md:w-[80%]"
					><LucideSearch />Search</Button
				>
			</div>
		</form>
	</div>
	<div
		class="bg-white rounded-xl shadow-md py-3 mt-3 content-center text-[#414141A8]"
	>
		<div class="container py-4 mx-auto">
			<AdminUserTable :tableHeader="tableHeader" :users="users"/>
		</div>
	</div>
</template>

<style scoped></style>
