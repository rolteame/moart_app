<script setup lang="ts">
import logo from "~/assets/img/logo.png";

defineProps({
	investments: Array,
	header: String
})
</script>

<template>
	<div>
    <p class="lg:text-xl text:md my-auto font-bold">My Investments</p>
		<ScrollArea class="w-full whitespace-nowrap">
			<div class="flex py-3 space-x-4 w-max">
				<div v-for="item in 5" :key="item" class="w-[400px]">
					<Card class="rounded-2xl">
						<div
							class="lg:h-52 h-40 rounded-2xl bg-no-repeat bg-cover bg-center"
							:style="{ backgroundImage: `url(${logo})` }"
						>
							<div
								class="relative bg-gradient-to-b from-[#DD9933CC]/20 from-20% to-[#064274CC] w-full h-full rounded-2xl text-white p-4 flex justify-between items-end"
							>
								
							</div>
						</div>
            <CardContent class="px-4">
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Name: <span>New Property</span></p>
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Slot Price: <span>New Pricwe</span></p>
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Slot Price: <span>New Pricwe</span></p>
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Slot Price: <span>New Pricwe</span></p>
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Slot Price: <span>New Pricwe</span></p>
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Slot Price: <span>New Pricwe</span></p>
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Slot Price: <span>New Pricwe</span></p>
              <p class="lg:text-lg text-sm font-semibold text-[#4F4F4F]">Property Slot Price: <span>New Pricwe</span></p>
            </CardContent>
					</Card>
				</div>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	</div>
</template>

<style scoped></style>
