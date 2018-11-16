<template>
	<div class="activity-title-box">
		<div class="container">
			<h1 class="activity-title lt">
				<a href="/member/orders?no=63">2018环球旅讯峰会&amp;数字旅游展</a>
			</h1>
			<span class="activity-time">2018年9月19日 - 21日</span>
			<span class="activity-site">上海跨国采购会展中心</span>
			<div class="more-activity rt">
				查看2018其他活动
				<div class="other-activities">
					<a class="otheractivity-link" href="/member/?no=64">2018 HMC</a>
					<a class="otheractivity-link" href="/member/?no=65">2018 AMC</a>
					<a class="otheractivity-link" href="/member/">2018 DMC</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.activity-title-box {
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
.activity-title {
    font-size: 16px;
    line-height: 30px;
    margin-right: 30px;
	> a  {
		color: #333;
	}
}
.activity-time, .activity-site {
	font-size: 16px;
	line-height: 30px;
}
.more-activity {
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
.other-activities {
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
.otheractivity-link {
    display: block;
    padding: 0 15px;
    color: #333333;
	&:hover {
		color: #1683EF;
	}
}
.more-activity:hover {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.more-activity:hover .other-activities {
    display: block;
}
</style>

