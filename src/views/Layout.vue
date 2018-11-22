<template>
	<div class="layout">
		<nav>
			<div class="container">
				<div class="navLogo lt">
					<router-link to="/">
						<img class="logoImg" src="@/assets/logo1.png">
					</router-link>
				</div>
				<b class="logoDivide lt"></b>
				<p class="logoDesc lt">报名信息管理</p>
				<ul class="navList rt">
					<li class="navItem lt">
						<div class="navItemCaret">
							<img src="@/assets/account.png">
						</div>
						<router-link class="navItemText" to="/account">我的账户</router-link>
					</li>
					<li class="navItem lt">
						<button @click="loginOut" class="loginOutBtn">退出</button>
					</li>
				</ul>
			</div>
		</nav>
		<div class="wrapper">
			<div class="container">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		loginOut() {
			sessionStorage.clear();
			localStorage.clear();
			this.$router.replace("/login")
		}
	}
}
</script>

<style lang="scss">
nav {
    width: 100%;
    height: 100px;
	background-color: #fff;
	> .container {
		width: 80%;
	}
}
.navLogo {
    width: 105px;
    height: 55px;
    overflow: hidden;
    margin-top: 23px;
}
.logoImg {
    width: 100%;
}
.logoDivide {
    display: block;
    height: 25px;
    border-left: 1px solid #CDCDCD;
    margin: 38px 15px 0 15px;
}
.logoDesc {
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    margin-top: 35px;
}
.navList {
    width: auto;
    height: 55px;
    line-height: 55px;
    overflow: hidden;
    margin-top: 23px;
}
.navItem:not(:last-child) {
    margin-right: 20px;
}
.navItemCaret, .navItemText {
    display: inline-block;
    vertical-align: middle;
}
.navItemCaret {
    margin-right: 5px;
}
.navItemText {
    color: #333333;
    font-size: 16px;
}
.loginOutBtn {
    display: inline-block;
    width: 60px;
	color: #333333;
	background-color: #fff;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}
.wrapper > .container {
	width: 80%;
}
</style>


