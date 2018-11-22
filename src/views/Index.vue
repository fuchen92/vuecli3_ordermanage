<template>
	<div class="indexPage">
		<Welcome v-bind:UserName="UserName"></Welcome>
		<div class="classify">
            <div class="container">
                <p class="classifyActivity lt">活动信息</p>
                <p class="classifyTicket rt">订单信息</p>
            </div>
        </div>
		<ul class="activityList">
            <li v-for="(activity, index) in ActivityList" v-bind:key="index" class="activityItem">
                <div class="container">
                    <div class="activityLeft lt">
                        <div class="activityLogo lt">
                        	<a :href="activity.Link">
                            	<img class="activityLogoImg" :src="'http://localhost:8081/src/assets/' + activity.Logo">
                        	</a>
                        </div>
                        <div class="activityInfo lt">
                            <h3 class="activityItemTitle">
                            	<a :href="activity.Link" target="_blank">
                            		{{ activity.Name }}
                            	</a>
                            </h3>
                            <p class="activityDetail">
                                <span class="activityTime">{{ activity.Time }}</span>
                                <span class="activitySite">{{ activity.Site }}</span>
                            </p>
                        </div>
                    </div>
					<div class="activityRight rt">
						<div class="ticketStatus" :class="{ 'hasbuyed': activity.HasOrder }">
							<router-link class="ticketStatusText lt" :to="{ path: 'orders', query: { no: activity.No } }" v-if="activity.HasOrder">查看您的订单信息</router-link>
							<template v-else>
								<p class="ticketStatusText lt">您暂无订单信息</p>
								<a class="buyTicket lt" :href="activity.Link + 'register'" target="_blank">立即购票</a>
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

		}
	},
	components: {
		Welcome
	},
	computed: {
		ActivityList() {
			return this.$store.state.ActivityList
		},
		UserName() {
			return this.$store.state.Account.Name
		}
	},
	/*methods: {
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
	}*/
}
</script>

<style lang="scss">
.classify {
    height: 45px;
    line-height: 45px;
    font-size: 15px;
	background-color: #EEEEEE;
	> .container {
		width: 95%;
	}
}
.classifyActivity, .activityLeft {
    width: 65%;
}
.classifyTicket, .activityRight {
    width: 35%;
}
.activityList {
    margin-top: 15px;
}
.activityItem {
    height: 140px;
    background-color: #fff;
	margin-bottom: 15px;
	> .container {
		width: 95%;
	}
}
.activityLeft, .activityRight {
    height: 100%;
    overflow: hidden;
}
.activityLogo {
    box-sizing: border-box;
    width: 95px;
    height: 95px;
    margin: 25px 20px 0 0;
    border-radius: 50%;
}
.activityLogoImg {
    width: 100%;
}
.activityInfo {
    width: calc(100% - 210px);
    width: -webkit-calc(100% - 210px);
    width: -moz-calc(100% - 210px);
    height: 90px;
    margin-top: 40px;
}
.activityItemTitle {
    font-size: 16px;
	margin-bottom: 15px;
	> a {
		color: #333333;
	}
}
.activityTime, .activitySite {
    display: inline-block;
    font-size: 14px;
    line-height: 25px;
    padding-left: 25px;
    background-repeat: no-repeat;
    background-position: left center;
}
.activityTime {
    margin-right: 15px;
    background-image: url(../assets/calendar.png);
}
.activitySite {
    background-image: url(../assets/site.png);
    background-position: left 5px center;
}
.ticketStatus {
    width: 100%;
    height: 90px;
    margin-top: 40px;
    overflow: hidden;
}
.ticketStatusText {
    font-size: 14px;
    line-height: 20px;
    color: #858585;
    margin: 7px 40px 0 0;
}
.buyTicket {
    box-sizing: border-box;
    width: 130px;
    height: 35px;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    color: #fff;
    background-color: #1683ef;
}
.hasbuyed .ticketStatusText {
    position: relative;
    color: #1683ef;
    cursor: pointer;
    font-size: 14px;
}
.hasbuyed .ticketStatusText::after {
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

