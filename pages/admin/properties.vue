<template>
	<div class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center">
		<p class="text-[#1B5DB1] text-xl my-auto font-bold">Properties List</p>

		<Button class="bg-[#1B5DB1]"><LucidePlus class="mr-3" :size="18"/> Add Property</Button>
	</div>
  <AdminPropertiesAnalytics />

  <div class="grid grid-cols-1 md:grid-cols-2 pt-7 gap-4 xl:grid-cols-3">
    <div v-for="i in 10" :key="i">
      <AdminPropertiesPropertyCard />
    </div>
  </div>
</template>
