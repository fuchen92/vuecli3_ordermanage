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
			// Vue.set(state.Account, account)
			state.Account = account
		},
		setActivity(state, { activityList }) {
			// Vue.set(state.ActivityList, activityList)
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
			return state.ActivityList.filter(activity => activity.No == no)
		}
	}
})
