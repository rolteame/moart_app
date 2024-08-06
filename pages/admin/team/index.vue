<script setup lang="ts">
useHead({
	title: "Team - Admin | Moart",
});
</script>
<template>
	<div
		class="flex justify-between flex-col bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">Teams</p>
		<p class="text-[#3A3A3AA8] text-base">
			You can add and remove team members
		</p>
	</div>
	<div class="bg-white rounded-xl shadow-md px-4 py-3 mt-3 content-center">
		<!--Search / Add Member Section-->
		<div class="flex flex-col md:flex-row gap-3 justify-between">
			<!--Search-->
			<div class="relative w-full max-w-sm items-center">
				<Input
					id="search"
					type="text"
					placeholder="Search by name or email"
					class="pl-10 text-lg"
				/>
				<span
					class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
				>
					<LucideSearch stroke-width="2" class="size-5 text-muted-foreground" />
				</span>
			</div>
			<NuxtLink to="/admin/properties/add-property"
				><Button class="bg-[#1B5DB1] text-white text-base py-2 px-4"
					><LucidePlus :size="20" stroke-width="1" /> Add Member</Button
				></NuxtLink
			>
		</div>
		<!--Team Memebers Table Section-->
		<div class="overflow-x-auto">
			<Table class="mt-3 flex flex-col w-[700px] md:w-full">
				<TableHeader>
					<TableRow class="grid grid-cols-3 p-5 font-semibold text-xl">
						<TableHead class="w-[100px]"> Member </TableHead>
						<TableHead class="justify-self-center">Role</TableHead>
					</TableRow>
					<Separator />
				</TableHeader>
				<TableBody class="mt-3 flex flex-col">
					<TableRow v-for="i in 5" :key="i">
						<div class="grid grid-cols-3 p-5 items-center">
							<TableCell class="font-medium flex flex-col">
								<span class="font-thick">Jenny Wilson</span>
								<span class="text-muted-foreground justify-items-center"
									>michael.mitc@example.com</span
								>
							</TableCell>
							<TableCell class="font-thick justify-self-center"
								>Owner</TableCell
							>
							<TableCell class="justify-self-center"
								><LucideTrash2
									color="red"
									stroke-width="2"
									class="size-5 cursor-pointer"
							/></TableCell>
						</div>
						<Separator />
					</TableRow>
				</TableBody>
			</Table>
		</div>
	</div>
</template>

<style scoped></style>
