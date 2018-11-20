<template>
	<div class="layout">
		<nav>
			<div class="container">
				<div class="logo lt">
					<router-link to="/">
						<img class="logo-img" src="@/assets/logo1.png">
					</router-link>
				</div>
				<b class="logo-divide lt"></b>
				<p class="logo-desc lt">报名信息管理</p>
				<ul class="nav-list rt">
					<li class="nav-item lt">
						<div class="navitem-caret">
							<img src="@/assets/account.png">
						</div>
						<router-link class="navitem-text" to="/account">我的账户</router-link>
					</li>
					<li class="nav-item lt">
						<button class="loginout-btn" @click="loginout">退出</button>
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
		loginout() {
			sessionStorage.clear();
			localStorage.clear();
			console.log(111)
			console.log(this)
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
.logo {
    width: 105px;
    height: 55px;
    overflow: hidden;
    margin-top: 23px;
}
.logo-img {
    width: 100%;
}
.logo-divide {
    display: block;
    height: 25px;
    border-left: 1px solid #CDCDCD;
    margin: 38px 15px 0 15px;
}
.logo-desc {
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    margin-top: 35px;
}
.nav-list {
    width: auto;
    height: 55px;
    line-height: 55px;
    overflow: hidden;
    margin-top: 23px;
}
.nav-item:not(:last-child) {
    margin-right: 20px;
}
.navitem-caret, .navitem-text {
    display: inline-block;
    vertical-align: middle;
}
.navitem-caret {
    margin-right: 5px;
}
.navitem-text {
    color: #333333;
    font-size: 16px;
}
.loginout-btn {
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


