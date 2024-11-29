<script lang="ts" setup>
useHead({
	title: "Email Confirmed | Moart",
});

const loading = ref(false);
const response = ref();
const route = useRoute();
const config = useRuntimeConfig();

const confirmEmail = async () => {
	loading.value = true;
	const { data, error }: any = await useFetch(
		`${config.public.backendUrl}/auth/verify-email`,
		{
			method: "POST",
			query: { token: route.params.id },
			headers: {
				Authorization: `Bearer ${route.params.id}`,
			},
		}
	);

	if (error.value.data.code === 401) {
		response.value = false;
		loading.value = false;
		return;
	}
	response.value = true;
};

confirmEmail();
</script>

<template>
	<p
		v-show="loading === true"
		class="text-center flex items-center justify-center h-screen"
	>
		Loading ...
	</p>
	<div v-show="loading === false">
		<AuthConfirmEmailFailed v-show="response === false" />
		<section class="container-fluid" v-show="response === true">
			<img
				src="~/assets/img/bg-full.jpg"
				alt="Background Image"
				class="object-cover h-[100vh] w-full"
			/>
			<div
				class="absolute bg-gradient-to-br from-[#064274CC] from-20% to-[#DD9933CC] h-[100vh] w-full top-0 flex justify-center"
			>
				<div
					class="my-auto flex flex-col justify-center w-[90vw] h-[90vh] bg-white"
				>
					<img
						src="~/assets/img/confirmation.png"
						alt="Verification"
						class="lg:w-[200px] mx-auto w-[150px]"
					/>
					<div class="text-center py-5 px-3">
						<h3 class="text-[#1B5DB1] text-3xl font-semibold pb-3">
							Email Verified
						</h3>
						<p>Your mail address has successfully been verified</p>
					</div>
					<Button class="lg:w-[30%] w-[50%] mx-auto mt-5 bg-[#1B5DB1]"
						><NuxtLink to="/login">Go to Login</NuxtLink></Button
					>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped></style>
