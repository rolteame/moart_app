<template>
	<div class="flex justify-between py-3 content-center my-3 overflow-x-auto">
		<div
			class="bg-white rounded-xl shadow-md lg:w-[30%] flex justify-between px-10 py-6 mr-4"
		>
			<p class="flex flex-col">
				<span class="md:text-4xl font-semibold pb-6 text-3xl">500</span>
				<span class="text-[#4F4F4F] text-lg">Total Properties</span>
			</p>
			<LucideLandmark
				:size="50"
				stroke-width="1"
				:color="'#1B5DB1'"
				class="my-auto"
			/>
		</div>
		<div
			class="bg-white rounded-xl shadow-md lg:w-[30%] flex justify-between px-10 py-6 mr-4"
		>
			<p class="flex flex-col">
				<span class="md:text-4xl text-3xl font-semibold pb-6">345</span>
				<span class="text-[#4F4F4F] md:text-lg text-md">Active Properties</span>
			</p>
			<LucideLandmark
				:size="50"
				stroke-width="1"
				:color="'green'"
				class="my-auto"
			/>
		</div>
		<div
			class="bg-white rounded-xl shadow-md lg:w-[30%] flex justify-between px-10 py-6"
		>
			<p class="flex flex-col">
				<span class="md:text-4xl text-3xl font-semibold pb-6">109</span>
				<span class="text-[#4F4F4F] text-lg">Inactive Properties</span>
			</p>
			<LucideLandmark
				:size="50"
				stroke-width="1"
				:color="'red'"
				class="my-auto"
			/>
		</div>
	</div>
</template>
