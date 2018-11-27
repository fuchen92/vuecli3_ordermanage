<template>
	<div class="industrySelect" tabindex="0">
		<div @click="showIndustryBox" class="industryShow">
			<span v-bind:data-tag="Industry.CurrentVal" class="industryTag">{{ Industry.CurrentValText }}</span>
		</div>
		<div v-show="isShowIndustryBox" class="industryBox">
			<div v-for="(industry, index) in Industry.Category" :key="index" class="industryGroup">
				<span class="industryLabel">{{ industry.Label }}</span>
				<div @click="chooseTag" class="industryCategory">
					<span v-for="(tag, index) in industry.List" :key="index" :data-tag="tag.Tag" class="industryTag">{{ tag.Text }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		Industry: {
			require: true,
			type: Object
		}
	},
	data() {
		return {
			isShowIndustryBox: false
		}
	},
	methods: {
		showIndustryBox() {
			this.isShowIndustryBox = !this.isShowIndustryBox;
		},
		chooseTag(event) {
			console.log(event)
		}
	}
}
</script>

<style lang="scss">
.industrySelect {
    box-sizing: border-box;
    overflow: hidden;
    background: url(../assets/caret.png) #F8F8F8 right 10px center no-repeat;
}
.industryShow {
    width: 100%;
    height: 100%;
    line-height: 38px;
    float: left;
	.industryTag {
		line-height: 38px;
	}
}
.industryBox {
    box-sizing: border-box;
    position: absolute;
    bottom: 100%;
	left: 0;
    width: 100%;
    height: 300px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #999;
    border-bottom: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 100;
}
.industryGroup {
    overflow: hidden;
    margin-bottom: 15px;
}
.industryLabel, .industryCategory {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
}
.industryLabel {
    width: 90px;
    line-height: 25px;
    text-align: center;
    font-weight: bold;
}
.industryCategory {
    width: calc(100% - 95px);
    width: -webkit-calc(100% - 95px);
    width: -moz-calc(100% - 95px);
    overflow: hidden;
}
.industryTag {
    float: left;
    line-height: 25px;
    margin: 0 20px 0 0;
    cursor: pointer;
}
</style>


