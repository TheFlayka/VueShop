<template>
	<section class="search">
		<h2>Search Result</h2>
		<TransitionGroup
			v-if="searchProducts.length"
			name="search_page"
			tag="div"
			class="search-cards"
		>
			<ProductCard
				v-for="product in searchProducts"
				:key="product.id"
				:product="product"
			/>
		</TransitionGroup>
		<Empty v-else imageSrc="/search_empty.svg" title="Мы не нашли ничего в поиске" />
	</section>
</template>

<script setup>
import { useSearchProductsStore } from '@/store/searchProducts.js'
const store = useSearchProductsStore()

import { storeToRefs } from 'pinia'
const { searchProducts } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.search {
	h2 {
		font-size: 32px;
	}
	&-cards {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 30px;
		margin-top: 30px;
		
		.search_page-enter-active,
		.search_page-leave-active {
			transition: all 0.5s ease;
		}
		.search_page-enter-from,
		.search_page-leave-to {
			opacity: 0;
			transform: translateY(30px);
		}
	}
}
</style>