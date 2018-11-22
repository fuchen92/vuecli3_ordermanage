<template>
	<div class="attends-detail">
		<MenuTitle v-bind:menuTitle="menuTitle"></MenuTitle>
		<div class="attends-info">
			<div class="container">
				<p class="attends-desc">
					尊敬的环旅嘉宾，您总共预定了 <span class="ticket-count">8</span> 张门票，已分配 <span class="ticket-count">5</span> 张，还有 <span class="ticket-count">3</span> 张未分配。
				</p>
			</div>
		</div>
		<div class="allot-list">
			<div class="allot-title-bg"></div>
			<div class="container">
				<table id="allotTable" class="allot-table" cellspacing="0" cellpadding="0">
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
							<td class="white-divide" colspan="11"></td>
						</tr>
						<tr v-if="allotList.length == 0">
							<td class="no-allot" colspan="11">
								您暂未分配门票
							</td>
						</tr>
						<template v-else>
							<tr class="hasborder" style="border: 0;">
								<td class="already-allot" rowspan="6" style="border: none;">已分配门票</td>
								<td colspan="10" style="border: 0; height: 0;"></td>
							</tr>
							<tr v-for="allot in allotList" v-bind:key="allot" class="hasborder alloted">
								<td class="allotId" style="width: 50px;">{{ allot.Id }}</td>
							</tr>
						</template>

					</tbody>
				</table>
				<p class="allot-tips">
					您还有 <span class="ticket-count">3</span> 张门票未分配，请 <a class="ticket-link" href="orders?no=63">点击查看</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import MenuTitle from "@/components/MenuTitle.vue"
export default {
	data() {
		return {
			menuTitle: "参会人员信息管理"
		}
	},
	components: {
		MenuTitle
	}
}
</script>

<style lang="scss">
.attends-detail {
    width: calc(100% - 250px);
    width: -wekit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
}
.attends-info {
    height: 65px;
    background-color: #fff;
	> .container {
		width: 97%;
	}
}
.attends-desc {
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    margin: 22px 30px 0 0;
}
.ticket-count {
    color: #E54144;
}
.allot-list {
    background-color: #fff;
	> .container {
		width: 97%;
		margin-top: -40px;
	}
}
.allot-title-bg {
    width: 97%;
    height: 40px;
    margin: 0 auto;
    background-color: #EEEEEE;
}
.allot-table {
    width: 99.8%;
    font-size: 15px;
    text-align: center;
    border-collapse: collapse;
    margin-bottom: 30px;
    table-layout: fixed;
}
td {
    height: 55px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.already-allot {
    font-size: 15px;
    border: none;
    background-color: #EEEEEE;
    color: #333333;
}
.allot-tips {
    box-sizing: border-box;
    height: 50px;
    font-size: 15px;
    line-height: 50px;
    padding: 0 15px;
    border: 1px solid #DEDEDE;
    margin-bottom: 40px;
}
</style>
