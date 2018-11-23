<template>
	<div class="orderDetail">
		<MenuTitle v-bind:menuTitle="menuTitle"></MenuTitle>
		<div class="classifyOrder">
			<div class="container">
				<span class="classifyOrderMenu allOrder" :class="{ active: chooseOrder == 'all' }" @click="chooseOrder = 'all'">全部订单</span>
				<span class="classifyOrderMenu alreadyPay" :class="{ active: chooseOrder == 'alreadyPay' }" @click="chooseOrder = 'alreadyPay'">已付款</span>
			</div>
		</div>
		<div class="orderList">
			<div class="graybg"></div>
			<div class="container">
				<table id="orderTable" class="orderTable" cellspacing="0" cellpadding="0">
					<thead>
						<tr class="thead">
							<th>订单号</th>
							<th>下单时间</th>
							<th>订单总额</th>
							<th>支付方式</th>
							<th>联系人</th>
							<th>付款状态</th>
							<th>发票状态</th>
							<th>订单内容</th>
							<th>分配情况</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="whiteDivide" colspan="9"></td>
						</tr>
						<template v-if="OrderList.length != 0">
							<template v-for="order in OrderList">
								<tr class="hasBorder" v-bind:key="order.Id">
									<td>{{ order.Id }}</td>
									<td>
										<span class="orderDate">{{ order.Date }}</span>
										<span class="orderTime">{{ order.Time }}</span>
									</td>
									<td>
										<strong>{{ order.Money }}</strong>
									</td>
									<td>{{ order.Payment }}</td>
									<td>{{ order.Contact }}</td>
									<td>
										<span class="payStatus" v-if="order.PayStatus == 1">已付款</span>
										<template v-else-if="order.PayStatus == 2">
											<span class="payStatus">未审核</span>
											<span class="cancelOrder" @click="showCancelBox(order.Id)">取消订单</span>
										</template>
										<template v-else-if="order.PayStatus == 0">
											<span class="payStatus">未支付</span>
											<span class="cancelOrder" @click="showCancelBox(order.Id)">取消订单</span>
										</template>
										<span class="payStatus" v-else-if="order.PayStatus == 5">已取消</span>
									</td>
									<td>
										<template v-if="order.PayStatus == 0 || order.PayStatus == 1 || order.PayStatus == 2">
											<template v-if="order.InvoiceType == 0">
												<span class="invoiceStatus">未填写</span>
												<router-link :to="{ path: '/orders/invoice', query: { no: this.$route.query.no, orderId: order.Id } }">去开票</router-link>
											</template>
											<span class="invoiceStatus" v-else-if="order.InvoiceType == 1 && order.InvoiceExpress != 0">已邮寄</span>
											<span class="invoiceStatus" v-else-if="order.InvoiceType == 255">不需要发票</span>
											<span class="invoiceStatus" v-else-if="order.InvoiceType == 2 && order.InvoiceStatus == 1">已发送邮箱</span>
											<span class="invoiceStatus" v-else>未开具</span>
										</template>
										<span class="invoiceStatus" v-else-if="order.PayStatus == 5">已取消</span>
									</td>
									<td>
										<table class="innerTable" cellspacing="0" cellpadding="0">
											<tr v-for="ticket in order.Tickets" v-bind:key="ticket.Type">
												<td>{{ ticket.TypeText }} x {{ ticket.Amount }}</td>
											</tr>
										</table>
									</td>
									<td>
										<table class="innerTable" cellspacing="0" cellpadding="0">
											<tr v-for="ticket in order.Tickets" v-bind:key="ticket.Type">
												<td>
													<template v-if="order.PayStatus == 5 || order.PayStatus == 0">
														<a class="allotLink noPay" to="javascript:void(0);">分配参会人</a>
														<span class="noPayTips">
															?
															<span class="noPayTipText">该订单{{ order.PayStatus == 5 ? "已取消" : "未支付" }}，分配无效。</span>
														</span>
													</template>
													<router-link v-else-if="ticket.Allot == 0" class="allotLink" :to="{ path: '/orders/allocation', query: { no: $route.query.no, orderId: order.Id, ticketType: ticket.Type }}">分配参会人</router-link>
													<span class="allotStatus" v-else-if="ticket.Allot == ticket.Amount">已全部分配</span>
													<template v-else>
														<span class="allotStatus">有{{ ticket.Amount - ticket.Allot }}张未分配</span>
														<router-link class="allotLink" :to="{ path: '/orders/allocation', query: { no: $route.query.no, orderId: order.Id, ticketType: ticket.Type }}">点击分配</router-link>
													</template>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr v-bind:key="'id' + order.Id">
									<td class="whiteDivide" colspan="9"></td>
								</tr>
							</template>
						</template>
						<template v-else-if="OrderList.length == 0 && chooseOrder == 'all'">
							<tr>
								<td class="noOrder" colspan="9">
									<p class="noOrderText">暂无订单~</p>
									<a class="buyTicketLink" :href="CurrentActivity.Link + 'register'" target="_blank">快去购票吧</a>
								</td>
							</tr>
							<tr>
								<td class="whiteDivide" colspan="9"></td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td class="noOrder" colspan="9">
									<p class="noPayOrderTtext">暂无已付款订单~</p>
									<button class="checkAllOrder" @click="checkAllOrder">查看全部订单</button>
								</td>
							</tr>
							<tr>
								<td class="whiteDivide" colspan="9"></td>
							</tr>
						</template>
					</tbody>
				</table>
				<div class="bankPayTips">
					<p class="bankPayTipsText lt">注：如选择了银行转账方式，请注意查收您的邮箱，我们会发送【付款提醒邮件】至您邮箱。</p>
					<a class="buyAgain rt" :href="CurrentActivity.Link +  'register'" target="_blank">继续购票</a>
				</div>
			</div>
		</div>
		<div class="fixedDialog cancelBox" v-show="isShow">
			<div class="fixedDialogBg"></div>
			<div class="fixedDialogWrapper">
				<div id="closeFixedDialog" class="closeFixedDialog" @click="closeDialog">×</div>
				<h3 class="fixedDialogTitle">取消订单</h3>
				<p class="fixedDialogDesc">您确定要取消订单吗？</p>
				<div class="fixedBtns">
					<button id="cancelBtn" class="cancelBtn" @click="closeDialog">取消</button>
					<button id="confirmBtn" class="confirmBtn" @click="confirmCancelOrder">确定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import { mapActions } from "vuex"
