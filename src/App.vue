<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style lang="scss">
html, body, header, section, aside, footer, p, h1, h2, h3, h4, h5, h6, ul, ol, li {
    margin: 0;
    padding: 0;
}
body {
	font-family: "微软雅黑", Arial, "Microsoft Yahei";
	background-color: #f8f8f8;
	color: #333333;
}
a {
    display: inline-block;
    text-decoration: none;
}
img {
    display: block;
    border: none;
}
ul, ol, li {
    list-style: none;
}
input, button, select {
    box-sizing: border-box;
    border: 0;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 2px;
    font-family: Arial, "Microsoft Yahei";
}
select::-ms-expand { display: none; }
select {
    background-image: url(./assets/caret.png);
    background-repeat: no-repeat;
    background-position: right 10px center;
    color: #181818;
}
button:disabled {
    background-color: #EDEDEE;
    cursor: not-allowed;
}
.container {
	width: 90%;
	height: 100%;
	margin: 0 auto;
	overflow: hidden;
}
.lt {
	float: left;
}
.rt {
	float: right;
}
.clear {
    zoom: 1;
}
.clear::after {
    display: block;
    content: "";
    clear: both;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
// }
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
