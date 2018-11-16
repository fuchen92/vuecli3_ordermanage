import Vue from 'vue'
import Router from 'vue-router'

// import Home from './views/Home.vue'
import Layout from "@/views/Layout.vue"
import Index from "@/views/Index.vue"
import Orders from "@/views/Orders.vue"
import Login from "./views/Login.vue"

import MyOrder from "@/components/MyOrder.vue"
import Attendees from "@/components/Attendees.vue"
import InvoiceList from "@/components/InvoiceList.vue"

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Layout,
			children: [
				{
					path: "",
					component: Index
				},
				{
					path: "orders",
					component: Orders,
					children: [
						{
							path: "",
							component: MyOrder
						},
						{
							path: "attendees",
							component: Attendees
						},
						{
							path: "invoicelist",
							component: InvoiceList
						}
					]
				}
			]
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: "/login",
			component: Login
		}
	]
})
