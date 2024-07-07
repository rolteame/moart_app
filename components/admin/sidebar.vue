<script lang="ts" setup>

const route = useRoute()
</script>

<template>
	<ul class="flex flex-col justify-between h-[77vh] font-normal">
		<div class=" ">
			<li><NuxtLink to="/admin" class="flex gap-3 content-center"><LucideLayoutGrid :size="20" stroke-width="1"/>Dashboard</NuxtLink></li>
			<li><NuxtLink to="/admin/properties" class="flex gap-3 content-center"><LucideLandmark :size="20" stroke-width="1"/>Properties</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><LucideBaggageClaim :size="20" stroke-width="1"/>Investment</NuxtLink></li>
      <li><NuxtLink to="" class="flex gap-3 content-center"><LucideBadgeDollarSign :size="20" stroke-width="1"/>Transactions</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><LucideUserRoundCog :size="20" stroke-width="1"/>Users</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><LucideUsers :size="20" stroke-width="1"/>Team</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><LucideBellDot :size="20" stroke-width="1"/>Notification</NuxtLink></li>
		</div>
		<div class="">
      <li><NuxtLink to="/admin/profile" class="flex gap-3 content-center"><LucideUser :size="20" stroke-width="1"/>Profile</NuxtLink></li>
      <li class="flex gap-3 content-center cursor-pointer lg:ps-14 py-3"><img src="~/assets/img/icons/logout.svg" alt="logout icon">Logout</li>
    </div>
	</ul>
</template>

<style scoped>
li a {
  @apply py-3 lg:ps-14 ps-8;

}
.router-link-exact-active {
  @apply text-[#1B5DB1]
  
}

</style>