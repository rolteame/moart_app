<script setup lang="ts"></script>
<template>
	<div class="container-fluid">
		<img
			src="~/assets/img/bg-full.jpg"
			alt="Background Image"
			class="object-cover h-[100vh] w-full"
		/>
		<div
			class="absolute bg-gradient-to-br from-[#064274CC] from-20% to-[#DD9933CC] h-[100vh] w-full top-0 flex justify-center"
		>
			<!--Desktop Login Form View-->
			<div class="my-auto lg:flex w-[90vw] hidden h-[90vh]">
				<div class="w-[50%]">
					<img
						src="~/assets/img/bg-full.jpg"
						alt=""
						class="h-full object-cover rounded-s-3xl"
					/>
				</div>
				<div class="bg-white w-[50%] rounded-3xl -ms-5">
					<div class="m-10 text-md flex justify-end">
						<NuxtLink to="/login" class="me-10 py-2">Login</NuxtLink>
						<NuxtLink to="" class=""
							><button
								class="outline outline-2 outline-[#1B5DB1] py-2 px-10 rounded-full text-[#1B5DB1]"
							>
								Register
							</button></NuxtLink
						>
					</div>
					<div class="h-[80%] flex justify-center">
						<div>
							<img
								src="~/assets/img/logo.png"
								alt="Moart Logo"
								class="h-[60px] mx-auto"
							/>
							<p class="text-2xl pt-2 text-[#1B5DB1] font-medium text-center">
								Welcome Back
							</p>
							<div class="mt-14 w-72">
								<AuthLoginFormDesktop />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--Nobile Login Form View-->
			<div class="my-auto flex flex-col w-full lg:hidden justify-center">
				<div>
					<img
						src="~/assets/img/logo.png"
						alt="Moart Logo"
						class="h-[60px] mx-auto"
					/>
					<p class="text-2xl pt-2 text-white font-medium text-center">
						Login
					</p>
				</div>
				<div class="pt-5 px-7">
					<AuthLoginFormMobile />
				</div>
			</div>
		</div>
	</div>
</template>
