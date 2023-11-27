import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSearchProductsStore = defineStore('searchProducts', () => {
  const searchProducts = ref([])

  async function getSearchProducts(searchText) {
    try {
      const res = await axios.get(
				`https://dummyjson.com/products/search?q=${searchText}`
			)
      searchProducts.value = res.data.products
    } catch (error) {
      console.error(`Произошла ошибка при поиске продуктов: ${error}`);
    }
  } 

	return { getSearchProducts, searchProducts }
})
