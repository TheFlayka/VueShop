<template>
	<div class="product-card">
		<img
			class="product-card_favourite"
			@click="editStatus('favourite')"
			:src="favourite ? '/favourite_fill.svg' : '/favourite.svg'"
			alt=""
		/>
		<img class="product-card_img" v-lazy="product.thumbnail" alt="" />
		<div class="product-card-info">
			<RouterLink :to="'/products/' + product.id ">
				<h2>{{ product.title }}</h2>
				<Price :price="product.price" :discountPercentage="product.discountPercentage" />
				<p>Stock: {{ product.stock }}</p>
			</RouterLink>
			<button @click="editStatus('cart')">
				{{ cart ? 'Remove' : 'Add' }} Cart
			</button>
		</div>
	</div>
</template>

<script setup>
// Vue Import
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
	product: Object,
})

// Status Storage Product. Это статус нашего продукта, он показывает находиться ли продукт в корзине или избранном или нет
const favourite = ref(false)
const cart = ref(false)
		
// Import Store
import { useStorageStore } from '@/store/storage';
import { storeToRefs } from 'pinia'
const { editStorage } = useStorageStore()
const { cartProducts, favouriteProducts } = storeToRefs(useStorageStore())

// Get Status
onMounted(() => {
	if (
		JSON.parse(localStorage.getItem('cart')) ||
		JSON.parse(localStorage.getItem('cart')) 
	) {
		cart.value =
			cartProducts.value.find(product => product.id === props.product.id) || false
		favourite.value =
			favouriteProducts.value.find(product => product.id === props.product.id) ||
			false
	} else {
	}
})	

// Функция изменения статуса и добавления или удаления продукта из хранилища. Сначала мы спрашиваем тип, а затем добавляем и изменяем статус
function editStatus(type) {
	if (type === 'favourite') {
		editStorage('favourite', favourite.value, props.product)
		favourite.value === false ? favourite.value = true : favourite.value = false
	} else {
		editStorage('cart', cart.value, props.product)
		cart.value === false ? cart.value = true : cart.value = false
	}
}
</script>

<style lang="scss" scoped>
@import './ProductsCard.scss';
</style>
