<template>
	<section class="product-page">
		<div class="product-page-img">
			<Swiper
				:direction="width > 925 ? 'vertical' : 'horizontal'"
				:space-between="25"
				:breakpoints="breakpoints"
			>
				<SwiperSlide @click="currentImg = img" v-for="(img, idx) in productObj.images" :key="idx"
					><img
						:style="{
							border: currentImg === img ? '2px solid var(--primary)' : 'none',
						}"
						v-lazy="img"
						alt=""
				/></SwiperSlide>
			</Swiper>
			<img v-lazy="currentImg" alt="" />
		</div>
		<div class="product-page-info">
			<h2>{{ productObj.title }}</h2>
			<span>{{ productObj.brand }}</span>
			<p>
				{{ productObj.description }}
			</p>
			<Price :price="productObj.price" :discountPercentage="productObj.discountPercentage" />
			<div class="product-page-info-storage">
				<button
					@click="
						editStorage('cart', cart, productObj),
							cart === false ? (cart = true) : (cart = false)
					"
				>
					{{ cart ? 'Remove' : 'Add' }} Cart
				</button>
				<img
					class="product-page-info-storage_favourite"
					@click="
						editStorage('favourite', favourite, productObj),
							favourite === false ? (favourite = true) : (favourite = false)
					"
					:src="favourite ? '/favourite_fill.svg' : '/favourite.svg'"
					alt=""
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
// Vue Import
import { ref, onMounted } from 'vue'

// Swiper
// Import Swiper Vue components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/scss'

// Current Img Slider || Текущая картинка
const currentImg = ref('') 

// Get Product Function || Определяем какой продукт и получаем его
import { useRoute } from 'vue-router'
import axios from 'axios'

const router = useRoute()
const productObj = ref({})

async function getProduct() {
	try {
		const res = await axios.get(
			`https://dummyjson.com/products/${router.params.id}`
		)
		productObj.value = res.data
	} catch (error) {
		console.error(`Ошибка получения продукта: ${error}`)
	}
}

// Cart or Favourite Add or Remove || Тут у нас статус, да да точно такой же как и в ProductCard
const favourite = ref(false)
const cart = ref(false)

import { useStorageStore } from '../../store/storage'
import { storeToRefs } from 'pinia'
const { editStorage } = useStorageStore()
const { cartProducts, favouriteProducts } = storeToRefs(useStorageStore())

onMounted(async () => {
	await getProduct()
	currentImg.value = productObj.value.images[0]
	if (
		JSON.parse(localStorage.getItem('cart')) ||
		JSON.parse(localStorage.getItem('favourite'))
	) {
		cart.value =
			cartProducts.value.find(product => product.id === productObj.value.id) ||
			false

		favourite.value =
			favouriteProducts.value.find(
				product => product.id === productObj.value.id
			) || false
	} else {
	}
})

const width = window.innerWidth // При запуске получаем разрешение экрана, для слайдера чтоб из вертикали стал горизонтальным

const breakpoints = {
	650: {
		slidesPerView: 5
	},
	550: {
		slidesPerView: 4
	},
	500: {
		slidesPerView: 3.5
	},
	450: {
		slidesPerView: 3
	},
	400: {
		slidesPerView: 2.7
	}
} // Брэйкпоинты(извините если не правильно написал) Просто сделан для адаптаций слайдера
</script>

<style lang="scss" scoped>
@import './ProductPage.scss';
</style>
