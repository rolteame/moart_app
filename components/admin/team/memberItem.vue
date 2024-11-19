<script setup lang="ts">
const { member } = defineProps({
	member: {
		type: Object as () => any,
	},
	loading: {
		type: Boolean,
		default: false,
	}
});

const auth = useAuthStore();
const config = useRuntimeConfig();
const loading = ref(false);

const deleteTeamMember = async (id: string, position: string) => {
	loading.value = true;
	try {
		const { data, error, refresh } = await useFetch<any>(
			`${config.public.backendUrl}/team/${id}`,
			{
				method: "DELETE",
				body: {
					position: position,
				},
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			}
		);

		if (error.value?.statusCode === 401) {
			useNuxtApp().$toast.error("Token expired, reftreshing token");
			await auth.resetToken();
			refresh();
			return;
		}

		if (error.value?.statusCode === 400) {
			useNuxtApp().$toast.error(error.value?.data.message);
			loading.value = false;
			return;
		}

		useNuxtApp().$toast.success("Member deleted successfully");
		loading.value = false;
		location.reload();
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<div class="grid grid-cols-4 p-5">
		<TableCell class="font-medium flex flex-col">
			<span class="font-thick">{{ member?.user?.fullName }}</span>
			<span class="text-muted-foreground justify-items-center">{{
				member?.user?.email
			}}</span>
		</TableCell>
		<TableCell class="font-thick text-center capitalize">{{
			member?.user?.role
		}}</TableCell>
		<TableCell class="font-thick">{{ member?.position }}</TableCell>
		<TableCell class="justify-self-center flex gap-3"
			><LucideTrash2
				color="red"
				stroke-width="2"
				class="size-5 cursor-pointer"
				@click="deleteTeamMember(member?.id, member?.position)" /><span
				v-show="loading === true"
				class="w-34"
			>
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1B5DB1] w-34"
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
				</svg> </span
		></TableCell>
	</div>
	<Separator />
</template>

<style scoped></style>
