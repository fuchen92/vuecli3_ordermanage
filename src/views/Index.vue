<template>
	<div class="indexPage">
		<Welcome v-bind:userName="userName"></Welcome>
		<div class="classify-infobox">
            <div class="container">
                <p class="classify-activity-text lt">活动信息</p>
                <p class="classify-ticket-text rt">订单信息</p>
            </div>
        </div>
		<ul class="activity-lists">
            <li class="activity-item" v-for="(activity, index) in activityList" v-bind:key="index">
                <div class="container">
                    <div class="activity-left lt">
                        <div class="activity-logo lt">
                        	<a :href="activity.Link">
                            	<img class="activity-logo-img" :src="'http://localhost:8081/src/assets/' + activity.Logo">
                        	</a>
                        </div>
                        <div class="activity-info lt">
                            <h3 class="activity-item-title">
                            	<a :href="activity.Link" target="_blank">
                            		{{ activity.Name }}
                            	</a>
                            </h3>
                            <p class="activity-detail">
                                <span class="activity-time">{{ activity.Time }}</span>
                                <span class="activity-site">{{ activity.Site }}</span>
                            </p>
                        </div>
                    </div>
					<div class="activity-right rt">
						<div class="ticket-status" :class="{ 'hasbuyed': activity.HasOrder }">
							<router-link class="ticket-status-text lt" :to="{ path: 'orders', query: { no: activity.No } }" v-if="activity.HasOrder">查看您的订单信息</router-link>
							<template v-else>
								<p class="ticket-status-text lt">您暂无订单信息</p>
								<a class="buy-ticket lt" :href="activity.Link + 'register'" target="_blank">立即购票</a>
							</template>
						</div>
					</div>
                </div>
            </li>
        </ul>
	</div>
</template>

<script>
import { mapActions } from "vuex"
import Welcome from "@/components/Welcome.vue"
export default {
	data() {
		return {
			// userName: "",
			// activityList: [
			// 	{
			// 		no: 63,
			// 		link: "/tdc2018/",
			// 		logo: require("@/assets/activity-1.png"),
			// 		title: "2018环球旅讯峰会&中国数字旅游展",
			// 		time: "2018年9月19日 - 21日",
			// 		site: "上海长风跨国采购中心",
			// 		hasOrder: true
			// 	},
			// 	{
			// 		no: 56,
			// 		link: "/hmc2018/",
			// 		logo: require("@/assets/activity-3.png"),
			// 		title: "2018中国住宿业峰会",
			// 		time: "2018年6月27日 - 28日",
			// 		site: "杭州华盛达雷迪森广场酒店",
			// 		hasOrder: false
			// 	},
			// 	{
			// 		no: 46,
			// 		link: "/amc2018/",
			// 		logo: require("@/assets/activity-4.png"),
			// 		title: "2018中国航空营销峰会",
			// 		time: "2018年7月25日 - 26日",
			// 		site: "上海东锦江希尔顿逸林酒店",
			// 		hasOrder: false
			// 	}
			// ]
		}
	},
	components: {
		Welcome
	},
	computed: {
		activityList() {
			return this.$store.state.ActivityList
		},
		userName() {
			return this.$store.state.Account.Name
		}
	},
	methods: {
		// 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions({
			initAccount: "getUserAccount",
			initActivityList: "getActivities",
			initOrders: "getOrders"
		})
	},
	beforeMount() {
		this.initAccount(17520425633)
		this.initActivityList()
		this.initOrders()
	}
}
</script>

<style lang="scss">
.classify-infobox {
    height: 45px;
    line-height: 45px;
    font-size: 15px;
	background-color: #EEEEEE;
	> .container {
		width: 95%;
	}
}
.classify-activity-text, .activity-left {
    width: 65%;
}
.classify-ticket-text, .activity-right {
    width: 35%;
}
.activity-lists {
    margin-top: 15px;
}
.activity-item {
    height: 140px;
    background-color: #fff;
	margin-bottom: 15px;
	> .container {
		width: 95%;
	}
}
.activity-left, .activity-right {
    height: 100%;
    overflow: hidden;
}
.activity-logo {
    box-sizing: border-box;
    width: 95px;
    height: 95px;
    margin: 25px 20px 0 0;
    border-radius: 50%;
}
.activity-logo-img {
    width: 100%;
}
.activity-info {
    width: calc(100% - 210px);
    width: -webkit-calc(100% - 210px);
    width: -moz-calc(100% - 210px);
    height: 90px;
    margin-top: 40px;
}
.activity-item-title {
    font-size: 16px;
	margin-bottom: 15px;
	> a {
		color: #333333;
	}
}
.activity-time, .activity-site {
    display: inline-block;
    font-size: 14px;
    line-height: 25px;
    padding-left: 25px;
    background-repeat: no-repeat;
    background-position: left center;
}
.activity-time {
    margin-right: 15px;
    background-image: url(../assets/calendar.png);
}
.activity-site {
    background-image: url(../assets/site.png);
    background-position: left 5px center;
}
.ticket-status {
    width: 100%;
    height: 90px;
    margin-top: 40px;
    overflow: hidden;
}
.ticket-status-text {
    font-size: 14px;
    line-height: 20px;
    color: #858585;
    margin: 7px 40px 0 0;
}
.buy-ticket {
    box-sizing: border-box;
    width: 130px;
    height: 35px;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    color: #fff;
    background-color: #1683ef;
}
.hasbuyed .ticket-status-text {
    position: relative;
    color: #1683ef;
    cursor: pointer;
    font-size: 14px;
}
.hasbuyed .ticket-status-text::after {
    position: absolute;
    top: 5px;
    content: "";
    color: #1683ef;
    margin-left: 5px;
    width: 8px;
    height: 8px;
    border: 1px solid #1683ef;
    border-left-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(45deg);
}
</style>

