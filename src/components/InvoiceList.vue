<template>
	<div class="invoiceManage">
		<MenuTitle v-bind:menuTitle="menuTitle"></MenuTitle>
		<div class="invoiceList">
			<div class="graybg"></div>
			<div class="container">
				<table id="invoiceTable" class="invoiceTable" cellspacing="0" cellpadding="0">
					<thead>
						<tr class="thead">
							<th>订单号</th>
							<th>下单时间</th>
							<th>订单总额</th>
							<th>联系人</th>
							<th>付款状态</th>
							<th>发票类型</th>
							<th>发票抬头</th>
							<th>开具情况</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="whiteDivide" colspan="8"></td>
						</tr>
						<tr class="hasBorder">
							<td>28650</td>
							<td>
								<span class="orderDate">2018-08-23</span>
								<span class="orderTime">11:20</span>
							</td>
							<td>
								<strong>￥15800</strong>
							</td>
							<td>张三</td>
							<td>未审核</td>
							<td>
								<span class="invoiceStatus">增值税专用发票</span>
								<a class="goInvoice" href="">去查看</a>
							</td>
							<td>某某某公司</td>
							<td>未开具</td>
						</tr>
						<tr>
							<td class="whiteDivide" colspan="8"></td>
						</tr>
					</tbody>
				</table>
				<div class="invoiceTip">
					<p class="invoiceTipText lt">注：发票一般在收款后7个工作日内开具，每张订单对应一张发票。电子发票将发送到您填写的联系人邮箱，专用发票将邮寄到您填写的发票地址。</p>
					<a class="buyAgain rt" :href="'tdc2018' + 'register'" target="_blank">继续购票</a>
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
			menuTitle: "发票管理"
		}
	},
	components: {
		MenuTitle
	}
}
</script>

<style lang="scss">
.invoiceManage {
    width: calc(100% - 250px);
    width: -wekit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
}
.invoiceList {
	padding: 25px 0;
	background-color: #fff;
	> .container {
		width: 97%;
		margin-top: -50px;
	}
}
.invoiceTable {
	width: 99.8%;
	font-size: 14px;
    text-align: center;
    border-collapse: collapse;
	.whiteDivide {
		height: 15px;
	}
	td {
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.goInvoice {
    line-height: 20px;
    color: #1683ef;
    text-decoration: underline;
    margin-top: 3px;
}
.invoiceTip {
    overflow: hidden;
    height: 40px;
    margin: 25px 0;
}
.invoiceTipText {
    width: 80%;
    font-size: 15px;
    line-height: 40px;
    color: #777777;
}
@media screen and (max-width: 1400px) {
	.invoiceTipText {
		line-height: 20px;
	}
}
</style>
