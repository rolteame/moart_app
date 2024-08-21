<script lang="ts" setup>
useHead({
	title: "Listings - Dashboard | Moart",
});

const auth = useAuthStore();
const config = useRuntimeConfig();

const properties: Ref<any> = ref();

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
	useNuxtApp().$toast.error("Token expired, reftreshing token");
	await auth.resetToken();
	refresh();
	location.reload();
}

properties.value = data.value.results.filter((property: any) => {
	return property.propertyStatus === "active";
});

console.log(properties.value);
</script>

<template>
	<div>
		<div
			class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
		>
			<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
				Listings
			</p>
			<div class="flex items-center">
				<div class="flex flex-col pe-4">
					<p class="font-bold text-md lg:text-lg">{{ auth.user.fullName }}</p>
					<p class="text-sm">{{ auth.user.email }}</p>
				</div>
				<img src="" alt="" class="w-10 h-10 rounded-full" />
			</div>
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
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-2"
			>
				<div v-for="property in properties" :key="property.id">
					<AdminPropertiesPropertyCard :property="property" />
				</div>
			</div>
		</div>
	</div>
</template>
