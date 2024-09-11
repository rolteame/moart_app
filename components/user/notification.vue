<script setup lang="ts">
const auth = useAuthStore();
const config = useRuntimeConfig();

const notifications: Ref<any> = ref([]);
const unreadNotifications: Ref<any> = ref([]);
const loading: Ref<boolean> = ref(false);

const loadNotifications = async () => {
	loading.value = true;
	const { data, error } = await useFetch<any>(
		`${config.public.backendUrl}/notification/${auth.user.id}`,
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
		location.reload();
	}

	notifications.value = data.value.results;
	unreadNotifications.value = notifications.value.filter(
		(item: any) => item.read === false
	)
	loading.value = false;
	console.log(notifications.value);
};

loadNotifications();
</script>
<template>
	<Sheet>
		<SheetTrigger class="flex items-center"
			><LucideBell :size="30" stroke-width="1" @click="loadNotifications" />
			<span
				v-show="unreadNotifications.length > 0"
				class="bg-red-500 text-white w-5 rounded font-bold text-lg cursor-pointer"
				>{{ unreadNotifications.length }}</span
			>
			<span
				v-show="unreadNotifications.length === 0"
				class="bg-red-500 text-white w-5 rounded font-bold text-lg cursor-pointer"
				>0</span
			>
			</SheetTrigger
		>
		<SheetContent side="right">
			<div v-show="loading === true">Loading</div>
			<div v-show="loading === false" class="mt-4 overflow-y-scroll h-[100vh]">
				<div v-show="notifications.length === 0">No notifications</div>
				<div v-show="notifications.length > 0">
					<SheetHeader v-for="item in notifications" :key="item.id">
						<div class="bg-[#1B5DB1]/20 p-1 rounded-md text-left">
							<SheetTitle class="pb-1">{{
								item.notification.subject
							}}</SheetTitle>
							<SheetDescription>
								{{ item.notification.message }}
							</SheetDescription>
							<div class="flex justify-end">
								<Button class="bg-[#1B5DB1] font-light my-1 mr-1 h-8 md:h-10"
									>Mark as read</Button
								>
							</div>
						</div>
						<Separator
							
							class="my-2"
						/>
					</SheetHeader>
				</div>
			</div>
		</SheetContent>
	</Sheet>
</template>

<style scoped></style>
