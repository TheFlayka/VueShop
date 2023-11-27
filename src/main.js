// Create App
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// Router
import router from './router.js'

// Style
import './assets/main.scss'

// Loader
import VueLazyload from 'vue-lazyload'

const loadImage =  '/loading.svg'
const errorImage = '/error_image.svg'

// Components
import ProductCard from './components/UI/ProductCard/ProductCard.vue'
import Price from './components/UI/Price.vue'
import Empty from './components/UI/Empty.vue'

app
	.component('ProductCard', ProductCard)
	.component('Price', Price)
	.component('Empty', Empty)
	.use(pinia)
	.use(router)
	.use(VueLazyload, {
		error: errorImage,
		loading: loadImage,
	})
	.mount('#app')
