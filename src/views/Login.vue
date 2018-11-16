<template>
	<div class="loginBox">
		<div class="logo">
			<img src="@/assets/logo1.png">
			<b class="divide"></b>
			<h3 class="logo-title">报名信息管理</h3>
    	</div>
		<p class="mobile-tips">为保证优质体验，请在电脑端打开此链接</p>
		<p class="mobile-link">http://www.baidu.com</p>
		<div class="loginForm">
			<div class="form-group clear">
				<input id="mobile" class="form-input" type="text" placeholder="请输入报名时填写的联系人手机号" ref="mobile" v-model.trim="mobile">
			</div>
			<div class="form-group clear">
                <input id="valicode" class="form-input lt" type="text" maxlength="6" placeholder="验证码" ref="valicode" v-model.trim="valicode">
                <button id="getValicode" class="getValicode rt" @click="getValicode" :disabled="isGettedCode">{{ getValicodeBtnText }}</button>
            </div>
			<div class="form-group clear">
                <label for="autologin" class="autologin">
                    <input id="autologin" class="form-checkbox" type="checkbox" v-model="autoLogin">
                    <i></i>
                    自动登录
                </label>
                <p id="tips" class="tips" v-show="isError">{{ errorTip }}</p>
            </div>
			<div class="form-group clear" style="overflow: visible;">
                <button id="loginBtn" class="login-btn" @click="login">登录</button>
                <div class="cantlogin">
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
				this.$router.push({ path: "/" + _redirect })
			} else {
				this.$router.push({ path: "/" })
			}
		}
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
.logo {
    height: 60px;
    margin-bottom: 65px;
    overflow: hidden;
    text-align: center;
}
.logo > img {
    display: inline-block;
    vertical-align: middle;
    width: 130px;
}
.divide {
    display: inline-block;
    vertical-align: middle;
    height: 15px;
    border-left: 1px solid #CDCDCD;
    margin: 0 15px;
}
.logo-title {
    display: inline-block;
    vertical-align: middle;
    font-weight: normal;
    font-size: 22px;
}
.mobile-tips, .mobile-link {
	display: none;
}
.form-group {
    position: relative;
    overflow: hidden;
}
.form-input {
    width: 100%;
    height: 45px;
    font-size: 15px;
    padding: 0 10px;
    border: 1px solid #D3D3D3;
    background-color: #fff;
}
#mobile {
    margin-bottom: 15px;
}
#valicode {
    width: 280px;
    margin-right: 15px;
}
input:disabled, button:disabled {
    cursor: not-allowed;
}
.getValicode {
    width: 135px;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    border: 1px solid #D3D3D3;
    background-color: #fff;
    color: #181818;
    cursor: pointer;
}
.autologin {
    display: block;
	margin: 20px 0 60px;
	font-size: 14px;
    cursor: pointer;
}
.form-checkbox {
    display: none;
}
.form-checkbox + i {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 5px;
    border: 1px solid #D3D3D3;
}
.form-checkbox:checked + i:after {
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
    // display: none;
}
.login-btn {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #1683ef;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
}
.cantlogin {
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


