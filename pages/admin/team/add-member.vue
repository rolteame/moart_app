<script lang="ts" setup>
useHead({
	title: "Add Team Member - Admin | Moart",
});
</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
			Add Team Member
		</p>
	</div>

	<div class="w-full bg-white rounded-xl mt-4 shadow-lg text-[#414141A8]">
		<AdminTeamAddMemberForm />
	</div>
</template>
