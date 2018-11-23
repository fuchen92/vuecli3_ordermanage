<template>
	<div class="attendsDetail">
		<MenuTitle v-bind:menuTitle="menuTitle"></MenuTitle>
		<div class="attendsInfo">
			<div class="container">
				<p class="attendsDesc">
					尊敬的环旅嘉宾，您总共预定了 <span class="ticketCount">{{ CurrentAllot.TicketsAmount }}</span> 张门票，已分配 <span class="ticketCount">{{ AllotList.length }}</span> 张，还有 <span class="ticketCount">{{ CurrentAllot.TicketsAmount - AllotList.length }}</span> 张未分配。
				</p>
			</div>
		</div>
		<div class="allotList">
			<div class="allotTitleBg"></div>
			<div class="container">
				<table id="allotTable" class="allotTable" cellspacing="0" cellpadding="0">
					<thead>
						<tr class="thead">
							<th>&nbsp;</th>
							<th>序号</th>
							<th>姓名</th>
							<th>性别</th>
							<th>公司</th>
							<th>职位</th>
							<th>手机</th>
							<th>邮箱</th>
							<th>门票类别</th>
							<th>付款状态</th>
							<th>管理</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="whiteDivide" colspan="11"></td>
						</tr>
						<tr v-if="AllotList.length == 0">
							<td class="noAllot" colspan="11">
								您暂未分配门票
							</td>
						</tr>
						<template v-else>
							<tr class="hasBorder" style="border: 0;">
								<td class="alreadyAllot" :rowspan="AllotList.length + 1" style="border: none;">已分配门票</td>
								<td colspan="10" style="border: 0; height: 0;"></td>
							</tr>
							<tr v-for="(allot, index) in AllotList" v-bind:key="index" class="hasBorder alloted">
								<td class="allotId" style="width: 50px;">{{ index + 1 }}</td>
								<td>{{ allot.NameCn }}</td>
								<td>{{ allot.Sex == 1 ? "男" : "女" }}</td>
								<td>{{ allot.CompanyCn }}</td>
								<td>{{ allot.JobCn }}</td>
								<td>{{ allot.Mobile }}</td>
								<td>{{ allot.Email }}</td>
								<td>
									<span v-if="allot.TicketType == 1" class="ticketType">VIP票</span>
									<span v-else-if="allot.TicketType == 2" class="ticketType">直通票</span>
									<span v-else-if="allot.TicketType == 3" class="ticketType">普通票</span>
									<span v-else class="ticketType">展览票</span>
								</td>
								<td>{{ allot.PayStatus == 1 ? "已付款" : "未付款" }}</td>
								<td :style="{ overflow: allot.AuditStatus == 1 ? 'visible' : '' }">
									<template v-if="allot.AuditStatus == 1">
										<span class="auditStatus">已审核</span>
										<span class="auditTips">
											?
											<span class="auditTipText">您的参会信息已审核确认，如需修改，请联系我们020-28829750或register@traveldaily.cn</span>
										</span>
									</template>
									<button v-else @click="showChangeAllotBox" class="changeBtn">修改</button>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
				<p class="allotTips">
					您还有 <span class="ticketCount">{{ CurrentAllot.TicketsAmount - AllotList.length }}</span> 张门票未分配，请 <router-link class="ticketLink" :to="'/orders?no=' + this.$route.query.no">点击查看</router-link>
				</p>
				<div class="auditAttention">
					<p class="auditAttentionText lt">注：信息提交后工作人员将进行校对审核，审核后的部分信息将在网站/微信小程序名录、胸牌等物料中展示体现。</p>
					<a class="buyAgain rt" :href="CurrentActivity.Link + 'register'" target="_blank">继续购票</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MenuTitle from "@/components/MenuTitle.vue"
export default {
	data() {
		return {
			menuTitle: "参会人员信息管理",
			// AllotList: [],
			isShowChangeAllotBox: false
		}
	},
	components: {
		MenuTitle
	},
	computed: {
		CurrentActivity() {
			this.no = this.$route.query.no
			return this.$store.getters.getActivityByNo(this.no)
		},
		CurrentAllot() {
			this.no = this.$route.query.no
			return this.$store.getters.getCurrentAllotsByNo(this.no)
		},
		AllotList() {
			this.no = this.$route.query.no
			return this.$store.getters.getCurrentAllotsByNo(this.no).AllotList
		}
	},
	methods: {
		showChangeAllotBox() {
			this.isShowChangeAllotBox = true
			console.log(this.isShowChangeAllotBox)
		}
	}
}
</script>

<style lang="scss">
.attendsDetail {
    width: calc(100% - 250px);
    width: -wekit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
}
.attendsInfo {
    height: 65px;
    background-color: #fff;
	> .container {
		width: 97%;
	}
}
.attendsDesc {
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    margin: 22px 30px 0 0;
}
.ticketCount {
    color: #E54144;
}
.allotList {
    background-color: #fff;
	> .container {
		width: 97%;
		margin-top: -40px;
	}
}
.allotTitleBg {
    width: 97%;
    height: 40px;
    margin: 0 auto;
    background-color: #EEEEEE;
}
.allotTable {
    width: 99.8%;
    font-size: 15px;
    text-align: center;
    border-collapse: collapse;
    margin-bottom: 30px;
    table-layout: fixed;
	.thead {
		height: 40px;
	}
	.whiteDivide {
		height: 15px;
	}
	td {
		height: 55px;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hasBorder > td {
		border: 0;
	}
}
.noAllot.noAllot {
	height: 120px;
	font-size: 15px;
    color: #858585;
}
.alreadyAllot {
    font-size: 15px;
    border: none;
    background-color: #EEEEEE;
    color: #333333;
}
.ticketType {
	padding: 0px 8px;
    border: 1px solid #DEDEDE;
    border-radius: 20px;
}
.changeBtn {
    width: 70px;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
    background-color: #fff;
    color: #1683ef;
    cursor: pointer;
}
.auditStatus {
	color: #999999;
    cursor: not-allowed;
}
.auditTips {
	position: relative;
    display: inline-block;
    width: 17px;
    height: 17px;
	margin-left: 2px;
    line-height: 20px;
    background-color: #C1C1C1;
    font-size: 14px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    cursor: pointer;
	&:hover .auditTipText {
		display: block;
	}
}
.auditTipText {
	position: absolute;
    top: -35px;
    right: -5px;
    height: 25px;
    padding: 0 10px;
    line-height: 25px;
    font-size: 12px;
    border-radius: 2px;
    background-color: #EEEEEE;
    color: #181818;
    display: none;
}
.allotTips {
    box-sizing: border-box;
    height: 50px;
    font-size: 15px;
    line-height: 50px;
    padding: 0 15px;
    border: 1px solid #DEDEDE;
    margin-bottom: 40px;
}
.ticketLink {
	color: #1683ef;
    text-decoration: underline;
    cursor: pointer;
}
.auditAttention {
	overflow: hidden;
    margin-bottom: 50px;
}
.auditAttentionText {
	font-size: 15px;
    line-height: 20px;
    margin-bottom: 10px;
    color: #777777;
}
@media screen and (max-width: 1400px) {
	.auditAttentionText {
		width: 80%;
	}
}
</style>
