<template>
	<div class="industrySelect" tabindex="0">
		<div @click="showIndustryBox" class="industryShow">
			<span v-bind:data-tag="currentIndustry.currentTag" class="industryTag">{{ currentIndustry.currentTagText }}</span>
		</div>
		<div v-show="isShowIndustryBox" class="industryBox">
			<div v-for="(industry, index) in category" :key="index" class="industryGroup">
				<span class="industryLabel">{{ industry.label }}</span>
				<div @click="chooseTag" class="industryCategory">
					<span v-for="(tag, index) in industry.list" :key="index" :data-tag="tag.tag" class="industryTag">{{ tag.text }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		currentIndustry: {
			type: Object
		},
		isShowIndustryBox: {
			type: Boolean
		}
	},
	data() {
		return {
			category: [
				{
					label: "旅游企业",
					list: [
						{
							tag: 77,
							text: "航空公司"
						},
						{
							tag: 78,
							text: "酒店/非标住宿"
						},
						{
							tag: 79,
							text: "在线旅游"
						},
						{
							tag: 80,
							text: "旅行社/机票代理人"
						},
						{
							tag: 81,
							text: "目的地景区"
						},
						{
							tag: 82,
							text: "旅游局"
						},
						{
							tag: 83,
							text: "交通出行"
						},
						{
							tag: 203,
							text: "差旅管理/会奖旅游"
						},
						{
							tag: 204,
							text: "综合型旅游文化企业"
						},
						{
							tag: 143,
							text: "GDS"
						},
						{
							tag: 326,
							text: "邮轮"
						},
						{
							tag: 141,
							text: "其他"
						}
					]
				}
			]
		}
	},
	methods: {
		showIndustryBox() {
			this.$emit("switchIndustryBox");
		},
		chooseTag(event) {
			var e = window.event || event,
				target = e.target;
			this.$emit("selectTag", { tag: target.dataset.tag, tagText: target.innerText })
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


