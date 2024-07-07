<template>
	<div class="py-3">
		<div class="lg:hidden flex justify-between px-5 items-center" >
			<LucideMenu :size="30" stroke-width="2"  class="cursor-pointer" />
			<img src="~/assets/img/logo_full.png" alt="Moart Logo" class="w-16 lg:w-20 ms-12" >
		</div>
		<div  class="hidden lg:block">
			<AdminHeader />
		</div>
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
