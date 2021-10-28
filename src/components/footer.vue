/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/5/20 12:25
* @Description: unset */
<template>
  <v-footer color="teal accent-4" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="(item, index) in links"
        :key="index"
        color="white"
        text
        rounded
        class="my-2"
        @click="$router.push({ path: '/' + links[index] })"
      >
        {{ links[index] }}
      </v-btn>
      <v-btn id="top" color="white" text rounded class="my-2" @click="top()">
        TOP
      </v-btn>
      <v-col
        class="teal accent-4 py-4 text-center white--text"
        cols="12"
        :style="isMobile ? 'font-size:14px' : ''"
      >
        Copyright © {{ new Date().getFullYear() }} LiangHao. All Rights
        Reserved. <br v-if="isMobile" />
        <strong>桂ICP备2021003184号</strong>
        Use Vue.js & Vuetify
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  // props: ['windowWidth'],
  data() {
    return {
      links: ["resume", "index", "About"],
      throttle: true,
      isMobile: false,
    };
  },
  beforeDestroy() {
    if (typeof window === undefined) return;
    // noinspection JSCheckFunctionSignatures
    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 700;
      this.windowWidth = window.innerWidth;
    },
    top() {
      this.$emit("top");
      setTimeout(() => {
        this.$emit("top");
      }, 50);
      if (this.throttle) {
        this.throttle = false;
        setTimeout(() => {
          this.throttle = true;
        }, 1500);
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
