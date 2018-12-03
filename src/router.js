import Vue from 'vue'
import Router from 'vue-router'

// import Home from './views/Home.vue'
import Layout from "@/views/Layout.vue"
import Index from "@/views/Index.vue"
import Orders from "@/views/Orders.vue"
import Account from "@/views/Account.vue"
import Login from "./views/Login.vue"

import MyOrder from "@/components/MyOrder.vue"
import Allot from "@/components/Allot.vue"
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
							component: MyOrder,
						},
						{
							path: "allocation",
							component: Allot
						}
					]
				},
				{
					path: "attendees",
					component: Orders,
					children: [
						{
							path: "",
							component: Attendees
						}
					]
				},
				{
					path: "invoicelist",
					component: Orders,
					children: [
						{
							path: "",
							component: InvoiceList
						}
					]
				},
				{
					path: "account",
					component: Account
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
