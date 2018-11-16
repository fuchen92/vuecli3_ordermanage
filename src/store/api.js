import axios from "axios"

export function getUserAccount(mobile) {
	return axios.get(`http://localhost:8081/api/activity/${mobile}`)
}

export function fetchActivities() {
	return axios.get(`http://localhost:8081/api/activity/`)
}
