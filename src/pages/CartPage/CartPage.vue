<template>
	<section class="cart">
		<h2>Cart Products</h2>
		<div class="cart-content" v-if="cartProducts.length">
			<div class="cart-content-cards">
				<button @click="clearBasket">Clear Basket</button>
				<CartPageCard
					:product="product"
					v-for="product in cartProducts"
					:key="product.id"
				/>
			</div>
			<div class="cart-content-check">
				<h3>Check</h3>
				<h2>
					Result Price: <span>{{ formatPrice(resultPrice + 10) }}</span>
				</h2>
				<hr />
				<p>Number of products: {{ cartProducts.length }}</p>
				<p>Delivery: 10,00 $ (on Mars)</p>
				<hr />
				<a
					target="_blank"
					href="https://www.youtube.com/watch?v=i13Riqmd1dk&ab_channel=%D0%92%D0%B5%D0%BB%D1%8C%D0%BC%D0%B8"
					>Buy</a
				>
			</div>
		</div>
		<Empty
			v-else
			imageSrc="/basket_empty.svg"
			title="У вас нет продуктов в корзине"
		/>
	</section>
</template>

<script setup>
// Components
import CartPageCard from '@/components/CartPageCard/CartPageCard.vue'

// Result Price
import { ref, computed } from 'vue'

import { formatPrice } from '@/utils/formatPrice.js'

import { useStorageStore } from '@/store/storage'
import { storeToRefs } from 'pinia'
const { cartProducts } = storeToRefs(useStorageStore())

// Здесь мы с помощью forEach из каждого продукта достаем цену и добавляем к итоговой, и в конце возвращаем
const resultPrice = computed(() => {
	const price = ref(0)
	cartProducts.value.forEach(product => {
		price.value += Math.round(
			(product.price - (product.price * product.discountPercentage) / 100) *
				product.account
		)
	})
	return price.value
})

function clearBasket() {
	cartProducts.value = []
	localStorage.setItem('cart', JSON.stringify(cartProducts.value))
}
</script>

<style lang="scss" scoped>
@import './CartPage.scss';
</style>
