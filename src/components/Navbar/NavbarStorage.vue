<template>
	<div class="navbar-storage">
		<RouterLink to="/cart">
			<img src="/basket.svg" alt="" />
			<p v-show="cartProducts.length">{{ cartProducts.length }}</p>
		</RouterLink>
		<RouterLink to="/favourite">
			<img src="/favourite.svg" alt="" />
			<p v-show="favouriteProducts.length">{{ favouriteProducts.length }}</p>
		</RouterLink>
	</div>
</template>

<script setup>
import { useStorageStore } from '@/store/storage';
import { storeToRefs } from 'pinia'

const { cartProducts, favouriteProducts} = storeToRefs(useStorageStore())
</script>

<style lang="scss" scoped>
@import './Navbar.scss';
</style>
