<script lang="ts" setup>
const route = useRoute()
</script>

<template>
	<ul class="flex flex-col justify-between h-[77vh] font-normal">
		<div class=" ">
			<li><NuxtLink to="/admin" class="flex gap-3 content-center"><LucideLayoutGrid size="20" stroke-width="1"/>Dashboard</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><img src="~/assets/img/icons/properties.svg" alt="property icon">Properties</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><img src="~/assets/img/icons/investments.svg" alt="investment icon">Investment</NuxtLink></li>
      <li><NuxtLink to="" class="flex gap-3 content-center"><img src="~/assets/img/icons/transaction.svg" alt="transaction icon">Transactions</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><img src="~/assets/img/icons/users.svg" alt="user icon">Users</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><img src="~/assets/img/icons/team.svg" alt="team nav icon">Team</NuxtLink></li>
			<li><NuxtLink to="" class="flex gap-3 content-center"><img src="~/assets/img/icons/notification.svg" alt="notification icon">Notification</NuxtLink></li>
		</div>
		<div class="">
      <li><NuxtLink to="/admin/profile" class="flex gap-3 content-center"><img src="~/assets/img/icons/profile.svg" alt="profile icon">Profile</NuxtLink></li>
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