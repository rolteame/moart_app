<script setup lang="ts">
const { user, index } = defineProps({
	user: { type: Object, required: true },
	index: { type: Number, required: true },
});

const auth = useAuthStore();
const config = useRuntimeConfig();

const suspendUser = async () => {
	try {
		const { data, error, refresh } = await useFetch<any>(
			`${config.public.backendUrl}/users/${user.id}/suspend`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			}
		);

		const toastId = useNuxtApp().$toast.loading("Suspending User Account...");

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
				render: "User Account Suspended",
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

const reactivateUser = async () => {
	try {
		const { data, error, refresh } = await useFetch<any>(
			`${config.public.backendUrl}/users/${user.id}/activate`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			}
		);

		const toastId = useNuxtApp().$toast.loading("Reactivating User Account...");

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
				render: "User Account Reactivated",
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


const deleteUser = async () => {
	try {
		const { data, error, refresh } = await useFetch<any>(
			`${config.public.backendUrl}/users/${user.id}/delete`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			}
		);

		const toastId = useNuxtApp().$toast.loading("Deleting User Account...");

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
				render: "User Account Deleted",
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
	<TableCell>{{ index + 1 }}</TableCell>
	<TableCell class="font-medium">
		{{ user.fullName }}
	</TableCell>
	<TableCell>{{ user.email }}</TableCell>
	<TableCell
		:class="{
			'text-[#FF7B7B] capitalize': user.status === 'Inactive',
			'text-green-600 capitalize':
				user.status === 'ACTIVE' || user.status === 'Active',
			'text-red-600': user.status === 'DELETED',
			'text-red-500': user.status === 'SUSPENDED',
		}"
		class="capitalize"
		>{{ user.status }}</TableCell
	>
	<TableCell class="text-right">
		<DropdownMenu>
			<DropdownMenuTrigger class="">
				<LucideEllipsisVertical
					color="#1B5DB1"
					stroke-width="2"
					class="ml-auto focus:border"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="flex flex-col test-sm space-y-1">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<AdminViewActiveInvestments :userId="user.id" />
				<AdminViewClaimedInvestment :userId="user.id" />
				<AdminViewPendingInvestments :user-id="user.id" />
				<AdminViewAllTransactions :userId="user.id" />
				<span
					class="font-xs px-2 cursor-pointer text-start"
					@click="reactivateUser"
					>Reactivate User</span
				>
				<span
					class="font-xs px-2 cursor-pointer text-start text-red-400 hover:text-red-600 focus:bg-red-400 focus:text-white"
					@click="suspendUser"
					>Suspend User</span
				>
				<span
					class="font-xs px-2 cursor-pointer text-start text-red-600 hover:text-red-800 focus:bg-red-600 focus:text-white"
					@click="deleteUser"
					>Delete User</span
				>
			</DropdownMenuContent>
		</DropdownMenu>
	</TableCell>
</template>

<style scoped></style>
