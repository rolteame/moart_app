<script lang="ts" setup>
useHead({
	title: "Register | Moart",
});
</script>

<template>
	<!--Desktop View-->
	<section class="lg:flex hidden">
		<div class="h-[100vh] w-[46%]">
			<img
				src="~/assets/img/bg-register.png"
				alt="Side Image"
				class="h-max w-full register-image-radius"
			/>
		</div>
		<div class="bg-white w-[54%] h-[100vh] px-28 pt-8">
			<div class="flex justify-end">
				<img src="~/assets/img/logo.png" alt="Moart Logo" class="w-32" />
			</div>
			<p class="text-[#1B5DB1] font-bold text-3xl pt-10">
				Account Registration
			</p>
			<div class="mt-10">
				<AuthRegisterForm />
			</div>
			<div class="pt-6">
				<p class="font-thin">
					Already have an account?
					<span class="font-bold text-[#1B5DB1]"
						><NuxtLink to="/login">Login</NuxtLink></span
					>
				</p>
			</div>
		</div>
	</section>

	<!--Mobile View-->
	<section class="lg:hidden text-white">
		<img
			src="~/assets/img/bg-full.jpg"
			alt="Background Image"
			class="relative object-cover h-[100vh] w-full"
		/>
		<div
			class="absolute bg-gradient-to-br from-[#064274CC] from-20% to-[#DD9933CC] h-[100vh] w-full top-0 flex flex-col justify-center px-8"
		>
			<div class="md:w-3/4 md:mx-auto">
				<div>
				<img
					src="~/assets/img/logo.png"
					alt="Moart Logo"
					class="h-[60px] mx-auto"
				/>
				<p class="text-4xl pt-1 pb-8 text-white font-medium text-center">
					Register
				</p>
			</div>
			<AuthRegisterForm />
			</div>
			<div class="pt-3">
				<p class="font-thin text-center">
					Already have an account?
					<span class="font-bold underline"
						><NuxtLink to="/login">Login</NuxtLink></span
					>
				</p>
			</div>
		</div>
	</section>
</template>
