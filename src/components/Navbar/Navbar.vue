<template>
	<nav class="navbar">
		<RouterLink to="/" class="navbar_logo">
			<img src="/favicon.svg" alt="" />
			<p><span>Vue</span>Shop</p>
		</RouterLink>
    
		<NavbarSearch />

		<NavbarStorage />
	</nav>
</template>

<script setup>
// Components
import NavbarSearch from './NavbarSearch.vue'
import NavbarStorage from './NavbarStorage.vue'
</script>

<style lang="scss" scoped>
@import './Navbar.scss';
</style>
