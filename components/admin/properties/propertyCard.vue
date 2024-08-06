<template>
	<div class="w-full">
		<Card class="flex flex-col rounded-t-2xl rounded-b-lg shadow-lg">
			<div
				class="bg-[url('~/assets/img/property_bg.jpg')] lg:h-52 h-40 rounded-2xl bg-cover"
			>
				<div
					class="relative bg-gradient-to-b from-[#DD9933CC]/20 from-20% to-[#064274CC] w-full h-full rounded-2xl text-white p-4 flex justify-between items-end"
				>
				 <p class="lg:text-xl text-lg font-semibold">Lekki Phase I</p>
				 <div>
					<NuxtLink to="/admin/properties/edit-property"><LucideSquarePen :size="25" stroke-width="1" class="mb-2 cursor-pointer" /></NuxtLink>
					<LucideTrash2 :size="25" stroke-width="1" color="red" class="cursor-pointer" />
				 </div>
				</div>
			</div>
			<CardContent>
        <div class="pt-6 px-2 lg:px-3 lg:text-xl text-md font-semibold text-[#4F4F4F]">
          <p class="flex justify-between"><span>Available Slot</span><span>16</span></p>
          <p class="flex justify-between"><span>Buy-in Price</span><span class="flex justify-center items-center"><img class="w-4 h-4" src="https://img.icons8.com/material-outlined/24/naira.png" alt="naira"/>1,500,000</span></p>
          <p class="flex justify-between"><span>Property Type</span><span>Land</span></p>
          <p class="flex justify-between"><span>Property Status</span><span class="text-green-500">Active</span></p>
          <p class="flex justify-between"><span>Interest</span><span class="text-[#1B5DB1]">10%</span></p>
          
        </div>
      </CardContent>
		</Card>
	</div>
</template>
