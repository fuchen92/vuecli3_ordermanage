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
						<template v-for="order in orderList">
							<tr class="hasborder" v-bind:key="order.id">
								<td>{{ order.id }}</td>
								<td>
									<span class="order-date">{{ order.date }}</span>
									<span class="order-time">{{ order.time }}</span>
								</td>
								<td>
									<strong>{{ order.money }}</strong>
								</td>
								<td>{{ order.payment }}</td>
								<td>{{ order.contact }}</td>
								<td>
									<span class="paystatus" v-if="order.paystatus == 2 || order.passtatus == 3">已付款</span>
									<template v-else-if="order.paystatus == 0">
										<span class="paystatus">未审核</span>
										<span class="cancel-order" @click="cancelOrder(order.id)">取消订单</span>
									</template>
									<template v-else-if="order.paystatus == 1">
										<span class="paystatus">未支付</span>
										<span class="cancel-order" @click="cancelOrder(order.id)">取消订单</span>
									</template>
									<span class="paystatus" v-else-if="order.paystatus == 5">已取消</span>
								</td>
								<td>
									<template v-if="order.paystatus == 0 || order.paystatus == 1 || order.paystatus == 2 || order.paystatus == 3">
										<template v-if="order.invoiceType == 0">
											<span class="invoicestatus">未填写</span>
											<router-link :to="{ path: '/orders/invoice', query: { no: this.$route.query.no, orderId: order.id } }">去开票</router-link>
										</template>
										<span class="invoicestatus" v-else-if="order.invoiceType == 1 && order.invoiceExpress != 0">已邮寄</span>
										<span class="invoicestatus" v-else-if="order.invoiceType == 255">不需要发票</span>
										<span class="invoicestatus" v-else-if="order.invoiceType == 3 && order.invoiceStatus == 1">已发送邮箱</span>
										<span class="invoicestatus" v-else>未开具</span>
									</template>
									<span class="invoicestatus" v-else-if="order.paystatus == 5">已取消</span>
								</td>
								<td>
									<table class="inner-table" cellspacing="0" cellpadding="0">
										<tr v-for="ticket in order.tickets" v-bind:key="ticket.type">
											<td>{{ ticket.typeText }} x {{ ticket.amount }}</td>
										</tr>
									</table>
								</td>
								<td>
									<table class="inner-table" cellspacing="0" cellpadding="0">
										<tr v-for="ticket in order.tickets" v-bind:key="ticket.type">
											<td>
												<template v-if="order.paystatus == 5">
													<a class="allot-link nopay" to="javascript:void(0);">分配参会人</a>
													<span class="nopay-tips">
														?
														<span class="nopaytip-text">该订单已取消，分配无效。</span>
													</span>
												</template>
												<router-link class="allot-link" :to="{ path: '/orders/allocation', query: { no: $route.query.no, orderId: order.id, ticketType: ticket.type }}" v-else-if="ticket.allot == 0">分配参会人</router-link>
												<span class="allot-status" v-else-if="ticket.allot == ticket.amount">已全部分配</span>
												<template v-else>
													<span class="allot-status allot-tips">有{{ ticket.amount - ticket.allot }}张未分配</span>
                        							<router-link class="allot-link" :to="{ path: '/orders/allocation', query: { no: $route.query.no, orderId: order.id, ticketType: ticket.type }}">点击分配</router-link>
												</template>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr v-bind:key="order.id + 1">
								<td class="white-divide" colspan="9"></td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import MenuTitle from "@/components/MenuTitle.vue"
export default {
	mounted() {
		console.log(this)
	},
	data() {
		return {
			menuTitle: "我的订单",
			chooseOrder: "all",
			orderList: [
				{
					id: 28650,
					date: "2018-08-22",
					time: "10:18",
					money: 13200.00,
					payment: "支付宝",
					contact: "习大大",
					paystatus: 5,			// 2 3 已付款，0 已付款，未审核，1 未支付，5 已取消
					invoiceType: 1,			// 0 未填写，255 不需要发票，1（纸质发票） 3（电子发票） 已填写
					invoiceExpress: 0,		// 1 已邮寄
					invoiceStatus: 10,		// 1 已发送至邮箱
					tickets: [
						{
							type: 1,
							typeText: "VIP票",
							amount: 2,
							allot: 2
						},
						{
							type: 2,
							typeText: "直通票",
							amount: 2,
							allot: 1
						},
						{
							type: 3,
							typeText: "普通票",
							amount: 2,
							allot: 1
						},
						{
							type: 4,
							typeText: "展览票",
							amount: 2,
							allot: 1
						}
					]

				}
			]
		}
	},
	components: {
		MenuTitle
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
</style>


