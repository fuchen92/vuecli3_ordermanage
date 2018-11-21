<template>
	<div class="order-detail">
		<MenuTitle v-bind:menuTitle="menuTitle"></MenuTitle>
		<div class="classify-order">
			<div class="container">
				<span class="classify-ordermenu allorder" :class="{ active: chooseOrder == 'all' }" @click="chooseOrder = 'all'">全部订单</span>
				<span class="classify-ordermenu already-pay" :class="{ active: chooseOrder == 'alreadyPay' }" @click="chooseOrder = 'alreadyPay'">已付款</span>
			</div>
		</div>
		<div class="order-list">
			<div class="graybg"></div>
			<div class="container">
				<table id="orderTable" class="order-table" cellspacing="0" cellpadding="0">
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
							<td class="white-divide" colspan="9"></td>
						</tr>
						<template v-if="orderList.length != 0">
							<template v-for="order in orderList">
								<tr class="hasborder" v-bind:key="order.Id">
									<td>{{ order.Id }}</td>
									<td>
										<span class="order-date">{{ order.Date }}</span>
										<span class="order-time">{{ order.Time }}</span>
									</td>
									<td>
										<strong>{{ order.Money }}</strong>
									</td>
									<td>{{ order.Payment }}</td>
									<td>{{ order.Contact }}</td>
									<td>
										<span class="paystatus" v-if="order.PayStatus == 1">已付款</span>
										<template v-else-if="order.PayStatus == 2">
											<span class="paystatus">未审核</span>
											<span class="cancel-order" @click="showCancelBox(order.Id)">取消订单</span>
										</template>
										<template v-else-if="order.PayStatus == 0">
											<span class="paystatus">未支付</span>
											<span class="cancel-order" @click="showCancelBox(order.Id)">取消订单</span>
										</template>
										<span class="paystatus" v-else-if="order.PayStatus == 5">已取消</span>
									</td>
									<td>
										<template v-if="order.PayStatus == 0 || order.PayStatus == 1 || order.PayStatus == 2">
											<template v-if="order.InvoiceType == 0">
												<span class="invoicestatus">未填写</span>
												<router-link :to="{ path: '/orders/invoice', query: { no: this.$route.query.no, orderId: order.Id } }">去开票</router-link>
											</template>
											<span class="invoicestatus" v-else-if="order.InvoiceType == 1 && order.InvoiceExpress != 0">已邮寄</span>
											<span class="invoicestatus" v-else-if="order.InvoiceType == 255">不需要发票</span>
											<span class="invoicestatus" v-else-if="order.InvoiceType == 2 && order.InvoiceStatus == 1">已发送邮箱</span>
											<span class="invoicestatus" v-else>未开具</span>
										</template>
										<span class="invoicestatus" v-else-if="order.PayStatus == 5">已取消</span>
									</td>
									<td>
										<table class="inner-table" cellspacing="0" cellpadding="0">
											<tr v-for="ticket in order.Tickets" v-bind:key="ticket.Type">
												<td>{{ ticket.TypeText }} x {{ ticket.Amount }}</td>
											</tr>
										</table>
									</td>
									<td>
										<table class="inner-table" cellspacing="0" cellpadding="0">
											<tr v-for="ticket in order.Tickets" v-bind:key="ticket.Type">
												<td>
													<template v-if="order.PayStatus == 5 || order.PayStatus == 0">
														<a class="allot-link nopay" to="javascript:void(0);">分配参会人</a>
														<span class="nopay-tips">
															?
															<span class="nopaytip-text">该订单{{ order.PayStatus == 5 ? "已取消" : "未支付" }}，分配无效。</span>
														</span>
													</template>
													<router-link v-else-if="ticket.Allot == 0" class="allot-link" :to="{ path: '/orders/allocation', query: { no: $route.query.no, orderId: order.Id, ticketType: ticket.Type }}">分配参会人</router-link>
													<span class="allot-status" v-else-if="ticket.Allot == ticket.Amount">已全部分配</span>
													<template v-else>
														<span class="allot-status allot-tips">有{{ ticket.Amount - ticket.Allot }}张未分配</span>
														<router-link class="allot-link" :to="{ path: '/orders/allocation', query: { no: $route.query.no, orderId: order.Id, ticketType: ticket.Type }}">点击分配</router-link>
													</template>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr v-bind:key="'id' + order.Id">
									<td class="white-divide" colspan="9"></td>
								</tr>
							</template>
						</template>
						<template v-else-if="orderList.length == 0 && chooseOrder == 'all'">
							<tr>
								<td class="no-order" colspan="9">
									<p class="noorder-text">暂无订单~</p>
									<a class="buyticket-link" :href="currentActivity.Link + 'register'" target="_blank">快去购票吧</a>
								</td>
							</tr>
							<tr>
								<td class="white-divide" colspan="9"></td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td class="no-order" colspan="9">
									<p class="nopayorder-text">暂无已付款订单~</p>
									<button class="checkAllOrder" @click="checkAllOrder">查看全部订单</button>
								</td>
							</tr>
							<tr>
								<td class="white-divide" colspan="9"></td>
							</tr>
						</template>
					</tbody>
				</table>
				<div class="pay-tips">
					<p class="paytips-text lt">注：如选择了银行转账方式，请注意查收您的邮箱，我们会发送【付款提醒邮件】至您邮箱。</p>
					<a class="buy-again rt" :href="currentActivity.Link +  'register'" target="_blank">继续购票</a>
				</div>
			</div>
		</div>
		<div class="fixedDialog cancelBox" v-show="isShow">
			<div class="fixedDialog-bg"></div>
			<div class="fixedDialog-wrapper">
				<div id="closeFixedDialog" class="closeFixedDialog" @click="closeDialog">×</div>
				<h3 class="fixedDialog-title">取消订单</h3>
				<p class="fixedDialog-desc">您确定要取消订单吗？</p>
				<div class="fixedBtns">
					<button id="cancelBtn" type="button" class="cancelBtn" @click="closeDialog">取消</button>
					<button id="confirmBtn" type="button" class="confirmBtn" @click="confirmCancelOrder">确定</button>
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
		currentActivity() {
			this.no = this.$route.query.no
			return this.$store.getters.getActivityByNo(this.no)
		},
		orderList() {
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
.order-detail {
    width: calc(100% - 250px);
    width: -wekit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
}
.classify-order {
    height: 50px;
    background-color: #fff;
    padding-bottom: 15px;
	> .container {
		width: 97%;
	}
}
.classify-ordermenu {
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
.allorder {
    margin-right: 40px;
}
.classify-ordermenu.active {
    color: #1683ef;
    border-bottom: 2px solid #1683ef;
}
.order-list {
    // display: block;
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
.order-table, .inner-table {
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
.white-divide {
    height: 15px;
    background-color: #fff;
}
.hasborder, .hasborder > td {
    border: 1px solid #DEDEDE;
}
.order-date, .order-time, .paystatus, .cancel-order, .allot-link, .allot-status, .invoiceStatus, .goInvoice {
    display: block;
}
.order-date, .order-time {
    height: 25px;
    line-height: 25px;
}
.paystatus {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #FF1C20;
}
.cancel-order {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    font-size: 14px;
    color: #858585;
}
.inner-table {
    font-size: 14px;
	td {
		height: 60px;
	}
}
.inner-table tr:not(:last-child) td {
    border-bottom: 1px solid #DEDEDE;
}
.allot-link {
    line-height: 20px;
    color: #1683ef;
    text-decoration: underline;
    margin-top: 3px;
}
.nopay {
    display: inline-block;
    color: #999999;
    cursor: not-allowed;
    text-decoration: none;
}
.nopay-tips {
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
.nopaytip-text {
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
.nopay-tips:hover .nopaytip-text {
    display: block;
}
.pay-tips {
    overflow: hidden;
    height: 40px;
    margin: 25px 0;
}
.paytips-text {
    width: 80%;
    font-size: 15px;
    line-height: 40px;
    color: #777777;
}
.nopay-order {
    height: 120px;
}
.nopayorder-text, .noorder-text {
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
.buyticket-link {
	padding: 5px 15px;
	font-size: 15px;
	line-height: 20px;
	background-color: #1683ef;
	color: #fff;
	border-radius: 2px;
}
@media screen and (max-width: 1400px) {
	.paytips-text {
		line-height: 20px;
	}
}
.buy-again {
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
.fixedDialog-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.fixedDialog-wrapper {
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
.fixedDialog-title {
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
.fixedDialog-desc {
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


