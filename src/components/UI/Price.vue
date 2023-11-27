<template>
	<div class="price">
		<p
			:style="{
				color: style ? '#ccc' : 'var(--color)',
				textDecoration: style ? 'line-through' : 'none',
			}"
		>
			{{ price }}
		</p>
		<span v-if="style">{{ discount }}</span>
	</div>
</template>

<script setup>
import { computed } from 'vue'

// Props. Получаем значение скидки, цены и количества. По стандарту количество равно 1. Цена обязательно нужна
// Примечание: Сначала тут приходил объект Product. Но как по мне это лишнее ведь из product мне нужен только цена и скидка
const props = defineProps({
	discountPercentage: Number,
	price: {
		type: Number,
		required: true
	},
	account: {
		type: Number,
		default: 1,
	}
})

// Тут мы спрашиваем а есть ли у нас скидка? если есть то мы стилизуем наш ценник
const style = computed(() => {
	if (props.discountPercentage) {
		return true
	} else {
		return false
	}
})

// Format Price and Discount
import { formatPrice } from '@/utils/formatPrice.js'

// Получение отформатированной цены
const price = computed(() => {
	if (props.price) {
		return formatPrice(props.price * props.account)
	} else {
		return null
	}
})

// Рассчитываем скидку и форматируем итоговый ценник
const discount = computed(() => {
	if (props.discountPercentage) {
		const result = Math.round(
			(props.price - (props.price * props.discountPercentage) / 100) * props.account
		)
		return formatPrice(result)
	} else {
		return null
	}
})
</script>

<style scoped lang="scss">
.price {
	display: flex;
	gap: 10px;
}
</style>
