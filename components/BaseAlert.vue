<script setup lang="ts">
defineProps({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	loading: {
		type: Boolean,
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
					<Button
						class="bg-[#1B5DB1] text-white text-lg py-2 px-4"
						@click="$emit('confirm')"
					>
						<span v-show="loading === true" class="w-34">
							<svg
								class="animate-spin -ml-1 mr-3 h-5 w-5 text-white w-34"
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
							</svg>
						</span>
						<span v-show="loading === false">Confirm</span>
					</Button>
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
