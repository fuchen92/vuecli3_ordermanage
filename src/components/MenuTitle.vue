<template>
	<div class="menu-title-box">
		<div class="container">
			<h3 class="menu-title">{{ menuTitle }}</h3>
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
.menu-title-box {
	height: 50px;
    line-height: 50px;
    background-color: #fff;
    margin-bottom: 20px;
	> .container {
		width: 97%;
	}
}
.menu-title {
	font-size: 16px;
}
</style>

