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
								<p class="infoName">{{ Mobile }}</p>
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn" @click="showMobileDialog">修改</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">姓名：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowNameInput">{{ Name }}</p>
								<input class="infoInput" :class="{ 'changeActive': isShowNameInput }" ref="name" v-show="isShowNameInput" v-model="localAccount.Name" :placeholder="Name">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn" @click="switchShowInput($event.target)" data-type="name">{{ nameButtonText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">所属公司：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowCompanyInput">{{ Company }}</p>
								<input class="infoInput" :class="{ 'changeActive': isShowCompanyInput }" ref="company" v-show="isShowCompanyInput" v-model="localAccount.Company" :placeholder="Company">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn" @click="switchShowInput($event.target)" data-type="company">{{ companyButtonText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">职位：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowJobInput">{{ Job }}</p>
								<input class="infoInput" :class="{ 'changeActive': isShowJobInput }" ref="job" v-show="isShowJobInput" v-model="localAccount.Job" :placeholder="Job">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn" @click="switchShowInput($event.target)" data-type="job">{{ jobButtonText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">固话：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowTelInput">{{ Tel }}</p>
								<input class="infoInput" :class="{ 'changeActive': isShowTelInput }" ref="tel" v-show="isShowTelInput" v-model="localAccount.Tel" :placeholder="Tel">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn" @click="switchShowInput($event.target)" data-type="tel">{{ telButtonText }}</button>
							</div>
						</li>
						<li class="infoGroup">
							<div class="infoColumn columnFirst lt">邮箱：</div>
							<div class="infoColumn columnSecond lt">
								<p class="infoName" v-show="!isShowEmailInput">{{ Email }}</p>
								<input class="infoInput" :class="{ 'changeActive': isShowEmailInput }" ref="email" v-show="isShowEmailInput" v-model="localAccount.Email" :placeholder="Email">
							</div>
							<div class="infoColumn columnThird lt">
								<button class="changeBtn" @click="switchShowInput($event.target)" data-type="email">{{ emailButtonText }}</button>
							</div>
						</li>
					</ul>
					<button id="submitChangeAccount" class="submitChangeAccount" @click="submitChangeAccount" :disabled="isDisable">提交</button>
				</div>
			</div>
		</div>
		<div class="changeMobileDialog" v-show="isShowDialog">
			<div class="changeDialogBg"></div>
			<div class="changeDialogWrapper">
				<div class="closeDialog" @click="closeDialog">×</div>
				<h3 class="changeDialogTitle">修改手机</h3>
				<div class="changeDialogContent">
					<p class="changeMobileTips">联系人手机是登录该管理后台的唯一方式，请谨慎修改。</p>
					<div class="formGroup">
						<input class="changeInput" ref="mobile" v-model.trim="willChangeMobile" placeholder="请输入新手机号">
					</div>
					<div class="formGroup">
						<input class="changeInput valiCodeInput lt" ref="valicode" v-model.trim="valicode"  placeholder="验证码">
						<button class="getValicode lt" v-bind:disabled="isGettedCode" @click="getValicode">{{ getValicodeBtnText }}</button>
					</div>
					<div class="changeDialogBtns">
						<button class="submitChangeMobile" @click="submitChangeMobile">提交</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
	data() {
		return {
			isShowDialog: false,
			isGettedCode: false,
			willChangeMobile: "",
			valicode: "",
			getValicodeBtnText: "发送手机验证码",
			num: 59,
			timer: null,
			isDisable: true,
			isShowNameInput: false,
			isShowCompanyInput: false,
			isShowJobInput: false,
			isShowTelInput: false,
			isShowEmailInput: false,
			nameButtonText: "修改",
			companyButtonText: "修改",
			jobButtonText: "修改",
			telButtonText: "修改",
			emailButtonText: "修改",
			// localAccount: {}
		}
	},
	computed: {
		...mapState({
			Mobile: state => state.Account.Mobile,
			Name: state => state.Account.Name,
			Company: state => state.Account.Company,
			Job: state => state.Account.Job,
			Tel: state => state.Account.Tel,
			Email: state => state.Account.Email
		}),
		localAccount() {
			return Object.assign({}, {
				Name: this.Name,
				Company: this.Company,
				Job: this.Job,
				Tel: this.Tel,
				Email: this.Email
			})

		}
	},
	methods: {
		switchShowInput(target) {
			var type = target.dataset.type;
			// switch(type) {
			// 	case "name":
			// 		this.isShowNameInput = !this.isShowNameInput;
			// 		this.nameButtonText = this.isShowNameInput ? "取消" : "修改";
			// 		break;
			// 	case "company":
			// 		this.isShowCompanyInput = !this.isShowCompanyInput;
			// 		this.companyButtonText = this.isShowCompanyInput ? "取消" : "修改";
			// 		break;
			// 	case "job":
			// 		this.isShowJobInput = !this.isShowJobInput;
			// 		this.jobButtonText = this.isShowJobInput ? "取消" : "修改";
			// 		break;
			// 	case "tel":
			// 		this.isShowTelInput = !this.isShowTelInput;
			// 		this.telButtonText = this.isShowTelInput ? "取消" : "修改";
			// 		break;
			// 	case "email":
			// 		this.isShowEmailInput = !this.isShowEmailInput;
			// 		this.emailButtonText = this.isShowEmailInput ? "取消" : "修改";
			// 		break;
			// }
			this['isShow' + this.capitalize(type) + 'Input'] = !this['isShow' + this.capitalize(type) + 'Input'];
			this[type + 'ButtonText'] = this['isShow' + this.capitalize(type) + 'Input'] ? "取消" : "修改";
			var statusArr = [this.isShowNameInput, this.isShowCompanyInput, this.isShowJobInput, this.isShowTelInput, this.isShowEmailInput].filter((status) => {
				return status == true
			})
			this.isDisable = statusArr.length == 0 ? true : false

		},
		capitalize: function(value) {
			if (!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		},
		showMobileDialog() {
			this.isShowDialog = true;
		},
		closeDialog() {
			this.willChangeMobile = "";
			this.valicode = "";
			this.num = 59;
			clearInterval(this.timer);
			this.timer = null;
			this.isGettedCode = false;
			this.getValicodeBtnText = "发送手机验证码";
			this.isShowDialog = false;
		},
		getValicode: function() {
			if(this.isGettedCode == true) {
				return;
			}
			if(this.willChangeMobile == "") {
				alert("手机号码不能为空");
				this.$refs.mobile.focus();
				return;
			} else if (!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|(^09\d{8}$)|(^[569]\d{7}$)|(^(66|62)\d{6}$)/.test(this.willChangeMobile)) {
				alert("手机号码格式不正确，请检查");
				this.$refs.mobile.focus();
				return;
			} else {
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
		submitChangeMobile() {
			const { willChangeMobile, valicode } = this;
			if(willChangeMobile == "") {
				alert("手机号码不能为空");
				this.$refs.mobile.focus();
				return;
			} else if (!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|(^09\d{8}$)|(^[569]\d{7}$)|(^(66|62)\d{6}$)/.test(willChangeMobile)) {
				alert("手机号码格式不正确，请检查");
				this.$refs.mobile.focus();
				return;
			}
			if(valicode == "") {
				alert("请输入验证码");
				this.$refs.valicode.focus();
				return;
			} else if(!/\d{6}/.test(valicode)) {
				alert("验证码是6位数字");
				this.$refs.valicode.focus();
				return;
			}
			this.setAccountMobile({ willChangeMobile })
			this.willChangeMobile = "";
			this.valicode = "";
			this.num = 59;
			clearInterval(this.timer);
			this.timer = null;
			this.isGettedCode = false;
			this.getValicodeBtnText = "发送手机验证码";
			this.isShowDialog = false;
		},
		submitChangeAccount() {
			var originArr = [
					{ val: this.localAccount.Name, needValidate: this.isShowNameInput, ref: this.$refs.name, tip: "姓名" },
					{ val: this.localAccount.Company, needValidate: this.isShowCompanyInput, ref: this.$refs.company, tip: "公司" },
					{ val: this.localAccount.Job, needValidate: this.isShowJobInput, ref: this.$refs.job, tip: "职位" },
					{ val: this.localAccount.Tel, needValidate: this.isShowTelInput, ref: this.$refs.tel, tip: "电话" },
					{ val: this.localAccount.Email, needValidate: this.isShowEmailInput, ref: this.$refs.email, tip: "邮箱" }
				];

			var tempArr = originArr.filter(item => item.needValidate);
			console.log(tempArr)
			console.log(this)
			for(var i = 0; i < tempArr.length; i++) {
				if(tempArr[i].needValidate) {
					if(tempArr[i].val == "" || tempArr[i].val.length == 0) {
						alert("请输入" + tempArr[i].tip);
						tempArr[i].ref.focus();
						return;
					}
				}
			}
			var newAccount = {
				name: this.localAccount.Name,
				company: this.localAccount.Company,
				job: this.localAccount.Job,
				tel: this.localAccount.Tel,
				email: this.localAccount.Email
			}
			this.setAccount(newAccount)
			this.isShowNameInput = false;
			this.isShowCompanyInput = false;
			this.isShowJobInput = false;
			this.isShowTelInput = false;
			this.isShowEmailInput = false;
		},
		/*...mapActions([
			'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

			// `mapActions` 也支持载荷：
			'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
		]),*/
		...mapActions([
			"setAccountMobile",
			"setAccount"
		])
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
.infoInput.changeActive {
	opacity: 1;
	z-index: 10;
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
.changeMobileDialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}
.changeDialogBg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
.changeDialogWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    /* height: 155px; */
    background-color: #fff;
    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
}
.closeDialog {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 30px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
}
.changeDialogTitle {
    box-sizing: border-box;
    height: 45px;
    background-color: #F8F8F8;
    border-bottom: 1px solid #eeeeee;
    padding: 0 20px;
    font-size: 14px;
    color: #333333;
    line-height: 44px;
    font-weight: normal;
}
.changeDialogContent {
    padding: 0 20px;
	.formGroup {
		margin-bottom: 15px;
	}
}
.changeMobileTips {
    font-size: 15px;
    line-height: 25px;
    color: #777777;
    margin: 10px 0;
    text-align: center;
}
.changeInput {
    width: 100%;
    height: 40px;
    border: 1px solid #D3D3D3;
    padding: 0 10px;
    font-size: 15px;
}
.valiCodeInput {
    width: 280px;
    margin-right: 10px;
}
.getValicode {
    width: 120px;
    height: 40px;
    background-color: #1683ef;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
}
.changeDialogBtns {
    text-align: center;
    margin: 0 auto 20px;
}
.submitChangeMobile {
	width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    background-color: #1683ef;
    color: #fff;
    cursor: pointer;
}
</style>


