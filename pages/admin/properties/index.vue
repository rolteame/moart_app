<script lang="ts" setup>
useHead({
	title: "Properties - Admin | Moart",
});

const config = useRuntimeConfig();
const auth = useAuthStore();

const nextPageLoading = ref(false);
const prevPageLoading = ref(false);

const {
	data: propertiesInfo,
	error,
	refresh,
} = await useAsyncData<any>("propertiesInfo", async () => {
	const [analytics, properties] = await Promise.all([
		$fetch(`${config.public.backendUrl}/properties/stats`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		}),
		$fetch(`${config.public.backendUrl}/properties`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		}),
	]);
	return {
		analytics,
		properties,
	};
});

if (error.value?.statusCode === 401) {
	await auth.resetToken();
	refresh();
	navigateTo("/admin/properties");
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
				page: propertiesInfo.value?.properties.page + 1,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/admin/properties");
	}

	useNuxtApp().$toast.success("Page loaded");
	propertiesInfo.value.properties = data.value;
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
				page: propertiesInfo.value?.properties.page - 1,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/admin/properties");
	}

	useNuxtApp().$toast.success("Page loaded");
	propertiesInfo.value.properties = data.value;
	prevPageLoading.value = false;
};
</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
			Properties
		</p>
		<NuxtLink to="/admin/properties/add-property"
			><Button class="bg-[#1B5DB1] text-white text-lg py-2 px-4"
				><LucidePlus :size="20" stroke-width="1" /> Add Property</Button
			></NuxtLink
		>
	</div>
	<!-- Analytics Section -->
	<div>
		<AdminPropertiesAnalytics :analytics="propertiesInfo?.analytics" />
	</div>
	<!-- Properties Section -->
	<div
		class="flex items-center h-[60%] justify-center"
		v-if="propertiesInfo?.properties.results.length === 0"
	>
		No Properties Available
	</div>
	<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
		<div
			v-for="property in propertiesInfo?.properties.results"
			:key="property.id"
		>
			<AdminPropertiesPropertyCard :property="property" />
		</div>
	</div>
	<!-- Pagination -->
	<div class="flex justify-between px-3 items-center py-3">
		<span class="text-[#4F4F4F] font-bold text-sm lg:text-lg">
			Page: {{ propertiesInfo?.properties.page }}
		</span>
		<div class="flex gap-4">
			<Button
				class="w-18 lg:w-28 bg-[#1B5DB1]"
				:disabled="propertiesInfo?.properties.page === 1"
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
				:disabled="
					propertiesInfo?.properties.page ===
					propertiesInfo?.properties.totalPages
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
