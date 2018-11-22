<template>
	<div class="activityTitleBox">
		<div class="container">
			<h1 class="activityTitle lt">
				<router-link :to="'/orders?no=' + this.$route.query.no">{{ CurrentActivity.Name }}</router-link>
			</h1>
			<span class="activityTime">{{ CurrentActivity.Time }}</span>
			<span class="activitySite">{{ CurrentActivity.Site }}</span>
			<div class="moreActivity rt">
				查看2018其他活动
				<div class="otherActivities">
					<router-link class="otheractivityLink" to="/orders?no=63">2018 TDC</router-link>
					<router-link class="otheractivityLink" to="/orders?no=56">2018 HMC</router-link>
					<router-link class="otheractivityLink" to="/orders?no=46">2018 AMC</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		CurrentActivity: {
			type: Object,
			require: true
		}
	}
}
</script>

<style lang="scss" scoped>
.activityTitleBox {
    box-sizing: border-box;
    height: 80px;
    padding: 25px 0;
    margin: 20px 0;
    background-color: #fff;
	> .container {
		width: 95%;
		overflow: visible;
	}
}
.activityTitle {
    font-size: 16px;
    line-height: 30px;
    margin-right: 30px;
	> a  {
		color: #333;
	}
}
.activityTime, .activitySite {
	font-size: 16px;
	line-height: 30px;
}
.moreActivity {
    position: relative;
    box-sizing: border-box;
    padding: 0 10px 0 35px;
    font-size: 14px;
    width: 162px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 5px;
    background: #1683ef url(../assets/activity.png) left 8px center no-repeat;
}
.otherActivities {
    position: absolute;
    top: 30px;
    left: 0;
    width: 160px;
    padding: 5px 0;
    background-color: #fff;
    border: 1px solid #C1C1C1;
    border-top: 0;
    display: none;
}
.otheractivityLink {
    display: block;
    padding: 0 15px;
    color: #333333;
	&:hover {
		color: #1683EF;
	}
}
.moreActivity:hover {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.moreActivity:hover .otherActivities {
    display: block;
}
</style>

