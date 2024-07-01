<template>
	<div class="py-5">
		<AdminHeader />
	</div>

	<div class="flex gap-4">
    <div class="w-1/6">
      <AdminSidebar />
    </div>
		<div class="w-10/12 py-3 px-3 bg-[#D9D9D9] rounded-tl-lg overflow-y-auto h-[86.3vh]">
      <slot />
    </div>
	</div>
</template>
