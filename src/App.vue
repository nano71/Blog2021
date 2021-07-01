/**
* Created with IntelliJ IDEA.
* @Author: Liang-Hao
* @Date: 2021/5/20 12:25
* @Description:  unset
*/
<template>
  <router-view></router-view>
</template>
<script>
export default {}
</script>
<style lang="less">
::selection {
  background: #00BFA5;
  color: white;
}

//滚动条整体部分
::-webkit-scrollbar {
  width: 6px;
  background-color: unset;
}

//滚动条里面的小方块
::-webkit-scrollbar-thumb {
  background-color: #00BFA5;
}

//内层轨道，滚动条中间部分
::-webkit-scrollbar-track {

}
</style>
