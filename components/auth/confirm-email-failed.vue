

<template>
	<section class="container-fluid">
		<img
			src="~/assets/img/bg-full.jpg"
			alt="Background Image"
			class="object-cover h-[100vh] w-full"
		/>
		<div
			class="absolute bg-gradient-to-br from-[#064274CC] from-20% to-[#DD9933CC] h-[100vh] w-full top-0 flex justify-center"
		>
			<div class="my-auto flex flex-col justify-center w-[90vw] h-[90vh] bg-white">
				<img src="~/assets/img/amico.png" alt="Verification" class="lg:w-[300px] mx-auto w-[200px]" />
				<div class="text-center py-5 px-3" >
					<h3 class="text-[#1B5DB1] text-3xl font-semibold pb-3">Verification Code Expired</h3>
				</div>
				<Button class="lg:w-[30%] w-[50%] mx-auto mt-5 bg-[#1B5DB1]">Resend Verification Email</Button>
				<NuxtLink to="/login" class="text-center mt-5 underline" >Go to Login</NuxtLink>
			</div>
		</div>
	</section>
</template>

<style scoped></style>
