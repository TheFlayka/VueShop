<template>
	<div class="empty">
		<img :src="imageSrc" alt="" />
		<h2>{{ title }}</h2>
	</div>
</template>

<script setup>
const props = defineProps({
	imageSrc: String,
	title: String
})
</script>

<style lang="scss" scoped>
.empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 70vh;
	align-items: center;
	gap: 15px;
	img {
		width: 100px;
		@media (max-width: 630px) {
			width: 80px;
		}
	}
	h2 {
		font-size: 32px;
		@media (max-width: 630px) {
			font-size: 24px;
			text-align: center;
		}
	}
}
</style>
