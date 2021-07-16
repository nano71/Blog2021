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
        @click="top()"
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
        Copyright © LiangHao {{ new Date ().getFullYear () }} - <strong>桂ICP备2021003184号</strong> - Vue技术 VuetifyUI
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
  }),
  methods: {
    top () {
      // this.$parent.top ();
      this.$emit ('top')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
