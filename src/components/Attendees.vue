<template>
	<div class="attends-detail">
		<MenuTitle v-bind:menuTitle="menuTitle"></MenuTitle>
		这是参会人员信息管理组件
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

</style>
