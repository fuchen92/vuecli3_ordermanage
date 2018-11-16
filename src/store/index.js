import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import { getUserAccount, fetchActivities } from "./api"

export default new Vuex.Store({
	state: {
		Account: {},
		ActivityList: []
	},
	mutations: {
		setAccount(state, { account }) {
			// Vue.set(state.Account, "Account", account)
			// console.log(state.Account)
			state.Account = account
		},
		setActivity(state, { activityList }) {
			// Vue.set(state.ActivityList, "ActivityList", activityList)
			// console.log(state.ActivityList)
			state.ActivityList = activityList
		}
	},
	actions: {
		getUserAccount({ commit }, mobile) {
			getUserAccount(mobile).then(res => {
				commit("setAccount", { account: res.data.Account })
			})
		},
		getActivities({ commit }) {
			fetchActivities().then(res => {
				commit("setActivity", { activityList: res.data.ActivityList })
			})
		}
	},
	getters: {
		getActivityByNo: (state) => (no) => {
			return state.ActivityList.find(activity => activity.No == no)
		}
	}
})
