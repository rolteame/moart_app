<template>
	<div class="py-5">
		<AdminHeader />
	</div>

	<div class="flex gap-4">
    <div class="lg:w-1/6 pt-4 hidden lg:block">
      <AdminSidebar />
    </div>
		<div class="lg:w-10/12 w-full py-3 px-4 bg-[#D9D9D9] rounded-tl-lg overflow-y-auto h-[89vh]">
      <slot />
    </div>
	</div>
</template>
