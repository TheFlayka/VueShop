<template>
	<section class="not-found-page">
		<h1>404</h1>
		<h2>Извините, такой страницы не существует</h2>
		<RouterLink to='/'>Главная страница</RouterLink>
	</section>
</template>

<script setup></script>

<style lang="scss" scoped>
.not-found-page {
	display: flex;
	height: 70vh;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	h1 {
		font-size: 100px;
		color: var(--primary);
	}
	h2 {
		margin: 15px 0;
		text-align: center;
		font-size: 25px;
	}
	a {
		background-color: var(--primary);
		color: #fff;
		border-radius: 5px;
		padding: 5px;
		transition: 400ms;
		&:hover {
			background-color: var(--primary_hover);
		}
	}
}
</style>
