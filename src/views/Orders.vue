<template>
	<div class="ordersPage">
		<ActivityBar :currentActivity="currentActivity"></ActivityBar>
		<div class="order-content">
			<div class="siderbar-menu lt">
				<router-link class="siderbar-menuitem" :to="'/orders?no=' + this.$route.query.no" active-class="active" exact>我的订单</router-link>
				<router-link class="siderbar-menuitem" :to="'/orders/attendees?no=' + this.$route.query.no" active-class="active">参会人员信息管理</router-link>
				<router-link class="siderbar-menuitem" :to="'/orders/invoicelist?no=' + this.$route.query.no" active-class="active">发票管理</router-link>
			</div>
			<router-view class="rt"></router-view>
		</div>
	</div>
</template>

<script>
import ActivityBar from "@/components/ActivityBar"
export default {
	data() {
		return {
			// no: this.$route.query.no
		}
	},
	components: {
		ActivityBar
	},
	computed: {
		currentActivity() {
			this.no = this.$route.query.no
			return this.$store.getters.getActivityByNo(this.no)
		}
	},
	watch: {
		// 观察当前活动，如果没有订单就跳去首页
		currentActivity: function(newActivity, oldActivity) {
			if(!newActivity.HasOrder) {
				this.$router.replace({ path: "/" })
			}
		}
	}
}
</script>

<style lang="scss">
.siderbar-menu {
    box-sizing: border-box;
    width: 225px;
    height: 315px;
    background-color: #fff;
    text-align: center;
    padding: 20px;
}
.siderbar-menuitem {
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #181818;
    margin: 10px 0;
}
.siderbar-menuitem.active {
    background-color: #1683ef;
    color: #fff;
    border-radius: 2px;
}
.order-content {
	overflow: hidden;
}
</style>

