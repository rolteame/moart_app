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
		// location.reload();
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

const deleteTeamMember = async (id: string, position: string) => {
	loading.value = true;
	try {
		const { data, error, refresh } = await useFetch<any>(
			`${config.public.backendUrl}/team/${id}`,
			{
				method: "DELETE",
				body: {
					position: position,
				},
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			}
		);

		if (error.value?.statusCode === 401) {
			useNuxtApp().$toast.error("Token expired, reftreshing token");
			await auth.resetToken();
			refresh();
			return;
		}

		if (error.value?.statusCode === 400) {
			useNuxtApp().$toast.error(error.value?.data.message);
			loading.value = false;
			return;
		}

		useNuxtApp().$toast.success("Member deleted successfully");
		loading.value = false;
		location.reload();
	} catch (error) {
		console.log(error);
	}
};
</script>
<template>
	<div v-if="!team">Loading</div>
	<div
		class="flex justify-between flex-col bg-white rounded-xl shadow-md px-4 py-3 content-center"
		v-else
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
						<div class="grid grid-cols-4 p-5 ">
							<TableCell class="font-medium flex flex-col">
								<span class="font-thick">{{ member.user.fullName }}</span>
								<span class="text-muted-foreground justify-items-center">{{
									member.user.email
								}}</span>
							</TableCell>
							<TableCell class="font-thick text-center capitalize">{{ member.user.role }}</TableCell>
							<TableCell class="font-thick">{{ member.position }}</TableCell>
							<TableCell class="justify-self-center flex gap-3"
								><LucideTrash2
									color="red"
									stroke-width="2"
									class="size-5 cursor-pointer"
									@click="deleteTeamMember(member.id, member.position)" /><span
									v-show="loading === true"
									class="w-34"
								>
									<svg
										class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1B5DB1] w-34"
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
									</svg> </span
							></TableCell>
						</div>
						<Separator />
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
