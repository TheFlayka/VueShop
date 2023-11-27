<template>
  <div class="cart-content-cards-card">
    <RouterLink
      :to="'/products/' + product.id"
      class="cart-content-cards-card-info"
    >
      <img v-lazy="product.thumbnail" alt="" />
      <div>
        <h2>{{ product.title }}</h2>
        <Price :price="product.price" :discountPercentage="product.discountPercentage" :account="product.account" />
        <p>Stock: {{ product.stock }}</p>
      </div>
    </RouterLink>
    <div class="cart-content-cards-card-count">
      <button
        class="minus"
        @click="product.account !== 1 ? editAccount('minus') : editStorage('cart', true, product)"
      >
        -
      </button>
      <p>{{ product.account }}</p>
      <button
        class="plus"
        @click="product.account !== product.stock ? editAccount('plus') : 0"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
// Props (Приходящий продукт)
const props = defineProps({
  product: Object,
});

// Storage Import(Pinia)
import { useStorageStore } from '@/store/storage';
import { storeToRefs } from 'pinia';
const { editStorage } = useStorageStore()
const { cartProducts } = storeToRefs(useStorageStore())

// Функция при срабатываний находит индекс продукта в массиве и прибавляет или отнимает количество продукта. Затем новый массив заменяется в LcoalStorage
function editAccount(operation) {
  const ObjectIdx = cartProducts.value.findIndex((product) => product.id === props.product.id)
  operation === 'plus' ? cartProducts.value[ObjectIdx].account++ : cartProducts.value[ObjectIdx].account--
  localStorage.setItem('cart', JSON.stringify(cartProducts.value))
}
</script>

<style lang="scss" scoped>
@import './CartPageCard.scss';
</style>
