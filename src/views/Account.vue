<template>
	<div class="account">
		<div class="accountBar">
			<div class="container">
				<h3 class="accountTitle">我的账户</h3>
			</div>
		</div>
		<div class="accountBox">
			<div class="container">
				<div class="accountDesc">
					<p class="accountDescText">参会付款或参会提醒等重要信息，我们将通过短信/邮件/电话发送至联系人。</p>
					<p class="accountDescText">联系人手机号也是登录该平台的唯一凭证方式。</p>
					<p class="accountDescText">如下信息为您报名时所提交填写，如需变更联系人，请仔细核对信息。</p>
				</div>
				<div class="accountInfo">
					<ul class="infoTable">
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">联系人手机：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName">{{ 17520425633 }}</p>
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn">{{ btnText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">姓名：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowNameInput">叶胜</p>
								<input class="infoInput" v-show="isShowNameInput">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn">{{ btnText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">所属公司：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowCompanyInput">环球旅讯</p>
								<input class="infoInput" v-show="isShowCompanyInput">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn">{{ btnText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">职位：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowJobInput">开发</p>
								<input class="infoInput" v-show="isShowJobInput">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn">{{ btnText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">固话：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowTelInput"></p>
								<input class="infoInput" v-show="isShowTelInput">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn">{{ btnText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">邮箱：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowEmailInput">engels@traveldaily.cn</p>
								<input class="infoInput" v-show="isShowEmailInput">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn">{{ btnText }}</button>
							</div>
						</li>
					</ul>
					<button id="submitChangeAccount" class="submitChangeAccount" :disabled="isDisable">提交</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			btnText: "修改",
			isDisable: true
		}
	}
}
</script>

<style lang="scss">
.accountBar {
    height: 50px;
    line-height: 50px;
    margin: 25px 0;
    background-color: #fff;
	> .container {
		width: 95%;
	}
}
.accountTitle {
	font-size: 16px;
    color: #181818;
}
.accountBox {
    background-color: #fff;
	> .container {
		width: 95%;
	}
}
.accountDesc {
	font-size: 15px;
    line-height: 25px;
    margin: 20px 0 30px;
    color: #777777;
}
.accountInfo {
	margin-top: 25px;
    padding: 0 0 30px;
}
.infoGroup {
    height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
}
.infoColumn {
    position: relative;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    color: #181818;
	.changeBtn {
		height: 40px;
	}
}
.columnFirst {
    width: 100px;
    text-align: right;
    margin-right: 10px;
}
.columnSecond {
    width: 250px;
    text-align: left;
    margin-right: 20px;
}
.infoInput {
    position: absolute;
    top: 1px;
    left: 0;
    width: 100%;
    height: 38px;
    line-height: 38px;
    font-size: 15px;
    border: 1px solid #D3D3D3;
    padding: 0 10px;
    z-index: -1;
    opacity: 0;
}
.submitChangeAccount {
    display: block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    background-color: #1683ef;
    color: #fff;
    margin: 40px 0 40px 110px;
    cursor: pointer;
}
</style>


