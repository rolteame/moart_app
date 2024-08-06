<script lang="ts" setup>
useHead({
	title: "Properties - Admin | Moart",
});

const config = useRuntimeConfig();
const auth = useAuthStore();

const { data: propertiesInfo, error, refresh } = await useAsyncData<any>(
	"propertiesInfo",
	async () => {
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
	}
);

if (error.value?.statusCode === 401) {
	await auth.resetToken();
	refresh();
	navigateTo("/admin/properties");
}
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
	<div>
		<AdminPropertiesAnalytics :analytics="propertiesInfo?.analytics" />
	</div>
	<div
		class="flex items-center h-[60%] justify-center"
		v-if="propertiesInfo?.properties.results.length === 0"
	>
		No Properties Available
	</div>
	<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-3">
		<div
			v-for="property in propertiesInfo?.properties.results"
			:key="property.id"
		>
			<AdminPropertiesPropertyCard />
		</div>
	</div>
</template>
