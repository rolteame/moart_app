<script setup lang="ts">
import logo from "~/assets/img/logo.png";
import moment from "moment";
import type { Investment } from "~/types";

const props = defineProps({
	investments: {
		type: Array as () => Investment[],
	},
	header: {
		type: String,
	},
  totalResults: {
    type: Number,
    default: 0
  }
});

const auth = useAuthStore();

const status = props.header === "Active Investments" ? "ACTIVE" : "CLAIMED";
</script>

<template>
	<div>
		<p class="lg:text-xl text:md my-auto font-bold">{{ header }}</p>
		<div class="flex justify-between items-center">
			<ScrollArea class="w-full whitespace-nowrap">
				<div class="flex py-3 space-x-4 w-max">
					<div
						v-for="investment in investments"
						:key="investment?.id"
						class="w-[400px]"
					>
						<Card class="rounded-2xl">
							<div
								class="lg:h-52 h-40 rounded-2xl bg-no-repeat bg-cover bg-center"
								:style="{
									backgroundImage: `url(${investment?.property?.image})`,
								}"
							>
								<div
									class="relative bg-gradient-to-b from-[#DD9933CC]/20 from-20% to-[#064274CC] w-full h-full rounded-2xl text-white p-4 flex justify-between items-end"
								></div>
							</div>
							<CardContent class="px-4 py-2 capitalize">
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Property Name:
									<span>{{ investment?.property?.propertyName }}</span>
								</p>
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Property Type:
									<span class="">{{ investment?.property?.propertyType }}</span>
								</p>
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Interest: <span>{{ investment?.property?.interest }} %</span>
								</p>
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Amount Invested:
									<span class="text-[#1B5DB1]">{{
										auth.formatPrice.format(investment?.amountInvested)
									}}</span>
								</p>
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Expected Return:
									<span class="text-green-600">{{
										auth.formatPrice.format(investment?.payoutAmount)
									}}</span>
								</p>
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Duration: <span>{{ investment?.duration }} Months</span>
								</p>
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Date Created:
									<span class="font-semibold text-[#4F4F4F]">{{
										moment(investment?.createdAt).format("LLL")
									}}</span>
								</p>
								<p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">
									Withdrawal Date:
									<span class="font-semibold text-[#4F4F4F]">{{
										moment(investment?.payoutDate).format("LLL")
									}}</span>
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<div class="w-[20%] flex flex-col justify-center items-center cursor-pointer" v-if="totalResults >= 2">
				<NuxtLink :to="`/user-dashboard/investments?status=${status}`">
          <LucideArrowRightCircle :size="70" stroke-width="1" class="mx-4" />
          <p class="text-center">View More</p>
        </NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
