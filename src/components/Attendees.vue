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
							<tr v-for="(allot, index) in AllotList" v-bind:key="index" v-bind:data-id="allot.Id" class="hasBorder alloted">
								<td>{{ index + 1 }}</td>
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
									<button v-else @click="showChangeAllotBox(allot)" class="changeBtn">修改</button>
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
		<div id="changeAllot" class="changeAllot" v-show="isShowChangeAllotBox">
			<div class="changeAllotBg"></div>
			<div class="changeAllotContent">
				<div @click="closeChangeAllot" class="closeChangeAllot">×</div>
				<ul class="changeAllotForm">
					<li class="formGroup">
						<div class="formItem lt">
							<input v-model="willChange.NameCn" class="allotInput" placeholder="中文姓名">
							<p class="formTips"></p>
						</div>
						<div class="formItem rt">
							<input v-model="willChange.NameEn" class="allotInput" placeholder="英文姓名">
							<p class="formTips"></p>
						</div>
					</li>
					<li class="formGroup">
						<div class="formItem lt">
							<input v-model="willChange.CompanyCn" class="allotInput" placeholder="中文公司名称">
							<p class="formTips"></p>
							<p class="formDesc">将展示在参会胸牌， 8 个汉字内为宜</p>
						</div>
						<div class="formItem rt">
							<input v-model="willChange.CompanyEn" class="allotInput" placeholder="英文公司名称">
							<p class="formTips"></p>
							<p class="formDesc">将展示在胸牌，请区分大小写，18 个字母内为宜</p>
						</div>
					</li>
					<li class="formGroup">
						<div class="formItem lt">
							<input v-model="willChange.JobCn" class="allotInput" placeholder="中文职位名称">
							<p class="formTips"></p>
						</div>
						<div class="formItem rt">
							<input v-model="willChange.JobEn" class="allotInput" placeholder="英文职位名称">
							<p class="formTips"></p>
							<p class="formDesc">请区分大小写</p>
						</div>
					</li>
					<li class="formGroup">
						<div class="formItem lt">
							<input v-model="willChange.Mobile" class="allotInput" placeholder="手机号码">
							<p class="formTips"></p>
							<p class="formDesc">请填写参会人手机号码以便接收通知</p>
						</div>
						<div class="formItem rt">
							<input v-model="willChange.Tel" class="allotInput" placeholder="固话号码">
							<p class="formTips"></p>
							<p class="formDesc">格式：010-12345678-001</p>
						</div>
					</li>
					<li class="formGroup" style="overflow: visible;">
						<div class="formItem lt">
							<input v-model="willChange.Email" class="allotInput" placeholder="Email地址">
							<p class="formTips"></p>
							<p class="formDesc">请填写参会人Email地址以便接收通知</p>
						</div>
						<div id="changeIndustryContainer" class="formItem rt">
							<div @click.stop="showIndustryBox" class="allotInput industrySelect" tabindex="0">
								<div class="industryShow">
									<span v-bind:data-id="willChange.Industry" class="industryTag">{{ willChange.IndustryText }}</span>
								</div>
							</div>
							<div @click.stop="chooseIndustry" v-show="isShowIndustryBox" id="industryBox" class="industryBox">
								<div class="industryGroup">
									<span class="industryLabel">旅游企业</span>
									<div class="industryCategory">
										<span class="industryTag" data-id="77">航空公司</span>
										<span class="industryTag" data-id="78">酒店/非标准住宿</span>
										<span class="industryTag" data-id="79">在线旅游</span>
										<span class="industryTag" data-id="80">旅行社/机票代理人</span>
										<span class="industryTag" data-id="81">目的地景区</span>
									</div>
								</div>
							</div>
							<p class="formTips"></p>
						</div>
					</li>
					<li class="formGroup">
						<div class="formItem lt">
							<select v-model="willChange.Function" class="allotInput allotSelect">
								<option value="0">请选择职能</option>
								<option value="265">高层管理</option>
								<option value="266">市场/营销</option>
								<option value="267">销售/BD</option>
								<option value="268">产品</option>
								<option value="269">运营</option>
								<option value="270">电商</option>
								<option value="271">技术</option>
								<option value="272">其他</option>
							</select>
							<p class="formTips"></p>
						</div>
						<div class="formItem rt">
							<select v-model="willChange.Sex" class="allotInput allotSelect">
								<option value="0">请选择性别</option>
								<option value="1">先生</option>
								<option value="2">女士</option>
							</select>
						</div>
					</li>
				</ul>
				<button @click="submitChangeAllot" id="submitChangeAllot" class="submitChangeAllot">确认修改</button>
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
			isShowChangeAllotBox: false,
			isShowIndustryBox: false,
			willChange: {},
			cloneWillChange: {}
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
		showChangeAllotBox(willChangeAllot) {
			this.isShowChangeAllotBox = true
			this.willChange = willChangeAllot
		},
		closeChangeAllot() {
			this.isShowChangeAllotBox = false;
			this.isShowIndustryBox = false;
			this.willChange = {}
		},
		showIndustryBox() {
			this.isShowIndustryBox = !this.isShowIndustryBox;
		},
		chooseIndustry(event) {
			console.log(event)
		},
		submitChangeAllot() {
			console.log(this.willChange)
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

.changeAllot {
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // display: none;
}
.changeAllotBg {
	width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.changeAllotContent {
	position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    padding: 40px;
    transform: translate(-50%, -50%);
    background-color: #fff;
}
.closeChangeAllot {
	position: absolute;
    right: 0px;
    top: 0px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 35px;
    cursor: pointer;
}
.changeAllotForm {
	margin-top: 20px;
}
.formGroup::after {
    display: block;
    content: "";
    clear: both;
}
.formItem {
    position: relative;
    width: 45%;
    height: 65px;
}
.allotInput, .allotSelect {
    width: 100%;
    height: 40px;
    font-size: 15px;
    padding: 0 10px;
    border: 1px solid #D3D3D3;
    background-color: #F8F8F8;
    color: #565656;
    border-radius: 2px;
}
.formTips {
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
    font-size: 12px;
    color: red;
    display: none;
}
.formDesc {
    padding: 0 13px;
    font-size: 12px;
    line-height: 20px;
    margin-top: 5px;
    color: #858585;
    display: none;
}
.formDesc::before {
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    content: "";
    border: 4px transparent solid;
    border-bottom: 4px #858585 solid;
    margin-top: -4px;
    margin-right: 8px;
    zoom: 1;
}
.industrySelect {
    box-sizing: border-box;
    overflow: hidden;
    background: url(../assets/caret.png) #F8F8F8 right 10px center no-repeat;
}
.industryShow {
    width: 100%;
    height: 100%;
    line-height: 38px;
    float: left;
	.industryTag {
		line-height: 38px;
	}
}
.industryBox {
    box-sizing: border-box;
    position: absolute;
    bottom: 100%;
    width: 100%;
    height: 300px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #999;
    border-bottom: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 100;
    // display: none;
}
.industryGroup {
    overflow: hidden;
    margin-bottom: 15px;
}
.industryLabel, .industryCategory {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
}
.industryLabel {
    width: 90px;
    line-height: 25px;
    text-align: center;
    font-weight: bold;
}
.industryCategory {
    width: calc(100% - 95px);
    width: -webkit-calc(100% - 95px);
    width: -moz-calc(100% - 95px);
    overflow: hidden;
}
.industryTag {
    float: left;
    line-height: 25px;
    margin: 0 20px 0 0;
    cursor: pointer;
}
.submitChangeAllot {
    display: block;
    width: 180px;
    height: 40px;
    background-color: #1683ef;
    color: #fff;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    margin: 20px auto 0;
    font-size: 16px;
    cursor: pointer;
}
</style>
