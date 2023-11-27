<template>
	<section class="favourite">
		<h2>Favourite Products</h2>
		<TransitionGroup v-if="favouriteProducts.length" name="favourite_page" tag="div" class="favourite-cards">
			<ProductCard
				v-for="product in favouriteProducts"
				:key="product.id"
				:product="product"
			/>
		</TransitionGroup>
		<Empty v-else imageSrc="/favourite_empty.svg" title="У вас нет продуктов в избранных" />
	</section>
</template>

<script setup>
import { useStorageStore } from '@/store/storage';
import { storeToRefs } from 'pinia'
const { favouriteProducts } = storeToRefs(useStorageStore())
</script>

<style lang="scss" scoped>
.favourite {
	h2 {
		font-size: 32px;
	}
	&-cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 30px;
		margin-top: 30px;
	}
	.favourite_page-enter-active,
	.favourite_page-leave-active {
		transition: all 0.5s ease;
	}
	.favourite_page-enter-from,
	.favourite_page-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}
}
</style>
