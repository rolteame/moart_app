<script lang="ts" setup>
const { property } = defineProps({
	property: {
		type: Object,
	},
});
const auth = useAuthStore();
const config = useRuntimeConfig();
const router = useRouter();

const loading = ref(false);
const showAlert = ref(false);

const deleteProperty = async (propertyId: string) => {
	loading.value = true;
	try {
		const { data, error, refresh } = await useFetch<any>(
			`${config.public.backendUrl}/properties/${propertyId}`,
			{
				method: "DELETE",
				body: property,
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			}
		);

		const toastId = useNuxtApp().$toast.loading("Deleting property...");

		if (error.value?.statusCode === 401) {
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
				render: "Property deleted successfully",
				autoClose: true,
				closeOnClick: true,
				closeButton: true,
				type: "success",
				isLoading: false,
			});
		}, 3000);
		setTimeout(() => {
			location.reload();
		}, 3000);
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div v-show="showAlert">
		<BaseAlert
			title="Edit Property"
			description="Are you sure you want to edit this property"
			@close="showAlert = false"
			:loading="loading"
			@confirm="deleteProperty"
		/>
	</div>
	<div class="w-full">
		<Card class="flex flex-col rounded-t-2xl rounded-b-lg shadow-lg">
			<div
				class="lg:h-52 h-40 rounded-2xl bg-no-repeat bg-cover bg-center"
				:style="{ backgroundImage: `url(${property?.image})` }"
			>
				<div
					class="relative bg-gradient-to-b from-[#DD9933CC]/20 from-20% to-[#064274CC] w-full h-full rounded-2xl text-white p-4 flex justify-between items-end"
				>
					<p class="lg:text-xl text-lg font-semibold">
						{{ property?.propertyName }}
					</p>
					<div v-show="auth.user?.role === 'admin' || auth.user?.role === 'superadmin'">
						<NuxtLink
							:to="{
								name: 'admin-properties-edit-property-id',
								params: { id: property?.id },
							}"
							><LucideSquarePen
								:size="25"
								stroke-width="1"
								class="mb-2 cursor-pointer"
						/></NuxtLink>
						<LucideTrash2
							:size="25"
							stroke-width="1"
							color="red"
							class="cursor-pointer"
							@click.prevent="deleteProperty(property?.id)"
						/>
					</div>
				</div>
			</div>
			<CardContent>
				<div
					class="pt-6 px-2 lg:px-3 lg:text-xl text-md font-semibold text-[#4F4F4F]"
				>
					<p class="flex justify-between">
						<span>Available Slot</span><span>{{ property?.slots }}</span>
					</p>
					<p class="flex justify-between">
						<span>Buy-in Price</span
						><span class="flex justify-center items-center"
							><img
								class="w-4 h-4"
								src="https://img.icons8.com/material-outlined/24/naira.png"
								alt="naira"
							/>{{ property?.buyInPrice }}</span
						>
					</p>
					<p class="flex justify-between">
						<span>Property Type</span
						><span class="capitalize">{{ property?.propertyType }}</span>
					</p>
					<p class="flex justify-between" v-show="auth.user?.role === 'admin' || auth.user?.role === 'superadmin'">
						<span>Property Status</span
						><span
							:class="{
								'text-red-500 capitalize':
									property?.propertyStatus === 'inactive',
								'text-green-500 capitalize':
									property?.propertyStatus === 'active',
							}"
							>{{ property?.propertyStatus }}</span
						>
					</p>
					<p class="flex justify-between">
						<span>Interest</span
						><span class="text-[#1B5DB1]">{{ property?.interest }}%</span>
					</p>
				</div>
				<div class="flex justify-center pt-6" v-show="auth.user.role === 'user'">
					<Button class="w-[60%] bg-[#1B5DB1] shadow-md text-lg">Invest</Button>
				</div>
			</CardContent>
		</Card>
	</div>
</template>
