<template>
	<Navbar />
	<main class="main">
		<router-view v-slot="{ Component }">
			<transition name="router-view">
				<component :is="Component" />
			</transition>
		</router-view>
	</main>
</template>

<script setup>
import { onMounted } from 'vue'

import Navbar from './components/Navbar/Navbar.vue'

import { useStorageStore } from './store/storage'
import { storeToRefs } from 'pinia'
const { cartProducts, favouriteProducts } = storeToRefs(useStorageStore())

onMounted(() => {
	if (JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('favourite'))) {
		cartProducts.value = JSON.parse(localStorage.getItem('cart')) || []
		favouriteProducts.value = JSON.parse(localStorage.getItem('favourite')) || []
	} else {
	}
})
</script>

<style lang="scss" scoped>
.router-view-enter-active,
.router-view-leave-active {
	transition: 0.5s ease;
}

.router-view-enter-from,
.router-view-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.main {
	margin: 30px 0;
}
</style>
