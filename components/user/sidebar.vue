<script lang="ts" setup>
defineEmits(["close"]);

const auth = useAuthStore();

const route = useRoute();
const patharray = ref(route.path.split("/"));
</script>

<template>
	<div
		class="flex cursor-pointer ms-6 mb-7 mt-4 space-x-2 lg:hidden"
		@click="$emit('close')"
	>
		<LucideMoveLeft /><span>Close</span>
	</div>
	<ul class="flex flex-col justify-between h-[80vh] lg:h-[77vh] font-normal">
		<div>
			<li @click="$emit('close')">
				<NuxtLink to="/user-dashboard" class="flex gap-3 content-center"
					><LucideLayoutGrid :size="20" stroke-width="1" />Dashboard</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink
					to="/user-dashboard/listings/"
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('listings') }"
					><LucideLandmark :size="20" stroke-width="1" />Listings</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink
					to="/user-dashboard/transactions/"
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('transactions') }"
					><LucideBadgeDollarSign
						:size="20"
						stroke-width="1"
					/>Transactions</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink to="/user-dashboard/notifications" class="flex gap-3 content-center" :class="{ 'text-[#1B5DB1]': patharray.includes('notifications') }"
					><LucideUserRoundCog :size="20" stroke-width="1" />Notifications</NuxtLink
				>
			</li>
		</div>
		<div class="mt-auto">
			<li @click="$emit('close')">
				<NuxtLink to="/user-dashboard/profile" class="flex gap-3 content-center" :class="{ 'text-[#1B5DB1]': patharray.includes('profile') }"
					><LucideUser :size="20" stroke-width="1" />Profile</NuxtLink
				>
			</li>
			<li class="flex gap-3 content-center cursor-pointer lg:ps-14 py-3 ps-8" @click.prevent="auth.logout()">
				<img src="~/assets/img/icons/logout.svg" alt="logout icon" />Logout
			</li>
		</div>
	</ul>
</template>

<style scoped>
li a {
	@apply py-3 lg:ps-14 ps-8;
}
.router-link-exact-active {
	@apply text-[#1B5DB1];
}
</style>
