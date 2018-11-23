import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import {
	getUserAccount,
	fetchActivities,
	getOrders,
	getAllots
} from "./api"

export default new Vuex.Store({
	state: {
		Account: {},
		ActivityList: [],
		Orders: {},
		Allots: {}
	},
	mutations: {
		INITACCOUNT(state, { account }) {
			// Vue.set(state.Account, "Account", account)
			// console.log(state.Account)
			state.Account = account
		},
		INITACTIVITY(state, { activityList }) {
			// Vue.set(state.ActivityList, "ActivityList", activityList)
			// console.log(state.ActivityList)
			state.ActivityList = activityList
		},
		INITORDERS(state, { orders }) {
			state.Orders = orders
		},
		INITALLOTS(state, { allots }) {
			state.Allots = allots
		},
		CANCELORDERBYID(state, { no, willCancelOrderId }) {
			Vue.set(state.Orders[no].find(order => order.Id == willCancelOrderId), "PayStatus", 5)
		}
	},
	actions: {
		getUserAccount({ commit }, mobile) {
			getUserAccount(mobile).then(res => {
				commit("INITACCOUNT", { account: res.data.Account })
			})
		},
		// 初始化所有活动
		getActivities({ commit }) {
			fetchActivities().then(res => {
				commit("INITACTIVITY", { activityList: res.data.ActivityList })
			})
		},
		// 初始化所有订单
		getOrders({ commit }) {
			getOrders().then(res => {
				commit("INITORDERS", { orders: res.data.Orders })
			})
		},
		// 初始化所有已分配列表
		getAllots({ commit }) {
			getAllots().then(res => {
				commit("INITALLOTS", { allots: res.data.Allots })
			})
		},
		// 根据id取消订单
		cancelOrderById({ commit }, { no, willCancelOrderId }) {
			commit("CANCELORDERBYID", { no, willCancelOrderId })
		}
	},
	getters: {
		// 根据no获取当前活动
		getActivityByNo: (state) => (no) => {
			return state.ActivityList.find(activity => activity.No == no)
		},
		// 根据no获取当前活动的订单
		getCurrentOrderList: (state) => (no, filterKeyWord) => {
			if(filterKeyWord === "all") {
				return state.Orders[no]
			} else {
				return state.Orders[no].filter(order => {
					return order.PayStatus == 1
				})
			}
		},
		getCurrentAllotsByNo: (state) => (no) => {
			return state.Allots[no]
		}
	}
})
