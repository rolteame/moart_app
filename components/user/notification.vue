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
	);
	loading.value = false;
};

loadNotifications();
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
				<div v-show="loading === false" class="">
					<div v-show="notifications.length === 0">No notifications</div>
					<div
						v-show="notifications.length > 0"
						class="h-[83vh] overflow-y-auto py-1"
					>
						<SheetHeader v-for="(item, index) in notifications" :key="index">
							<div class="bg-[#1B5DB1]/20 p-1 rounded-md text-left">
								<SheetTitle class="pb-1">{{
									item.notification.subject
								}}</SheetTitle>
								<SheetDescription>
									{{ item.notification.message }}
								</SheetDescription>
								<div class="flex justify-end">
									<Button
										class="bg-[#1B5DB1] font-light my-1 mr-1 h-8 md:h-10"
										:class="item.read === true ? 'hidden' : 'bg-[#1B5DB1]'"
										>Mark as read</Button
									>
								</div>
							</div>
							<Separator
								:class="index === notifications.length - 1 ? 'hidden' : ''"
								class="my-2"
							/>
						</SheetHeader>
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-end contents-end flex-end">
				<Separator />
				<div class="pt-2 pr-4">
					<p class="text-base cursor-pointer text-right hover:text-[#1B5DB1]">
						Mark all as Read
					</p>
				</div>
			</div>
		</SheetContent>
	</Sheet>
</template>

<style scoped></style>
