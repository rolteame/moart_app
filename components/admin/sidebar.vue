<script lang="ts" setup>
defineEmits(["close"]);
const auth = useAuthStore();

const route = useRoute();
const patharray = ref(route.path.split("/"));

const logout = async () => {
	const { data, error } = await useFetch<any>(
		`https://moart-backend.onrender.com/v1/auth/logout`,
		{
			method: "POST",
			body: {
				refreshToken: auth.refreshToken,
			},
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		useNuxtApp().$toast.error("Token expired, Kindly relogin");
		auth.token = "";
		auth.user = "";
		auth.refreshToken = "";
		auth.isLoggedin = false;
		setTimeout(() => {
			navigateTo("/login");
		}, 2000);
		return;
	}

	if (error.value?.statusCode === 404) {
		useNuxtApp().$toast.error("Token expired, Kindly relogin");
		auth.token = "";
		auth.user = "";
		auth.refreshToken = "";
		auth.isLoggedin = false;
		setTimeout(() => {
			navigateTo("/login");
		}, 2000);
		return;
	}

	if (error.value?.statusCode === 429) {
		useNuxtApp().$toast.error("Token expired, Kindly relogin");
		auth.token = "";
		auth.user = "";
		auth.refreshToken = "";
		auth.isLoggedin = false;
		setTimeout(() => {
			navigateTo("/login");
		}, 2000);
		return;
	}

	useNuxtApp().$toast.success("Logout successful");
	auth.token = "";
	auth.user = "";
	auth.refreshToken = "";
	auth.isLoggedin = false;
	setTimeout(() => {
		navigateTo("/login");
	}, 2000);
};
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
				<NuxtLink to="/admin" class="flex gap-3 content-center"
					><LucideLayoutGrid :size="20" stroke-width="1" />Dashboard</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink to="/admin/properties/" class="flex gap-3 content-center"
					><LucideLandmark :size="20" stroke-width="1" />Properties</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink
					to=""
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('investments') }"
					><LucideBaggageClaim
						:size="20"
						stroke-width="1"
					/>Investment</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink
					to="/admin/transactions/"
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('transactions') }"
					><LucideBadgeDollarSign
						:size="20"
						stroke-width="1"
					/>Transactions</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink
					to="/admin/users"
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('users') }"
					><LucideUserRoundCog :size="20" stroke-width="1" />Users</NuxtLink
				>
			</li>
			<li @click="$emit('close')" v-show="auth.user.role === 'superadmin'">
				<NuxtLink
					to="/admin/team"
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('team') }"
					><LucideUsers :size="20" stroke-width="1" />Team</NuxtLink
				>
			</li>
			<li @click="$emit('close')">
				<NuxtLink
					to="/admin/notifications"
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('notifications') }"
					><LucideBellDot :size="20" stroke-width="1" />Notification</NuxtLink
				>
			</li>
		</div>
		<div class="mt-auto">
			<li @click="$emit('close')">
				<NuxtLink
					to="/admin/profile"
					class="flex gap-3 content-center"
					:class="{ 'text-[#1B5DB1]': patharray.includes('profile') }"
					><LucideUser :size="20" stroke-width="1" />Profile</NuxtLink
				>
			</li>
			<li
				class="flex gap-3 content-center cursor-pointer lg:ps-14 py-3 ps-8"
				@click.prevent="logout"
			>
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
