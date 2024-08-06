<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { columns } from "~/components/user-list/columns";
import DataTable from "~/components/user-list/DataTable.vue";
import type { User } from "~/types/authTypes";

useHead({
	title: "Users - Admin | Moart",
});
const data = ref<User[]>([]);

const getData = async (): Promise<User[]> => {
	return [
	{
		id: "728ed52f",
		name: "Rotimi",
		status: "pending",
		email: "am@example.com",
	},
	{
		id: "728ed52f",
		name: "samuel",
		status: "pending",
		email: "m@example.com",
	},
	{
		id: "728ed52f",
		name: "sammy",
		status: "success",
		email: "cm@example.com",
	},
	{
		id: "728ed52f",
		name: "Rotimi",
		status: "pending",
		email: "am@example.com",
	},
	
]
}

onMounted(async () => {
	data.value = await getData();
})

</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">Users</p>
	</div>
	<div
		class="bg-white rounded-xl shadow-md px-4 py-3 mt-3 content-center text-[#414141A8]"
	>
		<form action="" class="md:grid md:grid-cols-4 justify-items-start">
			<!--Search by Users-->
			<FormField v-slot="{ componentField }" name="search">
				<FormItem class="w-full md:w-[90%] my-2">
					<FormLabel class="text-lg">Search By Users</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="text" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Status-->
			<FormField v-slot="{ componentField }" name="status">
				<FormItem class="w-full md:w-[90%] my-2">
					<FormLabel class="text-lg">Status</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="All"> All </SelectItem>
								<SelectItem value="active"> Active </SelectItem>
								<SelectItem value="inactive"> In-active </SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--From Date-->
			<FormField v-slot="{ componentField }" name="fromDate">
				<FormItem class="flex flex-col w-full md:w-[90%] my-2">
					<FormLabel class="text-lg">From Date</FormLabel>
					<FormControl>
						<input
							class="border py-1.5 px-2 rounded"
							v-bind="componentField"
							type="date"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--To Date-->
			<FormField v-slot="{ componentField }" name="toDate">
				<FormItem class="flex flex-col w-full md:w-[90%] my-2">
					<FormLabel class="text-lg">To Date</FormLabel>
					<FormControl>
						<input
							class="border py-1.5 px-2 rounded"
							v-bind="componentField"
							type="date"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<!--Submit Button-->
			<div class="w-full md:col-span-4 md:flex md:justify-center mt-10 mb-5">
				<Button class="bg-[#1B5DB1] w-full md:w-[80%]"
					><LucideSearch />Search</Button
				>
			</div>
		</form>
	</div>
	<div
		class="bg-white rounded-xl shadow-md px-4 py-3 mt-3 content-center text-[#414141A8]"
	>
		<template>
			<div class="container py-10 mx-auto">
				<DataTable :columns="columns" :data="data" />
			</div>
		</template>
	</div>
</template>

<style scoped></style>
