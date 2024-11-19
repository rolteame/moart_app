<script setup lang="ts">
useHead({
	title: "Team - Admin | Moart",
});
const config = useRuntimeConfig();
const auth = useAuthStore();
const router = useRouter();

const loading = ref(false);
const team: Ref<any> = ref([]);


try {
	const { data, error, refresh } = await useFetch<any>(
		`${config.public.backendUrl}/team`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${auth.token}`,
			},
			// lazy: true,
		}
	);

	if (error.value?.statusCode === 401) {
		await auth.resetToken();
		refresh();
		location.reload();
	}

	if (error.value?.statusCode === 500) {
		useNuxtApp().$toast.error(error.value?.data.message);
		loading.value = false;
		team.value = [];
	}

	team.value = data.value?.results;
} catch (error) {
	console.log(error);
}

</script>
<template>
	<!-- <div v-if="!team">Loading</div> -->
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
			<NuxtLink to="/admin/team/add-member"
				><Button class="bg-[#1B5DB1] text-white text-base py-2 px-4"
					><LucidePlus :size="20" stroke-width="1" /> Add Member</Button
				></NuxtLink
			>
		</div>
		<!--Team Memebers Table Section-->
		<div class="overflow-x-auto">
			<Table class="mt-3 flex flex-col w-[700px] md:w-full">
				<TableHeader>
					<TableRow class="grid grid-cols-4 p-5 text-xl font-bold">
						<TableHead> Member </TableHead>
						<TableHead class="text-center">Role</TableHead>
						<TableHead>Position</TableHead>
					</TableRow>
					<Separator />
				</TableHeader>
				<TableBody class="mt-3 flex flex-col">
					<TableRow
						v-for="member in team"
						:key="member"
						v-if="team?.length > 0"
					>
						<AdminTeamMemberItem :member="member" />
					</TableRow>
					<TableRow col-span="3" class="text-center py-5 text-xl" v-else
						>No Team Members</TableRow
					>
				</TableBody>
			</Table>
		</div>
	</div>
</template>

<style scoped></style>
