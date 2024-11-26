<script lang="ts" setup>
useHead({
	title: "Investments - Dashboard | Moart",
});

const tableHeader = ["Property Name", "Property Type", "interest", "Amount Invested", "Expected Return", "Duration", "Date Created", "Withdrawal Date"];

const auth = useAuthStore();
const config = useRuntimeConfig();
const route = useRoute();

const allUserInvestments = ref();
const userInvestments = ref();
const nextPageLoading: Ref<boolean> = ref(false);
const prevPageLoading: Ref<boolean> = ref(false);
const page: Ref<number> = ref(1);

  try {
	const { data, error } = await useFetch<any>(
		`${config.public.backendUrl}/investments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				user: `${auth.user.id}`,
				sortBy: "createdAt:desc",
        status: `${route.query.status}`
			},
		}
	);

	if (error.value?.data.code === 401) {
		useNuxtApp().$toast.error(error.value?.data.message);
		await auth.resetToken();
		location.reload();
	}

	if (error.value?.data.code === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
	}

	userInvestments.value = data.value?.results;
  allUserInvestments.value = data.value;
} catch (error) {
	console.log(error);
}

const nextPage = async () => {
	nextPageLoading.value = true;
	page.value = allUserInvestments.value?.page ? allUserInvestments.value?.page + 1 : 1;
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/payments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				page: page.value,
				sortBy: "createdAt:desc",
				user: `${auth.user.id}`,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		location.reload();
	}

	userInvestments.value = data.value.results;
	allUserInvestments.value = data.value;
	useNuxtApp().$toast.success("Page loaded");
	nextPageLoading.value = false;
};

const prevPage = async () => {
	prevPageLoading.value = true;
	page.value = allUserInvestments?.value?.page ? allUserInvestments?.value?.page - 1 : 1;
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/payments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				page: page.value,
				sortBy: "createdAt:desc",
				user: `${auth.user.id}`,
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		location.reload();
	}

	userInvestments.value = data.value.results;
	allUserInvestments.value = data.value;
	useNuxtApp().$toast.success("Page loaded");
	prevPageLoading.value = false;
  console.log(allUserInvestments.value);
};
</script>

<template>
	<div>
		<div
			class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
		>
			<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
				{{ route.query.status === "ACTIVE" ? "Active Investments" : "Claimed Investments" }}
			</p>
			<UserDetails />
		</div>
		<div
			class="bg-white rounded-xl shadow-md py-3 mt-3 content-center text-[#414141A8]"
		>
			<div class="container py-4 overflow-auto">
				<UserInvestmentTable
					:tableHeader="tableHeader"
					userType="investment"
					:userInvestments="userInvestments"
				/>
			</div>
			<!-- Pagination -->
			<div class="flex justify-end px-3 items-center py-3 mx-4">
				
				<div class="flex gap-4">
					<Button
						class="w-18 lg:w-28 bg-[#1B5DB1]"
						:disabled="allUserInvestments?.page === 1"
						@click="prevPage"
						><span v-show="prevPageLoading === true" class="flex items-center">
							<svg
								class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							<span>Loading</span>
						</span>
						<span v-show="prevPageLoading === false">Prev</span></Button
					>
					<Button
						class="w-18 lg:w-28 bg-[#1B5DB1]"
						:disabled="allUserInvestments?.page === allUserInvestments?.totalPages"
						@click="nextPage"
					>
						<span v-show="nextPageLoading === true" class="flex items-center">
							<svg
								class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							<span>Loading</span>
						</span>
						<span v-show="nextPageLoading === false">Next</span>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
