<template>
	<div class="navbar-search">
		<div class="navbar-search-input">
			<img
				@click="searchText ? (searchText = '') : ''"
				:src="searchText ? '/close.svg' : '/search.svg'"
				alt=""
			/>
			<input
				type="text"
				placeholder="Search products..."
				v-model="searchText"
			/>
			<router-link to="/search">Search</router-link>
		</div>
		<div class="navbar-search-output" v-if="open && searchText" ref="modal">
			<RouterLink
				class="navbar-search-output-item"
				v-for="product in searchProducts"
				:key="product.id"
				v-if="searchProducts.length"
				:to="'/products/' + product.id"
			>
				<img :src="product.thumbnail" alt="" />
				<div class="navbar-search-output-item-info">
					<h2>{{ product.title }}</h2>
					<Price
						:price="product.price"
						:discountPercentage="product.discountPercentage"
					/>
				</div>
			</RouterLink>
			<div v-else>Продукты не найдены</div>
		</div>
	</div>
</template>

<script setup>
// Vue Import
import { ref, watch } from 'vue'

// Search
// Pinia (Search Products)
import { useSearchProductsStore } from '@/store/searchProducts.js'
import { storeToRefs } from 'pinia'
const store = useSearchProductsStore()

const { getSearchProducts } = store // Get Search Products
const { searchProducts } = storeToRefs(store) // Array Search Products

// Function Search (Input)
const searchText = ref('')

// Watch Function (SearchText)
watch(searchText, value => {
	if (searchText.value) {
		getSearchProducts(value)
		open.value = true
	} else {
		searchProducts.value = []
	}
})

// Vue Use (Close Modal)
import { onClickOutside } from '@vueuse/core'

const modal = ref()
const open = ref(true)

onClickOutside(modal, () => {
	open.value = false
})
</script>

<style lang="scss" scoped>
@import './Navbar.scss';
</style>
