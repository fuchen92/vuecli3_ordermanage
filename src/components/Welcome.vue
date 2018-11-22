<template>
	<div class="welcome">
		<h1 class="welcomeText lt">{{ UserName }}，您好！</h1>
	</div>
</template>

<script>
export default {
	props: {
		UserName: {
			type: String,
			default: "习大大"
		}
	}
}
</script>

<style lang="scss">
.welcome {
    box-sizing: border-box;
    height: 60px;
    padding: 15px 0;
    overflow: hidden;
}
.welcomeText {
    font-size: 15px;
    line-height: 30px;
    font-weight: normal;
}
</style>


