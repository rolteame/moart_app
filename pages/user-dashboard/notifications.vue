<script lang="ts" setup>

useHead({
	title: "Notifications - Dashboard | Moart",
});

const auth = useAuthStore();
</script>

<template>
  <div>
    <div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">Notifications</p>
		<UserDetails />
	</div>
  </div>
</template>