<template>
	<div class="menuTitleBox">
		<div class="container">
			<h3 class="menuTitle">{{ menuTitle }}</h3>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		menuTitle: {
			type: String,
			require: true
		}
	}
}
</script>

<style lang="scss">
.menuTitleBox {
	height: 50px;
    line-height: 50px;
    background-color: #fff;
    margin-bottom: 20px;
	> .container {
		width: 97%;
	}
}
.menuTitle {
	font-size: 16px;
}
</style>

