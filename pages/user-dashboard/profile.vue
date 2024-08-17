<script lang="ts" setup>
useHead({
	title: "Profile - Dashboard | Moart",
});
</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">Profile</p>
	</div>
	<div class="w-full bg-white rounded-xl mt-4 shadow-lg text-[#414141A8]">
		<AdminProfileUpdateProfileForm />
	</div>
	<!--Reset Password-->
	<div class="bg-white rounded-xl shadow-md px-4 py-3 my-3 content-center">
		<AdminProfileUpdatePasswordForm />
	</div>
</template>
