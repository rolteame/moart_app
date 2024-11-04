<script lang="ts" setup>
useHead({
	title: "Listings - Dashboard | Moart",
});

const auth = useAuthStore();
const config = useRuntimeConfig();

const properties: Ref<any> = ref();
const allProperties: Ref<any> = ref();
const nextPageLoading: Ref<boolean> = ref(false);
const prevPageLoading: Ref<boolean> = ref(false);

try {
	const { data, error, refresh } = await useFetch<any>(
	`${config.public.backendUrl}/properties`,
	{
		method: "GET",
		headers: {
			Authorization: `Bearer ${auth.token}`,
		},
	}
);

if (error.value?.statusCode === 401) {
	useNuxtApp().$toast.error("Token expired, refreshing token");
	await auth.resetToken();
	refresh();
	location.reload();
}

allProperties.value = data.value;
properties.value = data.value.results.filter((property: any) => {
	return property.propertyStatus === "active";
});
} catch (error) {
	console.log(error);
}

const nextPage = async () => {
	nextPageLoading.value = true;
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/properties`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				page: allProperties.value.page + 1 || 1,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/user-dashboard/listings");
	}

	properties.value = data.value.results.filter((property: any) => {
		return property.propertyStatus === "active";
	});
	useNuxtApp().$toast.success("Page loaded");
	nextPageLoading.value = false;
};

const prevPage = async () => {
	prevPageLoading.value = true;
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/properties`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				page: allProperties.value.page - 1 || 1,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/admin/properties");
	}

	properties.value = data.value.results.filter((property: any) => {
		return property.propertyStatus === "active";
	});
	useNuxtApp().$toast.success("Page loaded");
	prevPageLoading.value = false;
};
</script>

<template>
	<div>
		<div
			class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
		>
			<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
				Listings
			</p>
			<UserDetails />
		</div>
		<!--Listings-->
		<div class="py-4">
			<div
				class="flex items-center h-[60%] justify-center"
				v-if="properties?.length === 0"
			>
				No Properties Available
			</div>
			<div
				v-else
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2"
			>
				<div v-for="property in properties" :key="property.id">
					<AdminPropertiesPropertyCard :property="property" />
				</div>
			</div>
		</div>
	</div>
	<!-- Pagination -->
	<div class="flex justify-between px-3 items-center py-3">
		<span class="text-[#4F4F4F] font-bold text-md lg:text-lg">
			Page: {{ allProperties.page }}
		</span>
		<div class="flex gap-4">
			<Button
				class="w-18 lg:w-28 bg-[#1B5DB1]"
				:disabled="allProperties.page === 1"
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
				class="w-14 lg:w-28 bg-[#1B5DB1]"
				:disabled="
					allProperties.page ===
					allProperties.totalPages
				"
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
				</Button
			>
		</div>
	</div>
</template>
