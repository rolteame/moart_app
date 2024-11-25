<script setup lang="ts">
import moment from "moment";

const auth = useAuthStore();
const config = useRuntimeConfig();
const userInvestments = ref();

const props = defineProps({
	userId: {
		type: String,
	},
});

try {
	const { data, error } = await useFetch<any>(
		`${config.public.backendUrl}/investments`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			query: {
				user: `${props.userId}`,
				sortBy: "createdAt:desc",
        status: "CLAIMED"
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
} catch (error) {
	console.log(error);
}
</script>

<template>
	<AlertDialog>
		<AlertDialogTrigger class="text-start hover:text-[#1B5DB1] focus:bg-[#1B5DB1] focus:text-white">
      <span class="font-lg px-2">View Claimed Investments</span>
    </AlertDialogTrigger>
		<AlertDialogContent class="py-2 text-xl">
			<AlertDialogCancel class="border-none flex justify-self-end"><LucideX color="red" /></AlertDialogCancel>
			<AlertDialogHeader>
				<AlertDialogTitle class="text-sm px-2"
					>Active Investment Details</AlertDialogTitle
				>
				<Separator />
				<AlertDialogDescription>
					<div class="overflow-y-auto h-[70vh]">
						<div
							class="border rounded my-1.5 p-2"
							v-for="userInvestment in userInvestments"
              :key="userInvestment.id"
              v-if="userInvestments?.length > 0"
						>
							<p>
								Property Name:
								<span class="font-semibold">{{
									userInvestment?.property.propertyName
								}}</span>
							</p>
							<p>
								Property Type:
								<span class="font-semibold">{{
									userInvestment?.property.propertyType
								}}</span>
							</p>
							<p>
								Interest:
								<span class="font-semibold"
									>{{ userInvestment?.property.interest }} %</span
								>
							</p>
							<p>
								Amount Invested:
								<span class="font-semibold text-[#1B5DB1]">{{
									auth.formatPrice.format(userInvestment?.amountInvested)
								}}</span>
							</p>
							<p>
								Expected Return:
								<span class="font-semibold text-[#1B5DB1]">{{
									auth.formatPrice.format(userInvestment?.payoutAmount)
								}}</span>
							</p>
							<p>
								Duration:
								<span class="font-semibold"
									>{{ userInvestment?.duration }} Months</span
								>
							</p>
							<p>
								Payment Status:
								<span
									class="font-semibold"
									:class="{
										'text-[#FF7B7B] capitalize': userInvestment.paymentStatus === 'DECLINED',
										'text-green-600 capitalize': userInvestment.paymentStatus === 'SUCCESS',
										'text-yellow-600': userInvestment.paymentStatus === 'PENDING',
									}"
									>{{ userInvestment?.paymentStatus }}</span
								>
							</p>
							<p>
								Investment Status:
								<span class="font-semibold"
                :class="{
										'text-green-500 capitalize': userInvestment.status === 'CLAIMED',
										'text-green-600 capitalize': userInvestment.status === 'ACTIVE',
										'text-yellow-600': userInvestment.status === 'PENDING',
									}"
                >{{
									userInvestment?.status
								}}</span>
							</p>
              <p>
								Date/Time Created:
								<span class="font-semibold"
									>{{ moment(userInvestment?.createdAt).format("LLL") }}</span
								>
							</p>
						</div>
            <div class="h-[70vh] w-full flex items-center justify-center" v-else>
              <p class="text-lg font-semibold">No Claimed Investments</p>
            </div>
					</div>
				</AlertDialogDescription>
			</AlertDialogHeader>
		</AlertDialogContent>
	</AlertDialog>
</template>

<style scoped></style>
