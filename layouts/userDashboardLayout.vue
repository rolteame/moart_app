<script lang="ts" setup>
const isMobileNavOpen = ref(false);
const mobileNav = ref();

const openMobileNav = () => {
	isMobileNavOpen.value = true;
	mobileNav.value.classList.add("animate__animated", "animate__slideInLeft");
};

const closeMobileNav = () => {
	mobileNav.value.classList.remove("animate__animated", "animate__slideInLeft");
	mobileNav.value.classList.add("animate__animated", "animate__slideOutLeft");

	setTimeout(() => {
		isMobileNavOpen.value = false;
		mobileNav.value.classList.remove(
			"animate__animated",
			"animate__slideOutLeft"
		);
	}, 800);
};
</script>

<template>
	<div
		class=" flex justify-between py-3 px-5 items-center z-30 top-0 bg-white"
	>
		<LucideMenu
			:size="30"
			stroke-width="2"
			class="cursor-pointer lg:hidden"
			:class="isMobileNavOpen ? 'invisible' : 'visible'"
			@click="openMobileNav"
		/>
		<img
			src="~/assets/img/logo_full.png"
			alt="Moart Logo"
			class="w-16 lg:w-20 ms-3"
		/>
		<span><UserNotification /></span>
	</div>
	<!--Mobile Nav-->
	<div
		class="fixed top-0 left-0 w-1/2 md:w-1/3 h-screen border bg-white z-30 animate__animated animate__slideInLeft"
		ref="mobileNav"
		v-show="isMobileNavOpen"
	>
		<UserSidebar @close="closeMobileNav" />
	</div>
	<div class="py-2 hidden">
		<div class="lg:block">
			<UserHeader/>
		</div>
	</div>

	<div class="flex gap-4 h-[85vh]">
		<div class="lg:w-1/6 pt-4 hidden lg:block">
			<UserSidebar />
		</div>
		<div
			class="lg:w-10/12 w-full py-3 px-4 bg-[#D9D9D9] rounded-tl-lg overflow-y-auto h-fit lg:h-[89vh] md:h-[90vh]"
		>
			<slot />
		</div>
	</div>
</template>
