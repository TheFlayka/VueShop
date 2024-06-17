<template>
	<section class="home">
		<div class="home-header">
			<div class="home-header-title">
				<h2>{{ currentCategory ? currentCategory : 'Home' }}</h2>
				<div class="home-header-title-category">
					<button @click="active = !active">Category</button>
					<div v-if="active">
						<p @click="getAllProducts()">All Products</p>
						<p
							@click="getProductsCategory(name)"
							v-for="(name, idx) in categoriesName"
							:key="idx"
						>
							{{ name.name }}
						</p>
					</div>
				</div>
			</div>
			<select name="sort" v-model="sortValue">
				<option value="price">Price</option>
				<option value="title">A-Z</option>
				<option value="stock">Stock</option>
			</select>
		</div>
		<TransitionGroup name="home_page" tag="div" class="home-cards">
			<ProductCard
				v-for="product in productsCategory"
				:key="product.id"
				:product="product"
			/>
		</TransitionGroup>
		<div class="pagination">
			<button @click="prevPage">Prev</button>
			<p>{{ page }}</p>
			<button @click="nextPage" v-if="productsCategory.length >= 12">Next</button>
		</div>
	</section>
</template>

<script setup>
// Vue Import
import { ref, onMounted, watch } from 'vue' // Vue
import axios from 'axios' // Axios

// Category
// Category(Get All Name Category) || Получаем название всех категорий
const categoriesName = ref([])

async function getCategoriesName() {
	try {
		const res = await axios.get('https://dummyjson.com/products/categories')
		categoriesName.value = res.data
	} catch (error) {
		console.error(`Ошибка при получений названий категорий: ${error}`)
	}
}

// Get Products of Category || Получаем продукты из определенной категорий
const productsCategory = ref([])
const currentCategory = ref('') // Текущая категория

async function getProductsCategory(name) {
	try {
		skip.value = 0
		page.value = 1
		const res = await axios.get(
			`https://dummyjson.com/products/category/${name.name}?limit=${limit}&skip=${skip.value}`
		)
		productsCategory.value = res.data.products
		console.log(res);
		currentCategory.value = name.name
		active.value = false
		sort()
	} catch (error) { 	
		console.error(`Ошибка при получений продуктов из категорий: ${error}`)
	}
}

// Category Modal (Status Active, True or False) || Статус модального окна
const active = ref(false)

// Get All Products
async function getAllProducts() {
	try {
		const res = await axios.get(
			`https://dummyjson.com/products?limit=${limit}&skip=${skip.value}`
		)
		productsCategory.value = res.data.products
		currentCategory.value = ''
		active.value = false
		total.value = res.data.total
		sort()
	} catch (error) {
		console.error(`Ошибка при получений всех продуктов: ${error}`)
	}
}

// Start (Get All Products and Get All Name Category)
onMounted(() => {
	getAllProducts()
	getCategoriesName()
})

// Sort
const sortValue = ref('')

watch(sortValue,() => {
	sort()
})

function sort() {
	if (sortValue.value === 'price')
		productsCategory.value.sort((a, b) => a.price - b.price)
	else if (sortValue.value === 'title')
		productsCategory.value.sort((a, b) => a.title.localeCompare(b.title))
	else if (sortValue.value === 'stock')
		productsCategory.value.sort((a, b) => a.stock - b.stock)
}

// Pagination
const limit = 12
const skip = ref(0)
const page = ref(1)
const total = ref(0)

function nextPage() {
	if (total.value > skip.value + limit) {
		skip.value += limit
		page.value++
		currentCategory.value !== '' ? getProductsCategory(currentCategory.value) : getAllProducts()
	}
}

function prevPage() {
	skip.value !== 0 ? (skip.value -= limit) : (skip.value = 0)
	page.value !== 1 ? page.value-- : page.value
	currentCategory.value !== '' ? getProductsCategory(currentCategory.value) : getAllProducts()
}
</script>

<style lang="scss" scoped>
@import './HomePage.scss';
</style>
