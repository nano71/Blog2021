/**
* Created with IntelliJ IDEA.
* @Author: Liang-Hao
* @Date: 2021/5/20 12:25
* @Description:  unset
*/
<template>
  <v-footer
    color="teal accent-4"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        id="top"
        color="white"
        text
        rounded
        class="my-2"
        @click="$vuetify.goTo(400, options);top()"
      >
        TOP
      </v-btn>
      <v-btn

        v-for="(item,link) in links"
        color="white"
        text
        rounded
        class="my-2"
        :href="'#/'+links[link]"
      >
        {{ links[link] }}
      </v-btn>
      <v-col
        class="teal accent-4 py-4 text-center white--text"
        cols="12"
      >
        Copyright © LiangHao {{ new Date().getFullYear() }} - <strong>桂ICP备2021003184号</strong> - Vue技术 VuetifyUI
      </v-col>
    </v-row>
  </v-footer>

</template>

<script>

export default {
  data: () => ({
      links: [
        'resume',
        'index',
        'About',
      ],
      options:{
        duration: 500,
        offset: 500,
        easing: 'easeInOutCubic',
      }
    }),
  methods:{
    top:()=>{
      setTimeout(function () {
        document.querySelector('#top').click();
      },100)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
