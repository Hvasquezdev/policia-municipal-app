<template>
  <div class="divider div-transparent"></div>
</template>

<style scoped>
.divider
{
	position: relative;
	margin-top: 30px;
	margin-bottom: 40px;
	height: 1px;
}

.div-transparent:before
{
	content: "";
	position: absolute;
	top: 0;
	left: 5%;
	right: 5%;
	width: 90%;
	height: 1px;
	background-image: linear-gradient(to right, transparent, hsl(0, 0%, 71%), transparent);
}
</style>
