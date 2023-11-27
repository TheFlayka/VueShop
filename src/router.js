import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage/HomePage.vue'

const routes = [
	{ path: '/', component: HomePage },
	{ path: '/search', component: () => import('./pages/SearchPage.vue') },
	{ path: '/favourite', component: () => import('./pages/FavouritePage.vue') },
	{
		path: '/:pathMatch(.*)*',
		component: () => import('./pages/NotFound.vue'),
	},
	{ path: '/cart', component: () => import('./pages/CartPage/CartPage.vue') },
	{
		path: '/products/:id',
		component: () => import('./pages/ProductPage/ProductPage.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
