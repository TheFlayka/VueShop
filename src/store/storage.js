import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStorageStore = defineStore('storage', () => {
	const cartProducts = ref([])
	const favouriteProducts = ref([])

	function editStorage(type, status, inputProduct) {
		if (type === 'cart') {
			if (status === false) {
				inputProduct.account = 1
				cartProducts.value.push(inputProduct)
				localStorage.setItem('cart', JSON.stringify(cartProducts.value))
			} else {
				const productIdx = cartProducts.value.findIndex(
					product => product.id === inputProduct.id
				)
				cartProducts.value.splice(productIdx, 1)
				localStorage.setItem('cart', JSON.stringify(cartProducts.value))
			}
		} else {
			if (status === false) {
				favouriteProducts.value.push(inputProduct)
				localStorage.setItem('favourite', JSON.stringify(favouriteProducts.value))
			} else {
				const productIdx = favouriteProducts.value.findIndex(
					product => product.id === inputProduct.id
				)
				favouriteProducts.value.splice(productIdx, 1)
				localStorage.setItem(
					'favourite',
					JSON.stringify(favouriteProducts.value)
				)
			}
		}
	}
	return { editStorage, cartProducts, favouriteProducts }
})
