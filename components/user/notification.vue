<script setup lang="ts">
const auth = useAuthStore();
const config = useRuntimeConfig();

const notifications: Ref<any> = ref([]);
const unreadNotifications: Ref<any> = ref([]);
const loading: Ref<boolean> = ref(false);
const loadingMore: Ref<boolean> = ref(false);

const loadNotifications = async () => {
	try {
		loading.value = true;
		const { data, error } = await useFetch<any>(
			`${config.public.backendUrl}/notification/${auth.user.id}`,
			{
				method: "GET",
				query: {
					sortBy: "createdAt:desc",
				},
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

		notifications.value = data.value;
		unreadNotifications.value = notifications.value?.results.filter(
			(item: any) => item.read === false
		);
		loading.value = false;
	} catch (error) {
		console.log(error);
	}
};

loadNotifications();

const loadMoreNotifications = async () => {
	try {
		loadingMore.value = true;
		const { data, error } = await useFetch<any>(
			`${config.public.backendUrl}/notification/${auth.user.id}`,
			{
				method: "GET",
				query: {
					sortBy: "createdAt:desc",
					page: notifications.value?.page + 1,
				},
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

		notifications.value.page = data.value.page;
		notifications.value.results = [...notifications.value.results, ...data.value.results];
		
		loadingMore.value = false;
	} catch (error) {
		console.log(error);
	}
};
</script>
<template>
	<Sheet>
		<SheetTrigger class="flex items-center"
			><LucideBell :size="24" stroke-width="1" @click="loadNotifications" />
			<span
				v-show="unreadNotifications.length > 0"
				class="bg-red-500 text-white w-5 rounded font-bold text-base lg:text-lg cursor-pointer"
				>{{ unreadNotifications.length }}</span
			>
			<span
				v-show="unreadNotifications.length === 0"
				class="bg-red-500 text-white w-5 rounded font-bold text-base md:text-lg cursor-pointer"
				>0</span
			>
		</SheetTrigger>
		<SheetContent side="right" class="flex flex-col">
			<p class="font-bold text-lg">Notifications</p>
			<div class="h-[85vh]">
				<div v-show="loading === true">Loading</div>
				<div v-show="loading === false">
					<div v-show="notifications?.results.length === 0">No notifications</div>
					<div
						v-show="notifications?.results.length > 0"
						class="h-[75vh] lg:h-[85vh] overflow-y-auto py-1"
					>
						<SheetHeader v-for="(item, index) of notifications?.results" :key="item.id">
							<UserNotificationItem
								:notification="item"
								:loadNotifications="loadNotifications"
							/>
							<Separator
								:class="index === notifications?.results.length - 1 ? 'hidden' : ''"
								class="my-2"
							/>
						</SheetHeader>
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-end contents-end flex-end">
				<Separator />
				<div class="pt-3 pr-4 flex justify-between items-center">
					<Button
						class="bg-[#1B5DB1] font-light w-[40%]"
						:disabled="notifications.page === notifications.totalPages"
						@click="loadMoreNotifications"
					>
						<span v-show="loadingMore === true" class="w-34 flex">
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
							<span>Loading</span>
						</span>
						<span v-show="loadingMore === false">Load More</span>
					</Button>
					<p class="text-base cursor-pointer text-right hover:text-[#1B5DB1]">
						Mark all as Read
					</p>
				</div>
			</div>
		</SheetContent>
	</Sheet>
</template>

<style scoped></style>
