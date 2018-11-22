<template>
	<div class="ordersPage">
		<ActivityBar :CurrentActivity="CurrentActivity"></ActivityBar>
		<div class="orderContent">
			<div class="siderbarMenu lt">
				<router-link class="siderbarMenuItem" :to="'/orders?no=' + this.$route.query.no" active-class="active" exact>我的订单</router-link>
				<router-link class="siderbarMenuItem" :to="'/orders/attendees?no=' + this.$route.query.no" active-class="active">参会人员信息管理</router-link>
				<router-link class="siderbarMenuItem" :to="'/orders/invoicelist?no=' + this.$route.query.no" active-class="active">发票管理</router-link>
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
		CurrentActivity() {
			this.no = this.$route.query.no
			return this.$store.getters.getActivityByNo(this.no)
		}
	},
	watch: {
		// 观察当前活动，如果没有订单就跳去首页
		CurrentActivity: function(newActivity, oldActivity) {
			if(!newActivity.HasOrder) {
				this.$router.replace({ path: "/" })
			}
		}
	}
}
</script>

<style lang="scss">
.siderbarMenu {
    box-sizing: border-box;
    width: 225px;
    height: 315px;
    background-color: #fff;
    text-align: center;
    padding: 20px;
}
.siderbarMenuItem {
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
    color: #181818;
    margin: 10px 0;
}
.siderbarMenuItem.active {
    background-color: #1683ef;
    color: #fff;
    border-radius: 2px;
}
.orderContent {
	overflow: hidden;
}
</style>

