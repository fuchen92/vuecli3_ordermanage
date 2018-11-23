<template>
	<div class="loginBox">
		<div class="loginLogo">
			<img src="@/assets/logo1.png">
			<b class="divide"></b>
			<h3 class="logoTitle">报名信息管理</h3>
    	</div>
		<p class="mobileTips">为保证优质体验，请在电脑端打开此链接</p>
		<p class="mobileLink">http://www.baidu.com</p>
		<div class="loginForm">
			<div class="formGroup clear">
				<input v-model.trim="mobile" ref="mobile" id="mobile" class="formInput" placeholder="请输入报名时填写的联系人手机号">
			</div>
			<div class="formGroup clear">
                <input v-model.trim="valicode" ref="valicode" id="valicode" class="formInput lt" maxlength="6" placeholder="验证码">
                <button @click="getValicode" v-bind:disabled="isGettedCode" id="getValicode" class="getValicode rt">{{ getValicodeBtnText }}</button>
            </div>
			<div class="formGroup clear">
                <label for="autoLogin" class="autoLogin">
                    <input v-model="autoLogin" id="autoLogin" class="formCheckbox" type="checkbox">
                    <i></i>
                    自动登录
                </label>
                <p v-show="isError" id="tips" class="tips">{{ errorTip }}</p>
            </div>
			<div class="formGroup clear" style="overflow: visible;">
                <button @click="login" id="loginBtn" class="loginBtn">登录</button>
                <div class="cantLogin">
                    无法登录？
                    <div class="contact">
                        如您无法登录，可联系我们 020-28829750
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex"
export default {
	name: "login",
	data() {
		return {
			mobile: "",
			valicode: "",
			isGettedCode: false,
			getValicodeBtnText: "获取验证码",
			autoLogin: false,
			isError: false,
			errorTip: "手机号码不能为空",
			num: 59,
			timer: "",
			token: "allowlogin"
		}
	},
	methods: {
		getValicode: function() {
			if(this.isGettedCode == true) {
				return;
			}
			if(this.mobile == "") {
				this.errorTip = "手机号码不能为空";
				this.isError = true;
				this.$refs.mobile.focus();
				return;
			} else if (!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|(^09\d{8}$)|(^[569]\d{7}$)|(^(66|62)\d{6}$)/.test(this.mobile)) {
				this.errorTip = "手机号码格式不正确，请检查";
				this.isError = true;
				this.$refs.mobile.focus();
				return;
			} else {
				this.isError = false;
				this.getValicodeBtnText = this.num + "s";
				this.isGettedCode = true;
				this.timer = setInterval(() => {
					this.num--;
					this.getValicodeBtnText = this.num + "s";
					if(this.num <= 0) {
						this.num = 59;
						clearInterval(this.timer);
						this.timer = null;
						this.isGettedCode = false;
						this.getValicodeBtnText = "重新发送";
					}
				}, 1000)
			}
		},
		login: function() {
			const { mobile, valicode, autoLogin } = this;
			if(mobile == "") {
				this.errorTip = "手机号码不能为空";
				this.isError = true;
				this.$refs.mobile.focus();
				return;
			} else if(!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|(^09\d{8}$)|(^[569]\d{7}$)|(^(66|62)\d{6}$)/.test(this.mobile)) {
				this.errorTip = "手机号码格式不正确，请检查";
				this.isError = true;
				this.$refs.mobile.focus();
				return;
			}
			if(valicode == "") {
				this.errorTip = "请输入验证码";
				this.isError = true;
				this.$refs.valicode.focus();
				return;
			} else if(!/\d{6}/.test(valicode)) {
				this.errorTip = "验证码是6位数字";
				this.isError = true;
				this.$refs.valicode.focus();
				return;
			}
			this.isError = false;
			var logininfo = {
				mobile: mobile,
				token: this.token
			}
			sessionStorage.setItem("user", JSON.stringify(logininfo))
			var order = {
				mobile: mobile,
				valicode: valicode,
				autologin: autoLogin
			}
			// alert("恭喜你，登录成功");
			let _redirect = this.$route.query.redirect
			if (_redirect) {
				this.$router.push({ path: "/" + _redirect, query: { no: this.$route.query.no } })
			} else {
				this.$router.push({ path: "/" })
			}
		},
		// 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions({
			initAccount: "getUserAccount",
			initActivityList: "getActivities",
			initOrders: "getOrders",
			initAllots: "getAllots"
		})
	},
	beforeDestroy() {
		clearInterval(this.timer)
		this.timer = null;
		this.initAccount(this.mobile)
		this.initActivityList()
		this.initOrders()
		this.initAllots()
	}
}
</script>

<style lang="scss" scoped>
.loginBox {
	position: absolute;
    top: 50%;
    left: 50%;
    width: 430px;
    height: auto;
    transform: translate(-50%, -50%);
}
.loginLogo {
	width: 100%;
    height: 60px;
    margin-bottom: 65px;
    overflow: hidden;
    text-align: center;
}
.loginLogo > img, .divide, .logoTitle {
	display: inline-block;
	vertical-align: middle;
}
.loginLogo > img {
    width: 130px;
}
.divide {
    height: 15px;
    border-left: 1px solid #CDCDCD;
    margin: 0 15px;
}
.logoTitle {
    font-weight: normal;
    font-size: 22px;
}
.mobileTips, .mobileLink {
	display: none;
}
.formGroup {
	position: relative;
	margin-bottom: 0;
}
.formInput {
    height: 45px;
}
#mobile {
    margin-bottom: 15px;
}
#valicode {
    width: 280px;
    margin-right: 15px;
}
.getValicode {
    width: 135px;
	height: 45px;
	padding: 0;
    font-size: 15px;
    line-height: 45px;
    border: 1px solid #D3D3D3;
    background-color: #fff;
    color: #181818;
    cursor: pointer;
}
.autoLogin {
    display: block;
	margin: 20px 0 60px;
	font-size: 14px;
    cursor: pointer;
}
.formCheckbox {
    display: none;
}
.formCheckbox + i {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 5px;
    border: 1px solid #D3D3D3;
}
.formCheckbox:checked + i:after {
    position: absolute;
    display: block;
    content: "";
    width: 4px;
    height: 9px;
    top: -2px;
    left: 3px;
    border-bottom: 2px solid #1683ef;
    border-right: 2px solid #1683ef;
    transform: rotate(40deg);
}
.tips {
    position: absolute;
    bottom: 25px;
    left: 0;
	width: 100%;
	font-size: 14px;
    color: red;
}
.loginBtn {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #1683ef;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}
.cantLogin {
    position: relative;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: #1683ef;
    margin-top: 20px;
	cursor: pointer;
	.contact {
		position: absolute;
		width: 350px;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #fff;
		color: #858585;
		display: none;
	}
	.contact::before {
		position: absolute;
		display: block;
		content: "";
		border: 10px solid transparent;
		border-bottom-color: #fff;
		top: -19px;
		left: 165px;
	}
	&:hover .contact {
		display: block;
	}
}
</style>