import MenuTitle from "@/components/MenuTitle.vue"
export default {
	data() {
		return {
			menuTitle: "我的订单",
			chooseOrder: "all",
			isShow: false
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
		OrderList() {
			this.no = this.$route.query.no
			return this.$store.getters.getCurrentOrderList(this.no, this.chooseOrder)
		}
	},
	methods: {
		showCancelBox(id) {
			this.isShow = true;
			this.willCancelOrderId = id;
		},
		closeDialog() {
			this.isShow = false;
			this.willCancelOrderId = 0;
		},
		// 在组件中使用 this.$store.dispatch('xxx') 分发 action
		// 或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		/*...mapActions({
			add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		})*/
		// ...mapActions({
		// 	confirmCancelOrder: "cancelOrderById"
		// })
		confirmCancelOrder() {
			this.$store.dispatch("cancelOrderById", { no: this.no, willCancelOrderId: this.willCancelOrderId })
			this.isShow = false;
		},
		checkAllOrder() {
			this.chooseOrder = "all";
		}
	}
}
</script>

<style lang="scss">
.orderDetail {
    width: calc(100% - 250px);
    width: -wekit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
}
.classifyOrder {
    height: 50px;
    background-color: #fff;
    padding-bottom: 15px;
	> .container {
		width: 97%;
	}
}
.classifyOrderMenu {
    box-sizing: border-box;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #181818;
    text-align: center;
    margin-top: 15px;
    cursor: pointer;
}
.allOrder {
    margin-right: 40px;
}
.classifyOrderMenu.active {
    color: #1683ef;
    border-bottom: 2px solid #1683ef;
}
.orderList {
	background-color: #fff;
	padding-bottom: 25px;
	> .container {
		width: 97%;
		margin-top: -50px;
	}
}
.graybg {
    width: 97%;
    margin: 0 auto;
    height: 50px;
    background-color: #EEEEEE;
}
.orderTable, .innerTable {
    width: 99.8%;
    font-size: 14px;
    text-align: center;
    border-collapse: collapse;
}
.thead {
	height: 50px;
	th {
		font-size: 15px;
    	font-weight: normal;
	}
}
td {
    height: 120px;
    min-height: 120px;
}
.whiteDivide {
    height: 15px;
    background-color: #fff;
}
.hasBorder, .hasBorder > td {
    border: 1px solid #DEDEDE;
}
.orderDate, .orderTime, .payStatus, .cancelOrder, .allotLink, .allotStatus, .invoiceStatus, .goInvoice {
    display: block;
}
.orderDate, .orderTime {
    height: 25px;
    line-height: 25px;
}
.payStatus {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #FF1C20;
}
.cancelOrder {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    font-size: 14px;
    color: #858585;
}
.innerTable {
    font-size: 14px;
	td {
		height: 60px;
	}
}
.innerTable tr:not(:last-child) td {
    border-bottom: 1px solid #DEDEDE;
}
.allotLink {
    line-height: 20px;
    color: #1683ef;
    text-decoration: underline;
    margin-top: 3px;
}
.noPay {
    display: inline-block;
    color: #999999;
    cursor: not-allowed;
    text-decoration: none;
}
.noPayTips {
    position: relative;
    display: inline-block;
    width: 17px;
    height: 17px;
    line-height: 20px;
    background-color: #C1C1C1;
    font-size: 14px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
.noPayTipText {
    position: absolute;
    width: 195px;
    height: 25px;
    line-height: 25px;
    top: -35px;
    left: -170px;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 2px;
    background-color: #EEEEEE;
    color: #181818;
    display: none;
}
.noPayTips:hover .noPayTipText {
    display: block;
}
.bankPayTips {
    overflow: hidden;
    height: 40px;
    margin: 25px 0;
}
.bankPayTipsText {
    width: 80%;
    font-size: 15px;
    line-height: 40px;
    color: #777777;
}
.noPayOrder {
    height: 120px;
}
.noPayOrderText, .noOrderText {
    font-size: 15px;
    color: #858585;
    margin-bottom: 10px;
}
.checkAllOrder{
    font-size: 15px;
    padding: 5px 10px;
    background-color: #1683ef;
    color: #fff;
    height: 30px;
    line-height: 20px;
	border-radius: 2px;
	cursor: pointer;
}
.buyTicketLink {
	padding: 5px 15px;
	font-size: 15px;
	line-height: 20px;
	background-color: #1683ef;
	color: #fff;
	border-radius: 2px;
}
@media screen and (max-width: 1400px) {
	.bankPayTipsText {
		line-height: 20px;
	}
}
.buyAgain {
    height: 40px;
    line-height: 40px;
    padding: 0 40px;
    font-size: 15px;
    background-color: #1683ef;
    color: #fff;
    border-radius: 2px;
}
.fixedDialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // display: none;
}
.fixedDialogBg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.fixedDialogWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 260px;
    height: 155px;
    background-color: #fff;
    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
}
.closeFixedDialog {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 30px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
}
.fixedDialogTitle {
    box-sizing: border-box;
    height: 45px;
    background-color: #F8F8F8;
    border-bottom: 1px solid #eeeeee;
    padding: 0 20px;
    font-size: 14px;
    color: #333333;
    line-height: 44px;
    font-weight: normal;
}
.fixedDialogDesc {
    box-sizing: border-box;
	height: 60px;
	font-size: 14px;
    padding: 20px;
}
.fixedBtns {
    box-sizing: border-box;
    height: 50px;
    padding: 10px 20px;
    text-align: right;
}
.cancelBtn, .confirmBtn {
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0 15px;
    background-color: #1683ef;
    color: #fff;
    cursor: pointer;
}
.cancelBtn {
	margin-right: 5px;
}
</style>


