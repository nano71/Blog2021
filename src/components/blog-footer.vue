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

        v-for="(item,link) in links"
        color="white"
        text
        rounded
        class="my-2"
        :href="'#/'+links[link]"
      >
        {{ links[link] }}
      </v-btn>
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
    _if: true
  }),
  methods: {

    top () {
      this.$emit ("top");
      setTimeout (() => {
        this.$emit ("top");
      }, 50)
      if (this._if) {
        alert (1)
        this._if = false

        setTimeout (() => {
          this._if = true
        }, 1500)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
