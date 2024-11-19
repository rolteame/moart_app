<script lang="ts" setup>
useHead({
	title: "Transactions - Dashboard | Moart",
});

const tableHeader = ["Refrence ID", "Transaction ID", "Amount", "Status"];

const auth = useAuthStore();
const config = useRuntimeConfig();
const transactions = ref([]);
const allTransactions = ref();
const nextPageLoading: Ref<boolean> = ref(false);
const prevPageLoading: Ref<boolean> = ref(false);
const page: Ref<number> = ref(1);

try {
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/payments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				user: `${auth.user.id}`,
				sortBy: "createdAt:desc",
			},
		}
	);

	if (error.value?.statusCode === 401) {
		useNuxtApp().$toast.error(error.value?.data.message);
		await auth.resetToken();
		refresh();
		location.reload();
	}

	if (error.value?.statusCode === 400) {
		useNuxtApp().$toast.error(error.value?.data.message);
	}

	transactions.value = data.value.results;
	allTransactions.value = data.value;
} catch (error) {
	console.log(error);
}

const nextPage = async () => {
	nextPageLoading.value = true;
	page.value = allTransactions.value.page ? allTransactions.value.page + 1 : 1;
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
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/user-dashboard/listings");
	}

	transactions.value = data.value.results;
	allTransactions.value = data.value;
	useNuxtApp().$toast.success("Page loaded");
	nextPageLoading.value = false;
};

const prevPage = async () => {
	prevPageLoading.value = true;
	page.value = allTransactions?.value.page ? allTransactions?.value.page - 1 : 1;
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
			},
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		navigateTo("/admin/properties");
	}

	transactions.value = data.value.results;
	allTransactions.value = data.value;
	useNuxtApp().$toast.success("Page loaded");
	prevPageLoading.value = false;
};
</script>

<template>
	<div>
		<div
			class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
		>
			<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
				Transactions
			</p>
			<UserDetails />
		</div>
		<div
			class="bg-white rounded-xl shadow-md py-3 mt-3 content-center text-[#414141A8]"
		>
			<div class="container py-4 overflow-auto">
				<AdminTransactionsTransactionTable
					:tableHeader="tableHeader"
					userType="user"
					:transactions="transactions"
				/>
			</div>
			<div class="flex justify-end px-3 items-center py-3 mx-4">
				
				<div class="flex gap-4">
					<Button
						class="w-18 lg:w-28 bg-[#1B5DB1]"
						:disabled="allTransactions?.page === 1"
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
						:disabled="allTransactions?.page === allTransactions?.totalPages"
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
