<script setup lang="ts">
defineProps({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
});

defineEmits(["close", "confirm"]);
</script>

<template>
	<div
		class="absolute flex justify-center items-center p-12 w-[80%] h-[70%] backdrop-blur-md z-30"
	>
		<div class="w-[60%]">
			<Alert>
				<AlertTitle class="text-lg font-semibold">{{ title }}</AlertTitle>
				<Separator class="my-4" />
				<AlertDescription class="pt-3 pb-16">
					{{ description }}
				</AlertDescription>
				<div class="flex justify-end gap-5 pb-4">
					<Button class="bg-[#1B5DB1] text-white text-lg py-2 px-4"
						@click="$emit('confirm')"
						>Confirm</Button
					>
					<Button
						class="bg-[#FC464626] text-[#E11F1F] border text-lg p-2 w-32"
						@click="$emit('close')"
						>Cancel</Button
					>
				</div>
			</Alert>
		</div>
	</div>
</template>
