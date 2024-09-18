<script setup lang="ts">
const { notification, loadNotifications } = defineProps({
	notification: {
		type: Object as () => any,
	},
  loadNotifications: {
    type: Function as () => any
  }
});

const auth = useAuthStore();
const config = useRuntimeConfig();

const readLoading: Ref<boolean> = ref(false);

const readNotification = async (id: number) => {
	try {
    readLoading.value = true;
		const { data, error } = await useFetch<any>(
			`${config.public.backendUrl}/notification/${auth.user.id}/${id}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			}
		);

		if (error.value?.statusCode === 401) {
			useNuxtApp().$toast.error("Token expired, refreshing token");
			await auth.resetToken();
			location.reload();
		}

		if (error.value?.statusCode === 400) {
			useNuxtApp().$toast.error(error.value?.data.message);
			await auth.resetToken();
			location.reload();
		}

		useNuxtApp().$toast.success("Notification read successfully");
    readLoading.value = false;
    setTimeout(() => {
      loadNotifications();
    }, 2000)
	} catch (error) {
		console.log(error);
	}
};
</script>
<template>
	<div
		class="p-1 rounded-md text-left"
		:class="notification.read === true ? '' : 'bg-[#1B5DB1]/20'"
	>
		<SheetTitle class="pb-1">{{ notification?.notification.subject }}</SheetTitle>
		<SheetDescription>
			{{ notification?.notification.message }}
		</SheetDescription>
		<div class="flex justify-end">
			<Button
				class="bg-[#1B5DB1] font-light my-1 mr-1 h-8 md:h-10"
				:class="notification.read === true ? 'hidden' : 'bg-[#1B5DB1]'"
				@click="readNotification(notification?.id)"
			>
				<span v-show="readLoading === true" class="w-34">
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
				<span v-show="readLoading === false">Mark as Read</span>
			</Button>
		</div>
	</div>
</template>

<style scoped></style>
