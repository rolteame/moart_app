<script lang="ts" setup>
useHead({
	title: "Notifications - Admin | Moart",
});
</script>

<template>
	<div
		class="flex justify-between bg-white rounded-xl shadow-md px-4 py-3 content-center"
	>
		<p class="text-[#1B5DB1] lg:text-xl text:md my-auto font-bold">
			Notifications
		</p>
	</div>
	<div
		class="bg-white rounded-xl shadow-md px-4 py-3 mt-3 content-center text-[#4F4F4FA8]"
	>
		<p class="font-semibold text-lg">Send Email To All User’s</p>
		<form class="p-4 space-y-5" @submit.prevent="submit">
			<!--Subject-->
			<FormField v-slot="{ componentField }" name="subject">
				<FormItem class="">
					<FormLabel>Subject</FormLabel>
					<FormControl>
						<Input v-bind="componentField" type="text" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<!--Message-->
			<div>
				<FormField v-slot="{ componentField }" name="message">
					<FormItem>
						<FormLabel>Message</FormLabel>
						<FormControl>
							<Textarea
								v-bind="componentField"
								class="resize-none lg:h-40"
							></Textarea>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			<div class="space-x-4 flex justify-between md:justify-normal">
				<Button type="submit" class="bg-[#1B5DB1] text-white text-lg px-3 py-2">Send Notification</Button>
			</div>
		</form>
	</div>
</template>
