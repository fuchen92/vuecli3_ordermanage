<template>
	<div class="invoiceList-manage">
		<MenuTitle v-bind:menuTitle="menuTitle"></MenuTitle>
		这是发票管理组件级页面
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
.invoiceList-manage {
    width: calc(100% - 250px);
    width: -wekit-calc(100% - 250px);
    width: -moz-calc(100% - 250px);
}

</style>
