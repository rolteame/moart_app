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
const allUsers = ref();
const nextPageLoading: Ref<boolean> = ref(false);
const prevPageLoading: Ref<boolean> = ref(false);
const page: Ref<number> = ref(1);

const auth = useAuthStore();
const config = useRuntimeConfig();

try {
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/users`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				role: "user",
			},
		}
	);

	if (error.value?.data.code === 401) {
		useNuxtApp().$toast.error(error.value?.data.message);
		await auth.resetToken();
		refresh();
		location.reload();
	}

	if (error.value?.data.code === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
	}

	if (error.value?.data.code === 500) {
		useNuxtApp().$toast.error(error.value?.data.message);
	}

	users.value = data.value?.results;
	allUsers.value = data.value;
} catch (error) {
	console.log(error);
}

const nextPage = async () => {
	nextPageLoading.value = true;
	page.value = allUsers.value.page ? allUsers.value.page + 1 : 1;
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/payments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				page: page.value,
				sortBy: "createdAt:desc",
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/user-dashboard/listings");
	}

	users.value = data.value?.results;
	allUsers.value = data.value;
	useNuxtApp().$toast.success("Page loaded");
	nextPageLoading.value = false;
};

const prevPage = async () => {
	prevPageLoading.value = true;
	page.value = allUsers?.value.page ? allUsers?.value.page - 1 : 1;
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/payments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				page: page.value,
				sortBy: "createdAt:desc",
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/admin/properties");
	}

	users.value = data.value.results;
	allUsers.value = data.value;
	useNuxtApp().$toast.success("Page loaded");
	prevPageLoading.value = false;
};


const formSchema = toTypedSchema(
	z.object({
		search: z.string(),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/users`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				search: values.search,
			},
		}
	);

	const toastId = useNuxtApp().$toast.loading("Searching for User Account...");

		if (error.value?.data.code === 401) {
			setTimeout(() => {
				useNuxtApp().$toast.update(toastId, {
					render: error.value?.data.message,
					autoClose: true,
					closeOnClick: true,
					closeButton: true,
					type: "error",
					isLoading: false,
				});
			}, 2000);
			await auth.resetToken();
			refresh();
			return;
		}

		if (error.value?.statusCode === 400) {
			setTimeout(() => {
				useNuxtApp().$toast.update(toastId, {
					render: error.value?.data.message,
					autoClose: true,
					closeOnClick: true,
					closeButton: true,
					type: "error",
					isLoading: false,
				});
			}, 2000);
			return;
		}

		setTimeout(() => {
			useNuxtApp().$toast.update(toastId, {
				render: "Accounts Found",
				autoClose: true,
				closeOnClick: true,
				closeButton: true,
				type: "success",
				isLoading: false,
			});
		}, 3000);

		users.value = data.value?.results;
		allUsers.value = data.value;
});

const refresh = () => {
	location.reload()
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
		<form @submit="onSubmit"  class="md:grid md:grid-cols-1 justify-items-center mx-3">
			<!--Search by Users-->
			<FormField v-slot="{ componentField }" name="search">
				<FormItem class="w-full my-2">
					<FormLabel class="text-lg">Search By Name or Email </FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="text" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Submit Button-->
			<div class="w-full md:col-span-4 md:flex md:justify-center mt-10 mb-5 gap-2">
				<Button class="bg-[#1B5DB1] w-[30%] md:w-[80%]"
					><LucideSearch />Search</Button
				>
				<Button @click="refresh" class="w-[30%] md:w-[80%]">Show All</Button>
			</div>
		</form>
	</div>
	<div
		class="bg-white rounded-xl shadow-md py-3 mt-3 content-center text-[#414141A8]"
	>
		<div class="container py-4 mx-auto">
			<AdminUserTable :tableHeader="tableHeader" :users="users" />
		</div>
		<!--Pagination-->
		<div class="flex justify-end px-3 items-center py-3 mx-4">
			<div class="flex gap-4">
				<Button
					class="w-18 lg:w-28 bg-[#1B5DB1]"
					:disabled="allUsers?.page === 1"
					@click="prevPage"
					><span v-show="prevPageLoading === true" class="flex items-center">
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
					<span v-show="prevPageLoading === false">Prev</span></Button
				>
				<Button
					class="w-18 lg:w-28 bg-[#1B5DB1]"
					:disabled="allUsers?.page === allUsers?.totalPages"
					@click="nextPage"
				>
					<span v-show="nextPageLoading === true" class="flex items-center">
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
					<span v-show="nextPageLoading === false">Next</span>
				</Button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
